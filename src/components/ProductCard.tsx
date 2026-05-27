"use client";
import { Product } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
	product: Product;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	return (
		<Link href={`/products/${product.id}`}>
			<Card className={cn("w-full overflow-hidden p-0", className)} {...props}>
				<CardHeader className='px-3 pt-3 pb-1'>
					<p className='text-xs text-muted-foreground uppercase tracking-wider'>
						{product.category}
					</p>
					<CardTitle>{product.name}</CardTitle>
					<div className='relative w-full h-36 overflow-hidden'>
						<Image
							src={product.image}
							alt={product.name}
							fill
							className='object-cover'
						/>
					</div>
				</CardHeader>
				<CardContent className='px-3 pb-3'>
					<p className='text-xs text-muted-foreground line-clamp-2'>
						{product.description}
					</p>
					<p>${product.price.toFixed(2)}</p>
				</CardContent>
			</Card>
		</Link>
	);
};

export default ProductCard;
