import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { CheckDuplicate } from 'components/CheckDuplicate';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import useAddPage from 'hooks/useAddPage';
const RegisterPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		username: yup.string().required().label("Username"),
		email: yup.string().email().required().label("Email"),
		password: yup.string().required().label("Password"),
		confirm_password: yup.string().required().label("Confirm Password").oneOf([yup.ref('password')], "Your passwords do not match"),
		photo: yup.string().nullable().label("Photo")
	});
	
	//form default values
	const formDefaultValues = {
		username: '', 
		email: '', 
		password: '', 
		confirm_password: '', 
		photo: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		const nextPage = response.nextpage || '/home';
		if (response.token) {
			auth.login(response.token, false);
			app.navigate(nextPage);
		}
		else{
			app.navigate(nextPage);
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
<main id="UsersUserregisterPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3 mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className=" col " >
                    <Title title="Registro de usuario"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-12 md:col-4 comp-grid" >
                    <div className="">
                        <div className="flex align-items-center">
                            <div>¿Ya tienes una cuenta?</div>
                            <div className="ml-2">
                                <Link to="/">
                                    <Button icon="pi pi-user" label="Iniciar sesión" /> 
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                                                    Username *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <CheckDuplicate value={formik.values.username} apiPath="components_data/users_username_exist">
                                                    { (checker) => 
                                                    <>
                                                    <InputText name="username" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.username}   label="Username" type="text" placeholder="Escribir Username"        className={inputClassName(formik?.errors?.username)} />
                                                    <ErrorMessage name="username" component="span" className="p-error" />
                                                    {(!checker.loading && checker.exist) && <small className="p-error">No disponible</small>}
                                                    {checker.loading && <small className="text-500">Checking...</small> }
                                                    </>
                                                    }
                                                    </CheckDuplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    Email *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <CheckDuplicate value={formik.values.email} apiPath="components_data/users_email_exist">
                                                    { (checker) => 
                                                    <>
                                                    <InputText name="email" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.email}   label="Email" type="email" placeholder="Escribir Email"        className={inputClassName(formik?.errors?.email)} />
                                                    <ErrorMessage name="email" component="span" className="p-error" />
                                                    {(!checker.loading && checker.exist) && <small className="p-error">No disponible</small>}
                                                    {checker.loading && <small className="text-500">Checking...</small> }
                                                    </>
                                                    }
                                                    </CheckDuplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    Password *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <Password name="password" value={formik.values.password} onChange={formik.handleChange} label="Password" placeholder="Escribir Password"  inputClassName="w-full" toggleMask feedback className={inputClassName(formik?.errors?.password)} />
                                                    <ErrorMessage name="password" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    Confirm Password *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <Password name="confirm_password" id="confirm_password" className={inputClassName(formik?.errors?.comfirm_password)} inputClassName="w-full" feedback={false} toggleMask  value={formik.values.confirm_password} onChange={formik.handleChange} label="Confirmar contraseña" placeholder="Confirmar contraseña"  />
                                                    <ErrorMessage name="confirm_password" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    Photo 
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <div className={inputClassName(formik?.errors?.photo)}>
                                                        <Uploader name="photo" showUploadedFiles value={formik.values.photo} uploadPath="fileuploader/upload/photo" onChange={(paths) => formik.setFieldValue('photo', paths)} fileLimit={1} maxFileSize={3} accept=".jpg,.png,.gif,.jpeg" multiple={false} label="Elija archivos o suelte archivos aquí" onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                    </div>
                                                    <ErrorMessage name="photo" component="span" className="p-error" />
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
RegisterPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'users',
	apiPath: 'auth/register',
	routeName: 'usersuserregister',
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
export default RegisterPage;
