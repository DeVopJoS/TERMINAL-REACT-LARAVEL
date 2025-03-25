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
const TblarrendamientosdocumentosEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		arrendamiento_id: yup.number().nullable().label("Arrendamiento Id"),
		documento_tipo: yup.string().required().label("Documento Tipo"),
		documento_nombre: yup.string().required().label("Documento Nombre"),
		documento_url: yup.string().required().label("Documento Url"),
		documento_descripcion: yup.string().required().label("Documento Descripcion"),
		fecha_subida: yup.string().nullable().label("Fecha Subida"),
		documento_estado: yup.string().nullable().label("Documento Estado")
	});
	// form default values
	const formDefaultValues = {
		arrendamiento_id: '', 
		documento_tipo: '', 
		documento_nombre: '', 
		documento_url: '', 
		documento_descripcion: '', 
		fecha_subida: new Date(), 
		documento_estado: '', 
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
			app.navigate(`/tblarrendamientosdocumentos`);
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
<main id="TblarrendamientosdocumentosEditPage" className="main-page">
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
                                                Documento Tipo *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="documento_tipo"  onChange={formik.handleChange}  value={formik.values.documento_tipo}   label="Documento Tipo" type="text" placeholder="Escribir Documento Tipo"        className={inputClassName(formik?.errors?.documento_tipo)} />
                                                <ErrorMessage name="documento_tipo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Documento Nombre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="documento_nombre"  onChange={formik.handleChange}  value={formik.values.documento_nombre}   label="Documento Nombre" type="text" placeholder="Escribir Documento Nombre"        className={inputClassName(formik?.errors?.documento_nombre)} />
                                                <ErrorMessage name="documento_nombre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Documento Url *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="documento_url"  className={inputClassName(formik?.errors?.documento_url)}   value={formik.values.documento_url} placeholder="Escribir Documento Url" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="documento_url" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Documento Descripcion *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="documento_descripcion"  className={inputClassName(formik?.errors?.documento_descripcion)}   value={formik.values.documento_descripcion} placeholder="Escribir Documento Descripcion" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="documento_descripcion" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fecha Subida 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="fecha_subida" value={formik.values.fecha_subida} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.fecha_subida)}        />
                                                <ErrorMessage name="fecha_subida" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Documento Estado 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="documento_estado"  onChange={formik.handleChange}  value={formik.values.documento_estado}   label="Documento Estado" type="text" placeholder="Escribir Documento Estado"        className={inputClassName(formik?.errors?.documento_estado)} />
                                                <ErrorMessage name="documento_estado" component="span" className="p-error" />
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
TblarrendamientosdocumentosEditPage.defaultProps = {
	primaryKey: 'documento_id',
	pageName: 'tblarrendamientosdocumentos',
	apiPath: 'tblarrendamientosdocumentos/edit',
	routeName: 'tblarrendamientosdocumentosedit',
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
export default TblarrendamientosdocumentosEditPage;
