import { ErrorMessage, useField } from 'formik';
import { BiUser } from 'react-icons/bi';
import { IoKeyOutline } from 'react-icons/io5';
import { SiMinutemailer } from 'react-icons/si';

import styles from './styles.module.scss';
export default function LoginInput({ icon, placeholder, ...props }) {
	const [field, meta] = useField(props);
	return (
		<div
			className={`${styles.input} ${
				meta.touched && meta.error ? styles.error : ''
			}`}
		>
			{icon == 'user' ? (
				<BiUser />
			) : icon == 'email' ? (
				<SiMinutemailer />
			) : icon == 'password' ? (
				<IoKeyOutline />
			) : (
				''
			)}
			<input
				type={field.type}
				name={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error && (
				<div className={styles.error__popup}>
					<span></span>
					<ErrorMessage name={field.name} />
				</div>
			)}
		</div>
	);
}
