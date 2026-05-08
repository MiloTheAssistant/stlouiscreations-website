"use client";

import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function CtaSection() {
  return (
    <section className="py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,107,0,0.3) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,107,0,0.3) 50px)",
        }}
      />

      {/* Orange accent bar */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeUpSection>
          <AnimatedHeading
            text="Ready to Engineer the Physical Version?"
            as="h2"
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold"
          />
          <p className="mt-6 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Bring the concept, artwork, material question, or production goal.
            We&apos;ll help translate it into a quote, proof, and fabrication path.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton href="/contact" variant="primary">
              Start a Fabrication Quote
            </GlowButton>
            <GlowButton href="/shop" variant="outline">
              Browse Products
            </GlowButton>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
