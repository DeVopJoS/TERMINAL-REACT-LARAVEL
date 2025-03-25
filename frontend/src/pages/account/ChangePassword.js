import * as yup from 'yup';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import useApp from 'hooks/useApp';

import usePostForm from 'hooks/usePostForm';
export default function ChangePassword() {
		const app = useApp();
	const formUrl = "account/changepassword";
	const formData = {
		oldpassword: '', 
		newpassword: '', 
		confirmpassword: '',
	}
	const validationSchema = yup.object().shape({
		oldpassword: yup.string().required().label(`Old Password`),
		newpassword: yup.string().required().label(`New Password`),
		confirmpassword: yup.string().required().label(`Confirm Password`).oneOf([yup.ref('newpassword')], 'Your passwords do not match.'),
	});
	function afterSubmit(data) {
		app.flashMsg('Change Password', 'Password change completed', 'success');
	}
	const form = {
		formUrl, formData, validationSchema, afterSubmit
	}
	const { loading, errorMsg, formik, getErrorClass, getFieldError } = usePostForm(form);
	return (
		<div className="container">
			<div className="grid">
				<div className="col md:col-5">
					<div className="text-2xl font-bold text-primary mb-3">Cambia la contraseña</div>
					{errorMsg && <Message className="my-3" severity="error" text={errorMsg} /> }
					<form onSubmit={formik.handleSubmit}>
						<div className="p-field mb-3">
							<Password  inputClassName="w-full" className={classNames('w-full', getErrorClass('oldpassword'))}  name="oldpassword" id="oldpassword" feedback={false} toggleMask value={formik.values.oldpassword} onChange={formik.handleChange} label="Contraseña actual"  placeholder="Contraseña actual" />
							{getFieldError('oldpassword')}
						</div>
						<div className="p-field mb-3">
							<Password  inputClassName="w-full" className={classNames('w-full', getErrorClass('newpassword'))}  name="newpassword" id="newpassword" feedback toggleMask value={formik.values.newpassword} onChange={formik.handleChange} label="Nueva contraseña"  placeholder="Nueva contraseña" />
							{getFieldError('newpassword')}
						</div>
						<div className="p-field mb-3">
							<Password  inputClassName="w-full" className={classNames('w-full', getErrorClass('confirmpassword'))}  name="confirmpassword" id="confirmpassword" feedback={false} toggleMask value={formik.values.confirmpassword} onChange={formik.handleChange} label="Confirmar nueva contraseña"  placeholder="Confirmar nueva contraseña" />
							{getFieldError('confirmpassword')}
						</div>
						<div className="text-center">
							<Button type="submit" loading={loading} label="Cambia la contraseña" />
						</div>
					</form>
				</div>
			</div >
		</div >
	);
}
