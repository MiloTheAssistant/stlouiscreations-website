import assert from "node:assert/strict";
import test from "node:test";
import {
  ANALYTICS_EVENT_TARGET,
  ANALYTICS_EVENTS,
  analyticsEventAttributes,
  trackAnalyticsEvent,
} from "@/lib/analytics-events";

test("defines stable website conversion events for launch readiness", () => {
  assert.deepEqual(ANALYTICS_EVENTS, {
    quoteFormSubmit: "quote_form_submit",
    quoteProductTypeSelect: "quote_product_type_select",
    shopSearchSubmit: "shop_search_submit",
    shopCategorySelect: "shop_category_select",
    shopSubcategorySelect: "shop_subcategory_select",
    shopLoadMore: "shop_load_more",
  });
});

test("returns DOM attributes that future analytics providers can bind to", () => {
  assert.deepEqual(
    analyticsEventAttributes(ANALYTICS_EVENTS.quoteFormSubmit),
    { "data-analytics-event": "quote_form_submit" }
  );
});

test("does not dispatch analytics events during server rendering", () => {
  assert.equal(
    trackAnalyticsEvent(ANALYTICS_EVENTS.shopSearchSubmit, { query: "tumblers" }),
    false
  );
});

test("dispatches a browser analytics event with sanitized metadata", () => {
  const previousWindow = globalThis.window;
  const previousCustomEvent = globalThis.CustomEvent;
  const target = new EventTarget();
  let received: CustomEvent | null = null;

  class TestCustomEvent<T = unknown> extends Event {
    detail: T;

    constructor(type: string, init?: CustomEventInit<T>) {
      super(type);
      this.detail = init?.detail as T;
    }
  }

  target.addEventListener(ANALYTICS_EVENT_TARGET, (event) => {
    received = event as CustomEvent;
  });

  try {
    (globalThis as typeof globalThis & { window?: EventTarget }).window = target;
    (globalThis as typeof globalThis & { CustomEvent?: typeof CustomEvent }).CustomEvent =
      TestCustomEvent as typeof CustomEvent;

    assert.equal(
      trackAnalyticsEvent(ANALYTICS_EVENTS.quoteProductTypeSelect, {
        productType: "Laser Cutting",
        empty: undefined,
      }),
      true
    );
  } finally {
    (globalThis as typeof globalThis & { window?: typeof previousWindow }).window =
      previousWindow;
    (globalThis as typeof globalThis & { CustomEvent?: typeof previousCustomEvent }).CustomEvent =
      previousCustomEvent;
  }

  assert.deepEqual(received?.detail, {
    event: "quote_product_type_select",
    metadata: { productType: "Laser Cutting" },
  });
});
