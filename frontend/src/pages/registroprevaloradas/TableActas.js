import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'

function TableActas({data}) {
    const [ dialogQuantity, setDialogQuantity ] = useState(false);
    const [ dataQuantity, setDataQuantity ] = useState();
    const [ quantity, setQuantity ] = useState();
    const [ actas, setActas ] = useState ([]);

    useEffect(() => {
        setActas(data);
        
    }, [])
    
    const handleCheckboxChange = (rowData, field) => {
        const updatedActas = actas.map(acta => {
            if (acta.aed_actaid === rowData.aed_actaid) {
            const vendido = ( field === 'aprobado') ? rowData.aed_cantidad : 0;
            return {
                ...acta,
                aed_vendidohasta: vendido,
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
                onClick={ () => fillDialogQuantity(rowData) }
            />
            </div>
        );
    };

    const fillDialogQuantity = (rowData) => {
        setDialogQuantity(true);
        setDataQuantity( rowData );
        setQuantity(0);
    }

    const updateQuantity = () => {
        setDialogQuantity(false);
        
        const updatedActas = actas.map(acta => {
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
        
        setActas(updatedActas);
    }

  return (
    <>
        <DataTable value={actas} rowClassName={rowClassName} className="p-datatable-striped">
            <Column field="servicio.servicio_id" header="TIPO SERVICIO"></Column>
            <Column field="servicio.servicio_descripcion" header="SERVICIO DESCRIPCION"></Column>
            <Column field="aed_desdenumero" header="DESDE NUMERO"></Column>
            <Column field="aed_hastanumero" header="HASTA NUMERO"></Column>
            <Column field="aed_cantidad" header="CANTIDAD"></Column>
            <Column field="aed_vendidohasta" header="VENDIDO (S)"></Column>
            <Column field="aed_preciounitario" header="PRECIO UNITARIO"></Column>
            <Column field="aed_importebs" header="IMPORTE"></Column>
            <Column header="VENDIDO" body={vendidoBodyTemplate} style={{ textAlign: 'center' }}/>
            <Column header="DEVOLUCIÓN" body={devolucionBodyTemplate} style={{ textAlign: 'center' }}/>
            <Column body={actionTemplate} header="" className="text-xs py-1 px-2"/>
        </DataTable>
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
                                <InputText type='number' id='vendido' value={quantity} min="0" max={(dataQuantity?.aed_hastanumero-dataQuantity?.aed_desdenumero +1 )} onChange={(e) => setQuantity(e.target.value)}/>
                            <label htmlFor='vendido'>Cantidad vendida</label>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-content-end mt-2'>
                    <Button label='Actualizar' onClick={updateQuantity}/>
                </div>

            </Dialog>
        ) }
    </>
  )
}

export default TableActas