import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
	items: { id: string; quantity: number }[];
	addToCart: (id: string, quantity: number, maxStock: number) => void;
	setQuantity: (id: string, quantity: number, maxStock: number) => void;
	removeFromCart: (id: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			addToCart: (id, quantity, maxStock) =>
				set((state) => {
					const existingItem = state.items.find((item) => item.id === id);

					if (existingItem) {
						const newQuantity = existingItem.quantity + quantity;
						if (newQuantity <= 0) {
							return { items: state.items.filter((item) => item.id !== id) };
						} else {
							return {
								items: state.items.map((item) =>
									item.id === id
										? {
												...item,
												quantity:
													newQuantity > maxStock ? maxStock : newQuantity,
											}
										: item,
								),
							};
						}
					} else {
						if (quantity <= 0) {
							return { items: state.items };
						} else {
							return {
								items: [
									...state.items,
									{ id, quantity: quantity > maxStock ? maxStock : quantity },
								],
							};
						}
					}
				}),

			setQuantity: (id, newQuantity, maxStock) =>
				set((state) => {
					const existingItem = state.items.find((item) => item.id === id);

					if (existingItem) {
						if (newQuantity <= 0) {
							return { items: state.items.filter((item) => item.id !== id) };
						} else {
							return {
								items: state.items.map((item) =>
									item.id === id
										? {
												...item,
												quantity:
													newQuantity > maxStock ? maxStock : newQuantity,
											}
										: item,
								),
							};
						}
					} else {
						return { items: state.items };
					}
				}),

			removeFromCart: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				})),

			clearCart: () => set(() => ({ items: [] })),
		}),
		{
			name: "vanta-cart",
		},
	),
);
