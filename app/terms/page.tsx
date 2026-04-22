import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of the St. Louis Creations website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>Legal</SectionLabel>
          <AnimatedHeading
            text="Terms of Service"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            By placing an order through our site, you&apos;re agreeing to these terms.
          </p>
        </FadeUpSection>

        {/* Orders */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Orders
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              All orders are subject to product availability. We reserve the
              right to limit quantities, refuse or cancel any order, or
              discontinue any product at any time without notice.
            </p>
            <p>
              Prices shown on our site are subject to change without notice.
            </p>
            <p>
              We also reserve the right to correct any errors, inaccuracies, or
              omissions — and to change or update information at any time, even
              after you&apos;ve placed an order. If something looks wrong,
              we&apos;ll reach out.
            </p>
          </div>
        </FadeUpSection>

        {/* Custom Products */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Custom Products
          </h2>
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <p className="text-muted leading-relaxed">
              Because our products are custom engraved to your specifications,{" "}
              <strong>we cannot accept cancellations once production has begun</strong>.
            </p>
          </div>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Before you approve your order, please review your proof carefully.
              Check spelling, names, dates, everything. Once it&apos;s in
              production, we&apos;re committed.
            </p>
            <p>
              Custom orders cannot be returned unless they arrive damaged or
              defective.
            </p>
          </div>
        </FadeUpSection>

        {/* Payment */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Payment
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We accept the payment methods available through our checkout —
              powered by <strong>Stripe</strong>.
            </p>
            <p>
              All prices are listed in <strong>USD</strong>.
            </p>
            <p>
              Your payment information is processed securely through Stripe.{" "}
              <strong>We do not store your credit card details on our servers.</strong>
            </p>
          </div>
        </FadeUpSection>

        {/* Shipping and Risk of Loss */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Shipping and Risk of Loss
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Once we hand your package over to the carrier, risk of loss and
              title pass to you. That means we&apos;re not responsible for
              delays, lost packages, or damages that occur during shipping.
            </p>
            <p>
              If there&apos;s an issue with a shipment, contact us and we&apos;ll
              help you work it out with the carrier.
            </p>
          </div>
        </FadeUpSection>

        {/* Intellectual Property */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Intellectual Property
          </h2>
          <p className="text-muted leading-relaxed">
            All content on this site — text, graphics, logos, images, and more —
            is the property of St. Louis Creations or our content
            suppliers. It&apos;s protected by copyright and other intellectual
            property laws.
          </p>
          <p className="text-muted leading-relaxed mt-4">
            You may not reproduce, distribute, or create derivative works from
            our content without our express written permission.
          </p>
        </FadeUpSection>

        {/* User Conduct */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            User Conduct
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              You agree not to use our site for any unlawful purpose, or in any
              way that could damage, disable, or impair it.
            </p>
            <p>
              Don&apos;t use a false email address, pretend to be someone else,
              or mislead anyone about where comments or feedback are coming from.
              You&apos;re responsible for anything you post.
            </p>
          </div>
        </FadeUpSection>

        {/* Limitation of Liability */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Limitation of Liability
          </h2>
          <p className="text-muted leading-relaxed">
            To the fullest extent allowed by law, St. Louis Creations is
            not liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of the site or our products.
          </p>
        </FadeUpSection>

        {/* Errors, Inaccuracies, and Omissions */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Errors, Inaccuracies, and Omissions
          </h2>
          <p className="text-muted leading-relaxed">
            Occasionally our site may have typos, outdated pricing, or other
            mistakes — we&apos;re human. We reserve the right to correct these
            and to cancel orders if the information was inaccurate, at any
            time, without prior notice.
          </p>
        </FadeUpSection>

        {/* Governing Law */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Governing Law
          </h2>
          <p className="text-muted leading-relaxed">
            These terms, and any order you place with us, are governed by the
            laws of the <strong>State of Missouri, USA</strong>. Any disputes
            will be resolved in Missouri courts.
          </p>
        </FadeUpSection>

        {/* Contact */}
        <FadeUpSection className="text-center mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            We&apos;d love to hear from you.
          </p>
          <div className="space-y-2 text-muted mb-8">
            <p>
              <span className="font-semibold text-text">Email:</span>{" "}
              <a
                href="mailto:Contact@StllaserCreations.com"
                className="text-primary underline hover:no-underline"
              >
                Contact@StllaserCreations.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-text">Phone:</span> (636)
              628-6737
            </p>
            <p>
              <span className="font-semibold text-text">Mail:</span> 903
              Southern Hills Court, Eureka, MO 63025
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
