import { Formik, Form, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const UsersAccounteditPage = (props) => {
		const app = useApp();
	const location = useLocation();
	// form validation schema
	const validationSchema = yup.object().shape({
		username: yup.string().required().label("Username"),
		firstname: yup.string().nullable().label("Firstname"),
		lastname: yup.string().nullable().label("Lastname"),
		photo: yup.string().nullable().label("Photo"),
		role_id: yup.number().nullable().label("Role Id"),
		account_status: yup.string().nullable().label("Account Status")
	});
	// form default values
	const formDefaultValues = {
		username: '', 
		firstname: '', 
		lastname: '', 
		photo: '', 
		role_id: '', 
		account_status: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		window.location.reload();
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
<main id="UsersAccounteditPage" className="main-page">
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
                                                Username *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="username"  onChange={formik.handleChange}  value={formik.values.username}   label="Username" type="text" placeholder="Escribir Username"        className={inputClassName(formik?.errors?.username)} />
                                                <ErrorMessage name="username" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Firstname 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="firstname"  onChange={formik.handleChange}  value={formik.values.firstname}   label="Firstname" type="text" placeholder="Escribir Firstname"        className={inputClassName(formik?.errors?.firstname)} />
                                                <ErrorMessage name="firstname" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Lastname 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="lastname"  onChange={formik.handleChange}  value={formik.values.lastname}   label="Lastname" type="text" placeholder="Escribir Lastname"        className={inputClassName(formik?.errors?.lastname)} />
                                                <ErrorMessage name="lastname" component="span" className="p-error" />
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
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Role Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="role_id"  onChange={formik.handleChange}  value={formik.values.role_id}   label="Role Id" type="number" placeholder="Escribir Role Id"  min={0}  step="any"    className={inputClassName(formik?.errors?.role_id)} />
                                                <ErrorMessage name="role_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Account Status 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="account_status"  onChange={formik.handleChange}  value={formik.values.account_status}   label="Account Status" type="text" placeholder="Escribir Account Status"        className={inputClassName(formik?.errors?.account_status)} />
                                                <ErrorMessage name="account_status" component="span" className="p-error" />
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
UsersAccounteditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'users',
	apiPath: 'account/edit',
	routeName: 'usersaccountedit',
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
export default UsersAccounteditPage;
