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
    
    // Función para exportar a Excel con diseño unificado
    const exportExcel = async () => {
        const ExcelJS = await import('exceljs');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Arqueo');
        
        // Configurar ancho de columnas para mejor visualización
        worksheet.columns = [
            { width: 20 }, // A
            { width: 15 }, // B
            { width: 15 }, // C
            { width: 15 }, // D
            { width: 15 }, // E
            { width: 15 }, // F
            { width: 10 }, // G
            { width: 15 }  // H
        ];

        // Estilos
        const headerStyle = {
            font: { bold: true, color: { argb: 'FFFFFF' } },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '616161' } }, // Gris oscuro como en la imagen
            border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
            alignment: { vertical: 'middle', horizontal: 'center' }
        };

        const infoHeaderStyle = {
            font: { bold: true },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CCECE4' } }, // Verde claro para encabezados
            border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };

        const infoValueStyle = {
            border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
            alignment: { vertical: 'middle', horizontal: 'left' }
        };

        const cellStyle = {
            border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
            alignment: { vertical: 'middle' }
        };

        const totalStyle = {
            font: { bold: true },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E6E6E6' } }, // Gris claro
            border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
            alignment: { vertical: 'middle' }
        };

        // Título principal
        worksheet.mergeCells('A1:H1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'ARQUEO DE RECAUDACIÓN - SERVICIOS';
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

        // Subtítulo
        worksheet.mergeCells('A2:H2');
        const subtitleCell = worksheet.getCell('A2');
        subtitleCell.value = 'Reporte de Arqueo Final';
        subtitleCell.font = { size: 12 };
        subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };

        // Ajustar altura de las filas del título
        worksheet.getRow(1).height = 25;
        worksheet.getRow(2).height = 20;

        // Espacio
        worksheet.getRow(3).height = 10;

        // SECCIÓN DE INFORMACIÓN GENERAL
        // Fila 1: Nº de Arqueo y Hora de Inicio
        worksheet.getCell('A4').value = 'Nº DE ARQUEO:';
        worksheet.getCell('A4').style = infoHeaderStyle;
        worksheet.mergeCells('A4:B4');
        
        worksheet.getCell('C4').value = data.arqueonumero;
        worksheet.getCell('C4').style = infoValueStyle;
        
        worksheet.getCell('D4').value = 'HORA DE INICIO:';
        worksheet.getCell('D4').style = infoHeaderStyle;
        
        worksheet.getCell('E4').value = data.arqueohorainicio instanceof Date ? 
            `${String(data.arqueohorainicio.getHours()).padStart(2, '0')}:${String(data.arqueohorainicio.getMinutes()).padStart(2, '0')}` : 
            data.arqueohorainicio;
        worksheet.getCell('E4').style = infoValueStyle;
        worksheet.mergeCells('E4:H4');

        // Fila 2: Fecha y Hora Finalizado
        worksheet.getCell('A5').value = 'FECHA:';
        worksheet.getCell('A5').style = infoHeaderStyle;
        worksheet.mergeCells('A5:B5');
        
        worksheet.getCell('C5').value = data.arqueofecha instanceof Date ? 
            formatDate(data.arqueofecha) : 
            data.arqueofecha;
        worksheet.getCell('C5').style = infoValueStyle;
        
        worksheet.getCell('D5').value = 'HORA FINALIZADO:';
        worksheet.getCell('D5').style = infoHeaderStyle;
        
        worksheet.getCell('E5').value = data.arqueohorafin instanceof Date ? 
            `${String(data.arqueohorafin.getHours()).padStart(2, '0')}:${String(data.arqueohorafin.getMinutes()).padStart(2, '0')}` : 
            data.arqueohorafin;
        worksheet.getCell('E5').style = infoValueStyle;
        worksheet.mergeCells('E5:H5');

        // Fila 3: Turno y Supervisor
        worksheet.getCell('A6').value = 'TURNO:';
        worksheet.getCell('A6').style = infoHeaderStyle;
        worksheet.mergeCells('A6:B6');
        
        worksheet.getCell('C6').value = data.arqueoturno === 'M' ? 'Mañana' : 'Tarde';
        worksheet.getCell('C6').style = infoValueStyle;
        
        worksheet.getCell('D6').value = 'SUPERVISOR:';
        worksheet.getCell('D6').style = infoHeaderStyle;
        
        worksheet.getCell('E6').value = data.arqueosupervisor;
        worksheet.getCell('E6').style = infoValueStyle;
        worksheet.mergeCells('E6:H6');

        worksheet.getRow(7).height = 10;

        // TABLA PRINCIPAL
        // Headers
        worksheet.getCell('A8').value = 'FACTURAS PRE VALORADAS';
        worksheet.getCell('A8').style = headerStyle;
        worksheet.mergeCells('A8:B8');
        
        worksheet.getCell('C8').value = 'IMPORTE BS';
        worksheet.getCell('C8').style = headerStyle;
        
        worksheet.getCell('D8').value = 'CORTE';
        worksheet.getCell('D8').style = headerStyle;
        
        worksheet.getCell('E8').value = 'PIEZAS';
        worksheet.getCell('E8').style = headerStyle;
        
        worksheet.getCell('F8').value = 'MONTO';
        worksheet.getCell('F8').style = headerStyle;
        worksheet.mergeCells('F8:H8');

        // Obtener los datos de cortes para iterar
        const CORTES_DENOMINACION = [
            { campo: 'arqueocorte200_00', valor: 200, label: 'Bs 200' },
            { campo: 'arqueocorte100_00', valor: 100, label: 'Bs 100' },
            { campo: 'arqueocorte050_00', valor: 50, label: 'Bs 50' },
            { campo: 'arqueocorte020_00', valor: 20, label: 'Bs 20' },
            { campo: 'arqueocorte010_00', valor: 10, label: 'Bs 10' },
            { campo: 'arqueocorte005_00', valor: 5, label: 'Bs 5' },
            { campo: 'arqueocorte002_00', valor: 2, label: 'Bs 2' },
            { campo: 'arqueocorte001_00', valor: 1, label: 'Bs 1' },
            { campo: 'arqueocorte000_50', valor: 0.5, label: 'Bs 0.50' },
            { campo: 'arqueocorte000_20', valor: 0.2, label: 'Bs 0.20' },
            { campo: 'arqueocorte000_10', valor: 0.1, label: 'Bs 0.10' }
        ];

        // Determinar qué tiene más líneas, servicios o cortes
        const maxRows = Math.max(resumenServicios.length + 3, CORTES_DENOMINACION.length + 1);

        // Llenar los datos de servicios y cortes
        for (let i = 0; i < maxRows; i++) {
            const rowIndex = 9 + i;
            
            // Columnas de Servicios (parte izquierda)
            if (i < resumenServicios.length) {
                // Servicios regulares
                worksheet.getCell(`A${rowIndex}`).value = resumenServicios[i].nombre;
                worksheet.getCell(`A${rowIndex}`).style = cellStyle;
                worksheet.mergeCells(`A${rowIndex}:B${rowIndex}`);
                
                worksheet.getCell(`C${rowIndex}`).value = parseFloat(resumenServicios[i].importe_total).toFixed(2);
                worksheet.getCell(`C${rowIndex}`).style = cellStyle;
                worksheet.getCell(`C${rowIndex}`).alignment = { horizontal: 'right', vertical: 'middle' };
            } 
            else if (i === resumenServicios.length) {
                // Total de prevaloraciones
                worksheet.getCell(`A${rowIndex}`).value = 'TOTAL DE PREVALORACIONES:';
                worksheet.getCell(`A${rowIndex}`).style = totalStyle;
                worksheet.mergeCells(`A${rowIndex}:B${rowIndex}`);
                
                worksheet.getCell(`C${rowIndex}`).value = totalRecaudacion.toFixed(2);
                worksheet.getCell(`C${rowIndex}`).style = totalStyle;
                worksheet.getCell(`C${rowIndex}`).alignment = { horizontal: 'right', vertical: 'middle' };
            }
            else if (i === resumenServicios.length + 1) {
                // Infracciones
                worksheet.getCell(`A${rowIndex}`).value = 'INFRACCIONES:';
                worksheet.getCell(`A${rowIndex}`).style = cellStyle;
                worksheet.mergeCells(`A${rowIndex}:B${rowIndex}`);
                
                worksheet.getCell(`C${rowIndex}`).value = '0.00';
                worksheet.getCell(`C${rowIndex}`).style = cellStyle;
                worksheet.getCell(`C${rowIndex}`).alignment = { horizontal: 'right', vertical: 'middle' };
            }
            else if (i === resumenServicios.length + 2) {
                // Total final
                worksheet.getCell(`A${rowIndex}`).value = 'TOTAL:';
                worksheet.getCell(`A${rowIndex}`).style = totalStyle;
                worksheet.mergeCells(`A${rowIndex}:B${rowIndex}`);
                
                worksheet.getCell(`C${rowIndex}`).value = totalRecaudacion.toFixed(2);
                worksheet.getCell(`C${rowIndex}`).style = totalStyle;
                worksheet.getCell(`C${rowIndex}`).alignment = { horizontal: 'right', vertical: 'middle' };
            }
            
            // Columnas de Cortes (parte derecha)
            if (i < CORTES_DENOMINACION.length) {
                // Cortes regulares
                worksheet.getCell(`D${rowIndex}`).value = CORTES_DENOMINACION[i].label;
                worksheet.getCell(`D${rowIndex}`).style = cellStyle;
                
                worksheet.getCell(`E${rowIndex}`).value = data.cortes[CORTES_DENOMINACION[i].campo] || 0;
                worksheet.getCell(`E${rowIndex}`).style = cellStyle;
                worksheet.getCell(`E${rowIndex}`).alignment = { horizontal: 'center', vertical: 'middle' };
                
                const montoCorte = ((data.cortes[CORTES_DENOMINACION[i].campo] || 0) * CORTES_DENOMINACION[i].valor).toFixed(2);
                worksheet.getCell(`F${rowIndex}`).value = montoCorte;
                worksheet.getCell(`F${rowIndex}`).style = cellStyle;
                worksheet.getCell(`F${rowIndex}`).alignment = { horizontal: 'right', vertical: 'middle' };
                worksheet.mergeCells(`F${rowIndex}:H${rowIndex}`);
            } 
            else if (i === CORTES_DENOMINACION.length) {
                // Total de cortes
                worksheet.getCell(`D${rowIndex}`).value = 'TOTAL:';
                worksheet.getCell(`D${rowIndex}`).style = totalStyle;
                
                worksheet.getCell(`E${rowIndex}`).value = '';
                worksheet.getCell(`E${rowIndex}`).style = totalStyle;
                
                worksheet.getCell(`F${rowIndex}`).value = totalCortes.toFixed(2);
                worksheet.getCell(`F${rowIndex}`).style = totalStyle;
                worksheet.getCell(`F${rowIndex}`).alignment = { horizontal: 'right', vertical: 'middle' };
                worksheet.mergeCells(`F${rowIndex}:H${rowIndex}`);
            }
            else {
                // Rellenar con celdas vacías pero con estilo
                worksheet.getCell(`D${rowIndex}`).style = cellStyle;
                worksheet.getCell(`E${rowIndex}`).style = cellStyle;
                worksheet.getCell(`F${rowIndex}`).style = cellStyle;
                worksheet.mergeCells(`F${rowIndex}:H${rowIndex}`);
            }
        }

        // Calcular la siguiente fila después de la tabla principal
        const nextRow = 9 + maxRows + 1;

        // SECCIÓN DE DIFERENCIA
        worksheet.getCell(`A${nextRow}`).value = 'DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO';
        worksheet.getCell(`A${nextRow}`).style = headerStyle;
        worksheet.mergeCells(`A${nextRow}:E${nextRow}`);
        
        // Estilo para la diferencia según el estado
        const diferencia = totalCortes - totalRecaudacion;
        let diferenciaFillColor = '';
        
        if (diferencia === 0) {
            diferenciaFillColor = 'C6E7C6'; // Verde claro para "Ninguno"
        } else if (diferencia > 0) {
            diferenciaFillColor = 'CCE5FF'; // Azul claro para "Sobrante"
        } else {
            diferenciaFillColor = 'FFCCCC'; // Rojo claro para "Faltante"
        }
        
        const diferenciaStyle = {
            font: { bold: true },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: diferenciaFillColor } },
            border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };
        
        worksheet.getCell(`F${nextRow}`).value = getDiferenciaEstado();
        worksheet.getCell(`F${nextRow}`).style = diferenciaStyle;
        
        worksheet.getCell(`G${nextRow}`).value = formatearDiferencia();
        worksheet.getCell(`G${nextRow}`).style = diferenciaStyle;
        worksheet.getCell(`G${nextRow}`).alignment = { horizontal: 'right', vertical: 'middle' };
        worksheet.mergeCells(`G${nextRow}:H${nextRow}`);

        // SECCIÓN DE OBSERVACIONES
        const obsRow = nextRow + 2;
        worksheet.getCell(`A${obsRow}`).value = 'Observaciones:';
        worksheet.getCell(`A${obsRow}`).font = { bold: true };
        
        worksheet.mergeCells(`A${obsRow+1}:H${obsRow+1}`);
        worksheet.getCell(`A${obsRow+1}`).value = data.arqueoobservacion || '';
        worksheet.getCell(`A${obsRow+1}`).style = {
            border: { 
                top: { style: 'thin' }, 
                left: { style: 'thin' }, 
                bottom: { style: 'thin' }, 
                right: { style: 'thin' } 
            },
            alignment: { vertical: 'top', wrapText: true }
        };
        worksheet.getRow(obsRow+1).height = 50; // Altura para observaciones

        // SECCIÓN DE FIRMAS
        const firmaRow = obsRow + 3;
        worksheet.getRow(firmaRow-1).height = 40;

        worksheet.mergeCells(`A${firmaRow}:B${firmaRow}`);
        worksheet.getCell(`A${firmaRow}`).value = '_______________________';
        worksheet.getCell(`A${firmaRow}`).alignment = { horizontal: 'center' };

        worksheet.mergeCells(`D${firmaRow}:E${firmaRow}`);
        worksheet.getCell(`D${firmaRow}`).value = '_______________________';
        worksheet.getCell(`D${firmaRow}`).alignment = { horizontal: 'center' };

        worksheet.mergeCells(`G${firmaRow}:H${firmaRow}`);
        worksheet.getCell(`G${firmaRow}`).value = '_______________________';
        worksheet.getCell(`G${firmaRow}`).alignment = { horizontal: 'center' };

        // Textos de las firmas
        const textoFirmaRow = firmaRow + 1;
        worksheet.mergeCells(`A${textoFirmaRow}:B${textoFirmaRow}`);
        worksheet.getCell(`A${textoFirmaRow}`).value = 'Elaborado por';
        worksheet.getCell(`A${textoFirmaRow}`).alignment = { horizontal: 'center' };

        worksheet.mergeCells(`D${textoFirmaRow}:E${textoFirmaRow}`);
        worksheet.getCell(`D${textoFirmaRow}`).value = 'Supervisor';
        worksheet.getCell(`D${textoFirmaRow}`).alignment = { horizontal: 'center' };

        worksheet.mergeCells(`G${textoFirmaRow}:H${textoFirmaRow}`);
        worksheet.getCell(`G${textoFirmaRow}`).value = 'Autorizado por';
        worksheet.getCell(`G${textoFirmaRow}`).alignment = { horizontal: 'center' };

        worksheet.getRow(textoFirmaRow + 1).height = 60;

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
                    
                <table className="w-full border-1 border-collapse mt-2">
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
                    <div className="p-2" style={{ 
                        border: '2px solid black',
                        minHeight: '4rem',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}>
                        {data.arqueoobservacion}
                    </div>
                </div>
                
                {/* Firmas */}
                <div className="grid mt-5">
                    <div className="col-4 text-center">
                        <div className="border-b-2 border-black mb-2" style={{ minWidth: '200px', margin: 'auto' }}>&nbsp;</div>
                        <div className="text-sm">Elaborado por</div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="border-b-2 border-black mb-2" style={{ minWidth: '200px', margin: 'auto' }}>&nbsp;</div>
                        <div className="text-sm">Supervisor</div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="border-b-2 border-black mb-2" style={{ minWidth: '200px', margin: 'auto' }}>&nbsp;</div>
                        <div className="text-sm">Autorizado por</div>
                    </div>
                </div>

                <div style={{ height: '100px' }}></div>
            </div>
        </Dialog>
    );
};

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
        
        .p-datatable .p-datatable-tbody > tr > td {
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
        }
        
        .text-xs {
            font-size: 0.75rem !important;
        }
        
        .compact-row {
            padding: 0.25rem 0.5rem !important;
            height: 2rem !important;
            font-size: 0.875rem !important;
        }
    `}</style>
);

export default ArqueoReporte;