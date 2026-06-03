import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import { StampedPageHero } from "@/components/brand/BrandVisuals";
import { materials } from "@/lib/constants";
import { getMaterialCopy, getMaterialImageSlug } from "@/lib/material-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Engraving Materials",
  description:
    "Material options for digital fabrication, precision engraving, cutting, marking, and custom production in St. Louis.",
  path: "/materials",
  keywords: [
    "laser engraving materials",
    "engraved acrylic",
    "engraved wood",
    "engraved glass",
    "engraved metal",
    "custom fabrication materials",
  ],
});

export default function MaterialsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Material Intelligence"
          heading="Choose the Surface That Carries the Idea"
          source="material-craft"
          visualLabel="Real Materials"
          visualCaption="Wood grain, slate, metal, acrylic, glass, and leather each carry the mark differently."
        >
          <p>
            We cut, etch, engrave, mark, and produce across materials for
            awards, gifts, signage, branded merchandise, prototypes,
            fundraisers, and business-to-business production runs.
          </p>
        </StampedPageHero>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {materials.map((material, index) => {
            const copy = getMaterialCopy(material.slug);
            return (
              <FadeUpSection key={material.slug} delay={index * 0.04}>
                <Link
                  href={`/materials/${material.slug}`}
                  className="group block h-full bg-surface border border-white/5 hover:border-primary/40 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={`/images/materials/${getMaterialImageSlug(material)}.png`}
                      alt={`${material.name} material sample`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold text-text group-hover:text-primary transition-colors">
                      {copy?.title ?? material.name}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mt-3">
                      {material.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {material.uses.map((use) => (
                        <span
                          key={use}
                          className="text-[11px] uppercase tracking-wider text-muted border border-white/10 px-2 py-1"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeUpSection>
            );
          })}
        </div>

        <FadeUpSection className="mt-20 bg-surface border border-white/5 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Not sure which material fits your project?
              </h2>
              <p className="text-muted mt-4 max-w-2xl leading-relaxed">
                Send the intended use, quantity, artwork, and deadline. We can
                recommend a material and process that balances durability,
                appearance, production time, and budget.
              </p>
            </div>
            <GlowButton href="/contact" variant="primary">
              Ask About Materials
            </GlowButton>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mt-10 bg-surface border border-white/5 p-8 md:p-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Materials St. Louis Creations can engrave, cut, mark, or fabricate
          </h2>
          <p className="text-muted mt-4 leading-relaxed">
            St. Louis Creations works with acrylic, wood, glass, metal, leather,
            stone, slate, tile, fabric, and rubber for custom engraving,
            marking, cutting, awards, gifts, signage, branded products,
            fundraiser items, and production parts. Material recommendations
            are based on durability, appearance, intended use, artwork detail,
            production quantity, and budget.
          </p>
        </FadeUpSection>
      </div>
    </div>
  );
}
