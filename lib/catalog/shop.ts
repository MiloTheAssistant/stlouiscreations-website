import { unstable_noStore as noStore } from "next/cache";
import { getSql } from "@/lib/db";
import type { ShopProduct } from "@/lib/shop-product";

const SHOP_PAGE_SIZE = 48;

export interface ShopFilters {
  category: string;
  subcategory: string;
  query: string;
  page?: number;
}

export interface ShopCatalogResult {
  products: ShopProduct[];
  totalCount: number;
  pageSize: number;
  subcategoryCounts: Record<string, number>;
  subcategoryImages: Record<string, string[]>;
  categoryProductCount: number;
}

interface ProductRow {
  slug: string;
  title: string;
  description: string;
  images: string[] | null;
  tags: string[] | null;
  base_price: number;
  quote_required: boolean;
  stripe_price_id: string | null;
}

interface CountRow {
  count: string | number;
}

interface SubcategoryCountRow {
  subcategory: string | null;
  count: string | number;
}

interface SubcategoryImageRow {
  subcategory: string | null;
  image: string | null;
}

function normalizeCount(value: string | number): number {
  return typeof value === "number" ? value : Number.parseInt(value, 10);
}

function mapProduct(row: ProductRow): ShopProduct {
  return {
    slug: row.slug,
    name: row.title,
    price: row.base_price,
    stripePriceId: row.stripe_price_id ?? (row.quote_required ? "quote" : ""),
    images: row.images ?? [],
    description: row.description,
    tags: row.tags ?? [],
    purchaseMode: row.quote_required ? "quote" : "cart",
  };
}

function searchableQuery(query: string): string {
  return `%${query.toLowerCase()}%`;
}

function mapSubcategoryImages(rows: SubcategoryImageRow[]): Record<string, string[]> {
  const images: Record<string, string[]> = {};

  for (const row of rows) {
    if (!row.subcategory || !row.image) {
      continue;
    }

    const currentImages = images[row.subcategory] ?? [];
    if (currentImages.length < 3 && !currentImages.includes(row.image)) {
      images[row.subcategory] = [...currentImages, row.image];
    }
  }

  return images;
}

async function getSubcategoryImages(
  sql: ReturnType<typeof getSql>,
  category: string
): Promise<Record<string, string[]>> {
  if (!category) {
    return {};
  }

  const rows = await sql.query(
    `select subcategory, images->>0 as image
     from product_catalog
     where status = 'active'
       and category = $1
       and subcategory is not null
       and jsonb_array_length(images) > 0
     order by subcategory asc, title asc`,
    [category]
  );

  return mapSubcategoryImages(rows as SubcategoryImageRow[]);
}

