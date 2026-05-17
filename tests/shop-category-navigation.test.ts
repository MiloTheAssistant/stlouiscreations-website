import assert from "node:assert/strict";
import test from "node:test";
import { getLocalCatalogRecords } from "@/lib/catalog/source";
import { categories as productCategories, products } from "@/lib/products";
import {
  categories as shopCategories,
  polarCamelSubcategories,
  polarCamelSubcategoryGroups,
} from "@/lib/shop-navigation";

const hiddenTopLevelCategories = ["corporate", "glassware"];
const glasswareSubcategorySlugs = [
  "decanter-sets-decanters-rocks-glasses",
  "cocktail-and-shot-glasses",
  "champagne-and-wine-glasses",
  "beer-and-coffee-glasses-and-mugs",
];

test("shop category navigation removes Corporate and top-level Glassware", () => {
  for (const categoryList of [shopCategories, productCategories]) {
    assert.ok(categoryList.some((category) => category.slug === "home-goods"));

    for (const hiddenCategory of hiddenTopLevelCategories) {
      assert.equal(
        categoryList.some((category) => category.slug === hiddenCategory),
        false,
        `${hiddenCategory} should not be a top-level category`
      );
    }
  }
});

test("Glassware subcategories live under Home Goods", () => {
  assert.deepEqual(
    polarCamelSubcategoryGroups.find((group) => group.slug === "glassware"),
    {
      slug: "glassware",
      label: "Glassware",
      category: "home-goods",
      categoryLabel: "Home Goods",
    }
  );

  for (const slug of glasswareSubcategorySlugs) {
    const subcategory = polarCamelSubcategories.find((candidate) => candidate.slug === slug);

    assert.ok(subcategory, `${slug} should exist`);
    assert.equal(subcategory.group, "glassware");
    assert.equal(subcategory.groupLabel, "Glassware");
    assert.equal(subcategory.category, "home-goods");
    assert.equal(subcategory.categoryLabel, "Home Goods");
  }
});

test("Glassware products seed as Home Goods catalog records", () => {
  assert.equal(
    products.some((product) => product.category === "glassware"),
    false
  );

  const decanterSet = products.find(
    (product) =>
      product.slug ===
      "polar-camel-dcs301s-750-ml-polar-camel-square-decanter-set-with-4-11-oz-square-rocks-glasses"
  );

  assert.ok(decanterSet);
  assert.equal(decanterSet.category, "home-goods");
  assert.equal(decanterSet.subcategory, "decanter-sets-decanters-rocks-glasses");

  const records = getLocalCatalogRecords();
  assert.equal(
    records.some((record) => record.category === "glassware"),
    false
  );
  assert.ok(
    records.some(
      (record) =>
        record.category === "home-goods" &&
        record.subcategory === "decanter-sets-decanters-rocks-glasses"
    )
  );
});
