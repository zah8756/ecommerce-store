import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});
	return (
		<div>
			<h1>Account</h1>
			<div className='max-w-screen-xl mx-auto px-4 py-8'>
				{orders.map((order) => (
					<div key={order.id} className='mb-8'>
						<Card key={order.id} className='border-none pt-0'>
							<CardHeader className='flex flex-row justify-between bg-green-600 h-12  items-center  p-8'>
								<CardTitle>
									Order Placed on: <br />
									{order?.createdAt.toLocaleDateString()}
								</CardTitle>
								<CardTitle>
									Order Total: <br /> $
									{order.items
										.reduce(
											(acc, item) => acc + item.product.price * item.quantity,
											0,
										)
										.toFixed(2)}
								</CardTitle>
								<CardTitle>Order ID: {order.id}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='flex flex-col gap-6 w-full'>
									{order.items.map((item) => (
										<div key={item.id} className='flex gap-4  py-2'>
											<Image
												src={item.product.image}
												alt={item.product.name}
												width={90}
												height={90}
												className='object-cover w-[90px] h-[90px] rounded-md shrink-0'
											/>
											<div
												className='grid flex-1 items-center min-w-0'
												style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
												<Link
													href={`/products/${item.product.id}`}
													className='text-sm font-medium truncate hover:underline hover:text-green-400 transition-colors'>
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
					</div>
				))}
			</div>
		</div>
	);
}
