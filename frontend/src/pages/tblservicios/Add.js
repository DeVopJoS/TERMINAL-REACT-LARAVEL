import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblserviciosAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		servicio_abreviatura: yup.string().required().label("Servicio Abreviatura"),
		servicio_descripcion: yup.string().required().label("Servicio Descripcion"),
		servicio_precio_base: yup.number().required().label("Servicio Precio Base"),
		servicio_estado: yup.string().nullable().label("Servicio Estado")
	});
	
	//form default values
	const formDefaultValues = {
		servicio_abreviatura: '', 
		servicio_descripcion: '', 
		servicio_precio_base: '', 
		servicio_estado: '', 
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
			app.navigate(`/tblservicios`);
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
<main id="TblserviciosAddPage" className="main-page">
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
                                                Servicio Abreviatura *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="servicio_abreviatura"  onChange={formik.handleChange}  value={formik.values.servicio_abreviatura}   label="Servicio Abreviatura" type="text" placeholder="Escribir Servicio Abreviatura"        className={inputClassName(formik?.errors?.servicio_abreviatura)} />
                                                <ErrorMessage name="servicio_abreviatura" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Servicio Descripcion *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="servicio_descripcion"  onChange={formik.handleChange}  value={formik.values.servicio_descripcion}   label="Servicio Descripcion" type="text" placeholder="Escribir Servicio Descripcion"        className={inputClassName(formik?.errors?.servicio_descripcion)} />
                                                <ErrorMessage name="servicio_descripcion" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Servicio Precio Base *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="servicio_precio_base"  onChange={formik.handleChange}  value={formik.values.servicio_precio_base}   label="Servicio Precio Base" type="number" placeholder="Escribir Servicio Precio Base"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.servicio_precio_base)} />
                                                <ErrorMessage name="servicio_precio_base" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Servicio Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="servicio_estado"  onChange={formik.handleChange}  value={formik.values.servicio_estado}   label="Servicio Estado" type="text" placeholder="Escribir Servicio Estado"        className={inputClassName(formik?.errors?.servicio_estado)} />
                                                <ErrorMessage name="servicio_estado" component="span" className="p-error" />
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
TblserviciosAddPage.defaultProps = {
	primaryKey: 'servicio_id',
	pageName: 'tblservicios',
	apiPath: 'tblservicios/add',
	routeName: 'tblserviciosadd',
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
export default TblserviciosAddPage;
