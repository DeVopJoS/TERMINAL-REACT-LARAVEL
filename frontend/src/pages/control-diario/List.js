import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import useApi from 'hooks/useApi';
import { PDFViewer } from '@react-pdf/renderer';
import ControlDiarioTemplate from '../../pdf/ControlDiarioTemplate';
import { Dialog } from 'primereact/dialog';

export default function ControlDiarioList() {
    const api = useApi();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [fecha, setFecha] = useState(new Date());
    const [data, setData] = useState(null);
    const [deposito, setDeposito] = useState({
        monto: 0,
        observacion: ''
    });
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        loadData();
    }, [fecha]);

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
            const fechaStr = fecha.toISOString().split('T')[0];
            await api.post('control-diario/deposito', {
                fecha: fechaStr,
                monto: deposito.monto,
                observacion: deposito.observacion
            });
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Depósito registrado correctamente'
            });
            loadData();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al registrar depósito'
            });
        }
    };

    const handlePrint = async () => {
        if (!dateRange.from || !dateRange.to) {
            toast.current.show({
                severity: 'warn',
                summary: 'Datos incompletos',
                detail: 'Seleccione rango de fechas'
            });
            return;
        }

        try {
            setLoading(true);
            const response = await api.get('control-diario/reporte-rango', {
                params: {
                    fecha_desde: dateRange.from.toISOString().split('T')[0],
                    fecha_hasta: dateRange.to.toISOString().split('T')[0]
                }
            });
            setReportData(response.data);
            setShowPrintDialog(true);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo generar el reporte'
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
                <h6>Registro de Depósito</h6>
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <InputNumber
                            value={deposito.monto}
                            onValueChange={(e) => setDeposito({...deposito, monto: e.value})}
                            mode="currency"
                            currency="BOB"
                            locale="es-BO"
                            className="w-full"
                            placeholder="Monto depositado"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        <InputText
                            value={deposito.observacion}
                            onChange={(e) => setDeposito({...deposito, observacion: e.target.value})}
                            className="w-full"
                            placeholder="Observación"
                        />
                    </div>
                    <div className="col-12 md:col-2">
                        <Button
                            label="Registrar"
                            onClick={handleSaveDeposito}
                            className="w-full"
                        />
                    </div>
                </div>
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
            >
                {reportData && (
                    <PDFViewer style={{ width: '100%', height: '80vh' }}>
                        <ControlDiarioTemplate
                            data={reportData}
                            dateRange={{
                                from: dateRange.from.toLocaleDateString(),
                                to: dateRange.to.toLocaleDateString()
                            }}
                        />
                    </PDFViewer>
                )}
            </Dialog>
        </div>
    );
}
