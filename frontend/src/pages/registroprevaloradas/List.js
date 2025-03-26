import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog'
import TableActas from './TableActas';

const records = [
    {
        "ae_actaid": 1000,
        "ae_correlativo": 1,
        "punto_recaud_id": "Benton, John B Jr",
        "ae_fecha": "2015-09-13",
        "ae_grupo": 1,
        "ae_operador1erturno": "unqualified",
        "ae_operador2doturno": "unqualified",
        "ae_observacion": "qwe",
        "ae_recaudaciontotalbs": 1000,
        "ae_estado": 'V',
    },
]

function PrevaloradasList() {
    const [displayDialog, setDisplayDialog] = useState(false);

    const handleSearch = () => { }

    const actionTemplate = (rowData) => {
        return (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              className="p-button-success p-button-sm"
              onClick={() => setDisplayDialog(true)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-danger p-button-sm"
            />
          </div>
        );
      };

  return (
    <>
        <Card title="Registro de Pre-valoradas">
            {/* section inputs search */}
            <div className="grid p-fluid mb-2">
                <div className="col-12 md:col-3 mt-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-pencil"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText id='per_ap_paterno'/>
                        <label htmlFor='per_ap_paterno'>CORRELATIVO</label>
                        </span>
                    </div>
                </div>
                <div className="col-12 md:col-3 mt-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-pencil"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText id='per_ap_materno' className="w-full" />
                        <label htmlFor='per_ap_materno'>FECHA</label>
                        </span>
                    </div>
                </div>
               
                <div className='col-12 md:col-3 mt-5'>
                    <Button label='Buscar datos de acta de entrega' icon='pi pi-search' onClick={handleSearch}/>
                </div>
            </div>
        </Card>
        <Card className='mt-3'>
            <DataTable value={records} responsiveLayout="scroll" className="p-datatable-sm text-xs" showGridlines>
                <Column field="ae_actaid" header="ACTA ID" className="text-xs py-1 px-2"/>
                <Column field="ae_correlativo" header="CORRELATIVO" className="text-xs py-1 px-2"/>
                <Column field="punto_recaud_id" header="PUNTO RECAUDACIÓN" className="text-xs py-1 px-2"/>
                <Column field="ae_fecha" header="FECHA" className="text-xs py-1 px-2"/>
                <Column field='ae_grupo' header="GRUPO" className="text-xs py-1 px-2"/>
                <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" className="text-xs py-1 px-2"/>
                <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" className="text-xs py-1 px-2"/>
                <Column field="ae_observacion" header="OBSERVACIÓN" className="text-xs py-1 px-2"/>
                <Column field="ae_recaudaciontotalbs" header="RECAUDACIÓN TOTAL BS" className="text-xs py-1 px-2"/>
                <Column field="ae_estado" header="ESTADO" className="text-xs py-1 px-2"/>
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
                                <InputText id='per_ap_paterno' value='BUSES PUERTA' disabled />
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
                                <InputText id='per_id' className="w-full" value="TORO IBAÑES VLADIMIR" disabled />
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
                                <InputText id='per_ap_paterno' value='TORO IBAÑES VLADIMIR' disabled />
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
                                <InputText id='per_ap_materno' value='21/01/2022' className="w-full" disabled/>
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
                                <InputText id='per_ap_materno' value='2' className="w-full" disabled/>
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
                                <InputText id='per_nombres' className="w-full" value="1" disabled />
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
                                <InputText id='per_nombres' className="w-full" value="1" disabled />
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
                                <InputText id='per_id' className="w-full" value="1" disabled />
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
                                <InputText id='per_ap_paterno' value='1' disabled />
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
                                <InputText id='per_ap_paterno' value='2' disabled />
                            <label htmlFor='per_ap_paterno'>Candados</label>
                            </span>
                        </div>
                    </div>
                </div>

                <TableActas/>
            </Dialog>
        )}
    </>
  )
}

export default PrevaloradasList