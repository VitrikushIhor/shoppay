import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
	const { pathname, origin } = req.nextUrl;
	console.log("middleware working");

	const session = await getToken({
		req,
		secret: process.env.JWT_SECRET,
		secureCookie: process.env.NODE_ENV === "production",
	});

	console.log("session", session);


	if (pathname.startsWith("/checkout")) {
		if (!session) return NextResponse.redirect(`${origin}`);
	}
	if (pathname.startsWith("/order")) {
		if (!session) return NextResponse.redirect(`${origin}`);
	}
	if (pathname.startsWith("/profile")) {
		if (!session) return NextResponse.redirect(`${origin}`);
	}
	if (pathname.startsWith("/admin")) {
		if (!session || session.role !== "admin") {
			return NextResponse.redirect(`${origin}/`);
		}
	}
}

export const config = {
	matcher: [
		"/",
		"/checkout/:path*",
		"/order/:path*",
		"/profile/:path*",
		"/admin/:path*",
	],
};
