import { Metadata } from "next";
import Image from "next/image";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "St. Louis Creations is a digital fabrication studio where creativity, engineering, and advanced manufacturing converge.",
};

const values = [
  {
    title: "Precision-Driven",
    description:
      "Every material, mark, and finish has to serve the final object. We care about repeatability, detail, and usable results.",
  },
  {
    title: "Creative",
    description:
      "We work with people who have ideas, not just purchase orders. The goal is to make the physical result feel intentional.",
  },
  {
    title: "Future-Facing",
    description:
      "Digital files, additive manufacturing, laser systems, and AI-era design workflows all belong in the same studio conversation.",
  },
  {
    title: "Premium Craft",
    description:
      "We avoid disposable, generic output. Materials, proofs, and production details should create a finished object worth keeping.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>About the Studio</SectionLabel>
          <AnimatedHeading
            text="A Creative Fabrication Company With Ambition"
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
                  St. Louis Creations is a modern digital fabrication studio
                  built around a simple premise: sophisticated physical products
                  should be easier to imagine, refine, and produce.
                </p>
                <p>
                  We bring together precision laser engraving, additive
                  manufacturing, material knowledge, and custom production for
                  brands, creators, groups, and innovators who need ideas
                  translated into tangible form.
                </p>
                <p>
                  The work can be a prototype, a corporate gift, a recognition
                  piece, a fundraiser product, or a small-batch production run.
                  The standard stays the same: technical discipline, creative
                  polish, and a finished object with purpose.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/5 bg-surface aspect-[4/3]">
              <Image
                src="/images/brand/hero-fabrication-studio.png"
                alt="Dark digital fabrication studio with laser equipment and precision materials"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-primary text-xs font-display uppercase tracking-[0.22em]">
                  Creatively Engineered Reality
                </p>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Values */}
        <FadeUpSection className="mb-32">
          <div className="text-center mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
              What the Brand Stands For
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
            Bring the vision, constraints, and deadline. We&apos;ll help shape
            the physical result.
          </p>
          <GlowButton href="/contact" variant="primary">
            Get in Touch
          </GlowButton>
        </FadeUpSection>
      </div>
    </div>
  );
}
