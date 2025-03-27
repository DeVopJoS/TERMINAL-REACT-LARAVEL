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

const DiferenciaIndicator = ({ totalCortes, totalRecaudacion }) => {
    if (!totalRecaudacion) return null;
    
    const diferencia = totalCortes - totalRecaudacion;
    let status = {
        icon: 'pi pi-check-circle',
        color: 'surface-200',
        textColor: 'text-green-500',
        label: 'COMPLETO',
        description: 'Los montos coinciden exactamente'
    };

    if (diferencia > 0) {
        status = {
            icon: 'pi pi-arrow-up',
            color: 'surface-200',
            textColor: 'text-blue-500',
            label: 'SOBRANTE',
            description: `Hay un sobrante de Bs. ${diferencia.toFixed(2)}`
        };
    } else if (diferencia < 0) {
        status = {
            icon: 'pi pi-arrow-down',
            color: 'surface-200',
            textColor: 'text-red-500',
            label: 'FALTANTE',
            description: `Falta Bs. ${Math.abs(diferencia).toFixed(2)}`
        };
    }

    return (
        <div className={`p-4 border-round-xl shadow-1 mb-3 ${status.color}`}>
            <div className="flex align-items-center">
                <i className={`${status.icon} text-4xl ${status.textColor} mr-3`}></i>
                <div>
                    <h2 className={`text-xl font-bold ${status.textColor} m-0`}>{status.label}</h2>
                    <p className="text-600 m-0">{status.description}</p>
                </div>
            </div>
        </div>
    );
};

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
            const { arqueofecha, arqueoturno } = formData;
            
            if (!arqueofecha || !arqueoturno) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: 'Debe seleccionar fecha y turno'
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
                
            const response = await api.get(`arqueo-recaudacion-resumen?fecha=${fechaStr}&turno=${arqueoturno}`);
            
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

    return (
        <div className="card p-4">
            <Toast ref={toast} />
            
            {/* Header Section */}
            <div className="flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="text-2xl font-bold text-900 m-0">Cierre de Arqueo</h2>
                    <span className="text-500">#{formData.arqueonumero}</span>
                </div>
                <Button 
                    icon="pi pi-arrow-left" 
                    label="Volver"
                    className="p-button-text"
                    onClick={() => navigate('/arqueo-recaudacion')}
                />
            </div>

            {/* Búsqueda de Arqueo */}
            <div className="surface-100 p-4 border-round mb-4">
                <h3 className="text-lg font-semibold mb-3">Búsqueda de Arqueo</h3>
                <div className="grid">
                    <div className="col-12 md:col-3">
                        <Calendar
                            value={formData.arqueofecha}
                            onChange={(e) => setFormData({...formData, arqueofecha: e.value})}
                            showIcon
                            dateFormat="dd/mm/yy"
                            placeholder="Seleccione fecha"
                            className="w-full"
                            showTime={false}
                            showButtonBar={true}
                            touchUI={false}
                        />
                    </div>
                    <div className="col-12 md:col-3">
                        <Dropdown
                            value={formData.arqueoturno}
                            options={[
                                { label: 'MAÑANA', value: 'M' },
                                { label: 'TARDE', value: 'T' },
                                { label: 'NOCHE', value: 'N' }
                            ]}
                            onChange={(e) => setFormData({...formData, arqueoturno: e.value})}
                            className="w-full"
                            placeholder="Seleccione turno"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        <Button 
                            label="Buscar Recaudación" 
                            icon="pi pi-search"
                            className="w-full p-button-raised"
                            onClick={handleConsultarResumen}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            {resumenServicios.length > 0 && (
                <>
                    <div className="card mb-4">
                        <DiferenciaIndicator 
                            totalCortes={totalCortes} 
                            totalRecaudacion={totalRecaudacion}
                        />
                        
                        <div className="grid">
                            <div className="col-12 md:col-4">
                                <div className="text-center p-4 surface-100 border-round">
                                    <span className="text-600 block mb-2">Total Recaudado</span>
                                    <span className="text-3xl font-bold text-900">
                                        Bs. {totalRecaudacion.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="text-center p-4 surface-100 border-round">
                                    <span className="text-600 block mb-2">Total Contado</span>
                                    <span className="text-3xl font-bold text-900">
                                        Bs. {totalCortes.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="text-center p-4 surface-100 border-round">
                                    <span className="text-600 block mb-2">Diferencia</span>
                                    <span className={`text-3xl font-bold ${
                                        totalCortes - totalRecaudacion === 0 ? 'text-green-500' :
                                        totalCortes - totalRecaudacion > 0 ? 'text-blue-500' : 
                                        'text-red-500'
                                    }`}>
                                        Bs. {(totalCortes - totalRecaudacion).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            {/* Cortes Monetarios */}
                            <div className="card p-0 mb-4">
                                <div className="p-4 border-bottom-1 surface-border">
                                    <h3 className="text-lg font-semibold m-0">
                                        Conteo de Efectivo
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="grid">
                                        {CORTES_DENOMINACION.map(den => (
                                            <div key={den.campo} className="col-12 md:col-6 mb-3">
                                                <div className="flex align-items-center">
                                                    <span className="bg-primary border-round p-2 text-white font-bold mr-2 w-4rem text-center">
                                                        {den.label}
                                                    </span>
                                                    <InputNumber 
                                                        value={formData.cortes[den.campo]}
                                                        onChange={(e) => handleCortesChange(den.campo, e.value)}
                                                        showButtons
                                                        min={0}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            {/* Resumen de servicios */}
                            <div className="card p-0 mb-4">
                                <div className="p-4 border-bottom-1 surface-border">
                                    <h3 className="text-lg font-semibold m-0">
                                        Resumen de Recaudación
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <DataTable 
                                        value={resumenServicios}
                                        scrollable 
                                        scrollHeight="400px"
                                        size="small"
                                        className="mb-4"
                                    >
                                        <Column field="codigo" header="Código" style={{width: '80px'}} />
                                        <Column field="nombre" header="Servicio" />
                                        <Column field="cantidad_total" header="Cantidad" style={{width: '80px'}} />
                                        <Column 
                                            field="importe_total" 
                                            header="Precio Unit." 
                                            body={(row) => {
                                                const cantidad = parseFloat(row.cantidad_total) || 0;
                                                const importe = parseFloat(row.importe_total) || 0;
                                                const precioUnitario = cantidad > 0 ? importe / cantidad : 0;
                                                return `Bs. ${precioUnitario.toFixed(2)}`;
                                            }}
                                            style={{width: '100px'}}
                                        />
                                        <Column 
                                            field="importe_total" 
                                            header="Importe" 
                                            body={(row) => `Bs. ${parseFloat(row.importe_total).toFixed(2)}`}
                                            style={{width: '100px'}}
                                        />
                                    </DataTable>

                                    {/* Totales */}
                                    <div className="bg-gray-50 p-3 border-round">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="font-bold">Total Recaudado:</span>
                                            <span className="text-xl font-bold">Bs. {totalRecaudacion.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detalle por operador*/}
                            <div className="card p-0">
                                <div className="p-4 border-bottom-1 surface-border">
                                    <h3 className="text-lg font-semibold m-0">
                                        Detalle por Operador
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <DataTable 
                                        value={detalleOperadores}
                                        scrollable 
                                        scrollHeight="200px"
                                        size="small"
                                    >
                                        <Column field="operador" header="Operador" />
                                        <Column field="punto" header="Punto" style={{width: '100px'}} />
                                        <Column field="codigo" header="Codigo Serv." style={{width: '70px'}} />
                                        <Column field="cantidad" header="Cantidad" style={{width: '70px'}} />
                                        <Column 
                                            field="importe" 
                                            header="Importe" 
                                            body={(row) => `Bs. ${parseFloat(row.importe).toFixed(2)}`}
                                            style={{width: '100px'}}
                                        />
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Datos del Cierre*/}
                    <div className="card p-4 mb-4 mt-3">
                        <h3 className="text-lg font-semibold mb-4">Datos del Cierre</h3>
                        <div className="grid">
                            <div className="col-12 md:col-4 mb-4">
                                <label className="block text-600 mb-2">Hora Inicio</label>
                                <Calendar
                                    value={formData.arqueohorainicio}
                                    onChange={(e) => setFormData({...formData, arqueohorainicio: e.value})}
                                    timeOnly
                                    hourFormat="24"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 md:col-4 mb-4">
                                <label className="block text-600 mb-2">Hora Fin</label>
                                <Calendar
                                    value={formData.arqueohorafin}
                                    onChange={(e) => setFormData({...formData, arqueohorafin: e.value})}
                                    timeOnly
                                    hourFormat="24"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 md:col-4 mb-4">
                                <label className="block text-600 mb-2">Supervisor</label>
                                <InputText
                                    value={formData.arqueosupervisor}
                                    onChange={(e) => setFormData({...formData, arqueosupervisor: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <label className="block text-600 mb-2">Observaciones</label>
                                <InputText
                                    value={formData.arqueoobservacion}
                                    onChange={(e) => setFormData({...formData, arqueoobservacion: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-content-end">
                            <Button
                                label="Generar Arqueo Final"
                                icon="pi pi-check"
                                className="p-button-raised"
                                onClick={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </>
            )}

            <style>
                {`
                    .sticky-container {
                        position: sticky;
                        top: 20px;
                    }
                    .p-datatable .p-datatable-tbody > tr > td {
                        padding: 1rem 0.8rem;
                    }
                    .p-datatable .p-datatable-thead > tr > th {
                        padding: 1rem 0.8rem;
                        font-size: 1.1rem;  
                    }
                    .text-lg {
                        font-size: 1.1rem !important; 
                    }
                `}
            </style>
        </div>
    );
}
