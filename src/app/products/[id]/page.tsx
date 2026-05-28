import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const product = await prisma.product.findFirst({
		where: { id: params.id },
	});
	if (!product) {
		return <div>Product not found</div>;
	}
	return (
		<div className='max-w-screen-xl mx-auto px-4 py-8 flex gap-6'>
			<aside>
				<Image
					src={product.image}
					alt={product.name}
					width={500}
					height={500}
					className='rounded-xl'
				/>
				<p className='text-muted-foreground text-sm'>{product.description}</p>
			</aside>
			<div className='flex-1 flex flex-col gap-4'>
				<h1 className='text-2xl font-bold '>{product.name}</h1>
				<p className='text-foreground text-lg font-medium'>
					${product.price.toFixed(2)}
				</p>
				{product.stock > 0 && (
					<div className='flex gap-2 flex-col'>
						<p className='text-sm text-green-500'>In Stock</p>
						<div className='flex items-center gap-2'>
							<Button variant='outline'>-</Button>
							<Input type='number' value={1} className='w-16' />
							<Button variant='outline'>+</Button>
						</div>
					</div>
				)}
				{product.stock === 0 && (
					<div className='flex gap-2 flex-col'>
						<p className='text-sm text-red-500'>Out of stock</p>
					</div>
				)}
			</div>
		</div>
	);
}
