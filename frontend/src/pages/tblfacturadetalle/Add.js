import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblfacturadetalleAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		factura_id: yup.number().nullable().label("Factura Id"),
		arrendamiento_id: yup.number().nullable().label("Arrendamiento Id"),
		fact_detalle_periodo_pago: yup.string().required().label("Fact Detalle Periodo Pago"),
		fact_detalle_canon_alquiler: yup.number().required().label("Fact Detalle Canon Alquiler"),
		fact_detalle_morosidad_penalidad: yup.number().nullable().label("Fact Detalle Morosidad Penalidad"),
		fact_detalle_dias_morosidad: yup.number().nullable().label("Fact Detalle Dias Morosidad"),
		fact_detalle_total_mora: yup.number().nullable().label("Fact Detalle Total Mora"),
		fact_detalle_importe_bs: yup.number().required().label("Fact Detalle Importe Bs"),
		fact_detalle_observaciones: yup.string().nullable().label("Fact Detalle Observaciones")
	});
	
	//form default values
	const formDefaultValues = {
		factura_id: '', 
		arrendamiento_id: '', 
		fact_detalle_periodo_pago: '', 
		fact_detalle_canon_alquiler: '', 
		fact_detalle_morosidad_penalidad: '', 
		fact_detalle_dias_morosidad: '', 
		fact_detalle_total_mora: '', 
		fact_detalle_importe_bs: '', 
		fact_detalle_observaciones: '', 
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
			app.navigate(`/tblfacturadetalle`);
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
<main id="TblfacturadetalleAddPage" className="main-page">
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
                                                Factura Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="factura_id"  onChange={formik.handleChange}  value={formik.values.factura_id}   label="Factura Id" type="number" placeholder="Escribir Factura Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.factura_id)} />
                                                <ErrorMessage name="factura_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
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
                                                Fact Detalle Periodo Pago *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="fact_detalle_periodo_pago"  className={inputClassName(formik?.errors?.fact_detalle_periodo_pago)}   value={formik.values.fact_detalle_periodo_pago} placeholder="Escribir Fact Detalle Periodo Pago" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="fact_detalle_periodo_pago" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fact Detalle Canon Alquiler *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fact_detalle_canon_alquiler"  onChange={formik.handleChange}  value={formik.values.fact_detalle_canon_alquiler}   label="Fact Detalle Canon Alquiler" type="number" placeholder="Escribir Fact Detalle Canon Alquiler"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.fact_detalle_canon_alquiler)} />
                                                <ErrorMessage name="fact_detalle_canon_alquiler" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fact Detalle Morosidad Penalidad 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fact_detalle_morosidad_penalidad"  onChange={formik.handleChange}  value={formik.values.fact_detalle_morosidad_penalidad}   label="Fact Detalle Morosidad Penalidad" type="number" placeholder="Escribir Fact Detalle Morosidad Penalidad"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.fact_detalle_morosidad_penalidad)} />
                                                <ErrorMessage name="fact_detalle_morosidad_penalidad" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fact Detalle Dias Morosidad 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fact_detalle_dias_morosidad"  onChange={formik.handleChange}  value={formik.values.fact_detalle_dias_morosidad}   label="Fact Detalle Dias Morosidad" type="number" placeholder="Escribir Fact Detalle Dias Morosidad"  min={0}  step="any"    className={inputClassName(formik?.errors?.fact_detalle_dias_morosidad)} />
                                                <ErrorMessage name="fact_detalle_dias_morosidad" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fact Detalle Total Mora 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fact_detalle_total_mora"  onChange={formik.handleChange}  value={formik.values.fact_detalle_total_mora}   label="Fact Detalle Total Mora" type="number" placeholder="Escribir Fact Detalle Total Mora"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.fact_detalle_total_mora)} />
                                                <ErrorMessage name="fact_detalle_total_mora" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fact Detalle Importe Bs *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fact_detalle_importe_bs"  onChange={formik.handleChange}  value={formik.values.fact_detalle_importe_bs}   label="Fact Detalle Importe Bs" type="number" placeholder="Escribir Fact Detalle Importe Bs"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.fact_detalle_importe_bs)} />
                                                <ErrorMessage name="fact_detalle_importe_bs" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fact Detalle Observaciones 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="fact_detalle_observaciones"  className={inputClassName(formik?.errors?.fact_detalle_observaciones)}   value={formik.values.fact_detalle_observaciones} placeholder="Escribir Fact Detalle Observaciones" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="fact_detalle_observaciones" component="span" className="p-error" />
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
TblfacturadetalleAddPage.defaultProps = {
	primaryKey: 'detalle_id',
	pageName: 'tblfacturadetalle',
	apiPath: 'tblfacturadetalle/add',
	routeName: 'tblfacturadetalleadd',
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
export default TblfacturadetalleAddPage;
