import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

export default function ArqueoRecaudacionEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);
    
    const [loading, setLoading] = useState(true);
    const [arqueo, setArqueo] = useState(null);
    const [formData, setFormData] = useState({
        arqueonombreoperador: '',
        arqueofecha: new Date(),
        detalles: []
    });
    const [servicios, setServicios] = useState([]);
    
    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        try {
            setLoading(true);
            const [arqueoRes, serviciosRes] = await Promise.all([
                api.get(`arqueo-recaudacion/${id}`),
                api.get('arqueo-recaudacion-servicios')
            ]);
            
            setArqueo(arqueoRes.data);
            setServicios(serviciosRes.data);
            
            // Preparar datos para el formulario
            const detalles = arqueoRes.data.detalles.map(item => ({
                id: item.arqueorecdetid,
                servicio_id: item.servicio_id,
                cantidad: item.arqueodetcantidad,
                precio: item.arqueodettarifabs,
                importe: item.arqueodetimportebs
            }));
            
            setFormData({
                arqueonombreoperador: arqueoRes.data.arqueonombreoperador,
                arqueofecha: new Date(arqueoRes.data.arqueofecha),
                detalles
            });
            
        } catch (error) {
            console.error('Error al cargar datos:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los datos del arqueo'
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleCantidadChange = (index, cantidad) => {
        const updatedDetalles = [...formData.detalles];
        const detalle = updatedDetalles[index];
        
        detalle.cantidad = cantidad;
        detalle.importe = cantidad * detalle.precio;
        
        setFormData({
            ...formData,
            detalles: updatedDetalles
        });
    };
    
    const handleSubmit = async () => {
        try {
            setLoading(true);
            
            const requestData = {
                ...formData,
                detalles: formData.detalles.map(d => ({
                    servicio_id: d.servicio_id,
                    cantidad: d.cantidad
                }))
            };
            
            await api.put(`arqueo-recaudacion/${id}`, requestData);
            
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Arqueo actualizado correctamente'
            });
            
            navigate('/arqueo-recaudacion');
        } catch (error) {
            console.error('Error al actualizar arqueo:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar el arqueo'
            });
        } finally {
            setLoading(false);
        }
    };
    
    if (loading || !arqueo) {
        return (
            <div className="card">
                <div className="card-body p-5 text-center">
                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                    <p>Cargando datos del arqueo...</p>
                </div>
            </div>
        );
    }
    
    const totalImporte = formData.detalles.reduce(
        (sum, item) => sum + parseFloat(item.importe || 0), 0
    );
    
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Editar Arqueo #{arqueo.arqueocorrelativo}</h5>
                <Button 
                    label="Volver" 
                    icon="pi pi-arrow-left" 
                    className="p-button-secondary"
                    onClick={() => navigate('/arqueo-recaudacion')}
                />
            </div>
            
            <div className="grid">
                <div className="col-12 md:col-4">
                    <label htmlFor="operador">Operador</label>
                    <InputText
                        id="operador"
                        value={formData.arqueonombreoperador}
                        onChange={(e) => setFormData({...formData, arqueonombreoperador: e.target.value})}
                        className="w-full"
                    />
                </div>
                
                <div className="col-12 md:col-4">
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
                
                <div className="col-12">
                    <label>Detalles</label>
                    <DataTable value={formData.detalles} scrollable>
                        <Column 
                            header="Servicio" 
                            body={(rowData) => {
                                const servicio = servicios.find(s => s.value === rowData.servicio_id);
                                return servicio ? servicio.label : 'No encontrado';
                            }} 
                        />
                        <Column 
                            header="Cantidad" 
                            body={(rowData, options) => (
                                <InputNumber
                                    value={rowData.cantidad}
                                    onChange={(e) => handleCantidadChange(options.rowIndex, e.value)}
                                    min={0}
                                    showButtons
                                />
                            )} 
                        />
                        <Column 
                            header="Precio" 
                            body={(rowData) => `Bs. ${parseFloat(rowData.precio).toFixed(2)}`} 
                        />
                        <Column 
                            header="Importe" 
                            body={(rowData) => `Bs. ${parseFloat(rowData.importe).toFixed(2)}`} 
                        />
                    </DataTable>
                </div>
                
                <div className="col-12 flex justify-content-between align-items-center">
                    <h5>Total: Bs. {totalImporte.toFixed(2)}</h5>
                    <Button 
                        label="Guardar Cambios" 
                        icon="pi pi-save" 
                        onClick={handleSubmit} 
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
