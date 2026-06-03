import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import { StampedPageHero } from "@/components/brand/BrandVisuals";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Catalogs",
  description:
    "Browse product catalogs for engravable awards, drinkware, crystal, glass, leatherette gifts, personalized products, and corporate fabrication projects.",
  path: "/catalogs",
  keywords: [
    "engraving catalogs",
    "award catalogs",
    "drinkware catalogs",
    "corporate gifts",
    "personalized gifts",
  ],
});

const catalogs = [
  {
    title: "Sports Awards",
    description: "Awards, plaques, medals, and recognition pieces for teams, leagues, schools, and events.",
    href: "https://online.flippingbook.com/view/74396436/",
  },
  {
    title: "Drinkware",
    description: "Tumblers, mugs, bottles, and drinkware options that can be personalized or branded.",
    href: "https://premierdrinkware.com",
  },
  {
    title: "Crystal & Glass",
    description: "Premium crystal and glass awards for recognition, milestones, and corporate gifting.",
    href: "https://premiercrystal.com",
  },
  {
    title: "Leatherette Gifts",
    description: "Leatherette portfolios, journals, accessories, and personalized gift items.",
    href: "https://premierleathergifts.com",
  },
  {
    title: "Personalized Gifts",
    description: "Wedding, family, home, and special occasion gifts ready for custom engraving.",
    href: "https://premierpersonalizedgifts.com",
  },
  {
    title: "Corporate Awards",
    description: "Business awards, executive gifts, plaques, and recognition products.",
    href: "https://premiercorporateawards.com",
  },
];

export default function CatalogsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Product Sourcebooks"
          heading="Source the Right Object, Then Make It Yours"
          source="local-maker"
          visualLabel="Sourced + Finished"
          visualCaption="Start with the right physical object, then finish it with engraving, personalization, and production polish."
        >
          <p>
            These catalogs help identify awards, drinkware, leatherette,
            crystal, glass, and corporate products we can source, engrave,
            personalize, and produce for a finished brand experience.
          </p>
        </StampedPageHero>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {catalogs.map((catalog, index) => (
            <FadeUpSection key={catalog.title} delay={index * 0.05}>
              <a
                href={catalog.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-surface border border-white/5 hover:border-primary/40 p-7 transition-colors"
              >
                <span className="text-primary text-xs font-display uppercase tracking-[0.2em]">
                  Catalog {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl font-bold mt-4 group-hover:text-primary transition-colors">
                  {catalog.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mt-4">
                  {catalog.description}
                </p>
                <p className="text-xs uppercase tracking-wider text-text mt-8">
                  Open Catalog
                </p>
              </a>
            </FadeUpSection>
          ))}
        </div>

        <FadeUpSection className="mt-20 bg-surface border border-white/5 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Found something you like?
              </h2>
              <p className="text-muted leading-relaxed mt-4 max-w-2xl">
                Send the item name, quantity, artwork, fabrication details, and
                deadline. We&apos;ll confirm availability, pricing, and the best
                customization path.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <GlowButton href="/contact" variant="primary">
                Request Catalog Quote
              </GlowButton>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-text font-display text-xs uppercase tracking-wider hover:border-primary/50 transition-colors"
              >
                Shop Products
              </Link>
            </div>
          </div>
        </FadeUpSection>
      </div>
    </div>
  );
}
