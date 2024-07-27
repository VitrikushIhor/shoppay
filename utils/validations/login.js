import * as Yup from 'yup';

export const loginValidation = Yup.object({
	login_email: Yup.string()
		.required('Email address is required.')
		.email('Please enter a valid email address.'),
	login_password: Yup.string().required('Please enter a password'),
});
