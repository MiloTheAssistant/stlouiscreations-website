"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/shop/AddToCartButton";
import FadeUpSection from "@/components/ui/FadeUpSection";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug as string);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-bold">Product Not Found</h1>
          <p className="text-muted mt-4">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-8 px-8 py-4 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted">
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <FadeUpSection>
            <div className="aspect-square bg-surface border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-display text-5xl font-bold text-primary">
                    {product.name[0]}
                  </span>
                </div>
                <p className="text-muted text-sm">Product Image</p>
              </div>
            </div>
          </FadeUpSection>

          {/* Details */}
          <FadeUpSection delay={0.2}>
            <div>
              <span className="text-primary text-xs font-display uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                {product.name}
              </h1>
              <p className="font-display text-3xl font-bold text-primary mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-muted leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Details list */}
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

              <AddToCartButton product={product} size="lg" />

              <p className="text-muted text-xs mt-4">
                All products are fully customizable. Contact us for bulk pricing on orders of 50+ units.
              </p>
            </div>
          </FadeUpSection>
        </div>
      </div>
    </div>
  );
}
