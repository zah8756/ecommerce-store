"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CartBadge = () => {
	const items = useCartStore((state) => state.items);
	const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
	const router = useRouter();
	return (
		<div className='flex items-center gap-2 cursor-pointer ' onClick={() => router.push('/cart')}>
			<ShoppingCartIcon className='w-6 h-6' />
			{totalQuantity > 0 && (
				<span className='text-sm font-semibold'>{totalQuantity}</span>
			)}
		</div>
	);
};
export default CartBadge;
