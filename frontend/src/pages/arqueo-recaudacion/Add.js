import React, { useState, useEffect, useRef } from 'react';
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

export default function ArqueoRecaudacionAdd() {
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        arqueocorrelativo: '',
        arqueofecha: new Date(),
        arqueoturno: 'M',
        detalles: []
    });

    // Estados para el formulario de detalle
    const [servicios, setServicios] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState(null);
    const [cantidad, setCantidad] = useState(0);
    const [puntosRecaudacion, setPuntosRecaudacion] = useState([]);
    const [selectedPunto, setSelectedPunto] = useState(null);
    const [operadorNombre, setOperadorNombre] = useState('');

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);

            try {
                const serviciosRes = await api.get('arqueo-recaudacion-servicios');
                
                if (serviciosRes && serviciosRes.data) {
                    if (Array.isArray(serviciosRes.data)) {
                        setServicios(serviciosRes.data);
                    }
                }
            } catch (error) {
            }
            
            try {
                const [puntosRes, correlativoRes] = await Promise.all([
                    api.get('arqueo-recaudacion-puntos'),
                    api.get('arqueo-recaudacion-correlativo')
                ]);
                
                setPuntosRecaudacion(puntosRes.data || []);
                
                if (correlativoRes.data && correlativoRes.data.correlativo) {
                    setFormData(prev => ({
                        ...prev,
                        arqueocorrelativo: correlativoRes.data.correlativo
                    }));
                }
            } catch (error) {
            }
            
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

    const handleAddDetalle = () => {
        if (!selectedServicio || !selectedPunto || cantidad <= 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'Datos incompletos',
                detail: 'Debe seleccionar servicio, punto y cantidad mayor a cero'
            });
            return;
        }

        if (!operadorNombre.trim()) {
            toast.current.show({
                severity: 'warn',
                summary: 'Datos incompletos',
                detail: 'Debe ingresar el nombre del operador'
            });
            return;
        }

        let servicio_id, precio, descripcion;
        
        if (typeof selectedServicio === 'number') {
            const servicioObj = servicios.find(s => s.value === selectedServicio);
            if (!servicioObj) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se encontró información del servicio seleccionado'
                });
                return;
            }
            servicio_id = servicioObj.value;
            precio = parseFloat(servicioObj.precio) || 0;
            descripcion = servicioObj.label || '';
        } else {
            servicio_id = selectedServicio.value;
            precio = parseFloat(selectedServicio.precio) || 0;
            descripcion = selectedServicio.label || '';
        }
        
        const importe = cantidad * precio;

        let punto_recaud_id;
        let puntorecaud_nombre;
        
        if (typeof selectedPunto === 'object' && selectedPunto !== null) {
            punto_recaud_id = selectedPunto.value;
            puntorecaud_nombre = selectedPunto.label;
        } else {
            punto_recaud_id = selectedPunto;
            const puntoObj = puntosRecaudacion.find(p => p.value === selectedPunto);
            puntorecaud_nombre = puntoObj ? puntoObj.label : 'Punto no identificado';
        }

        const nuevoDetalle = {
            servicio_id: servicio_id,
            servicio_nombre: descripcion,
            arqueodetcantidad: cantidad,
            arqueodettarifabs: precio,
            arqueodetimportebs: importe,
            arqueonombreoperador: operadorNombre,
            punto_recaud_id: punto_recaud_id,
            puntorecaud_nombre: puntorecaud_nombre
        };
        
        setFormData(prev => ({
            ...prev,
            detalles: [...prev.detalles, nuevoDetalle]
        }));

        // Mantener el operador y punto para facilitar múltiples entradas
        setSelectedServicio(null);
        setCantidad(0);
    };

    const handleRemoveDetalle = (index) => {
        setFormData(prev => ({
            ...prev,
            detalles: prev.detalles.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        try {
            if (formData.detalles.length === 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin detalles',
                    detail: 'Debe agregar al menos un detalle'
                });
                return;
            }

            setLoading(true);
            
            const puntosOperadorMap = {};
            
            formData.detalles.forEach(detalle => {
                const key = `${detalle.punto_recaud_id}_${detalle.arqueonombreoperador}`;
                
                if (!puntosOperadorMap[key]) {
                    puntosOperadorMap[key] = {
                        arqueocorrelativo: formData.arqueocorrelativo,
                        arqueofecha: formData.arqueofecha instanceof Date 
                            ? formData.arqueofecha.toISOString().split('T')[0]
                            : formData.arqueofecha,
                        arqueoturno: formData.arqueoturno,
                        punto_recaud_id: detalle.punto_recaud_id,
                        arqueonombreoperador: detalle.arqueonombreoperador,
                        detalles: []
                    };
                }
                
                puntosOperadorMap[key].detalles.push({
                    servicio_id: detalle.servicio_id,
                    arqueodetcantidad: detalle.arqueodetcantidad,
                    arqueodettarifabs: detalle.arqueodettarifabs,
                    arqueodetimportebs: detalle.arqueodetimportebs
                });
            });
            
            // Convertir a array y asignar correlativo incremental si hay múltiples grupos
            const arqueos = Object.values(puntosOperadorMap);
            const baseCorrelativo = parseInt(formData.arqueocorrelativo) || 0;
            
            if (arqueos.length > 1) {
                // Si hay múltiples arqueos, incrementamos el correlativo para cada uno
                arqueos.forEach((arqueo, index) => {
                    arqueo.arqueocorrelativo = baseCorrelativo + index;
                });
            }
            
            // Enviamos la data
            try {
                if (arqueos.length === 1) {
                    // Si solo hay un arqueo, enviarlo como objeto único
                    const response = await api.post('arqueo-recaudacion', arqueos[0]);
                    
                    toast.current.show({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Arqueo creado correctamente'
                    });
                } else {
                    // Si hay múltiples arqueos, crear cada uno individualmente
                    for (const arqueo of arqueos) {
                        await api.post('arqueo-recaudacion', arqueo);
                    }
                    
                    toast.current.show({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: `${arqueos.length} arqueos creados correctamente`
                    });
                }
                
                navigate('/arqueo-recaudacion');
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message);
            }
        } catch (error) {
            console.error('Error al crear arqueo:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || error.message || 'No se pudo crear el arqueo'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <h5>Nuevo Arqueo de Recaudación</h5>
            
            <div className="grid">
                <div className="col-12 md:col-4">
                    <label>Fecha</label>
                    <Calendar 
                        value={formData.arqueofecha}
                        onChange={(e) => setFormData({...formData, arqueofecha: e.value})}
                        dateFormat="dd/mm/yy"
                        showIcon
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-4">
                    <label>Turno</label>
                    <Dropdown
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

                {/* Sección de detalle */}
                <div className="col-12">
                    <div className="p-3 border-1 border-round border-300 mt-3">
                        <h6>Agregar nuevo detalle</h6>
                        <div className="grid">
                            <div className="col-12 md:col-4">
                                <label>Operador</label>
                                <InputText
                                    value={operadorNombre}
                                    onChange={(e) => setOperadorNombre(e.target.value)}
                                    className="w-full"
                                    placeholder="Nombre del operador"
                                />
                            </div>

                            <div className="col-12 md:col-4">
                                <label>Punto de Recaudación</label>
                                <Dropdown
                                    value={selectedPunto}
                                    options={puntosRecaudacion}
                                    onChange={(e) => setSelectedPunto(e.value)}
                                    optionLabel="label"
                                    placeholder="Seleccione punto"
                                    className="w-full"
                                />
                            </div>

                            <div className="col-12 md:col-4">
                                <label>Servicio</label>
                                <Dropdown
                                    value={selectedServicio}
                                    options={servicios}
                                    onChange={(e) => {
                                        setSelectedServicio(e.value);
                                    }}
                                    optionLabel="label"
                                    placeholder="Seleccione servicio"
                                    className="w-full"
                                    filter
                                    dataKey="value"
                                    valueTemplate={(option) => {
                                        return option ? option.label : 'Seleccione servicio';
                                    }}
                                />
                                {loading && <small>Cargando servicios...</small>}
                            </div>

                            <div className="col-12 md:col-4">
                                <label>Cantidad</label>
                                <div className="p-inputgroup">
                                    <InputNumber
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.value)}
                                        min={0}
                                        showButtons
                                        className="w-full"
                                    />
                                    <Button 
                                        icon="pi pi-plus" 
                                        onClick={handleAddDetalle}
                                        disabled={!selectedServicio || !selectedPunto || cantidad <= 0 || !operadorNombre.trim()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de detalles */}
                <div className="col-12">
                    <DataTable 
                        value={formData.detalles}
                        className="mt-3"
                        emptyMessage="No se han agregado servicios"
                    >
                        <Column field="servicio_nombre" header="Servicio" />
                        <Column field="arqueodetcantidad" header="Cantidad" />
                        <Column 
                            field="arqueodettarifabs" 
                            header="Tarifa" 
                            body={(rowData) => `Bs. ${parseFloat(rowData.arqueodettarifabs || 0).toFixed(2)}`}
                        />
                        <Column 
                            field="arqueodetimportebs" 
                            header="Total" 
                            body={(rowData) => `Bs. ${parseFloat(rowData.arqueodetimportebs || 0).toFixed(2)}`}
                        />
                        <Column field="arqueonombreoperador" header="Operador" />
                        <Column field="puntorecaud_nombre" header="Punto Recaudación" />
                        <Column 
                            body={(rowData, options) => (
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-danger p-button-sm"
                                    onClick={() => handleRemoveDetalle(options.rowIndex)}
                                />
                            )}
                        />
                    </DataTable>
                </div>

                {/* Total y botón guardar */}
                <div className="col-12 flex justify-content-between align-items-center">
                    <h5>
                        Total: Bs. {formData.detalles.reduce((sum, det) => sum + parseFloat(det.arqueodetimportebs || 0), 0).toFixed(2)}
                    </h5>
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
