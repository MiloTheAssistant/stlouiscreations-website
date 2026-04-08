import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "St. Louis Creations — precision laser engraving, cutting & 3D printing. Learn about our story, values, and commitment to quality craftsmanship.",
};

const values = [
  {
    title: "Precision",
    description:
      "Every detail matters. Our laser systems operate at micrometer accuracy, ensuring your designs are reproduced flawlessly every time.",
  },
  {
    title: "Speed",
    description:
      "We understand deadlines. With 24-hour rush options and streamlined production, we deliver without sacrificing quality.",
  },
  {
    title: "Partnership",
    description:
      "We're not just a vendor — we're your manufacturing partner. We work with you from concept to delivery to ensure the best result.",
  },
  {
    title: "Customization",
    description:
      "No templates, no limitations. Every order is built to your exact specifications, from material selection to finishing details.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>About Us</SectionLabel>
          <AnimatedHeading
            text="Crafted in St. Louis"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
        </FadeUpSection>

        {/* Story */}
        <FadeUpSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-32">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  St. Louis Creations started with a simple idea: businesses
                  deserve access to professional-grade laser engraving without
                  the complexity. What began as a small operation in St. Louis,
                  Missouri has grown into a trusted partner for businesses
                  across the country.
                </p>
                <p>
                  We specialize in custom bulk orders — from corporate gifts
                  and branded merchandise to sports awards and fundraiser
                  items. Our team combines cutting-edge laser technology with
                  hands-on craftsmanship to deliver products that exceed
                  expectations.
                </p>
                <p>
                  Whether you need 10 custom tumblers or 10,000 engraved
                  awards, we bring the same level of precision, care, and
                  attention to every single piece.
                </p>
              </div>
            </div>

            {/* Facility placeholder */}
            <div className="bg-surface border border-white/5 flex items-center justify-center aspect-[4/3]">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                </div>
                <p className="text-muted text-sm">Facility Photo</p>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Values */}
        <FadeUpSection className="mb-32">
          <div className="text-center mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <FadeUpSection key={value.title} delay={i * 0.1}>
                <div className="bg-surface border border-white/5 p-8">
                  <span className="text-primary font-display text-4xl font-bold">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold mt-4 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeUpSection>
            ))}
          </div>
        </FadeUpSection>

        {/* CTA */}
        <FadeUpSection className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Ready to bring your vision to life? We&apos;d love to hear about
            your project.
          </p>
          <GlowButton href="/contact" variant="primary">
            Get in Touch
          </GlowButton>
        </FadeUpSection>
      </div>
    </div>
  );
}
