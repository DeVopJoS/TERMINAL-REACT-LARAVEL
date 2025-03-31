import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import DialogAddDetalle from './DialogAddDetalle'
import axios from 'axios';

function PrevaloradasEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useRef(null);

  const [ actaCab, setActaCab ] = useState();
  const [ prevaloradas, setPrevaloradas ] = useState();

  const [ dialogAdd, setDialogAdd ] = useState(false);
  const [ dialogQuantity, setDialogQuantity ] = useState(false);
  const [ dataQuantity, setDataQuantity ] = useState();
  const [ quantity, setQuantity ] = useState();

  const [ loading, setLoading ] = useState(false);
  const [ globalFilter, setGlobalFilter ] = useState("");

  useEffect(() => {
    fetchDataDet();
  }, [])

  const fetchDataDet = async () => {
    setLoading(true);
    try{

      const [actaCab, actaDet] = await Promise.all([
          axios.get(`actas/index/ae_actaid/${id}`),  
          axios.get(`tblactaentregadet/index/ae_actaid/${id}`) 
      ]);

      const { data: cabecera } = actaCab;
      const { data: { records } } = actaDet;
      setActaCab(cabecera[0])
      
      const updatedRecords = records.map(item => ({
          ...item,
          aprobado: false,
          rechazado: false
      }));

      setPrevaloradas(updatedRecords);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleCheckboxChange = (rowData, field) => {
      const updatedActas = prevaloradas.map(acta => {
          if (acta.aed_actaid === rowData.aed_actaid) {
          const vendido = ( field === 'aprobado') ? rowData.aed_hastanumero : rowData.aed_desdenumero;
          return {
              ...acta,
              aed_vendidohasta: vendido,
              aprobado: field === 'aprobado' ? !acta.aprobado : false,
              rechazado: field === 'rechazado' ? !acta.rechazado : false
          };
          }
          return acta;
      });
      setPrevaloradas(updatedActas);
  };

  const rowClassName = (rowData) => {
    if(rowData.aed_vendidohasta < rowData.aed_hastanumero && rowData.aed_vendidohasta > rowData.aed_desdenumero) return 'row-warning';
    if(rowData.aed_vendidohasta === rowData.aed_hastanumero) return 'row-aprobada';
    if(rowData.aed_vendidohasta === rowData.aed_desdenumero) return 'row-rechazada';
    return '';
  };

  const fillDialogQuantity = (rowData) => {
      setDialogQuantity(true);
      setDataQuantity( rowData );
      setQuantity(rowData.aed_desdenumero);
  }

  const updateQuantity = () => {
      setDialogQuantity(false);
      
      const updatedActas = prevaloradas.map(acta => {
          if (acta.aed_actaid === dataQuantity.aed_actaid) {
          return {
              ...acta,
              aed_vendidohasta: quantity,
              aprobado: false,
              rechazado: false
          };
          }
          return acta;
      });  
      
      setPrevaloradas(updatedActas);
  }

  const items = [
      {
          label: 'Add',
          icon: 'pi pi-file',
          command: () => setDialogAdd(true)
      },
      {
        label: 'Add',
        icon: 'pi pi-lock',
        command: () => cerrarActa()
    },
  ];

  const cerrarActa = () => {
    const sendActa = async () => {
      try{
          const {status} = await axios.post('/tblactaentregadet/finalizar', prevaloradas);
          
          if(status == 200){
              toast.current.show({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Acta cerrada exitosamente.",
                  life: 3000,
              });
          }
          setTimeout(() => {
            navigate('/cajas/registro/prevaloradas');
          }, 3500);
      } catch(error){
        console.error('error: ', error)
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo cerrar el acta: " + (error),
            life: 3000,
        });
      }
    }
    confirmDialog({
        message: `¿Esta séguro de cerrar el acta? esta acción no se podra revertir.`,
        header: "Confirmación",
        icon: "pi pi-exclamation-triangle",
        accept: () => sendActa(),
    });
  }

  const vendidoBodyTemplate = (rowData) => {
      return (
          <Checkbox 
          checked={rowData.aprobado} 
          onChange={() => handleCheckboxChange(rowData, 'aprobado')}
          />
      );
  };

  const devolucionBodyTemplate = (rowData) => {
      return (
          <Checkbox 
          checked={rowData.rechazado} 
          onChange={() => handleCheckboxChange(rowData, 'rechazado')}
          />
      );
  };

  const actionTemplate = (rowData) => {
      return (
          <div className="flex gap-2">
          <Button
              icon="pi pi-pencil"
              className="p-button-success p-button-sm"
              onClick={ () => fillDialogQuantity(rowData) }
          />
          </div>
      );
  };

  return (
    <>
      <Toast ref={toast} />
      <div className='card'>
        <h5 className="text-black">Detalle</h5>

        <div className="grid mb-3">
          <div className="col-12 md:col-3">
            <label htmlFor="punto_recaudacion" className="block">Punto de Recaudación</label>
            <InputText
              id='punto_recaudacion'
              className="w-full"
              value={actaCab?.punto_recaudacion.puntorecaud_nombre}
              disabled
            />           
          </div>
          <div className="col-12 md:col-3">
            <label htmlFor="ae_operador1erturno" className="block">Operador 1er. Turno</label>
            <InputText
              className="w-full"
              id='ae_operador1erturno'
              value={actaCab?.ae_operador1erturno}
              disabled
            />           
          </div>
          <div className="col-12 md:col-3">
            <label htmlFor="ae_operador2doturno" className="block">Operador 2do. Turno</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_operador2doturno}
              disabled
              id='ae_operador2doturno'
            />           
          </div>
          <div className="col-12 md:col-3">
            <label htmlFor="ae_fecha" className="block">Fecha</label>
            <InputText
              className="w-full"
              id='ae_fecha'
              value={actaCab?.ae_fecha}
              disabled
            />           
          </div>
        </div>

        <div className="grid mb-3">
          <div className="col-6 md:col-2">
            <label htmlFor="ae_cambiobs" className="block">Cambio Bs.</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_cambiobs}
              id="ae_cambiobs"
              disabled
            />           
          </div>
          <div className="col-6 md:col-2">
            <label htmlFor="ae_grupo" className="block">Grupo</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_grupo}
              id="ae_grupo"
              disabled
            />           
          </div>
          <div className="col-6 md:col-2">
            <label htmlFor="ae_cajachicabs" className="block">cajachica</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_cajachicabs}
              id="ae_cajachicabs"
              disabled
            />           
          </div>
          <div className="col-6 md:col-2">
            <label htmlFor="ae_llaves" className="block">llaves</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_llaves}
              id="ae_llaves"
              disabled
            />           
          </div>
          <div className="col-6 md:col-2">
            <label htmlFor="ae_tampo" className="block">Tampo</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_tampo}
              id="ae_tampo"
              disabled
            />           
          </div>
          <div className="col-6 md:col-2">
            <label htmlFor="ae_candados" className="block">Candados</label>
            <InputText
              className="w-full"
              value={actaCab?.ae_candados}
              id="ae_candados"
              disabled
            />           
          </div>
        </div>

        <Divider/>
        <div className="flex justify-content-end mb-2 mr-2">
            <InputText 
                value={globalFilter} 
                onChange={(e) => setGlobalFilter(e.target.value)} 
                placeholder="Buscar..."
                className="p-inputtext-sm md:w-50"
            />
        </div>
        <DataTable 
          loading={loading} 
          rowClassName={rowClassName} 
          value={prevaloradas} 
          paginator 
          rows={10} 
          rowsPerPageOptions={[10, 25, 50]}
          filters={{ global: { value: globalFilter, matchMode: "contains" } }}
          globalFilterFields={[
              "servicio.servicio_id",
              "servicio.servicio_descripcion",
              "aed_desdenumero",
              "aed_hastanumero",
              "aed_cantidad",
              "aed_vendidohasta",
              "aed_preciounitario",
              "aed_importebs",
          ]}
          >
          <Column field="servicio.servicio_id" header="TIPO SERVICIO" sortable></Column>
          <Column field="servicio.servicio_descripcion" header="SERVICIO DESCRIPCION" sortable></Column>
          <Column field="aed_desdenumero" header="DESDE NUMERO" sortable></Column>
          <Column field="aed_hastanumero" header="HASTA NUMERO" sortable></Column>
          <Column field="aed_cantidad" header="CANTIDAD" sortable></Column>
          <Column field="aed_vendidohasta" header="VENDIDO HASTA" sortable></Column>
          <Column field="aed_preciounitario" header="PRECIO UNITARIO" sortable></Column>
          <Column field="aed_importebs" header="IMPORTE" sortable></Column>
          <Column header="VENDIDO" body={vendidoBodyTemplate} style={{ textAlign: 'center' }}/>
          <Column header="DEVOLUCIÓN" body={devolucionBodyTemplate} style={{ textAlign: 'center' }}/>
          <Column body={actionTemplate} header="" className="text-xs py-1 px-2"/>
        </DataTable>
      </div>

      <SpeedDial model={items} direction="up" buttonIcon="pi pi-cog" style={{ position: "fixed", bottom: "20px", right: "20px" }} buttonClassName="p-button-primary" />

      { dialogQuantity && (
          <Dialog header="Detalle pre-valorada" visible={dialogQuantity} onHide={() => setDialogQuantity(false)} style={{ width: '50vw' }}>
              
              <input type='hidden' id='aed_actaid' name='aed_actaid' value={dataQuantity?.aed_actaid}/>

              <div className="grid p-fluid mb-2">
                  <div className="col-12 md:col-4 mt-5">
                      <div className="p-inputgroup">
                          <span className="p-inputgroup-addon">
                              <i className="pi pi-eye"></i>
                          </span>
                          <span className="p-float-label">
                              <InputText id='servicio_descripcion' value={dataQuantity?.servicio.servicio_descripcion} disabled/>
                          <label htmlFor='servicio_descripcion'>Tipo de servicio</label>
                          </span>
                      </div>
                  </div>
                  <div className="col-12 md:col-4 mt-5">
                      <div className="p-inputgroup">
                          <span className="p-inputgroup-addon">
                              <i className="pi pi-eye"></i>
                          </span>
                          <span className="p-float-label">
                              <InputText id='desde_numero' value={dataQuantity?.aed_desdenumero} disabled/>
                          <label htmlFor='desde_numero'>Desde número</label>
                          </span>
                      </div>
                  </div>
                  <div className="col-12 md:col-4 mt-5">
                      <div className="p-inputgroup">
                          <span className="p-inputgroup-addon">
                              <i className="pi pi-eye"></i>
                          </span>
                          <span className="p-float-label">
                              <InputText id='hasta_numero' value={dataQuantity?.aed_hastanumero} disabled/>
                          <label htmlFor='hasta_numero'>Hasta número</label>
                          </span>
                      </div>
                  </div>
              </div>
              <div className='flex justify-content-center'>
                  <div className="col-12 md:col-4 mt-5">
                      <div className="p-inputgroup">
                          <span className="p-inputgroup-addon">
                              <i className="pi pi-eye"></i>
                          </span>
                          <span className="p-float-label">
                              <InputText type='number' id='vendido' value={dataQuantity?.aed_cantidad} disabled/>
                          <label htmlFor='vendido'>Cantidad</label>
                          </span>
                      </div>
                  </div>
                  <div className="col-12 md:col-4 mt-5">
                      <div className="p-inputgroup">
                          <span className="p-inputgroup-addon">
                              <i className="pi pi-eye"></i>
                          </span>
                          <span className="p-float-label">
                              <InputText type='number' id='vendido' value={quantity} min={dataQuantity?.aed_desdenumero} max={dataQuantity?.aed_hastanumero} onChange={(e) => setQuantity(e.target.value)}/>
                          <label htmlFor='vendido'>Vendida hasta</label>
                          </span>
                      </div>
                  </div>
              </div>
              <div className='flex justify-content-end mt-2'>
                  <Button label='Actualizar' onClick={updateQuantity}/>
              </div>

          </Dialog>
      ) }

      <DialogAddDetalle visible={dialogAdd} onHide={() => setDialogAdd(false)} prevaloradas={prevaloradas} ae_actaid={id} loadData={fetchDataDet}/>
    </>
  )
}

export default PrevaloradasEdit