import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { materials } from "@/lib/constants";
import {
  getMaterialBySlug,
  getMaterialCopy,
  getMaterialImageSlug,
} from "@/lib/material-content";
import { createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return materials.map((material) => ({ slug: material.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const material = getMaterialBySlug(params.slug);
  const copy = getMaterialCopy(params.slug);

  if (!material || !copy) {
    return { title: "Material Not Found" };
  }

  return {
    ...createPageMetadata({
      title: copy.title,
      description: copy.overview,
      path: `/materials/${material.slug}`,
      keywords: [
        `${material.name} engraving`,
        `${material.name} fabrication`,
        `${material.name} material sample`,
        "St. Louis custom engraving",
      ],
    }),
  };
}

export default function MaterialDetailPage({ params }: PageProps) {
  const material = getMaterialBySlug(params.slug);
  const copy = getMaterialCopy(params.slug);

  if (!material || !copy) notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/materials" className="hover:text-primary transition-colors">
            Materials
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{copy.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <FadeUpSection>
            <SectionLabel>Material Guide</SectionLabel>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4">
              {copy.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed mt-6">
              {copy.overview}
            </p>

            <div className="mt-10">
              <h2 className="font-display text-sm uppercase tracking-wider mb-4">
                Common Uses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {material.uses.map((use) => (
                  <div
                    key={use}
                    className="border border-white/10 bg-surface px-4 py-3 text-sm text-muted"
                  >
                    {use}
                  </div>
                ))}
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/5 bg-surface">
              <Image
                src={`/images/materials/${getMaterialImageSlug(material)}.png`}
                alt={`${material.name} material sample`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
          </FadeUpSection>
        </div>

        <FadeUpSection className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-10 bg-surface border border-white/5 p-8 md:p-12">
            <div>
              <SectionLabel>Capabilities</SectionLabel>
              <h2 className="font-display text-3xl font-bold mt-4">
                How We Work With {material.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {copy.capabilities.map((capability) => (
                <div
                  key={capability}
                  className="border border-white/10 bg-background p-5"
                >
                  <p className="text-sm text-muted leading-relaxed">{capability}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mt-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Make Something With {material.name}?
          </h2>
          <p className="text-muted max-w-xl mx-auto mt-4 mb-8">
            Share your artwork, material preference, timeline, and quantity.
            We&apos;ll help you choose the right process.
          </p>
          <GlowButton href="/contact" variant="primary">
            Request a Quote
          </GlowButton>
        </FadeUpSection>
      </div>
    </div>
  );
}
