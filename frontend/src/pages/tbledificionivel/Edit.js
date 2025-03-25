import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const TbledificionivelEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		edificio_id: yup.number().nullable().label("Edificio Id"),
		nivel_nombre: yup.string().required().label("Nivel Nombre"),
		nivel_estado: yup.string().required().label("Nivel Estado")
	});
	// form default values
	const formDefaultValues = {
		edificio_id: '', 
		nivel_nombre: '', 
		nivel_estado: '', 
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
			app.navigate(`/tbledificionivel`);
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
<main id="TbledificionivelEditPage" className="main-page">
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
                                                Edificio Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="edificio_id"  onChange={formik.handleChange}  value={formik.values.edificio_id}   label="Edificio Id" type="number" placeholder="Escribir Edificio Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.edificio_id)} />
                                                <ErrorMessage name="edificio_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Nivel Nombre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="nivel_nombre"  className={inputClassName(formik?.errors?.nivel_nombre)}   value={formik.values.nivel_nombre} placeholder="Escribir Nivel Nombre" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="nivel_nombre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Nivel Estado *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nivel_estado"  onChange={formik.handleChange}  value={formik.values.nivel_estado}   label="Nivel Estado" type="text" placeholder="Escribir Nivel Estado"        className={inputClassName(formik?.errors?.nivel_estado)} />
                                                <ErrorMessage name="nivel_estado" component="span" className="p-error" />
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
TbledificionivelEditPage.defaultProps = {
	primaryKey: 'nivel_id',
	pageName: 'tbledificionivel',
	apiPath: 'tbledificionivel/edit',
	routeName: 'tbledificioniveledit',
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
export default TbledificionivelEditPage;
