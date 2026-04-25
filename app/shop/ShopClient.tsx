"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, products } from "@/lib/products";
import ProductGrid from "@/components/shop/ProductGrid";
import { cn } from "@/lib/utils";

export default function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category") ?? "all";
  const activeCategory = categories.some((cat) => cat.slug === requestedCategory)
    ? requestedCategory
    : "all";

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  function selectCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => selectCategory(cat.slug)}
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

      <div className="mt-12">
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
