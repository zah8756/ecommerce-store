"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
const SuccessPage = () => {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const router = useRouter();
	const clearCart = useCartStore((state) => state.clearCart);

	useEffect(() => {
		clearCart();
	}, []);

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold'>
				You have successfully purchased your items and your order is being
				processed
			</h1>
			<p className='text-sm text-muted-foreground'>
				You will receive an email when your order is shipped
			</p>
			<p className='text-sm text-muted-foreground'>Session ID: {sessionId}</p>
			<Button
				onClick={() => router.push("/products")}
				className='mt-4 cursor-pointer'>
				Want to buy more?
			</Button>
		</div>
	);
};

export default SuccessPage;
