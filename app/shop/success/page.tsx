"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import FadeUpSection from "@/components/ui/FadeUpSection";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background flex items-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUpSection>
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Order Confirmed!
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            Thank you for your order. We&apos;ll send you a confirmation email
            with your order details and tracking information.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold hover:shadow-glow transition-shadow"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border-2 border-white/20 text-text font-display text-xs uppercase tracking-wider font-bold hover:border-primary transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </FadeUpSection>
      </div>
    </div>
  );
}
