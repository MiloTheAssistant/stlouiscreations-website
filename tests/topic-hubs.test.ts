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

test("publishes five core cite-ready topic hubs with proof pages", () => {
  assert.equal(coreTopicHubs.length, 5);

  for (const hub of coreTopicHubs) {
    assert.equal(getTopicHubBySlug(hub.slug)?.slug, hub.slug);
    assert.ok(hub.answer.split(/\s+/).length >= 90, `${hub.slug} has a thin answer block`);
    assert.ok(hub.proofPages?.faq, `${hub.slug} is missing a FAQ proof page`);
    assert.ok(hub.proofPages?.useCase, `${hub.slug} is missing a use-case proof page`);
    assert.ok(hub.faqs.length >= 3, `${hub.slug} needs visible FAQ answers`);

    const combinedCopy = [
      hub.title,
      hub.description,
      hub.answer,
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
