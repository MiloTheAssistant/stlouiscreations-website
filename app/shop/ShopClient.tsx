"use client";

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  categories,
  polarCamelSubcategories,
  polarCamelSubcategoryGroups,
} from "@/lib/shop-navigation";
import type { ShopProduct } from "@/lib/shop-product";
import ProductGrid from "@/components/shop/ProductGrid";
import { cn } from "@/lib/utils";

const occasionSpecials = [
  {
    title: "Summer Parties",
    description:
      "Coolers, tumblers, serving pieces, and awards for 4th of July cookouts, golf outings, and company picnics.",
  },
  {
    title: "Spring Celebrations",
    description:
      "Fresh personalized gifts for Easter baskets, graduations, school events, weddings, and showers.",
  },
  {
    title: "Fall Gatherings",
    description:
      "Halloween, Thanksgiving, tailgates, and harvest-table pieces with engraving that feels made for the moment.",
  },
  {
    title: "Christmas Gifts",
    description:
      "Drinkware, home goods, glassware, and recognition awards ready for clients, teams, families, and hosts.",
  },
];

interface ShopClientProps {
  activeCategory: string;
  activeSubcategory: string;
  categoryProductCount: number;
  featuredProducts: ShopProduct[];
  page: number;
  pageSize: number;
  products: ShopProduct[];
  searchQuery: string;
  subcategoryImages: Record<string, string[]>;
  subcategoryVideos: Record<string, string>;
  subcategoryCounts: Record<string, number>;
  totalCount: number;
}

export default function ShopClient({
  activeCategory,
  activeSubcategory,
  categoryProductCount,
  featuredProducts,
  page,
  pageSize,
  products,
  searchQuery,
  subcategoryImages,
  subcategoryVideos,
  subcategoryCounts,
  totalCount,
}: ShopClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const isSearching = searchQuery.length > 0;
  const isLandingPage = activeCategory === "all" && !isSearching;
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
  const activeCategoryLabel =
    activeCategory === "all"
      ? "All Shop"
      : categories.find((cat) => cat.slug === activeCategory)?.label ?? "Shop";
  const activeSubcategoryLabel =
    activeSubcategory
      ? activeCategorySubcategories.find((subcat) => subcat.slug === activeSubcategory)
          ?.label ?? activeCategoryLabel
      : `Choose ${activeCategoryLabel} Line`;
  const shouldShowLinePicker =
    activeCategoryHasSubcategories && !activeSubcategory && !isSearching;

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  function replaceParams(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    replaceParams((params) => {
      const query = searchInput.trim();
      params.delete("page");
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
    });
  }

  function clearSearch() {
    replaceParams((params) => {
      params.delete("q");
      params.delete("page");
    });
  }

  function selectCategory(category: string) {
    replaceParams((params) => {
      params.delete("subcategory");
      params.delete("page");
      if (category === "all") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
    });
  }

  function selectSubcategory(subcategory: string) {
    setMenuOpen(false);
    replaceParams((params) => {
      params.set("category", activeCategory);
      params.delete("page");
      if (subcategory) {
        params.set("subcategory", subcategory);
      } else {
        params.delete("subcategory");
      }
    });
  }

  function loadMore() {
    replaceParams((params) => {
      params.set("page", String(page + 1));
    });
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 border-y border-white/10 py-4">
        <button
          onClick={() => selectCategory("all")}
          className={cn(
            "px-4 py-2 text-[11px] font-display uppercase tracking-wider transition-all duration-300 border",
            activeCategory === "all"
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-muted border-white/10 hover:border-primary/30 hover:text-text"
          )}
        >
          All Shop
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => selectCategory(cat.slug)}
            className={cn(
              "px-4 py-2 text-[11px] font-display uppercase tracking-wider transition-all duration-300 border",
              activeCategory === cat.slug
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-muted border-white/10 hover:border-primary/30 hover:text-text"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={submitSearch}
        className="mt-6 grid gap-3 border-b border-white/10 pb-6 sm:grid-cols-[minmax(0,1fr)_auto_auto]"
      >
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={`Search ${activeSubcategory ? activeSubcategoryLabel : activeCategoryLabel}`}
          className="min-h-12 w-full border border-white/10 bg-surface px-4 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary/50"
        />
        <button
          type="submit"
          className="min-h-12 border border-primary bg-primary px-6 font-display text-xs font-bold uppercase tracking-wider text-white transition-shadow hover:shadow-glow-sm"
        >
          Search
        </button>
        {isSearching && (
          <button
            type="button"
            onClick={clearSearch}
            className="min-h-12 border border-white/10 px-6 font-display text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-primary/30 hover:text-text"
          >
            Clear
          </button>
        )}
      </form>

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
      ) : shouldShowLinePicker ? (
        <section className="mt-10 space-y-6">
          <div className="border-b border-white/10 pb-5">
            <p className="font-display text-[11px] uppercase tracking-wider text-primary">
              {activeCategoryLabel}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Choose a product line
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Browse by product family or search this category to narrow the catalog before loading products.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeCategorySubcategories.map((subcategory) => (
              <ProductLineCard
                key={subcategory.slug}
                imageSources={
                  subcategory.image
                    ? [subcategory.image]
                    : subcategoryImages[subcategory.slug] ?? []
                }
                productCount={subcategoryCounts[subcategory.slug] ?? 0}
                subcategory={subcategory}
                video={subcategoryVideos[subcategory.slug]}
                onSelect={selectSubcategory}
              />
            ))}
          </div>
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

                <details
                  open={menuOpen}
                  onToggle={(event) => setMenuOpen(event.currentTarget.open)}
                  className="group lg:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between border-b border-white/10 px-5 py-4 font-display text-xs uppercase tracking-wider text-text">
                    {activeSubcategoryLabel}
                    <span className="text-primary transition-transform group-open:rotate-180">
                      v
                    </span>
                  </summary>
                  <CatalogLineNav
                    activeSubcategory={activeSubcategory}
                    selectSubcategory={selectSubcategory}
                    subcategoryCounts={subcategoryCounts}
                    categoryProductCount={categoryProductCount}
                    subcategoryGroups={activeCategoryGroups}
                    subcategories={activeCategorySubcategories}
                  />
                </details>

                <div className="hidden lg:block">
                  <CatalogLineNav
                    activeSubcategory={activeSubcategory}
                    selectSubcategory={selectSubcategory}
                    subcategoryCounts={subcategoryCounts}
                    categoryProductCount={categoryProductCount}
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
                  {activeSubcategory || activeCategoryHasSubcategories
                    ? activeSubcategoryLabel
                    : activeCategoryLabel}
                </h2>
              </div>
              <p className="text-sm text-muted">
                {isSearching && `Search: "${searchQuery}" - `}
                {totalCount} {totalCount === 1 ? "product" : "products"}
              </p>
            </div>

            <ProductGrid
              products={products}
              totalCount={totalCount}
              onLoadMore={loadMore}
              initialLimit={pageSize}
              emptyMessage="No products found. Try a broader search or choose another category."
            />
          </section>
        </div>
      )}
    </>
  );
}

