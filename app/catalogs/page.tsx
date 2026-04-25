import { Metadata } from "next";
import Link from "next/link";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Catalogs",
  description:
    "Browse St. Louis Creations catalog resources for sports awards, drinkware, crystal and glass, leatherette gifts, personalized gifts, and corporate awards.",
};

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
        <FadeUpSection className="text-center mb-16">
          <SectionLabel>Catalogs</SectionLabel>
          <AnimatedHeading
            text="Explore Our Engravable Product Catalogs"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            These catalog resources show many of the awards, gifts, drinkware,
            leatherette, crystal, glass, and corporate products we can source,
            engrave, and customize for your project.
          </p>
        </FadeUpSection>

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
                Send the item name, quantity, engraving details, and deadline.
                We&apos;ll confirm availability, pricing, and customization options.
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
