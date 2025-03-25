import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblvehiculosAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		vehiculo_nombre: yup.string().required().label("Vehiculo Nombre"),
		vehiculo_celular: yup.string().required().label("Vehiculo Celular"),
		vehiculo_placa: yup.string().required().label("Vehiculo Placa")
	});
	
	//form default values
	const formDefaultValues = {
		vehiculo_nombre: '', 
		vehiculo_celular: '', 
		vehiculo_placa: '', 
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
			app.navigate(`/tblvehiculos`);
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
<main id="TblvehiculosAddPage" className="main-page">
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
                                                Vehiculo Nombre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="vehiculo_nombre"  onChange={formik.handleChange}  value={formik.values.vehiculo_nombre}   label="Vehiculo Nombre" type="text" placeholder="Escribir Vehiculo Nombre"        className={inputClassName(formik?.errors?.vehiculo_nombre)} />
                                                <ErrorMessage name="vehiculo_nombre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Vehiculo Celular *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="vehiculo_celular"  onChange={formik.handleChange}  value={formik.values.vehiculo_celular}   label="Vehiculo Celular" type="text" placeholder="Escribir Vehiculo Celular"        className={inputClassName(formik?.errors?.vehiculo_celular)} />
                                                <ErrorMessage name="vehiculo_celular" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Vehiculo Placa *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="vehiculo_placa"  onChange={formik.handleChange}  value={formik.values.vehiculo_placa}   label="Vehiculo Placa" type="text" placeholder="Escribir Vehiculo Placa"        className={inputClassName(formik?.errors?.vehiculo_placa)} />
                                                <ErrorMessage name="vehiculo_placa" component="span" className="p-error" />
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
TblvehiculosAddPage.defaultProps = {
	primaryKey: 'vehiculo_id',
	pageName: 'tblvehiculos',
	apiPath: 'tblvehiculos/add',
	routeName: 'tblvehiculosadd',
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
export default TblvehiculosAddPage;
