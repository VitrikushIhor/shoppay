import * as Yup from 'yup';

export const validateShipping = Yup.object({
	firstName: Yup.string()
		.required('First name is required.')
		.min(3, 'First name must be atleast 3 characters long.')
		.max(20, 'First name must be less than 20 characters long.'),
	lastName: Yup.string()
		.required('Last name is required.')
		.min(3, 'Last name must be atleast 3 characters long.')
		.max(20, 'Last name must be less than 20 characters long.'),
	phoneNumber: Yup.string()
		.required('Phone number is required.')
		.phone()
		.min(3, 'Phone number must be atleast 3 characters long.')
		.max(30, 'Phone number must be less than 20 characters long.'),
	state: Yup.string()
		.required('State name is required.')
		.min(2, 'State name should contain 2-60 characters..')
		.max(60, 'State name should contain 2-60 characters.'),
	city: Yup.string()
		.required('City name is required.')
		.min(2, 'City name should contain 2-60 characters.')
		.max(60, 'City name should contain 2-60 characters.'),
	zipCode: Yup.string()
		.required('ZipCode/Postal is required.')
		.min(2, 'ZipCode/Postal should contain 2-30 characters..')
		.max(30, 'ZipCode/Postal should contain 2-30 characters.'),
	address1: Yup.string()
		.required('Address Line 1 is required.')
		.min(5, 'Address Line 1 should contain 5-100 characters.')
		.max(100, 'Address Line 1 should contain 5-100 characters.'),
	address2: Yup.string()
		.min(5, 'Address Line 2 should contain 5-100 characters.')
		.max(100, 'Address Line 2 should contain 5-100 characters.'),
	country: Yup.string().required('Country name is required.'),
});
