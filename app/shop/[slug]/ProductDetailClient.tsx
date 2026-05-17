"use client";

import { useEffect, useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? "");
  const categoryLabel =
    categories.find((category) => category.slug === product.category)?.label ??
    product.category;

  useEffect(() => {
    setSelectedImage(product.images[0] ?? "");
  }, [product.images]);

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
            <div className="space-y-5">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-primary/15 bg-[radial-gradient(circle_at_50%_24%,rgba(255,107,0,0.18),rgba(255,107,0,0.04)_34%,rgba(6,6,6,0.98)_72%)] shadow-[0_24px_70px_rgba(0,0,0,0.32),inset_0_0_46px_rgba(255,107,0,0.08)]">
                <div className="absolute inset-5 border border-white/5 bg-black/25" />
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-8 drop-shadow-[0_24px_34px_rgba(0,0,0,0.45)] sm:p-10"
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

              {product.images.length > 1 && (
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max gap-3">
                    {product.images.map((image, index) => {
                      const isSelected = image === selectedImage;

                      return (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          aria-label={`View ${product.name} image ${index + 1}`}
                          aria-pressed={isSelected}
                          className={`relative h-20 w-20 flex-none overflow-hidden border bg-[radial-gradient(circle_at_50%_24%,rgba(255,107,0,0.14),rgba(6,6,6,0.98)_70%)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/50 ${
                            isSelected
                              ? "border-primary shadow-[0_0_18px_rgba(255,107,0,0.25)]"
                              : "border-white/10"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            fill
                            sizes="80px"
                            className="object-contain p-2"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {product.videos?.[0] && (
                <video
                  className="aspect-video w-full border border-white/10 bg-black object-contain shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                  controls
                  loop
                  muted
                  playsInline
                  poster={product.images[0]}
                  preload="metadata"
                >
                  <source src={product.videos[0]} type="video/webm" />
                </video>
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
