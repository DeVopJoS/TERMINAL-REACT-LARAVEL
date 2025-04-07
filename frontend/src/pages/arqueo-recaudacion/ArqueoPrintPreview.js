import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import useApi from 'hooks/useApi';
import ArqueoTemplate from '../../pdf/ArqueoTemplate';

const ArqueoPrintPreview = ({ arqueos = [] }) => {
    const [loading, setLoading] = useState(true);
    const [arqueosData, setArqueosData] = useState([]);
    const api = useApi();

    useEffect(() => {
        if (arqueos && arqueos.length > 0) {
            loadArqueosData();
        } else {
            setLoading(false);
        }
    }, [arqueos]);

    const loadArqueosData = async () => {
        try {
            setLoading(true);
            const arqueosConDatos = [];
            
            for (const arqueo of arqueos) {
                if (arqueo.arqueoid) {
                    try {
                        // Obtener datos del arqueo y cortes
                        const [arqueoResponse, cortesResponse] = await Promise.all([
                            api.get(`arqueocab/view/${arqueo.arqueoid}`),
                            api.get(`arqueodetcortes/index/arqueoid/${arqueo.arqueoid}`)
                        ]);
                        
                        // Asegurar que los cortes estén correctamente estructurados
                        const cortes = cortesResponse.data?.records?.[0] || {};
                        
                        const arqueoCompleto = {
                            ...arqueoResponse.data,
                            cortes: cortes, // Asignar los cortes directamente
                            punto_nombre: arqueo.punto_recaudacion?.puntorecaud_nombre || 'No especificado'
                        };
                        
                        arqueosConDatos.push(arqueoCompleto);
                    } catch (error) {
                        console.error(`Error al cargar datos del arqueo ${arqueo.arqueoid}:`, error);
                    }
                }
            }
            
            setArqueosData(arqueosConDatos);
            console.log("Datos de arqueos cargados:", arqueosConDatos); // Para debug
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return parseFloat(value || 0).toFixed(2);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex align-items-center justify-content-center" style={{ height: '70vh' }}>
                <div className="text-center">
                    <ProgressSpinner style={{width: '50px', height: '50px'}} />
                    <h3 className="mt-3">Cargando arqueos...</h3>
                </div>
            </div>
        );
    }

    if (!arqueos || arqueos.length === 0 || arqueosData.length === 0) {
        return (
            <div className="flex align-items-center justify-content-center" style={{ height: '70vh' }}>
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: '#FFA500' }}></i>
                    <h3 className="mt-3">No hay arqueos seleccionados para imprimir</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="arqueo-print-container">
            <div className="no-print mb-4">
                <Button 
                    label="Imprimir" 
                    icon="pi pi-print" 
                    className="p-button-primary" 
                    onClick={() => window.print()} 
                />
            </div>

            {arqueosData.map((arqueo, index) => (
                <div key={index} className="arqueo-print-page">
                    <ArqueoTemplate arqueo={arqueo} />
                    {index < arqueosData.length - 1 && <div className="page-break"></div>}
                </div>
            ))}

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    .arqueo-print-page { page-break-after: always; }
                    .page-break { display: block; page-break-before: always; }
                    body { margin: 0; padding: 0; }
                }
            `}</style>
        </div>
    );
};

export default ArqueoPrintPreview;
