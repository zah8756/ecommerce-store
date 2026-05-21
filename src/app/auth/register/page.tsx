"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { handleRegister } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function RegisterPage() {
	const [state, formAction, isPending] = useActionState(handleRegister, {
		error: null,
	} as { error: string | null });
	return (
		<div className='flex justify-center items-center h-screen bg-gradient-to-br from-background via-primary/20 to-background'>
			<Card className=' p-8 w-full max-w-md mx-auto '>
				<p className='text-2xl font-bold tracking-[0.2em] uppercase'>Vanta</p>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
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
						<div className=' space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								required
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								placeholder='Confirm Password'
							/>
						</div>
						<Button
							className='cursor-pointer'
							disabled={isPending}
							type='submit'>
							{isPending ? (
								<Loader2 className='w-4 h-4 animate-spin' />
							) : (
								"Register"
							)}
						</Button>
						{state?.error && <p className='text-red-500'>{state?.error}</p>}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
