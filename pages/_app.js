import "../styles/globals.scss";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import store from "../store";

import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<Head>
				<title>Shoppay</title>
				<meta
					name="description"
					content="Shoppay-online shopping service for all of your needs."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SessionProvider session={session}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<PayPalScriptProvider deferLoading={true}>
							<ToastContainer
								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="colored"
							/>
							<Component {...pageProps} />
						</PayPalScriptProvider>
					</PersistGate>
				</Provider>
			</SessionProvider>
		</>
	);
}

export default MyApp;
