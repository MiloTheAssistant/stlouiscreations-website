"use client";

import { useCart, type CartItem as CartItemType } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4">
      {/* Thumbnail placeholder */}
      <div className="w-16 h-16 bg-background flex-shrink-0 flex items-center justify-center border border-white/5">
        <span className="font-display text-sm font-bold text-primary">
          {item.product.name[0]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-sm font-bold leading-tight truncate">
          {item.product.name}
        </h3>
        <p className="text-primary text-sm mt-1">
          {formatPrice(item.product.price)}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-white/10">
            <button
              onClick={() => updateQty(item.product.slug, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-text transition-colors text-sm"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 h-7 flex items-center justify-center text-xs font-display">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.product.slug, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-text transition-colors text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.product.slug)}
            className="text-muted hover:text-red-500 transition-colors text-xs"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
