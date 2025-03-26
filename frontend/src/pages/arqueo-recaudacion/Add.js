import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function ArqueoRecaudacionAdd() {
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);

    const [loading, setLoading] = useState(true);
    const [puntosRecaudacion, setPuntosRecaudacion] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [selectedPunto, setSelectedPunto] = useState(null);
    const [detalles, setDetalles] = useState([]);
    
    const [formData, setFormData] = useState({
        arqueocorrelativo: '',
        arqueofecha: new Date(),
        arqueonombreoperador: '',
        punto_recaud_id: null,
        arqueoturno: '1',
        arqueonombresupervisor: '',
        detalles: []
    });

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [puntosRes, serviciosRes, correlativoRes] = await Promise.all([
                api.get('arqueo-recaudacion-puntos'),
                api.get('arqueo-recaudacion-servicios'),
                api.get('arqueo-recaudacion-correlativo')
            ]);

            setPuntosRecaudacion(puntosRes.data);
            setServicios(serviciosRes.data);
            setFormData(prev => ({
                ...prev,
                arqueocorrelativo: correlativoRes.data.correlativo
            }));
        } catch (error) {
            console.error('Error cargando datos:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los datos iniciales'
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePuntoChange = (e) => {
        setSelectedPunto(e.value);
        setFormData(prev => ({...prev, punto_recaud_id: e.value.id}));
    };

    const handleAddDetalle = () => {
        if (!selectedPunto) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un punto de recaudación'
            });
            return;
        }

        setDetalles([
            ...detalles, 
            {
                id: Date.now(),
                punto_recaud_id: selectedPunto.id,
                punto_nombre: selectedPunto.nombre,
                servicio_id: null,
                servicio_nombre: '',
                cantidad: 0,
                precio: 0,
                importe: 0
            }
        ]);
    };

    const handleRemoveDetalle = (id) => {
        setDetalles(detalles.filter(d => d.id !== id));
    };

    const handleServicioChange = (id, servicioId) => {
        setDetalles(detalles.map(d => {
            if (d.id === id) {
                const servicio = servicios.find(s => s.id === servicioId);
                return {
                    ...d, 
                    servicio_id: servicioId,
                    servicio_nombre: servicio.nombre,
                    precio: servicio.precio,
                    importe: d.cantidad * servicio.precio
                };
            }
            return d;
        }));
    };

    const handleCantidadChange = (id, cantidad) => {
        setDetalles(detalles.map(d => {
            if (d.id === id) {
                return {
                    ...d, 
                    cantidad,
                    importe: cantidad * d.precio
                };
            }
            return d;
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!formData.arqueonombreoperador) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Dato requerido',
                    detail: 'Debe ingresar el nombre del operador'
                });
                return;
            }

            if (detalles.length === 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin detalles',
                    detail: 'Debe agregar al menos un detalle'
                });
                return;
            }

            const invalidDetalles = detalles.filter(d => !d.servicio_id || d.cantidad <= 0);
            if (invalidDetalles.length > 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: 'Todos los detalles deben tener servicio y cantidad mayor a cero'
                });
                return;
            }

            setLoading(true);

            const requestData = {
                ...formData,
                detalles: detalles.map(d => ({
                    servicio_id: d.servicio_id,
                    cantidad: d.cantidad
                }))
            };

            await api.post('arqueo-recaudacion', requestData);
            
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Arqueo creado correctamente'
            });

            navigate('/arqueo-recaudacion');
        } catch (error) {
            console.error('Error al guardar:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo crear el arqueo'
            });
        } finally {
            setLoading(false);
        }
    };

    const totalImporte = detalles.reduce((sum, d) => sum + parseFloat(d.importe || 0), 0);

    return (
        <div className="card">
            <Toast ref={toast} />
            <h5>Nuevo Arqueo de Recaudación</h5>
            
            <div className="grid">
                <div className="col-12 md:col-3">
                    <label htmlFor="correlativo">Correlativo</label>
                    <InputText
                        id="correlativo"
                        value={formData.arqueocorrelativo}
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
                            { label: 'Turno 1', value: '1' },
                            { label: 'Turno 2', value: '2' }
                        ]}
                        onChange={(e) => setFormData({...formData, arqueoturno: e.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <label htmlFor="operador">Operador</label>
                    <InputText
                        id="operador"
                        value={formData.arqueonombreoperador}
                        onChange={(e) => setFormData({...formData, arqueonombreoperador: e.target.value})}
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-6">
                    <label>Punto de Recaudación</label>
                    <div className="p-inputgroup">
                        <Dropdown
                            value={selectedPunto}
                            options={puntosRecaudacion}
                            onChange={handlePuntoChange}
                            optionLabel="nombre"
                            placeholder="Seleccione punto de recaudación"
                            className="w-full"
                        />
                        <Button icon="pi pi-plus" onClick={handleAddDetalle} />
                    </div>
                </div>

                <div className="col-12">
                    <h6>Detalles de Recaudación</h6>
                    <DataTable 
                        value={detalles} 
                        loading={loading}
                        emptyMessage="No hay detalles agregados"
                    >
                        <Column field="punto_nombre" header="Punto de Recaudación" />
                        <Column header="Servicio" body={(rowData) => (
                            <Dropdown
                                value={rowData.servicio_id}
                                options={servicios}
                                onChange={(e) => handleServicioChange(rowData.id, e.value)}
                                optionLabel="nombre"
                                optionValue="id"
                                placeholder="Seleccionar"
                                className="w-full"
                            />
                        )} />
                        <Column header="Cantidad" body={(rowData) => (
                            <InputNumber
                                value={rowData.cantidad}
                                onChange={(e) => handleCantidadChange(rowData.id, e.value)}
                                min={0}
                                showButtons
                            />
                        )} />
                        <Column field="precio" header="Precio" body={(rowData) => rowData.precio ? `Bs. ${rowData.precio}` : ''} />
                        <Column field="importe" header="Importe" body={(rowData) => rowData.importe ? `Bs. ${rowData.importe.toFixed(2)}` : 'Bs. 0.00'} />
                        <Column header="Acciones" body={(rowData) => (
                            <Button 
                                icon="pi pi-trash" 
                                className="p-button-danger p-button-sm" 
                                onClick={() => handleRemoveDetalle(rowData.id)}
                            />
                        )} />
                    </DataTable>
                </div>

                <div className="col-12 flex justify-content-between align-items-center">
                    <h5>Total: Bs. {totalImporte.toFixed(2)}</h5>
                    <Button 
                        label="Guardar Arqueo" 
                        icon="pi pi-save" 
                        onClick={handleSubmit} 
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
