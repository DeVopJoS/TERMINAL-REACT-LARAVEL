import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { formatDate } from '../../utils/utils';

// Componente para la ventana emergente de reporte
export const ArqueoReporte = ({ visible, onHide, data, resumenServicios, detalleOperadores, totalRecaudacion, totalCortes }) => {
    const reportRef = useRef(null);
    
    // Función para exportar a PDF
    const exportPdf = () => {
        html2canvas(reportRef.current, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Arqueo_${data.arqueonumero}.pdf`);
        });
    };
    
    // Función para exportar a Excel con mismo diseño que la previsualización
    const exportExcel = async () => {
        const ExcelJS = await import('exceljs');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Arqueo');
        worksheet.properties.defaultRowHeight = 20;

        // Estilos
        const headerStyle = {
            font: { bold: true, color: { argb: 'FFFFFF' } },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '334457' } }, // azul oscuro
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            },
            alignment: { vertical: 'middle', horizontal: 'center' }
        };

        const subHeaderStyle = {
            font: { bold: true },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '9DE2E2' } }, // Celda resaltada teal claro
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            },
            alignment: { vertical: 'middle' }
        };

        const labelStyle = {
            font: { bold: true },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'B5E8E0' } }, // Celda label teal más claro
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            },
            alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }
        };

        const normalCellStyle = {
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        };

        const totalRowStyle = {
            font: { bold: true },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F0F0F0' } }, // gris claro
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        };

        // Título del reporte
        worksheet.mergeCells('A1:G1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'ARQUEO DE RECAUDACIÓN - SERVICIOS';
        titleCell.font = { size: 16, bold: true };
        titleCell.alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:G2');
        const subtitleCell = worksheet.getCell('A2');
        subtitleCell.value = 'Reporte de Arqueo Final';
        subtitleCell.font = { size: 12 };
        subtitleCell.alignment = { horizontal: 'center' };

        // Espaciado
        const infoStartRow = 4;

        // Información general - Formato unificado de tabla
        // Primera fila
        let currentRow = infoStartRow;
        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'Nº DE ARQUEO:';
        worksheet.getCell(`A${currentRow}`).style = labelStyle;
        worksheet.getCell(`C${currentRow}`).value = data.arqueonumero;
        worksheet.getCell(`C${currentRow}`).style = subHeaderStyle;
        worksheet.getCell(`D${currentRow}`).value = 'HORA DE INICIO:';
        worksheet.getCell(`D${currentRow}`).style = labelStyle;
        worksheet.getCell(`F${currentRow}`).value = data.arqueohorainicio instanceof Date ? 
            `${String(data.arqueohorainicio.getHours()).padStart(2, '0')}:${String(data.arqueohorainicio.getMinutes()).padStart(2, '0')}` : 
            data.arqueohorainicio;
        worksheet.getCell(`F${currentRow}`).style = normalCellStyle;
        worksheet.mergeCells(`F${currentRow}:G${currentRow}`);

        // Segunda fila
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'FECHA:';
        worksheet.getCell(`A${currentRow}`).style = labelStyle;
        worksheet.getCell(`C${currentRow}`).value = data.arqueofecha instanceof Date ? 
            formatDate(data.arqueofecha) : data.arqueofecha;
        worksheet.getCell(`C${currentRow}`).style = normalCellStyle;
        worksheet.getCell(`D${currentRow}`).value = 'HORA FINALIZADO:';
        worksheet.getCell(`D${currentRow}`).style = labelStyle;
        worksheet.getCell(`F${currentRow}`).value = data.arqueohorafin instanceof Date ? 
            `${String(data.arqueohorafin.getHours()).padStart(2, '0')}:${String(data.arqueohorafin.getMinutes()).padStart(2, '0')}` : 
            data.arqueohorafin;
        worksheet.getCell(`F${currentRow}`).style = normalCellStyle;
        worksheet.mergeCells(`F${currentRow}:G${currentRow}`);

        // Tercera fila
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'TURNO:';
        worksheet.getCell(`A${currentRow}`).style = labelStyle;
        worksheet.getCell(`C${currentRow}`).value = data.arqueoturno === 'M' ? 'Mañana' : 'Tarde';
        worksheet.getCell(`C${currentRow}`).style = normalCellStyle;
        worksheet.getCell(`D${currentRow}`).value = 'SUPERVISOR:';
        worksheet.getCell(`D${currentRow}`).style = labelStyle;
        worksheet.getCell(`F${currentRow}`).value = data.arqueosupervisor;
        worksheet.getCell(`F${currentRow}`).style = normalCellStyle;
        worksheet.mergeCells(`F${currentRow}:G${currentRow}`);

        // Espaciado
        currentRow += 2;
        const tablaServiciosStartRow = currentRow;

        // Crear una tabla unificada con la sección de servicios (izquierda)
        // Header
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'FACTURAS PRE VALORADAS';
        worksheet.getCell(`A${currentRow}`).style = headerStyle;
        worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
        worksheet.getCell(`D${currentRow}`).value = 'IMPORTE BS';
        worksheet.getCell(`D${currentRow}`).style = headerStyle;
        
        // Datos de servicios
        currentRow++;
        resumenServicios.forEach(servicio => {
            worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = servicio.nombre;
            worksheet.getCell(`A${currentRow}`).style = normalCellStyle;
            worksheet.getCell(`D${currentRow}`).value = 'Bs';
            worksheet.getCell(`D${currentRow}`).style = normalCellStyle;
            worksheet.getCell(`D${currentRow}`).alignment = { horizontal: 'center' };
            worksheet.getCell(`E${currentRow}`).value = parseFloat(servicio.importe_total).toFixed(2);
            worksheet.getCell(`E${currentRow}`).style = normalCellStyle;
            worksheet.getCell(`E${currentRow}`).alignment = { horizontal: 'right' };
            currentRow++;
        });
        
        // Totales de servicios
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'TOTAL DE PREVALORACIONES:';
        worksheet.getCell(`A${currentRow}`).style = totalRowStyle;
        worksheet.getCell(`D${currentRow}`).value = 'Bs';
        worksheet.getCell(`D${currentRow}`).style = totalRowStyle;
        worksheet.getCell(`D${currentRow}`).alignment = { horizontal: 'center' };
        worksheet.getCell(`E${currentRow}`).value = totalRecaudacion.toFixed(2);
        worksheet.getCell(`E${currentRow}`).style = totalRowStyle;
        worksheet.getCell(`E${currentRow}`).alignment = { horizontal: 'right' };
        
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'INFRACCIONES:';
        worksheet.getCell(`A${currentRow}`).style = normalCellStyle;
        worksheet.getCell(`D${currentRow}`).value = 'Bs';
        worksheet.getCell(`D${currentRow}`).style = normalCellStyle;
        worksheet.getCell(`D${currentRow}`).alignment = { horizontal: 'center' };
        worksheet.getCell(`E${currentRow}`).value = '0.00';
        worksheet.getCell(`E${currentRow}`).style = normalCellStyle;
        worksheet.getCell(`E${currentRow}`).alignment = { horizontal: 'right' };
        
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'TOTAL:';
        worksheet.getCell(`A${currentRow}`).style = totalRowStyle;
        worksheet.getCell(`D${currentRow}`).value = 'Bs';
        worksheet.getCell(`D${currentRow}`).style = totalRowStyle;
        worksheet.getCell(`D${currentRow}`).alignment = { horizontal: 'center' };
        worksheet.getCell(`E${currentRow}`).value = totalRecaudacion.toFixed(2);
        worksheet.getCell(`E${currentRow}`).style = totalRowStyle;
        worksheet.getCell(`E${currentRow}`).alignment = { horizontal: 'right' };

        // Tabla de cortes (lado derecho)
        let cortesRow = tablaServiciosStartRow;
        
        worksheet.getCell(`F${cortesRow}`).value = 'CORTE';
        worksheet.getCell(`F${cortesRow}`).style = headerStyle;
        worksheet.getCell(`G${cortesRow}`).value = 'PIEZAS';
        worksheet.getCell(`G${cortesRow}`).style = headerStyle;
        worksheet.getCell(`H${cortesRow}`).value = 'MONTO';
        worksheet.getCell(`H${cortesRow}`).style = headerStyle;
        
        const CORTES_DENOMINACION = [
            { campo: 'arqueocorte200_00', valor: 200, label: '200' },
            { campo: 'arqueocorte100_00', valor: 100, label: '100' },
            { campo: 'arqueocorte050_00', valor: 50, label: '50' },
            { campo: 'arqueocorte020_00', valor: 20, label: '20' },
            { campo: 'arqueocorte010_00', valor: 10, label: '10' },
            { campo: 'arqueocorte005_00', valor: 5, label: '5' },
            { campo: 'arqueocorte002_00', valor: 2, label: '2' },
            { campo: 'arqueocorte001_00', valor: 1, label: '1' },
            { campo: 'arqueocorte000_50', valor: 0.5, label: '0.50' },
            { campo: 'arqueocorte000_20', valor: 0.2, label: '0.20' },
            { campo: 'arqueocorte000_10', valor: 0.1, label: '0.10' }
        ];

        cortesRow++;
        CORTES_DENOMINACION.forEach(corte => {
            worksheet.getCell(`F${cortesRow}`).value = `Bs ${corte.label}`;
            worksheet.getCell(`F${cortesRow}`).style = normalCellStyle;
            worksheet.getCell(`G${cortesRow}`).value = data.cortes[corte.campo] || 0;
            worksheet.getCell(`G${cortesRow}`).style = normalCellStyle;
            worksheet.getCell(`G${cortesRow}`).alignment = { horizontal: 'center' };
            worksheet.getCell(`H${cortesRow}`).value = ((data.cortes[corte.campo] || 0) * corte.valor).toFixed(2);
            worksheet.getCell(`H${cortesRow}`).style = normalCellStyle;
            worksheet.getCell(`H${cortesRow}`).alignment = { horizontal: 'right' };
            cortesRow++;
        });
        
        // Total de cortes
        worksheet.getCell(`F${cortesRow}`).value = 'TOTAL:';
        worksheet.getCell(`F${cortesRow}`).style = totalRowStyle;
        worksheet.getCell(`G${cortesRow}`).style = totalRowStyle;
        worksheet.getCell(`H${cortesRow}`).value = totalCortes.toFixed(2);
        worksheet.getCell(`H${cortesRow}`).style = totalRowStyle;
        worksheet.getCell(`H${cortesRow}`).alignment = { horizontal: 'right' };

        // Tomar el máximo entre las filas de servicios y cortes
        currentRow = Math.max(currentRow, cortesRow) + 2;

        // Sección de diferencia como tabla unificada
        worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO';
        worksheet.getCell(`A${currentRow}`).style = headerStyle;
        worksheet.getCell(`F${currentRow}`).value = getDiferenciaEstado();
        worksheet.getCell(`G${currentRow}:H${currentRow}`).value = formatearDiferencia();
        
        // Definir el estilo según la diferencia
        let diferenciaStyle = {
            font: { bold: true },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        };

        if (totalCortes - totalRecaudacion === 0) {
            diferenciaStyle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'C6E7C6' } }; // verde claro
        } else if (totalCortes - totalRecaudacion > 0) {
            diferenciaStyle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CCE5FF' } }; // azul claro
        } else {
            diferenciaStyle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCCC' } }; // rojo claro
        }

        worksheet.getCell(`F${currentRow}`).style = diferenciaStyle;
        worksheet.mergeCells(`G${currentRow}:H${currentRow}`);
        worksheet.getCell(`G${currentRow}`).style = diferenciaStyle;
        worksheet.getCell(`G${currentRow}`).alignment = { horizontal: 'right' };

        currentRow += 2;

        // Observaciones
        worksheet.getCell(`A${currentRow}`).value = 'Observaciones:';
        worksheet.getCell(`A${currentRow}`).font = { bold: true };
        
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = data.arqueoobservacion || '';
        worksheet.getCell(`A${currentRow}`).style = {
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            },
            alignment: { vertical: 'top', wrapText: true }
        };
        worksheet.getRow(currentRow).height = 40;

        currentRow += 3;

        // Sección de firmas
        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
        worksheet.mergeCells(`G${currentRow}:H${currentRow}`);
        
        worksheet.getCell(`A${currentRow}`).value = 'Elaborado por';
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        worksheet.getCell(`D${currentRow}`).value = 'Supervisor';
        worksheet.getCell(`D${currentRow}`).alignment = { horizontal: 'center' };
        worksheet.getCell(`G${currentRow}`).value = 'Autorizado por';
        worksheet.getCell(`G${currentRow}`).alignment = { horizontal: 'center' };
        
        // Generar el archivo y descargarlo
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Arqueo_${data.arqueonumero}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    };
    
    // Obtener el estado de la diferencia
    const getDiferenciaEstado = () => {
        if (!totalRecaudacion) return "Ninguno";
        
        const diferencia = totalCortes - totalRecaudacion;
        if (diferencia === 0) return "Ninguno";
        if (diferencia > 0) return "Sobrante";
        return "Faltante";
    };
    
    // Formatear la diferencia para mostrar
    const formatearDiferencia = () => {
        if (!totalRecaudacion) return "-";
        
        const diferencia = totalCortes - totalRecaudacion;
        if (diferencia === 0) return "-";
        return `Bs ${Math.abs(diferencia).toFixed(2)}`;
    };
    
    // Botones del footer
    const footer = (
        <div>
            <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-raised p-button-sm p-button-info mr-2" onClick={exportPdf} />
            <Button label="Exportar Excel" icon="pi pi-file-excel" className="p-button-raised p-button-sm p-button-success mr-2" onClick={exportExcel} />
            <Button label="Cerrar" icon="pi pi-times" className="p-button-raised p-button-sm p-button-secondary" onClick={onHide} />
        </div>
    );
    
    return (
        <Dialog 
            header="Reporte de Arqueo Final" 
            visible={visible} 
            style={{ width: '80%' }} 
            footer={footer}
            onHide={onHide}
            maximizable
        >
            <div ref={reportRef} className="p-3" style={{ fontSize: '0.875rem' }}>
                {/* Header */}
                <div className="text-center mb-3">
                    <h2 className="text-xl font-bold">ARQUEO DE RECAUDACIÓN - SERVICIOS</h2>
                    <div className="text-lg">Reporte de Arqueo Final</div>
                </div>
                
                {/* Información general */}
                <div className="grid">
                    <div className="col-12 lg:col-6">
                        <table className="w-full border-1 border-collapse">
                            <tbody>
                                <tr>
                                    <td className="bg-teal-100 border-1 p-2 font-bold" style={{ width: '40%' }}>Nº DE ARQUEO:</td>
                                    <td className="bg-teal-50 border-1 p-2" style={{ backgroundColor: '#9de2e2' }}>
                                        {data.arqueonumero}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-teal-100 border-1 p-2 font-bold">FECHA:</td>
                                    <td className="bg-teal-50 border-1 p-2">
                                        {data.arqueofecha instanceof Date ? 
                                            formatDate(data.arqueofecha) : 
                                            data.arqueofecha}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-teal-100 border-1 p-2 font-bold">TURNO:</td>
                                    <td className="bg-teal-50 border-1 p-2">
                                        {data.arqueoturno === 'M' ? 'Mañana' : 'Tarde'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 lg:col-6">
                        <table className="w-full border-1 border-collapse">
                            <tbody>
                                <tr>
                                    <td className="bg-teal-100 border-1 p-2 font-bold" style={{ width: '40%' }}>HORA DE INICIO:</td>
                                    <td className="bg-teal-50 border-1 p-2">
                                        {data.arqueohorainicio instanceof Date ? 
                                            `${String(data.arqueohorainicio.getHours()).padStart(2, '0')}:${String(data.arqueohorainicio.getMinutes()).padStart(2, '0')}` : 
                                            data.arqueohorainicio}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-teal-100 border-1 p-2 font-bold">HORA FINALIZADO:</td>
                                    <td className="bg-teal-50 border-1 p-2">
                                        {data.arqueohorafin instanceof Date ? 
                                            `${String(data.arqueohorafin.getHours()).padStart(2, '0')}:${String(data.arqueohorafin.getMinutes()).padStart(2, '0')}` : 
                                            data.arqueohorafin}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-teal-100 border-1 p-2 font-bold">SUPERVISOR:</td>
                                    <td className="bg-teal-50 border-1 p-2">
                                        {data.arqueosupervisor}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Tablas de recaudación y cortes */}
                <div className="grid mt-3">
                    <div className="col-12 lg:col-6">
                        <table className="w-full border-1 border-collapse">
                            <thead>
                                <tr>
                                    <th colSpan="2" className="bg-bluegray-700 text-white border-1 p-2 text-left">FACTURAS PRE VALORADAS</th>
                                    <th colSpan="2" className="bg-bluegray-700 text-white border-1 p-2 text-center">IMPORTE Bs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resumenServicios.map((servicio, idx) => (
                                    <tr key={idx}>
                                        <td colSpan="2" className="border-1 p-2">{servicio.nombre}</td>
                                        <td className="border-1 p-2 text-right">Bs</td>
                                        <td className="border-1 p-2 text-right">{parseFloat(servicio.importe_total).toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-100 font-bold">
                                    <td colSpan="2" className="border-1 p-2">TOTAL DE PREVALORACIONES:</td>
                                    <td className="border-1 p-2 text-right">Bs</td>
                                    <td className="border-1 p-2 text-right">{totalRecaudacion.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="border-1 p-2">INFRACCIONES:</td>
                                    <td className="border-1 p-2 text-right">Bs</td>
                                    <td className="border-1 p-2 text-right">0.00</td>
                                </tr>
                                <tr className="bg-gray-100 font-bold">
                                    <td colSpan="2" className="border-1 p-2">TOTAL:</td>
                                    <td className="border-1 p-2 text-right">Bs</td>
                                    <td className="border-1 p-2 text-right">{totalRecaudacion.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="col-12 lg:col-6">
                        <table className="w-full border-1 border-collapse">
                            <thead>
                                <tr>
                                    <th className="bg-bluegray-700 text-white border-1 p-2">CORTE</th>
                                    <th className="bg-bluegray-700 text-white border-1 p-2 text-center" style={{ width: '15%' }}>PIEZAS</th>
                                    <th className="bg-bluegray-700 text-white border-1 p-2 text-center">MONTO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { campo: 'arqueocorte200_00', valor: 200, label: '200' },
                                    { campo: 'arqueocorte100_00', valor: 100, label: '100' },
                                    { campo: 'arqueocorte050_00', valor: 50, label: '50' },
                                    { campo: 'arqueocorte020_00', valor: 20, label: '20' },
                                    { campo: 'arqueocorte010_00', valor: 10, label: '10' },
                                    { campo: 'arqueocorte005_00', valor: 5, label: '5' },
                                    { campo: 'arqueocorte002_00', valor: 2, label: '2' },
                                    { campo: 'arqueocorte001_00', valor: 1, label: '1' },
                                    { campo: 'arqueocorte000_50', valor: 0.5, label: '0.50' },
                                    { campo: 'arqueocorte000_20', valor: 0.2, label: '0.20' },
                                    { campo: 'arqueocorte000_10', valor: 0.1, label: '0.10' }
                                ].map((corte) => (
                                    <tr key={corte.campo}>
                                        <td className="border-1 p-2">Bs {corte.label}</td>
                                        <td className="border-1 p-2 text-center">
                                            {data.cortes[corte.campo] || 0}
                                        </td>
                                        <td className="border-1 p-2 text-right">
                                            {((data.cortes[corte.campo] || 0) * corte.valor).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-100 font-bold">
                                    <td colSpan="2" className="border-1 p-2">TOTAL:</td>
                                    <td className="border-1 p-2 text-right">{totalCortes.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Diferencia */}
                <table className="w-full border-1 border-collapse mt-3">
                    <tbody>
                        <tr>
                            <td className="bg-bluegray-700 text-white border-1 p-2 font-bold" style={{ width: '40%' }}>
                                DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO
                            </td>
                            <td className={`border-1 p-2 font-bold ${
                                totalCortes - totalRecaudacion === 0 ? 'bg-green-100' :
                                totalCortes - totalRecaudacion > 0 ? 'bg-blue-100' : 
                                'bg-red-100'
                            }`}>
                                {getDiferenciaEstado()}
                            </td>
                            <td className={`border-1 p-2 font-bold text-right ${
                                totalCortes - totalRecaudacion === 0 ? 'bg-green-100' :
                                totalCortes - totalRecaudacion > 0 ? 'bg-blue-100' : 
                                'bg-red-100'
                            }`}>
                                {formatearDiferencia()}
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                {/* Observaciones */}
                <div className="mt-3">
                    <h3 className="font-bold mb-1">Observaciones:</h3>
                    <div className="p-2 border-1 min-h-4rem">
                        {data.arqueoobservacion}
                    </div>
                </div>
                
                {/* Firmas */}
                <div className="grid mt-5">
                    <div className="col-4 text-center">
                        <div className="border-t-1 border-black pt-2 mt-5 inline-block" style={{ minWidth: '150px' }}>
                            Elaborado por
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="border-t-1 border-black pt-2 mt-5 inline-block" style={{ minWidth: '150px' }}>
                            Supervisor
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="border-t-1 border-black pt-2 mt-5 inline-block" style={{ minWidth: '150px' }}>
                            Autorizado por
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

// Añadir estilos CSS para el reporte
export const ReporteStyle = () => (
    <style>{`
        .border-1 {
            border-width: 1px !important;
            border-style: solid !important;
            border-color: #ddd !important;
        }
        
        .border-t-1 {
            border-top-width: 1px !important;
            border-top-style: solid !important;
            border-top-color: #000 !important;
        }
        
        .border-collapse {
            border-collapse: collapse !important;
        }
        
        .min-h-4rem {
            min-height: 4rem !important;
        }
        
        @media print {
            body * {
                visibility: hidden;
            }
            
            #reportePrint, #reportePrint * {
                visibility: visible;
            }
            
            #reportePrint {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
        }
    `}</style>
);