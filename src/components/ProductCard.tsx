"use client";
import { Product } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { toast } from "sonner";
type ProductCardProps = {
	product: Product;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	const addToCart = useCartStore((state) => state.addToCart);
	const items = useCartStore((state) => state.items);

	const cartQuantity =
		items.find((item) => item.id === product.id)?.quantity || 0;
	const outOfStock = product.stock === 0;
	const isAtMaxQuantity = cartQuantity >= product.stock;

	const handleAddToCart = (quantity: number) => {
		const itemsBefore =
			useCartStore.getState().items.find((item) => item.id === product.id)
				?.quantity || 0;

		addToCart(product.id, quantity, product.stock);

		const itemsAfter =
			useCartStore.getState().items.find((item) => item.id === product.id)
				?.quantity || 0;

		if (itemsAfter > itemsBefore) {
			toast.success(`${product.name} added to cart`, {
				position: "top-center",
			});
		} else if (itemsAfter === product.stock) {
			toast.info(`Already at max quantity for ${product.name}`, {
				position: "top-center",
			});
		}
	};

	return (
		<Link href={`/products/${product.id}`} className='cursor-pointer'>
			<Card
				className={cn(
					"w-full overflow-hidden p-0 relative",
					outOfStock && "opacity-60",
					className,
				)}
				{...props}>
				<CardHeader className='px-3 pt-3'>
					<div className='relative w-full h-48 rounded-xl overflow-hidden'>
						<Image
							src={product.image}
							alt={product.name}
							fill
							sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
							className={cn("object-cover", outOfStock && "grayscale")}
						/>
					</div>
				</CardHeader>
				<CardContent className='flex flex-col gap-1 px-3 pb-3'>
					<CardTitle className='text-base font-semibold'>
						{product.name}
					</CardTitle>
					<p className='text-xs text-muted-foreground line-clamp-2'>
						{product.description}
					</p>
					<p className='text-lg font-medium'>${product.price.toFixed(2)}</p>
					<Button
						variant={outOfStock ? "outline" : "default"}
						className='w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleAddToCart(1);
						}}
						disabled={outOfStock || isAtMaxQuantity}>
						{outOfStock
							? "Out of Stock"
							: isAtMaxQuantity
								? "Max Quantity in cart"
								: "Add to Cart"}
					</Button>
				</CardContent>
			</Card>
		</Link>
	);
};

export default ProductCard;
