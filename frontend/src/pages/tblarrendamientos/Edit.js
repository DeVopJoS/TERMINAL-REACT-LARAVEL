import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const TblarrendamientosEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		ambiente_id: yup.number().nullable().label("Ambiente Id"),
		num_contrato: yup.string().required().label("Num Contrato"),
		operador_nombre: yup.string().required().label("Operador Nombre"),
		arrendatario_nombre: yup.string().required().label("Arrendatario Nombre"),
		arrendatario_apellido_paterno: yup.string().nullable().label("Arrendatario Apellido Paterno"),
		arrendatario_apellido_materno: yup.string().nullable().label("Arrendatario Apellido Materno"),
		arrendatario_ci: yup.string().nullable().label("Arrendatario Ci"),
		arrendatario_nombre_comercial: yup.string().required().label("Arrendatario Nombre Comercial"),
		arrendatario_telefono: yup.string().nullable().label("Arrendatario Telefono"),
		arrendatario_celular: yup.string().nullable().label("Arrendatario Celular"),
		ambiente_codigo: yup.string().required().label("Ambiente Codigo"),
		arrendamiento_fecha_inicio: yup.string().required().label("Arrendamiento Fecha Inicio"),
		arrendamiento_fecha_fin: yup.string().required().label("Arrendamiento Fecha Fin"),
		arrendamiento_canon: yup.number().required().label("Arrendamiento Canon"),
		arrendamiento_funcion: yup.string().nullable().label("Arrendamiento Funcion"),
		arrendamiento_forma_pago: yup.string().nullable().label("Arrendamiento Forma Pago"),
		arrendamiento_estado: yup.string().nullable().label("Arrendamiento Estado")
	});
	// form default values
	const formDefaultValues = {
		ambiente_id: '', 
		num_contrato: '', 
		operador_nombre: '', 
		arrendatario_nombre: '', 
		arrendatario_apellido_paterno: '', 
		arrendatario_apellido_materno: '', 
		arrendatario_ci: '', 
		arrendatario_nombre_comercial: '', 
		arrendatario_telefono: '', 
		arrendatario_celular: '', 
		ambiente_codigo: '', 
		arrendamiento_fecha_inicio: new Date(), 
		arrendamiento_fecha_fin: new Date(), 
		arrendamiento_canon: '', 
		arrendamiento_funcion: '', 
		arrendamiento_forma_pago: '', 
		arrendamiento_estado: '', 
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
			app.navigate(`/tblarrendamientos`);
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
<main id="TblarrendamientosEditPage" className="main-page">
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
                                                Ambiente Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ambiente_id"  onChange={formik.handleChange}  value={formik.values.ambiente_id}   label="Ambiente Id" type="number" placeholder="Escribir Ambiente Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.ambiente_id)} />
                                                <ErrorMessage name="ambiente_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Num Contrato *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="num_contrato"  onChange={formik.handleChange}  value={formik.values.num_contrato}   label="Num Contrato" type="text" placeholder="Escribir Num Contrato"        className={inputClassName(formik?.errors?.num_contrato)} />
                                                <ErrorMessage name="num_contrato" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Operador Nombre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="operador_nombre"  onChange={formik.handleChange}  value={formik.values.operador_nombre}   label="Operador Nombre" type="text" placeholder="Escribir Operador Nombre"        className={inputClassName(formik?.errors?.operador_nombre)} />
                                                <ErrorMessage name="operador_nombre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
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
                                                Arrendatario Apellido Paterno 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendatario_apellido_paterno"  onChange={formik.handleChange}  value={formik.values.arrendatario_apellido_paterno}   label="Arrendatario Apellido Paterno" type="text" placeholder="Escribir Arrendatario Apellido Paterno"        className={inputClassName(formik?.errors?.arrendatario_apellido_paterno)} />
                                                <ErrorMessage name="arrendatario_apellido_paterno" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendatario Apellido Materno 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendatario_apellido_materno"  onChange={formik.handleChange}  value={formik.values.arrendatario_apellido_materno}   label="Arrendatario Apellido Materno" type="text" placeholder="Escribir Arrendatario Apellido Materno"        className={inputClassName(formik?.errors?.arrendatario_apellido_materno)} />
                                                <ErrorMessage name="arrendatario_apellido_materno" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendatario Ci 
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
                                                Arrendatario Nombre Comercial *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="arrendatario_nombre_comercial"  className={inputClassName(formik?.errors?.arrendatario_nombre_comercial)}   value={formik.values.arrendatario_nombre_comercial} placeholder="Escribir Arrendatario Nombre Comercial" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="arrendatario_nombre_comercial" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendatario Telefono 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendatario_telefono"  onChange={formik.handleChange}  value={formik.values.arrendatario_telefono}   label="Arrendatario Telefono" type="text" placeholder="Escribir Arrendatario Telefono"        className={inputClassName(formik?.errors?.arrendatario_telefono)} />
                                                <ErrorMessage name="arrendatario_telefono" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendatario Celular 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendatario_celular"  onChange={formik.handleChange}  value={formik.values.arrendatario_celular}   label="Arrendatario Celular" type="text" placeholder="Escribir Arrendatario Celular"        className={inputClassName(formik?.errors?.arrendatario_celular)} />
                                                <ErrorMessage name="arrendatario_celular" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Ambiente Codigo *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ambiente_codigo"  onChange={formik.handleChange}  value={formik.values.ambiente_codigo}   label="Ambiente Codigo" type="text" placeholder="Escribir Ambiente Codigo"        className={inputClassName(formik?.errors?.ambiente_codigo)} />
                                                <ErrorMessage name="ambiente_codigo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendamiento Fecha Inicio *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arrendamiento_fecha_inicio" value={formik.values.arrendamiento_fecha_inicio} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.arrendamiento_fecha_inicio)}        />
                                                <ErrorMessage name="arrendamiento_fecha_inicio" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendamiento Fecha Fin *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="arrendamiento_fecha_fin" value={formik.values.arrendamiento_fecha_fin} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.arrendamiento_fecha_fin)}        />
                                                <ErrorMessage name="arrendamiento_fecha_fin" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendamiento Canon *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendamiento_canon"  onChange={formik.handleChange}  value={formik.values.arrendamiento_canon}   label="Arrendamiento Canon" type="number" placeholder="Escribir Arrendamiento Canon"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.arrendamiento_canon)} />
                                                <ErrorMessage name="arrendamiento_canon" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendamiento Funcion 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="arrendamiento_funcion"  className={inputClassName(formik?.errors?.arrendamiento_funcion)}   value={formik.values.arrendamiento_funcion} placeholder="Escribir Arrendamiento Funcion" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="arrendamiento_funcion" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendamiento Forma Pago 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendamiento_forma_pago"  onChange={formik.handleChange}  value={formik.values.arrendamiento_forma_pago}   label="Arrendamiento Forma Pago" type="text" placeholder="Escribir Arrendamiento Forma Pago"        className={inputClassName(formik?.errors?.arrendamiento_forma_pago)} />
                                                <ErrorMessage name="arrendamiento_forma_pago" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arrendamiento Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arrendamiento_estado"  onChange={formik.handleChange}  value={formik.values.arrendamiento_estado}   label="Arrendamiento Estado" type="text" placeholder="Escribir Arrendamiento Estado"        className={inputClassName(formik?.errors?.arrendamiento_estado)} />
                                                <ErrorMessage name="arrendamiento_estado" component="span" className="p-error" />
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
TblarrendamientosEditPage.defaultProps = {
	primaryKey: 'arrendamiento_id',
	pageName: 'tblarrendamientos',
	apiPath: 'tblarrendamientos/edit',
	routeName: 'tblarrendamientosedit',
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
export default TblarrendamientosEditPage;
