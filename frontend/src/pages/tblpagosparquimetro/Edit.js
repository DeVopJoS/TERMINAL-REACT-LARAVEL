import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const TblpagosparquimetroEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		parquimetro_id: yup.number().nullable().label("Parquimetro Id"),
		pago_monto: yup.number().required().label("Pago Monto"),
		pago_fecha: yup.string().nullable().label("Pago Fecha")
	});
	// form default values
	const formDefaultValues = {
		parquimetro_id: '', 
		pago_monto: '', 
		pago_fecha: new Date(), 
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
			app.navigate(`/tblpagosparquimetro`);
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
<main id="TblpagosparquimetroEditPage" className="main-page">
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
                                                Parquimetro Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="parquimetro_id"  onChange={formik.handleChange}  value={formik.values.parquimetro_id}   label="Parquimetro Id" type="number" placeholder="Escribir Parquimetro Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.parquimetro_id)} />
                                                <ErrorMessage name="parquimetro_id" component="span" className="p-error" />
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
                                                <Calendar name="pago_fecha" showButtonBar className={inputClassName(formik?.errors?.pago_fecha)} dateFormat="yy-mm-dd" value={formik.values.pago_fecha} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="pago_fecha" component="span" className="p-error" />
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
TblpagosparquimetroEditPage.defaultProps = {
	primaryKey: 'pago_parquimetro_id',
	pageName: 'tblpagosparquimetro',
	apiPath: 'tblpagosparquimetro/edit',
	routeName: 'tblpagosparquimetroedit',
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
export default TblpagosparquimetroEditPage;
