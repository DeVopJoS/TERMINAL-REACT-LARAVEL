import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { formatDate } from '../../utils/utils';

const CORTES_DENOMINACION = [
    { campo: 'arqueocorte200_00', valor: 200, label: '200.00' },
    { campo: 'arqueocorte100_00', valor: 100, label: '100.00' },
    { campo: 'arqueocorte050_00', valor: 50, label: '50.00' },
    { campo: 'arqueocorte020_00', valor: 20, label: '20.00' },
    { campo: 'arqueocorte010_00', valor: 10, label: '10.00' },
    { campo: 'arqueocorte005_00', valor: 5, label: '5.00' },
    { campo: 'arqueocorte002_00', valor: 2, label: '2.00' },
    { campo: 'arqueocorte001_00', valor: 1, label: '1.00' },
    { campo: 'arqueocorte000_50', valor: 0.5, label: '0.50' },
    { campo: 'arqueocorte000_20', valor: 0.2, label: '0.20' },
    { campo: 'arqueocorte000_10', valor: 0.1, label: '0.10' }
];

const getDiferenciaText = (totalCortes, totalRecaudacion) => {
    if (!totalRecaudacion) return "Ninguno";
    
    const diferencia = totalCortes - totalRecaudacion;
    if (diferencia === 0) return "Ninguno";
    if (diferencia > 0) return "Sobrante";
    if (diferencia < 0) return "Faltante";
};

