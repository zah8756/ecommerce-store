"use client";
import { Product } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type ProductCardProps = {
	product: Product;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	return (
		<Link href={`/products/${product.id}`}>
			<Card className={cn("w-full overflow-hidden p-0", className)} {...props}>
				<CardHeader className='px-3 pt-3'>
					{/* category might way to be hidden and used for filtering */}
					{/* <p className='text-xs text-muted-foreground uppercase tracking-wider mb-1'>
						{product.category}
					</p> */}
					<div className='relative w-full h-48 rounded-xl overflow-hidden'>
						<Image
							src={product.image}
							alt={product.name}
							fill
							sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
							className='object-cover'
						/>
					</div>
				</CardHeader>
				<CardContent className=' flex flex-col gap-1 px-3 pb-3'>
					<CardTitle className='text-base font-semibold '>
						{product.name}
					</CardTitle>
					<p className='text-xs text-muted-foreground line-clamp-2'>
						{product.description}
					</p>
					<p className='text-lg font-medium'>${product.price.toFixed(2)}</p>
					<Button
						variant='outline'
						className='w-full cursor-pointer'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}>
						Add to Cart
					</Button>
				</CardContent>
			</Card>
		</Link>
	);
};

export default ProductCard;
