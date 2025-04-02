import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    header: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    table: {
        display: 'table',
        width: '100%',
        marginBottom: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        minHeight: 30
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold'
    },
    tableCell: {
        padding: 5,
        fontSize: 10
    },
    date: { width: '15%' },
    summary: { width: '20%' },
    amount: { width: '15%' },
    difference: { width: '15%' },
    observation: { width: '20%' },
    deposit: { width: '15%' }
});

const ControlDiarioTemplate = ({ data, dateRange }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <Text style={styles.title}>
                Control de Recaudación Diaria
            </Text>
            
            <Text style={styles.header}>
                Período: {dateRange.from} al {dateRange.to}
            </Text>

            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.date]}>Fecha</Text>
                <Text style={[styles.tableCell, styles.summary]}>Recaudación</Text>
                <Text style={[styles.tableCell, styles.summary]}>Prevaloradas</Text>
                <Text style={[styles.tableCell, styles.difference]}>Diferencia</Text>
                <Text style={[styles.tableCell, styles.observation]}>Observación</Text>
                <Text style={[styles.tableCell, styles.deposit]}>Depósito</Text>
                <Text style={[styles.tableCell, styles.difference]}>Dif. Depósito</Text>
            </View>

            {/* Table Body */}
            {data.map((row, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.date]}>{row.fecha}</Text>
                    <Text style={[styles.tableCell, styles.summary]}>Bs. {row.total_actas?.toFixed(2)}</Text>
                    <Text style={[styles.tableCell, styles.summary]}>Bs. {row.total_prevaloradas?.toFixed(2)}</Text>
                    <Text style={[styles.tableCell, styles.difference]}>
                        Bs. {(row.total_prevaloradas - row.total_actas)?.toFixed(2)}
                    </Text>
                    <Text style={[styles.tableCell, styles.observation]}>{row.observacion || '-'}</Text>
                    <Text style={[styles.tableCell, styles.deposit]}>
                        Bs. {row.monto_deposito?.toFixed(2) || '0.00'}
                    </Text>
                    <Text style={[styles.tableCell, styles.difference]}>
                        Bs. {(row.total_actas - row.monto_deposito)?.toFixed(2)}
                    </Text>
                </View>
            ))}
        </Page>
    </Document>
);

export default ControlDiarioTemplate;
