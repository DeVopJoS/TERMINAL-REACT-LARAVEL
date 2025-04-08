import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: '#ffffff',
      fontSize: 12,
      size: 'legal'
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
      minHeight: 7,
    },
    operatorLabel: {
      width: '30%',
      padding: 2,
      fontSize: 7,
      borderRight: 1,
      borderColor: '#000000',
    },
    operatorValue: {
      flex: 1,
      padding: 2,
      borderRight: 1,
      borderColor: '#000000',
      fontSize: 7,
    },
    operatorRight: {
      width: '30%',
      padding: 2,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 7,
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
      padding: 2,
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
      minHeight: 7,
    },
    indexCell: {
      width: '10%',
      paddingVertical: 1,
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
      minHeight: 7,
    },
    typeCell: {
      width: '10%',
      paddingVertical: 1,
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
      minHeight: 7,
    },
    dataCell: {
      width: '18%',
      paddingVertical: 1,
      borderRight: 1,
      textAlign: 'center',
      borderColor: '#000000',
      minHeight: 7,
    },
    lastDataCell: {
      width: '18%',
      padding: 1,
      textAlign: 'center',
      minHeight: 7,
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
    signatureContainer: {
      width: '50%',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#000000',
      fontSize: 10,
    },
    signatureHeader: {
      textAlign: 'center',
      borderBottom: 1,
      borderColor: '#000000',
    },
    bodySignature: {
      height: '100px',
      flexDirection: 'row',
      alignItems: 'flex-end'
    },  
    signature: {
      width: '50%',
      fontSize: 8,
      textAlign: 'center',
      margin: 10,
      borderTopWidth: 1,
      borderTopStyle: 'dashed', 
      borderTopColor: '#000', 
      paddingTop: 5,
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
    },
    textSmall: {
      fontSize: 13,
      marginVertical: 0, 
      paddingVertical: 0,
    },
    textSmallT: {
      fontSize: 9,
      marginVertical: 0, 
      paddingVertical: 0,
    },
    errorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#000000',
    },
  });

  const TemplateActa = ({ actas }) => {
    // Función para detectar si el acta incluye "Servicios Higienicos"
    const hasServiciosHigienicos = (detalles) => {
      if (!Array.isArray(detalles) || detalles.length === 0) {
        return false;
      }
      
      const result = detalles.some(detalle => {
        if (!detalle) return false;
        
        const descripcion = detalle.servicio_descripcion ? 
                           detalle.servicio_descripcion.toLowerCase() : '';
        const abreviatura = detalle.servicio_abreviatura ? 
                           detalle.servicio_abreviatura.toLowerCase() : '';
        
        return descripcion.includes('higienico') || 
               descripcion.includes('higiénico') ||
               descripcion.includes('baño') || 
               descripcion.includes('sanitario') ||
               descripcion.includes('servicio hig') ||
               descripcion.includes('s.h.') ||
               abreviatura === 'sh' || 
               abreviatura === 's.h.' ||
               abreviatura.includes('higien') ||
               abreviatura.includes('baño');
      });
      
      return result;
    };

    if (!actas || !Array.isArray(actas)) {
      return (
        <Document>
          <Page size="A3">
            <View style={styles.errorContainer}>
              <Text>Error: No hay datos para mostrar</Text>
            </View>
          </Page>
        </Document>
      );
    }

    return (
      <Document>
        {actas.map((acta, index) => {
          if (!acta || !acta.cabecera || !acta.detalles) {
            return null;
          }

          const { cabecera, detalles } = acta;
          
          // Verificar si este acta específica tiene servicios higiénicos
          const hasSH = hasServiciosHigienicos(detalles);
          
          if (!Array.isArray(cabecera) || cabecera.length === 0) {
            return null;
          }

          if (!Array.isArray(detalles)) {
            return null;
          }

          // Validar campos requeridos en cabecera
          const requiredFields = [
            'puntorecaud_nombre',
            'formatted_fecha',
            'ae_grupo',
            'ae_operador1erturno',
            'ae_operador2doturno'
          ];

          const missingFields = requiredFields.filter(field => !cabecera[0][field]);
          if (missingFields.length > 0) {
            return null;
          }

          // Lógica para la primera tabla (First Operator)
          const totalFilasFirstOperator = 28;
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
          const filasSecondTable = Array.from({ length: 45 }, (_, i) => i + 1);
  
          return (
              <Page size="A3" style={styles.page} key={index}>
                  {/* Cabecera */}
                  <View style={styles.headerContainer}>
                      <View style={styles.headerLeft}>
                      <Image src="/images/logoplanilla.png" style={{ width: '100%', height: 'auto' }} />
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
                          <Text>{cabecera[0]?.formatted_fecha}</Text>
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
                            <Text>{cabecera[0]?.ae_operador1erturno}</Text>
                        </View>
                        <View style={styles.operatorRight}>
                        </View>
                      </View>
                  
                      <View style={styles.operatorRow}>
                      <View style={styles.operatorLabel}>
                          <Text>OPERADOR(A) TURNO 2:</Text>
                      </View>
                      <View style={styles.operatorValue}>
                          <Text>{cabecera[0].ae_operador2doturno}</Text>
                      </View>
                      <View style={styles.operatorRight}>
                         
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
                      <View style={[styles.signatureHeader, styles.boldText]}>
                        <Text> ENTREGA DE PREVALORADAS (DE CAJERO A OPERADOR 1ER TURNO)</Text>
                      </View>
                      <View style={styles.bodySignature}>
                        <View style={styles.signature}>
                          <Text>ENTREGUE CONFORME - Operador de 1er turno firma</Text>
                        </View>
                        <View style={styles.signature}>
                          <Text>ENTREGUE CONFORME - Operador de 1er turno firma</Text>
                        </View>
                      </View>
              
                      <View style={styles.sectionHeader}>
                      <Text>RESPONSABLE - OPERADOR 1ER TURNO</Text>
                      </View>
                      <View style={styles.tableRow}>
                      <Text>PUESTOS SEGÚN TIPO DE PREVALORADA:</Text>
                      </View>
              
                      <View style={styles.tableHeader}>
                      <View style={styles.columnHeader}>
                          <Text>Nº</Text>
                      </View>
                      <View style={styles.columnHeader}>
                          <Text style={styles.textSmallT}>TIPO DE PRE</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text style={styles.redText}>A</Text>
                          <Text style={[styles.redText, styles.textSmallT]}>DESDE EL NÚMERO:</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>B</Text>
                          <Text style={styles.textSmallT}>HASTA EL NÚMERO:</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>C</Text>
                          <Text style={styles.textSmallT}>VENDIDO HASTA EL:</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>D</Text>
                          <Text style={styles.textSmallT}>CANTIDAD (C-A+1)</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>E</Text>
                          <Text style={styles.textSmallT}>IMPORTE Bs.- (D*COST)</Text>
                      </View>
                      </View>
                      
                      {/* Filas de la tabla con datos */}
                      {filasCompletasFirstOperator.map((item, idx) => (
                      <View key={idx} style={styles.tableRow}>
                          <View style={styles.indexCell}>
                          <Text style={styles.textSmall}>{idx + 1}</Text>
                          </View>
                          <View style={styles.typeCell}>
                          <Text style={styles.textSmall}>{item.servicio_abreviatura}</Text> 
                          </View>
                          <View style={[styles.dataCell, 
                          (item.aed_hastanumero - item.aed_desdenumero) < 99 ? styles.redCell : null]}>
                          <Text style={styles.textSmall}>{item.aed_desdenumero}</Text>
                          </View>
                          <View style={styles.dataCell}>
                          <Text style={styles.textSmall}>{item.aed_hastanumero}</Text>
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
                      {hasSH ? (
                        <View>
                          <View style={styles.tableRow}>
                            <View style={[styles.sectionHeader, { width: '100%', textAlign: 'center' }]}>
                              <Text>ENTREGA DE PHS DE CAJERO A OPERADOR 1ER TURNO</Text>
                            </View>
                          </View>
                          
                          <View style={styles.tableRow}>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>PAQUETE</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para PAQUETE */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>UNIDADES DE PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para UNIDADES */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>TOTAL PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '14%', minHeight: '20px' }]}>
                              {/* Campo vacío para TOTAL */}
                            </View>
                          </View>
                          
                          <View style={styles.tableRow}>
                            <View style={[styles.sectionHeader, { width: '100%', textAlign: 'center' }]}>
                              <Text>ENTREGA DE PHS SOBRANTE D 1ER TURNO A 2DO TURNO</Text>
                            </View>
                          </View>
                          
                          <View style={styles.tableRow}>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>PAQUETE</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para PAQUETE */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>UNIDADES DE PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para UNIDADES */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>TOTAL PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '14%', minHeight: '20px' }]}>
                              {/* Campo vacío para TOTAL */}
                            </View>
                          </View>
                        </View>
                      ) : (
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
                      )}
              
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
                          <Text style={styles.textSmallT}>TIPO DE PRE</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>A</Text>
                          <Text style={styles.textSmallT}>DESDE EL NÚMERO:</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>B</Text>
                          <Text style={styles.textSmallT}>HASTA EL NÚMERO:</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>C</Text>
                          <Text style={styles.textSmallT}>VENDIDO HASTA EL:</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>D</Text>
                          <Text style={styles.textSmallT}>CANTIDAD (C-A+1)</Text>
                      </View>
                      <View style={styles.dataColumn}>
                          <Text>E</Text>
                          <Text style={styles.textSmallT}>IMPORTE Bs.- (D*COST)</Text>
                      </View>
                      </View>
                      
                      {/* Filas de la tabla */}
                      {filasSecondTable.map((i) => (
                      <View key={i} style={styles.tableRow}>
                          <View style={styles.indexCell}>
                          <Text style={styles.textSmall}>{i}</Text>
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
                      {hasSH ? (
                        <View>
                          <View style={styles.tableRow}>
                            <View style={[styles.sectionHeader, { width: '100%', textAlign: 'center' }]}>
                              <Text>ENTREGA DE PHS DE CAJERO A OPERADOR 2DO TURNO</Text>
                            </View>
                          </View>
                          
                          <View style={styles.tableRow}>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>PAQUETE</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para PAQUETE */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>UNIDADES DE PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para UNIDADES */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>TOTAL PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '14%', minHeight: '20px' }]}>
                              {/* Campo vacío para TOTAL */}
                            </View>
                          </View>
                          
                          <View style={styles.tableRow}>
                            <View style={[styles.sectionHeader, { width: '100%', textAlign: 'center' }]}>
                              <Text>DEVOLUCION DE PHS SOBRANTES A CAJA</Text>
                            </View>
                          </View>
                          
                          <View style={styles.tableRow}>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>PAQUETE</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para PAQUETE */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>UNIDADES DE PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '13%', minHeight: '20px' }]}>
                              {/* Campo vacío para UNIDADES */}
                            </View>
                            <View style={[styles.columnHeader, { width: '20%' }]}>
                              <Text>TOTAL PHS</Text>
                            </View>
                            <View style={[styles.dataCell, { width: '14%', minHeight: '20px' }]}>
                              {/* Campo vacío para TOTAL */}
                            </View>
                          </View>
                        </View>
                      ) : (
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
                      )}
              
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
                  <View style={styles.tablesRow}>
                    <View style={styles.signatureContainer}>
                      <View style={[styles.signatureHeader, styles.boldText]}>
                        <Text> FIRMA DE PREVALORADAS (DE OPERADOR 1ER TURNO A OPERADOR)</Text>
                      </View>
                      <View style={styles.bodySignature}>
                        <View style={styles.signature}>
                          <Text>ENTREGUE CONFORME - Operador de 1er turno firma</Text>
                        </View>
                        <View style={styles.signature}>
                          <Text>ENTREGUE CONFORME - Operador de 1er turno firma</Text>
                        </View>
                      </View>
                    </View>
            
                    <View style={styles.signatureContainer}>
                      <View style={[styles.signatureHeader, styles.boldText]}>
                        <Text> FIRMA DE PREVALORADAS (DE OPERADOR 1ER TURNO A OPERADOR)</Text>
                      </View>
                      <View style={styles.bodySignature}>
                        <View style={styles.signature}>
                          <Text>ENTREGUE CONFORME - Operador de 1er turno firma</Text>
                        </View>
                        <View style={styles.signature}>
                          <Text>ENTREGUE CONFORME - Operador de 1er turno firma</Text>
                        </View>
                      </View>
                    </View>
                  </View>
              </Page>
          );
        })}
      </Document>
    );
  };

export default TemplateActa;