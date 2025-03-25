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
const ArqueocabAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		arqueoid: yup.number().required().label("Arqueoid"),
		arqueonumero: yup.number().required().label("Arqueonumero"),
		arqueofecha: yup.string().required().label("Arqueofecha"),
		arqueoturno: yup.string().required().label("Arqueoturno"),
		arqueohorainicio: yup.string().required().label("Arqueohorainicio"),
		arqueohorafin: yup.string().required().label("Arqueohorafin"),
		arqueosupervisor: yup.number().nullable().label("Arqueosupervisor"),
		arqueorealizadopor: yup.number().nullable().label("Arqueorealizadopor"),
		arqueorevisadopor: yup.number().nullable().label("Arqueorevisadopor"),
		arqueorecaudaciontotal: yup.number().nullable().label("Arqueorecaudaciontotal"),
		arqueodiferencia: yup.number().nullable().label("Arqueodiferencia"),
		arqueoobservacion: yup.string().nullable().label("Arqueoobservacion"),
		arqueoestado: yup.string().nullable().label("Arqueoestado"),
		arqueofecharegistro: yup.string().nullable().label("Arqueofecharegistro"),
		arqueousuario: yup.number().nullable().label("Arqueousuario")
	});
	
	//form default values
	const formDefaultValues = {
		arqueoid: '', 
		arqueonumero: '', 
		arqueofecha: new Date(), 
		arqueoturno: '', 
		arqueohorainicio: new Date(), 
		arqueohorafin: new Date(), 
		arqueosupervisor: '', 
		arqueorealizadopor: '', 
		arqueorevisadopor: '', 
		arqueorecaudaciontotal: '', 
		arqueodiferencia: '', 
		arqueoobservacion: '', 
		arqueoestado: '', 
		arqueofecharegistro: new Date(), 
		arqueousuario: '', 
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
			app.navigate(`/arqueocab`);
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
<main id="ArqueocabAddPage" className="main-page">
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
                                                Arqueoid *
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
                                                Arqueonumero *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueonumero"  onChange={formik.handleChange}  value={formik.values.arqueonumero}   label="Arqueonumero" type="number" placeholder="Escribir Arqueonumero"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueonumero)} />
                                                <ErrorMessage name="arqueonumero" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueofecha *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arqueofecha" value={formik.values.arqueofecha} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.arqueofecha)}        />
                                                <ErrorMessage name="arqueofecha" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueoturno *
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
                                                Arqueohorainicio *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arqueohorainicio" value={formik.values.arqueohorainicio} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.arqueohorainicio)}        />
                                                <ErrorMessage name="arqueohorainicio" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueohorafin *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arqueohorafin" value={formik.values.arqueohorafin} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.arqueohorafin)}        />
                                                <ErrorMessage name="arqueohorafin" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueosupervisor 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueosupervisor"  onChange={formik.handleChange}  value={formik.values.arqueosupervisor}   label="Arqueosupervisor" type="number" placeholder="Escribir Arqueosupervisor"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueosupervisor)} />
                                                <ErrorMessage name="arqueosupervisor" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueorealizadopor 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueorealizadopor"  onChange={formik.handleChange}  value={formik.values.arqueorealizadopor}   label="Arqueorealizadopor" type="number" placeholder="Escribir Arqueorealizadopor"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueorealizadopor)} />
                                                <ErrorMessage name="arqueorealizadopor" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueorevisadopor 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueorevisadopor"  onChange={formik.handleChange}  value={formik.values.arqueorevisadopor}   label="Arqueorevisadopor" type="number" placeholder="Escribir Arqueorevisadopor"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueorevisadopor)} />
                                                <ErrorMessage name="arqueorevisadopor" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueorecaudaciontotal 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueorecaudaciontotal"  onChange={formik.handleChange}  value={formik.values.arqueorecaudaciontotal}   label="Arqueorecaudaciontotal" type="number" placeholder="Escribir Arqueorecaudaciontotal"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.arqueorecaudaciontotal)} />
                                                <ErrorMessage name="arqueorecaudaciontotal" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueodiferencia 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueodiferencia"  onChange={formik.handleChange}  value={formik.values.arqueodiferencia}   label="Arqueodiferencia" type="number" placeholder="Escribir Arqueodiferencia"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.arqueodiferencia)} />
                                                <ErrorMessage name="arqueodiferencia" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueoobservacion 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="arqueoobservacion"  className={inputClassName(formik?.errors?.arqueoobservacion)}   value={formik.values.arqueoobservacion} placeholder="Escribir Arqueoobservacion" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="arqueoobservacion" component="span" className="p-error" />
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
                                                Arqueousuario 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueousuario"  onChange={formik.handleChange}  value={formik.values.arqueousuario}   label="Arqueousuario" type="number" placeholder="Escribir Arqueousuario"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueousuario)} />
                                                <ErrorMessage name="arqueousuario" component="span" className="p-error" />
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
ArqueocabAddPage.defaultProps = {
	primaryKey: 'arqueoid',
	pageName: 'arqueocab',
	apiPath: 'arqueocab/add',
	routeName: 'arqueocabadd',
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
export default ArqueocabAddPage;
