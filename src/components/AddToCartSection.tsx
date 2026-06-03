"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Product } from "@prisma/client";
import { useState } from "react";

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
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							size='sm'
							className='px-3 cursor-pointer'
							onClick={() => setQuantity((prev) => prev - 1)}
							disabled={quantity <= 1}>
							-
						</Button>
						<Input
							type='number'
							className='w-16 text-center'
							value={quantity}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value > product.stock) {
									setQuantity(product.stock);
								} else if (value < 1) {
									setQuantity(1);
								} else {
									setQuantity(value);
								}
							}}
							min={1}
							max={product.stock}
						/>
						<Button
							variant='outline'
							size='sm'
							className='px-3 cursor-pointer'
							onClick={() => setQuantity((prev) => prev + 1)}
							disabled={quantity >= product.stock}>
							+
						</Button>
					</div>
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
