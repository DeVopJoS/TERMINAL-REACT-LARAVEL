import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { confirmDialog } from 'primereact/confirmdialog';
import useApp from 'hooks/useApp';
import axios from 'axios';

const ArqueoRecaudacionViewPage = () => {
    const { id } = useParams();
    const app = useApp();
    const [loading, setLoading] = useState(true);
    const [arqueo, setArqueo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArqueo();
    }, [id]);

    const fetchArqueo = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get(`/api/arqueo-recaudacion/${id}`);
            setArqueo(response.data);
        } catch (err) {
            setError(err.message || 'Error al cargar el arqueo');
            console.error("Error fetching arqueo:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES');
    };

    const formatDateTime = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.toLocaleDateString('es-ES')} ${d.toLocaleTimeString('es-ES')}`;
    };

    const formatTurno = (turno) => {
        const turnos = { 'M': 'Mañana', 'T': 'Tarde', 'N': 'Noche' };
        return turnos[turno] || turno;
    };

    const formatEstado = (estado) => {
        const estados = { 'V': 'Activo', 'C': 'Cancelado' };
        return estados[estado] || estado;
    };

    const handleEdit = () => {
        app.navigate(`/arqueo-recaudacion/edit/${id}`);
    };

    const handleDelete = () => {
        confirmDialog({
            message: '¿Está seguro que desea anular este arqueo?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    await axios.put(`/api/arqueo-recaudacion/${id}`, {
                        ...arqueo,
                        arqueoestado: 'C'
                    });
                    
                    app.showToast({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Arqueo anulado correctamente',
                        life: 3000
                    });
                    
                    app.navigate('/arqueo-recaudacion');
                } catch (error) {
                    app.showToast({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al anular el arqueo',
                        life: 3000
                    });
                    console.error("Error canceling arqueo:", error);
                }
            }
        });
    };

    function ActionButton() {
        const items = [
            {
                label: "Editar",
                command: handleEdit,
                icon: "pi pi-pencil"
            },
            {
                label: "Anular",
                command: handleDelete,
                icon: "pi pi-trash"
            }
        ];
        
        return (<Menubar className="p-0" model={items} />);
    }

    if (loading) {
        return (
            <div className="p-3 text-center">
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                <div>Cargando datos...</div>
            </div>
        );
    }

    if (error) {
        return <PageRequestError error={error} />;
    }

    if (!arqueo) {
        return <div>No se encontró el arqueo solicitado</div>;
    }

    return (
        <main className="main-page">
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
                                title={`Arqueo #${arqueo.arqueocorrelativo}`}
                                titleClass="text-2xl text-primary font-bold"
                                separator={false}
                            />
                        </div>
                        <div className="col-fixed">
                            <ActionButton />
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-section">
                <div className="container">
                    <div className="card">
                        <h5>Información General</h5>
                        <div className="grid">
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Número de Arqueo</div>
                                        <div className="font-bold">{arqueo.arqueocorrelativo}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Fecha</div>
                                        <div className="font-bold">{formatDate(arqueo.arqueofecha)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Turno</div>
                                        <div className="font-bold">{formatTurno(arqueo.arqueoturno)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Punto de Recaudación</div>
                                        <div className="font-bold">{arqueo.puntoRecaudacion?.puntorecaud_nombre}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Operador</div>
                                        <div className="font-bold">{arqueo.arqueonombreoperador}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Supervisor</div>
                                        <div className="font-bold">{arqueo.arqueonombresupervisor}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Estado</div>
                                        <div className="font-bold">{formatEstado(arqueo.arqueoestado)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Fecha de Registro</div>
                                        <div className="font-bold">{formatDateTime(arqueo.arqueofecharegistro)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h5>Detalles del Arqueo</h5>
                        <DataTable
                            value={arqueo.detalles}
                            responsiveLayout="scroll"
                            emptyMessage="No hay detalles para mostrar"
                        >
                            <Column field="servicio.servicio_descripcion" header="Servicio" />
                            <Column field="arqueodetcantidad" header="Cantidad" />
                            <Column field="arqueodettarifabs" header="Tarifa (Bs)" body={(rowData) => rowData.arqueodettarifabs.toFixed(2)} />
                            <Column field="arqueodetimportebs" header="Importe (Bs)" body={(rowData) => rowData.arqueodetimportebs.toFixed(2)} />
                            <Column field="arqueoestado" header="Estado" body={(rowData) => formatEstado(rowData.arqueoestado)} />
                        </DataTable>
                        
                        <div className="flex justify-content-end mt-3">
                            <div className="text-xl font-bold">
                                Total: {arqueo.detalles.reduce((total, det) => total + parseFloat(det.arqueodetimportebs), 0).toFixed(2)} Bs
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ArqueoRecaudacionViewPage;
