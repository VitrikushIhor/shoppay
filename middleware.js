import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export async function middleware(req) {
  const {pathname, origin} = req.nextUrl;
  console.log("middleware working");

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  console.log("session", session);

  // Оновлення умови для адміна
  if (pathname.startsWith("/admin")) {
    console.log("in admin case");
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(`${origin}/`);
    }
  } else if (pathname.startsWith("/checkout") || pathname.startsWith("/order") || pathname.startsWith("/profile")) {
    if (!session) return NextResponse.redirect(`${origin}/`);
  }
}

export const config = {
  matcher: ['/', '/checkout/:path*', '/order/:path*', '/profile/:path*', '/admin/:path*'],
};
