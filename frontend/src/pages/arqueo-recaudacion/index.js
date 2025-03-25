import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { FilterTags } from 'components/FilterTags';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import axios from 'axios';

const ArqueoRecaudacionPage = (props) => {
    const app = useApp();
    const apiPath = process.env.REACT_APP_API_PATH; // nueva variable
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        fechaDesde: null,
        fechaHasta: null,
        turno: null,
        puntoRecaudacion: null
    });
    const [puntosRecaudacion, setPuntosRecaudacion] = useState([]);

    const turnos = [
        { label: 'Mañana', value: 'M' },
        { label: 'Tarde', value: 'T' },
        { label: 'Noche', value: 'N' }
    ];

    useEffect(() => {
        fetchPuntosRecaudacion();
        fetchArqueos();
    }, []);

    const fetchPuntosRecaudacion = async () => {
        try {
            const response = await axios.get(`${apiPath}arqueo-recaudacion-puntos`);
            setPuntosRecaudacion(response.data);
        } catch (err) {
            console.error("Error fetching puntos de recaudacion:", err);
        }
    };

    const fetchArqueos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const params = new URLSearchParams();
            if (filters.fechaDesde) params.append('fecha_desde', filters.fechaDesde.toISOString().split('T')[0]);
            if (filters.fechaHasta) params.append('fecha_hasta', filters.fechaHasta.toISOString().split('T')[0]);
            if (filters.turno) params.append('turno', filters.turno);
            if (filters.puntoRecaudacion) params.append('punto_recaud_id', filters.puntoRecaudacion);
            
            const response = await axios.get(`${apiPath}arqueo-recaudacion?${params.toString()}`);
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setRecords(response.data);
        } catch (err) {
            setError(err.message || 'Error al cargar los arqueos');
            console.error("Error fetching arqueos:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchArqueos();
    };

    const handleClearFilters = () => {
        setFilters({
            fechaDesde: null,
            fechaHasta: null,
            turno: null,
            puntoRecaudacion: null
        });
    };

    const formatDate = (rowData) => {
        if (!rowData.arqueofecha) return '';
        const date = new Date(rowData.arqueofecha);
        return date.toLocaleDateString('es-ES');
    };

    const formatTurno = (rowData) => {
        const turnos = { 'M': 'Mañana', 'T': 'Tarde', 'N': 'Noche' };
        return turnos[rowData.arqueoturno] || rowData.arqueoturno;
    };

    const formatEstado = (rowData) => {
        const estados = { 'V': 'Activo', 'C': 'Cancelado' };
        return estados[rowData.arqueoestado] || rowData.arqueoestado;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon="pi pi-eye" 
                    className="p-button-rounded p-button-info p-button-sm" 
                    onClick={() => app.navigate(`/arqueo-recaudacion/${rowData.arqueorecid}`)} 
                />
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success p-button-sm" 
                    onClick={() => app.navigate(`/arqueo-recaudacion/edit/${rowData.arqueorecid}`)} 
                />
            </div>
        );
    };

    if (error) {
        return <PageRequestError error={error} />;
    }

    return (
        <main className="main-page">
            <section className="page-section mb-3">
                <div className="container-fluid">
                    <div className="grid justify-content-between align-items-center">
                        <div className="col">
                            <Title 
                                title="Arqueo de Recaudación" 
                                titleClass="text-2xl text-primary font-bold" 
                                separator={false} 
                            />
                        </div>
                        <div className="col-fixed">
                            <Link to="/arqueo-recaudacion/add">
                                <Button 
                                    label="Nuevo Arqueo" 
                                    icon="pi pi-plus" 
                                    className="p-button bg-primary"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-section">
                <div className="container-fluid">
                    <div className="card p-3 mb-3">
                        <h5>Filtros</h5>
                        <div className="grid">
                            <div className="col-12 md:col-3">
                                <label htmlFor="fechaDesde" className="block mb-1">Fecha Desde</label>
                                <Calendar
                                    id="fechaDesde"
                                    value={filters.fechaDesde}
                                    onChange={(e) => setFilters({...filters, fechaDesde: e.value})}
                                    showIcon
                                    dateFormat="dd/mm/yy"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 md:col-3">
                                <label htmlFor="fechaHasta" className="block mb-1">Fecha Hasta</label>
                                <Calendar
                                    id="fechaHasta"
                                    value={filters.fechaHasta}
                                    onChange={(e) => setFilters({...filters, fechaHasta: e.value})}
                                    showIcon
                                    dateFormat="dd/mm/yy"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 md:col-2">
                                <label htmlFor="turno" className="block mb-1">Turno</label>
                                <Dropdown
                                    id="turno"
                                    value={filters.turno}
                                    options={turnos}
                                    onChange={(e) => setFilters({...filters, turno: e.value})}
                                    placeholder="Seleccione"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 md:col-2">
                                <label htmlFor="puntoRecaudacion" className="block mb-1">Punto de Recaudación</label>
                                <Dropdown
                                    id="puntoRecaudacion"
                                    value={filters.puntoRecaudacion}
                                    options={puntosRecaudacion}
                                    onChange={(e) => setFilters({...filters, puntoRecaudacion: e.value})}
                                    placeholder="Seleccione"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 md:col-2 flex align-items-end">
                                <div className="flex gap-2 w-full">
                                    <Button
                                        label="Buscar"
                                        icon="pi pi-search"
                                        onClick={handleSearch}
                                        className="w-full"
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        onClick={handleClearFilters}
                                        className="p-button-outlined"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <DataTable
                            value={records}
                            loading={loading}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            emptyMessage="No se encontraron registros"
                            responsiveLayout="stack"
                            breakpoint="960px"
                        >
                            <Column field="arqueocorrelativo" header="Nro. Arqueo" sortable />
                            <Column field="arqueofecha" header="Fecha" body={formatDate} sortable />
                            <Column field="arqueoturno" header="Turno" body={formatTurno} sortable />
                            <Column field="arqueonombreoperador" header="Operador" sortable />
                            <Column field="arqueonombresupervisor" header="Supervisor" sortable />
                            <Column field="puntoRecaudacion.puntorecaud_nombre" header="Punto de Recaudación" />
                            <Column field="arqueoestado" header="Estado" body={formatEstado} />
                            <Column body={actionBodyTemplate} headerStyle={{ width: '8rem' }} />
                        </DataTable>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ArqueoRecaudacionPage;
