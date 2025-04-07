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
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { formatDate } from '../../utils/utils';
import ArqueoPrintPreview from './ArqueoPrintPreview';

const CORTES_DENOMINACION = [
    { campo: 'arqueocorte200_00', valor: 200, label: '200.00' },
    { campo: 'arqueocorte100_00', valor: 100, label: '100.00' },
    { campo: 'arqueocorte050_00', valor: 50, label: '50.00' },
    { campo: 'arqueocorte020_00', valor: 20, label: '20.00' },
    { campo: 'arqueocorte010_00', valor: 10, label: '10.00' },
    { campo: 'arqueocorte005_00', valor: 5, label: '5.00' },
    { campo: 'arqueocorte002_00', valor: 2, label: '2.00' },
    { campo: 'arqueocorte001_00', valor: 1, label: '1.00' },
    { campo: 'arqueocorte000_50', valor: 0.5, label: '0.50' },
    { campo: 'arqueocorte000_20', valor: 0.2, label: '0.20' },
    { campo: 'arqueocorte000_10', valor: 0.1, label: '0.10' }
];

const getDiferenciaText = (totalCortes, totalRecaudacion) => {
    if (!totalRecaudacion) return "Ninguno";
    
    const diferencia = totalCortes - totalRecaudacion;
    if (diferencia === 0) return "Ninguno";
    if (diferencia > 0) return "Sobrante";
    if (diferencia < 0) return "Faltante";
};

