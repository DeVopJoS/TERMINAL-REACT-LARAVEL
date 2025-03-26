import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { formatDate } from '../../utils/utils';

export default function ArqueoRecaudacionView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const api = useApi();
    const toast = useRef(null);
    
    const [loading, setLoading] = useState(true);
    const [arqueo, setArqueo] = useState(null);
    
    useEffect(() => {
        loadArqueo();
    }, []);
    
    const loadArqueo = async () => {
        try {
            setLoading(true);
            const response = await api.get(`arqueo-recaudacion/${id}`);
            setArqueo(response.data);
        } catch (error) {
            console.error('Error al cargar arqueo:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cargar el detalle del arqueo'
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
    
    const totalImporte = arqueo.detalles.reduce(
        (sum, item) => sum + parseFloat(item.arqueodetimportebs || 0), 0
    );
    
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Detalle de Arqueo #{arqueo.arqueocorrelativo}</h5>
                <Button 
                    label="Volver" 
                    icon="pi pi-arrow-left" 
                    className="p-button-secondary"
                    onClick={() => navigate('/arqueo-recaudacion')}
                />
            </div>
            
            <div className="grid">
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Correlativo</h6>
                            <p className="text-lg">{arqueo.arqueocorrelativo}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Fecha</h6>
                            <p className="text-lg">{formatDate(arqueo.arqueofecha, 'dd/MM/yyyy')}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Operador</h6>
                            <p className="text-lg">{arqueo.arqueonombreoperador}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Punto de Recaudación</h6>
                            <p className="text-lg">{arqueo.puntoRecaudacion?.puntorecaud_nombre}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h6>Detalles de Recaudación</h6>
                        </div>
                        <div className="card-body">
                            <DataTable value={arqueo.detalles}>
                                <Column field="servicio.servicio_descripcion" header="Servicio" />
                                <Column field="servicio.servicio_abreviatura" header="Código" />
                                <Column field="arqueodetcantidad" header="Cantidad" />
                                <Column field="arqueodettarifabs" header="Tarifa" body={(rowData) => `Bs. ${parseFloat(rowData.arqueodettarifabs).toFixed(2)}`} />
                                <Column field="arqueodetimportebs" header="Importe" body={(rowData) => `Bs. ${parseFloat(rowData.arqueodetimportebs).toFixed(2)}`} />
                            </DataTable>
                        </div>
                        <div className="card-footer">
                            <div className="flex justify-content-end">
                                <h5>Total: Bs. {totalImporte.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
