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

export default function ArqueoFinal() {
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        arqueonumero: '',
        arqueofecha: new Date(),
        arqueoturno: 'M',
        arqueohorainicio: '08:00',
        arqueohorafin: '14:00',
        arqueosupervisor: 1, // Default 1
        arqueorealizadopor: 1, // Default 1
        arqueorevisadopor: 1, // Default 1
        arqueoobservacion: '',
        arqueoestado: 'A',
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
            console.error('Error cargando datos iniciales:', error);
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
            
            const fechaStr = arqueofecha instanceof Date ? 
                arqueofecha.toISOString().split('T')[0] : 
                arqueofecha;
                
            console.log("Consultando resumen con fecha:", fechaStr, "turno:", arqueoturno);
            const response = await api.get(`arqueo-recaudacion-resumen?fecha=${fechaStr}&turno=${arqueoturno}`);
            console.log("Respuesta resumen:", response.data);
            
            if (response.data.success) {
                setResumenServicios(response.data.resumen_servicios);
                setDetalleOperadores(response.data.detalle_operadores);
                
                // Calcular total recaudado
                const total = response.data.resumen_servicios.reduce(
                    (sum, item) => sum + parseFloat(item.importe_total), 0
                );
                setTotalRecaudacion(total);
            } else {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos',
                    detail: response.data.message || 'No se encontraron datos'
                });
            }
        } catch (error) {
            console.error('Error al consultar resumen:', error);
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

    const handleSubmit = async () => {
        try {
            if (!formData.arqueofecha || !formData.arqueoturno || !formData.arqueosupervisor) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: 'Complete todos los campos requeridos'
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
                ...formData,
                arqueorecaudaciontotal: totalRecaudacion,
                arqueodiferencia: diferencia,
            };

            const response = await api.post('arqueo-recaudacion-final', requestData);
            
            if (response.data.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Arqueo final generado correctamente'
                });
                navigate('/arqueocab/view/' + response.data.data.arqueoid);
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: response.data.message
                });
            }
        } catch (error) {
            console.error('Error al generar arqueo final:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo generar el arqueo final'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <h5>Generar Arqueo Final</h5>

            <div className="grid">
                <div className="col-12 md:col-3">
                    <label htmlFor="numero">Número de Arqueo</label>
                    <InputText
                        id="numero"
                        value={formData.arqueonumero}
                        readOnly
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <label htmlFor="fecha">Fecha</label>
                    <Calendar
                        id="fecha"
                        value={formData.arqueofecha}
                        onChange={(e) => setFormData({...formData, arqueofecha: e.value})}
                        showIcon
                        dateFormat="dd/mm/yy"
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <label htmlFor="turno">Turno</label>
                    <Dropdown
                        id="turno"
                        value={formData.arqueoturno}
                        options={[
                            { label: 'MAÑANA', value: 'M' },
                            { label: 'TARDE', value: 'T' },
                            { label: 'NOCHE', value: 'N' }
                        ]}
                        onChange={(e) => setFormData({...formData, arqueoturno: e.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <Button 
                        label="Consultar Recaudación" 
                        icon="pi pi-search" 
                        onClick={handleConsultarResumen}
                        loading={loading}
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <label htmlFor="horainicio">Hora Inicio</label>
                    <InputText
                        id="horainicio"
                        value={formData.arqueohorainicio}
                        onChange={(e) => setFormData({...formData, arqueohorainicio: e.target.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <label htmlFor="horafin">Hora Fin</label>
                    <InputText
                        id="horafin"
                        value={formData.arqueohorafin}
                        onChange={(e) => setFormData({...formData, arqueohorafin: e.target.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-6">
                    <label htmlFor="supervisor">Supervisor</label>
                    <InputText
                        id="supervisor"
                        value={formData.arqueosupervisor}
                        onChange={(e) => setFormData({...formData, arqueosupervisor: e.target.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12">
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-money-bill mr-2"></i>
                            <b>Resumen de Recaudación por Servicios</b>
                        </div>
                    </Divider>
                </div>

                <div className="col-12">
                    <DataTable 
                        value={resumenServicios} 
                        loading={loading}
                        emptyMessage="No hay datos de recaudación"
                    >
                        <Column field="codigo" header="Código" />
                        <Column field="nombre" header="Servicio" />
                        <Column field="cantidad_total" header="Cantidad" />
                        <Column field="importe_total" header="Importe" body={(rowData) => `Bs. ${parseFloat(rowData.importe_total).toFixed(2)}`} />
                    </DataTable>
                </div>

                <div className="col-12">
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-user mr-2"></i>
                            <b>Detalle por Operador</b>
                        </div>
                    </Divider>
                </div>

                <div className="col-12">
                    <DataTable 
                        value={detalleOperadores} 
                        loading={loading}
                        emptyMessage="No hay datos de operadores"
                    >
                        <Column field="operador" header="Operador" />
                        <Column field="punto" header="Punto Recaudación" />
                        <Column field="codigo" header="Servicio" />
                        <Column field="cantidad" header="Cantidad" />
                        <Column field="importe" header="Importe" body={(rowData) => `Bs. ${parseFloat(rowData.importe).toFixed(2)}`} />
                    </DataTable>
                </div>

                <div className="col-12">
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-dollar mr-2"></i>
                            <b>Cortes Monetarios</b>
                        </div>
                    </Divider>
                </div>

                <div className="grid">
                    {CORTES_DENOMINACION.map(den => (
                        <div key={den.campo} className="col-12 md:col-3">
                            <label>Corte Bs. {den.label}</label>
                            <InputNumber 
                                value={formData.cortes[den.campo]}
                                onChange={(e) => handleCortesChange(den.campo, e.value)}
                                mode="decimal"
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                min={0}
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>

                <div className="col-12">
                    <div className="flex justify-content-between align-items-center">
                        <div className="text-xl">
                            <span className="text-700">Total Recaudado: </span>
                            <span className="font-bold">Bs. {totalRecaudacion.toFixed(2)}</span>
                        </div>
                        <div className="text-xl">
                            <span className="text-700">Total Cortes: </span>
                            <span className="font-bold">Bs. {totalCortes.toFixed(2)}</span>
                        </div>
                        <div className="text-xl">
                            <span className="text-700">Diferencia: </span>
                            <span className={`font-bold ${totalCortes - totalRecaudacion === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                Bs. {(totalCortes - totalRecaudacion).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <label htmlFor="observacion">Observaciones</label>
                    <InputText
                        id="observacion"
                        value={formData.arqueoobservacion}
                        onChange={(e) => setFormData({...formData, arqueoobservacion: e.target.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12 text-right">
                    <Button 
                        label="Generar Arqueo Final" 
                        icon="pi pi-save" 
                        onClick={handleSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
