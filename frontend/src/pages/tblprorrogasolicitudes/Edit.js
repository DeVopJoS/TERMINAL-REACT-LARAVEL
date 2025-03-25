import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const TblprorrogasolicitudesEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		arrendatario_id: yup.number().nullable().label("Arrendatario Id"),
		prorroga_solicitud_solicitud_fecha: yup.string().nullable().label("Prorroga Solicitud Solicitud Fecha"),
		prorroga_solicitud_fecha_propuesta_pago: yup.string().required().label("Prorroga Solicitud Fecha Propuesta Pago"),
		prorroga_solicitud_observaciones: yup.string().nullable().label("Prorroga Solicitud Observaciones"),
		prorroga_solicitud_estado: yup.string().nullable().label("Prorroga Solicitud Estado")
	});
	// form default values
	const formDefaultValues = {
		arrendatario_id: '', 
		prorroga_solicitud_solicitud_fecha: new Date(), 
		prorroga_solicitud_fecha_propuesta_pago: new Date(), 
		prorroga_solicitud_observaciones: '', 
		prorroga_solicitud_estado: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/tblprorrogasolicitudes`);
		}
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="TblprorrogasolicitudesEditPage" className="main-page">
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
                    <Title title="Editar"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => {
                            submitForm(values);
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendatario Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendatario_id"  onChange={formik.handleChange}  value={formik.values.arrendatario_id}   label="Arrendatario Id" type="number" placeholder="Escribir Arrendatario Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.arrendatario_id)} />
                                                <ErrorMessage name="arrendatario_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Prorroga Solicitud Solicitud Fecha 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="prorroga_solicitud_solicitud_fecha" value={formik.values.prorroga_solicitud_solicitud_fecha} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.prorroga_solicitud_solicitud_fecha)}        />
                                                <ErrorMessage name="prorroga_solicitud_solicitud_fecha" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Prorroga Solicitud Fecha Propuesta Pago *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="prorroga_solicitud_fecha_propuesta_pago" value={formik.values.prorroga_solicitud_fecha_propuesta_pago} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.prorroga_solicitud_fecha_propuesta_pago)}        />
                                                <ErrorMessage name="prorroga_solicitud_fecha_propuesta_pago" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Prorroga Solicitud Observaciones 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="prorroga_solicitud_observaciones"  className={inputClassName(formik?.errors?.prorroga_solicitud_observaciones)}   value={formik.values.prorroga_solicitud_observaciones} placeholder="Escribir Prorroga Solicitud Observaciones" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="prorroga_solicitud_observaciones" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Prorroga Solicitud Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="prorroga_solicitud_estado"  onChange={formik.handleChange}  value={formik.values.prorroga_solicitud_estado}   label="Prorroga Solicitud Estado" type="text" placeholder="Escribir Prorroga Solicitud Estado"        className={inputClassName(formik?.errors?.prorroga_solicitud_estado)} />
                                                <ErrorMessage name="prorroga_solicitud_estado" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label="Actualizar" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            );
                            }
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
TblprorrogasolicitudesEditPage.defaultProps = {
	primaryKey: 'prorroga_id',
	pageName: 'tblprorrogasolicitudes',
	apiPath: 'tblprorrogasolicitudes/edit',
	routeName: 'tblprorrogasolicitudesedit',
	submitButtonLabel: "Actualizar",
	formValidationError: "El formulario no es válido",
	formValidationMsg: "Por favor complete el formulario",
	msgTitle: "Actualizar registro",
	msgAfterSave: "Registro actualizado con éxito",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default TblprorrogasolicitudesEditPage;
