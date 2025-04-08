import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { formatDate } from '../../utils/utils';
import { ArqueoReporte, ReporteStyle } from './ArqueoReporte'; // Importamos los nuevos componentes

const CORTES_DENOMINACION = [
    { campo: 'arqueocorte200_00', valor: 200, label: '200' },
    { campo: 'arqueocorte100_00', valor: 100, label: '100' },
    { campo: 'arqueocorte050_00', valor: 50, label: '50' },
    { campo: 'arqueocorte020_00', valor: 20, label: '20' },
    { campo: 'arqueocorte010_00', valor: 10, label: '10' },
    { campo: 'arqueocorte005_00', valor: 5, label: '5' },
    { campo: 'arqueocorte002_00', valor: 2, label: '2' },
    { campo: 'arqueocorte001_00', valor: 1, label: '1' },
    { campo: 'arqueocorte000_50', valor: 0.5, label: '0.50' },
    { campo: 'arqueocorte000_20', valor: 0.2, label: '0.20' },
    { campo: 'arqueocorte000_10', valor: 0.1, label: '0.10' }
];

export default function ArqueoFinal() {
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        arqueonumero: '',
        arqueofecha: new Date(),
        arqueoturno: 'M',
        arqueohorainicio: new Date(),  
        arqueohorafin: new Date(),  
        arqueosupervisor: '',
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
    
    // Estado para controlar la ventana emergente del reporte
    const [reporteVisible, setReporteVisible] = useState(false);
    const [arqueoGuardadoId, setArqueoGuardadoId] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        calcularTotalCortes();
    }, [formData.cortes]);

    // Cargar datos automáticamente al montar el componente
    useEffect(() => {
        handleConsultarResumen();
    }, []);

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
            
            const response = await api.get(`arqueo-recaudacion-resumen?estado=P`);
            
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
        if (!formData.cortes) {
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
                arqueorecaudaciontotal: totalRecaudacion,
                arqueodiferencia: diferencia,
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
                
                // Guardamos el ID del arqueo y mostramos el reporte
                setArqueoGuardadoId(response.data.data.arqueoid);
                setReporteVisible(true);
                
                // También mantenemos la navegación original pero después de cerrar el reporte
                // La navegación se hará al cerrar el popup
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

    const getDiferenciaEstado = () => {
        if (!totalRecaudacion) return null;
        
        const diferencia = totalCortes - totalRecaudacion;
        if (diferencia === 0) return "Ninguno";
        if (diferencia > 0) return "Sobrante";
        return "Faltante";
    };

    const formatearDiferencia = () => {
        if (!totalRecaudacion) return "-";
        
        const diferencia = totalCortes - totalRecaudacion;
        if (diferencia === 0) return "-";
        return `Bs ${Math.abs(diferencia).toFixed(2)}`;
    };

    // Manejador para cerrar la ventana emergente del reporte
    const handleCloseReporte = () => {
        setReporteVisible(false);
        // Después de cerrar el reporte, redirigimos al usuario a la vista del arqueo
        if (arqueoGuardadoId) {
            navigate('/arqueocab');
        }
    };

    return (
        <div className="card p-0">
            <Toast ref={toast} />
            <ReporteStyle />
            
            {/* Header - Removed logo and reduced padding */}
            <div className="bg-bluegray-800 text-white p-2 flex align-items-center" style={{ background: 'linear-gradient(to right, #003262, #005691)' }}>
                <div className="flex align-items-center">
                    <h2 className="text-lg font-bold m-0">ARQUEO DE RECAUDACIÓN - SERVICIOS</h2>
                </div>
            </div>
            
            {/* Búsqueda de Arqueo - Reduced cell padding */}
            <div className="grid mb-0">
                <div className="col-6">
                    <table className="w-full border-1 border-collapse">
                        <tbody>
                            <tr>
                                <td className="bg-teal-100 border-1 p-1 font-bold text-center" style={{ width: '40%' }}>TURNO:</td>
                                <td className="bg-teal-50 border-1 p-1 text-center">
                                    <Dropdown
                                        value={formData.arqueoturno}
                                        options={[
                                            { label: 'Mañana', value: 'M' },
                                            { label: 'Tarde', value: 'T' }
                                        ]}
                                        onChange={(e) => setFormData({...formData, arqueoturno: e.value})}
                                        className="w-full p-0 text-center compact-input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="bg-teal-100 border-1 p-1 font-bold text-center">HORA DE INICIO:</td>
                                <td className="bg-teal-50 border-1 p-1 text-center">
                                    <Calendar
                                        value={formData.arqueohorainicio}
                                        onChange={(e) => setFormData({...formData, arqueohorainicio: e.value})}
                                        timeOnly
                                        hourFormat="24"
                                        className="w-full p-0 text-center compact-calendar"
                                        showSeconds={false}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="bg-teal-100 border-1 p-1 font-bold text-center">HORA FINALIZADO:</td>
                                <td className="bg-teal-50 border-1 p-1 text-center">
                                    <Calendar
                                        value={formData.arqueohorafin}
                                        onChange={(e) => setFormData({...formData, arqueohorafin: e.value})}
                                        timeOnly
                                        hourFormat="24"
                                        className="w-full p-0 text-center compact-calendar"
                                        showSeconds={false}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <table className="w-full border-1 border-collapse">
                        <tbody>
                            <tr>
                                <td className="bg-teal-100 border-1 p-1 font-bold text-center" style={{ width: '40%' }}>Nº DE ARQUEO:</td>
                                <td className="bg-teal-50 border-1 p-1 text-center" style={{ backgroundColor: '#9de2e2' }}>
                                    {formData.arqueonumero}
                                </td>
                            </tr>
                            <tr>
                                <td className="bg-teal-100 border-1 p-1 font-bold text-center">FECHA:</td>
                                <td className="bg-teal-50 border-1 p-1 text-center">
                                    <Calendar
                                        value={formData.arqueofecha}
                                        onChange={(e) => setFormData({...formData, arqueofecha: e.value})}
                                        showIcon
                                        dateFormat="dd/mm/yy"
                                        placeholder="Seleccione fecha"
                                        className="w-full p-0 text-center compact-calendar"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="bg-teal-100 border-1 p-1 font-bold text-center">SUPERVISOR:</td>
                                <td className="bg-teal-50 border-1 p-1 text-center">
                                    <InputText
                                        value={formData.arqueosupervisor}
                                        onChange={(e) => setFormData({...formData, arqueosupervisor: e.target.value})}
                                        className="w-full p-0 text-center compact-input"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="mt-1 flex justify-content-end">
                {/* Eliminamos el botón "Buscar Recaudación" */}
            </div>

            {resumenServicios.length > 0 && (
                <div className="mt-2">
                    {/* Tablas de recaudación y cortes - Reduced padding */}
                    <div className="grid">
                        <div className="col-12 lg:col-6">
                            <table className="w-full border-1 border-collapse">
                                <thead>
                                    <tr>
                                        <th colSpan="2" className="bg-bluegray-700 text-white border-1 p-1 text-left text-sm">FACTURAS PRE VALORADAS</th>
                                        <th colSpan="2" className="bg-bluegray-700 text-white border-1 p-1 text-center text-sm">IMPORTE Bs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resumenServicios.map((servicio, idx) => (
                                        <tr key={idx}>
                                            <td colSpan="2" className="border-1 p-1 text-sm">{servicio.nombre}</td>
                                            <td className="border-1 p-1 text-right text-sm">Bs</td>
                                            <td className="border-1 p-1 text-right text-sm">{parseFloat(servicio.importe_total).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100 font-bold">
                                        <td colSpan="2" className="border-1 p-1 text-sm">TOTAL DE PREVALORACIONES:</td>
                                        <td className="border-1 p-1 text-right text-sm">Bs</td>
                                        <td className="border-1 p-1 text-right text-sm">{totalRecaudacion.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="border-1 p-1 text-sm">INFRACCIONES:</td>
                                        <td className="border-1 p-1 text-right text-sm">Bs</td>
                                        <td className="border-1 p-1 text-right text-sm">0.00</td>
                                    </tr>
                                    <tr className="bg-gray-100 font-bold">
                                        <td colSpan="2" className="border-1 p-1 text-sm">TOTAL:</td>
                                        <td className="border-1 p-1 text-right text-sm">Bs</td>
                                        <td className="border-1 p-1 text-right text-sm">{totalRecaudacion.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="col-12 lg:col-6">
                            <table className="w-full border-1 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="bg-bluegray-700 text-white border-1 p-1 text-sm">CORTE</th>
                                        {/* Reduced width for the PIEZAS column by half */}
                                        <th className="bg-bluegray-700 text-white border-1 p-1 text-center text-sm" style={{ width: '15%' }}>PIEZAS</th>
                                        <th className="bg-bluegray-700 text-white border-1 p-1 text-center text-sm">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CORTES_DENOMINACION.map((corte) => (
                                        <tr key={corte.campo}>
                                            <td className="border-1 p-1 text-sm">Bs {corte.label}</td>
                                            <td className="border-1 p-0 text-sm">
                                                <InputNumber 
                                                    value={formData.cortes[corte.campo]}
                                                    onChange={(e) => handleCortesChange(corte.campo, e.value)}
                                                    min={0}
                                                    className="w-full text-right compact-input"
                                                    inputClassName="text-right"
                                                    size={4}
                                                />
                                            </td>
                                            <td className="border-1 p-1 text-right text-sm">
                                                {((formData.cortes[corte.campo] || 0) * corte.valor).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100 font-bold">
                                        <td colSpan="2" className="border-1 p-1 text-sm">TOTAL:</td>
                                        <td className="border-1 p-1 text-right text-sm">{totalCortes.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Diferencia - Reduced padding */}
                    <table className="w-full border-1 border-collapse mt-2">
                        <tbody>
                            <tr>
                                <td className="bg-bluegray-700 text-white border-1 p-1 font-bold text-sm" style={{ width: '40%' }}>
                                    DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO
                                </td>
                                <td className={`border-1 p-1 font-bold text-sm ${
                                    totalCortes - totalRecaudacion === 0 ? 'bg-green-100' :
                                    totalCortes - totalRecaudacion > 0 ? 'bg-blue-100' : 
                                    'bg-red-100'
                                }`}>
                                    {getDiferenciaEstado()}
                                </td>
                                <td className={`border-1 p-1 font-bold text-right text-sm ${
                                    totalCortes - totalRecaudacion === 0 ? 'bg-green-100' :
                                    totalCortes - totalRecaudacion > 0 ? 'bg-blue-100' : 
                                    'bg-red-100'
                                }`}>
                                    {formatearDiferencia()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* Observaciones - Reduced margin */}
                    <div className="mt-2 mb-2">
                        <label className="block font-bold mb-1 text-sm">Observaciones:</label>
                        <InputText
                            value={formData.arqueoobservacion}
                            onChange={(e) => setFormData({...formData, arqueoobservacion: e.target.value})}
                            className="w-full p-1 compact-input"
                        />
                    </div>
                    
                    {/* Botones - Reduced margin */}
                    <div className="flex justify-content-end mt-2">
                        <Button
                            label="Volver"
                            icon="pi pi-arrow-left"
                            className="p-button-text mr-2 p-button-sm"
                            onClick={() => navigate('/arqueo-recaudacion')}
                        />
                        <Button
                            label="Grabar Arqueo de Turno "
                            icon="pi pi-check"
                            className="p-button-raised p-button-sm"
                            onClick={handleSubmit}
                            loading={loading}
                        />
                    </div>
                </div>
            )}
            
            {/* Ventana emergente de reporte */}
            <ArqueoReporte 
                visible={reporteVisible} 
                onHide={handleCloseReporte}
                data={formData}
                resumenServicios={resumenServicios}
                detalleOperadores={detalleOperadores}
                totalRecaudacion={totalRecaudacion}
                totalCortes={totalCortes}
            />
            
            <style>
                {`
                    .compact-input .p-inputtext,
                    .p-inputtext.compact-input {
                        padding: 0.25rem !important;
                        font-size: 0.875rem !important;
                        height: 2rem !important;
                    }
                    
                    .compact-calendar .p-inputtext {
                        padding: 0.25rem !important;
                        font-size: 0.875rem !important;
                        height: 2rem !important;
                    }
                    
                    .p-calendar.compact-calendar .p-button {
                        width: 2rem !important;
                        height: 2rem !important;
                    }
                    
                    .border-1 {
                        border-width: 1px !important;
                        border-style: solid !important;
                        border-color: #ddd !important;
                    }
                    
                    .border-collapse {
                        border-collapse: collapse !important;
                    }
                    
                    .p-inputnumber-input {
                        text-align: right !important;
                    }
                    
                    .p-button-sm {
                        font-size: 0.875rem !important;
                        padding: 0.4rem 0.75rem !important;
                    }
                    
                    .text-sm {
                        font-size: 0.875rem !important;
                    }
                    
                    .p-1 {
                        padding: 0.25rem !important;
                    }
                    
                    .mt-1 {
                        margin-top: 0.25rem !important;
                    }
                    
                    .mt-2 {
                        margin-top: 0.5rem !important;
                    }
                    
                    .mb-1 {
                        margin-bottom: 0.25rem !important;
                    }
                    
                    .mb-2 {
                        margin-bottom: 0.5rem !important;
                    }
                `}
            </style>
        </div>
    );
}