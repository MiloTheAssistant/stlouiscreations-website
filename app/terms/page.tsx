import { Metadata } from "next";
import Link from "next/link";
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
          <p className="text-muted/70 mt-4 text-sm">
            Last updated: May 7, 2026
          </p>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Overview
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              This website is operated by St. Louis Creations. Throughout the
              site, the terms &quot;we,&quot; &quot;us,&quot; and
              &quot;our&quot; refer to St. Louis Creations. By visiting
              stlouiscreations.com, requesting a quote, placing an order, or
              purchasing products or services from us, you agree to these Terms
              of Service.
            </p>
            <p>
              These Terms apply to all users of the website, including browsers,
              customers, vendors, merchants, and anyone who submits content,
              project files, quote requests, or feedback.
            </p>
          </div>
        </FadeUpSection>

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
              omissions, and to change or update information at any time, even
              after you&apos;ve placed an order. If something looks wrong,
              we&apos;ll reach out.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Custom Products
          </h2>
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <p className="text-muted leading-relaxed">
              Because our products are custom engraved, cut, printed, or
              otherwise produced to your specifications,{" "}
              <strong>
                custom orders are non-cancelable once production has begun
              </strong>
              .
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
            <p>
              You are responsible for confirming that names, dates, spelling,
              artwork, logos, dimensions, materials, and submitted files are
              accurate and that you have the right to use any content you ask us
              to reproduce or modify.
            </p>
          </div>
        </FadeUpSection>

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
            <p>
              Shipping timing, methods, and related requirements are governed by
              our{" "}
              <Link
                href="/shipping"
                className="text-primary underline hover:no-underline"
              >
                Shipping Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Returns and Refunds
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Returns, refunds, exchanges, damaged items, defective items, and
              refund eligibility are governed by our{" "}
              <Link
                href="/refund-policy"
                className="text-primary underline hover:no-underline"
              >
                Return and Refund Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
            <p>
              If there is a conflict between these Terms and a more specific
              posted return, refund, or shipping policy, the more specific
              posted policy controls for that issue.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Intellectual Property
          </h2>
          <p className="text-muted leading-relaxed">
            All content on this site, including text, graphics, logos, images,
            designs, product photography, and more,
            is the property of St. Louis Creations or our content
            suppliers. It&apos;s protected by copyright and other intellectual
            property laws.
          </p>
          <p className="text-muted leading-relaxed mt-4">
            You may not reproduce, distribute, or create derivative works from
            our content without our express written permission.
          </p>
          <p className="text-muted leading-relaxed mt-4">
            By submitting artwork, logos, text, names, files, or other materials
            for a custom order, you represent that you own or have permission to
            use those materials and authorize us to use them to quote, produce,
            fulfill, photograph, and support your order.
          </p>
        </FadeUpSection>

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

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Errors, Inaccuracies, and Omissions
          </h2>
          <p className="text-muted leading-relaxed">
            Occasionally our site may have typos, outdated pricing, or other
            mistakes. We reserve the right to correct these
            and to cancel orders if the information was inaccurate, at any
            time, without prior notice.
          </p>
        </FadeUpSection>

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
                href="mailto:contact@stlouiscreations.com"
                className="text-primary underline hover:no-underline"
              >
                contact@stlouiscreations.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-text">Phone:</span> (573)
              500-0064
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

        <FadeUpSection className="mt-12 text-center">
          <p className="text-muted/70 text-sm">
            Related:{" "}
            <Link
              href="/privacy-policy"
              className="text-primary underline hover:no-underline"
            >
              Privacy Policy
            </Link>
            {" "} |{" "}
            <Link
              href="/refund-policy"
              className="text-primary underline hover:no-underline"
            >
              Return and Refund Policy
            </Link>
            {" "} |{" "}
            <Link
              href="/shipping"
              className="text-primary underline hover:no-underline"
            >
              Shipping Policy
            </Link>
          </p>
        </FadeUpSection>
      </div>
    </div>
  );
}
