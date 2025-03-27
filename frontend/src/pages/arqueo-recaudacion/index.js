import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { formatDate } from '../../utils/utils';

export default function ArqueoRecaudacionPage() {
    const api = useApi();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [arqueos, setArqueos] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        fecha: null,
        turno: null
    });
    
    const turnoOptions = [
        { label: 'Todos', value: null },
        { label: 'Mañana', value: 'M' },
        { label: 'Tarde', value: 'T' },
        { label: 'Noche', value: 'N' }
    ];

    useEffect(() => {
        loadArqueos();
    }, []);

    const loadArqueos = async () => {
        try {
            setLoading(true);
            let url = 'arqueo-recaudacion';
            const params = [];
            
            if (filters.search) {
                params.push(`search=${encodeURIComponent(filters.search)}`);
            }
            
            if (filters.fecha) {
                const fechaStr = formatDate(filters.fecha, 'yyyy-MM-dd');
                params.push(`fecha=${fechaStr}`);
            }
            
            if (filters.turno) {
                params.push(`turno=${filters.turno}`);
            }
            
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            
            const response = await api.get(url);
            setArqueos(response.data);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los arqueos de recaudación'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        loadArqueos();
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const estadoTemplate = (rowData) => {
        const estado = rowData.arqueoestado;
        let severity = 'info';
        let label = 'Pendiente';
        
        if (estado === 'A') {
            severity = 'success';
            label = 'Arqueo Cerrado';
        } else if (estado === 'P') {
            severity = 'warning';
            label = 'Pendiente';
        } else if (estado === 'V') {
            severity = 'info';
            label = 'Vigente';
        }
        
        return <span className={`p-tag p-tag-${severity}`}>{label}</span>;
    };
    
    const fechaTemplate = (rowData) => {
        try {
            // Convertir la fecha a formato YYYY-MM-DD para evitar problemas de zona horaria
            if (!rowData.arqueofecha) return '';
            
            // Si la fecha viene como string, extraer solo la parte de fecha
            if (typeof rowData.arqueofecha === 'string') {
                // Para una fecha en formato ISO
                if (rowData.arqueofecha.includes('T')) {
                    const fechaParts = rowData.arqueofecha.split('T')[0].split('-');
                    if (fechaParts.length === 3) {
                        // Crear una fecha en formato local (sin hora) para evitar ajustes por zona horaria
                        return `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;
                    }
                } else {
                    // Para una fecha en formato YYYY-MM-DD
                    const fechaParts = rowData.arqueofecha.split('-');
                    if (fechaParts.length === 3) {
                        return `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;
                    }
                }
            }
            
            // Si la fecha es un objeto Date o si los formatos anteriores fallaron
            const fecha = new Date(rowData.arqueofecha);
            // Ajustar la fecha para obtener el día correcto sin ajustes de zona horaria
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1;
            const anio = fecha.getFullYear();
            
            return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${anio}`;
        } catch (error) {
            console.error('Error al formatear fecha:', error);
            return formatDate(rowData.arqueofecha, 'dd/MM/yyyy');
        }
    };
    
    const importeTemplate = (rowData) => {
        // Calcular el importe total sumando todos los detalles
        if (!rowData.detalles || rowData.detalles.length === 0) return 'Bs. 0.00';
        
        const total = rowData.detalles.reduce(
            (sum, item) => sum + parseFloat(item.arqueodetimportebs || 0), 0
        );
        
        return `Bs. ${total.toFixed(2)}`;
    };
    
    const accionesTemplate = (rowData) => {
        return (
            <div className="flex justify-content-center">
                <Link to={`/arqueo-recaudacion/${rowData.arqueorecid}`}>
                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-button-sm mr-2" />
                </Link>
                {rowData.arqueoestado === 'P' && (
                    <Link to={`/arqueo-recaudacion/edit/${rowData.arqueorecid}`}>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-button-sm" />
                    </Link>
                )}
            </div>
        );
    };

    const getTurnoDisplay = (turnoCode) => {
        switch(turnoCode) {
            case 'M': return 'Mañana';
            case 'T': return 'Tarde';
            case 'N': return 'Noche';
            default: return turnoCode;
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Arqueos de Recaudación</h5>
                <div className="flex">
                    <Link to="/arqueo-recaudacion/add">
                        <Button label="Nuevo Arqueo" icon="pi pi-plus" className="mr-2" />
                    </Link>
                    <Link to="/arqueo-recaudacion/arqueo-final">
                        <Button label="Cerrar Arqueo" icon="pi pi-lock" className="p-button-success" />
                    </Link>
                </div>
            </div>

            <div className="grid mb-3">
                <div className="col-12 md:col-3">
                    <InputText
                        placeholder="Buscar..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-3">
                    <Calendar
                        placeholder="Fecha"
                        value={filters.fecha}
                        onChange={(e) => handleFilterChange('fecha', e.value)}
                        dateFormat="dd/mm/yy"
                        showIcon
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-3">
                    <Dropdown
                        placeholder="Turno"
                        value={filters.turno}
                        options={turnoOptions}
                        onChange={(e) => handleFilterChange('turno', e.value)}
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-3">
                    <Button
                        label="Buscar"
                        icon="pi pi-search"
                        onClick={handleSearch}
                        className="w-full"
                        loading={loading}
                    />
                </div>
            </div>

            <DataTable
                value={arqueos}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                loading={loading}
                emptyMessage="No se encontraron arqueos"
            >
                <Column field="arqueocorrelativo" header="Correlativo" sortable />
                <Column field="arqueofecha" header="Fecha" body={fechaTemplate} sortable />
                <Column 
                    field="arqueoturno" 
                    header="Turno" 
                    sortable
                    body={(rowData) => getTurnoDisplay(rowData.arqueoturno)}
                />
                <Column field="arqueonombreoperador" header="Operador" sortable />
                <Column 
                    field="puntoRecaudacion.puntorecaud_nombre" 
                    header="Punto Recaudación" 
                    body={(rowData) => {
                        if (rowData.puntoRecaudacion && rowData.puntoRecaudacion.puntorecaud_nombre) {
                            return rowData.puntoRecaudacion.puntorecaud_nombre;
                        } else if (rowData.punto_recaudacion && rowData.punto_recaudacion.puntorecaud_nombre) {
                            return rowData.punto_recaudacion.puntorecaud_nombre;
                        } else {
                            return 'No especificado';
                        }
                    }}
                    sortable
                />
                <Column header="Total" body={importeTemplate} sortable />
                <Column header="Estado" body={estadoTemplate} sortable />
                <Column header="Acciones" body={accionesTemplate} />
            </DataTable>
        </div>
    );
}
