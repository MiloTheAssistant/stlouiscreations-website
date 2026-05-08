import { Suspense } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ShopClient from "./ShopClient";
import { categories, polarCamelSubcategories } from "@/lib/shop-navigation";
import { getFeaturedShopProducts, getShopCatalog } from "@/lib/catalog/shop";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams?: {
    category?: string;
    subcategory?: string;
    q?: string;
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const requestedCategory = searchParams?.category;
  const activeCategory =
    requestedCategory && categories.some((category) => category.slug === requestedCategory)
      ? requestedCategory
      : "all";
  const requestedSubcategory = searchParams?.subcategory ?? "";
  const activeSubcategory =
    requestedSubcategory &&
    polarCamelSubcategories.some(
      (subcategory) =>
        subcategory.category === activeCategory && subcategory.slug === requestedSubcategory
    )
      ? requestedSubcategory
      : "";
  const searchQuery = searchParams?.q?.trim() ?? "";
  const page = Math.max(Number.parseInt(searchParams?.page ?? "1", 10) || 1, 1);
  const [catalog, featuredProducts] = await Promise.all([
    getShopCatalog({
      category: activeCategory,
      subcategory: activeSubcategory,
      query: searchQuery,
      page,
    }),
    getFeaturedShopProducts(),
  ]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <section className="text-center mb-12">
          <SectionLabel>Shop</SectionLabel>
          <AnimatedHeading
            text="Customizable Products Ready for Production"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Browse product starting points for engraved gifts, awards,
            drinkware, campaigns, and branded objects.
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <Suspense fallback={null}>
            <ShopClient
              activeCategory={activeCategory}
              activeSubcategory={activeSubcategory}
              categoryProductCount={catalog.categoryProductCount}
              featuredProducts={featuredProducts}
              page={page}
              pageSize={catalog.pageSize}
              products={catalog.products}
              searchQuery={searchQuery}
              subcategoryImages={catalog.subcategoryImages}
              subcategoryCounts={catalog.subcategoryCounts}
              totalCount={catalog.totalCount}
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
