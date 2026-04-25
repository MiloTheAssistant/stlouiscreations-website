"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  categories,
  polarCamelSubcategories,
  polarCamelSubcategoryGroups,
  products,
} from "@/lib/products";
import ProductGrid from "@/components/shop/ProductGrid";
import { cn } from "@/lib/utils";

const occasionSpecials = [
  {
    title: "Summer Parties",
    description: "Coolers, tumblers, serving pieces, and awards for 4th of July cookouts, golf outings, and company picnics.",
  },
  {
    title: "Spring Celebrations",
    description: "Fresh personalized gifts for Easter baskets, graduations, school events, weddings, and showers.",
  },
  {
    title: "Fall Gatherings",
    description: "Halloween, Thanksgiving, tailgates, and harvest-table pieces with engraving that feels made for the moment.",
  },
  {
    title: "Christmas Gifts",
    description: "Drinkware, home goods, glassware, and recognition awards ready for clients, teams, families, and hosts.",
  },
];

export default function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const isLandingPage = !requestedCategory;
  const activeCategory = requestedCategory && categories.some((cat) => cat.slug === requestedCategory)
    ? requestedCategory
    : "drinkware";
  const requestedSubcategory = searchParams.get("subcategory") ?? "all";
  const activeCategoryHasSubcategories = polarCamelSubcategories.some(
    (subcat) => subcat.category === activeCategory
  );
  const activeCategorySubcategories = useMemo(
    () => polarCamelSubcategories.filter((subcat) => subcat.category === activeCategory),
    [activeCategory]
  );
  const activeCategoryGroups = useMemo(
    () => polarCamelSubcategoryGroups.filter((group) => group.category === activeCategory),
    [activeCategory]
  );
  const activeSubcategory =
    activeCategoryHasSubcategories &&
    activeCategorySubcategories.some((subcat) => subcat.slug === requestedSubcategory)
      ? requestedSubcategory
      : "all";

  const filtered = useMemo(
    () => {
      const categoryProducts = products.filter((p) => p.category === activeCategory);

      if (!activeCategoryHasSubcategories || activeSubcategory === "all") {
        return categoryProducts;
      }

      return categoryProducts.filter((p) => p.subcategory === activeSubcategory);
    },
    [activeCategory, activeCategoryHasSubcategories, activeSubcategory]
  );

  const subcategoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of products) {
      if (product.category === activeCategory && product.subcategory) {
        counts.set(product.subcategory, (counts.get(product.subcategory) ?? 0) + 1);
      }
    }
    return counts;
  }, [activeCategory]);
  const activeCategoryProductCount = useMemo(
    () => products.filter((product) => product.category === activeCategory).length,
    [activeCategory]
  );
  const featuredProducts = useMemo(
    () => products.filter((product) => product.tags?.includes("Featured")).slice(0, 8),
    []
  );

  const activeCategoryLabel =
    categories.find((cat) => cat.slug === activeCategory)?.label ?? "Drinkware";
  const activeSubcategoryLabel =
    activeSubcategory === "all"
      ? `All ${activeCategoryLabel}`
      : activeCategorySubcategories.find((subcat) => subcat.slug === activeSubcategory)
          ?.label ?? `All ${activeCategoryLabel}`;

  function selectCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategory");
    params.set("category", category);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function selectSubcategory(subcategory: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", activeCategory);
    if (subcategory === "all") {
      params.delete("subcategory");
    } else {
      params.set("subcategory", subcategory);
    }
    const query = params.toString();
    router.replace(`${pathname}?${query}`, { scroll: false });
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 border-y border-white/10 py-4">
        {categories.filter((cat) => cat.slug !== "all").map((cat) => (
          <button
            key={cat.slug}
            onClick={() => selectCategory(cat.slug)}
            className={cn(
              "px-4 py-2 text-[11px] font-display uppercase tracking-wider transition-all duration-300 border",
              !isLandingPage && activeCategory === cat.slug
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-muted border-white/10 hover:border-primary/30 hover:text-text"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLandingPage ? (
        <section className="mt-10 space-y-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:items-end">
            <div>
              <p className="font-display text-[11px] uppercase tracking-wider text-primary">
                Holiday, Event, and Special Occasion Specials
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
                Personal pieces for the dates people actually remember.
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted md:text-base">
              Build seasonal gifts, event favors, client thank-yous, awards, and host pieces around
              the moments already on the calendar: 4th of July, Easter, Halloween, Thanksgiving,
              Christmas, weddings, graduations, and company events.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {occasionSpecials.map((occasion) => (
              <div
                key={occasion.title}
                className="border border-white/10 bg-surface/60 p-5 transition-colors hover:border-primary/30"
              >
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-text">
                  {occasion.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-muted">{occasion.description}</p>
              </div>
            ))}
          </div>

          <section>
            <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-[11px] uppercase tracking-wider text-primary">
                  Featured
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold">
                  Occasion-ready picks
                </h2>
              </div>
              <p className="text-sm text-muted">
                {featuredProducts.length} selected products
              </p>
            </div>

            <ProductGrid products={featuredProducts} />
          </section>
        </section>
      ) : (
      <div
        className={cn(
          "mt-10",
          activeCategoryHasSubcategories && "lg:grid lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-8"
        )}
      >
        {activeCategoryHasSubcategories && (
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-white/10 bg-surface/80 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur">
              <div className="border-b border-white/10 p-5">
                <p className="font-display text-[11px] uppercase tracking-wider text-primary">
                  {activeCategoryLabel} Catalog
                </p>
                <h2 className="mt-2 font-display text-xl font-bold leading-tight">
                  Product Lines
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Browse Polar Camel families by product line, finish, and use case.
                </p>
              </div>

              <details className="group lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between border-b border-white/10 px-5 py-4 font-display text-xs uppercase tracking-wider text-text">
                  {activeSubcategoryLabel}
                  <span className="text-primary transition-transform group-open:rotate-180">
                    v
                  </span>
                </summary>
                <CatalogLineNav
                  activeCategoryLabel={activeCategoryLabel}
                  activeSubcategory={activeSubcategory}
                  selectSubcategory={selectSubcategory}
                  subcategoryCounts={subcategoryCounts}
                  categoryProductCount={activeCategoryProductCount}
                  subcategoryGroups={activeCategoryGroups}
                  subcategories={activeCategorySubcategories}
                />
              </details>

              <div className="hidden lg:block">
                <CatalogLineNav
                  activeCategoryLabel={activeCategoryLabel}
                  activeSubcategory={activeSubcategory}
                  selectSubcategory={selectSubcategory}
                  subcategoryCounts={subcategoryCounts}
                  categoryProductCount={activeCategoryProductCount}
                  subcategoryGroups={activeCategoryGroups}
                  subcategories={activeCategorySubcategories}
                />
              </div>
            </div>
          </aside>
        )}

        <section className={cn(activeCategoryHasSubcategories && "mt-8 lg:mt-0")}>
          <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[11px] uppercase tracking-wider text-primary">
                {activeCategoryLabel}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">
                {activeCategory === "drinkware"
                  ? activeSubcategoryLabel
                  : activeCategoryHasSubcategories
                    ? activeSubcategoryLabel
                    : activeCategoryLabel}
              </h2>
            </div>
            <p className="text-sm text-muted">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>

          <ProductGrid products={filtered} />
        </section>
      </div>
      )}
    </>
  );
}

interface CatalogLineNavProps {
  activeCategoryLabel: string;
  activeSubcategory: string;
  selectSubcategory: (subcategory: string) => void;
  subcategoryCounts: Map<string, number>;
  categoryProductCount: number;
  subcategoryGroups: typeof polarCamelSubcategoryGroups;
  subcategories: typeof polarCamelSubcategories;
}

function CatalogLineNav({
  activeCategoryLabel,
  activeSubcategory,
  selectSubcategory,
  subcategoryCounts,
  categoryProductCount,
  subcategoryGroups,
  subcategories,
}: CatalogLineNavProps) {
  return (
    <nav className="max-h-[70vh] overflow-y-auto p-4">
      <button
        onClick={() => selectSubcategory("all")}
        className={cn(
          "mb-4 flex w-full items-center justify-between border px-3 py-2.5 text-left font-display text-xs uppercase tracking-wider transition-colors",
          activeSubcategory === "all"
            ? "border-primary bg-primary text-white"
            : "border-white/10 bg-background/50 text-muted hover:border-primary/30 hover:text-text"
        )}
      >
        <span>All {activeCategoryLabel}</span>
        <span>{categoryProductCount}</span>
      </button>

      <div className="space-y-5">
        {subcategoryGroups.map((group) => (
          <div key={group.slug}>
            <h3 className="mb-2 px-1 font-display text-[10px] uppercase tracking-wider text-muted">
              {group.label}
            </h3>
            <div className="space-y-1">
              {subcategories
                .filter((subcat) => subcat.group === group.slug)
                .map((subcat) => (
                  <button
                    key={subcat.slug}
                    onClick={() => selectSubcategory(subcat.slug)}
                    className={cn(
                      "flex w-full items-center justify-between border px-3 py-2 text-left text-xs transition-colors",
                      activeSubcategory === subcat.slug
                        ? "border-primary/80 bg-primary/15 text-text"
                        : "border-transparent text-muted hover:border-white/10 hover:bg-white/[0.03] hover:text-text"
                    )}
                  >
                    <span>{subcat.label}</span>
                    <span className="font-display text-[10px] text-muted">
                      {subcategoryCounts.get(subcat.slug) ?? 0}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
