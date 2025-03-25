import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import axios from 'axios';
import { useRef } from 'react';

const ArqueoRecaudacionAddPage = () => {
    const app = useApp();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [puntosRecaudacion, setPuntosRecaudacion] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [nextCorrelativo, setNextCorrelativo] = useState(null);
    
    const [formData, setFormData] = useState({
        arqueocorrelativo: '',
        arqueofecha: new Date(),
        arqueoturno: 'M',
        punto_recaud_id: '',
        arqueonombreoperador: '',
        arqueonombresupervisor: '',
        detalles: []
    });
    
    const [detalleActual, setDetalleActual] = useState({
        servicio_id: null,
        servicio_nombre: '',
        arqueodetcantidad: 0,
        arqueodettarifabs: 0
    });
    
    const turnos = [
        { label: 'Mañana', value: 'M' },
        { label: 'Tarde', value: 'T' },
        { label: 'Noche', value: 'N' }
    ];
    
    useEffect(() => {
        fetchInitialData();
    }, []);
    
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [puntosResponse, serviciosResponse, correlativoResponse] = await Promise.all([
                axios.get('/api/arqueo-recaudacion-puntos'),
                axios.get('/api/arqueo-recaudacion-servicios'),
                axios.get('/api/arqueo-recaudacion-correlativo')
            ]);
            
            setPuntosRecaudacion(puntosResponse.data);
            setServicios(serviciosResponse.data);
            setFormData(prev => ({
                ...prev,
                arqueocorrelativo: correlativoResponse.data.correlativo
            }));
            setNextCorrelativo(correlativoResponse.data.correlativo);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar datos iniciales',
                life: 3000
            });
            console.error("Error fetching initial data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleDetalleChange = (e) => {
        const { name, value } = e.target;
        setDetalleActual(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'servicio_id') {
            const servicio = servicios.find(s => s.value === value);
            if (servicio) {
                setDetalleActual(prev => ({
                    ...prev,
                    servicio_nombre: servicio.label,
                    arqueodettarifabs: servicio.precio
                }));
            }
        }
    };
    
    const agregarDetalle = () => {
        if (!detalleActual.servicio_id || detalleActual.arqueodetcantidad <= 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Complete los campos del detalle',
                life: 3000
            });
            return;
        }
        
        const importe = detalleActual.arqueodetcantidad * detalleActual.arqueodettarifabs;
        
        const nuevoDetalle = {
            ...detalleActual,
            arqueodetimportebs: importe,
            id: Date.now() // ID temporal para manipulación en frontend
        };
        
        setFormData(prev => ({
            ...prev,
            detalles: [...prev.detalles, nuevoDetalle]
        }));
        
        setDetalleActual({
            servicio_id: null,
            servicio_nombre: '',
            arqueodetcantidad: 0,
            arqueodettarifabs: 0
        });
        
        setShowDialog(false);
    };
    
    const editarDetalle = (detalle) => {
        setDetalleActual({...detalle});
        setShowDialog(true);
    };
    
    const eliminarDetalle = (id) => {
        setFormData(prev => ({
            ...prev,
            detalles: prev.detalles.filter(d => d.id !== id)
        }));
    };
    
    const calcularTotal = () => {
        return formData.detalles.reduce((total, detalle) => 
            total + (detalle.arqueodetcantidad * detalle.arqueodettarifabs), 0);
    };
    
    const handleSubmit = async () => {
        if (!formData.punto_recaud_id || !formData.arqueonombreoperador || !formData.arqueonombresupervisor) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Complete todos los campos requeridos',
                life: 3000
            });
            return;
        }
        
        if (formData.detalles.length === 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe agregar al menos un detalle',
                life: 3000
            });
            return;
        }
        
        setSaving(true);
        try {
            const response = await axios.post('/api/arqueo-recaudacion', formData);
            
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Arqueo creado correctamente',
                life: 3000
            });
            
            // Reiniciar el formulario
            setFormData({
                arqueocorrelativo: nextCorrelativo + 1,
                arqueofecha: new Date(),
                arqueoturno: 'M',
                punto_recaud_id: '',
                arqueonombreoperador: '',
                arqueonombresupervisor: '',
                detalles: []
            });
            
            // Redirigir al listado
            app.navigate('/arqueo-recaudacion');
            
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el arqueo',
                life: 3000
            });
            console.error("Error saving arqueo:", error);
        } finally {
            setSaving(false);
        }
    };
    
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success p-button-sm" 
                    onClick={() => editarDetalle(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger p-button-sm" 
                    onClick={() => eliminarDetalle(rowData.id)} 
                />
            </div>
        );
    };
    
    const importeBodyTemplate = (rowData) => {
        return (rowData.arqueodetcantidad * rowData.arqueodettarifabs).toFixed(2);
    };
    
    if (loading) {
        return (
            <div className="p-3 text-center">
                <ProgressSpinner style={{width:'50px', height:'50px'}} />
                <div>Cargando datos...</div>
            </div>
        );
    }
    
    return (
        <main className="main-page">
            <Toast ref={toast} />
            
            <section className="page-section mb-3">
                <div className="container">
                    <div className="grid justify-content-between align-items-center">
                        <div className="col-fixed">
                            <Button 
                                onClick={() => app.navigate(-1)} 
                                label="" 
                                className="p-button p-button-text" 
                                icon="pi pi-arrow-left" 
                            />
                        </div>
                        <div className="col">
                            <Title 
                                title="Nuevo Arqueo de Recaudación" 
                                titleClass="text-2xl text-primary font-bold" 
                                separator={false} 
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="page-section">
                <div className="container">
                    <div className="card">
                        <h5>Datos Generales</h5>
                        <div className="grid p-fluid">
                            <div className="col-12 md:col-3">
                                <div className="field">
                                    <label htmlFor="arqueocorrelativo">Nro. Arqueo</label>
                                    <InputText
                                        id="arqueocorrelativo"
                                        name="arqueocorrelativo"
                                        value={formData.arqueocorrelativo}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                            </div>
                            
                            <div className="col-12 md:col-3">
                                <div className="field">
                                    <label htmlFor="arqueofecha">Fecha</label>
                                    <Calendar
                                        id="arqueofecha"
                                        name="arqueofecha"
                                        value={formData.arqueofecha}
                                        onChange={(e) => setFormData({...formData, arqueofecha: e.value})}
                                        showIcon
                                        dateFormat="dd/mm/yy"
                                    />
                                </div>
                            </div>
                            
                            <div className="col-12 md:col-3">
                                <div className="field">
                                    <label htmlFor="arqueoturno">Turno</label>
                                    <Dropdown
                                        id="arqueoturno"
                                        name="arqueoturno"
                                        value={formData.arqueoturno}
                                        options={turnos}
                                        onChange={handleInputChange}
                                        placeholder="Seleccione un turno"
                                    />
                                </div>
                            </div>
                            
                            <div className="col-12 md:col-3">
                                <div className="field">
                                    <label htmlFor="punto_recaud_id">Punto de Recaudación</label>
                                    <Dropdown
                                        id="punto_recaud_id"
                                        name="punto_recaud_id"
                                        value={formData.punto_recaud_id}
                                        options={puntosRecaudacion}
                                        onChange={handleInputChange}
                                        placeholder="Seleccione un punto"
                                        className={!formData.punto_recaud_id ? 'p-invalid' : ''}
                                    />
                                </div>
                            </div>
                            
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="arqueonombreoperador">Nombre del Operador</label>
                                    <InputText
                                        id="arqueonombreoperador"
                                        name="arqueonombreoperador"
                                        value={formData.arqueonombreoperador}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese el nombre del operador"
                                        className={!formData.arqueonombreoperador ? 'p-invalid' : ''}
                                    />
                                </div>
                            </div>
                            
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="arqueonombresupervisor">Nombre del Supervisor</label>
                                    <InputText
                                        id="arqueonombresupervisor"
                                        name="arqueonombresupervisor"
                                        value={formData.arqueonombresupervisor}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese el nombre del supervisor"
                                        className={!formData.arqueonombresupervisor ? 'p-invalid' : ''}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <h5>Detalles del Arqueo</h5>
                        
                        <div className="flex justify-content-end mb-2">
                            <Button
                                label="Agregar Servicio"
                                icon="pi pi-plus"
                                onClick={() => setShowDialog(true)}
                                className="p-button-success"
                            />
                        </div>
                        
                        <DataTable 
                            value={formData.detalles}
                            responsiveLayout="scroll"
                            emptyMessage="No hay servicios agregados"
                        >
                            <Column field="servicio_nombre" header="Servicio" />
                            <Column field="arqueodetcantidad" header="Cantidad" />
                            <Column field="arqueodettarifabs" header="Tarifa (Bs)" />
                            <Column header="Importe (Bs)" body={importeBodyTemplate} />
                            <Column body={actionBodyTemplate} headerStyle={{ width: '8rem' }} />
                        </DataTable>
                        
                        <div className="flex justify-content-end mt-3">
                            <div className="text-xl font-bold">
                                Total: {calcularTotal().toFixed(2)} Bs
                            </div>
                        </div>
                        
                        <div className="flex justify-content-end mt-4">
                            <Button
                                label="Guardar Arqueo"
                                icon="pi pi-save"
                                onClick={handleSubmit}
                                className="p-button-primary"
                                loading={saving}
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <Dialog 
                header="Agregar Servicio" 
                visible={showDialog} 
                style={{ width: '50vw' }} 
                onHide={() => setShowDialog(false)}
                modal
                footer={
                    <>
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setShowDialog(false)} />
                        <Button label="Agregar" icon="pi pi-check" className="p-button-primary" onClick={agregarDetalle} />
                    </>
                }
            >
                <div className="grid p-fluid">
                    <div className="col-12 md:col-12">
                        <div className="field">
                            <label htmlFor="servicio_id">Servicio</label>
                            <Dropdown
                                id="servicio_id"
                                name="servicio_id"
                                value={detalleActual.servicio_id}
                                options={servicios}
                                onChange={handleDetalleChange}
                                placeholder="Seleccione un servicio"
                            />
                        </div>
                    </div>
                    
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="arqueodetcantidad">Cantidad</label>
                            <InputNumber
                                id="arqueodetcantidad"
                                name="arqueodetcantidad"
                                value={detalleActual.arqueodetcantidad}
                                onValueChange={(e) => handleDetalleChange({ name: "arqueodetcantidad", value: e.value })}
                                mode="decimal"
                                min={0}
                                showButtons
                                buttonLayout="horizontal"
                            />
                        </div>
                    </div>
                    
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="arqueodettarifabs">Tarifa (Bs)</label>
                            <InputNumber
                                id="arqueodettarifabs"
                                name="arqueodettarifabs"
                                value={detalleActual.arqueodettarifabs}
                                onValueChange={(e) => handleDetalleChange({ name: "arqueodettarifabs", value: e.value })}
                                mode="decimal"
                                min={0}
                                minFractionDigits={2}
                                maxFractionDigits={2}
                            />
                        </div>
                    </div>
                    
                    <div className="col-12 md:col-12">
                        <div className="field">
                            <label>Importe Total (Bs)</label>
                            <div className="p-inputtext p-component p-filled text-right font-bold">
                                {(detalleActual.arqueodetcantidad * detalleActual.arqueodettarifabs).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </main>
    );
};

export default ArqueoRecaudacionAddPage;
