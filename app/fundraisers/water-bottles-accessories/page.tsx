import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { BrandHeroPanel, StampedPageHero } from "@/components/brand/BrandVisuals";

export const metadata: Metadata = {
  title: "Fundraiser Water Bottles & Accessories",
  description:
    "Precision-engraved water bottles, drinkware, and accessories for fundraiser campaigns, teams, schools, clubs, and nonprofits.",
};

const items = [
  "Reusable water bottles",
  "Tumblers and mugs",
  "Team and school accessories",
  "Sponsor-branded items",
  "Name personalization",
  "Bulk campaign production",
];

export default function WaterBottleFundraiserPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/fundraisers" className="hover:text-primary transition-colors">
            Fundraisers
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">Water Bottles & Accessories</span>
        </nav>

        <StampedPageHero
          label="Engraved Fundraiser Products"
          heading="Useful Fundraiser Products People Actually Keep"
          source="material-craft"
          visualLabel="Engraved Campaigns"
          visualCaption="Drinkware and accessories with durable personalization for groups and sponsors."
        >
          <p>
            Custom bottles, drinkware, and accessories make practical,
            sponsor-friendly fundraiser products for teams, schools, clubs,
            nonprofits, and community events.
          </p>
        </StampedPageHero>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-10">
          <FadeUpSection>
            <div className="bg-surface border border-white/5 p-8 md:p-10 h-full">
              <BrandHeroPanel
                source="local-maker"
                label="Fundraiser Ready"
                caption="A practical product path for teams, schools, clubs, and local campaigns."
                className="mb-8 min-h-[220px]"
              />
              <SectionLabel>Campaign Fit</SectionLabel>
              <h2 className="font-display text-3xl font-bold mt-4">
                Built for Groups, Sponsors, and Repeat Orders
              </h2>
              <p className="text-muted leading-relaxed mt-5">
                Add names, team marks, school logos, event branding, sponsor
                messages, or campaign artwork. We can quote options based on
                your budget, expected order quantity, and deadline.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <GlowButton href="/contact" variant="primary">
                  Request Fabrication Pricing
                </GlowButton>
                <Link
                  href="/shop?category=drinkware"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-text font-display text-xs uppercase tracking-wider hover:border-primary/50 transition-colors"
                >
                  Browse Drinkware
                </Link>
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item} className="bg-surface border border-white/5 p-6">
                  <h3 className="font-display text-lg font-bold">{item}</h3>
                  <p className="text-muted text-sm leading-relaxed mt-3">
                    Customizable options are available for bulk orders and group
                    campaigns.
                  </p>
                </div>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </div>
    </div>
  );
}
