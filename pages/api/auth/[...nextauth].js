import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "./lib/mongodb";
import User from "../../../models/User";
import db from "../../../utils/db";

db.connectDb();

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					const { email, password } = credentials;
					const user = await User.findOne({ email });
					if (user) {
						return SignInUser({ password, user });
					} else {
						throw new Error("This email does not exist.");
					}
				} catch (error) {
					console.error("Authorize error:", error);
					throw new Error("Error during authorization.");
				}
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			issuer: process.env.AUTH0_ISSUER,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			try {
				let user = await User.findById(token.sub);
				if (user) {
					session.user.id = token.sub || user._id.toString();
					session.user.role = user.role || "user";
					token.role = user.role || "user";
				}
				return session;
			} catch (error) {
				console.error("Session callback error:", error);
				return session;
			}
		},
	},
	pages: {
		signIn: "/signin",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.JWT_SECRET,
});

const SignInUser = async ({ password, user }) => {
	if (!user.password) {
		throw new Error("Please enter your password.");
	}
	const testPassword = await bcrypt.compare(password, user.password);
	if (!testPassword) {
		throw new Error("Email or password is wrong!");
	}
	return user;
};
