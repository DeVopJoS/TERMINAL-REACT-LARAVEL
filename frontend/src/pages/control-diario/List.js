import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import useApi from 'hooks/useApi';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ControlDiarioTemplate from '../../pdf/ControlDiarioTemplate';
import { Dialog } from 'primereact/dialog';

export default function ControlDiarioList() {
    const api = useApi();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [fecha, setFecha] = useState(new Date());
    const [data, setData] = useState(null);
    const [deposito, setDeposito] = useState({
        fecha_recaudacion: new Date(),
        fecha_deposito_1: new Date(),
        numero_deposito_1: '',
        efectivo_1: 0,
        fecha_deposito_2: null,
        numero_deposito_2: '',
        efectivo_2: 0,
        depositantes: '',
        observacion: ''
    });
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [showDepositoDialog, setShowDepositoDialog] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [showAdditionalDeposit, setShowAdditionalDeposit] = useState(false);

    useEffect(() => {
        loadData();
    }, [fecha]);

    useEffect(() => {
        if (data && data.deposito) {
            setShowAdditionalDeposit(!!data.deposito.efectivo_2);
            setDeposito({
                fecha_recaudacion: new Date(data.deposito.fecha_recaudacion),
                fecha_deposito_1: data.deposito.fecha_deposito_1 ? new Date(data.deposito.fecha_deposito_1) : new Date(),
                numero_deposito_1: data.deposito.numero_deposito_1 || '',
                efectivo_1: data.deposito.efectivo_1 || 0,
                fecha_deposito_2: data.deposito.fecha_deposito_2 ? new Date(data.deposito.fecha_deposito_2) : null,
                numero_deposito_2: data.deposito.numero_deposito_2 || '',
                efectivo_2: data.deposito.efectivo_2 || 0,
                depositantes: data.deposito.depositantes || '',
                observacion: data.deposito.observacion || ''
            });
        } else {
            setShowAdditionalDeposit(false);
            setDeposito({
                fecha_recaudacion: fecha,
                fecha_deposito_1: new Date(),
                numero_deposito_1: '',
                efectivo_1: 0,
                fecha_deposito_2: null,
                numero_deposito_2: '',
                efectivo_2: 0,
                depositantes: '',
                observacion: ''
            });
        }
    }, [data]);

    const loadData = async () => {
        try {
            setLoading(true);
            const fechaStr = fecha.toISOString().split('T')[0];
            const response = await api.get(`control-diario/totales?fecha=${fechaStr}`);
            setData(response.data);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los datos'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDeposito = async () => {
        try {
            const requestData = {
                ...deposito,
                fecha_recaudacion: deposito.fecha_recaudacion.toISOString().split('T')[0],
                fecha_deposito_1: deposito.fecha_deposito_1.toISOString().split('T')[0],
                fecha_deposito_2: deposito.fecha_deposito_2 ? deposito.fecha_deposito_2.toISOString().split('T')[0] : null,
                total_recaudacion: data.total_actas || 0,  // Asegurar que se envíe el total
                efectivo_2: deposito.efectivo_2 || 0
            };

            await api.post('control-diario/deposito', requestData);
            
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Depósito registrado correctamente'
            });
            
            setShowDepositoDialog(false);
            loadData();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al registrar depósito'
            });
        }
    };

    const formatDateForAPI = (date) => {
        if (!date) return '';
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) {
                console.error("Invalid date:", date);
                return '';
            }
            d.setHours(12, 0, 0, 0);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return '';
        }
    };
    const formatDateDisplay = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        d.setHours(12, 0, 0, 0);
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const handlePrint = async () => {
        try {
            if (!dateRange.from || !dateRange.to) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Datos incompletos',
                    detail: 'Seleccione rango de fechas'
                });
                return;
            }

            setLoading(true);
            const params = new URLSearchParams();
            
            // Asegurar que las fechas estén en formato ISO
            const fromDate = dateRange.from instanceof Date ? 
                dateRange.from.toISOString().split('T')[0] : 
                new Date(dateRange.from).toISOString().split('T')[0];
                
            const toDate = dateRange.to instanceof Date ? 
                dateRange.to.toISOString().split('T')[0] : 
                new Date(dateRange.to).toISOString().split('T')[0];

            params.append('fecha_desde', fromDate);
            params.append('fecha_hasta', toDate);
            
            console.log('Enviando parámetros:', {
                fecha_desde: fromDate,
                fecha_hasta: toDate
            });

            const response = await api.get(`control-diario/reporte-rango?${params.toString()}`);
            
            if (!response.data) {
                throw new Error('No se recibieron datos del servidor');
            }
            
            setReportData(response.data);
            setShowPrintDialog(true);
        } catch (error) {
            console.error('Error al generar reporte:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.error || error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPdf = async () => {
        try {
            setLoading(true);
            if (!reportData || reportData.length === 0) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Sin datos',
                    detail: 'No hay datos para generar el PDF'
                });
                return;
            }
            
            const blob = await pdf(
                <ControlDiarioTemplate
                    data={reportData}
                    dateRange={{
                        from: formatDateDisplay(dateRange.from),
                        to: formatDateDisplay(dateRange.to)
                    }}
                />
            ).toBlob();
            
            const fileName = `control_diario_${formatDateForAPI(dateRange.from)}_${formatDateForAPI(dateRange.to)}.pdf`;
            saveAs(blob, fileName);
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'PDF generado correctamente'
            });
        } catch (error) {
            console.error("Error al generar PDF:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo generar el archivo PDF: ' + (error.message || '')
            });
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return value?.toLocaleString('es-BO', {
            style: 'currency',
            currency: 'BOB'
        }) || 'Bs. 0.00';
    };

    const openDepositoDialog = () => {
        setShowDepositoDialog(true);
    };

    const toggleAdditionalDeposit = () => {
        setShowAdditionalDeposit(!showAdditionalDeposit);
        if (!showAdditionalDeposit) {
            setDeposito({...deposito, fecha_deposito_2: new Date(), numero_deposito_2: '', efectivo_2: 0});
        } else {
            setDeposito({...deposito, fecha_deposito_2: null, numero_deposito_2: '', efectivo_2: 0});
        }
    };

    const validateDepositAmount = (value, isSecondDeposit = false) => {
        const currentTotal = isSecondDeposit ? deposito.efectivo_1 : 0;
        const remainingAmount = (data.total_actas || 0) - currentTotal;
        
        if (value > remainingAmount) {
            toast.current.show({
                severity: 'warn',
                summary: 'Monto excedido',
                detail: `El monto máximo permitido es ${formatCurrency(remainingAmount)}`
            });
            return remainingAmount;
        }
        return value;
    };

    const depositoDialogFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setShowDepositoDialog(false)} />
            <Button label="Guardar" icon="pi pi-check" onClick={handleSaveDeposito} />
        </div>
    );

    if (!data) return null;

    return (
        <div className="card">
            <Toast ref={toast} />
            
            <div className="flex justify-content-between align-items-center mb-3">
                <h5>Control de Recaudación Diaria</h5>
                <Calendar
                    value={fecha}
                    onChange={(e) => setFecha(e.value)}
                    showIcon
                    dateFormat="dd/mm/yy"
                />
            </div>

            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="card bg-primary-50">
                        <h6>Total Actas</h6>
                        <h2>{formatCurrency(data.total_actas)}</h2>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div className="card bg-success-50">
                        <h6>Total Prevaloradas</h6>
                        <h2>{formatCurrency(data.total_prevaloradas)}</h2>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div className={`card ${data.diferencia === 0 ? 'bg-success-50' : data.diferencia > 0 ? 'bg-warning-50' : 'bg-danger-50'}`}>
                        <h6>Diferencia</h6>
                        <h2>{formatCurrency(data.diferencia)}</h2>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h6>Por Punto de Recaudación</h6>
                        <DataTable value={data.por_punto} loading={loading}>
                            <Column field="puntorecaud_nombre" header="Punto" />
                            <Column field="total" header="Total" body={(row) => formatCurrency(row.total)} />
                        </DataTable>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h6>Por Servicio</h6>
                        <DataTable value={data.por_servicio} loading={loading}>
                            <Column field="servicio_descripcion" header="Servicio" />
                            <Column field="cantidad" header="Cantidad" />
                            <Column field="total" header="Total" body={(row) => formatCurrency(row.total)} />
                        </DataTable>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-content-between align-items-center mb-3">
                    <h6>Registro de Depósito</h6>
                    <Button 
                        label={data.deposito ? "Editar Depósito" : "Registrar Depósito"} 
                        icon={data.deposito ? "pi pi-pencil" : "pi pi-plus"} 
                        onClick={openDepositoDialog}
                    />
                </div>
                
                {data.deposito ? (
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="card">
                                <h6>Depósito Principal</h6>
                                <div className="p-field mb-3">
                                    <label className="block font-bold">Fecha de Depósito</label>
                                    <p>{new Date(data.deposito.fecha_deposito_1).toLocaleDateString()}</p>
                                </div>
                                <div className="p-field mb-3">
                                    <label className="block font-bold">Número de Depósito</label>
                                    <p>{data.deposito.numero_deposito_1}</p>
                                </div>
                                <div className="p-field">
                                    <label className="block font-bold">Monto</label>
                                    <p className="text-lg">{formatCurrency(data.deposito.efectivo_1)}</p>
                                </div>
                            </div>
                        </div>
                        
                        {data.deposito.efectivo_2 > 0 && (
                            <div className="col-12 md:col-6">
                                <div className="card">
                                    <h6>Depósito Adicional</h6>
                                    <div className="p-field mb-3">
                                        <label className="block font-bold">Fecha de Depósito</label>
                                        <p>{data.deposito.fecha_deposito_2 ? new Date(data.deposito.fecha_deposito_2).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                    <div className="p-field mb-3">
                                        <label className="block font-bold">Número de Depósito</label>
                                        <p>{data.deposito.numero_deposito_2 || 'N/A'}</p>
                                    </div>
                                    <div className="p-field">
                                        <label className="block font-bold">Monto</label>
                                        <p className="text-lg">{formatCurrency(data.deposito.efectivo_2)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="col-12">
                            <div className="card">
                                <div className="grid">
                                    <div className="col-12 md:col-6">
                                        <div className="p-field mb-3">
                                            <label className="block font-bold">Total Depositado</label>
                                            <p className="font-bold text-xl">{formatCurrency(data.deposito.total_efectivo)}</p>
                                        </div>
                                        
                                        <div className="p-field mb-3">
                                            <label className="block font-bold">Total Recaudado</label>
                                            <p className="font-bold text-xl">{formatCurrency(data.total_actas)}</p>
                                        </div>
                                        
                                        <div className="p-field flex align-items-center">
                                            <label className="block font-bold mr-3">Diferencia</label>
                                            <p className={`font-bold text-xl ${
                                                Math.abs(data.total_actas - data.deposito.total_efectivo) < 0.01 
                                                    ? 'text-green-500' 
                                                    : 'text-red-500'
                                            }`}>
                                                {formatCurrency(data.total_actas - data.deposito.total_efectivo)}
                                            </p>
                                            {Math.abs(data.total_actas - data.deposito.total_efectivo) > 0.01 && (
                                                <Button 
                                                    icon="pi pi-pencil" 
                                                    className="p-button-text p-button-sm ml-3" 
                                                    tooltip="Editar depósito para cubrir diferencia"
                                                    onClick={openDepositoDialog}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 md:col-6">
                                        {data.deposito.depositantes && (
                                            <div className="p-field mb-3">
                                                <label className="block font-bold">Depositantes</label>
                                                <p>{data.deposito.depositantes}</p>
                                            </div>
                                        )}
                                        
                                        {data.deposito.observacion && (
                                            <div className="p-field">
                                                <label className="block font-bold">Observación</label>
                                                <p>{data.deposito.observacion}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-4 surface-100 border-round">
                        <i className="pi pi-money-bill text-4xl mb-3 text-blue-500"></i>
                        <p className="text-lg">No hay depósitos registrados para esta fecha</p>
                        <Button 
                            label="Registrar Depósito" 
                            icon="pi pi-plus" 
                            onClick={openDepositoDialog} 
                            className="mt-3"
                        />
                    </div>
                )}
            </div>

            <div className="card mb-3">
                <h6>Reporte por Rango de Fechas</h6>
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <Calendar
                            value={dateRange.from}
                            onChange={(e) => setDateRange({...dateRange, from: e.value})}
                            showIcon
                            placeholder="Fecha desde"
                            className="w-full"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <Calendar
                            value={dateRange.to}
                            onChange={(e) => setDateRange({...dateRange, to: e.value})}
                            showIcon
                            placeholder="Fecha hasta"
                            className="w-full"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <Button
                            label="Generar Reporte"
                            icon="pi pi-print"
                            onClick={handlePrint}
                            loading={loading}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <Dialog
                visible={showPrintDialog}
                onHide={() => setShowPrintDialog(false)}
                style={{ width: '90vw' }}
                maximizable
                header="Vista Previa del Reporte"
                footer={
                    <div className="flex justify-content-end">
                        <Button 
                            label="Imprimir / Guardar PDF" 
                            icon="pi pi-file-pdf" 
                            onClick={handleDownloadPdf}
                            loading={loading}
                            className="p-button-success"
                        />
                        <Button 
                            label="Cerrar" 
                            icon="pi pi-times" 
                            onClick={() => setShowPrintDialog(false)} 
                            className="p-button-text ml-2"
                        />
                    </div>
                }
            >
                {reportData && reportData.length > 0 ? (
                    <PDFViewer style={{ width: '100%', height: '70vh' }}>
                        <ControlDiarioTemplate
                            data={reportData}
                            dateRange={{
                                from: formatDateDisplay(dateRange.from),
                                to: formatDateDisplay(dateRange.to)
                            }}
                        />
                    </PDFViewer>
                ) : (
                    <div className="flex flex-column align-items-center justify-content-center" style={{height: '50vh'}}>
                        <i className="pi pi-exclamation-circle" style={{fontSize: '3rem', color: '#FBC02D'}}></i>
                        <h3>No hay datos disponibles para mostrar</h3>
                        <p>Intente con un rango de fechas diferente</p>
                    </div>
                )}
            </Dialog>

            <Dialog
                visible={showDepositoDialog}
                style={{ width: '50vw' }}
                header="Registro de Depósito"
                modal
                footer={depositoDialogFooter}
                onHide={() => setShowDepositoDialog(false)}
            >
                <div className="grid p-fluid">
                    <div className="col-12">
                        <h6>Fecha de Recaudación</h6>
                        <Calendar 
                            id="fecha_recaudacion" 
                            value={deposito.fecha_recaudacion}
                            onChange={(e) => setDeposito({...deposito, fecha_recaudacion: e.value})}
                            showIcon
                            dateFormat="dd/mm/yy"
                            className="w-full"
                            disabled
                        />
                    </div>
                    
                    <div className="col-12 mt-3">
                        <h6>Depósito Principal</h6>
                    </div>
                    
                    <div className="col-12 md:col-6">
                        <label htmlFor="fecha_deposito_1">Fecha de Depósito</label>
                        <Calendar 
                            id="fecha_deposito_1" 
                            value={deposito.fecha_deposito_1}
                            onChange={(e) => setDeposito({...deposito, fecha_deposito_1: e.value})}
                            showIcon
                            dateFormat="dd/mm/yy"
                            className="w-full"
                        />
                    </div>
                    
                    <div className="col-12 md:col-6">
                        <label htmlFor="numero_deposito_1">Número de Depósito</label>
                        <InputText 
                            id="numero_deposito_1" 
                            value={deposito.numero_deposito_1}
                            onChange={(e) => setDeposito({...deposito, numero_deposito_1: e.target.value})}
                        />
                    </div>
                    
                    <div className="col-12">
                        <label htmlFor="efectivo_1">Monto (Bs.)</label>
                        <InputNumber 
                            id="efectivo_1" 
                            value={deposito.efectivo_1}
                            onValueChange={(e) => setDeposito({
                                ...deposito, 
                                efectivo_1: validateDepositAmount(e.value)
                            })}
                            mode="currency" 
                            currency="BOB" 
                            locale="es-BO"
                            max={data.total_actas || 0}
                        />
                    </div>
                    
                    <div className="col-12 mt-3">
                        <div className="flex align-items-center justify-content-between">
                            <h6 className="m-0">Depósito Adicional</h6>
                            <Button 
                                icon={showAdditionalDeposit ? "pi pi-minus" : "pi pi-plus"}
                                className={`p-button-rounded p-button-${showAdditionalDeposit ? 'danger' : 'success'} p-button-sm`}
                                onClick={toggleAdditionalDeposit}
                                tooltip={showAdditionalDeposit ? "Eliminar depósito adicional" : "Agregar depósito adicional"}
                            />
                        </div>
                    </div>
                    
                    {showAdditionalDeposit && (
                        <>
                            <div className="col-12 md:col-6">
                                <label htmlFor="fecha_deposito_2">Fecha de Depósito</label>
                                <Calendar 
                                    id="fecha_deposito_2" 
                                    value={deposito.fecha_deposito_2}
                                    onChange={(e) => setDeposito({...deposito, fecha_deposito_2: e.value})}
                                    showIcon
                                    dateFormat="dd/mm/yy"
                                    className="w-full"
                                />
                            </div>
                            
                            <div className="col-12 md:col-6">
                                <label htmlFor="numero_deposito_2">Número de Depósito</label>
                                <InputText 
                                    id="numero_deposito_2" 
                                    value={deposito.numero_deposito_2}
                                    onChange={(e) => setDeposito({...deposito, numero_deposito_2: e.target.value})}
                                />
                            </div>
                            
                            <div className="col-12">
                                <label htmlFor="efectivo_2">Monto (Bs.)</label>
                                <InputNumber 
                                    id="efectivo_2" 
                                    value={deposito.efectivo_2}
                                    onValueChange={(e) => setDeposito({
                                        ...deposito, 
                                        efectivo_2: validateDepositAmount(e.value, true)
                                    })}
                                    mode="currency" 
                                    currency="BOB" 
                                    locale="es-BO"
                                    max={Math.max(0, (data.total_actas || 0) - (deposito.efectivo_1 || 0))}
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="col-12">
                        <label htmlFor="depositantes">Depositantes</label>
                        <InputText 
                            id="depositantes" 
                            value={deposito.depositantes}
                            onChange={(e) => setDeposito({...deposito, depositantes: e.target.value})}
                        />
                    </div>
                    
                    <div className="col-12">
                        <label htmlFor="observacion">Observación</label>
                        <InputTextarea 
                            id="observacion" 
                            value={deposito.observacion}
                            onChange={(e) => setDeposito({...deposito, observacion: e.target.value})}
                            rows={3}
                        />
                    </div>
                    
                    <div className="col-12">
                        <div className="card mt-3 p-3 border-1 surface-border">
                            <div className="flex justify-content-between mb-2">
                                <label className="font-bold">Total a Depositar:</label>
                                <span className="font-bold">
                                    {formatCurrency(data.total_actas)}
                                </span>
                            </div>
                            
                            <div className="flex justify-content-between mb-2">
                                <label className="font-bold">Total Depositado:</label>
                                <span className="font-bold">
                                    {formatCurrency(parseFloat(deposito.efectivo_1 || 0) + parseFloat(deposito.efectivo_2 || 0))}
                                </span>
                            </div>
                            
                            <div className="flex justify-content-between align-items-center">
                                <label className="font-bold">Diferencia:</label>
                                <div className="flex align-items-center">
                                    <span className={`font-bold mr-2 ${
                                        Math.abs(data.total_actas - ((parseFloat(deposito.efectivo_1) || 0) + (parseFloat(deposito.efectivo_2) || 0))) < 0.01
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }`}>
                                        {formatCurrency(data.total_actas - ((parseFloat(deposito.efectivo_1) || 0) + (parseFloat(deposito.efectivo_2) || 0)))}
                                    </span>
                                    
                                    {!showAdditionalDeposit && 
                                     Math.abs((data.total_actas || 0) - (deposito.efectivo_1 || 0)) > 0.01 && (
                                        <Button 
                                            icon="pi pi-plus-circle" 
                                            className="p-button-text p-button-sm p-button-info"
                                            onClick={toggleAdditionalDeposit}
                                            tooltip="Añadir depósito adicional para cubrir la diferencia"
                                        />
                                    )}
                                </div>
                            </div>
                            
                            {!showAdditionalDeposit && 
                             Math.abs((data.total_actas || 0) - (deposito.efectivo_1 || 0)) > 0.01 && (
                                <div className="mt-2 p-2 bg-yellow-50 border-round">
                                    <div className="flex align-items-center">
                                        <i className="pi pi-exclamation-triangle text-yellow-500 mr-2"></i>
                                        <span className="text-sm">
                                            Existe una diferencia de {formatCurrency(Math.abs((data.total_actas || 0) - (deposito.efectivo_1 || 0)))}. 
                                            Puede registrar un depósito adicional para cubrir esta diferencia.
                                        </span>
                                    </div>
                                    <div className="mt-2 flex justify-content-end">
                                        <Button
                                            label="Agregar depósito adicional"
                                            icon="pi pi-plus"
                                            className="p-button-sm p-button-warning"
                                            onClick={toggleAdditionalDeposit}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
