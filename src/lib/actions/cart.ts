"use server";

import { prisma } from "@/lib/prisma";

export async function getCartProducts(productIds: string[]) {
	// Fetch all products matching the IDs in the cart
	// Return them so the client can display them
	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});
	return products;
}
