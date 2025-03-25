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
const TblfacturasAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		arrendatario_nombre: yup.string().required().label("Arrendatario Nombre"),
		arrendatario_ci: yup.string().required().label("Arrendatario Ci"),
		factura_numero: yup.string().required().label("Factura Numero"),
		factura_fecha_emision: yup.string().nullable().label("Factura Fecha Emision"),
		factura_total: yup.number().required().label("Factura Total"),
		factura_fecha_pago: yup.string().nullable().label("Factura Fecha Pago"),
		factura_estado: yup.string().nullable().label("Factura Estado")
	});
	
	//form default values
	const formDefaultValues = {
		arrendatario_nombre: '', 
		arrendatario_ci: '', 
		factura_numero: '', 
		factura_fecha_emision: new Date(), 
		factura_total: '', 
		factura_fecha_pago: new Date(), 
		factura_estado: '', 
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
			app.navigate(`/tblfacturas`);
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
<main id="TblfacturasAddPage" className="main-page">
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
                                                Arrendatario Nombre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="arrendatario_nombre"  className={inputClassName(formik?.errors?.arrendatario_nombre)}   value={formik.values.arrendatario_nombre} placeholder="Escribir Arrendatario Nombre" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="arrendatario_nombre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendatario Ci *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendatario_ci"  onChange={formik.handleChange}  value={formik.values.arrendatario_ci}   label="Arrendatario Ci" type="text" placeholder="Escribir Arrendatario Ci"        className={inputClassName(formik?.errors?.arrendatario_ci)} />
                                                <ErrorMessage name="arrendatario_ci" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Factura Numero *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="factura_numero"  className={inputClassName(formik?.errors?.factura_numero)}   value={formik.values.factura_numero} placeholder="Escribir Factura Numero" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="factura_numero" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Factura Fecha Emision 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="factura_fecha_emision" value={formik.values.factura_fecha_emision} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.factura_fecha_emision)}        />
                                                <ErrorMessage name="factura_fecha_emision" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Factura Total *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="factura_total"  onChange={formik.handleChange}  value={formik.values.factura_total}   label="Factura Total" type="number" placeholder="Escribir Factura Total"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.factura_total)} />
                                                <ErrorMessage name="factura_total" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Factura Fecha Pago 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="factura_fecha_pago" value={formik.values.factura_fecha_pago} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.factura_fecha_pago)}        />
                                                <ErrorMessage name="factura_fecha_pago" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Factura Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="factura_estado"  onChange={formik.handleChange}  value={formik.values.factura_estado}   label="Factura Estado" type="text" placeholder="Escribir Factura Estado"        className={inputClassName(formik?.errors?.factura_estado)} />
                                                <ErrorMessage name="factura_estado" component="span" className="p-error" />
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
TblfacturasAddPage.defaultProps = {
	primaryKey: 'factura_id',
	pageName: 'tblfacturas',
	apiPath: 'tblfacturas/add',
	routeName: 'tblfacturasadd',
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
export default TblfacturasAddPage;
