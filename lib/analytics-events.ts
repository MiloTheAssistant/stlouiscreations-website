export const ANALYTICS_EVENT_TARGET = "stlouiscreations:analytics";

export const ANALYTICS_EVENTS = {
  quoteFormSubmit: "quote_form_submit",
  quoteProductTypeSelect: "quote_product_type_select",
  shopSearchSubmit: "shop_search_submit",
  shopCategorySelect: "shop_category_select",
  shopSubcategorySelect: "shop_subcategory_select",
  shopLoadMore: "shop_load_more",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type AnalyticsMetadataValue = string | number | boolean | null | undefined;
export type AnalyticsMetadata = Record<string, AnalyticsMetadataValue>;

export function analyticsEventAttributes(eventName: AnalyticsEventName) {
  return { "data-analytics-event": eventName };
}

function sanitizeMetadata(metadata: AnalyticsMetadata) {
  return Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined)
  );
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  metadata: AnalyticsMetadata = {}
) {
  if (
    typeof window === "undefined" ||
    typeof window.dispatchEvent !== "function" ||
    typeof CustomEvent === "undefined"
  ) {
    return false;
  }

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_EVENT_TARGET, {
      detail: {
        event: eventName,
        metadata: sanitizeMetadata(metadata),
      },
    })
  );

  return true;
}
