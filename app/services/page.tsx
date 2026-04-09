import { Metadata } from "next";
import Image from "next/image";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";
import { materials } from "@/lib/constants";

// Materials with real photograph thumbnails in /public/images/materials/
const MATERIALS_WITH_IMAGES = new Set([
  "acrylic",
  "wood",
  "glass",
  "metal",
  "leather",
  "stone",
  "fabric",
  "rubber",
]);

export const metadata: Metadata = {
  title: "Services",
  description:
    "Laser engraving, laser cutting, and 3D printing services for businesses. Precision craftsmanship on any material.",
};

const serviceDetails = [
  {
    id: "engraving",
    title: "Laser Engraving",
    description:
      "Our precision laser engraving technology creates permanent, detailed markings on virtually any surface. From intricate logos to serialized text, we deliver consistent quality across bulk orders with micrometer-level accuracy.",
    capabilities: [
      "Photo-quality image engraving",
      "Vector logo and text engraving",
      "Serial number and barcode marking",
      "Deep engraving for industrial applications",
      "Color-fill engraving available",
    ],
    materials: ["Acrylic", "Wood", "Glass", "Metal", "Leather", "Stone", "Fabric", "Rubber"],
  },
  {
    id: "cutting",
    title: "Laser Cutting",
    description:
      "Clean, precise cuts with smooth edges and no tooling marks. Our laser cutting services handle everything from delicate paper designs to thick acrylic signage, with tight tolerances and zero material waste.",
    capabilities: [
      "Intricate die-cut designs",
      "Custom signage and displays",
      "Architectural model components",
      "Gaskets and industrial parts",
      "Wedding and event invitations",
    ],
    materials: ["Acrylic", "Wood", "Fabric", "Rubber", "Paper", "Cardboard"],
  },
  {
    id: "printing",
    title: "3D Printing",
    description:
      "Rapid prototyping and custom part production using professional-grade 3D printing. We work with a range of materials to deliver functional prototypes, custom fixtures, and finished products with exceptional detail.",
    capabilities: [
      "Rapid prototyping (24-48hr turnaround)",
      "Functional end-use parts",
      "Custom fixtures and jigs",
      "Architectural scale models",
      "Small batch production runs",
    ],
    materials: ["PLA", "ABS", "PETG", "TPU", "Nylon"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>Our Services</SectionLabel>
          <AnimatedHeading
            text="Precision at Every Scale"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            From a single prototype to thousands of custom pieces — we deliver
            consistent quality with fast turnaround times.
          </p>
        </FadeUpSection>

        {/* Service Details */}
        <div className="space-y-32">
          {serviceDetails.map((service, i) => (
            <FadeUpSection key={service.id}>
              <div
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 scroll-mt-24"
              >
                {/* Info */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-primary text-xs font-display uppercase tracking-[0.2em]">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                    {service.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <h3 className="font-display text-sm uppercase tracking-wider mb-4">
                    Capabilities
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3 text-sm text-muted">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials compatibility */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-surface border border-white/5 p-8 h-full">
                    <h3 className="font-display text-sm uppercase tracking-wider mb-6">
                      Compatible Materials
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {service.materials.map((mat) => {
                        const slug = mat.toLowerCase();
                        const hasImage = MATERIALS_WITH_IMAGES.has(slug);
                        return (
                          <div
                            key={mat}
                            className="group flex items-center gap-3 p-2 bg-background border border-white/5 hover:border-primary/30 transition-colors"
                          >
                            {hasImage ? (
                              <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
                                <Image
                                  src={`/images/materials/${slug}.png`}
                                  alt={`${mat} material sample`}
                                  fill
                                  sizes="48px"
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary text-sm font-bold">
                                  {mat[0]}
                                </span>
                              </div>
                            )}
                            <span className="text-sm">{mat}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUpSection>
          ))}
        </div>

        {/* Materials Grid */}
        <FadeUpSection className="mt-32">
          <div className="text-center mb-12">
            <SectionLabel>Full Materials List</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
              We Work With Everything
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {materials.map((mat) => (
              <div
                key={mat.name}
                className="group relative overflow-hidden border border-white/5 hover:border-primary/40 transition-colors aspect-[4/5]"
              >
                {/* Background photograph */}
                <Image
                  src={`/images/materials/${mat.name.toLowerCase()}.png`}
                  alt={`${mat.name} material sample`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                />
                {/* Gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-display font-bold text-primary mb-2 text-lg">
                    {mat.name}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">
                    {mat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUpSection>

        {/* CTA */}
        <FadeUpSection className="mt-24 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Tell us about your project and we&apos;ll provide a custom quote
            within 24 hours.
          </p>
          <GlowButton href="/contact" variant="primary">
            Request a Quote
          </GlowButton>
        </FadeUpSection>
      </div>
    </div>
  );
}
