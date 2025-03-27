import { useEffect, useState, useRef } from 'react';
import { Toast } from "primereact/toast";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { confirmDialog } from 'primereact/confirmdialog';
import TableActas from './TableActas';
import axios from "axios";

function PrevaloradasList() {
    const toast = useRef(null);
    const [ displayDialog, setDisplayDialog ] = useState(false);
    const [ actaSelected, setActaSelected ] = useState();
    const [ actaDetalle, setActaDetalle ] = useState();
    const [ actas, setActas ] = useState([]);
    const [fecha, setFecha] = useState(null);
    const [correlativo, setCorrelativo] = useState("");

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const { data } = await axios.get('actas/index/ae_estado/E');
        setActas(data);
    }

    const handleSearch = async () => { 
        try {
            const formattedDate = fecha ? fecha.toISOString().split('T')[0] : '';
            let url = '/actas/index?ae_estado=E';
            if(fecha)
                url += `&ae_fecha=${formattedDate}`;
            if(correlativo)
                url+= `&ae_actaid=${correlativo}`
        
            // const { data } = await axios.get(`/actas/index?ae_estado=E&ae_fecha=${formattedDate}`);
            const { data } = await axios.get(url);
        
            setActas(data);
        } catch (error) {
            console.error("Error al buscar datos:", error);
        }
    }

    const actionTemplate = (rowData) => {
        return (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              className="p-button-success p-button-sm"
              onClick= { () => {
                setActaSelected(rowData);
                fetchActaDet(rowData);
            }}
            />
          </div>
        );
      };

    const fetchActaDet = async ({ae_actaid}) => {
        setDisplayDialog(true);
        
        const {data:{records}} = await axios.get(`tblactaentregadet/index/ae_actaid/${ae_actaid}`);
        
        const updatedRecords = records.map(item => ({
            ...item,
            aprobado: false,
            rechazado: false
        }));
        
        setActaDetalle(updatedRecords);
    }

    const handleSubmit = () => {
        const sendActa = async () => {
            try{
                const {status} = await axios.post('/tblactaentregadet/finalizar', actaDetalle);
                
                if(status == 200){
                    toast.current.show({
                        severity: "success",
                        summary: "Éxito",
                        detail: "Acta cerrada exitosamente.",
                        life: 3000,
                    });
                }
                fetchData();
            } catch(error){
                console.error('error: ', error)
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "No se pudo cerrar el acta: " + (error),
                    life: 3000,
                });
            } finally {
                setDisplayDialog(false);
            }
        }
        confirmDialog({
            message: `¿Esta séguro de cerrar el acta? esta acción no se podra revertir.`,
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            accept: () => sendActa(),
        });
    }

  return (
    <>
        <Toast ref={toast} />
        <Card title="Registro de Pre-valoradas">
            {/* section inputs search */}
            <div className="grid p-fluid mb-2">
                <div className="col-12 md:col-3 mt-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <Checkbox checked={true} />
                        </span>
                        <span className="p-float-label">
                            <InputText type='number' id='ae_actaid' value={correlativo}
                      onChange={(e) => setCorrelativo(e.target.value)}/>
                        <label htmlFor='ae_actaid'>CORRELATIVO</label>
                        </span>
                    </div>
                </div>
                <div className="col-12 md:col-3 mt-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <Checkbox checked={true} />
                        </span>
                        <span className="p-float-label">
                            <Calendar id='ae_fecha' value={fecha} onChange={(e) => setFecha(e.value)} showIcon className="p-inputtext-sm" />
                        <label htmlFor='ae_fecha'>FECHA</label>
                        </span>
                    </div>
                </div>
               
                <div className='col-12 md:col-3 mt-5'>
                    <Button label='Buscar datos de acta de entrega' icon='pi pi-search' onClick={handleSearch}/>
                </div>
            </div>
        </Card>
        <Card className='mt-3'>
            <DataTable value={actas} responsiveLayout="scroll" className="p-datatable-sm text-xs" showGridlines>
                <Column field="ae_actaid" header="ACTA ID" className="text-xs py-1 px-2"/>
                {/* <Column field="ae_correlativo" header="CORRELATIVO" className="text-xs py-1 px-2"/> */}
                <Column field="punto_recaudacion.puntorecaud_nombre" header="PUNTO RECAUDACIÓN" className="text-xs py-1 px-2"/>
                <Column field="ae_fecha" header="FECHA" className="text-xs py-1 px-2"/>
                <Column field='ae_grupo' header="GRUPO" className="text-xs py-1 px-2"/>
                <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" className="text-xs py-1 px-2"/>
                <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" className="text-xs py-1 px-2"/>
                <Column field="ae_observacion" header="OBSERVACIÓN" className="text-xs py-1 px-2"/>
                <Column field="ae_recaudaciontotalbs" header="RECAUDACIÓN TOTAL BS" className="text-xs py-1 px-2"/>
                <Column body={actionTemplate} header="" className="text-xs py-1 px-2"/>
            </DataTable>
        </Card>

        { displayDialog && (
            <Dialog header="Pre-valoradas" visible={displayDialog} style={{ width: '75vw' }} onHide={() => setDisplayDialog(false)}>
                <div className="grid p-fluid mb-2">
                    <div className="col-12 md:col-4 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' value={actaSelected?.punto_recaudacion.puntorecaud_nombre} disabled/>
                            <label htmlFor='per_ap_paterno'>Punto de Recaudación</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-4 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_id' className="w-full" value={actaSelected?.ae_operador1erturno} disabled />
                            <label htmlFor='per_id'>Operador 1er. Turno</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-4 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' value={actaSelected?.ae_operador2doturno} disabled />
                            <label htmlFor='per_ap_paterno'>Operador 2do. Turno</label>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid p-fluid mb-2">
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_materno' value={actaSelected?.ae_fecha} className="w-full" disabled/>
                            <label htmlFor='per_ap_materno'>Fecha</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_materno' value={actaSelected?.ae_cambiobs} className="w-full" disabled/>
                            <label htmlFor='per_ap_materno'>Cambio <span className='text-bluegray-400'>Bs.</span></label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_nombres' className="w-full" value={actaSelected?.ae_grupo} disabled />
                            <label htmlFor='per_nombres'>Grupo</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_nombres' className="w-full" value={actaSelected?.ae_cajachicabs} disabled />
                            <label htmlFor='per_nombres'>Caja Chica <span className='text-bluegray-400'>Bs.</span></label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_id' className="w-full" value={actaSelected?.ae_llaves} disabled />
                            <label htmlFor='per_id'>Llaves</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' value={actaSelected?.ae_tampo} disabled />
                            <label htmlFor='per_ap_paterno'>Tampo</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mt-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' value={actaSelected?.ae_candados} disabled />
                            <label htmlFor='per_ap_paterno'>Candados</label>
                            </span>
                        </div>
                    </div>
                </div>
                <TableActas data={actaDetalle} setData={setActaDetalle}/>
                <div className='flex justify-content-end'>
                    <Button className='mt-5' label='Cerrar Acta' onClick={handleSubmit}/>
                </div>
            </Dialog>
        )}
    </>
  )
}

export default PrevaloradasList