"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { getCartProducts } from "@/lib/actions/cart";
import { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/QuantitySelector";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { toast } from "sonner";

const CartPage = () => {
	const items = useCartStore((state) => state.items);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const setQuantity = useCartStore((state) => state.setQuantity);
	const handleSetQuantity = (id: string, quantity: number) => {
		setQuantity(
			id,
			quantity,
			products.find((product) => product.id === id)?.stock || 0,
		);
	};
	useEffect(() => {
		const fetchProducts = async () => {
			const ids = items.map((item) => item.id);
			const cartProducts = await getCartProducts(ids);
			setProducts(cartProducts);
			setLoading(false);
		};
		fetchProducts();
	}, [items]);
	return (
		<div className='max-w-screen-xl mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-6'>Cart</h1>
			{loading ? (
				<div className='flex justify-center items-center h-full'>
					<Loader2 className='w-6 h-6 animate-spin' />
				</div>
			) : (
				<div className='flex gap-8 flex-col md:flex-row items-start '>
					{products.length > 0 ? (
						<>
							<div className='flex flex-col gap-4 flex-1 w-full'>
								{products.map((product) => (
									<div
										key={product.id}
										className='flex gap-4 border-b items-center  pb-4'>
										<div className='relative w-32 h-32 shrink-0 rounded-xl overflow-hidden'>
											<Image
												src={product.image}
												alt={product.name}
												width={100}
												height={100}
												className='w-full h-full object-cover'
											/>
										</div>
										<div className='flex flex-col gap-2 w-full '>
											<div className='flex flex-row justify-between items-center w-full'>
												<h2 className='text-lg font-medium'>{product.name}</h2>
												<p>${product.price.toFixed(2)}</p>
											</div>
											<div className='flex flex-row gap-2 items-center justify-between'>
												<QuantitySelector
													stock={product.stock}
													initialQuantity={
														items.find((item) => item.id === product.id)
															?.quantity || 0
													}
													onQuantityChange={(quantity) =>
														handleSetQuantity(product.id, quantity)
													}
												/>
												<Button
													variant='destructive'
													size='sm'
													className='text-sm font-bold cursor-pointer'
													onClick={() => removeFromCart(product.id)}>
													Remove
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
							<Card className='p-6 w-full md:w-1/4 sticky top-6'>
								<CardHeader className='p-0 mb-4'>
									<CardTitle className='text-lg font-bold'>
										Order summary
									</CardTitle>
								</CardHeader>
								<CardContent className='p-0 flex flex-col gap-3'>
									<div className='flex justify-between text-sm'>
										<span>Subtotal({products.length} items):</span>
										<span>
											$
											{products
												.reduce(
													(acc, product) =>
														acc +
														product.price *
															(items.find((item) => item.id === product.id)
																?.quantity || 0),
													0,
												)
												.toFixed(2)}
										</span>
									</div>
									<p className='text-sm text-muted-foreground'>
										Shipping costs are calculated at checkout
									</p>
									<Separator />
									<div className='flex justify-between items-baseline font-bold'>
										<span>Total excluding tax</span>
										<span>
											<span className='text-lg font-bold'>$</span>
											{products
												.reduce(
													(acc, product) =>
														acc +
														product.price *
															(items.find((item) => item.id === product.id)
																?.quantity || 0),
													0,
												)
												.toFixed(2)}
										</span>
									</div>
									<Button
										variant='default'
										className='w-full mt-2 text-lg font-bold cursor-pointer'
										disabled={loading}
										onClick={async () => {
											setLoading(true);
											const res = await createCheckoutSession(items);
											if (res.error) {
												toast.error(res.error);
												setLoading(false);
											} else {
												window.location.href = res.url as string;
												setLoading(false);
											}
										}}>
										{loading ? (
											<Loader2 className='w-4 h-4 animate-spin' />
										) : (
											"Checkout"
										)}
									</Button>
								</CardContent>
							</Card>
						</>
					) : (
						<div className='flex justify-center items-center h-full'>
							<p className='text-muted-foreground'>No products in cart</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CartPage;
