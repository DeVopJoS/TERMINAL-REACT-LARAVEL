import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: '#ffffff',
      fontSize: 12
    },
    headerContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#000000',
      fontSize: 10,
    },
    headerLeft: {
      width: '20%',
      borderRight: 1,
      padding: 5,
      borderColor: '#000000',
    },
    headerRight: {
      flex: 1,
      padding: 5,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subHeader: {
      flexDirection: 'row',
      borderWidth: 1,
      borderTop: 0,
      borderColor: '#000000',
    },
    subHeaderLeft: {
      width: '20%',
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
      fontSize: 8
    },
    subHeaderRight: {
      flex: 1,
      padding: 5,
    },
    dateRow: {
      flexDirection: 'row',
      borderWidth: 1,
      borderTop: 0,
      borderColor: '#000000',
    },
    dateTitle: {
        width: '20%',
        borderRight:1,
        borderColor: '#000000'
    },
    dateCell: {
      width: '50%',
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
    },
    groupCell: {
      flex: 1,
      padding: 5,
    },
    operatorRow: {
      flexDirection: 'row',
      borderWidth: 1,
      borderTop: 0,
      borderColor: '#000000',
    },
    operatorLabel: {
      width: '30%',
      padding: 5,
      fontSize: 12,
      borderRight: 1,
      borderColor: '#000000',
    },
    operatorValue: {
      flex: 1,
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
    },
    operatorRight: {
      width: '30%',
      padding: 5,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    amountRow: {
      flexDirection: 'row',
      borderWidth: 1,
      borderTop: 0,
      borderColor: '#000000',
    },
    amountSection: {
      width: '20%',
      padding: 5,
      borderRight: 1,
      fontSize: 8,
      borderColor: '#000000',
    },
    amountValue: {
      width: '15%',
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
    },
    otherLabel: {
      width: '15%',
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
    },
    otherValue: {
      width: '15%',
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
    },
    keysLabel: {
      width: '15%',
      padding: 5,
      borderRight: 1,
      borderColor: '#000000',
    },
    keysValue: {
      flex: 1,
      padding: 5,
    },
    disclaimerRow: {
      borderWidth: 1,
      borderTop: 0,
      padding: 5,
      fontSize: 8,
      borderColor: '#000000',
    },
    entregaHeader: {
      borderWidth: 1,
      borderTop: 0,
      padding: 5,
      fontWeight: 'bold',
      borderColor: '#000000',
    },
    tablesRow: {
      flexDirection: 'row',
      width: '100%',
    },
    tableContainer: {
      width: '50%',
      marginTop: 10,
    },
    sectionHeader: {
      backgroundColor: '#f2f2f2',
      padding: 5,
      fontWeight: 'bold',
      borderWidth: 1,
      borderColor: '#000000',
    },
    tableHeader: {
      flexDirection: 'row',
      borderWidth: 1,
      borderTop: 0,
      borderColor: '#000000',
    },
    columnHeader: {
      width: '10%',
      padding: 5,
      borderRight: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
      borderColor: '#000000',
    },
    dataColumn: {
      width: '18%',
      padding: 5,
      borderRight: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
      borderColor: '#000000'
    },
    lastColumn: {
      width: '18%',
      padding: 5,
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
    },
    tableRow: {
      flexDirection: 'row',
      borderWidth: 1,
      borderTop: 0,
      borderColor: '#000000',
    },
    indexCell: {
      width: '10%',
      padding: 5,
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
    },
    typeCell: {
      width: '10%',
      padding: 5,
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
    },
    dataCell: {
      width: '18%',
      padding: 5,
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
    },
    lastDataCell: {
      width: '18%',
      padding: 5,
      textAlign: 'center',
    },
    redCell: {
      backgroundColor: '#ffcccc',
    },
    blueCell: {
      backgroundColor: '#ccf',
    },
    CellInformatioIndex: {
      width: '40%',
      fontWeight: 'bold',
      borderColor: '#000000',
    },
    headerCellInformation: {
      width: '20%',
      borderWidth: 1,
      borderTop: 0,
      padding: 5,
      fontWeight: 'bold',
      borderColor: '#000000',
    },
    headerCellInfoLast: {
      width: '20%',
      borderTop: 0,
      padding: 5,
      fontWeight: 'bold',
      borderColor: '#000000',
    },
    informationFirst: {
      width: '20%',
      borderRight: 1,
      borderColor: '#000000',
    },
    informationSecond: {
      width: '80%',
      fontSize: 8,
      borderColor: '#000000',
    },
    dataInformationCellIndex: {
      width: '40%'
    },
    dataInformationCell: {
      width: '20%', 
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
    },
    infractionCell: {
      width: '60%',
      borderRight: 1,
    },
    totalRecaudation: {
      width: '80%',
      borderRight: 1,

    },
    observationTitle: {
      width: '24%',
    },
    signatureRow: {
      flexDirection: 'row',
      marginTop: 20,
      borderTopWidth: 1,
      borderTopStyle: 'dotted',
      borderColor: '#000000',
    },
    signatureColumn: {
      width: '50%',
      padding: 10,
      textAlign: 'center',
    },
    redText: {
      color: '#cc0000',
    },
    blueText: {
      color: '#0000cc',
    },
    boldText: {
      fontWeight: 'bold',
    },
    centerText: {
      textAlign: 'center',
    }
  });

  const TemplateActa = ({ actas }) => (
    <Document>
      {actas.map((acta, index) => {
        const { cabecera, detalles } = acta;
  
        // Lógica para la primera tabla (First Operator)
        const totalFilasFirstOperator = 20;
        const filasCompletasFirstOperator = Array.from({ length: totalFilasFirstOperator }).map((_, i) => {
          const rowNumber = i + 1;
          return detalles[i] || { index: rowNumber };
        });
  
        // Lógica para detalles únicos
        const uniqueDetalles = detalles.reduce((acc, item) => {
          if (!acc.some((el) => el.servicio_id === item.servicio_id)) {
            acc.push(item);
          }
          return acc;
        }, []);
  
        // Lógica para la segunda tabla
        const filasSecondTable = Array.from({ length: 32 }, (_, i) => i + 1);
  
        return (
            <Page size="A3" style={styles.page} key={index}>
                {/* Cabecera */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                    <Text>LOGO</Text>
                    </View>
                    <View style={styles.headerRight}>
                    <Text>ENTIDAD DESCENTRALIZADA TERMINAL METROPOLITANA EL ALTO - ACTA DE ENTREGA</Text>
                    </View>
                </View>
        
                <View style={styles.tablesRow}>
                    {/* Tabla para operador 1er turno */}
                    <View style={styles.tableContainer}>
                    {/* Subcabecera */}
                    <View style={styles.subHeader}>
                    <View style={styles.subHeaderLeft}>
                        <Text>PUNTO DE RECAUDACIÓN:</Text>
                    </View>
                    <View style={styles.subHeaderRight}>
                        <Text style={[styles.centerText, styles.boldText]}>{cabecera[0]?.puntorecaud_nombre}</Text>
                    </View>
                    </View>
                
                    {/* Fila de fecha y grupo */}
                    <View style={styles.dateRow}>
                    <View style={styles.dateTitle}>
                        <Text>Fecha:</Text>
                    </View>
                    <View style={styles.dateCell}>
                        <Text>{cabecera[0]?.ae_fecha}</Text>
                    </View>
                    <View style={styles.groupCell}>
                        <Text>GRUPO: {cabecera[0]?.ae_grupo}</Text>
                    </View>
                    </View>
                
                    {/* Filas de operadores */}
                    <View style={styles.operatorRow}>
                    <View style={styles.operatorLabel}>
                        <Text>OPERADOR(A) TURNO 1:</Text>
                    </View>
                    <View style={styles.operatorValue}>
                        <Text></Text>
                    </View>
                    <View style={styles.operatorRight}>
                        <Text>OPERADOR(A) TURNO 2:</Text>
                    </View>
                    </View>
                
                    <View style={styles.operatorRow}>
                    <View style={styles.operatorLabel}>
                        <Text>OPERADOR(A) 2ᴰᴼ TURNO:</Text>
                    </View>
                    <View style={styles.operatorValue}>
                        <Text></Text>
                    </View>
                    <View style={styles.operatorRight}>
                        <Text>Nº</Text>
                    </View>
                    </View>
                
                    {/* Fila de montos */}
                    <View style={styles.amountRow}>
                    <View style={[styles.amountSection, styles.boldText]}>
                        <Text>CAMBIO Bs:</Text>
                    </View>
                    <View style={styles.amountSection}>
                        <Text>{cabecera[0]?.ae_cambiobs}</Text>
                    </View>
                    <View style={[styles.amountSection, styles.boldText]}>
                        <Text>CAJA CHICA Bs:</Text>
                    </View>
                    <View style={styles.amountSection}>
                        <Text>{cabecera[0]?.ae_cajachicabs}</Text>
                    </View>
                    <View style={[styles.amountSection, styles.boldText]}>
                        <Text>LLAVES:</Text>
                    </View>
                    <View style={styles.amountSection}>
                        <Text>{cabecera[0]?.ae_llaves}</Text>
                    </View>
                    </View>
        
                    {/* Más filas de datos similares */}
                    <View style={styles.amountRow}>
                    <View style={[styles.amountSection, styles.boldText]}>
                        <Text>FECHERO:</Text>
                    </View>
                    <View style={styles.amountSection}>
                        <Text>{cabecera[0]?.ae_fechero}</Text>
                    </View>
                    <View style={[styles.amountSection, styles.boldText]}>
                        <Text>TAMPO:</Text>
                    </View>
                    <View style={styles.amountSection}>
                        <Text>{cabecera[0]?.ae_tampo}</Text>
                    </View>
                    <View style={[styles.amountSection, styles.boldText]}>
                        <Text>CANDADOS:</Text>
                    </View>
                    <View style={styles.amountSection}>
                        <Text>{cabecera[0]?.ae_candados}</Text>
                    </View>
                    </View>
                
                    {/* Disclaimer */}
                    <View style={styles.disclaimerRow}>
                    <Text>Mediante esta Acta queda establecido toda la responsabilidad de los talionarios de facturación de cada uso de servicios, entregado al grupo de turno a la cabeza del supervisor siendo ellos los principales responsables por cualquier daño, extravío de las mismas una vez firmada el acta hasta su retorno.</Text>
                    </View>
        
                    {/* Cabecera de entrega */}
                    <View style={styles.entregaHeader}>
                    <Text>ENTREGA DE PREVALORADAS (DE CAJERO A OPERADOR 1ER TURNO)</Text>
                    </View>
        
                    <View style={styles.sectionHeader}>
                    <Text>RESPONSABLE - OPERADOR 1ER TURNO</Text>
                    </View>
                    <View style={styles.tableRow}>
                    <Text>PUESTOS SEGÚN TIPO DE PREVALORADA: UTP =2,50 - GE = 0,00 - PV =4,00</Text>
                    </View>
        
                    <View style={styles.tableHeader}>
                    <View style={styles.columnHeader}>
                        <Text></Text>
                    </View>
                    <View style={styles.columnHeader}>
                        <Text>TIPO DE PRE</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text style={styles.redText}>A</Text>
                        <Text style={styles.redText}>DESDE EL NÚMERO:</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>B</Text>
                        <Text>HASTA EL NÚMERO:</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>C</Text>
                        <Text>VENDIDO HASTA EL:</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>D</Text>
                        <Text>CANTIDAD (C-A+1)</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>E</Text>
                        <Text>IMPORTE Bs.- (D*COST)</Text>
                    </View>
                    </View>
                    
                    {/* Filas de la tabla con datos */}
                    {filasCompletasFirstOperator.map((item, idx) => (
                    <View key={idx} style={styles.tableRow}>
                        <View style={styles.indexCell}>
                        <Text>{idx + 1}</Text>
                        </View>
                        <View style={styles.typeCell}>
                        <Text>{item.servicio_abreviatura}</Text> 
                        </View>
                        <View style={[styles.dataCell, 
                        (item.aed_hastanumero - item.aed_desdenumero) < 99 ? styles.redCell : null]}>
                        <Text style={styles.blueText}>{item.aed_desdenumero}</Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text style={styles.blueText}>{item.aed_hastanumero}</Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.lastDataCell}>
                        <Text></Text>
                        </View>
                    </View>
                    ))}
        
                    {/* TIPO DE PRE VALORADA SECTION */}
                    <View style={styles.tableRow}>
                    <View style={styles.CellInformatioIndex}>
                        <Text>TIPO DE PREVALORADA:</Text>
                    </View>
                    <View style={styles.headerCellInformation}>
                        <Text>COSTO:</Text>
                    </View>
                    <View style={[styles.headerCellInformation]}>
                        <Text>CANTIDAD:</Text>
                    </View>
                    <View style={styles.headerCellInfoLast}>
                        <Text>APORTE Bs:</Text>
                    </View>
                    </View>
        
                    {uniqueDetalles.map((item) => (
                    <View key={item.index} style={styles.tableRow}>
                        <View style={[styles.tableRow,styles.CellInformatioIndex]}>
                        <View style={styles.informationFirst}>
                            <Text>{item.servicio_abreviatura}</Text>
                        </View>
                        <View style={styles.informationSecond}>
                            <Text>{item.servicio_descripcion}</Text>
                        </View>
                        </View>
                        <View style={styles.dataInformationCell}>
                        <Text>Bs.  {item.aed_preciounitario}</Text>
                        </View>
                        <View style={styles.dataInformationCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.headerCellInfoLast}>
                        <Text></Text>
                        </View>
                    </View>
                    ))}
                    
                    {/* INFRACCIONES */}
                    <View style={styles.tableRow}>
                    <View style={[styles.tableRow,styles.CellInformatioIndex]}>
                        <View style={styles.infractionCell}>
                        <Text>Infracciones</Text>
                        </View>
                        <View>
                        <Text></Text>
                        </View>
                    </View>
                    <View style={styles.dataInformationCell}>
                        <Text></Text>
                    </View>
                    <View style={styles.dataInformationCell}>
                        <Text></Text>
                    </View>
                    <View style={styles.headerCellInfoLast}>
                        <Text></Text>
                    </View>
                    </View>
        
                    {/* RECAUDACIÓN TOTAL */}
                    <View style={styles.tableRow}>
                    <View style={[styles.totalRecaudation, styles.boldText, styles.centerText]}>
                        <Text>1er TURNO - RECAUDACIÓN TOTAL Bs:</Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    </View>
        
                    {/* OBSERVACIÓN */}
                    <View style={styles.tableRow}>
                    <View style={[styles.observationTitle, styles.boldText]}>
                        <Text>OBSERVACIÓN:</Text>
                    </View>
                    <View>
                        <Text>PRUEBA OBSERVACIÓN</Text>
                    </View>
                    </View>
                </View>
                
                {/* Tabla para operador 2do turno */}
                <View style={styles.tableContainer}>
                    <View style={styles.sectionHeader}>
                    <Text>RESPONSABLE - OPERADOR 2DO TURNO</Text>
                    </View>
        
                    <View style={styles.tableHeader}>
                    <View style={styles.columnHeader}>
                        <Text>TIPO DE PRE</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>A</Text>
                        <Text style={styles.textSmall}>DESDE EL NÚMERO:</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>B</Text>
                        <Text style={styles.textSmall}>HASTA EL NÚMERO:</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>C</Text>
                        <Text style={styles.textSmall}>VENDIDO HASTA EL:</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>D</Text>
                        <Text style={styles.textSmall}>CANTIDAD (C-A+1)</Text>
                    </View>
                    <View style={styles.dataColumn}>
                        <Text>E</Text>
                        <Text>IMPORTE Bs.- (D*COST)</Text>
                    </View>
                    </View>
                    
                    {/* Filas de la tabla */}
                    {filasSecondTable.map((i) => (
                    <View key={i} style={styles.tableRow}>
                        <View style={styles.indexCell}>
                        <Text>{i}</Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.dataCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.lastDataCell}>
                        <Text></Text>
                        </View>
                    </View>
                    ))}
        
                    {/* TIPO DE PRE VALORADA SECTION */}
                    <View style={styles.tableRow}>
                    <View style={styles.CellInformatioIndex}>
                        <Text>TIPO DE PREVALORADA:</Text>
                    </View>
                    <View style={styles.headerCellInformation}>
                        <Text>COSTO:</Text>
                    </View>
                    <View style={[styles.headerCellInformation]}>
                        <Text>CANTIDAD:</Text>
                    </View>
                    <View style={styles.headerCellInfoLast}>
                        <Text>APORTE Bs:</Text>
                    </View>
                    </View>
        
                    {uniqueDetalles.map((item) => (
                    <View key={item.index} style={styles.tableRow}>
                        <View style={[styles.tableRow,styles.CellInformatioIndex]}>
                        <View style={styles.informationFirst}>
                            <Text>{item.servicio_abreviatura}</Text>
                        </View>
                        <View style={styles.informationSecond}>
                            <Text>{item.servicio_descripcion}</Text>
                        </View>
                        </View>
                        <View style={styles.dataInformationCell}>
                        <Text>Bs.  {item.aed_preciounitario}</Text>
                        </View>
                        <View style={styles.dataInformationCell}>
                        <Text></Text>
                        </View>
                        <View style={styles.headerCellInfoLast}>
                        <Text></Text>
                        </View>
                    </View>
                    ))}
                    
                    {/* INFRACCIONES */}
                    <View style={styles.tableRow}>
                    <View style={[styles.tableRow,styles.CellInformatioIndex]}>
                        <View style={styles.infractionCell}>
                        <Text>Infracciones</Text>
                        </View>
                        <View>
                        <Text></Text>
                        </View>
                    </View>
                    <View style={styles.dataInformationCell}>
                        <Text></Text>
                    </View>
                    <View style={styles.dataInformationCell}>
                        <Text></Text>
                    </View>
                    <View style={styles.dataInformationCell}>
                        <Text></Text>
                    </View>
                    </View>
        
                    {/* RECAUDACIÓN TOTAL */}
                    <View style={styles.tableRow}>
                    <View style={[styles.totalRecaudation, styles.boldText, styles.centerText]}>
                        <Text>2do TURNO - RECAUDACIÓN TOTAL Bs:</Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    </View>
        
                    {/* OBSERVACIÓN */}
                    <View style={styles.tableRow}>
                    <View style={[styles.observationTitle, styles.boldText]}>
                        <Text>OBSERVACIÓN:</Text>
                    </View>
                    <View>
                        <Text>PRUEBA OBSERVACIÓN</Text>
                    </View>
                    </View>
                </View>
                </View>
                
                {/* Firmas */}
                <View style={styles.signatureRow}>
                <View style={styles.signatureColumn}>
                    <Text>ENTREGUE CONFORME - Cajero de turno - firma y sello</Text>
                </View>
                <View style={styles.signatureColumn}>
                    <Text>RECIBI CONFORME - Operador de 1ᴱᴿ turno - firma y sello</Text>
                </View>
                </View>
            </Page>
        );
      })}
    </Document>
  );

export default TemplateActa;