import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
	const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
	const isAccountPage = req.nextUrl.pathname.startsWith("/account");

	if (isLoggedIn && isAuthPage) {
		return NextResponse.redirect(new URL("/", req.url));
	}
	if (!isLoggedIn && (isAccountPage || isAdminPage)) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}
	if (isLoggedIn && isAdminPage && req.auth?.user?.role !== "ADMIN") {
		return NextResponse.redirect(new URL("/", req.url));
	}
	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
