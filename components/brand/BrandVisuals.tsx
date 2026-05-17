import Image from "next/image";
import type { ReactNode } from "react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export type BrandStampKind = "laser" | "printing" | "combined";
export type BrandSourceKind =
  | "local-maker"
  | "material-craft"
  | "studio-precision"
  | "3d-printing-studio"
  | "3d-printing-materials"
  | "3d-printing-finished-parts";

const stampAssets: Record<BrandStampKind, { src: string; alt: string }> = {
  laser: {
    src: "/brand/masters/profile-stamp.png",
    alt: "St. Louis Creations laser fabrication profile stamp",
  },
  printing: {
    src: "/brand/masters/profile-stamp-3d-printing.png",
    alt: "St. Louis Creations 3D printing profile stamp",
  },
  combined: {
    src: "/brand/masters/profile-stamp-combined.png",
    alt: "St. Louis Creations combined laser and 3D printing profile stamp",
  },
};

const sourceAssets: Record<BrandSourceKind, { src: string; alt: string }> = {
  "local-maker": {
    src: "/brand/masters/source-family-local-maker.png",
    alt: "Local maker studio material craft scene",
  },
  "material-craft": {
    src: "/brand/masters/source-family-material-craft.png",
    alt: "Craft material detail with warm studio lighting",
  },
  "studio-precision": {
    src: "/brand/masters/source-family-studio-precision.png",
    alt: "Digital fabrication studio precision scene",
  },
  "3d-printing-studio": {
    src: "/brand/masters/source-family-3d-printing-studio.png",
    alt: "3D printing studio production scene",
  },
  "3d-printing-materials": {
    src: "/brand/masters/source-family-3d-printing-materials.png",
    alt: "3D printing material texture scene",
  },
  "3d-printing-finished-parts": {
    src: "/brand/masters/source-family-3d-printing-finished-parts.png",
    alt: "Finished 3D printed parts in a fabrication studio",
  },
};

interface BrandStampProps {
  kind?: BrandStampKind;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function BrandStamp({
  kind = "combined",
  className,
  imageClassName,
  priority = false,
}: BrandStampProps) {
  const stamp = stampAssets[kind];

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full border border-primary/25 bg-background/75 shadow-[0_18px_52px_rgba(0,0,0,0.38),0_0_28px_rgba(255,107,0,0.16)]",
        className
      )}
    >
      <Image
        src={stamp.src}
        alt={stamp.alt}
        fill
        sizes="(max-width: 768px) 92px, 140px"
        priority={priority}
        className={cn("object-contain", imageClassName)}
      />
    </div>
  );
}

interface BrandHeroPanelProps {
  source?: BrandSourceKind;
  label: string;
  caption: string;
  className?: string;
  priority?: boolean;
}

export function BrandHeroPanel({
  source = "studio-precision",
  label,
  caption,
  className,
  priority = false,
}: BrandHeroPanelProps) {
  const sourceAsset = sourceAssets[source];

  return (
    <div
      className={cn(
        "relative min-h-[280px] overflow-hidden border border-white/10 bg-surface",
        className
      )}
    >
      <Image
        src={sourceAsset.src}
        alt={sourceAsset.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/15 via-transparent to-background/70" />
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-8">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-primary">
          {label}
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text/82">
          {caption}
        </p>
      </div>
    </div>
  );
}

interface StampedPageHeroProps {
  label: string;
  heading: string;
  children: ReactNode;
  source?: BrandSourceKind;
  visualLabel: string;
  visualCaption: string;
  className?: string;
}

export function StampedPageHero({
  label,
  heading,
  children,
  source = "studio-precision",
  visualLabel,
  visualCaption,
  className,
}: StampedPageHeroProps) {
  return (
    <FadeUpSection className={cn("mb-16", className)}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-14">
        <div>
          <SectionLabel>{label}</SectionLabel>
          <AnimatedHeading
            text={heading}
            as="h1"
            className="mt-4 font-display text-4xl font-bold md:text-6xl"
          />
          <div className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            {children}
          </div>
        </div>
        <BrandHeroPanel
          source={source}
          label={visualLabel}
          caption={visualCaption}
          priority
        />
      </div>
    </FadeUpSection>
  );
}