interface ProductLineCardProps {
  imageSources: string[];
  productCount: number;
  subcategory: (typeof polarCamelSubcategories)[number];
  video?: string;
  onSelect: (subcategory: string) => void;
}

function ProductLineCard({
  imageSources,
  productCount,
  subcategory,
  video,
  onSelect,
}: ProductLineCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function playPreview() {
    if (!videoRef.current) {
      return;
    }

    void videoRef.current.play().catch(() => {
      // The category art remains visible if a browser blocks hover playback.
    });
  }

  function resetPreview() {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(subcategory.slug)}
      onMouseEnter={playPreview}
      onMouseLeave={resetPreview}
      onFocus={playPreview}
      onBlur={resetPreview}
      className="group overflow-hidden border border-white/10 bg-[#101010] text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_22px_55px_rgba(0,0,0,0.38),0_0_28px_rgba(255,107,0,0.16)]"
    >
      <span className="relative block aspect-[16/9] overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_50%_24%,rgba(255,107,0,0.18),rgba(255,107,0,0.04)_34%,rgba(6,6,6,0.98)_72%)]">
        <span className="absolute inset-4 border border-white/5 bg-black/30 shadow-[inset_0_0_36px_rgba(255,107,0,0.08)] transition-colors duration-300 group-hover:border-primary/20" />
        {imageSources.slice(0, 3).map((image, index) => (
          <span
            key={image}
            className={cn(
              "absolute transition-transform duration-500 group-hover:scale-[1.04]",
              index === 0 && "left-[8%] top-[12%] h-[76%] w-[84%]",
              index === 1 && "right-[8%] top-[12%] h-[76%] w-[34%]",
              index === 2 && "right-[31%] bottom-[10%] h-[46%] w-[24%]"
            )}
          >
            <Image
              src={image}
              alt={`${subcategory.label} product`}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw"
              className="object-contain p-3 drop-shadow-[0_20px_28px_rgba(0,0,0,0.45)]"
            />
          </span>
        ))}
        {video && (
          <video
            ref={videoRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-black object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
            loop
            muted
            playsInline
            poster={imageSources[0]}
            preload="metadata"
          >
            <source src={video} type="video/webm" />
          </video>
        )}
      </span>
      <span className="block p-5">
        <span className="font-display text-sm font-bold uppercase tracking-wider text-text transition-colors group-hover:text-primary">
          {subcategory.label}
        </span>
        <span className="mt-3 block text-xs text-muted">
          {productCount} products
        </span>
      </span>
    </button>
  );
}

interface CatalogLineNavProps {
  activeSubcategory: string;
  selectSubcategory: (subcategory: string) => void;
  subcategoryCounts: Record<string, number>;
  categoryProductCount: number;
  subcategoryGroups: typeof polarCamelSubcategoryGroups;
  subcategories: typeof polarCamelSubcategories;
}

function CatalogLineNav({
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
        onClick={() => selectSubcategory("")}
        className={cn(
          "mb-4 flex w-full items-center justify-between border px-3 py-2.5 text-left font-display text-xs uppercase tracking-wider transition-colors",
          activeSubcategory === ""
            ? "border-primary bg-primary text-white"
            : "border-white/10 bg-background/50 text-muted hover:border-primary/30 hover:text-text"
        )}
      >
        <span>Product Lines</span>
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
                      {subcategoryCounts[subcat.slug] ?? 0}
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
