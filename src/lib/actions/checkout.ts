"use server";

import { stripe } from "@/lib/stripe";
import { getCartProducts } from "./cart";
import { auth } from "@/auth";

export const createCheckoutSession = async (
	items: { id: string; quantity: number }[],
) => {
	try {
		const ids = items.map((item) => item.id);
		const products = await getCartProducts(ids);
		const currentUser = await auth();
		const userId = currentUser?.user?.id;

		if (!userId) {
			return { error: "You must be logged in to checkout" };
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			metadata: {
				userId: userId || "",
				items: JSON.stringify(items),
			},
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
			line_items: products.map((product) => ({
				price_data: {
					currency: "usd",
					product_data: { name: product.name, images: [product.image] },
					unit_amount: Math.round(product.price * 100),
				},
				quantity: items.find((item) => item.id === product.id)?.quantity || 0,
			})),
		});
		return { url: checkoutSession.url };
	} catch (error) {
		console.error(error);
		return { error: "Failed to create checkout session" };
	}
};
