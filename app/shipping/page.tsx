import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";
import { businessFacts } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Shipping Policy",
  description:
    "Shipping details for St. Louis Creations - where we ship from, carriers, transit times, and more.",
  path: "/shipping",
});

const carriers = [
  {
    name: "USPS",
    services: "First Class and Priority Mail",
  },
  {
    name: "UPS",
    services: "Ground and 3-Day Service",
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>Shipping</SectionLabel>
          <AnimatedHeading
            text="Shipping Policy"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to know about shipping times, carriers, and policies.
          </p>
        </FadeUpSection>

        {/* Where We Ship From */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Where We Ship From
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            All orders ship from:{" "}
            <span className="font-semibold text-text">
              903 Southern Hills Court, Eureka, MO 63025
            </span>
          </p>
          <p className="text-muted leading-relaxed">
            <strong>Currently, we only ship within the United States.</strong> We
            don&apos;t offer international shipping at this time.
          </p>
        </FadeUpSection>

        {/* Order Handling */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Order Handling
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Orders are processed within{" "}
              <span className="font-semibold text-text">1 business day</span>.
              Cut-off time for same-day handling is{" "}
              <span className="font-semibold text-text">2:00 PM Central</span>.
            </p>
            <p>
              Transit time is typically{" "}
              <span className="font-semibold text-text">2 to 5 business days</span>,
              depending on the carrier service you choose at checkout.
            </p>
          </div>
        </FadeUpSection>

        {/* Carriers We Use */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Carriers We Use
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {carriers.map((carrier) => (
              <div
                key={carrier.name}
                className="bg-surface border border-white/5 p-6"
              >
                <h3 className="font-display text-lg font-bold text-primary mb-2">
                  {carrier.name}
                </h3>
                <p className="text-muted text-sm">{carrier.services}</p>
              </div>
            ))}
          </div>
          <p className="text-muted leading-relaxed">
            Shipping rates are calculated at checkout based on your order weight
            and the carrier service you select.
          </p>
        </FadeUpSection>

        {/* Shipping to Your Address */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Shipping to Your Address
          </h2>
          <p className="text-muted leading-relaxed">
            We ship to the address you provide at checkout. Make sure it&apos;s
            correct — we&apos;re not responsible for packages delivered to an
            incorrect address you entered.
          </p>
        </FadeUpSection>

        {/* Free Shipping */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Free Shipping
          </h2>
          <p className="text-muted leading-relaxed">
            Free shipping may be available on certain orders or promotions. If
            it&apos;s available for your order, you&apos;ll see it at checkout.
          </p>
        </FadeUpSection>

        {/* Carrier Delays */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Carrier Delays
          </h2>
          <p className="text-muted leading-relaxed">
            We&apos;re not responsible for delays that happen once the package is
            in the carrier&apos;s hands. If your order is significantly delayed
            or lost in transit, contact us and we&apos;ll work with you to
            resolve it.
          </p>
        </FadeUpSection>

        {/* Contact */}
        <FadeUpSection className="text-center mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Questions About Shipping?
          </h2>
          <div className="space-y-2 text-muted mb-8">
            <p>
              <span className="font-semibold text-text">Email:</span>{" "}
              <a
                href="mailto:contact@stlouiscreations.com"
                className="text-primary underline hover:no-underline"
              >
                contact@stlouiscreations.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-text">Phone:</span>{" "}
              <a
                href={businessFacts.phone.href}
                className="text-primary underline hover:no-underline"
              >
                {businessFacts.phone.display}
              </a>
            </p>
            <p>
              <span className="font-semibold text-text">Mail:</span> St. Louis
              Creations, 903 Southern Hills Court, Eureka, MO 63025, United
              States
            </p>
          </div>
          <GlowButton href="/contact" variant="primary">
            Get in Touch
          </GlowButton>
        </FadeUpSection>
      </div>
    </div>
  );
}
