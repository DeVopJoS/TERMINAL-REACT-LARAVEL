import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblpagosarrendamientosAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		arrendamiento_id: yup.number().nullable().label("Arrendamiento Id"),
		pago_monto: yup.number().required().label("Pago Monto"),
		pago_fecha: yup.string().nullable().label("Pago Fecha"),
		pago_estado: yup.string().nullable().label("Pago Estado")
	});
	
	//form default values
	const formDefaultValues = {
		arrendamiento_id: '', 
		pago_monto: '', 
		pago_fecha: new Date(), 
		pago_estado: '', 
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
			app.navigate(`/tblpagosarrendamientos`);
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
<main id="TblpagosarrendamientosAddPage" className="main-page">
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
                                                Arrendamiento Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendamiento_id"  onChange={formik.handleChange}  value={formik.values.arrendamiento_id}   label="Arrendamiento Id" type="number" placeholder="Escribir Arrendamiento Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.arrendamiento_id)} />
                                                <ErrorMessage name="arrendamiento_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Pago Monto *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="pago_monto"  onChange={formik.handleChange}  value={formik.values.pago_monto}   label="Pago Monto" type="number" placeholder="Escribir Pago Monto"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.pago_monto)} />
                                                <ErrorMessage name="pago_monto" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Pago Fecha 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="pago_fecha" value={formik.values.pago_fecha} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.pago_fecha)}        />
                                                <ErrorMessage name="pago_fecha" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Pago Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="pago_estado"  onChange={formik.handleChange}  value={formik.values.pago_estado}   label="Pago Estado" type="text" placeholder="Escribir Pago Estado"        className={inputClassName(formik?.errors?.pago_estado)} />
                                                <ErrorMessage name="pago_estado" component="span" className="p-error" />
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
TblpagosarrendamientosAddPage.defaultProps = {
	primaryKey: 'pago_arrendamiento_id',
	pageName: 'tblpagosarrendamientos',
	apiPath: 'tblpagosarrendamientos/add',
	routeName: 'tblpagosarrendamientosadd',
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
export default TblpagosarrendamientosAddPage;
