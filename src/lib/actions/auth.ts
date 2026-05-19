"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
		if (isRedirectError(_error)) throw _error
		return { error: "Invalid email or password" };
	}
}
