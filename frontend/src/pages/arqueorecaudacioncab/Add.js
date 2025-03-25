import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const ArqueorecaudacioncabAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		arqueocorrelativo: yup.number().nullable().label("Arqueocorrelativo"),
		arqueofecha: yup.string().required().label("Arqueofecha"),
		arqueoturno: yup.string().nullable().label("Arqueoturno"),
		punto_recaud_id: yup.string().required().label("Punto Recaud Id"),
		arqueonombreoperador: yup.string().nullable().label("Arqueonombreoperador"),
		arqueousuario: yup.number().nullable().label("Arqueousuario"),
		arqueofecharegistro: yup.string().nullable().label("Arqueofecharegistro"),
		arqueoid: yup.number().nullable().label("Arqueoid"),
		arqueoestado: yup.string().nullable().label("Arqueoestado")
	});
	
	//form default values
	const formDefaultValues = {
		arqueocorrelativo: '', 
		arqueofecha: new Date(), 
		arqueoturno: '', 
		punto_recaud_id: '', 
		arqueonombreoperador: '', 
		arqueousuario: '', 
		arqueofecharegistro: new Date(), 
		arqueoid: '', 
		arqueoestado: '', 
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
			app.navigate(`/arqueorecaudacioncab`);
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
<main id="ArqueorecaudacioncabAddPage" className="main-page">
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
                                                Arqueocorrelativo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorrelativo"  onChange={formik.handleChange}  value={formik.values.arqueocorrelativo}   label="Arqueocorrelativo" type="number" placeholder="Escribir Arqueocorrelativo"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorrelativo)} />
                                                <ErrorMessage name="arqueocorrelativo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueofecha *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arqueofecha" showButtonBar className={inputClassName(formik?.errors?.arqueofecha)} dateFormat="yy-mm-dd" value={formik.values.arqueofecha} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="arqueofecha" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueoturno 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueoturno"  onChange={formik.handleChange}  value={formik.values.arqueoturno}   label="Arqueoturno" type="text" placeholder="Escribir Arqueoturno"        className={inputClassName(formik?.errors?.arqueoturno)} />
                                                <ErrorMessage name="arqueoturno" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Punto Recaud Id *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/punto_recaud_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="punto_recaud_id"     optionLabel="label" optionValue="value" value={formik.values.punto_recaud_id} onChange={formik.handleChange} options={response} label="Punto Recaud Id"  placeholder="Seleccione un valor"  className={inputClassName(formik?.errors?.punto_recaud_id)}   />
                                                    <ErrorMessage name="punto_recaud_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueonombreoperador 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="arqueonombreoperador"  className={inputClassName(formik?.errors?.arqueonombreoperador)}   value={formik.values.arqueonombreoperador} placeholder="Escribir Arqueonombreoperador" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="arqueonombreoperador" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueousuario 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueousuario"  onChange={formik.handleChange}  value={formik.values.arqueousuario}   label="Arqueousuario" type="number" placeholder="Escribir Arqueousuario"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueousuario)} />
                                                <ErrorMessage name="arqueousuario" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueofecharegistro 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arqueofecharegistro" value={formik.values.arqueofecharegistro} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.arqueofecharegistro)}        />
                                                <ErrorMessage name="arqueofecharegistro" component="span" className="p-error" />
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
ArqueorecaudacioncabAddPage.defaultProps = {
	primaryKey: 'arqueorecid',
	pageName: 'arqueorecaudacioncab',
	apiPath: 'arqueorecaudacioncab/add',
	routeName: 'arqueorecaudacioncabadd',
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
export default ArqueorecaudacioncabAddPage;
