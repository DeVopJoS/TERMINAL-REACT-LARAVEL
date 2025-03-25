import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TbledificioambienteAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		seccion_id: yup.number().nullable().label("Seccion Id"),
		ambiente_nombre: yup.string().required().label("Ambiente Nombre"),
		ambiente_tamano: yup.number().nullable().label("Ambiente Tamano"),
		ambiente_tipo_uso: yup.string().nullable().label("Ambiente Tipo Uso"),
		ambiente_precio_alquiler: yup.number().nullable().label("Ambiente Precio Alquiler"),
		ambiente_codigo_interno: yup.string().nullable().label("Ambiente Codigo Interno"),
		ambiente_superficie_m2: yup.number().nullable().label("Ambiente Superficie M2"),
		ambiente_estado: yup.string().required().label("Ambiente Estado")
	});
	
	//form default values
	const formDefaultValues = {
		seccion_id: '', 
		ambiente_nombre: '', 
		ambiente_tamano: '', 
		ambiente_tipo_uso: '', 
		ambiente_precio_alquiler: '', 
		ambiente_codigo_interno: '', 
		ambiente_superficie_m2: '', 
		ambiente_estado: '', 
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
			app.navigate(`/tbledificioambiente`);
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
<main id="TbledificioambienteAddPage" className="main-page">
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
                                                Seccion Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="seccion_id"  onChange={formik.handleChange}  value={formik.values.seccion_id}   label="Seccion Id" type="number" placeholder="Escribir Seccion Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.seccion_id)} />
                                                <ErrorMessage name="seccion_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Nombre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="ambiente_nombre"  className={inputClassName(formik?.errors?.ambiente_nombre)}   value={formik.values.ambiente_nombre} placeholder="Escribir Ambiente Nombre" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="ambiente_nombre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Tamano 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ambiente_tamano"  onChange={formik.handleChange}  value={formik.values.ambiente_tamano}   label="Ambiente Tamano" type="number" placeholder="Escribir Ambiente Tamano"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ambiente_tamano)} />
                                                <ErrorMessage name="ambiente_tamano" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Tipo Uso 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="ambiente_tipo_uso"  className={inputClassName(formik?.errors?.ambiente_tipo_uso)}   value={formik.values.ambiente_tipo_uso} placeholder="Escribir Ambiente Tipo Uso" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="ambiente_tipo_uso" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Precio Alquiler 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ambiente_precio_alquiler"  onChange={formik.handleChange}  value={formik.values.ambiente_precio_alquiler}   label="Ambiente Precio Alquiler" type="number" placeholder="Escribir Ambiente Precio Alquiler"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ambiente_precio_alquiler)} />
                                                <ErrorMessage name="ambiente_precio_alquiler" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Codigo Interno 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="ambiente_codigo_interno"  className={inputClassName(formik?.errors?.ambiente_codigo_interno)}   value={formik.values.ambiente_codigo_interno} placeholder="Escribir Ambiente Codigo Interno" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="ambiente_codigo_interno" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Superficie M2 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ambiente_superficie_m2"  onChange={formik.handleChange}  value={formik.values.ambiente_superficie_m2}   label="Ambiente Superficie M2" type="number" placeholder="Escribir Ambiente Superficie M2"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ambiente_superficie_m2)} />
                                                <ErrorMessage name="ambiente_superficie_m2" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Estado *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ambiente_estado"  onChange={formik.handleChange}  value={formik.values.ambiente_estado}   label="Ambiente Estado" type="text" placeholder="Escribir Ambiente Estado"        className={inputClassName(formik?.errors?.ambiente_estado)} />
                                                <ErrorMessage name="ambiente_estado" component="span" className="p-error" />
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
TbledificioambienteAddPage.defaultProps = {
	primaryKey: 'ambiente_id',
	pageName: 'tbledificioambiente',
	apiPath: 'tbledificioambiente/add',
	routeName: 'tbledificioambienteadd',
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
export default TbledificioambienteAddPage;
