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
        fecha: null
    });
    
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
        const estado = rowData.ae_estado;
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
        if (!rowData.ae_fecha) return '';
        
        return formatDate(rowData.ae_fecha, 'dd/MM/yyyy');
    };
    
    const importeTemplate = (rowData) => {
        // Usar el campo ae_recaudaciontotalbs de actaentregacab
        const total = parseFloat(rowData.ae_recaudaciontotalbs || 0);
        return `Bs. ${total.toFixed(2)}`;
    };
    
    const accionesTemplate = (rowData) => {
        return (
            <div className="flex justify-content-center">
                <Link to={`/arqueo-recaudacion/${rowData.ae_actaid}`}>
                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-button-sm mr-2" />
                </Link>
            </div>
        );
    };
    
    const operadorTemplate = (rowData) => {
        // Usar operador1erturno o operador2doturno
        return rowData.ae_operador1erturno || rowData.ae_operador2doturno || 'No especificado';
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Arqueos de Recaudación</h5>
                <div className="flex">
                    <Link to="/arqueo-recaudacion/arqueo-final">
                        <Button label="Cerrar Arqueo" icon="pi pi-lock" className="p-button-success" />
                    </Link>
                </div>
            </div>

            <div className="grid mb-3">
                <div className="col-12 md:col-4">
                    <InputText
                        placeholder="Buscar..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <Calendar
                        placeholder="Fecha"
                        value={filters.fecha}
                        onChange={(e) => handleFilterChange('fecha', e.value)}
                        dateFormat="dd/mm/yy"
                        showIcon
                        className="w-full"
                        showButtonBar
                    />
                </div>
                <div className="col-12 md:col-4">
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
                emptyMessage="No se encontraron actas de entrega pendientes"
                className="p-datatable-sm text-xs"
                showGridlines
            >
                <Column field="ae_actaid" header="ACTA ID" sortable className="text-xs py-1 px-2" />
                <Column field="ae_correlativo" header="CORRELATIVO" sortable className="text-xs py-1 px-2" />
                <Column 
                    field="punto_recaudacion.puntorecaud_nombre" 
                    header="PUNTO RECAUDACIÓN" 
                    body={(rowData) => {
                        if (rowData.punto_recaudacion && rowData.punto_recaudacion.puntorecaud_nombre) {
                            return rowData.punto_recaudacion.puntorecaud_nombre;
                        } else {
                            return 'No especificado';
                        }
                    }}
                    sortable
                    className="text-xs py-1 px-2"
                />
                <Column 
                    field="ae_fecha" 
                    header="FECHA" 
                    body={fechaTemplate} 
                    sortable 
                    className="text-xs py-1 px-2"
                />
                <Column field="ae_grupo" header="GRUPO" sortable className="text-xs py-1 px-2" />
                <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" sortable className="text-xs py-1 px-2" />
                <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" sortable className="text-xs py-1 px-2" />
                <Column field="ae_observacion" header="OBSERVACIÓN" sortable className="text-xs py-1 px-2" />
                <Column 
                    field="ae_recaudaciontotalbs" 
                    header="RECAUDACIÓN TOTAL BS" 
                    body={(rowData) => {
                        const total = parseFloat(rowData.ae_recaudaciontotalbs || 0);
                        return `Bs. ${total.toFixed(2)}`;
                    }}
                    sortable 
                    className="text-xs py-1 px-2"
                />
                <Column 
                    field="ae_estado" 
                    header="ESTADO" 
                    body={estadoTemplate} 
                    sortable 
                    className="text-xs py-1 px-2"
                />
                <Column 
                    header="ACCIONES" 
                    body={accionesTemplate}
                    className="text-xs py-1 px-2"
                />
            </DataTable>
            
            <div className="mt-2 flex justify-content-between align-items-center text-sm">
                <span>
                    Mostrando registros del 1 al {arqueos.length < 10 ? arqueos.length : 10} de un total de {arqueos.length} registros.
                </span>
            </div>
        </div>
    );
}
