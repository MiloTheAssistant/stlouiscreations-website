import { requireAdminApiSession } from "@/lib/admin/api";
import { upsertCatalogProducts } from "@/lib/catalog/repository";
import type { CatalogProductRecord } from "@/lib/stripe/catalog-sync";

export const dynamic = "force-dynamic";

interface ImportRequestBody {
  products?: CatalogProductRecord[];
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) {
    return unauthorized;
  }

  const body = (await request.json()) as ImportRequestBody;
  const products = Array.isArray(body.products) ? body.products : [];

  if (products.length === 0) {
    return Response.json(
      { error: "Select at least one product to import." },
      { status: 400 }
    );
  }

  const sanitizedProducts = products.map((product) => ({
    ...product,
    supplier: "JDS Industries",
    sourceCatalog: "jds_industries_api",
    status: product.status === "active" ? "active" : "draft",
    quoteRequired: true,
    stripeProductId: null,
    stripePriceId: null,
  }));

  await upsertCatalogProducts(sanitizedProducts);

  return Response.json({
    importedCount: sanitizedProducts.length,
    skus: sanitizedProducts.map((product) => product.sku),
  });
}
