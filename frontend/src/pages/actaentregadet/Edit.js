import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const ActaentregadetEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		ae_actaid: yup.number().nullable().label("Ae Actaid"),
		servicio_id: yup.number().required().label("Servicio Id"),
		aed_desdenumero: yup.number().nullable().label("Aed Desdenumero"),
		aed_hastanumero: yup.number().nullable().label("Aed Hastanumero"),
		aed_vendidohasta: yup.number().nullable().label("Aed Vendidohasta"),
		aed_cantidad: yup.number().nullable().label("Aed Cantidad"),
		aed_importebs: yup.number().nullable().label("Aed Importebs"),
		aed_estado: yup.string().nullable().label("Aed Estado"),
		aed_preciounitario: yup.number().nullable().label("Aed Preciounitario")
	});
	// form default values
	const formDefaultValues = {
		ae_actaid: '', 
		servicio_id: '', 
		aed_desdenumero: '', 
		aed_hastanumero: '', 
		aed_vendidohasta: '', 
		aed_cantidad: '', 
		aed_importebs: '', 
		aed_estado: '', 
		aed_preciounitario: '', 
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
			app.navigate(`/actaentregadet`);
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
<main id="ActaentregadetEditPage" className="main-page">
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
                                                Ae Actaid 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ae_actaid"  onChange={formik.handleChange}  value={formik.values.ae_actaid}   label="Ae Actaid" type="number" placeholder="Escribir Ae Actaid"  min={0}  step="any"    className={inputClassName(formik?.errors?.ae_actaid)} />
                                                <ErrorMessage name="ae_actaid" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Servicio Id *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="servicio_id"  onChange={formik.handleChange}  value={formik.values.servicio_id}   label="Servicio Id" type="number" placeholder="Escribir Servicio Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.servicio_id)} />
                                                <ErrorMessage name="servicio_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Desdenumero 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_desdenumero"  onChange={formik.handleChange}  value={formik.values.aed_desdenumero}   label="Aed Desdenumero" type="number" placeholder="Escribir Aed Desdenumero"  min={0}  step="any"    className={inputClassName(formik?.errors?.aed_desdenumero)} />
                                                <ErrorMessage name="aed_desdenumero" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Hastanumero 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_hastanumero"  onChange={formik.handleChange}  value={formik.values.aed_hastanumero}   label="Aed Hastanumero" type="number" placeholder="Escribir Aed Hastanumero"  min={0}  step="any"    className={inputClassName(formik?.errors?.aed_hastanumero)} />
                                                <ErrorMessage name="aed_hastanumero" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Vendidohasta 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_vendidohasta"  onChange={formik.handleChange}  value={formik.values.aed_vendidohasta}   label="Aed Vendidohasta" type="number" placeholder="Escribir Aed Vendidohasta"  min={0}  step="any"    className={inputClassName(formik?.errors?.aed_vendidohasta)} />
                                                <ErrorMessage name="aed_vendidohasta" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Cantidad 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_cantidad"  onChange={formik.handleChange}  value={formik.values.aed_cantidad}   label="Aed Cantidad" type="number" placeholder="Escribir Aed Cantidad"  min={0}  step="any"    className={inputClassName(formik?.errors?.aed_cantidad)} />
                                                <ErrorMessage name="aed_cantidad" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Importebs 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_importebs"  onChange={formik.handleChange}  value={formik.values.aed_importebs}   label="Aed Importebs" type="number" placeholder="Escribir Aed Importebs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.aed_importebs)} />
                                                <ErrorMessage name="aed_importebs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_estado"  onChange={formik.handleChange}  value={formik.values.aed_estado}   label="Aed Estado" type="text" placeholder="Escribir Aed Estado"        className={inputClassName(formik?.errors?.aed_estado)} />
                                                <ErrorMessage name="aed_estado" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Aed Preciounitario 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="aed_preciounitario"  onChange={formik.handleChange}  value={formik.values.aed_preciounitario}   label="Aed Preciounitario" type="number" placeholder="Escribir Aed Preciounitario"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.aed_preciounitario)} />
                                                <ErrorMessage name="aed_preciounitario" component="span" className="p-error" />
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
ActaentregadetEditPage.defaultProps = {
	primaryKey: 'aed_actaid',
	pageName: 'actaentregadet',
	apiPath: 'actaentregadet/edit',
	routeName: 'actaentregadetedit',
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
export default ActaentregadetEditPage;
