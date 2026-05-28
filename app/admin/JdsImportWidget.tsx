"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { JdsImportPreview } from "@/lib/jds/import";
import type { CatalogProductRecord } from "@/lib/stripe/catalog-sync";

interface PreviewResponse {
  previews: JdsImportPreview[];
  missingSkus: string[];
  error?: string;
}

interface ImportResponse {
  importedCount?: number;
  skus?: string[];
  error?: string;
}

const defaultSkuInput = "HC104\nRC78\nVSR204";

export default function JdsImportWidget() {
  const [skuInput, setSkuInput] = useState(defaultSkuInput);
  const [category, setCategory] = useState("jds-imports");
  const [subcategory, setSubcategory] = useState("");
  const [markupPercent, setMarkupPercent] = useState(125);
  const [status, setStatus] = useState<"draft" | "active">("draft");
  const [search, setSearch] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const [previews, setPreviews] = useState<JdsImportPreview[]>([]);
  const [missingSkus, setMissingSkus] = useState<string[]>([]);
  const [selectedSkus, setSelectedSkus] = useState<Set<string>>(new Set());
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredPreviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return previews.filter((preview) => {
      if (stockOnly && (preview.inventoryAvailable ?? 0) <= 0) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        preview.sku.toLowerCase().includes(query) ||
        preview.name.toLowerCase().includes(query) ||
        preview.description.toLowerCase().includes(query)
      );
    });
  }, [previews, search, stockOnly]);

  const selectedProducts = previews
    .filter((preview) => selectedSkus.has(preview.sku))
    .map((preview) => preview.record);

  function toggleSku(sku: string) {
    setSelectedSkus((current) => {
      const next = new Set(current);
      if (next.has(sku)) {
        next.delete(sku);
      } else {
        next.add(sku);
      }
      return next;
    });
  }

  function selectVisible() {
    setSelectedSkus((current) => {
      const next = new Set(current);
      for (const preview of filteredPreviews) {
        next.add(preview.sku);
      }
      return next;
    });
  }

  async function previewProducts() {
    setIsPreviewing(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/admin/jds/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skus: skuInput,
          category,
          subcategory,
          markupPercent,
          status,
        }),
      });
      const payload = (await response.json()) as PreviewResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to preview JDS products.");
      }

      setPreviews(payload.previews);
      setMissingSkus(payload.missingSkus ?? []);
      setSelectedSkus(new Set(payload.previews.map((preview) => preview.sku)));
      setMessage(`Previewed ${payload.previews.length} JDS products.`);
    } catch (previewError) {
      setError(
        previewError instanceof Error
          ? previewError.message
          : "Unable to preview JDS products."
      );
    } finally {
      setIsPreviewing(false);
    }
  }

  async function importSelected() {
    if (selectedProducts.length === 0) {
      setError("Select at least one product to import.");
      return;
    }

    setIsImporting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/admin/jds/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: selectedProducts satisfies CatalogProductRecord[],
        }),
      });
      const payload = (await response.json()) as ImportResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to import selected products.");
      }

      setMessage(
        `Imported ${payload.importedCount ?? selectedProducts.length} products as ${status}.`
      );
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "Unable to import selected products."
      );
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <section className="rounded border border-white/10 bg-surface/90 p-5 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-2 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-wider text-primary">
            Supplier Import
          </p>
          <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text">
            JDS Import
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span className="border border-white/10 px-3 py-2">
            Preview: {previews.length}
          </span>
          <span className="border border-white/10 px-3 py-2">
            Selected: {selectedSkus.size}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              SKU Input
            </span>
            <textarea
              value={skuInput}
              onChange={(event) => setSkuInput(event.target.value)}
              rows={10}
              className="mt-2 min-h-56 w-full resize-y border border-white/10 bg-background px-4 py-3 font-mono text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary/60"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Category
              </span>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 min-h-11 w-full border border-white/10 bg-background px-3 text-sm text-text outline-none focus:border-primary/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Subcategory
              </span>
              <input
                value={subcategory}
                onChange={(event) => setSubcategory(event.target.value)}
                className="mt-2 min-h-11 w-full border border-white/10 bg-background px-3 text-sm text-text outline-none focus:border-primary/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Markup %
              </span>
              <input
                type="number"
                min={0}
                value={markupPercent}
                onChange={(event) => setMarkupPercent(Number(event.target.value))}
                className="mt-2 min-h-11 w-full border border-white/10 bg-background px-3 text-sm text-text outline-none focus:border-primary/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Import Status
              </span>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value === "active" ? "active" : "draft")
                }
                className="mt-2 min-h-11 w-full border border-white/10 bg-background px-3 text-sm text-text outline-none focus:border-primary/60"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={previewProducts}
            disabled={isPreviewing}
            className="min-h-12 w-full bg-primary px-5 font-display text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:shadow-glow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPreviewing ? "Previewing..." : "Preview JDS Products"}
          </button>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Filter preview"
              className="min-h-11 border border-white/10 bg-background px-3 text-sm text-text outline-none placeholder:text-muted focus:border-primary/60"
            />
            <label className="flex min-h-11 items-center gap-2 border border-white/10 px-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(event) => setStockOnly(event.target.checked)}
              />
              In Stock
            </label>
            <button
              type="button"
              onClick={selectVisible}
              className="min-h-11 border border-white/10 px-4 font-display text-xs font-bold uppercase tracking-wider text-text transition-colors hover:border-primary/50"
            >
              Select Visible
            </button>
          </div>

          {(message || error || missingSkus.length > 0) && (
            <div className="space-y-2 text-sm">
              {message && (
                <p className="border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-200">
                  {message}
                </p>
              )}
              {error && (
                <p className="border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-200">
                  {error}
                </p>
              )}
              {missingSkus.length > 0 && (
                <p className="border border-secondary/30 bg-secondary/10 px-3 py-2 text-secondary">
                  Missing SKUs: {missingSkus.join(", ")}
                </p>
              )}
            </div>
          )}

          <div className="max-h-[620px] overflow-auto border border-white/10">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-background text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="w-12 px-3 py-3">Pick</th>
                  <th className="px-3 py-3">SKU</th>
                  <th className="px-3 py-3">Product</th>
                  <th className="px-3 py-3">Wholesale</th>
                  <th className="px-3 py-3">Retail</th>
                  <th className="px-3 py-3">Stock</th>
                  <th className="px-3 py-3">Case</th>
                </tr>
              </thead>
              <tbody>
                {filteredPreviews.map((preview) => (
                  <tr key={preview.sku} className="border-t border-white/10">
                    <td className="px-3 py-3 align-top">
                      <input
                        type="checkbox"
                        checked={selectedSkus.has(preview.sku)}
                        onChange={() => toggleSku(preview.sku)}
                      />
                    </td>
                    <td className="px-3 py-3 align-top font-mono text-xs text-primary">
                      {preview.sku}
                    </td>
                    <td className="px-3 py-3 align-top">
                      <p className="font-bold text-text">{preview.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted">
                        {preview.description}
                      </p>
                    </td>
                    <td className="px-3 py-3 align-top text-muted">
                      {formatPrice(Math.round(preview.wholesalePrice * 100))}
                    </td>
                    <td className="px-3 py-3 align-top font-bold text-text">
                      {formatPrice(preview.retailPrice)}
                    </td>
                    <td className="px-3 py-3 align-top text-muted">
                      {preview.inventoryAvailable ?? preview.inventoryStatus ?? "Review"}
                    </td>
                    <td className="px-3 py-3 align-top text-muted">
                      {preview.caseQuantity ?? "Review"}
                    </td>
                  </tr>
                ))}
                {filteredPreviews.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-12 text-center text-muted">
                      No preview rows.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={importSelected}
            disabled={isImporting || selectedProducts.length === 0}
            className="min-h-12 w-full border border-primary bg-primary px-5 font-display text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:shadow-glow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isImporting
              ? "Importing..."
              : `Import ${selectedProducts.length} Selected`}
          </button>
        </div>
      </div>
    </section>
  );
}