export async function getShopCatalog({
  category,
  subcategory,
  query,
  page = 1,
}: ShopFilters): Promise<ShopCatalogResult> {
  noStore();

  const sql = getSql();
  const activeCategory = category === "all" ? "" : category;
  const activeSubcategory = subcategory.trim();
  const search = query.trim().toLowerCase();
  const limit = SHOP_PAGE_SIZE;
  const offset = Math.max(page - 1, 0) * limit;

  if (activeCategory && activeSubcategory && search) {
    const [products, totalRows, subcategoryRows, categoryRows, subcategoryImages] = await Promise.all([
      sql.query(
        `select slug, title, description, images, tags, base_price, quote_required, stripe_price_id
         from product_catalog
         where status = 'active'
           and category = $1
           and subcategory = $2
           and (
             lower(title) like $3
             or lower(description) like $3
             or lower(sku) like $3
             or lower(supplier) like $3
             or exists (select 1 from jsonb_array_elements_text(tags) tag where lower(tag) like $3)
           )
         order by title asc
         limit $4 offset $5`,
        [activeCategory, activeSubcategory, searchableQuery(search), limit, offset]
      ),
      sql.query(
        `select count(*)::text as count
         from product_catalog
         where status = 'active'
           and category = $1
           and subcategory = $2
           and (
             lower(title) like $3
             or lower(description) like $3
             or lower(sku) like $3
             or lower(supplier) like $3
             or exists (select 1 from jsonb_array_elements_text(tags) tag where lower(tag) like $3)
           )`,
        [activeCategory, activeSubcategory, searchableQuery(search)]
      ),
      sql.query(
        `select subcategory, count(*)::text as count
         from product_catalog
         where status = 'active' and category = $1 and subcategory is not null
         group by subcategory`,
        [activeCategory]
      ),
      sql.query(
        `select count(*)::text as count
         from product_catalog
         where status = 'active' and category = $1`,
        [activeCategory]
      ),
      getSubcategoryImages(sql, activeCategory),
    ]);

    return {
      products: (products as ProductRow[]).map(mapProduct),
      totalCount: normalizeCount((totalRows as CountRow[])[0]?.count ?? 0),
      pageSize: SHOP_PAGE_SIZE,
      subcategoryCounts: Object.fromEntries(
        (subcategoryRows as SubcategoryCountRow[])
          .filter((row) => row.subcategory)
          .map((row) => [row.subcategory, normalizeCount(row.count)])
      ),
      subcategoryImages,
      categoryProductCount: normalizeCount((categoryRows as CountRow[])[0]?.count ?? 0),
    };
  }

  const conditions = ["status = 'active'"];
  const values: string[] = [];

  if (activeCategory) {
    values.push(activeCategory);
    conditions.push(`category = $${values.length}`);
  }

  if (activeSubcategory) {
    values.push(activeSubcategory);
    conditions.push(`subcategory = $${values.length}`);
  }

  if (search) {
    values.push(searchableQuery(search));
    conditions.push(`(
      lower(title) like $${values.length}
      or lower(description) like $${values.length}
      or lower(sku) like $${values.length}
      or lower(supplier) like $${values.length}
      or exists (select 1 from jsonb_array_elements_text(tags) tag where lower(tag) like $${values.length})
    )`);
  }

  const whereClause = conditions.join(" and ");
  const [products, totalRows, subcategoryRows, categoryRows, subcategoryImages] = await Promise.all([
    sql.query(
      `select slug, title, description, images, tags, base_price, quote_required, stripe_price_id
       from product_catalog
       where ${whereClause}
       order by title asc
       limit $${values.length + 1} offset $${values.length + 2}`,
      [...values, String(limit), String(offset)]
    ),
    sql.query(
      `select count(*)::text as count from product_catalog where ${whereClause}`,
      values
    ),
    activeCategory
      ? sql.query(
          `select subcategory, count(*)::text as count
           from product_catalog
           where status = 'active' and category = $1 and subcategory is not null
           group by subcategory`,
          [activeCategory]
        )
      : Promise.resolve([] as SubcategoryCountRow[]),
    activeCategory
      ? sql.query(
          `select count(*)::text as count
           from product_catalog
           where status = 'active' and category = $1`,
          [activeCategory]
        )
      : sql.query(
          `select count(*)::text as count
           from product_catalog
           where status = 'active'`,
          []
        ),
    getSubcategoryImages(sql, activeCategory),
  ]);

  return {
    products: (products as ProductRow[]).map(mapProduct),
    totalCount: normalizeCount((totalRows as CountRow[])[0]?.count ?? 0),
    pageSize: SHOP_PAGE_SIZE,
    subcategoryCounts: Object.fromEntries(
      (subcategoryRows as SubcategoryCountRow[])
        .filter((row) => row.subcategory)
        .map((row) => [row.subcategory, normalizeCount(row.count)])
    ),
    subcategoryImages,
    categoryProductCount: normalizeCount((categoryRows as CountRow[])[0]?.count ?? 0),
  };
}

export async function getFeaturedShopProducts(): Promise<ShopProduct[]> {
  noStore();

  const sql = getSql();
  const rows = await sql.query(
    `select slug, title, description, images, tags, base_price, quote_required, stripe_price_id
     from product_catalog
     where status = 'active'
       and tags ? 'Featured'
     order by title asc
     limit 8`,
    []
  );

  return (rows as ProductRow[]).map(mapProduct);
}

