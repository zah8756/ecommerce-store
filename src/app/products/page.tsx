import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
	const products = await prisma.product.findMany();

	return (
		<div className='max-w-screen-xl mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-6'>Products</h1>

			<div className='flex gap-6'>
				{/* Left Sidebar — Filters */}
				<aside className='hidden lg:block w-56 shrink-0'>
					{/* TODO: Add category filter */}
					{/* TODO: Add price range filter */}
					<p className='text-muted-foreground text-sm'>Filters coming soon</p>
				</aside>

				{/* Right — Product Grid */}
				<div className='flex-1'>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
