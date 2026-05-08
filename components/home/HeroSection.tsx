"use client";

import Image from "next/image";
import GlowButton from "@/components/ui/GlowButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <Image
        src="/images/brand/hero-fabrication-studio.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/35" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="w-full max-w-[calc(100vw-3rem)] sm:max-w-3xl min-w-0">
        {/* Eyebrow */}
        <p
          className="max-w-full text-primary text-[11px] sm:text-xs font-display uppercase tracking-[0.16em] sm:tracking-[0.28em] mb-6 break-words"
        >
          St. Louis &bull; Digital Fabrication Studio
        </p>

        <h1 className="max-w-[calc(100vw-3rem)] font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] text-left">
          <span className="block">Creatively</span>
          <span className="block">Engineered</span>
          <span className="block">Reality</span>
        </h1>

        {/* Subheading */}
        <p className="mt-8 block w-full max-w-[20rem] text-muted text-lg leading-relaxed sm:hidden">
          <span className="block">Precision laser engraving,</span>
          <span className="block">additive manufacturing,</span>
          <span className="block">and custom production for physical ideas.</span>
        </p>
        <p
          className="mt-8 hidden w-full sm:block sm:max-w-2xl text-muted text-lg md:text-xl leading-relaxed break-words"
        >
          Precision laser engraving, additive manufacturing, and custom
          production for brands, creators, and innovators turning digital
          concepts into physical form.
        </p>

        <div
          className="mt-8 grid w-full max-w-[calc(100vw-3rem)] grid-cols-1 sm:grid-cols-3 gap-3 sm:max-w-2xl"
        >
          {["Prototype to Production", "Industrial & Artistic Fabrication", "Crafted With Digital Precision"].map(
            (item) => (
              <span
                key={item}
                className="min-w-0 border border-white/10 bg-background/50 px-4 py-3 text-[11px] sm:text-xs font-display uppercase tracking-wider text-text/80 backdrop-blur break-words"
              >
                {item}
              </span>
            )
          )}
        </div>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <GlowButton href="/contact" variant="primary">
            Engineer a Project
          </GlowButton>
          <GlowButton href="/shop" variant="outline">
            Explore Products
          </GlowButton>
        </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
