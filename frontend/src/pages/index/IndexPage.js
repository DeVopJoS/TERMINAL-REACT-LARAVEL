import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import usePostForm from 'hooks/usePostForm';
export default function IndexPage() {
		const auth = useAuth();
	const app = useApp();
	const [searchParams] = useSearchParams();
	const [pageReady, setPageReady] = useState(true);
	const [rememberUser, setRememberUser] = useState(false);
	const formUrl = "auth/login";
	const formData = {
		username: '',
		password: '',
	}
	const validationSchema = yup.object().shape({
		username: yup.string().required().label(`Username or Email`),
		password: yup.string().required().label(`Password`),
	});
	function afterSubmit(loginData){
		if (loginData.token) {
			auth.login(loginData.token);
			const returnUrl = searchParams.get('redirect') || '/home';
			app.navigate(returnUrl);
		}
		else if(loginData.nextpage){
			app.navigate(loginData.nextpage);
		}
	}
	const form = {
		formUrl, formData, validationSchema, afterSubmit
	}
	const { loading, errorMsg, setErrorMsg, formik } = usePostForm(form);
	return (
		<main id="IndexPage" className="main-page">
<section className="page-section mb-3" >
    <div className="container-fluid">
        <div className="grid justify-content-center">
            <div className="col-12 sm:col-6 md:col-3 comp-grid" >
                <Title title="Inicio de sesión de usuario"  headerClass="p-3 card " titleClass="text-xl font-bold text-primary" subTitleClass="text-500" iconClass="pi pi-user" avatarSize="large" avatarClass="bg-primary"   separator={false} />
                <div className="card my-3 " >
                    <div >
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-2 p-input-icon-left w-full">
                                <i className="pi pi-user"></i>
                                <InputText name="username" id="username" label="Nombre de usuario o correo electrónico" placeholder="Nombre de usuario o correo electrónico" className="w-full" value={formik.values.username} onChange={formik.handleChange} required="required" type="text" />
                            </div>
                            <div className="mb-2 p-input-icon-left w-full">
                                <i className="pi pi-lock"></i>
                                <Password name="password" id="password" value={formik.values.password} onChange={formik.handleChange} label="Contraseña" inputClassName="w-full" feedback={false} toggleMask className="w-full" placeholder="Contraseña" required="required" />
                            </div>
                            <div className="flex justify-content-between align-items-center my-2">
                                <div className="field-checkbox">
                                    <Checkbox inputId="rememberme" checked={rememberUser} onChange={e => setRememberUser(e.checked)} />
                                    <label className="text-sm text-500" htmlFor="rememberme">Recuérdame</label>
                                </div>
                                <div>
                                    <Link to="/forgotpassword" className="p-button p-button-danger p-button-text">Restablecer la contraseña</Link>
                                    </div>
                                </div>
                                { errorMsg && <Message text={errorMsg} severity="error" /> }
                                <div className="text-center">
                                    <Button label="Iniciar sesión"  loading={loading} icon="pi pi-lock-open" className="p-button-lg p-button-raised w-full"  type="submit"> 
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card  sp-2">
                        <div className="grid gap-3 align-items-center justify-content-between">
                            <div className="col text-500 font-bold text-sm">
                                ¿No tienes una cuenta?
                            </div>
                            <div className="col-fixed">
                                <Link to="/register">
                                    <Button icon="pi pi-user" label="Registro" className="p-button-success" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
		</main>
	);
}
