import React from 'react';

const ArqueoTemplate = ({ arqueo }) => {
    const formatCurrency = (value) => {
        return parseFloat(value || 0).toFixed(2);
    };

    // Mapeo de cortes con sus valores y campos en la DB
    const CORTES = [
        { valor: 200, campo: 'arqueocorte200_00' },
        { valor: 100, campo: 'arqueocorte100_00' },
        { valor: 50, campo: 'arqueocorte050_00' },
        { valor: 20, campo: 'arqueocorte020_00' },
        { valor: 10, campo: 'arqueocorte010_00' },
        { valor: 5, campo: 'arqueocorte005_00' },
        { valor: 2, campo: 'arqueocorte002_00' },
        { valor: 1, campo: 'arqueocorte001_00' },
        { valor: 0.5, campo: 'arqueocorte000_50' },
        { valor: 0.2, campo: 'arqueocorte000_20' },
        { valor: 0.1, campo: 'arqueocorte000_10' }
    ];

    // Calcular total de cortes
    const calcularTotalCortes = () => {
        return CORTES.reduce((total, corte) => {
            const cantidad = arqueo.cortes?.[corte.campo] || 0;
            return total + (cantidad * corte.valor);
        }, 0);
    };

    return (
        <div className="arqueo-template">
            <table className="main-table">
                <tbody>
                    {/* Cabecera */}
                    <tr>
                        <td className="header-cell">TURNO:</td>
                        <td>{arqueo.arqueoturno === 'M' ? 'MAÑANA' : 'TARDE'}</td>
                        <td className="header-cell">N° DE ARQUEO:</td>
                        <td>{arqueo.arqueonumero}</td>
                    </tr>
                    <tr>
                        <td className="header-cell">HORA DE INICIO:</td>
                        <td>{new Date(arqueo.arqueohorainicio).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</td>
                        <td className="header-cell">FECHA:</td>
                        <td>{new Date(arqueo.arqueofecha).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td className="header-cell">HORA FINALIZADO:</td>
                        <td>{new Date(arqueo.arqueohorafin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</td>
                        <td className="header-cell">SUPERVISOR:</td>
                        <td>{arqueo.arqueosupervisor || 'SIN NOMBRE'}</td>
                    </tr>
                </tbody>
            </table>

            {/* Contenido principal en dos columnas */}
            <div className="content-grid">
                {/* Columna izquierda: Facturas */}
                <div className="content-column">
                    <table className="detail-table">
                        <thead>
                            <tr>
                                <th>FACTURA PRE VALORADAS</th>
                                <th>IMPORTE Bs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapear servicios */}
                            <tr className="total-row">
                                <td>TOTAL DE PREVALORADAS:</td>
                                <td className="amount">Bs. {formatCurrency(arqueo.arqueorecaudaciontotal)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Columna derecha: Cortes */}
                <div className="content-column">
                    <table className="detail-table">
                        <thead>
                            <tr>
                                <th>CORTE</th>
                                <th>PIEZAS</th>
                                <th>MONTO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CORTES.map((corte) => {
                                const cantidad = arqueo.cortes?.[corte.campo] || 0;
                                const monto = cantidad * corte.valor;
                                
                                return (
                                    <tr key={corte.campo}>
                                        <td>Bs. {corte.valor.toFixed(2)}</td>
                                        <td className="amount">{cantidad}</td>
                                        <td className="amount">
                                            Bs. {formatCurrency(monto)}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr className="total-row">
                                <td colSpan="2">TOTAL:</td>
                                <td className="amount">Bs. {formatCurrency(calcularTotalCortes())}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sección de diferencia */}
            <table className="footer-table">
                <tbody>
                    <tr>
                        <td className="header-cell" style={{width: '50%'}}>
                            DIFERENCIA ENTRE RECAUDACIÓN Y EFECTIVO:
                        </td>
                        <td>{arqueo.arqueodiferenciatipo === 'F' ? 'FALTANTE' : 
                            arqueo.arqueodiferenciatipo === 'S' ? 'SOBRANTE' : 'Ninguno'}</td>
                        <td className="amount">
                            Bs. {formatCurrency(Math.abs(arqueo.arqueodiferencia || 0))}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Firmas con cuadros para sellos */}
            <div className="grid mt-3">
                <div className="col-6">
                    <div className="firma-section">
                        <span className="firma-label">REALIZADO POR EL CAJERO:</span>
                        <div className="firma-container">
                            <div className="firma-nombre">{arqueo.arqueorealizadopor || ''}</div>
                            <div className="firma-box"></div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="firma-section">
                        <span className="firma-label">REVISADO POR EL CAJERO:</span>
                        <div className="firma-container">
                            <div className="firma-nombre">{arqueo.arqueorevisadopor || ''}</div>
                            <div className="firma-box"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Observaciones */}
            {arqueo.arqueoobservacion && (
                <table className="observation-table">
                    <tbody>
                        <tr>
                            <td className="header-cell">OBSERVACIÓN:</td>
                            <td>{arqueo.arqueoobservacion}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <style>{`
                .arqueo-template {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .main-table, .detail-table, .footer-table, .signature-table, .observation-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                .main-table td, .detail-table td, .detail-table th, 
                .footer-table td, .signature-table td, .observation-table td {
                    border: 1px solid #000;
                    padding: 8px;
                }
                .header-cell {
                    font-weight: bold;
                    background-color: #f8f9fa;
                }
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin: 20px 0;
                }
                .amount {
                    text-align: right;
                }
                .total-row {
                    font-weight: bold;
                    background-color: #f8f9fa;
                }

                .excel-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .firma-cell {
                    width: 50%;
                    padding: 15px;
                    vertical-align: top;
                    border: none;
                }

                .firma-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .firma-label {
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .firma-nombre {
                    margin: 10px 0;
                    min-height: 20px;
                    border-bottom: 1px solid #000;
                    width: 80%;
                }

                .firma-box {
                    border: 1px solid #000;
                    width: 200px;
                    height: 100px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .sello-text {
                    color: #999;
                    font-style: italic;
                }

                .firma-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                .firma-label {
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 5px;
                }

                .firma-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 200px;
                }

                .firma-nombre {
                    width: 100%;
                    text-align: center;
                    border-bottom: 1px solid #000;
                    padding-bottom: 5px;
                    margin-bottom: 10px;
                    min-height: 20px;
                }

                .firma-box {
                    width: 200px;
                    height: 120px;
                    border: 1px solid #000;
                    margin-top: 5px;
                }

                @media print {
                    .arqueo-template {
                        padding: 0;
                    }

                    @page {
                        size: portrait;
                        margin: 2cm;
                    }

                    .firma-box {
                        border: 1px solid #000 !important;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    
                    .firma-nombre {
                        border-bottom: 1px solid #000 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ArqueoTemplate;