import { prisma } from "@/lib/prisma";
import Image from "next/image";
import AddToCartSection from "@/components/AddToCartSection";

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
			<AddToCartSection product={product} />
		</div>
	);
}
