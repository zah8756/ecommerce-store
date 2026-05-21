"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function handleLogin(
	_prevState: { error: string | null },
	formData: FormData,
): Promise<{ error: string | null }> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});
		return { error: null };
	} catch (_error) {
		if (isRedirectError(_error)) throw _error;
		return { error: "Invalid email or password" };
	}
}

export async function handleRegister(
	_prevState: { error: string | null },
	formData: FormData,
): Promise<{ error: string | null }> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;
	if (password !== confirmPassword) return { error: "Passwords do not match" };
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await prisma.user.create({
			data: { email, password: hashedPassword },
		});
		if (!user) return { error: "Failed to create user" };
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});
		return { error: null };
	} catch (error) {
		if (isRedirectError(error)) throw error;
		console.error(error);
		return { error: "Failed to create user" };
	}
}
