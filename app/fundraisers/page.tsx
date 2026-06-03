import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { StampedPageHero } from "@/components/brand/BrandVisuals";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fundraisers",
  description:
    "Custom fabricated and engraved fundraiser products for schools, teams, clubs, nonprofits, and community groups.",
  path: "/fundraisers",
  keywords: [
    "fundraiser products",
    "school fundraiser products",
    "team fundraiser products",
    "custom engraved fundraisers",
    "St. Louis fundraiser products",
  ],
});

const fundraiserOptions = [
  {
    title: "Water Bottles & Accessories",
    description:
      "Personalized bottles, drinkware, and useful accessories for team, school, and nonprofit campaigns.",
    href: "/fundraisers/water-bottles-accessories",
  },
  {
    title: "Wood & Slate Gifts",
    description:
      "Coasters, boards, and home goods that work well for premium fundraiser tiers and donor gifts.",
    href: "/shop?category=wood-slate",
  },
  {
    title: "Awards & Recognition",
    description:
      "Plaques, medals, and recognition pieces for tournaments, banquets, and sponsor appreciation.",
    href: "/catalogs",
  },
];

const steps = [
  "Choose products and quantities",
  "Send artwork, names, or sponsor details",
  "Approve the proof before production",
  "Receive finished items ready to sell or distribute",
];

export default function FundraisersPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Community Production"
          heading="Fundraiser Products With Real Polish"
          source="material-craft"
          visualLabel="Community Runs"
          visualCaption="Useful objects, engraved details, and repeatable production for local groups."
        >
          <p>
            We support schools, teams, clubs, nonprofits, and local groups with
            personalized products that feel useful, memorable, and elevated
            enough for sponsors, donors, and supporters.
          </p>
        </StampedPageHero>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-20">
          {fundraiserOptions.map((option, index) => (
            <FadeUpSection key={option.title} delay={index * 0.08}>
              <Link
                href={option.href}
                className="group block h-full bg-surface border border-white/5 hover:border-primary/40 p-8 transition-colors"
              >
                <span className="text-primary font-display text-4xl font-bold">
                  0{index + 1}
                </span>
                <h2 className="font-display text-2xl font-bold mt-5 group-hover:text-primary transition-colors">
                  {option.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mt-4">
                  {option.description}
                </p>
              </Link>
            </FadeUpSection>
          ))}
        </div>

        <FadeUpSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-surface border border-white/5 p-8 md:p-12">
            <div>
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
                Simple Enough for Volunteers, Polished Enough for Sponsors
              </h2>
              <p className="text-muted leading-relaxed mt-5">
                Tell us your group, budget, quantity, artwork, and deadline.
                We&apos;ll help narrow the product choices and prepare a
                fabrication quote that works for your campaign.
              </p>
            </div>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 border border-white/10 bg-background p-4"
                >
                  <span className="text-primary font-display font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mt-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Planning a Fundraiser?
          </h2>
          <p className="text-muted max-w-xl mx-auto mt-4 mb-8">
            We can help you choose products, estimate margins, and prepare a
            production plan for your campaign.
          </p>
          <GlowButton href="/contact" variant="primary">
            Start a Fundraiser Quote
          </GlowButton>
        </FadeUpSection>
      </div>
    </div>
  );
}
