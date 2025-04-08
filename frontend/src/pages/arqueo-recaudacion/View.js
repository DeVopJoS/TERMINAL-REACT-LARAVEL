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
    const [acta, setActa] = useState(null);
    
    useEffect(() => {
        loadActa();
    }, []);
    
    const loadActa = async () => {
        try {
            setLoading(true);
            const response = await api.get(`arqueo-recaudacion/${id}`);
            setActa(response.data);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cargar el detalle del acta'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !acta) {
        return (
            <div className="card">
                <div className="card-body p-5 text-center">
                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                    <p>Cargando datos del acta...</p>
                </div>
            </div>
        );
    }
    
    const totalImporte = acta.detalles?.reduce(
        (sum, item) => sum + parseFloat(item.aed_importebs || 0), 0
    ) || parseFloat(acta.ae_recaudaciontotalbs || 0);
    
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Detalle de Acta #{acta.ae_correlativo}</h5>
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
                            <p className="text-lg">{acta.ae_correlativo}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Fecha</h6>
                            <p className="text-lg">{formatDate(acta.ae_fecha, 'dd/MM/yyyy')}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Operador</h6>
                            <p className="text-lg">{acta.ae_operador1erturno || acta.ae_operador2doturno || 'No especificado'}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="card">
                        <div className="card-body">
                            <h6>Punto de Recaudación</h6>
                            <p className="text-lg">
                                {acta.punto_recaudacion?.puntorecaud_nombre || 
                                 `No especificado (ID: ${acta.punto_recaud_id || 'No ID'})`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h6>Detalles de Recaudación</h6>
                        </div>
                        <div className="card-body">
                            <DataTable value={acta.detalles}>
                                <Column field="servicio.servicio_descripcion" header="Servicio" />
                                <Column field="servicio.servicio_abreviatura" header="Código" />
                                <Column field="aed_cantidad" header="Cantidad" />
                                <Column field="aed_preciounitario" header="Tarifa" body={(rowData) => `Bs. ${parseFloat(rowData.aed_preciounitario).toFixed(2)}`} />
                                <Column field="aed_importebs" header="Importe" body={(rowData) => `Bs. ${parseFloat(rowData.aed_importebs).toFixed(2)}`} />
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
