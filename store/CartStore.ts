import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ICartItem {
	priceAtCart: number
	product: {
		_id: string
		productName: string
		hasVariant: boolean
		productImages?: string[]
		sellingPrice?: number
		mrpPrice?: number
		urlSlug?: string
		hasGift?: boolean
		giftDetails?: {
			image: string
			text: string
		}
	}
	quantity: number
	totalPrice: number
	variant?: {
		_id: string
		productId: string
		variantAttributes: { name: string; value: string }[]
		SKU: string
		barcode: string
		sellingPrice?: number
		mrpPrice?: number
		images: string[]
	} | null
}

interface CartState {
	items: ICartItem[]
	cartTotal: number

	setCart: (items: ICartItem[]) => void
	addToCart: (item: ICartItem) => void
	removeFromCart: (productId: string, variantId?: string) => void
	updateQuantity: (
		productId: string,
		variantId: string | null,
		quantity: number
	) => void
	clearCart: () => void
	calculateTotal: () => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			cartTotal: 0,

			setCart: items => {
				set({ items })
				get().calculateTotal()
			},

			addToCart: item => {
				const { items } = get()
				const existingIndex = items.findIndex(
					i =>
						i.product._id === item.product._id &&
						(i.variant?._id || '') === (item.variant?._id || '')
				)

				let updatedItems
				if (existingIndex !== -1) {
					const existing = items[existingIndex]
					const updatedItem = {
						...existing,
						quantity: existing.quantity + item.quantity,
						totalPrice:
							(existing.quantity + item.quantity) * existing.priceAtCart,
					}
					updatedItems = [...items]
					updatedItems[existingIndex] = updatedItem
				} else {
					updatedItems = [...items, item]
				}

				set({ items: updatedItems })
				get().calculateTotal()
			},

			removeFromCart: (productId, variantId) => {
				set(state => ({
					items: state.items.filter(item => {
						const sameProduct = item.product._id === productId
						const sameVariant = (item.variant?._id || '') === (variantId || '')
						return variantId ? !(sameProduct && sameVariant) : !sameProduct
					}),
				}))
				get().calculateTotal()
			},

			updateQuantity: (productId, variantId, quantity) => {
				set(state => ({
					items: state.items.map(item => {
						const isProductMatch = item.product._id === productId
						const isVariantMatch =
							(item.variant?._id || '') === (variantId || '')

						return isProductMatch && isVariantMatch
							? { ...item, quantity, totalPrice: quantity * item.priceAtCart }
							: item
					}),
				}))
				get().calculateTotal()
			},

			clearCart: () => {
				set({ items: [], cartTotal: 0 });
			},

			calculateTotal: () => {
				const { items } = get();
				const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
				set({ cartTotal: total });
			},
		}),
		{
			name: "guest-cart",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