export default function ArqueoRecaudacionPage() {
    const api = useApi();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [arqueos, setArqueos] = useState([]);
    const [selectedArqueos, setSelectedArqueos] = useState([]);
    const [selectedArqueosImprimir, setSelectedArqueosImprimir] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        fecha: new Date()  // Inicializar con fecha actual
    });
    const [showArqueoFinal, setShowArqueoFinal] = useState(false);
    const [showPrintPreview, setShowPrintPreview] = useState(false);

    // Estados para el arqueo final
    const [formData, setFormData] = useState({
        arqueonumero: '',
        arqueofecha: null,
        arqueoturno: 'M',
        arqueohorainicio: new Date(),  
        arqueohorafin: new Date(),  
        arqueosupervisor: '',
        arqueorealizadopor: '',
        arqueorevisadopor: '',
        arqueoobservacion: '',
        cortes: CORTES_DENOMINACION.reduce((acc, den) => ({
            ...acc,
            [den.campo]: 0
        }), {})
    });
    
    const [resumenServicios, setResumenServicios] = useState([]);
    const [detalleOperadores, setDetalleOperadores] = useState([]);
    const [totalRecaudacion, setTotalRecaudacion] = useState(0);
    const [totalCortes, setTotalCortes] = useState(0);
    
    useEffect(() => {
        loadArqueos();
        loadInitialData();
    }, []);

    useEffect(() => {
        loadArqueos();
    }, []);

    useEffect(() => {
        calcularTotalCortes();
    }, [formData.cortes]);
    
    useEffect(() => {
        if (selectedArqueos.length > 0) {
            setShowArqueoFinal(true);
            consultarResumenPorSeleccion();
        } else {
            setShowArqueoFinal(false);
            setResumenServicios([]);
            setDetalleOperadores([]);
            setTotalRecaudacion(0);
        }
    }, [selectedArqueos]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const numeroRes = await api.get('arqueo-recaudacion-numero');
            setFormData(prev => ({ ...prev, arqueonumero: numeroRes.data.numero }));
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

    const consultarResumenPorSeleccion = async () => {
        try {
            setLoading(true);
            
            if (selectedArqueos.length === 0) {
                setResumenServicios([]);
                setDetalleOperadores([]);
                setTotalRecaudacion(0);
                return;
            }
            
            // Obtener fecha del primer acta seleccionada
            const primerActa = selectedArqueos[0];
            if (!primerActa || !primerActa.ae_fecha) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: 'No se pudo determinar la fecha del acta'
                });
                return;
            }
            
            const fecha = new Date(primerActa.ae_fecha);
            setFormData(prev => ({
                ...prev,
                arqueofecha: fecha
            }));
            
            let fechaStr;
            try {
                fechaStr = fecha.toISOString().split('T')[0];
            } catch (e) {
                fechaStr = primerActa.ae_fecha;
            }
                
            const response = await api.get(`arqueo-recaudacion-resumen?fecha=${fechaStr}`);
            
            if (response.data.success) {
                setResumenServicios(response.data.resumen_servicios);
                setDetalleOperadores(response.data.detalle_operadores);
                
                // Calcular total recaudado
                const total = response.data.resumen_servicios.reduce(
                    (sum, item) => sum + parseFloat(item.importe_total), 0
                );
                setTotalRecaudacion(total);
            } else {
                setResumenServicios([]);
                setDetalleOperadores([]);
                setTotalRecaudacion(0);
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos pendientes',
                    detail: response.data.message || 'No se encontraron recaudaciones pendientes'
                });
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo obtener el resumen: ' + (error.message || 'Error desconocido')
            });
        } finally {
            setLoading(false);
        }
    };

    const calcularTotalCortes = () => {
        if (!resumenServicios.length) {
            setTotalCortes(0);
            return 0;
        }

        const total = CORTES_DENOMINACION.reduce((total, den) => {
            return total + (formData.cortes[den.campo] || 0) * den.valor;
        }, 0);
        setTotalCortes(total);
        return total;
    };

    const handleCortesChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            cortes: {
                ...prev.cortes,
                [field]: value
            }
        }));
    };

    const formatTimeForDB = (date) => {
        if (!date) return null;
        if (typeof date === 'string') {
            const [hours, minutes] = date.split(':');
            const today = new Date();
            const timestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours || 0, minutes || 0);
            return timestamp.toISOString();
        }
        return date.toISOString();
    };

    const handleSubmitArqueoFinal = async () => {
        try {
            const requiredFields = {
                arqueofecha: 'Fecha',
                arqueoturno: 'Turno',
                arqueohorainicio: 'Hora inicio',
                arqueohorafin: 'Hora fin',
                arqueosupervisor: 'Supervisor',
                arqueorealizadopor: 'Realizado por', 
                arqueorevisadopor: 'Revisado por'   
            };

            const missingFields = [];
            Object.entries(requiredFields).forEach(([field, label]) => {
                if (!formData[field]) {
                    missingFields.push(label);
                }
            });

            if (missingFields.length > 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: `Complete los campos: ${missingFields.join(', ')}`
                });
                return;
            }

            if (resumenServicios.length === 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos',
                    detail: 'No hay recaudaciones para procesar'
                });
                return;
            }

            setLoading(true);
            const totalCortes = calcularTotalCortes();
            const diferencia = totalCortes - totalRecaudacion;
            const diferenciatipo = diferencia > 0 ? 'S' : diferencia < 0 ? 'F' : null;

            const requestData = {
                arqueonumero: formData.arqueonumero,
                arqueofecha: formData.arqueofecha instanceof Date ? 
                    formData.arqueofecha.toISOString().split('T')[0] : 
                    formData.arqueofecha,
                arqueoturno: formData.arqueoturno,
                arqueohorainicio: formatTimeForDB(formData.arqueohorainicio),
                arqueohorafin: formatTimeForDB(formData.arqueohorafin),
                arqueosupervisor: formData.arqueosupervisor,
                arqueorealizadopor: formData.arqueorealizadopor,
                arqueorevisadopor: formData.arqueorevisadopor, 
                arqueoobservacion: formData.arqueoobservacion,
                arqueorecaudaciontotal: totalRecaudacion,
                arqueodiferencia: diferencia,
                diferenciatipo: diferenciatipo,
                cortes: formData.cortes
            };

            const response = await api.post('arqueo-recaudacion-final', requestData);
            
            if (response.data.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Arqueo final generado correctamente. ${
                        diferencia === 0 ? '(Cuadre exacto)' :
                        diferencia > 0 ? `(Sobrante: Bs. ${diferencia.toFixed(2)})` :
                        `(Faltante: Bs. ${Math.abs(diferencia).toFixed(2)})`
                    }`
                });
                
                setSelectedArqueos([]);
                setShowArqueoFinal(false);
                loadArqueos();
            } else {
                throw new Error(response.data.message || 'Error al generar arqueo');
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || error.message || 'Error al generar arqueo final'
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
        
        if (estado === 'R') {  // modificado estado A a R
            severity = 'success';
            label = 'Recaudado';  
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
    
    // Función para verificar si todas las actas seleccionadas tienen la misma fecha
    const tienenMismaFecha = (arqueosList) => {
        if (!arqueosList || arqueosList.length <= 1) return true;
        
        const primerFecha = new Date(arqueosList[0].ae_fecha).toISOString().split('T')[0];
        return arqueosList.every(arqueo => {
            const fechaActual = new Date(arqueo.ae_fecha).toISOString().split('T')[0];
            return fechaActual === primerFecha;
        });
    };

    // Validar la selección de arqueos - solo permitir seleccionar pendientes
    const onSelectionChange = (e) => {
        // Si es selección de todos (checkbox en header)
        if (e.originalEvent && e.originalEvent.target.classList.contains('p-checkbox-box')) {
            // Filtrar solo los pendientes de todos los arqueos
            const pendientes = arqueos.filter(item => item.ae_estado === 'P');
            setSelectedArqueos(pendientes);
            return;
        }

        // Para selección individual
        const selection = e.value;
        
        // Verificar que la nueva selección solo incluya pendientes
        const todosPendientes = selection.every(item => item.ae_estado === 'P');
        if (!todosPendientes) {
            toast.current.show({
                severity: 'warn',
                summary: 'Selección incorrecta',
                detail: 'Solo se pueden seleccionar arqueos en estado Pendiente'
            });
            return;
        }
        
        setSelectedArqueos(selection);
    };

    // Selección para impresión con un segundo checkbox
    const imprimirSelectionTemplate = (rowData) => {
        const isRecaudado = rowData.ae_estado === 'R';
        const isSelected = selectedArqueosImprimir.some(item => item.ae_actaid === rowData.ae_actaid);
        
        // Mostrar checkbox solo para los recaudados
        if (!isRecaudado) {
            return <span></span>;
        }

        return (
            <div className="flex justify-content-center">
                <div 
                    className={`custom-checkbox ${isSelected ? 'checked' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleImprimirSelection(rowData);
                    }}
                >
                    {isSelected && <i className="pi pi-check"></i>}
                </div>
            </div>
        );
    };

    // Header para selección de impresión
    const imprimirHeaderTemplate = () => {
        // Determinar si todos los recaudados están seleccionados
        const recaudados = arqueos.filter(item => item.ae_estado === 'R');
        const allSelected = recaudados.length > 0 && 
            recaudados.every(item => 
                selectedArqueosImprimir.some(selected => selected.ae_actaid === item.ae_actaid)
            );
        
        if (recaudados.length === 0) {
            return <span><i className="pi pi-print" style={{ marginRight: '5px' }}></i>Imprimir</span>;
        }
        
        return (
            <div className="flex align-items-center justify-content-center">
                <div className="flex align-items-center">
                    <div 
                        className={`custom-checkbox ${allSelected ? 'checked' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (allSelected) {
                                setSelectedArqueosImprimir([]);
                            } else {
                                setSelectedArqueosImprimir([...recaudados]);
                            }
                        }}
                    >
                        {allSelected && <i className="pi pi-check"></i>}
                    </div>
                    <i className="pi pi-print ml-2" style={{ fontSize: '0.9rem' }}></i>
                </div>
            </div>
        );
    };

    // Función para marcar/desmarcar un arqueo para imprimir
    const toggleImprimirSelection = (rowData) => {
        if (rowData.ae_estado !== 'R') {
            toast.current.show({
                severity: 'warn',
                summary: 'Selección incorrecta',
                detail: 'Solo se pueden seleccionar arqueos en estado Recaudado para imprimir'
            });
            return;
        }
        
        const isSelected = selectedArqueosImprimir.some(item => item.ae_actaid === rowData.ae_actaid);
        
        if (isSelected) {
            setSelectedArqueosImprimir(prev => 
                prev.filter(item => item.ae_actaid !== rowData.ae_actaid)
            );
        } else {
            setSelectedArqueosImprimir(prev => [...prev, rowData]);
        }
    };

    // Función para abrir la vista previa de impresión
    const handleShowPrintPreview = () => {
        if (selectedArqueosImprimir.length === 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'Sin selección',
                detail: 'Debe seleccionar al menos un arqueo recaudado para imprimir'
            });
            return;
        }
        
        setShowPrintPreview(true);
    };

    // Modificar rowClassName para resaltar visualmente los registros no seleccionables
    const rowClassName = (data) => {
        return {
            'row-disabled': data.ae_estado !== 'P',
            'row-pendiente': data.ae_estado === 'P',
            'row-arqueado': data.ae_estado === 'R'
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Arqueos de Recaudación</h5>
                <div className="flex gap-2">
                    {selectedArqueosImprimir.length > 0 && (
                        <Button 
                            label="Imprimir Seleccionados" 
                            icon="pi pi-print" 
                            className="p-button-success"
                            onClick={handleShowPrintPreview}
                        />
                    )}
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

            <div className="flex justify-content-end mb-2">
                <span className="p-tag p-tag-success">
                    {selectedArqueosImprimir.length} arqueos seleccionados para imprimir
                </span>
            </div>

            <DataTable
                value={arqueos}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                loading={loading}
                emptyMessage="No se encontraron actas"
                className="p-datatable-sm text-xs"
                showGridlines
                selection={selectedArqueos}
                onSelectionChange={onSelectionChange}
                selectionMode="checkbox"
                rowClassName={rowClassName}
                dataKey="ae_actaid"
            >
                <Column selectionMode="multiple" headerStyle={{width: '3em'}} />
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
                <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" sortable className="text-xs py-1 px-2" />
                <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" sortable className="text-xs py-1 px-2" />
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
                <Column 
                    header={imprimirHeaderTemplate()}
                    body={imprimirSelectionTemplate} 
                    headerStyle={{width: '5em'}}
                    style={{textAlign: 'center'}}
                    exportable={false}
                />
            </DataTable>
            
            <div className="mt-2 flex justify-content-between align-items-center text-sm">
                <span>
                    Mostrando registros del 1 al {arqueos.length < 10 ? arqueos.length : 10} de un total de {arqueos.length} registros.
                </span>
                <div className="flex gap-2">
                    <span className="font-bold text-primary">
                        {selectedArqueos.length > 0 ? `${selectedArqueos.length} actas seleccionadas para arquear` : ''}
                    </span>
                    <span className="font-bold text-success">
                        {selectedArqueosImprimir.length > 0 ? `${selectedArqueosImprimir.length} actas seleccionadas para imprimir` : ''}
                    </span>
                </div>
            </div>
            
            {/* Sección de cierre de arqueo (se muestra cuando hay actas seleccionadas) */}
            {showArqueoFinal && resumenServicios.length > 0 && (
                <div className="mt-4">
                    <div className="surface-card p-4 border-round shadow-2">
                        <div className="flex justify-content-between align-items-center mb-3">
                            <h5 className="m-0">Cierre de Arqueo</h5>
                        </div>
                        
                        <div className="excel-style-container border-1 surface-border p-3">
                            {/* Header del Excel */}
                            <div className="grid">
                                <div className="col-6">
                                    <table className="excel-header-table">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold">TURNO:</td>
                                                <td>
                                                    <Dropdown
                                                        value={formData.arqueoturno}
                                                        options={[
                                                            {label: 'MAÑANA', value: 'M'},
                                                            {label: 'TARDE', value: 'T'}
                                                        ]}
                                                        onChange={(e) => setFormData({...formData, arqueoturno: e.value})}
                                                        className="w-full h-2rem"
                                                    />
                                                </td>
                                                <td className="font-bold">N° DE ARQUEO:</td>
                                                <td>{formData.arqueonumero}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">HORA DE INICIO:</td>
                                                <td>
                                                    <Calendar
                                                        value={formData.arqueohorainicio}
                                                        onChange={(e) => setFormData({...formData, arqueohorainicio: e.value})}
                                                        timeOnly
                                                        hourFormat="12"
                                                        className="w-full h-2rem"
                                                    />
                                                </td>
                                                <td className="font-bold">FECHA:</td>
                                                <td>{formatDate(formData.arqueofecha, 'dd/MM/yyyy')}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">HORA FINALIZADO:</td>
                                                <td>
                                                    <Calendar
                                                        value={formData.arqueohorafin}
                                                        onChange={(e) => setFormData({...formData, arqueohorafin: e.value})}
                                                        timeOnly
                                                        hourFormat="12"
                                                        className="w-full h-2rem"
                                                    />
                                                </td>
                                                <td className="font-bold">SUPERVISOR:</td>
                                                <td>
                                                    <InputText
                                                        value={formData.arqueosupervisor}
                                                        onChange={(e) => setFormData({...formData, arqueosupervisor: e.target.value})}
                                                        className="w-full h-2rem"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Cuerpo del Excel - 2 columnas */}
                            <div className="grid mt-3">
                                <div className="col-6">
                                    <table className="excel-table">
                                        <thead>
                                            <tr>
                                                <th>FACTURA PRE VALORADAS</th>
                                                <th>IMPORTE Bs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resumenServicios.map((servicio, index) => (
                                                <tr key={index}>
                                                    <td>{servicio.nombre}</td>
                                                    <td className="text-right">Bs{parseFloat(servicio.importe_total).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr className="total-row">
                                                <td className="font-bold">TOTAL DE PREVALORADAS:</td>
                                                <td className="text-right font-bold">Bs{totalRecaudacion.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="col-6">
                                    <table className="excel-table">
                                        <thead>
                                            <tr>
                                                <th>CORTE</th>
                                                <th>PIEZAS</th>
                                                <th>MONTO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CORTES_DENOMINACION.map((corte, index) => (
                                                <tr key={index}>
                                                    <td>Bs{corte.label}</td>
                                                    <td>
                                                        <InputNumber
                                                            value={formData.cortes[corte.campo]}
                                                            onChange={(e) => handleCortesChange(corte.campo, e.value)}
                                                            min={0}
                                                            className="w-full"
                                                            size={5}
                                                        />
                                                    </td>
                                                    <td className="text-right">
                                                        Bs{(formData.cortes[corte.campo] * corte.valor).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="total-row">
                                                <td colSpan="2" className="font-bold">TOTAL:</td>
                                                <td className="text-right font-bold">Bs{totalCortes.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Diferencia */}
                            <div className="grid mt-3">
                                <div className="col-12">
                                    <table className="excel-table">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold" style={{width: '50%'}}>
                                                    DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO:
                                                </td>
                                                <td className={`font-bold ${
                                                    getDiferenciaText(totalCortes, totalRecaudacion) === "Sobrante" ? 'text-blue-600' :
                                                    getDiferenciaText(totalCortes, totalRecaudacion) === "Faltante" ? 'text-red-600' :
                                                    'text-gray-700'
                                                }`}>
                                                    {getDiferenciaText(totalCortes, totalRecaudacion)}
                                                </td>
                                                <td className={`text-right font-bold ${
                                                    getDiferenciaText(totalCortes, totalRecaudacion) === "Sobrante" ? 'text-blue-600' :
                                                    getDiferenciaText(totalCortes, totalRecaudacion) === "Faltante" ? 'text-red-600' :
                                                    'text-gray-700'
                                                }`}>
                                                    Bs{Math.abs(totalCortes - totalRecaudacion).toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Firmas */}
                            <div className="grid mt-3">
                                <div className="col-6">
                                    <table className="excel-table">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold" style={{width: '40%'}}>REALIZADO POR:</td>
                                                <td>
                                                    <InputText
                                                        value={formData.arqueorealizadopor}
                                                        onChange={(e) => setFormData({...formData, arqueorealizadopor: e.target.value})}
                                                        className="w-full"
                                                        placeholder="Nombre de quien realiza"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-6">
                                    <table className="excel-table">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold" style={{width: '40%'}}>REVISADO POR:</td>
                                                <td>
                                                    <InputText
                                                        value={formData.arqueorevisadopor}
                                                        onChange={(e) => setFormData({...formData, arqueorevisadopor: e.target.value})}
                                                        className="w-full"
                                                        placeholder="Nombre de quien revisa"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Observación */}
                            <div className="grid mt-3">
                                <div className="col-12">
                                    <table className="excel-table">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold" style={{width: '20%', verticalAlign: 'top'}}>OBSERVACIÓN:</td>
                                                <td>
                                                    <InputText
                                                        value={formData.arqueoobservacion}
                                                        onChange={(e) => setFormData({...formData, arqueoobservacion: e.target.value})}
                                                        className="w-full"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Botón guardar */}
                            <div className="flex justify-content-end mt-4">
                                <Button
                                    label="Guardar Arqueo Final"
                                    icon="pi pi-save"
                                    onClick={handleSubmitArqueoFinal}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Modal para la vista previa de impresión */}
            <Dialog
                visible={showPrintPreview}
                style={{ width: '90vw', height: '90vh' }}
                header="Vista Previa de Impresión"
                maximizable
                modal
                onHide={() => setShowPrintPreview(false)}
                footer={
                    <div>
                        <Button label="Imprimir" icon="pi pi-print" onClick={() => window.print()} />
                        <Button label="Cerrar" icon="pi pi-times" className="p-button-secondary" onClick={() => setShowPrintPreview(false)} />
                    </div>
                }
            >
                <ArqueoPrintPreview arqueos={selectedArqueosImprimir} />
            </Dialog>
            
            <style>
                {`
                    .excel-style-container {
                        font-family: 'Arial', sans-serif;
                        background-color: white;
                    }
                    .excel-header-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .excel-header-table td {
                        padding: 5px;
                        border: 1px solid #dee2e6;
                    }
                    .excel-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 1rem;
                    }
                    .excel-table th, .excel-table td {
                        border: 1px solid #dee2e6;
                        padding: 5px 10px;
                    }
                    .excel-table th {
                        background-color: #f0f0f0;
                        text-align: center;
                        font-weight: bold;
                    }
                    .total-row {
                        background-color: #f0f0f0;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .p-inputtext, .p-dropdown, .p-calendar {
                        padding: 0.3rem !important;
                    }
                    .h-2rem {
                        height: 2rem !important;
                    }
                    .row-disabled {
                        background-color: #f8f9fa;
                        opacity: 0.7;
                    }

                    .row-disabled .p-checkbox {
                        display: none !important;
                    }

                    .row-pendiente {
                        background-color: #ffffff;
                    }

                    .row-arqueado {
                        background-color: #e8f5e9 !important;  /* Verde claro para arqueados */
                        opacity: 0.8;
                    }

                    .p-datatable .p-datatable-tbody > tr.row-disabled {
                        cursor: default !important;
                    }

                    .p-datatable .p-datatable-tbody > tr.row-disabled:hover {
                        background-color: #f8f9fa !important;
                    }

                    .p-datatable .p-datatable-tbody > tr.row-arqueado:hover {
                        background-color: #e8f5e9 !important;
                    }
                    
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .p-dialog-content, .p-dialog-content * {
                            visibility: visible;
                        }
                        .p-dialog-header, .p-dialog-footer {
                            display: none !important;
                        }
                        .p-dialog {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            overflow: visible;
                        }
                    }

                    .print-checkbox .p-checkbox-box.p-highlight {
                        border-color: #22c55e;
                        background: #22c55e;
                    }
                    
                    .print-checkbox .p-checkbox-box:hover {
                        border-color: #22c55e;
                    }
                    
                    .print-checkbox .p-checkbox-icon {
                        color: white;
                    }

                    /* Estilo para el checkbox personalizado */
                    .custom-checkbox {
                        width: 20px;
                        height: 20px;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                        background-color: #ffffff;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
                    }

                    .custom-checkbox:hover {
                        border-color: #2196F3;
                    }

                    .custom-checkbox.checked {
                        background-color: #2196F3;
                        border-color: #2196F3;
                        color: #ffffff;
                    }
                    
                    /* Estilo para la columna de impresión - visible siempre */
                    .p-datatable .p-datatable-tbody > tr.row-disabled .custom-checkbox {
                        opacity: 0.5;
                        pointer-events: none;
                    }
                    
                    .p-datatable .p-datatable-tbody > tr.row-arqueado .custom-checkbox {
                        opacity: 1;
                        pointer-events: auto;
                    }
                    
                    /* Mantener el checkbox visible incluso en estado arqueado */
                    .row-arqueado .custom-checkbox {
                        display: flex !important;
                        visibility: visible !important;
                    }
                    
                    /* Ocultar el primer checkbox en filas no elegibles */
                    .row-disabled .p-checkbox:first-child {
                        display: none !important;
                    }
                `}
            </style>
        </div>
    );
}
