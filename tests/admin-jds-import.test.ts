import assert from "node:assert/strict";
import test from "node:test";
import {
  createSignedAdminSession,
  isAdminEmailAllowed,
  readSignedAdminSession,
} from "@/lib/admin/session";
import {
  buildJdsImportRecord,
  parseSkuInput,
  retailPriceFromWholesale,
} from "@/lib/jds/import";

test("allows admin emails from a comma separated allowlist case-insensitively", () => {
  assert.equal(
    isAdminEmailAllowed(
      "Owner@StLouisCreations.com",
      "owner@stlouiscreations.com, admin@example.com"
    ),
    true
  );
  assert.equal(
    isAdminEmailAllowed(
      "other@example.com",
      "owner@stlouiscreations.com, admin@example.com"
    ),
    false
  );
});

test("rejects tampered admin sessions", () => {
  process.env.ADMIN_EMAILS = "owner@stlouiscreations.com";
  const session = createSignedAdminSession(
    { email: "owner@stlouiscreations.com", name: "Owner" },
    "test-secret",
    new Date("2026-05-28T12:00:00Z")
  );

  assert.equal(
    readSignedAdminSession(
      session,
      "test-secret",
      new Date("2026-05-28T13:00:00Z")
    )?.email,
    "owner@stlouiscreations.com"
  );

  assert.equal(
    readSignedAdminSession(
      `${session.slice(0, -2)}xx`,
      "test-secret",
      new Date("2026-05-28T13:00:00Z")
    ),
    null
  );
});

test("parses pasted SKU input into a normalized unique SKU list", () => {
  assert.deepEqual(parseSkuInput(" ltm7101, LTM7102\nbra467\tltm7101 "), [
    "LTM7101",
    "LTM7102",
    "BRA467",
  ]);
});

test("maps a JDS product into a draft catalog import record with markup", () => {
  const record = buildJdsImportRecord(
    {
      sku: "LPB004",
      name: "Polar Camel 18 oz. Small Teal Pet Bowl",
      description: "Sturdy and durable Polar Camel pet bowl.",
      caseQuantity: 12,
      lessThanCasePrice: 10.75,
      oneCase: 9.25,
    },
    {
      category: "drinkware",
      subcategory: "pet-bowls",
      markupPercent: 125,
      status: "draft",
    }
  );

  assert.equal(record.sku, "LPB004");
  assert.equal(record.slug, "jds-lpb004-polar-camel-18-oz-small-teal-pet-bowl");
  assert.equal(record.basePrice, 2419);
  assert.equal(record.quoteRequired, true);
  assert.equal(record.sourceCatalog, "jds_industries_api");
  assert.equal(record.status, "draft");
  assert.equal(record.tags.includes("JDS Industries"), true);
  assert.equal(record.personalizationAvailable, true);
});

test("rounds retail price from wholesale dollars and markup percent", () => {
  assert.equal(retailPriceFromWholesale(10.75, 125), 2419);
});
