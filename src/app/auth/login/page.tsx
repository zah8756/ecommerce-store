"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
		<div className='flex justify-center items-center h-screen bg-gradient-to-br from-background via-primary/20 to-background'>
			<Card className=' p-8 w-full max-w-md mx-auto '>
				<p className='text-2xl font-bold tracking-[0.2em] uppercase'>Vanta</p>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={formAction} className='flex flex-col gap-5'>
						<div className=' space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								required
								id='email'
								name='email'
								type='email'
								placeholder='Email'
							/>
						</div>
						<div className=' space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								required
								id='password'
								name='password'
								type='password'
								placeholder='Password'
							/>
						</div>
						<Button
							className='cursor-pointer'
							disabled={isPending}
							type='submit'>
							{isPending ? (
								<Loader2 className='w-4 h-4 animate-spin' />
							) : (
								"Login"
							)}
						</Button>
						{state?.error && <p className='text-red-500'>{state?.error}</p>}
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t border-border' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-card px-2 text-muted-foreground'>or</span>
							</div>
						</div>
						<p className='text-center text-sm text-muted-foreground'>
							Don&apos;t have an account?{" "}
							<Link
								href='/auth/register'
								className='text-white font-medium hover:underline'>
								Register
							</Link>
						</p>

						{/* TODO: Add forgot password link */}
						{/* add google login button */}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
