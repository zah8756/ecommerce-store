"use client";
import { Product } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProductCardProps = {
	product: Product;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	return (
		<Card className={cn("w-full", className)} {...props}>
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<div className='relative w-full h-48 overflow-hidden rounded-md  rounded-t-lg'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover'
					/>
				</div>
			</CardHeader>
			<CardContent>
				<p>{product.description}</p>
				<p>${product.price.toFixed(2)}</p>
				<p>{product.category}</p>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
