import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const ArqueodetcortesEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		arqueodetcorteid: yup.number().required().label("Arqueodetcorteid"),
		arqueoid: yup.number().nullable().label("Arqueoid"),
		arqueocorte200_00: yup.number().nullable().label("Arqueocorte200 00"),
		arqueocorte100_00: yup.number().nullable().label("Arqueocorte100 00"),
		arqueocorte050_00: yup.number().nullable().label("Arqueocorte050 00"),
		arqueocorte020_00: yup.number().nullable().label("Arqueocorte020 00"),
		arqueocorte010_00: yup.number().nullable().label("Arqueocorte010 00"),
		arqueocorte005_00: yup.number().nullable().label("Arqueocorte005 00"),
		arqueocorte002_00: yup.number().nullable().label("Arqueocorte002 00"),
		arqueocorte001_00: yup.number().nullable().label("Arqueocorte001 00"),
		arqueocorte000_50: yup.number().nullable().label("Arqueocorte000 50"),
		arqueocorte000_20: yup.number().nullable().label("Arqueocorte000 20"),
		arqueocorte000_10: yup.number().nullable().label("Arqueocorte000 10"),
		arqueoestado: yup.string().nullable().label("Arqueoestado")
	});
	// form default values
	const formDefaultValues = {
		arqueodetcorteid: '', 
		arqueoid: '', 
		arqueocorte200_00: '', 
		arqueocorte100_00: '', 
		arqueocorte050_00: '', 
		arqueocorte020_00: '', 
		arqueocorte010_00: '', 
		arqueocorte005_00: '', 
		arqueocorte002_00: '', 
		arqueocorte001_00: '', 
		arqueocorte000_50: '', 
		arqueocorte000_20: '', 
		arqueocorte000_10: '', 
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
			app.navigate(`/arqueodetcortes`);
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
<main id="ArqueodetcortesEditPage" className="main-page">
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
                                                Arqueodetcorteid *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueodetcorteid"  onChange={formik.handleChange}  value={formik.values.arqueodetcorteid}   label="Arqueodetcorteid" type="number" placeholder="Escribir Arqueodetcorteid"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueodetcorteid)} />
                                                <ErrorMessage name="arqueodetcorteid" component="span" className="p-error" />
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
                                                Arqueocorte200 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte200_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte200_00}   label="Arqueocorte200 00" type="number" placeholder="Escribir Arqueocorte200 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte200_00)} />
                                                <ErrorMessage name="arqueocorte200_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte100 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte100_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte100_00}   label="Arqueocorte100 00" type="number" placeholder="Escribir Arqueocorte100 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte100_00)} />
                                                <ErrorMessage name="arqueocorte100_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte050 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte050_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte050_00}   label="Arqueocorte050 00" type="number" placeholder="Escribir Arqueocorte050 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte050_00)} />
                                                <ErrorMessage name="arqueocorte050_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte020 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte020_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte020_00}   label="Arqueocorte020 00" type="number" placeholder="Escribir Arqueocorte020 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte020_00)} />
                                                <ErrorMessage name="arqueocorte020_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte010 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte010_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte010_00}   label="Arqueocorte010 00" type="number" placeholder="Escribir Arqueocorte010 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte010_00)} />
                                                <ErrorMessage name="arqueocorte010_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte005 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte005_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte005_00}   label="Arqueocorte005 00" type="number" placeholder="Escribir Arqueocorte005 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte005_00)} />
                                                <ErrorMessage name="arqueocorte005_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte002 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte002_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte002_00}   label="Arqueocorte002 00" type="number" placeholder="Escribir Arqueocorte002 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte002_00)} />
                                                <ErrorMessage name="arqueocorte002_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte001 00 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte001_00"  onChange={formik.handleChange}  value={formik.values.arqueocorte001_00}   label="Arqueocorte001 00" type="number" placeholder="Escribir Arqueocorte001 00"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte001_00)} />
                                                <ErrorMessage name="arqueocorte001_00" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte000 50 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte000_50"  onChange={formik.handleChange}  value={formik.values.arqueocorte000_50}   label="Arqueocorte000 50" type="number" placeholder="Escribir Arqueocorte000 50"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte000_50)} />
                                                <ErrorMessage name="arqueocorte000_50" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte000 20 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte000_20"  onChange={formik.handleChange}  value={formik.values.arqueocorte000_20}   label="Arqueocorte000 20" type="number" placeholder="Escribir Arqueocorte000 20"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte000_20)} />
                                                <ErrorMessage name="arqueocorte000_20" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Arqueocorte000 10 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="arqueocorte000_10"  onChange={formik.handleChange}  value={formik.values.arqueocorte000_10}   label="Arqueocorte000 10" type="number" placeholder="Escribir Arqueocorte000 10"  min={0}  step="any"    className={inputClassName(formik?.errors?.arqueocorte000_10)} />
                                                <ErrorMessage name="arqueocorte000_10" component="span" className="p-error" />
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
ArqueodetcortesEditPage.defaultProps = {
	primaryKey: 'arqueodetcorteid',
	pageName: 'arqueodetcortes',
	apiPath: 'arqueodetcortes/edit',
	routeName: 'arqueodetcortesedit',
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
export default ArqueodetcortesEditPage;
