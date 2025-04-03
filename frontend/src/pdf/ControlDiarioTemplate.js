import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica'
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center'
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center'
    },
    noData: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 14,
        color: '#888'
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        minHeight: 30,
        fontSize: 9
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold'
    },
    tableCell: {
        padding: 4,
        textAlign: 'left'
    },
    date: { width: '10%' },
    summary: { width: '12%', textAlign: 'right' },
    amount: { width: '8%', textAlign: 'right' },
    difference: { width: '8%', textAlign: 'right' },
    observation: { width: '14%' },
    deposit: { width: '8%', textAlign: 'right' },
    depositNum: { width: '14%' },
    depositantes: { width: '18%' },
    totalRow: {
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        fontSize: 8,
        textAlign: 'center'
    }
});

const ControlDiarioTemplate = ({ data, dateRange }) => {
    const totals = data.reduce((acc, row) => ({
        total_actas: acc.total_actas + parseFloat(row.total_actas || 0),
        total_prevaloradas: acc.total_prevaloradas + parseFloat(row.total_prevaloradas || 0),
        total_efectivo: acc.total_efectivo + parseFloat(row.total_efectivo || 0)
    }), {
        total_actas: 0,
        total_prevaloradas: 0,
        total_efectivo: 0
    });

    const formatCurrency = (value) => {
        return parseFloat(value || 0).toFixed(2);
    };
    
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <Text style={styles.title}>
                    Control de Recaudación Diaria
                </Text>
                
                <Text style={styles.subtitle}>
                    Terminal de Buses
                </Text>
                
                <Text style={styles.header}>
                    Período: {dateRange.from} al {dateRange.to}
                </Text>

                {data.length === 0 ? (
                    <Text style={styles.noData}>No hay datos disponibles para el rango de fechas seleccionado</Text>
                ) : (
                    <>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={[styles.tableCell, styles.date]}>Fecha</Text>
                            <Text style={[styles.tableCell, styles.summary]}>Recaudación</Text>
                            <Text style={[styles.tableCell, styles.summary]}>Prevaloradas</Text>
                            <Text style={[styles.tableCell, styles.difference]}>Diferencia</Text>
                            <Text style={[styles.tableCell, styles.depositNum]}>N° Depósito</Text>
                            <Text style={[styles.tableCell, styles.deposit]}>Depósito</Text>
                            <Text style={[styles.tableCell, styles.difference]}>Dif. Depósito</Text>
                            <Text style={[styles.tableCell, styles.depositantes]}>Depositantes</Text>
                            <Text style={[styles.tableCell, styles.observation]}>Observación</Text>
                        </View>

                        {data.map((row, index) => (
                            <View key={index} style={[
                                styles.tableRow, 
                                Math.abs((row.total_actas || 0) - (row.total_efectivo || 0)) > 0.01 
                                    ? { backgroundColor: '#fff0f0' } 
                                    : {}
                            ]}>
                                <Text style={[styles.tableCell, styles.date]}>{row.fecha}</Text>
                                <Text style={[styles.tableCell, styles.summary]}>Bs. {formatCurrency(row.total_actas)}</Text>
                                <Text style={[styles.tableCell, styles.summary]}>Bs. {formatCurrency(row.total_prevaloradas)}</Text>
                                <Text style={[styles.tableCell, styles.difference]}>
                                    Bs. {formatCurrency(row.total_prevaloradas - row.total_actas)}
                                </Text>
                                <Text style={[styles.tableCell, styles.depositNum]}>
                                    {row.numero_deposito_1 || '-'} 
                                    {row.numero_deposito_2 ? `/ ${row.numero_deposito_2}` : ''}
                                </Text>
                                <Text style={[styles.tableCell, styles.deposit]}>
                                    Bs. {formatCurrency(row.total_efectivo)}
                                </Text>
                                <Text style={[styles.tableCell, styles.difference]}>
                                    Bs. {formatCurrency(row.total_actas - row.total_efectivo)}
                                </Text>
                                <Text style={[styles.tableCell, styles.depositantes]}>
                                    {row.depositantes || '-'}
                                </Text>
                                <Text style={[styles.tableCell, styles.observation]}>
                                    {row.observacion || '-'}
                                </Text>
                            </View>
                        ))}
                        
                        <View style={[styles.tableRow, styles.totalRow]}>
                            <Text style={[styles.tableCell, styles.date]}>TOTALES:</Text>
                            <Text style={[styles.tableCell, styles.summary]}>Bs. {formatCurrency(totals.total_actas)}</Text>
                            <Text style={[styles.tableCell, styles.summary]}>Bs. {formatCurrency(totals.total_prevaloradas)}</Text>
                            <Text style={[styles.tableCell, styles.difference]}>
                                Bs. {formatCurrency(totals.total_prevaloradas - totals.total_actas)}
                            </Text>
                            <Text style={[styles.tableCell, styles.depositNum]}></Text>
                            <Text style={[styles.tableCell, styles.deposit]}>
                                Bs. {formatCurrency(totals.total_efectivo)}
                            </Text>
                            <Text style={[styles.tableCell, styles.difference]}>
                                Bs. {formatCurrency(totals.total_actas - totals.total_efectivo)}
                            </Text>
                            <Text style={[styles.tableCell, styles.depositantes]}></Text>
                            <Text style={[styles.tableCell, styles.observation]}></Text>
                        </View>
                    </>
                )}
                
                <Text style={styles.footer}>
                    Reporte generado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}
                </Text>
            </Page>
        </Document>
    );
};

export default ControlDiarioTemplate;