export default function ArqueoFinal() {
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        arqueonumero: '',
        arqueofecha: null,
        arqueoturno: 'M',
        arqueohorainicio: new Date(),  
        arqueohorafin: new Date(),  
        arqueosupervisor: '',
        arqueorealizadopor: '',
        arqueorevisadopor: '',
        arqueoobservacion: '',
        cortes: CORTES_DENOMINACION.reduce((acc, den) => ({
            ...acc,
            [den.campo]: 0
        }), {})
    });

    const [resumenServicios, setResumenServicios] = useState([]);
    const [detalleOperadores, setDetalleOperadores] = useState([]);
    const [totalRecaudacion, setTotalRecaudacion] = useState(0);
    const [totalCortes, setTotalCortes] = useState(0);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        calcularTotalCortes();
    }, [formData.cortes]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const numeroRes = await api.get('arqueo-recaudacion-numero');
            setFormData(prev => ({ ...prev, arqueonumero: numeroRes.data.numero }));
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los datos iniciales'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleConsultarResumen = async () => {
        try {
            setLoading(true);
            const { arqueofecha } = formData;
            
            if (!arqueofecha) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: 'Debe seleccionar fecha'
                });
                return;
            }
            
            let fechaStr;
            if (arqueofecha instanceof Date) {
                fechaStr = arqueofecha.toISOString().split('T')[0];
            } else if (typeof arqueofecha === 'string') {
                try {
                    const dateObj = new Date(arqueofecha);
                    fechaStr = dateObj.toISOString().split('T')[0];
                } catch {
                    fechaStr = arqueofecha;
                }
            }
                
            const response = await api.get(`arqueo-recaudacion-resumen?fecha=${fechaStr}`);
            
            if (response.data.success) {
                setResumenServicios(response.data.resumen_servicios);
                setDetalleOperadores(response.data.detalle_operadores);
                
                // Calcular total recaudado
                const total = response.data.resumen_servicios.reduce(
                    (sum, item) => sum + parseFloat(item.importe_total), 0
                );
                setTotalRecaudacion(total);
            } else {
                setResumenServicios([]);
                setDetalleOperadores([]);
                setTotalRecaudacion(0);
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos pendientes',
                    detail: response.data.message || 'No se encontraron recaudaciones pendientes'
                });
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo obtener el resumen: ' + (error.message || 'Error desconocido')
            });
        } finally {
            setLoading(false);
        }
    };

    const calcularTotalCortes = () => {
        if (!resumenServicios.length) {
            return 0;
        }

        const total = CORTES_DENOMINACION.reduce((total, den) => {
            return total + (formData.cortes[den.campo] || 0) * den.valor;
        }, 0);
        setTotalCortes(total);
        return total;
    };

    const handleCortesChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            cortes: {
                ...prev.cortes,
                [field]: value
            }
        }));
    };

    const formatTimeForDB = (date) => {
        if (!date) return null;
        if (typeof date === 'string') {
            const [hours, minutes] = date.split(':');
            const today = new Date();
            const timestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours || 0, minutes || 0);
            return timestamp.toISOString();
        }
        return date.toISOString();
    };

    const handleSubmit = async () => {
        try {
            const requiredFields = {
                arqueofecha: 'Fecha',
                arqueoturno: 'Turno',
                arqueohorainicio: 'Hora inicio',
                arqueohorafin: 'Hora fin',
                arqueosupervisor: 'Supervisor'
            };

            const missingFields = [];
            Object.entries(requiredFields).forEach(([field, label]) => {
                if (!formData[field]) {
                    missingFields.push(label);
                }
            });

            if (missingFields.length > 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: `Complete los campos: ${missingFields.join(', ')}`
                });
                return;
            }

            if (resumenServicios.length === 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos',
                    detail: 'No hay recaudaciones para procesar'
                });
                return;
            }

            setLoading(true);
            const totalCortes = calcularTotalCortes();
            const diferencia = totalCortes - totalRecaudacion;
            const diferenciatipo = diferencia > 0 ? 'S' : diferencia < 0 ? 'F' : null;

            const requestData = {
                arqueonumero: formData.arqueonumero,
                arqueofecha: formData.arqueofecha instanceof Date ? 
                    formData.arqueofecha.toISOString().split('T')[0] : 
                    formData.arqueofecha,
                arqueoturno: formData.arqueoturno,
                arqueohorainicio: formatTimeForDB(formData.arqueohorainicio),
                arqueohorafin: formatTimeForDB(formData.arqueohorafin),
                arqueosupervisor: formData.arqueosupervisor,
                arqueoobservacion: formData.arqueoobservacion,
                arqueorealizadopor: formData.arqueorealizadopor,
                arqueorevisadopor: formData.arqueorevisadopor,
                arqueorecaudaciontotal: totalRecaudacion,
                arqueodiferencia: diferencia,
                diferenciatipo: diferenciatipo,
                cortes: formData.cortes
            };

            const response = await api.post('arqueo-recaudacion-final', requestData);
            
            if (response.data.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Arqueo final generado correctamente. ${
                        diferencia === 0 ? '(Cuadre exacto)' :
                        diferencia > 0 ? `(Sobrante: Bs. ${diferencia.toFixed(2)})` :
                        `(Faltante: Bs. ${Math.abs(diferencia).toFixed(2)})`
                    }`
                });
                navigate('/arqueocab/view/' + response.data.data.arqueoid);
            } else {
                throw new Error(response.data.message || 'Error al generar arqueo');
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || error.message || 'Error al generar arqueo final'
            });
        } finally {
            setLoading(false);
        }
    };

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formatTimeDisplay = (time) => {
        if (!time) return '';
        const date = new Date(time);
        return date.toLocaleTimeString(undefined, timeOptions);
    };

    const getMontoCorte = (campo) => {
        const corte = CORTES_DENOMINACION.find(c => c.campo === campo);
        if (!corte) return 0;
        return (formData.cortes[campo] || 0) * corte.valor;
    };

    return (
        <div className="card p-3">
            <Toast ref={toast} />
            
            {/* Cabecera de búsqueda */}
            <div className="flex justify-content-between align-items-center mb-3">
                <h3 className="m-0">Cierre de Arqueo</h3>
                <div className="flex gap-2">
                    <Calendar
                        value={formData.arqueofecha}
                        onChange={(e) => setFormData({...formData, arqueofecha: e.value})}
                        showIcon
                        dateFormat="dd/mm/yy"
                        placeholder="Seleccione fecha"
                    />
                    <Button 
                        label="Buscar" 
                        icon="pi pi-search"
                        onClick={handleConsultarResumen}
                        loading={loading}
                    />
                    <Button 
                        icon="pi pi-arrow-left" 
                        label="Volver"
                        className="p-button-secondary"
                        onClick={() => navigate('/arqueo-recaudacion')}
                    />
                </div>
            </div>

            {resumenServicios.length > 0 && (
                <div className="excel-style-container border-1 surface-border p-3">
                    {/* Header del Excel */}
                    <div className="grid">
                        <div className="col-6">
                            <table className="excel-header-table">
                                <tbody>
                                    <tr>
                                        <td className="font-bold">TURNO:</td>
                                        <td>
                                            <Dropdown
                                                value={formData.arqueoturno}
                                                options={[
                                                    {label: 'MAÑANA', value: 'M'},
                                                    {label: 'TARDE', value: 'T'}
                                                ]}
                                                onChange={(e) => setFormData({...formData, arqueoturno: e.value})}
                                                className="w-full h-2rem"
                                            />
                                        </td>
                                        <td className="font-bold">N° DE ARQUEO:</td>
                                        <td>{formData.arqueonumero}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">HORA DE INICIO:</td>
                                        <td>
                                            <Calendar
                                                value={formData.arqueohorainicio}
                                                onChange={(e) => setFormData({...formData, arqueohorainicio: e.value})}
                                                timeOnly
                                                hourFormat="12"
                                                className="w-full h-2rem"
                                            />
                                        </td>
                                        <td className="font-bold">FECHA:</td>
                                        <td>{formatDate(formData.arqueofecha, 'dd/MM/yyyy')}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">HORA FINALIZADO:</td>
                                        <td>
                                            <Calendar
                                                value={formData.arqueohorafin}
                                                onChange={(e) => setFormData({...formData, arqueohorafin: e.value})}
                                                timeOnly
                                                hourFormat="12"
                                                className="w-full h-2rem"
                                            />
                                        </td>
                                        <td className="font-bold">SUPERVISOR:</td>
                                        <td>
                                            <InputText
                                                value={formData.arqueosupervisor}
                                                onChange={(e) => setFormData({...formData, arqueosupervisor: e.target.value})}
                                                className="w-full h-2rem"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cuerpo del Excel - 2 columnas */}
                    <div className="grid mt-3">
                        <div className="col-6">
                            <table className="excel-table">
                                <thead>
                                    <tr>
                                        <th>FACTURA PRE VALORADAS</th>
                                        <th>IMPORTE Bs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resumenServicios.map((servicio, index) => (
                                        <tr key={index}>
                                            <td>{servicio.nombre}</td>
                                            <td className="text-right">Bs{parseFloat(servicio.importe_total).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td className="font-bold">TOTAL DE PREVALORADAS:</td>
                                        <td className="text-right font-bold">Bs{totalRecaudacion.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-6">
                            <table className="excel-table">
                                <thead>
                                    <tr>
                                        <th>CORTE</th>
                                        <th>PIEZAS</th>
                                        <th>MONTO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CORTES_DENOMINACION.map((corte, index) => (
                                        <tr key={index}>
                                            <td>Bs{corte.label}</td>
                                            <td>
                                                <InputNumber
                                                    value={formData.cortes[corte.campo]}
                                                    onChange={(e) => handleCortesChange(corte.campo, e.value)}
                                                    min={0}
                                                    className="w-full"
                                                    size={5}
                                                />
                                            </td>
                                            <td className="text-right">
                                                Bs{(formData.cortes[corte.campo] * corte.valor).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td colSpan="2" className="font-bold">TOTAL:</td>
                                        <td className="text-right font-bold">Bs{totalCortes.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Diferencia */}
                    <div className="grid mt-3">
                        <div className="col-12">
                            <table className="excel-table">
                                <tbody>
                                    <tr>
                                        <td className="font-bold" style={{width: '50%'}}>
                                            DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO:
                                        </td>
                                        <td className="font-bold">
                                            {getDiferenciaText(totalCortes, totalRecaudacion)}
                                        </td>
                                        <td className="text-right font-bold">
                                            Bs{Math.abs(totalCortes - totalRecaudacion).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Firmas */}
                    <div className="grid mt-3">
                        <div className="col-6">
                            <table className="excel-table">
                                <tbody>
                                    <tr>
                                        <td className="font-bold" style={{width: '40%'}}>REALIZADO POR EL CAJERO:</td>
                                        <td>
                                            <InputText
                                                value={formData.arqueorealizadopor}
                                                onChange={(e) => setFormData({...formData, arqueorealizadopor: e.target.value})}
                                                className="w-full"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-6">
                            <table className="excel-table">
                                <tbody>
                                    <tr>
                                        <td className="font-bold" style={{width: '40%'}}>REVISADO POR EL CAJERO:</td>
                                        <td>
                                            <InputText
                                                value={formData.arqueorevisadopor}
                                                onChange={(e) => setFormData({...formData, arqueorevisadopor: e.target.value})}
                                                className="w-full"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Observación */}
                    <div className="grid mt-3">
                        <div className="col-12">
                            <table className="excel-table">
                                <tbody>
                                    <tr>
                                        <td className="font-bold" style={{width: '20%', verticalAlign: 'top'}}>OBSERVACIÓN:</td>
                                        <td>
                                            <InputText
                                                value={formData.arqueoobservacion}
                                                onChange={(e) => setFormData({...formData, arqueoobservacion: e.target.value})}
                                                className="w-full"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Botón guardar */}
                    <div className="flex justify-content-end mt-4">
                        <Button
                            label="Guardar Arqueo Final"
                            icon="pi pi-save"
                            onClick={handleSubmit}
                            loading={loading}
                        />
                    </div>
                </div>
            )}

            <style>
                {`
                    .excel-style-container {
                        font-family: 'Arial', sans-serif;
                        background-color: white;
                    }
                    .excel-header-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .excel-header-table td {
                        padding: 5px;
                        border: 1px solid #dee2e6;
                    }
                    .excel-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 1rem;
                    }
                    .excel-table th, .excel-table td {
                        border: 1px solid #dee2e6;
                        padding: 5px 10px;
                    }
                    .excel-table th {
                        background-color: #f0f0f0;
                        text-align: center;
                        font-weight: bold;
                    }
                    .total-row {
                        background-color: #f0f0f0;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .p-inputtext, .p-dropdown, .p-calendar {
                        padding: 0.3rem !important;
                    }
                    .h-2rem {
                        height: 2rem !important;
                    }
                `}
            </style>
        </div>
    );
}