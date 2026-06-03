import assert from "node:assert/strict";
import test from "node:test";
import {
  coreTopicHubs,
  getTopicHubBySlug,
  getTopicProofRoutes,
  topicHubs,
} from "@/lib/topic-hubs";

const forbiddenSlop = [
  "in today's fast-paced",
  "game changer",
  "unlock your potential",
  "revolutionize",
  "cutting-edge solution",
  "seamless experience",
  "elevate your brand",
];

const evidenceSignalPattern =
  /\b(\d+|AI|EPS|SVG|PDF|STL|STEP|OBJ|3MF|CAD|PLA|PETG|TPU|ABS|ASA|resin|wood|acrylic|glass|metal|slate|leatherette|QR|proof|deadline|quantity|tolerance|infill|layer|orientation)\b/i;

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test("publishes five core cite-ready topic hubs with proof pages", () => {
  assert.equal(coreTopicHubs.length, 5);

  for (const hub of coreTopicHubs) {
    assert.equal(getTopicHubBySlug(hub.slug)?.slug, hub.slug);
    assert.ok(
      wordCount(hub.answer) >= 120 && wordCount(hub.answer) <= 180,
      `${hub.slug} answer should be 120-180 words`
    );
    assert.ok(
      hub.evidenceBlocks && hub.evidenceBlocks.length >= 4,
      `${hub.slug} needs at least four evidence blocks`
    );

    for (const block of hub.evidenceBlocks ?? []) {
      assert.ok(
        wordCount(block.body) >= 120 && wordCount(block.body) <= 180,
        `${hub.slug} evidence block "${block.title}" should be 120-180 words`
      );
      assert.ok(
        block.facts.length >= 3,
        `${hub.slug} evidence block "${block.title}" needs at least three facts`
      );
      assert.match(
        `${block.body} ${block.facts.join(" ")}`,
        evidenceSignalPattern,
        `${hub.slug} evidence block "${block.title}" needs concrete evidence signals`
      );
    }

    assert.ok(
      hub.comparisonTables && hub.comparisonTables.length >= 1,
      `${hub.slug} needs at least one comparison table`
    );

    for (const table of hub.comparisonTables ?? []) {
      assert.ok(
        table.columns.length >= 3,
        `${hub.slug} comparison table "${table.title}" needs at least three columns`
      );
      assert.ok(
        table.rows.length >= 3,
        `${hub.slug} comparison table "${table.title}" needs at least three rows`
      );

      for (const row of table.rows) {
        assert.equal(
          row.cells.length,
          table.columns.length,
          `${hub.slug} comparison table "${table.title}" row "${row.label}" must align with columns`
        );
      }
    }

    assert.ok(hub.proofPages?.faq, `${hub.slug} is missing a FAQ proof page`);
    assert.ok(hub.proofPages?.useCase, `${hub.slug} is missing a use-case proof page`);
    assert.ok(hub.faqs.length >= 3, `${hub.slug} needs visible FAQ answers`);
    assert.ok(
      wordCount(hub.proofPages.faq.intro) >= 120 &&
        wordCount(hub.proofPages.faq.intro) <= 180,
      `${hub.slug} FAQ intro should be 120-180 words`
    );
    assert.ok(
      wordCount(hub.proofPages.useCase.summary) >= 120 &&
        wordCount(hub.proofPages.useCase.summary) <= 180,
      `${hub.slug} use-case summary should be 120-180 words`
    );

    for (const faq of hub.proofPages.faq.questions) {
      assert.ok(
        wordCount(faq.a) >= 60,
        `${hub.slug} FAQ answer "${faq.q}" should be at least 60 words`
      );
    }

    const combinedCopy = [
      hub.title,
      hub.description,
      hub.answer,
      ...(hub.evidenceBlocks ?? []).flatMap((block) => [
        block.title,
        block.body,
        ...block.facts,
      ]),
      ...(hub.comparisonTables ?? []).flatMap((table) => [
        table.title,
        table.description,
        ...table.columns,
        ...table.rows.flatMap((row) => [row.label, ...row.cells]),
        table.note ?? "",
      ]),
      ...hub.sections.flatMap((section) => [section.title, section.body, ...(section.bullets ?? [])]),
      ...hub.faqs.flatMap((faq) => [faq.q, faq.a]),
      hub.proofPages?.faq.intro ?? "",
      hub.proofPages?.useCase.summary ?? "",
    ]
      .join(" ")
      .toLowerCase();

    for (const phrase of forbiddenSlop) {
      assert.equal(
        combinedCopy.includes(phrase),
        false,
        `${hub.slug} contains filler phrase "${phrase}"`
      );
    }
  }
});

test("creates two proof routes for every core hub", () => {
  const routes = getTopicProofRoutes();

  assert.equal(routes.length, 10);

  for (const hub of coreTopicHubs) {
    assert.ok(routes.includes(`/topics/${hub.slug}/faq`), `${hub.slug} FAQ route missing`);
    assert.ok(
      routes.includes(`/topics/${hub.slug}/use-case`),
      `${hub.slug} use-case route missing`
    );
  }
});

test("keeps topic slugs unique", () => {
  const slugs = topicHubs.map((hub) => hub.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});
