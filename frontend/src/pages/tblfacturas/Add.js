import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblfacturasAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		n: yup.number().nullable().label("N"),
		fecha_de_la_factura: yup.string().nullable().label("Fecha De La Factura"),
		n_de_la_factura: yup.number().nullable().label("N De La Factura"),
		codigo_de_autorizacion: yup.string().nullable().label("Codigo De Autorizacion"),
		nit_ci_cliente: yup.string().nullable().label("Nit Ci Cliente"),
		complemento: yup.string().nullable().label("Complemento"),
		nombre_o_razon_social: yup.string().nullable().label("Nombre O Razon Social"),
		importe_total_de_la_venta: yup.number().nullable().label("Importe Total De La Venta"),
		importe_ice: yup.number().nullable().label("Importe Ice"),
		importe_iehd: yup.number().nullable().label("Importe Iehd"),
		importe_ipj: yup.number().nullable().label("Importe Ipj"),
		tasas: yup.number().nullable().label("Tasas"),
		otros_no_sujetos_al_iva: yup.number().nullable().label("Otros No Sujetos Al Iva"),
		exportaciones_y_operaciones_exentas: yup.number().nullable().label("Exportaciones Y Operaciones Exentas"),
		ventas_gravadas_a_tasa_cero: yup.number().nullable().label("Ventas Gravadas A Tasa Cero"),
		subtotal: yup.number().nullable().label("Subtotal"),
		descuentos_bonificaciones_y_rebajas_sujetas_al_iva: yup.number().nullable().label("Descuentos Bonificaciones Y Rebajas Sujetas Al Iva"),
		importe_gift_card: yup.number().nullable().label("Importe Gift Card"),
		importe_base_para_debito_fiscal: yup.number().nullable().label("Importe Base Para Debito Fiscal"),
		debito_fiscal: yup.number().nullable().label("Debito Fiscal"),
		estado: yup.string().nullable().label("Estado"),
		codigo_de_control: yup.string().nullable().label("Codigo De Control"),
		tipo_de_venta: yup.string().nullable().label("Tipo De Venta"),
		con_derecho_a_credito_fiscal: yup.string().nullable().label("Con Derecho A Credito Fiscal"),
		estado_consolidacion: yup.string().nullable().label("Estado Consolidacion"),
		fecha_registro: yup.string().nullable().label("Fecha Registro"),
		factura_estado: yup.string().nullable().label("Factura Estado")
	});
	
	//form default values
	const formDefaultValues = {
		n: '', 
		fecha_de_la_factura: new Date(), 
		n_de_la_factura: '', 
		codigo_de_autorizacion: '', 
		nit_ci_cliente: '', 
		complemento: '', 
		nombre_o_razon_social: '', 
		importe_total_de_la_venta: '', 
		importe_ice: '', 
		importe_iehd: '', 
		importe_ipj: '', 
		tasas: '', 
		otros_no_sujetos_al_iva: '', 
		exportaciones_y_operaciones_exentas: '', 
		ventas_gravadas_a_tasa_cero: '', 
		subtotal: '', 
		descuentos_bonificaciones_y_rebajas_sujetas_al_iva: '', 
		importe_gift_card: '', 
		importe_base_para_debito_fiscal: '', 
		debito_fiscal: '', 
		estado: '', 
		codigo_de_control: '', 
		tipo_de_venta: '', 
		con_derecho_a_credito_fiscal: '', 
		estado_consolidacion: '', 
		fecha_registro: new Date(), 
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
                                                N 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="n"  onChange={formik.handleChange}  value={formik.values.n}   label="N" type="number" placeholder="Escribir N"  min={0}  step="any"    className={inputClassName(formik?.errors?.n)} />
                                                <ErrorMessage name="n" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fecha De La Factura 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="fecha_de_la_factura" showButtonBar className={inputClassName(formik?.errors?.fecha_de_la_factura)} dateFormat="yy-mm-dd" value={formik.values.fecha_de_la_factura} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="fecha_de_la_factura" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                N De La Factura 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="n_de_la_factura"  onChange={formik.handleChange}  value={formik.values.n_de_la_factura}   label="N De La Factura" type="number" placeholder="Escribir N De La Factura"  min={0}  step="any"    className={inputClassName(formik?.errors?.n_de_la_factura)} />
                                                <ErrorMessage name="n_de_la_factura" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Codigo De Autorizacion 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="codigo_de_autorizacion"  onChange={formik.handleChange}  value={formik.values.codigo_de_autorizacion}   label="Codigo De Autorizacion" type="text" placeholder="Escribir Codigo De Autorizacion"        className={inputClassName(formik?.errors?.codigo_de_autorizacion)} />
                                                <ErrorMessage name="codigo_de_autorizacion" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Nit Ci Cliente 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nit_ci_cliente"  onChange={formik.handleChange}  value={formik.values.nit_ci_cliente}   label="Nit Ci Cliente" type="text" placeholder="Escribir Nit Ci Cliente"        className={inputClassName(formik?.errors?.nit_ci_cliente)} />
                                                <ErrorMessage name="nit_ci_cliente" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Complemento 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="complemento"  onChange={formik.handleChange}  value={formik.values.complemento}   label="Complemento" type="text" placeholder="Escribir Complemento"        className={inputClassName(formik?.errors?.complemento)} />
                                                <ErrorMessage name="complemento" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Nombre O Razon Social 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nombre_o_razon_social"  onChange={formik.handleChange}  value={formik.values.nombre_o_razon_social}   label="Nombre O Razon Social" type="text" placeholder="Escribir Nombre O Razon Social"        className={inputClassName(formik?.errors?.nombre_o_razon_social)} />
                                                <ErrorMessage name="nombre_o_razon_social" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Importe Total De La Venta 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="importe_total_de_la_venta"  onChange={formik.handleChange}  value={formik.values.importe_total_de_la_venta}   label="Importe Total De La Venta" type="number" placeholder="Escribir Importe Total De La Venta"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.importe_total_de_la_venta)} />
                                                <ErrorMessage name="importe_total_de_la_venta" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Importe Ice 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="importe_ice"  onChange={formik.handleChange}  value={formik.values.importe_ice}   label="Importe Ice" type="number" placeholder="Escribir Importe Ice"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.importe_ice)} />
                                                <ErrorMessage name="importe_ice" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Importe Iehd 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="importe_iehd"  onChange={formik.handleChange}  value={formik.values.importe_iehd}   label="Importe Iehd" type="number" placeholder="Escribir Importe Iehd"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.importe_iehd)} />
                                                <ErrorMessage name="importe_iehd" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Importe Ipj 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="importe_ipj"  onChange={formik.handleChange}  value={formik.values.importe_ipj}   label="Importe Ipj" type="number" placeholder="Escribir Importe Ipj"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.importe_ipj)} />
                                                <ErrorMessage name="importe_ipj" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Tasas 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="tasas"  onChange={formik.handleChange}  value={formik.values.tasas}   label="Tasas" type="number" placeholder="Escribir Tasas"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.tasas)} />
                                                <ErrorMessage name="tasas" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Otros No Sujetos Al Iva 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="otros_no_sujetos_al_iva"  onChange={formik.handleChange}  value={formik.values.otros_no_sujetos_al_iva}   label="Otros No Sujetos Al Iva" type="number" placeholder="Escribir Otros No Sujetos Al Iva"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.otros_no_sujetos_al_iva)} />
                                                <ErrorMessage name="otros_no_sujetos_al_iva" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Exportaciones Y Operaciones Exentas 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="exportaciones_y_operaciones_exentas"  onChange={formik.handleChange}  value={formik.values.exportaciones_y_operaciones_exentas}   label="Exportaciones Y Operaciones Exentas" type="number" placeholder="Escribir Exportaciones Y Operaciones Exentas"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.exportaciones_y_operaciones_exentas)} />
                                                <ErrorMessage name="exportaciones_y_operaciones_exentas" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ventas Gravadas A Tasa Cero 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ventas_gravadas_a_tasa_cero"  onChange={formik.handleChange}  value={formik.values.ventas_gravadas_a_tasa_cero}   label="Ventas Gravadas A Tasa Cero" type="number" placeholder="Escribir Ventas Gravadas A Tasa Cero"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.ventas_gravadas_a_tasa_cero)} />
                                                <ErrorMessage name="ventas_gravadas_a_tasa_cero" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Subtotal 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="subtotal"  onChange={formik.handleChange}  value={formik.values.subtotal}   label="Subtotal" type="number" placeholder="Escribir Subtotal"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.subtotal)} />
                                                <ErrorMessage name="subtotal" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Descuentos Bonificaciones Y Rebajas Sujetas Al Iva 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="descuentos_bonificaciones_y_rebajas_sujetas_al_iva"  onChange={formik.handleChange}  value={formik.values.descuentos_bonificaciones_y_rebajas_sujetas_al_iva}   label="Descuentos Bonificaciones Y Rebajas Sujetas Al Iva" type="number" placeholder="Escribir Descuentos Bonificaciones Y Rebajas Sujetas Al Iva"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.descuentos_bonificaciones_y_rebajas_sujetas_al_iva)} />
                                                <ErrorMessage name="descuentos_bonificaciones_y_rebajas_sujetas_al_iva" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Importe Gift Card 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="importe_gift_card"  onChange={formik.handleChange}  value={formik.values.importe_gift_card}   label="Importe Gift Card" type="number" placeholder="Escribir Importe Gift Card"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.importe_gift_card)} />
                                                <ErrorMessage name="importe_gift_card" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Importe Base Para Debito Fiscal 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="importe_base_para_debito_fiscal"  onChange={formik.handleChange}  value={formik.values.importe_base_para_debito_fiscal}   label="Importe Base Para Debito Fiscal" type="number" placeholder="Escribir Importe Base Para Debito Fiscal"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.importe_base_para_debito_fiscal)} />
                                                <ErrorMessage name="importe_base_para_debito_fiscal" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Debito Fiscal 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="debito_fiscal"  onChange={formik.handleChange}  value={formik.values.debito_fiscal}   label="Debito Fiscal" type="number" placeholder="Escribir Debito Fiscal"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.debito_fiscal)} />
                                                <ErrorMessage name="debito_fiscal" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="estado"  onChange={formik.handleChange}  value={formik.values.estado}   label="Estado" type="text" placeholder="Escribir Estado"        className={inputClassName(formik?.errors?.estado)} />
                                                <ErrorMessage name="estado" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Codigo De Control 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="codigo_de_control"  onChange={formik.handleChange}  value={formik.values.codigo_de_control}   label="Codigo De Control" type="text" placeholder="Escribir Codigo De Control"        className={inputClassName(formik?.errors?.codigo_de_control)} />
                                                <ErrorMessage name="codigo_de_control" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Tipo De Venta 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="tipo_de_venta"  onChange={formik.handleChange}  value={formik.values.tipo_de_venta}   label="Tipo De Venta" type="text" placeholder="Escribir Tipo De Venta"        className={inputClassName(formik?.errors?.tipo_de_venta)} />
                                                <ErrorMessage name="tipo_de_venta" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Con Derecho A Credito Fiscal 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="con_derecho_a_credito_fiscal"  onChange={formik.handleChange}  value={formik.values.con_derecho_a_credito_fiscal}   label="Con Derecho A Credito Fiscal" type="text" placeholder="Escribir Con Derecho A Credito Fiscal"        className={inputClassName(formik?.errors?.con_derecho_a_credito_fiscal)} />
                                                <ErrorMessage name="con_derecho_a_credito_fiscal" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Estado Consolidacion 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="estado_consolidacion"  onChange={formik.handleChange}  value={formik.values.estado_consolidacion}   label="Estado Consolidacion" type="text" placeholder="Escribir Estado Consolidacion"        className={inputClassName(formik?.errors?.estado_consolidacion)} />
                                                <ErrorMessage name="estado_consolidacion" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fecha Registro 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="fecha_registro" value={formik.values.fecha_registro} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.fecha_registro)}        />
                                                <ErrorMessage name="fecha_registro" component="span" className="p-error" />
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
