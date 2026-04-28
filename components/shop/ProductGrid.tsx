"use client";

import { useEffect, useMemo, useState } from "react";
import type { ShopProduct } from "@/lib/shop-product";
import ProductCard from "./ProductCard";
import FadeUpSection from "@/components/ui/FadeUpSection";

interface ProductGridProps {
  products: ShopProduct[];
  initialLimit?: number;
  emptyMessage?: string;
  totalCount?: number;
  onLoadMore?: () => void;
}

export default function ProductGrid({
  products,
  initialLimit = 48,
  emptyMessage = "No products found.",
  totalCount,
  onLoadMore,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialLimit);
  const isServerPaged = typeof totalCount === "number" && Boolean(onLoadMore);

  useEffect(() => {
    setVisibleCount(initialLimit);
  }, [initialLimit, products]);

  const visibleProducts = useMemo(
    () => (isServerPaged ? products : products.slice(0, visibleCount)),
    [isServerPaged, products, visibleCount]
  );
  const hasMore = isServerPaged
    ? products.length < (totalCount ?? 0)
    : visibleCount < products.length;

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map((product, i) => (
          <FadeUpSection key={product.slug} delay={Math.min(i * 0.03, 0.18)}>
            <ProductCard product={product} />
          </FadeUpSection>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={
              isServerPaged && onLoadMore
                ? onLoadMore
                : () => setVisibleCount((count) => count + initialLimit)
            }
            className="border border-white/10 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-text transition-colors hover:border-primary/40 hover:text-primary"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
