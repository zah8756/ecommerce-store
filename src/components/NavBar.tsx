
import { Button } from "./ui/button";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import CartBadge from "./CartBadge";

const NavBar = async () => {
	const session = await auth();
	const isLoggedIn = !!session;
	return (
		<nav className='flex justify-between items-center px-6 py-4 border-b border-border bg-background sticky top-0 z-50 shadow-sm'>
			{/* Left — Logo */}
			<Link href='/' className='text-2xl font-bold tracking-[0.2em] uppercase'>
				Vanta
			</Link>

			{/* Center — Main Navigation (TODO: replace with search bar)  and then move prducts to the left*/}
			<div className='flex items-center gap-6'>
				<Link
					href='/products'
					className='text-sm hover:text-muted-foreground text-foreground transition-colors hover:underline'>
					Products
				</Link>
			</div>

			{/* Right — Utility Actions */}
			<div className='flex items-center gap-4'>
				{isLoggedIn ? (
					<>
						<Link
							href='/account'
							className='text-sm hover:text-muted-foreground text-foreground transition-colors hover:underline'>
							Account
						</Link>
						<form
							action={async () => {
								"use server";
								await signOut({ redirectTo: "/auth/login" });
							}}>
							<Button type='submit' variant='outline' size='sm'>
								Sign Out
							</Button>
						</form>
					</>
				) : (
					<Link href='/auth/login'>
						<Button variant='outline' size='sm'>
							Sign In
						</Button>
					</Link>
				)}
				<Button variant='ghost' size='icon' className='cursor-pointer px-8'>
					<CartBadge />
				</Button>
			</div>
		</nav>
	);
};

export default NavBar;
