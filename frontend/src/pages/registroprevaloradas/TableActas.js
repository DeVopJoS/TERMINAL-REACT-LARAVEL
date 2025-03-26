import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'

function TableActas() {
    const [dialogQuantity,setDialogQuantity] = useState(false);
    const [actas, setActas] = useState ([
        {
            servicio_id: 1000,
            servicio_descripcion: 1,
            aed_desdenumero: "100",
            aed_hastanumero: "200",
            aed_vendidohasta: 150,
            aed_importebs: 10,
            aed_cantidad: 50,
            aed_preciounitario: 2.5,
            aprobado: false, 
            rechazado: false
        },
    ]);
    
    const handleCheckboxChange = (rowData, field) => {
    const updatedActas = actas.map(acta => {
        if (acta.id === rowData.id) {
        // Solo un checkbox puede estar seleccionado por fila
        return {
            ...acta,
            aprobado: field === 'aprobado' ? !acta.aprobado : false,
            rechazado: field === 'rechazado' ? !acta.rechazado : false
        };
        }
        return acta;
    });
    setActas(updatedActas);
    };

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

    const rowClassName = (rowData) => {
        if (rowData.aprobado) return 'row-aprobada';
        if (rowData.rechazado) return 'row-rechazada';
        return '';
      };

    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-success p-button-sm"
                onClick={() => setDialogQuantity(true)}
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
        <DataTable value={actas} rowClassName={rowClassName} className="p-datatable-striped">
            <Column field="servicio_id" header="TIPO SERVICIO"></Column>
            <Column field="servicio_descripcion" header="SERVICIO DESCRIPCION"></Column>
            <Column field="aed_desdenumero" header="DESDE NUMERO"></Column>
            <Column field="aed_hastanumero" header="HASTA NUMERO"></Column>
            <Column field="aed_vendidohasta" header="VENDIDO"></Column>
            <Column field="aed_cantidad" header="CANTIDAD"></Column>
            <Column field="aed_preciounitario" header="PRECIO UNITARIO"></Column>
            <Column field="aed_importebs" header="IMPORTE"></Column>
            <Column header="Aprobado" body={vendidoBodyTemplate} style={{ textAlign: 'center' }}/>
            <Column header="Rechazado" body={devolucionBodyTemplate} style={{ textAlign: 'center' }}/>
            <Column body={actionTemplate} header="" className="text-xs py-1 px-2"/>
        </DataTable>
        { dialogQuantity && (
            <Dialog visible={dialogQuantity} onHide={() => setDialogQuantity(false)} style={{ width: '50vw' }}>
                <div className="grid p-fluid mb-2">
                    <div className="col-12 md:col-3 mt-5">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' disabled/>
                            <label htmlFor='per_ap_paterno'>Tipo de servicio</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-3 mt-5">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' disabled/>
                            <label htmlFor='per_ap_paterno'>Desde numero</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-3 mt-5">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno' disabled/>
                            <label htmlFor='per_ap_paterno'>Hasta numero</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 md:col-3 mt-5">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-eye"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id='per_ap_paterno'/>
                            <label htmlFor='per_ap_paterno'>Vendido hasta</label>
                            </span>
                        </div>
                    </div>
                </div>
            </Dialog>
        ) }
    </>
  )
}

export default TableActas