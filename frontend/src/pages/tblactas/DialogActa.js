import React, { useState, useEffect, useRef } from 'react'
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import DialogActaDet from './DialogActaDet';
import axios from 'axios';


function DialogActa({visible, onHide, reloadData, editData = null}) {
    const toast = useRef(null);
    const [ dialogActaDet, setDialogActaDet ] = useState(false);
    const [ registros, setRegistros ] = useState([]);
    const [ totalImporte, setTotalImporte ] = useState(0);
    const [ currentData, setCurrentData ] = useState(null);
    const [ tiposPunto, setTiposPunto ] = useState([]);
    const [ tipoPuntoSelec, setTipoPuntoSelec] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [errores, setErrores] = useState({});
    const [fecha, setFecha] = useState(null);
    const [observacion, setObservacion] = useState(""); 
    const [editMode, setEditMode] = useState(false);
    const [actaId, setActaId] = useState(null);

    useEffect(() => {
        if (editData) {
            setEditMode(true);
            setActaId(editData.ae_actaid);
            loadActaData(editData);
        } else {
            setEditMode(false);
            setActaId(null);
            resetForm();
        }
    }, [editData]);

    const loadActaData = (acta) => {
        // Cargamos los datos del acta en el formulario
        setObservacion(acta.ae_observacion || "");
        setTipoPuntoSelec(acta.punto_recaud_id);
        setFecha(acta.ae_fecha ? new Date(acta.ae_fecha) : null);
        
        // Establecemos los valores de los campos de texto
        setTimeout(() => {
            if (document.getElementById("grupo")) {
                document.getElementById("grupo").value = acta.ae_grupo || "";
            }
            if (document.getElementById("operador1erturno")) {
                document.getElementById("operador1erturno").value = acta.ae_operador1erturno || "";
            }
            if (document.getElementById("operador2doturno")) {
                document.getElementById("operador2doturno").value = acta.ae_operador2doturno || "";
            }
            if (document.getElementById("cambio")) {
                document.getElementById("cambio").value = acta.ae_cambiobs || "0";
            }
            if (document.getElementById("cajachica")) {
                document.getElementById("cajachica").value = acta.ae_cajachicabs || "0";
            }
            if (document.getElementById("llaves")) {
                document.getElementById("llaves").value = acta.ae_llaves || "0";
            }
            if (document.getElementById("fechero")) {
                document.getElementById("fechero").value = acta.ae_fechero || "0";
            }
            if (document.getElementById("tampo")) {
                document.getElementById("tampo").value = acta.ae_tampo || "0";
            }
            if (document.getElementById("candados")) {
                document.getElementById("candados").value = acta.ae_candados || "0";
            }
        }, 100);

        // Cargar los detalles del acta
        fetchActaDetalles(acta.ae_actaid);
    };

    const resetForm = () => {
        setObservacion("");
        setTipoPuntoSelec(null);
        setFecha(null);
        setRegistros([]);
        setTotalImporte(0);
        setCurrentData(null);
        setErrores({});
    };

    const fetchActaDetalles = async (actaId) => {
        try {
            const { data } = await axios.get(`/actas/cabecera/${actaId}`);
            
            if (data && data.detalles) {
                const formattedRegistros = data.detalles.map(detalle => ({
                    id: detalle.aed_actaid,
                    tipo_servicio: detalle.servicio_id,
                    descripcion: detalle.servicio_descripcion,
                    desde_numero: detalle.aed_desdenumero,
                    hasta_numero: detalle.aed_hastanumero,
                    cantidad_boletos: detalle.aed_cantidad,
                    precio_unitario: detalle.aed_preciounitario,
                    precio_total: detalle.aed_importebs
                }));
                
                setRegistros(formattedRegistros);
            }
        } catch (error) {
            console.error("Error fetching acta details:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "No se pudieron cargar los detalles del acta",
                life: 3000,
            });
        }
    };

    useEffect(() => {
        const total = registros.reduce((acc, record) => acc + Number(record.precio_total || 0), 0);
        setTotalImporte(total);
    }, [registros]);

    const actionButtons = (rowData) => {
        return (
            <div className="flex justify-content-center">
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                style={{ width: "2rem", height: "2rem" }}
                onClick={ () => handleEdit(rowData.id) }
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                style={{ width: "2rem", height: "2rem" }}
                onClick={ () => handleDelete(rowData.id)}
            />
            </div>
        );
    };

    const handleDelete = (id) => {
        setRegistros(prevRegistros => prevRegistros.filter(record => record.id !== id));
    }

    const handleEdit = (id) => {
        const recordToEdit = registros.find(record => record.id === id); 
        setCurrentData(recordToEdit); 
        setDialogActaDet(true); 
    };

    const openDialogActa = () => {
        setCurrentData(null);
        setDialogActaDet(true)
    }

    const handleSaveDet = (newRecord) => {
        const solapamiento = registros.some(record => {
            if (newRecord.id && record.id === newRecord.id) return false;
            if (newRecord.tipo_servicio !== record.tipo_servicio) return false;
            
            return (
                (newRecord.desde_numero >= record.desde_numero && newRecord.desde_numero <= record.hasta_numero) ||
                (newRecord.hasta_numero >= record.desde_numero && newRecord.hasta_numero <= record.hasta_numero) ||
                (newRecord.desde_numero <= record.desde_numero && newRecord.hasta_numero >= record.hasta_numero)
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
        }
        
        setRegistros(prevRegistros => {
            if (newRecord.id) {
                return prevRegistros.map(record => 
                    record.id === newRecord.id ? newRecord : record
                );
            } else {
                const newId = prevRegistros.length > 0 
                    ? Math.max(...prevRegistros.map(r => r.id)) + 1 
                    : 1;
    
                return [...prevRegistros, { ...newRecord, id: newId }];
            }
        });
    };

    const validarFormulario = () => {
        let erroresTemp = {};
        let isValid = true;
    
        if (!tipoPuntoSelec) {
            erroresTemp.punto_recaudacion = "Seleccione un punto de recaudación";
            isValid = false;
        }
        
        if (!fecha) {
            erroresTemp.fecha = "Ingrese la fecha";
            isValid = false;
        }
        
        if (totalImporte == 0) {
            erroresTemp.totalImporte = "Debe agregar por lo menos un detalle de acta.";
            isValid = false;
        }
        
        if (!document.getElementById("grupo")?.value) {
            erroresTemp.grupo = "Ingrese el grupo";
            isValid = false;
        }
        
   
        setErrores(erroresTemp);
        
        if (!isValid) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Complete todos los campos obligatorios",
                life: 3000,
            });
        }
    
        return isValid;
    };

    const handleInputChange = (field) => {
        setErrores(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const handleSaveActa = async () => {
        if (!validarFormulario()) return;

        setIsSaving(true);
        try {
            const acta = {
                observacion: observacion,
                recaudacion_total: totalImporte,
                punto_recaudacion: tipoPuntoSelec,
                fecha: fecha,
                grupo: document.getElementById("grupo")?.value || "",
                operador_1er_turno: document.getElementById("operador1erturno")?.value || "",
                operador_2do_turno: document.getElementById("operador2doturno")?.value || "",
                cambio_bs: document.getElementById("cambio")?.value || "0",
                caja_chica_bs: document.getElementById("cajachica")?.value || "0",
                llaves: document.getElementById("llaves")?.value || "0",
                fechero: document.getElementById("fechero")?.value || "0",
                tampo: document.getElementById("tampo")?.value || "0",
                candados: document.getElementById("candados")?.value || "0",
                ae_estado: "P",
                registros: registros.map(r => ({
                    id: r.id,
                    tipo_servicio: r.tipo_servicio,
                    descripcion: r.descripcion,
                    desde_numero: r.desde_numero,
                    hasta_numero: r.hasta_numero,
                    cantidad_boletos: r.cantidad_boletos || (parseInt(r.hasta_numero) - parseInt(r.desde_numero) + 1),
                    precio_unitario: r.precio_unitario,
                    importe_total: r.precio_total || (r.cantidad_boletos * r.precio_unitario)
                })),
            };
          
            if (editMode && actaId) {
                try {
                    await axios.post(`/actaentregacab/edit/${actaId}`, acta);
                    toast.current.show({
                        severity: "success",
                        summary: "Éxito",
                        detail: "Acta actualizada exitosamente.",
                        life: 3000,
                    });
                } catch (error) {
                    console.error("Error al actualizar acta:", error);
                    throw error;
                }
            } else {
                await axios.post("/actas", acta);
                toast.current.show({
                    severity: "success",
                    summary: "Éxito",
                    detail: "Acta registrada exitosamente.",
                    life: 3000,
                });
            }
          
            setTimeout(() => {
                setIsSaving(false);
                onHide();
                reloadData();
            }, 1000);

        } catch (error) {
          console.error("Error saving acta:", error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo guardar el acta: " + (error.response?.data?.message || error.message),
            life: 3000,
          });
          setIsSaving(false);
        }
    }

    useEffect(() => {
        fetchPuntos();
    }, []);    
    
    const fetchPuntos = async () => {
        try {
            const { data } = await axios.get("/tblpuntosrecaudacion/index/puntorecaud_estado/V");
            const dataFormated = data.map(item => ({
                label: item.puntorecaud_nombre,
                value: item.punto_recaud_id,
            }));

            setTiposPunto(dataFormated);
        } catch (error) {
            console.error("Error fetching servicios:", error);
        }
    };
  return (
    <>
        <Toast ref={toast} />
        <Dialog toast={toast} visible={visible} onHide={onHide} header={editMode ? "Editar Acta de Entrega" : "Nueva Acta de Entrega"}  style={{ width: "75vw" }} >
            <Card style={{ backgroundColor: "#f8f9fa" }}>
                {/* FIRST ROW */}
                <div className="grid">
                    <div className="col-12 md:col-3">
                        <label htmlFor="">Punto de Recaudación</label>
                        <Dropdown value={tipoPuntoSelec} onChange={(e) => {
                            setTipoPuntoSelec(e.value);
                            handleInputChange('punto_recaudacion');
                        }} options={tiposPunto} optionLabel='label' optionValue='value' className={`w-full ${errores.punto_recaudacion ? 'p-invalid' : ''}`} />
                        {errores.punto_recaudacion && (
                            <small className="p-error">{errores.punto_recaudacion}</small>
                        )}
                    </div>
                    <div className="col-12 md:col-3">
                        <label htmlFor="fecha">Fecha</label>
                        <Calendar id='fecha' className='w-full' showIcon dateFormat="dd/mm/yy" value={fecha} onChange={(e) => {
                            setFecha(e.value);
                            handleInputChange('fecha');
                        }} />
                        {errores.fecha && (
                            <small className="p-error">{errores.fecha}</small>
                        )}
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="grupo">Grupo</label>
                        <InputText id='grupo' className="w-full" value={document.getElementById("grupo")?.value} onChange={(e) => {
                            document.getElementById("grupo").value = e.target.value;
                            handleInputChange('grupo');
                        }} />
                        {errores.grupo && (
                            <small className="p-error">{errores.grupo}</small>
                        )}
                    </div>
                    <div className="col-12 md:col-3">
                        <label htmlFor="operador1erturno">Operador 1er Turno</label>
                        <InputText id="operador1erturno" className="w-full" value={document.getElementById("operador1erturno")?.value} onChange={(e) => {
                            document.getElementById("operador1erturno").value = e.target.value;
                            handleInputChange('operador_1er_turno');
                        }} />
                        {errores.operador_1er_turno && (
                            <small className="p-error">{errores.operador_1er_turno}</small>
                        )}
                    </div>
                </div>
                {/* SECOND ROW */}
                <div className='grid'>
                    <div className="col-12 md:col-3">
                        <label htmlFor="operador2doturno">Operador 2do. Turno</label>
                        <InputText id='operador2doturno' className="w-full" value={document.getElementById("operador2doturno")?.value} onChange={(e) => {
                            document.getElementById("operador2doturno").value = e.target.value;
                            handleInputChange('operador_2do_turno');
                        }} />
                        {errores.operador_2do_turno && (
                            <small className="p-error">{errores.operador_2do_turno}</small>
                        )}
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="cambio">Cambio <span className='text-bluegray-400'>Bs.</span></label>
                        <InputText id='cambio' type="number" min="0" className="w-full" />
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="cajachica">Caja Chica <span className='text-bluegray-400'>Bs.</span></label>
                        <InputText id="cajachica" type="number" min="0" className="w-full" />
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="llaves">Llaves</label>
                        <InputText id="llaves" type="number" min="0" className="w-full" />
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="fechero">Fechero</label>
                        <InputText id="fechero" type="number" min="0" className="w-full" />
                    </div>
                </div>
                {/* THIRD ROW */}
                <div className='grid'>
                    <div className="col-12 md:col-2">
                        <label htmlFor="tampo">Tampo</label>
                        <InputText id="tampo" type="number" min="0" className="w-full" />
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="candados">Candados</label>
                        <InputText id="candados" type="number" min="0" className="w-full" />
                    </div>
                </div>

                <DataTable value={registros}>
                    <Column field="id" header="#" style={{ width: "3rem" }} />
                    <Column field="tipo_servicio" header="TIPO SERVICIO" style={{ width: "6rem" }} />
                    <Column field="descripcion" header="DESCRIPCION DEL SERVICIO" />
                    <Column field="desde_numero" header="DESDE NÚMERO" style={{ width: "8rem" }} />
                    <Column field="hasta_numero" header="HASTA NÚMERO" style={{ width: "8rem" }} />
                    <Column field="cantidad_boletos" header="CANTIDAD" style={{ width: "5rem" }} />
                    <Column field="precio_unitario" header="PRECIO UNITARIO" style={{ width: "7rem" }} />
                    <Column field="precio_total" header="TOTAL" style={{ width: "7rem" }} />
                    <Column body={actionButtons} style={{ width: "8rem" }} />
                </DataTable>

                <div className="grid mt-3">
                    <div className="col-12 md:col-8">
                        <label htmlFor="observacion">Observación</label>
                        <InputTextarea id="observacion" className="w-full" value={observacion} onChange={(e) => setObservacion(e.target.value)}/>
                    </div>
                    <div className="col-12 md:col-2">
                        <label htmlFor="recaudacionTotal">Recaudación Total Bs</label>
                        <InputText id="recaudacionTotal" className="w-full" value={totalImporte} readOnly />
                    </div>
                </div>

                <div className="flex justify-content-between mt-3">
                    <div className="flex">
                        <Button label={editMode ? "ACTUALIZAR" : "GUARDAR"} icon="pi pi-save" className="p-button-success mr-2" onClick={handleSaveActa} disabled={isSaving} />
                    </div>
                    <div>
                        <Button icon="pi pi-bars" className="p-button-rounded p-button-info" style={{ width: "3.5rem", height: "3.5rem" }} onClick={openDialogActa}/>
                    </div>
                </div>
            </Card>
        </Dialog>
        <DialogActaDet visible={dialogActaDet} onHide={() => setDialogActaDet(false)} onSave={handleSaveDet} currentData={currentData} />
    </>
  )
}


export default DialogActa