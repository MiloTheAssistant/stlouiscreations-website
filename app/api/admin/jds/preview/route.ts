import { requireAdminApiSession } from "@/lib/admin/api";
import { fetchJdsInventory, fetchJdsProductDetails } from "@/lib/jds/client";
import {
  buildJdsImportPreview,
  parseSkuInput,
  type JdsImportOptions,
} from "@/lib/jds/import";

export const dynamic = "force-dynamic";

interface PreviewRequestBody {
  skus?: string[] | string;
  category?: string;
  subcategory?: string | null;
  markupPercent?: number;
  status?: "draft" | "active";
}

function skuInputFromBody(value: PreviewRequestBody["skus"]): string {
  return Array.isArray(value) ? value.join("\n") : value ?? "";
}

function importOptionsFromBody(body: PreviewRequestBody): JdsImportOptions {
  return {
    category: body.category?.trim() || "jds-imports",
    subcategory: body.subcategory?.trim() || null,
    markupPercent: Number.isFinite(body.markupPercent)
      ? Number(body.markupPercent)
      : 125,
    status: body.status === "active" ? "active" : "draft",
  };
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) {
    return unauthorized;
  }

  const body = (await request.json()) as PreviewRequestBody;
  const skus = parseSkuInput(skuInputFromBody(body.skus));

  if (skus.length === 0) {
    return Response.json({ error: "At least one SKU is required." }, { status: 400 });
  }

  const options = importOptionsFromBody(body);
  const [products, inventory] = await Promise.all([
    fetchJdsProductDetails(skus),
    fetchJdsInventory(skus).catch(() => []),
  ]);
  const inventoryBySku = new Map(
    inventory.map((item) => [item.sku.trim().toUpperCase(), item])
  );
  const previews = products.map((product) =>
    buildJdsImportPreview(
      product,
      inventoryBySku.get(product.sku.trim().toUpperCase()) ?? null,
      options
    )
  );
  const foundSkus = new Set(previews.map((preview) => preview.sku));

  return Response.json({
    previews,
    missingSkus: skus.filter((sku) => !foundSkus.has(sku)),
  });
}
