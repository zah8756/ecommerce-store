"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CancelPage = () => {
	const router = useRouter();
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold'>
				payment has been cancelled and your items are still in your cart
			</h1>
			<Button onClick={() => router.push("/cart")} className='mt-4'>
				Go back to cart
			</Button>
		</div>
	);
};

export default CancelPage;
