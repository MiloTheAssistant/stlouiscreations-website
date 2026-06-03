import { Suspense } from "react";
import ShopClient from "./ShopClient";
import { categories, polarCamelSubcategories } from "@/lib/shop-navigation";
import { getFeaturedShopProducts, getShopCatalog } from "@/lib/catalog/shop";
import {
  StampedPageHero,
  type BrandSourceKind,
} from "@/components/brand/BrandVisuals";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata, getProductCategoryJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Shop",
  description:
    "Shop customizable engraved products, drinkware, awards, fundraiser items, corporate gifts, and 3D printed products from St. Louis Creations.",
  path: "/shop",
  keywords: [
    "custom engraved products",
    "branded drinkware",
    "custom awards",
    "fundraiser products",
    "3D printed products",
  ],
});

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
  const shopSource: BrandSourceKind =
    activeCategory === "3d-prints"
      ? "3d-printing-finished-parts"
      : activeCategory === "all"
        ? "studio-precision"
        : "material-craft";

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <JsonLd data={getProductCategoryJsonLd()} />
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Shop"
          heading="Customizable Products Ready for Production"
          source={shopSource}
          visualLabel={activeCategory === "3d-prints" ? "3D Print Catalog" : "Production Catalog"}
          visualCaption={
            activeCategory === "3d-prints"
              ? "Printed parts, character pieces, and small-batch additive goods with the same studio finish."
              : "Engraved gifts, awards, drinkware, and source products ready for personalization."
          }
          className="mb-12"
        >
          <p>
            Browse product starting points for engraved gifts, awards,
            drinkware, campaigns, and branded objects.
          </p>
        </StampedPageHero>

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
              subcategoryVideos={catalog.subcategoryVideos}
              subcategoryCounts={catalog.subcategoryCounts}
              totalCount={catalog.totalCount}
            />
          </Suspense>
        </section>

        <section className="bg-surface border border-white/5 p-8 md:p-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Customizable products for gifts, campaigns, and production runs
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            The St. Louis Creations shop includes product starting points for
            engraved drinkware, awards, corporate gifts, fundraiser products,
            wood and slate goods, home items, and 3D printed designs. Many
            items can be personalized with names, logos, sponsor marks,
            artwork, campaign details, or production-specific finishes.
          </p>
        </section>
      </div>
    </div>
  );
}
