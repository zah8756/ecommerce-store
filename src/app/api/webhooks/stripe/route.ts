import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getCartProducts } from "@/lib/actions/cart";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
	//get the body and signature from the request
	const body = await request.text();
	const headersList = await headers();
	const signature = headersList.get("stripe-signature");
	//construct the event that was sent by stripe
	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature!,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (error) {
		console.error(error);
		return new Response("Webhook verification failed", { status: 400 });
	}

	//event handling
	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		const userId = session.metadata?.userId;
		const items = session.metadata?.items;
		const productIds = JSON.parse(items as string);
		const ids = productIds.map(
			(item: { id: string; quantity: number }) => item.id,
		);
		const cartProducts = await getCartProducts(ids);

		try {
			const order = await prisma.order.create({
				data: {
					userId: userId as string,
					total: (session.amount_total || 0) / 100,
					status: "PAID",
					stripeId: session.id,
				},
			});

			await prisma.orderItem.createMany({
				data: cartProducts.map((product) => ({
					orderId: order.id,
					productId: product.id,
					quantity:
						productIds.find((item: { id: string }) => item.id === product.id)
							?.quantity || 0,
					price: product.price,
				})),
			});

			await prisma.$transaction(
				productIds.map((item: { id: string; quantity: number }) =>
					prisma.product.update({
						where: { id: item.id },
						data: {
							stock: {
								decrement: item.quantity,
							},
						},
					}),
				),
			);
		} catch (error) {
			console.error(error);
			return new Response("Error creating order", { status: 500 });
		}
	}

	return new Response("Webhook received", { status: 200 });
}
