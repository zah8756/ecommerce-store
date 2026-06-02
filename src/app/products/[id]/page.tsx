import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await prisma.product.findUnique({
		where: { id },
	});
	if (!product) {
		return <div>Product not found</div>;
	}
	return (
		<div className='max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start mt-8 '>
			{/* Image */}
			<div className='w-full md:w-[420px] md:shrink-0'>
				<Image
					src={product.image}
					alt={product.name}
					width={420}
					height={420}
					priority
					className='rounded-xl w-full object-cover aspect-square'
				/>
			</div>

			{/* Details */}
			<div className='flex-1 min-w-0 flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<span className='text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground capitalize'>
						{product.category}
					</span>
				</div>
				<h1 className='text-3xl font-bold leading-tight'>{product.name}</h1>
				<p className='text-muted-foreground leading-relaxed'>
					{product.description}
				</p>
				<hr className='border-border' />
				<dl className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm'>
					<dt className='text-muted-foreground'>Category</dt>
					<dd className='font-medium capitalize'>{product.category}</dd>
					<dt className='text-muted-foreground'>Availability</dt>
					<dd>
						{product.stock > 0 ? (
							<span className='text-green-500 font-medium'>
								In Stock ({product.stock} left)
							</span>
						) : (
							<span className='text-red-500 font-medium'>Out of Stock</span>
						)}
					</dd>
				</dl>
			</div>

			{/* Purchase panel */}
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
								className='px-3 cursor-pointer'>
								-
							</Button>
							<Input
								type='number'
								defaultValue={1}
								className='w-16 text-center'
							/>
							<Button
								variant='outline'
								size='sm'
								className='px-3 cursor-pointer'>
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
					variant='default'
					className='w-full mt-auto cursor-pointer'
					disabled={product.stock === 0}>
					Add to Cart
				</Button>
			</div>
		</div>
	);
}
