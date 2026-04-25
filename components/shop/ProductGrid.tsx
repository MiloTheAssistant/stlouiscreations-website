"use client";

import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import FadeUpSection from "@/components/ui/FadeUpSection";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <FadeUpSection key={product.slug} delay={Math.min(i * 0.03, 0.24)}>
          <ProductCard product={product} />
        </FadeUpSection>
      ))}
    </div>
  );
}
