import axios from "axios";
import { Formik, Form } from "formik";
import Link from "next/link";
import Router from "next/router";
import {
	getCsrfToken,
	getProviders,
	getSession,
	signIn,
	country,
} from "next-auth/react";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

import CircledIconBtn from "../components/buttons/circledIconBtn/CircledIconBtn";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";


import LoginInput from "../components/inputs/loginInput/LoginInput";


import DotLoaderSpinner from "../components/loaders/dotLoader/DotLoaderSpinner";
import styles from "../styles/signin.module.scss";

import { loginValidation } from "../utils/validations/login";
import { registerValidation } from "../utils/validations/register";

const initialvalues = {
	login_email: "",
	login_password: "",
	name: "",
	email: "",
	password: "",
	conf_password: "",
	success: "",
	error: "",
	login_error: "",
};

export default function SigninPage({ providers, callbackUrl, csrfToken }) {
	console.log("providers", providers);
	console.log("callbackUrl", callbackUrl);
	console.log("csrfToken", csrfToken);

	const [loading, setLoading] = useState(false);

	const [user, setUser] = useState(initialvalues);

	const {
		login_email,
		login_password,
		name,
		email,
		password,
		conf_password,
		success,
		error,
		login_error,
	} = user;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const signUpHandler = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post("/api/auth/signup", {
				name,
				email,
				password,
			});
			setUser({ ...user, error: "", success: data.message });
			setLoading(false);
			setTimeout(async () => {
				let options = {
					redirect: false,
					email: email,
					password: password,
				};
				const res = await signIn("credentials", options);
				Router.push("/");
			}, 2000);
		} catch (error) {
			setLoading(false);
			setUser({ ...user, success: "", error: error.response.data.message });
		}
	};

	const signInHandler = async () => {
		setLoading(true);
		let options = {
			redirect: false,
			email: login_email,
			password: login_password,
		};
		const res = await signIn("credentials", options);

		setUser({ ...user, success: "", error: "" });
		setLoading(false);

		if (res?.error) {
			setLoading(false);
			setUser({ ...user, login_error: res?.error });
		} else {
			return Router.push(callbackUrl || "/");
		}
	};

	const country = {
		name: "Morocco",
		flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
	};

	return (
		<>
			{loading && <DotLoaderSpinner loading={loading} />}
			<Header country={country} />
			<div className={styles.login}>
				<div className={styles.login__container}>
					<div className={styles.login__header}>
						<div className={styles.back__svg}>
							<BiLeftArrowAlt />
						</div>
						<span>
							We'd be happy to join us ! <Link href="/">Go Store</Link>
						</span>
					</div>
					<div className={styles.login__form}>
						<h1>Sign in</h1>
						<p>
							Get access to one of the best Eshopping services in the world.
						</p>
						<Formik
							enableReinitialize
							initialValues={{
								login_email,
								login_password,
							}}
							validationSchema={loginValidation}
							onSubmit={() => {
								signInHandler();
							}}
						>
							{(form) => (
								<Form method="post" action="/api/auth/signin/email">
									<input
										type="hidden"
										name="csrfToken"
										defaultValue={csrfToken}
									/>
									<LoginInput
										type="text"
										name="login_email"
										icon="email"
										placeholder="Email Address"
										onChange={handleChange}
									/>
									<LoginInput
										type="password"
										name="login_password"
										icon="password"
										placeholder="Password"
										onChange={handleChange}
									/>
									<CircledIconBtn type="submit" text="Sign in" />
									{login_error && (
										<span className={styles.error}>{login_error}</span>
									)}
									<div className={styles.forgot}>
										<Link href="/auth/forgot">Forgot password ?</Link>
									</div>
								</Form>
							)}
						</Formik>
						<div className={styles.login__socials}>
							<span className={styles.or}>Or continue with</span>
							<div className={styles.login__socials_wrap}>
								{providers.map((provider) => {
									if (provider.name == "Credentials") {
										return;
									}
									return (
										<div key={provider.name}>
											<button
												className={styles.social__btn}
												onClick={() => signIn(provider.id)}
											>
												<img src={`../../icons/${provider.name}.png`} alt="" />
												Sign in with {provider.name}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.login__container}>
					<div className={styles.login__form}>
						<h1>Sign up</h1>
						<p>
							Get access to one of the best Eshopping services in the world.
						</p>
						<Formik
							enableReinitialize
							initialValues={{
								name,
								email,
								password,
								conf_password,
							}}
							validationSchema={registerValidation}
							onSubmit={() => {
								signUpHandler();
							}}
						>
							{(form) => (
								<Form>
									<LoginInput
										type="text"
										name="name"
										icon="user"
										placeholder="Full Name"
										onChange={handleChange}
									/>
									<LoginInput
										type="text"
										name="email"
										icon="email"
										placeholder="Email Address"
										onChange={handleChange}
									/>
									<LoginInput
										type="password"
										name="password"
										icon="password"
										placeholder="Password"
										onChange={handleChange}
									/>
									<LoginInput
										type="password"
										name="conf_password"
										icon="password"
										placeholder="Re-Type Password"
										onChange={handleChange}
									/>
									<CircledIconBtn type="submit" text="Sign up" />
								</Form>
							)}
						</Formik>
						<div>
							{success && <span className={styles.success}>{success}</span>}
						</div>
						<div>{error && <span className={styles.error}>{error}</span>}</div>
					</div>
				</div>
			</div>
			<Footer country="Morocco" />
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, query } = context;

	const session = await getSession({ req });
	const { callbackUrl } = query;

	if (session) {
		return {
			redirect: {
				destination: callbackUrl,
			},
		};
	}

	try {
		const csrfToken = await getCsrfToken(context);
		const providers = await getProviders();
		return {
			props: {
				providers: providers ? Object.values(providers) : [],
				csrfToken,
				callbackUrl,
			},
		};
	} catch (error) {
		console.error("Error fetching providers or CSRF token:", error);
		return {
			props: {
				providers: [],
				csrfToken: null,
				callbackUrl: "",
				error: "Failed to fetch providers or CSRF token",
			},
		};
	}
}
