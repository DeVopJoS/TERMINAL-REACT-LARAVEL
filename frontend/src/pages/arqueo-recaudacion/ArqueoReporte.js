import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
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
    
    // Función para exportar a Excel
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([
            { A: 'ARQUEO DE RECAUDACIÓN', B: '' },
            { A: 'Nº DE ARQUEO:', B: data.arqueonumero },
            { A: 'FECHA:', B: data.arqueofecha instanceof Date ? formatDate(data.arqueofecha) : data.arqueofecha },
            { A: 'TURNO:', B: data.arqueoturno === 'M' ? 'Mañana' : 'Tarde' },
            { A: 'HORA INICIO:', B: data.arqueohorainicio instanceof Date ? 
                `${String(data.arqueohorainicio.getHours()).padStart(2, '0')}:${String(data.arqueohorainicio.getMinutes()).padStart(2, '0')}` : 
                data.arqueohorainicio },
            { A: 'HORA FIN:', B: data.arqueohorafin instanceof Date ? 
                `${String(data.arqueohorafin.getHours()).padStart(2, '0')}:${String(data.arqueohorafin.getMinutes()).padStart(2, '0')}` : 
                data.arqueohorafin },
            { A: 'SUPERVISOR:', B: data.arqueosupervisor },
            { A: '', B: '' }
        ]);
        
        // Añadir servicios al Excel
        XLSX.utils.sheet_add_json(worksheet, [{ A: 'FACTURAS PRE VALORADAS', B: '', C: 'IMPORTE BS' }], { origin: -1 });
        
        resumenServicios.forEach(servicio => {
            XLSX.utils.sheet_add_json(worksheet, [{ 
                A: servicio.nombre, 
                B: '', 
                C: parseFloat(servicio.importe_total).toFixed(2) 
            }], { origin: -1 });
        });
        
        XLSX.utils.sheet_add_json(worksheet, [
            { A: 'TOTAL DE PREVALORACIONES:', B: '', C: totalRecaudacion.toFixed(2) },
            { A: 'INFRACCIONES:', B: '', C: '0.00' },
            { A: 'TOTAL:', B: '', C: totalRecaudacion.toFixed(2) },
            { A: '', B: '', C: '' }
        ], { origin: -1 });
        
        // Añadir cortes al Excel
        XLSX.utils.sheet_add_json(worksheet, [{ A: 'CORTE', B: 'PIEZAS', C: 'MONTO' }], { origin: -1 });
        
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
        
        CORTES_DENOMINACION.forEach(corte => {
            XLSX.utils.sheet_add_json(worksheet, [{ 
                A: `Bs ${corte.label}`, 
                B: data.cortes[corte.campo] || 0, 
                C: ((data.cortes[corte.campo] || 0) * corte.valor).toFixed(2) 
            }], { origin: -1 });
        });
        
        XLSX.utils.sheet_add_json(worksheet, [
            { A: 'TOTAL CORTES:', B: '', C: totalCortes.toFixed(2) },
            { A: '', B: '', C: '' },
            { A: 'DIFERENCIA:', B: getDiferenciaEstado(), C: formatearDiferencia() },
            { A: '', B: '', C: '' },
            { A: 'OBSERVACIONES:', B: data.arqueoobservacion, C: '' }
        ], { origin: -1 });
        
        // Crear libro y descargar
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Arqueo');
        XLSX.writeFile(workbook, `Arqueo_${data.arqueonumero}.xlsx`);
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