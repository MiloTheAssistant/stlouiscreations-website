import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";
import { businessFacts } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Refund & Return Policy",
  description:
    "Our return window, refund process, and how we handle damages and issues for St. Louis Creations orders.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>Legal</SectionLabel>
          <AnimatedHeading
            text="Refund & Return Policy"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Our return window, refund process, and how we handle damages.
          </p>
        </FadeUpSection>

        {/* Our Standard Return Policy */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Our Standard Return Policy
          </h2>
          <p className="text-muted leading-relaxed mb-6">
            We offer a 30-day return window. If you receive an item and
            it&apos;s not what you expected, you have 30 days from the delivery
            date to reach out about a return.
          </p>

          <div className="bg-surface border border-white/5 p-8 mb-6">
            <h3 className="font-display text-lg font-bold mb-4">
              To be eligible for a return, your item must:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                Be in the same condition you received it — unworn, unused, with
                tags attached
              </li>
              <li className="flex items-start gap-3 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                Be in its original packaging
              </li>
              <li className="flex items-start gap-3 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                Include the receipt or proof of purchase
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              <span className="font-semibold text-text">To start a return:</span>{" "}
              Email us at{" "}
              <a
                href="mailto:contact@stlouiscreations.com"
                className="text-primary underline hover:no-underline"
              >
                contact@stlouiscreations.com
              </a>
              . If your return is approved, we&apos;ll send you a return
              shipping label along with instructions on where and how to send
              the item.
            </p>
            <p className="bg-surface/50 border-l-2 border-primary px-4 py-3">
              <strong>Items sent back without prior authorization will not be
              accepted.</strong> Just reach out first — we&apos;re reasonable.
            </p>
          </div>
        </FadeUpSection>

        {/* Damages and Issues */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Damages and Issues
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Please inspect your order as soon as it arrives. If something is
            defective, damaged, or you received the wrong item, contact us right
            away. Photos help us resolve things faster, so if you can snap a few,
            include them.
          </p>
          <p className="text-muted leading-relaxed font-semibold text-text">
            We&apos;ll make it right. Period.
          </p>
        </FadeUpSection>

        {/* Exceptions */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Exceptions — What Can&apos;t Be Returned
          </h2>

          <div className="bg-surface border border-white/5 p-8 mb-6">
            <h3 className="font-display text-lg font-bold mb-4">
              Custom or personalized orders
            </h3>
            <p className="text-muted leading-relaxed">
              cannot be returned unless they arrive damaged or defective. Because
              these items are engraved or made specifically for you, they&apos;re
              hard to resell.
            </p>
          </div>

          <div className="bg-surface border border-white/5 p-8 mb-6">
            <h3 className="font-display text-lg font-bold mb-4">
              Perishable goods
            </h3>
            <p className="text-muted leading-relaxed">
              (like food items) are not returnable.
            </p>
          </div>

          <p className="text-muted leading-relaxed">
            If you&apos;re unsure whether your item qualifies, reach out before
            sending it back.
          </p>
        </FadeUpSection>

        {/* Refunds */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Refunds
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Once we receive and inspect your return, we&apos;ll let you know if
              the refund was approved.
            </p>
            <p>
              If approved, the refund goes back to your original payment method
              within <span className="font-semibold text-text">10 business days</span>.
              After that, it may take a little longer depending on your bank or
              card issuer — that&apos;s outside our control.
            </p>
            <div className="bg-surface/50 border-l-2 border-primary px-4 py-3">
              <p className="text-muted">
                <strong>Haven&apos;t seen your refund after 15 business days?</strong>{" "}
                Contact us at{" "}
                <a
                  href="mailto:contact@stlouiscreations.com"
                  className="text-primary underline hover:no-underline"
                >
                  contact@stlouiscreations.com
                </a>{" "}
                and we&apos;ll look into it.
              </p>
            </div>
          </div>
        </FadeUpSection>

        {/* Contact */}
        <FadeUpSection className="text-center mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Have a Question About a Return?
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
