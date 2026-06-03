import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { StampedPageHero } from "@/components/brand/BrandVisuals";
import { createPageMetadata } from "@/lib/seo";
import { topicHubs } from "@/lib/topic-hubs";

export const metadata: Metadata = createPageMetadata({
  title: "Business Fabrication Topic Guides",
  description:
    "Answer-ready guides for business laser engraving, 3D printing, awards, recognition, corporate gifts, and custom production in St. Louis.",
  path: "/topics",
  keywords: [
    "St. Louis laser engraving business",
    "St. Louis 3D printing business",
    "custom awards St. Louis",
    "corporate gifts St. Louis",
  ],
});

export default function TopicsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Buyer Guides"
          heading="Business Fabrication Topics"
          source="studio-precision"
          visualLabel="Quote Planning"
          visualCaption="Clear guidance for engraving, 3D printing, awards, and branded products."
          className="mb-16"
        >
          <p>
            Practical guides for companies, schools, nonprofits, teams, and
            event planners comparing custom production options in St. Louis.
          </p>
        </StampedPageHero>

        <FadeUpSection className="mb-12 max-w-3xl">
          <SectionLabel>Cite-Ready Answers</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
            What these guides cover
          </h2>
          <p className="text-muted leading-relaxed mt-5">
            These topic hubs explain when to use laser engraving, additive
            manufacturing, awards, branded merchandise, and custom production.
            Each guide includes buyer scenarios, material constraints, quote
            readiness details, and links to the relevant service pages.
          </p>
        </FadeUpSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topicHubs.map((hub, index) => (
            <FadeUpSection key={hub.slug} delay={index * 0.05}>
              <Link
                href={`/topics/${hub.slug}`}
                className="group block h-full bg-surface border border-white/5 p-7 hover:border-primary/30 transition-colors"
              >
                <span className="text-primary text-xs font-display uppercase tracking-[0.2em]">
                  {hub.eyebrow}
                </span>
                <h2 className="font-display text-2xl font-bold leading-tight mt-4 group-hover:text-primary transition-colors">
                  {hub.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mt-4">
                  {hub.description}
                </p>
                <span className="inline-flex text-primary text-xs font-display uppercase tracking-wider mt-6">
                  Read Guide
                </span>
              </Link>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </div>
  );
}
