import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
	const products = await prisma.product.findMany();
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-2xl font-bold'>Products</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
