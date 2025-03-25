import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblparquimetrosAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		vehiculo_id: yup.number().nullable().label("Vehiculo Id"),
		punto_servicio_id: yup.number().nullable().label("Punto Servicio Id"),
		parquimetro_hora_inicio: yup.string().required().label("Parquimetro Hora Inicio"),
		parquimetro_hora_fin: yup.string().required().label("Parquimetro Hora Fin"),
		parquimetro_monto: yup.number().required().label("Parquimetro Monto")
	});
	
	//form default values
	const formDefaultValues = {
		vehiculo_id: '', 
		punto_servicio_id: '', 
		parquimetro_hora_inicio: new Date(), 
		parquimetro_hora_fin: new Date(), 
		parquimetro_monto: '', 
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
			app.navigate(`/tblparquimetros`);
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
<main id="TblparquimetrosAddPage" className="main-page">
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
                                                Vehiculo Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="vehiculo_id"  onChange={formik.handleChange}  value={formik.values.vehiculo_id}   label="Vehiculo Id" type="number" placeholder="Escribir Vehiculo Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.vehiculo_id)} />
                                                <ErrorMessage name="vehiculo_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Punto Servicio Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="punto_servicio_id"  onChange={formik.handleChange}  value={formik.values.punto_servicio_id}   label="Punto Servicio Id" type="number" placeholder="Escribir Punto Servicio Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.punto_servicio_id)} />
                                                <ErrorMessage name="punto_servicio_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Parquimetro Hora Inicio *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="parquimetro_hora_inicio" value={formik.values.parquimetro_hora_inicio} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.parquimetro_hora_inicio)}        />
                                                <ErrorMessage name="parquimetro_hora_inicio" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Parquimetro Hora Fin *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="parquimetro_hora_fin" value={formik.values.parquimetro_hora_fin} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.parquimetro_hora_fin)}        />
                                                <ErrorMessage name="parquimetro_hora_fin" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Parquimetro Monto *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="parquimetro_monto"  onChange={formik.handleChange}  value={formik.values.parquimetro_monto}   label="Parquimetro Monto" type="number" placeholder="Escribir Parquimetro Monto"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.parquimetro_monto)} />
                                                <ErrorMessage name="parquimetro_monto" component="span" className="p-error" />
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
TblparquimetrosAddPage.defaultProps = {
	primaryKey: 'parquimetro_id',
	pageName: 'tblparquimetros',
	apiPath: 'tblparquimetros/add',
	routeName: 'tblparquimetrosadd',
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
export default TblparquimetrosAddPage;
