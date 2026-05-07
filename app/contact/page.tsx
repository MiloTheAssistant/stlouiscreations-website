import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import QuoteForm from "@/components/contact/QuoteForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote for custom laser engraving, cutting, or 3D printing. Fast turnaround, competitive pricing, bulk order specialists.",
};

const faqs = [
  {
    q: "What is your minimum order quantity?",
    a: "We have no strict minimums, but our pricing is optimized for orders of 10+ units. For orders under 10, setup fees may apply.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Standard orders ship within 5-7 business days. Rush orders (24-48 hours) are available for most products at an additional fee.",
  },
  {
    q: "What file formats do you accept?",
    a: "We accept AI, EPS, SVG, PDF, PNG, and JPG files. Vector formats (AI, EPS, SVG) produce the best results for laser engraving.",
  },
  {
    q: "Do you offer proofs before production?",
    a: "Yes! We provide a digital proof for every order before production begins. Changes are free at the proof stage.",
  },
  {
    q: "Can you match specific colors or materials?",
    a: "We offer a wide range of materials and finishes. Send us your requirements and we will provide options and samples where possible.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-16">
          <SectionLabel>Contact</SectionLabel>
          <AnimatedHeading
            text="Start Your Project"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-xl mx-auto text-lg">
            Tell us about your project and we&apos;ll provide a custom quote
            within 24 hours.
          </p>
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
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Location
                </h3>
                <p className="text-muted text-sm">St. Louis, MO</p>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Email
                </h3>
                <a
                  href="mailto:contact@stlouiscreations.com"
                  className="text-primary text-sm hover:underline"
                >
                  contact@stlouiscreations.com
                </a>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Phone
                </h3>
                <a
                  href="tel:+15735000064"
                  className="text-primary text-sm hover:underline"
                >
                  (573) 500-0064
                </a>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Hours
                </h3>
                <div className="text-muted text-sm space-y-1">
                  <p>Monday - Friday: 8am - 5pm CT</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm uppercase tracking-wider mb-3">
                  Response Time
                </h3>
                <p className="text-muted text-sm">
                  We respond to all inquiries within 24 hours during business days.
                </p>
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
