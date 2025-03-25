import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import usePostForm from 'hooks/usePostForm';
export default function ForgotPassword(){
	
	const formUrl = "auth/forgotpassword";
	const formData = {
		email: '',
	}
	const validationSchema = yup.object().shape({
		email: yup.string().required().label(`Email`),
	});
	const form = {
		formUrl, formData, validationSchema
	}
	const { data, loading, errorMsg, formik } = usePostForm(form);
	return (<div className="grid justify-content-center">
		<div className="col md:col-5">
			<div className="card">
				<div className="my-3">
					<div className="text-2xl font-bold">Administrador de restablecimiento de contraseña</div>
					<small className="text-500">
						Proporcione la dirección de correo electrónico válida que utilizó para registrarse
					</small>
				</div>
				{ data && <Message severity="success" text={data} className="w-full mb-3" /> }
				<form onSubmit={formik.handleSubmit}>
					{ errorMsg && <Message severity="error" text={errorMsg} /> }
					<div className="grid align-items-center justify-content-between">
						<div className="col">
							<InputText id="email" name="email" className="w-full" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" required type="email" />
						</div>
						<div className="col-auto">
							<Button loading={loading} type="submit" label="Enviar" icon="pi pi-envelope" />
						</div>
					</div>
				</form>
				<hr />
				<div className="text-primary">
					Se enviará un enlace a su correo electrónico que contiene la información que necesita para su contraseña
				</div>
			</div>
		</div>
	</div>);
}