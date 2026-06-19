import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
			<div>
				{orders.map((order) => (
					<div key={order.id}>
						<p>Order ID: {order.id}</p>
						<p>Order Date: {order?.createdAt.toLocaleDateString()}</p>
						<Card key={order.id}>
							<CardHeader>
								<CardTitle>{order.id}</CardTitle>
							</CardHeader>
							<CardContent>
								<div>
									{order.items.map((item) => (
										<div key={item.id}>{item.product.name}</div>
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
