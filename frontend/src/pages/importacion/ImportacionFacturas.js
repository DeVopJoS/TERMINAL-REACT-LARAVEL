import React, { useState, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ImportacionFacturas = () => {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [importStatus, setImportStatus] = useState(null);
    const [mappingFields, setMappingFields] = useState({
        numero: '',
        fecha: '',
        numeroFactura: '',
        codigoAutorizacion: '',
        nitCi: '',
        complemento: '',
        nombreRazonSocial: '',
        importeTotal: '',
        importeIce: '',
        importeIehd: '',
        importeIpj: '',
        tasas: '',
        otrosNoSujetosIva: '',
        exportacionesOperacionesExentas: '',
        ventasGravadasTasaCero: '',
        subtotal: '',
        descuentos: '',
        bonificacionesRebajas: '',
        importeGiftCard: '',
        importeBaseDebitoFiscal: '',
        debitoFiscal: '',
        estado: '',
        codigoControl: '',
        tipoVenta: '',
        derechoCreditoFiscal: '',
        estadoConsolidacion: ''
    });

    const columnasExcel = [
        'Nº', 'FECHA DE LA FACTURA', 'Nº DE LA FACTURA', 'CODIGO DE AUTORIZACIÓN', 
        'NIT / CI CLIENTE', 'COMPLEMENTO', 'NOMBRE O RAZON SOCIAL', 'IMPORTE TOTAL DE LA VENTA', 
        'IMPORTE ICE', 'IMPORTE IEHD', 'IMPORTE IPJ', 'TASAS', 'OTROS NO SUJETOS AL IVA', 
        'EXPORTACIONES Y OPERACIONES EXENTAS', 'VENTAS GRAVADAS A TASA CERO', 'SUBTOTAL', 
        'DESCUENTOS BONIFICACIONES Y REBAJAS SUJETAS AL IVA', 'IMPORTE GIFT CARD', 
        'IMPORTE BASE PARA DEBITO FISCAL', 'DEBITO FISCAL', 'ESTADO', 'CODIGO DE CONTROL', 
        'TIPO DE VENTA', 'CON DERECHO A CREDITO FISCAL', 'ESTADO CONSOLIDACION'
    ];

    const handleFileUpload = (event) => {
        const file = event.files[0];
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setFacturas([]);
        setValidationErrors([]);
        setImportStatus(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: columnasExcel });

                // Eliminar la primera fila si contiene encabezados
                const dataWithoutHeaders = jsonData.slice(1);
                
                // Validar y transformar los datos
                const validatedData = validateAndTransformData(dataWithoutHeaders);
                
                setFacturas(validatedData.validData);
                setValidationErrors(validatedData.errors);
                setProgress(100);
                setShowPreview(true);
            } catch (error) {
                console.error('Error al procesar el archivo:', error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al procesar el archivo Excel: ' + error.message,
                    life: 5000
                });
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = (error) => {
            console.error('Error al leer el archivo:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al leer el archivo',
                life: 5000
            });
            setLoading(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const validateAndTransformData = (data) => {
        const validData = [];
        const errors = [];

        data.forEach((row, index) => {
            const rowNumber = index + 2; // +2 porque el índice comienza en 0 y la primera fila son encabezados
            const rowErrors = [];

            // Validar campos obligatorios
            if (!row['Nº DE LA FACTURA']) {
                rowErrors.push('El número de factura es obligatorio');
            }

            if (!row['FECHA DE LA FACTURA']) {
                rowErrors.push('La fecha de factura es obligatoria');
            }

            if (!row['NIT / CI CLIENTE']) {
                rowErrors.push('El NIT/CI del cliente es obligatorio');
            }

            // Validar formato de fecha
            if (row['FECHA DE LA FACTURA'] && !isValidDate(row['FECHA DE LA FACTURA'])) {
                rowErrors.push('Formato de fecha inválido');
            }

            // Validar valores numéricos
            const numericFields = [
                'IMPORTE TOTAL DE LA VENTA', 'IMPORTE ICE', 'IMPORTE IEHD', 'IMPORTE IPJ',
                'TASAS', 'OTROS NO SUJETOS AL IVA', 'EXPORTACIONES Y OPERACIONES EXENTAS',
                'VENTAS GRAVADAS A TASA CERO', 'SUBTOTAL', 'DESCUENTOS BONIFICACIONES Y REBAJAS SUJETAS AL IVA',
                'IMPORTE GIFT CARD', 'IMPORTE BASE PARA DEBITO FISCAL', 'DEBITO FISCAL'
            ];

            numericFields.forEach(field => {
                if (row[field] && isNaN(parseFloat(row[field]))) {
                    rowErrors.push(`El campo ${field} debe ser numérico`);
                }
            });

            if (rowErrors.length > 0) {
                errors.push({
                    row: rowNumber,
                    errors: rowErrors
                });
            } else {
                // Transformar los datos al formato esperado por la base de datos
                validData.push({
                    numero: row['Nº'] || '',
                    fecha: formatDate(row['FECHA DE LA FACTURA']),
                    numeroFactura: row['Nº DE LA FACTURA'] || '',
                    codigoAutorizacion: row['CODIGO DE AUTORIZACIÓN'] || '',
                    nitCi: row['NIT / CI CLIENTE'] || '',
                    complemento: row['COMPLEMENTO'] || '',
                    nombreRazonSocial: row['NOMBRE O RAZON SOCIAL'] || '',
                    importeTotal: parseFloat(row['IMPORTE TOTAL DE LA VENTA']) || 0,
                    importeIce: parseFloat(row['IMPORTE ICE']) || 0,
                    importeIehd: parseFloat(row['IMPORTE IEHD']) || 0,
                    importeIpj: parseFloat(row['IMPORTE IPJ']) || 0,
                    tasas: parseFloat(row['TASAS']) || 0,
                    otrosNoSujetosIva: parseFloat(row['OTROS NO SUJETOS AL IVA']) || 0,
                    exportacionesOperacionesExentas: parseFloat(row['EXPORTACIONES Y OPERACIONES EXENTAS']) || 0,
                    ventasGravadasTasaCero: parseFloat(row['VENTAS GRAVADAS A TASA CERO']) || 0,
                    subtotal: parseFloat(row['SUBTOTAL']) || 0,
                    descuentos: parseFloat(row['DESCUENTOS BONIFICACIONES Y REBAJAS SUJETAS AL IVA']) || 0,
                    bonificacionesRebajas: 0, // Este campo no está en el Excel, se deja en 0
                    importeGiftCard: parseFloat(row['IMPORTE GIFT CARD']) || 0,
                    importeBaseDebitoFiscal: parseFloat(row['IMPORTE BASE PARA DEBITO FISCAL']) || 0,
                    debitoFiscal: parseFloat(row['DEBITO FISCAL']) || 0,
                    estado: row['ESTADO'] || '',
                    codigoControl: row['CODIGO DE CONTROL'] || '',
                    tipoVenta: row['TIPO DE VENTA'] || '',
                    derechoCreditoFiscal: row['CON DERECHO A CREDITO FISCAL'] || '',
                    estadoConsolidacion: row['ESTADO CONSOLIDACION'] || ''
                });
            }
        });

        return { validData, errors };
    };

    const isValidDate = (dateString) => {
        if (!dateString) return false;
        
        // Intentar diferentes formatos de fecha
        const dateFormats = [
            /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
            /^\d{4}-\d{2}-\d{2}$/,   // YYYY-MM-DD
            /^\d{2}-\d{2}-\d{4}$/    // DD-MM-YYYY
        ];
        
        return dateFormats.some(format => format.test(dateString));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        // Convertir a formato YYYY-MM-DD para PostgreSQL
        if (dateString.includes('/')) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else if (dateString.includes('-')) {
            const parts = dateString.split('-');
            if (parts[0].length === 4) {
                // Ya está en formato YYYY-MM-DD
                return dateString;
            } else {
                // Formato DD-MM-YYYY
                const [day, month, year] = parts;
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
        }
        
        return dateString;
    };

    const handleImport = async () => {
        if (facturas.length === 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'No hay datos válidos para importar',
                life: 3000
            });
            return;
        }

        setLoading(true);
        setProgress(0);
        setImportStatus(null);

        try {
            // Simular progreso
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 300);

            // Enviar datos al backend
            const response = await axios.post('/api/importar-facturas', { facturas });
            
            clearInterval(interval);
            setProgress(100);
            
            setImportStatus({
                success: true,
                message: `Se importaron ${response.data.imported} facturas correctamente`,
                details: response.data.details
            });

            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: `Se importaron ${response.data.imported} facturas correctamente`,
                life: 5000
            });

            // Limpiar el formulario después de importar
            setTimeout(() => {
                setFacturas([]);
                setShowPreview(false);
                if (fileUploadRef.current) {
                    fileUploadRef.current.clear();
                }
            }, 3000);

        } catch (error) {
            console.error('Error al importar datos:', error);
            setImportStatus({
                success: false,
                message: 'Error al importar los datos',
                details: error.response?.data?.message || error.message
            });

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al importar los datos: ' + (error.response?.data?.message || error.message),
                life: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleMappingChange = (field, value) => {
        setMappingFields(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const renderMappingDialog = () => {
        return (
            <Dialog 
                header="Mapeo de Campos" 
                visible={showPreview} 
                style={{ width: '80vw' }} 
                onHide={() => setShowPreview(false)}
                footer={
                    <div>
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setShowPreview(false)} />
                        <Button label="Importar" icon="pi pi-check" className="p-button-success" onClick={handleImport} disabled={loading || facturas.length === 0} />
                    </div>
                }
            >
                <div className="grid">
                    <div className="col-12">
                        <h3>Vista Previa de Datos</h3>
                        <p>Se encontraron {facturas.length} registros válidos para importar.</p>
                        
                        {validationErrors.length > 0 && (
                            <Message severity="warn" className="mb-3">
                                <p>Se encontraron {validationErrors.length} filas con errores de validación.</p>
                                <ul>
                                    {validationErrors.slice(0, 5).map((error, index) => (
                                        <li key={index}>
                                            Fila {error.row}: {error.errors.join(', ')}
                                        </li>
                                    ))}
                                    {validationErrors.length > 5 && (
                                        <li>... y {validationErrors.length - 5} errores más</li>
                                    )}
                                </ul>
                            </Message>
                        )}

                        {importStatus && (
                            <Message 
                                severity={importStatus.success ? "success" : "error"} 
                                className="mb-3"
                            >
                                {importStatus.message}
                                {importStatus.details && <p>{importStatus.details}</p>}
                            </Message>
                        )}

                        {loading && (
                            <div className="mb-3">
                                <ProgressBar value={progress} showValue={true} />
                                <p className="text-center mt-2">Importando datos...</p>
                            </div>
                        )}
                    </div>

                    <div className="col-12">
                        <DataTable 
                            value={facturas.slice(0, 10)} 
                            paginator={false} 
                            rows={10}
                            scrollable 
                            scrollHeight="400px"
                            className="p-datatable-sm"
                        >
                            <Column field="numero" header="Nº" style={{ width: '50px' }} />
                            <Column field="fecha" header="Fecha" style={{ width: '100px' }} />
                            <Column field="numeroFactura" header="Nº Factura" style={{ width: '120px' }} />
                            <Column field="nitCi" header="NIT/CI" style={{ width: '100px' }} />
                            <Column field="nombreRazonSocial" header="Nombre/Razón Social" style={{ width: '200px' }} />
                            <Column field="importeTotal" header="Importe Total" style={{ width: '120px' }} />
                            <Column field="estado" header="Estado" style={{ width: '100px' }} />
                        </DataTable>
                        {facturas.length > 10 && (
                            <p className="text-center mt-2">Mostrando 10 de {facturas.length} registros</p>
                        )}
                    </div>
                </div>
            </Dialog>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <Card title="Importación de Facturas desde Excel">
                    <Toast ref={toast} />
                    
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="p-field">
                                <label htmlFor="fileUpload">Seleccione el archivo Excel</label>
                                <FileUpload
                                    ref={fileUploadRef}
                                    mode="basic"
                                    name="file"
                                    url="/api/upload"
                                    accept=".xlsx,.xls"
                                    maxFileSize={10000000}
                                    auto={true}
                                    chooseLabel="Seleccionar Archivo"
                                    onUpload={handleFileUpload}
                                    customUpload
                                    uploadHandler={handleFileUpload}
                                />
                                <small className="p-text-light">Formatos aceptados: .xlsx, .xls (máximo 10MB)</small>
                            </div>
                        </div>
                        
                        <div className="col-12 md:col-6">
                            <div className="p-field">
                                <h3>Instrucciones</h3>
                                <ol>
                                    <li>Seleccione un archivo Excel con el formato especificado</li>
                                    <li>El archivo debe contener las siguientes columnas: {columnasExcel.join(', ')}</li>
                                    <li>Los datos serán validados antes de la importación</li>
                                    <li>Se mostrará una vista previa de los datos antes de importar</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="mt-3">
                            <ProgressBar value={progress} showValue={true} />
                            <p className="text-center mt-2">Procesando archivo...</p>
                        </div>
                    )}

                    {renderMappingDialog()}
                </Card>
            </div>
        </div>
    );
};

export default ImportacionFacturas; 