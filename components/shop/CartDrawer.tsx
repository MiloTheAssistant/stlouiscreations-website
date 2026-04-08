"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface border-l border-white/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-display text-lg font-bold">
                  Cart ({count})
                </h2>
                <button
                  onClick={onClose}
                  className="text-muted hover:text-text transition-colors"
                  aria-label="Close cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted text-sm mb-4">Your cart is empty</p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="text-primary text-sm font-display uppercase tracking-wider hover:underline"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <CartItem key={item.product.slug} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted text-sm">Subtotal</span>
                    <span className="font-display text-xl font-bold text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-muted text-xs">
                    Shipping calculated at checkout
                  </p>
                  <Link
                    href="/api/checkout"
                    onClick={onClose}
                    className="block w-full text-center px-8 py-4 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold hover:shadow-glow transition-shadow duration-300"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
