import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const ArqueorecaudaciondetEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		arqueorecid: yup.string().required().label("Arqueorecid"),
		servicio_id: yup.string().required().label("Servicio Id"),
		arqueodetcantidad: yup.number().required().label("Arqueodetcantidad"),
		arqueodettarifabs: yup.number().required().label("Arqueodettarifabs"),
		arqueodetimportebs: yup.number().required().label("Arqueodetimportebs"),
		arqueoestado: yup.string().nullable().label("Arqueoestado")
	});
	// form default values
	const formDefaultValues = {
		arqueorecid: '', 
		servicio_id: '', 
		arqueodetcantidad: '', 
		arqueodettarifabs: '', 
		arqueodetimportebs: '', 
		arqueoestado: '', 
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
			app.navigate(`/arqueorecaudaciondet`);
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
<main id="ArqueorecaudaciondetEditPage" className="main-page">
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
                                                Arqueorecid *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/arqueorecid_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="arqueorecid"     optionLabel="label" optionValue="value" value={formik.values.arqueorecid} onChange={formik.handleChange} options={response} label="Arqueorecid"  placeholder="Seleccione un valor"  className={inputClassName(formik?.errors?.arqueorecid)}   />
                                                    <ErrorMessage name="arqueorecid" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Servicio Id *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/servicio_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="servicio_id"     optionLabel="label" optionValue="value" value={formik.values.servicio_id} onChange={formik.handleChange} options={response} label="Servicio Id"  placeholder="Seleccione un valor"  className={inputClassName(formik?.errors?.servicio_id)}   />
                                                    <ErrorMessage name="servicio_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueodetcantidad *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueodetcantidad"  onChange={formik.handleChange}  value={formik.values.arqueodetcantidad}   label="Arqueodetcantidad" type="number" placeholder="Escribir Arqueodetcantidad"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueodetcantidad)} />
                                                <ErrorMessage name="arqueodetcantidad" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueodettarifabs *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueodettarifabs"  onChange={formik.handleChange}  value={formik.values.arqueodettarifabs}   label="Arqueodettarifabs" type="number" placeholder="Escribir Arqueodettarifabs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.arqueodettarifabs)} />
                                                <ErrorMessage name="arqueodettarifabs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueodetimportebs *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueodetimportebs"  onChange={formik.handleChange}  value={formik.values.arqueodetimportebs}   label="Arqueodetimportebs" type="number" placeholder="Escribir Arqueodetimportebs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.arqueodetimportebs)} />
                                                <ErrorMessage name="arqueodetimportebs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueoestado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueoestado"  onChange={formik.handleChange}  value={formik.values.arqueoestado}   label="Arqueoestado" type="text" placeholder="Escribir Arqueoestado"        className={inputClassName(formik?.errors?.arqueoestado)} />
                                                <ErrorMessage name="arqueoestado" component="span" className="p-error" />
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
ArqueorecaudaciondetEditPage.defaultProps = {
	primaryKey: 'arqueorecdetid',
	pageName: 'arqueorecaudaciondet',
	apiPath: 'arqueorecaudaciondet/edit',
	routeName: 'arqueorecaudaciondetedit',
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
export default ArqueorecaudaciondetEditPage;
