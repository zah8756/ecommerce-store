"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "./ui/button";
import { Product } from "@prisma/client";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

export default function AddToCartSection({ product }: { product: Product }) {
	const addToCart = useCartStore((state) => state.addToCart);
	const [quantity, setQuantity] = useState(1);
	const handleAddToCart = (quantity: number) => {
		addToCart(product.id, quantity, product.stock);
	};
	return (
		<div className='w-full md:w-64 md:shrink-0 sticky top-6 flex flex-col gap-4 p-5 border rounded-xl md:h-[420px]'>
			<p className='text-2xl font-bold'>${product.price.toFixed(2)}</p>
			<hr className='border-border' />
			{product.stock > 0 ? (
				<>
					<p className='text-sm text-green-500 font-medium'>In Stock</p>
					<QuantitySelector stock={product.stock} initialQuantity={quantity} onQuantityChange={setQuantity} />
				</>
			) : (
				<p className='text-sm text-red-500 font-medium'>Out of Stock</p>
			)}
			<div className='mt-6'>
				<h3 className='text-sm font-medium mb-3'>Key Features</h3>
				<ul className='space-y-2 text-sm text-muted-foreground'>
					<li>• Premium materials</li>
					<li>• Modern design</li>
					<li>• Ships within 5-7 days</li>
					<li>• 30-day returns</li>
				</ul>
			</div>
			<Button
				onClick={() => handleAddToCart(quantity)}
				variant='default'
				className='w-full mt-auto cursor-pointer'
				disabled={product.stock === 0 || quantity <= 0}>
				Add to Cart
			</Button>
		</div>
	);
}
