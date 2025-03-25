import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const ActaentregacabAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		ae_correlativo: yup.number().nullable().label("Ae Correlativo"),
		punto_recaud_id: yup.number().required().label("Punto Recaud Id"),
		ae_fecha: yup.string().nullable().label("Ae Fecha"),
		ae_grupo: yup.string().nullable().label("Ae Grupo"),
		ae_operador1erturno: yup.string().nullable().label("Ae Operador1erturno"),
		ae_operador2doturno: yup.string().nullable().label("Ae Operador2doturno"),
		ae_cambiobs: yup.number().nullable().label("Ae Cambiobs"),
		ae_cajachicabs: yup.number().nullable().label("Ae Cajachicabs"),
		ae_llaves: yup.number().nullable().label("Ae Llaves"),
		ae_fechero: yup.number().nullable().label("Ae Fechero"),
		ae_tampo: yup.number().nullable().label("Ae Tampo"),
		ae_candados: yup.number().nullable().label("Ae Candados"),
		ae_observacion: yup.string().nullable().label("Ae Observacion"),
		ae_recaudaciontotalbs: yup.number().nullable().label("Ae Recaudaciontotalbs"),
		ae_usuario: yup.number().nullable().label("Ae Usuario"),
		ae_usuarioarqueo: yup.number().nullable().label("Ae Usuarioarqueo"),
		ae_fecharegistro: yup.string().nullable().label("Ae Fecharegistro"),
		ae_fechaarqueo: yup.string().nullable().label("Ae Fechaarqueo"),
		ae_estado: yup.string().nullable().label("Ae Estado"),
		arqueoid: yup.number().nullable().label("Arqueoid")
	});
	
	//form default values
	const formDefaultValues = {
		ae_correlativo: '', 
		punto_recaud_id: '', 
		ae_fecha: new Date(), 
		ae_grupo: '', 
		ae_operador1erturno: '', 
		ae_operador2doturno: '', 
		ae_cambiobs: '', 
		ae_cajachicabs: '', 
		ae_llaves: '', 
		ae_fechero: '', 
		ae_tampo: '', 
		ae_candados: '', 
		ae_observacion: '', 
		ae_recaudaciontotalbs: '', 
		ae_usuario: '', 
		ae_usuarioarqueo: '', 
		ae_fecharegistro: new Date(), 
		ae_fechaarqueo: new Date(), 
		ae_estado: '', 
		arqueoid: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/actaentregacab`);
		}
	}
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="ActaentregacabAddPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title="Agregar nuevo"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Correlativo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_correlativo"  onChange={formik.handleChange}  value={formik.values.ae_correlativo}   label="Ae Correlativo" type="number" placeholder="Escribir Ae Correlativo"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_correlativo)} />
                                                <ErrorMessage name="ae_correlativo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Punto Recaud Id *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="punto_recaud_id"  onChange={formik.handleChange}  value={formik.values.punto_recaud_id}   label="Punto Recaud Id" type="number" placeholder="Escribir Punto Recaud Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.punto_recaud_id)} />
                                                <ErrorMessage name="punto_recaud_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Fecha 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="ae_fecha" showButtonBar className={inputClassName(formik?.errors?.ae_fecha)} dateFormat="yy-mm-dd" value={formik.values.ae_fecha} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="ae_fecha" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Grupo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_grupo"  onChange={formik.handleChange}  value={formik.values.ae_grupo}   label="Ae Grupo" type="text" placeholder="Escribir Ae Grupo"        className={inputClassName(formik?.errors?.ae_grupo)} />
                                                <ErrorMessage name="ae_grupo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Operador1erturno 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="ae_operador1erturno"  className={inputClassName(formik?.errors?.ae_operador1erturno)}   value={formik.values.ae_operador1erturno} placeholder="Escribir Ae Operador1erturno" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="ae_operador1erturno" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Operador2doturno 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="ae_operador2doturno"  className={inputClassName(formik?.errors?.ae_operador2doturno)}   value={formik.values.ae_operador2doturno} placeholder="Escribir Ae Operador2doturno" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="ae_operador2doturno" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Cambiobs 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_cambiobs"  onChange={formik.handleChange}  value={formik.values.ae_cambiobs}   label="Ae Cambiobs" type="number" placeholder="Escribir Ae Cambiobs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ae_cambiobs)} />
                                                <ErrorMessage name="ae_cambiobs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Cajachicabs 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_cajachicabs"  onChange={formik.handleChange}  value={formik.values.ae_cajachicabs}   label="Ae Cajachicabs" type="number" placeholder="Escribir Ae Cajachicabs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ae_cajachicabs)} />
                                                <ErrorMessage name="ae_cajachicabs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Llaves 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_llaves"  onChange={formik.handleChange}  value={formik.values.ae_llaves}   label="Ae Llaves" type="number" placeholder="Escribir Ae Llaves"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_llaves)} />
                                                <ErrorMessage name="ae_llaves" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Fechero 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_fechero"  onChange={formik.handleChange}  value={formik.values.ae_fechero}   label="Ae Fechero" type="number" placeholder="Escribir Ae Fechero"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_fechero)} />
                                                <ErrorMessage name="ae_fechero" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Tampo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_tampo"  onChange={formik.handleChange}  value={formik.values.ae_tampo}   label="Ae Tampo" type="number" placeholder="Escribir Ae Tampo"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_tampo)} />
                                                <ErrorMessage name="ae_tampo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Candados 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_candados"  onChange={formik.handleChange}  value={formik.values.ae_candados}   label="Ae Candados" type="number" placeholder="Escribir Ae Candados"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_candados)} />
                                                <ErrorMessage name="ae_candados" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Observacion 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="ae_observacion"  className={inputClassName(formik?.errors?.ae_observacion)}   value={formik.values.ae_observacion} placeholder="Escribir Ae Observacion" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="ae_observacion" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Recaudaciontotalbs 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_recaudaciontotalbs"  onChange={formik.handleChange}  value={formik.values.ae_recaudaciontotalbs}   label="Ae Recaudaciontotalbs" type="number" placeholder="Escribir Ae Recaudaciontotalbs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ae_recaudaciontotalbs)} />
                                                <ErrorMessage name="ae_recaudaciontotalbs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Usuario 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_usuario"  onChange={formik.handleChange}  value={formik.values.ae_usuario}   label="Ae Usuario" type="number" placeholder="Escribir Ae Usuario"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_usuario)} />
                                                <ErrorMessage name="ae_usuario" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Usuarioarqueo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_usuarioarqueo"  onChange={formik.handleChange}  value={formik.values.ae_usuarioarqueo}   label="Ae Usuarioarqueo" type="number" placeholder="Escribir Ae Usuarioarqueo"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_usuarioarqueo)} />
                                                <ErrorMessage name="ae_usuarioarqueo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Fecharegistro 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="ae_fecharegistro" value={formik.values.ae_fecharegistro} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.ae_fecharegistro)}        />
                                                <ErrorMessage name="ae_fecharegistro" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Fechaarqueo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="ae_fechaarqueo" value={formik.values.ae_fechaarqueo} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.ae_fechaarqueo)}        />
                                                <ErrorMessage name="ae_fechaarqueo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ae Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_estado"  onChange={formik.handleChange}  value={formik.values.ae_estado}   label="Ae Estado" type="text" placeholder="Escribir Ae Estado"        className={inputClassName(formik?.errors?.ae_estado)} />
                                                <ErrorMessage name="ae_estado" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueoid 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueoid"  onChange={formik.handleChange}  value={formik.values.arqueoid}   label="Arqueoid" type="number" placeholder="Escribir Arqueoid"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueoid)} />
                                                <ErrorMessage name="arqueoid" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Entregar" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            </>
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}

//page props and default values
ActaentregacabAddPage.defaultProps = {
	primaryKey: 'ae_actaid',
	pageName: 'actaentregacab',
	apiPath: 'actaentregacab/add',
	routeName: 'actaentregacabadd',
	submitButtonLabel: "Entregar",
	formValidationError: "El formulario no es válido",
	formValidationMsg: "Por favor complete el formulario",
	msgTitle: "Crear registro",
	msgAfterSave: "Grabar agregado exitosamente",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default ActaentregacabAddPage;
