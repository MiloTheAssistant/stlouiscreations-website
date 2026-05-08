"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { categories } from "@/lib/shop-navigation";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/shop/AddToCartButton";
import FadeUpSection from "@/components/ui/FadeUpSection";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const categoryLabel =
    categories.find((category) => category.slug === product.category)?.label ??
    product.category;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-primary transition-colors"
          >
            {categoryLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeUpSection>
            <div className="relative aspect-square bg-white border border-white/10 flex items-center justify-center overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),0_24px_70px_rgba(0,0,0,0.24)]">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-8 sm:p-10"
                />
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="font-display text-5xl font-bold text-primary">
                      {product.name[0]}
                    </span>
                  </div>
                  <p className="text-muted text-sm">Product Image</p>
                </div>
              )}
            </div>
          </FadeUpSection>

          <FadeUpSection delay={0.2}>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-primary text-xs font-display uppercase tracking-wider">
                  {categoryLabel}
                </span>
                {product.supplierSku && (
                  <span className="text-muted text-xs font-display uppercase tracking-wider">
                    SKU {product.supplierSku}
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                {product.name}
              </h1>
              <p className="font-display text-3xl font-bold text-primary mb-6">
                {product.purchaseMode === "quote"
                  ? `From ${formatPrice(product.price)}`
                  : formatPrice(product.price)}
              </p>
              <p className="text-muted leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="font-display text-sm uppercase tracking-wider mb-4">
                  Details
                </h3>
                <ul className="space-y-2">
                  {product.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <AddToCartButton product={product} size="lg" />

              <p className="text-muted text-xs mt-4">
                Catalog pricing is reviewed before production. Personalization, art setup, rush timing, and bulk quantities may affect final pricing.
              </p>
            </div>
          </FadeUpSection>
        </div>
      </div>
    </div>
  );
}
