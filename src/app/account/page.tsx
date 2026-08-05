import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function AccountPage() {
	const currentUser = await auth();
	const userId = currentUser?.user?.id;

	if (!currentUser) {
		redirect("/auth/login");
	}

	const orders = await prisma.order.findMany({
		where: { userId: userId },
		orderBy: { createdAt: "desc" },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});
	return (
		<div className='max-w-5xl mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-8'>Past Orders</h1>
			<div className='flex flex-col gap-6'>
				{orders.map((order) => (
					<Card
						key={order.id}
						className='border-none py-0 overflow-hidden gap-1'>
						<CardHeader className='flex flex-row justify-between items-center bg-primary px-6 py-4'>
							<div>
								<p className='text-xs text-primary-foreground uppercase tracking-wide'>
									Order Placed
								</p>
								<p className='text-sm font-semibold'>
									{order?.createdAt.toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className='text-xs text-primary-foreground uppercase tracking-wide'>
									Order Total
								</p>
								<p className='text-sm font-semibold'>
									$
									{order.items
										.reduce(
											(acc, item) => acc + item.product.price * item.quantity,
											0,
										)
										.toFixed(2)}
								</p>
							</div>
							<div className='text-right'>
								<p className='text-xs text-primary-foreground uppercase tracking-wide'>
									Order ID
								</p>
								<p className='text-xs font-mono text-primary-foreground '>
									{order.id}
								</p>
							</div>
						</CardHeader>
						<CardContent className='px-6 py-0'>
							<div className='flex flex-col divide-y divide-white/5'>
								{order.items.map((item) => (
									<div key={item.id} className='flex gap-4 py-4'>
										<Image
											src={item.product.image}
											alt={item.product.name}
											width={80}
											height={80}
											className='object-cover w-20 h-20 rounded-md shrink-0'
										/>
										<div
											className='grid flex-1 items-center min-w-0 gap-2'
											style={{ gridTemplateColumns: "1fr 5rem 7rem" }}>
											<Link
												href={`/products/${item.product.id}`}
												className='text-sm font-medium truncate hover:underline hover:text-primary transition-colors'>
												{item.product.name}
											</Link>
											<p className='text-sm text-muted-foreground text-center whitespace-nowrap'>
												Qty: {item.quantity}
											</p>
											<div className='flex flex-col items-end'>
												<p className='text-xs text-muted-foreground'>
													${item.product.price.toFixed(2)} each
												</p>
												<p className='text-sm font-medium'>
													${(item.product.price * item.quantity).toFixed(2)}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
