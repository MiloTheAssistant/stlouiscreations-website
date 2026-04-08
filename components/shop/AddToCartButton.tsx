"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  size?: "sm" | "lg";
  quantity?: number;
}

export default function AddToCartButton({
  product,
  size = "sm",
  quantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "font-display uppercase tracking-wider font-bold transition-all duration-300",
        size === "sm"
          ? "text-[10px] px-3 py-2 bg-primary text-white hover:shadow-glow-sm"
          : "text-xs px-8 py-4 bg-primary text-white hover:shadow-glow w-full"
      )}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Added!
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
