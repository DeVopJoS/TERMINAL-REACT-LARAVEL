import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function DialogAddDetalle({visible, onHide, prevaloradas, ae_actaid, loadData}) {
    const toast = useRef(null);
    const [tiposServicio, setTiposServicio] = useState();
    const [tipoServicioSelected, setTipoServicioSelected] = useState();
    const [desdeNumero, setDesdeNumero] = useState();
    const [hastaNumero, setHastaNumero] = useState();

    useEffect(() => {
        fetchServicios();
    }, [])

    const handleSave = async () => {
        if (tipoServicioSelected && desdeNumero && hastaNumero) {
            if (parseInt(desdeNumero) > parseInt(hastaNumero)) {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "El número 'Desde' no puede ser mayor que el número 'Hasta'.",
                    life: 3000,
                });
            } else {
                const cantidadTotal = parseInt(hastaNumero) - parseInt(desdeNumero) + (parseInt(desdeNumero) === parseInt(hastaNumero) ? 1 : 0);
    
                if (cantidadTotal > 100) {
                    confirmDialog({
                        message: `Se crearán ${Math.ceil(cantidadTotal / 100)} registros. ¿Desea continuar?`,
                        header: "Confirmación",
                        icon: "pi pi-exclamation-triangle",
                        accept: () => dividirYGuardarRegistros(desdeNumero, hastaNumero),
                        reject: () => {
                            toast.current.show({
                                severity: "info",
                                summary: "Cancelado",
                                detail: "No se ha realizado ninguna operación",
                                life: 3000,
                            });
                        }
                    });
                } else {
                    guardarRegistroUnico(desdeNumero, hastaNumero);
                }
            }
        } else {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Campos vacíos.",
                life: 3000,
            });
        }
    };
    
    const guardarRegistroUnico = (desde, hasta) => {
        const { label, preuni } = obtenerDatosPorValue(tipoServicioSelected);
        const cantidad = parseInt(hasta) - parseInt(desde) + 1;
        
        const data = {
            tipo_servicio: tipoServicioSelected,
            descripcion: label,
            desde_numero: desde,
            hasta_numero: hasta,
            cantidad_boletos: cantidad,
            precio_unitario: preuni,
            precio_total: cantidad * preuni,
        };
        handleSaveDet(data);
    };
    
    const dividirYGuardarRegistros = (desde, hasta) => {
        const { label, preuni } = obtenerDatosPorValue(tipoServicioSelected);
        let aux_desde = parseInt(desde);
        let nuevasFilas = [];
        const total = parseInt(hasta) - parseInt(desde) + 1;
        const rows = Math.ceil(total / 100);
        
        for(let i=0; i < rows; i++){
            const current_desde = aux_desde;
            
            if (i === rows - 1) {
                aux_desde = parseInt(hasta);
            } else {
                aux_desde = current_desde + 99;
            }
            
            const cantidad = aux_desde - current_desde + 1;
            
            nuevasFilas.push({
                //id: currentData?.id || null,
                tipo_servicio: tipoServicioSelected,
                descripcion: label,
                desde_numero: current_desde,
                hasta_numero: aux_desde,
                cantidad_boletos: cantidad,
                precio_unitario: preuni,
                precio_total: cantidad * preuni,
            });
    
            aux_desde += 1;
        }

        nuevasFilas.forEach(fila => handleSaveDet(fila));
    
        toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: `Se crearon ${nuevasFilas.length} registros.`,
            life: 3000,
        });
    };

    function obtenerDatosPorValue(value) {
        const servicio = tiposServicio.find(item => item.value == value);
        if (servicio) {
            return { label: servicio.label, preuni: servicio.preuni };
        }
        return { label: null, preuni: null }; 
    }

    const handleSaveDet = (newRecord) => {
        const solapamiento = prevaloradas.some(record => {
            if (newRecord.tipo_servicio !== record.servicio_id) return false;
            
            return (
                (newRecord.desde_numero >= record.aed_desdenumero && newRecord.desde_numero <= record.aed_hastanumero) ||
                (newRecord.hasta_numero >= record.aed_desdenumero && newRecord.hasta_numero <= record.aed_hastanumero) ||
                (newRecord.desde_numero <= record.aed_desdenumero && newRecord.hasta_numero >= record.aed_hastanumero)
            );
        });

        if (solapamiento) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "El rango de números se solapa con un registro existente",
                life: 3000,
            });
            return; 
        } else {
            saveDetalle(newRecord);
        }
    };

    const saveDetalle = async (newRecord) => {
        const data = {
            ...newRecord,
            ae_actaid: ae_actaid
        }
        try{
            const result = await axios.post('/tblactaentregadet/add', data);

            toast.current.show({
                severity: "success",
                summary: "Exito",
                detail: "Detalle agregado exitosamente!",
                life: 3000,
            });

            resetForm();
            onHide();
            loadData();
        } catch (error){
            console.log(error);
        }
    }

    const resetForm = () => {
        setTipoServicioSelected();
        setDesdeNumero();
        setHastaNumero();
    };

    const fetchServicios = async () => {
        try {
            const { data: {data}} = await axios.get("/servicios");
            
            setTiposServicio(data);
        } catch (error) {
            console.error("Error fetching servicios:", error);
        }
    };

    const footer = (
        <div className="flex justify-content-end">
            <Button label="GUARDAR" icon="pi pi-check" className="p-button-success mr-2" onClick={handleSave}/>
            <Button label="CANCELAR" icon="pi pi-times" className="p-button-danger" onClick={onHide}/>
        </div>
    );
  return (
    <>
        <Toast ref={toast} />
        <Dialog visible={visible} onHide={onHide} style={{ width: "600px" }} footer={footer}>
            <div className="grid p-fluid">
                <div className="col-12 md:col-5 mb-2">
                    <label htmlFor="" className="block font-bold mb-2">TIPO SERVICIO</label>
                    <Dropdown placeholder="Seleccione tipo de servicio" value={tipoServicioSelected} onChange={(e) => {setTipoServicioSelected(e.value)
                        }} className="w-full" filter filterBy="label" options={tiposServicio} />
                </div>
        
                <div className="col-12 md:col-3 mb-2">
                    <label htmlFor="" className="block font-bold mb-2">
                    DESDE NÚMERO</label>
                    <InputText type='number' min='0' value={desdeNumero}
                onChange={(e) => setDesdeNumero(e.target.value)} className="w-full" />
                </div>
        
                <div className="col-12 md:col-3 mb-2">
                    <label htmlFor="hastaNumero" className="block font-bold mb-2">HASTA NÚMERO</label>
                    <InputText type='number' min='0' value={hastaNumero}
                onChange={(e) => setHastaNumero(e.target.value)} className="w-full" />
                </div>
            </div>
        </Dialog>
    </>
  )
}

export default DialogAddDetalle