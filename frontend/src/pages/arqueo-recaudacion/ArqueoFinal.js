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
        arqueosupervisor: '',
        arqueoobservacion: '',
        cortes: {
            arqueocorte200_00: 0,
            arqueocorte100_00: 0,
            arqueocorte050_00: 0,
            arqueocorte020_00: 0,
            arqueocorte010_00: 0,
            arqueocorte005_00: 0,
            arqueocorte002_00: 0,
            arqueocorte001_00: 0,
            arqueocorte000_50: 0,
            arqueocorte000_20: 0,
            arqueocorte000_10: 0
        }
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
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos',
                    detail: response.data.message
                });
            }
        } catch (error) {
            console.error('Error al consultar resumen:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo obtener el resumen'
            });
        } finally {
            setLoading(false);
        }
    };

    const calcularTotalCortes = () => {
        const cortes = formData.cortes;
        let total = 0;
        
        total += (cortes.arqueocorte200_00 || 0) * 200;
        total += (cortes.arqueocorte100_00 || 0) * 100;
        total += (cortes.arqueocorte050_00 || 0) * 50;
        total += (cortes.arqueocorte020_00 || 0) * 20;
        total += (cortes.arqueocorte010_00 || 0) * 10;
        total += (cortes.arqueocorte005_00 || 0) * 5;
        total += (cortes.arqueocorte002_00 || 0) * 2;
        total += (cortes.arqueocorte001_00 || 0) * 1;
        total += (cortes.arqueocorte000_50 || 0) * 0.5;
        total += (cortes.arqueocorte000_20 || 0) * 0.2;
        total += (cortes.arqueocorte000_10 || 0) * 0.1;
        
        setTotalCortes(total);
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
            const response = await api.post('arqueo-recaudacion-final', formData);
            
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

                <div className="col-12 md:col-6">
                    <div className="grid">
                        <div className="col-4">
                            <label>Corte Bs. 200</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte200_00}
                                onChange={(e) => handleCortesChange('arqueocorte200_00', e.value)} 
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 100</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte100_00}
                                onChange={(e) => handleCortesChange('arqueocorte100_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 50</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte050_00}
                                onChange={(e) => handleCortesChange('arqueocorte050_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 20</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte020_00}
                                onChange={(e) => handleCortesChange('arqueocorte020_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 10</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte010_00}
                                onChange={(e) => handleCortesChange('arqueocorte010_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 5</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte005_00}
                                onChange={(e) => handleCortesChange('arqueocorte005_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="grid">
                        <div className="col-4">
                            <label>Corte Bs. 2</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte002_00}
                                onChange={(e) => handleCortesChange('arqueocorte002_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 1</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte001_00}
                                onChange={(e) => handleCortesChange('arqueocorte001_00', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 0.50</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte000_50}
                                onChange={(e) => handleCortesChange('arqueocorte000_50', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 0.20</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte000_20}
                                onChange={(e) => handleCortesChange('arqueocorte000_20', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                        <div className="col-4">
                            <label>Corte Bs. 0.10</label>
                            <InputNumber 
                                value={formData.cortes.arqueocorte000_10}
                                onChange={(e) => handleCortesChange('arqueocorte000_10', e.value)}
                                min={0}
                                className="w-full"
                            />
                        </div>
                    </div>
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
