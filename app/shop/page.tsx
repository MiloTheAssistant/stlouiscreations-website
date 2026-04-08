"use client";

import { useState } from "react";
import { products, categories } from "@/lib/products";
import ProductGrid from "@/components/shop/ProductGrid";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="text-center mb-12">
          <SectionLabel>Shop</SectionLabel>
          <AnimatedHeading
            text="Our Products"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Custom laser engraved products for every occasion.
            All items are fully customizable with your design.
          </p>
        </FadeUpSection>

        {/* Category Filter */}
        <FadeUpSection delay={0.2} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "px-5 py-2.5 text-xs font-display uppercase tracking-wider transition-all duration-300 border",
                  activeCategory === cat.slug
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-muted border-white/10 hover:border-primary/30 hover:text-text"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeUpSection>

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
