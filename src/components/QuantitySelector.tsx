"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type QuantitySelectorProps = {
	stock: number;
	initialQuantity?: number;
	onQuantityChange?: (quantity: number) => void;
};

export default function QuantitySelector({
	stock,
	initialQuantity = 1,
	onQuantityChange,
}: QuantitySelectorProps) {
	const [quantity, setQuantity] = useState(initialQuantity);

	const updateQuantity = (newQuantity: number) => {
		setQuantity(newQuantity);
		onQuantityChange?.(newQuantity);
	};

	return (
		<div className='flex items-center gap-2'>
			<Button
				variant='outline'
				size='sm'
				className='px-3 cursor-pointer'
				onClick={() => updateQuantity(quantity - 1)}
				disabled={quantity <= 1}>
				-
			</Button>
			<Input
				type='number'
				className='w-16 text-center'
				value={quantity}
				onChange={(e) => {
					const value = Number(e.target.value);
					if (value > stock) updateQuantity(stock);
					else if (value < 1) updateQuantity(1);
					else updateQuantity(value);
				}}
				min={1}
				max={stock}
			/>
			<Button
				variant='outline'
				size='sm'
				className='px-3 cursor-pointer'
				onClick={() => updateQuantity(quantity + 1)}
				disabled={quantity >= stock}>
				+
			</Button>
		</div>
	);
}
