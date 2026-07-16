import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import QuoteForm from "@/components/contact/QuoteForm";
import { BrandHeroPanel, StampedPageHero } from "@/components/brand/BrandVisuals";
import JsonLd from "@/components/seo/JsonLd";
import { businessFacts, contactLinks } from "@/lib/constants";
import { createPageMetadata, getFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Request a St. Louis fabrication quote for laser engraving, 3D printing, custom awards, branded products, prototypes, and custom production.",
  path: "/contact",
  keywords: [
    "St. Louis Creations contact",
    "laser engraving quote",
    "custom fabrication quote",
    "3D printing quote St. Louis",
  ],
});

const faqs = [
  {
    q: "What is your minimum order quantity?",
    a: "We have no strict minimums, but pricing is usually strongest when there is enough quantity to justify setup, proofing, and production time.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Standard orders ship within 5-7 business days. Rush orders (24-48 hours) are available for most products at an additional fee.",
  },
  {
    q: "What file formats do you accept?",
    a: "AI, EPS, SVG, PDF, PNG, and JPG are common. Vector artwork is best for engraving and cutting, while 3D work may need model files or dimensions.",
  },
  {
    q: "Do you offer proofs before production?",
    a: "Yes! We provide a digital proof for every order before production begins. Changes are free at the proof stage.",
  },
  {
    q: "Can you match specific colors or materials?",
    a: "We can recommend materials and finishes based on durability, appearance, use case, and budget. Send any constraints with the quote request.",
  },
];

const quoteChecklist = [
  {
    title: "Artwork or a 3D model",
    detail: "Send AI, EPS, SVG, PDF, PNG, JPG, STL, STEP, OBJ, or the best source file you have.",
  },
  {
    title: "Product or material",
    detail: "Name the catalog item, material, dimensions, or object you want engraved, printed, cut, or produced.",
  },
  {
    title: "Quantity and personalization",
    detail: "Include the total count and any names, numbers, dates, sponsor marks, or other variable details.",
  },
  {
    title: "Deadline",
    detail: "Share the event date or delivery need so artwork review, proofing, production, and shipping can be assessed.",
  },
  {
    title: "Intended use and finish",
    detail: "Explain where the item will be used and any strength, heat, durability, appearance, or finish constraints.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <JsonLd data={getFaqJsonLd(faqs)} />
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Start a Fabrication Quote"
          heading="Tell Us What You Want to Make"
          source="studio-precision"
          visualLabel="Quote Intake"
          visualCaption="Laser, 3D print, material, quantity, and deadline details all start here."
        >
          <p>
            Share the idea, quantity, artwork, material direction, deadline,
            and intended use. We&apos;ll help turn it into a practical path.
          </p>
        </StampedPageHero>

        <FadeUpSection className="mb-20 py-10 border-y border-white/10">
          <div className="max-w-3xl mb-8">
            <SectionLabel>Quote Checklist</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-4">
              Five details that make a fabrication quote useful
            </h2>
            <p className="text-muted leading-relaxed mt-4">
              For a St. Louis business order, fundraiser, one-off gift, or prototype,
              these details help us review the material, production steps, and timing.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {quoteChecklist.map((item, index) => (
              <li key={item.title} className="min-w-0">
                <span className="text-primary text-xs font-display uppercase tracking-[0.2em]">
                  0{index + 1}
                </span>
                <h3 className="font-display text-base font-bold mt-2">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mt-2">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </FadeUpSection>

        {/* Form + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-32">
          {/* Form */}
          <FadeUpSection className="lg:col-span-3">
            <QuoteForm />
          </FadeUpSection>

          {/* Contact Info */}
          <FadeUpSection delay={0.2} className="lg:col-span-2">
            <div className="bg-surface border border-white/5 p-8 space-y-8">
              <BrandHeroPanel
                source="local-maker"
                label="St. Louis Studio"
                caption="Local craft, real materials, and practical quote guidance."
                className="min-h-[220px]"
              />

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Location
                </h3>
                <p className="text-muted text-sm">{businessFacts.location.label}</p>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Email
                </h3>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="text-primary text-sm hover:underline"
                >
                  {contactLinks.email}
                </a>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Phone
                </h3>
                <a
                  href={businessFacts.phone.href}
                  className="text-primary text-sm hover:underline"
                >
                  {businessFacts.phone.display}
                </a>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Hours
                </h3>
                <div className="text-muted text-sm space-y-1">
                  <p>{businessFacts.hours.weekdayLabel}</p>
                  <p>{businessFacts.hours.weekendLabel}</p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Response Time
                </h3>
                <p className="text-muted text-sm">{businessFacts.responseTime}</p>
              </div>
            </div>
          </FadeUpSection>
        </div>

        {/* FAQ */}
        <FadeUpSection>
          <div className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
              Common Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-surface border border-white/5 p-6"
              >
                <h3 className="font-display font-bold mb-2">{faq.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </FadeUpSection>
      </div>
    </div>
  );
}
