"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { handleLogin } from "@/lib/actions/auth";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(handleLogin, {
		error: null,
	} as { error: string | null });
	return (
		<Card>
			<CardTitle>Login</CardTitle>
			<CardContent>
				<form action={formAction}>
					<Label htmlFor='email'>Email</Label>
					<Input
						required
						id='email'
						name='email'
						type='email'
						placeholder='Email'
					/>
					<Label htmlFor='password'>Password</Label>
					<Input
						required
						id='password'
						name='password'
						type='password'
						placeholder='Password'
					/>
					<Button disabled={isPending} type='submit'>
						{isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : "Login"}
					</Button>
					<p>
						Don&apos;t have an account?{" "}
						<Link href='/auth/register'>Register</Link>
					</p>
					{state?.error && <p className='text-red-500'>{state?.error}</p>}
					{/* TODO: Add forgot password link */}
					{/* add google login button */}
				</form>
			</CardContent>
		</Card>
	);
}
