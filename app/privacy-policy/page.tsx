import { Metadata } from "next";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How St. Louis Creations collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>Legal</SectionLabel>
          <AnimatedHeading
            text="Privacy Policy"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            How we collect, use, and protect your personal information.
          </p>
        </FadeUpSection>

        {/* What We Collect */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            What We Collect
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Device Information
              </h3>
              <p className="text-muted leading-relaxed">
                When you visit our site, we automatically collect some technical
                information: your web browser version, IP address, time zone,
                cookie data, what pages you viewed, search terms you used, and
                how you interacted with the site. We collect this using cookies,
                log files, web beacons, and similar tracking tools.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <span className="font-semibold text-text">
                  Why we collect it:{" "}
                </span>
                So the site loads correctly for you, and so we can understand
                how people use the site so we can make it better.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Order Information
              </h3>
              <p className="text-muted leading-relaxed">
                When you place an order, we collect: your name, billing address,
                shipping address, payment information (including credit card
                numbers), email address, and phone number.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <span className="font-semibold text-text">
                  Why we collect it:{" "}
                </span>
                To fulfill your order — processing payment, arranging shipping,
                and sending you order confirmations and invoices.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Customer Support Information
              </h3>
              <p className="text-muted leading-relaxed">
                If you contact us with a question or issue, we keep whatever
                information you choose to share so we can help you properly.
              </p>
            </div>
          </div>
        </FadeUpSection>

        {/* How We Share */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            How We Share Your Information
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We share your personal information with service providers who help
              us run the business — mainly Shopify, which powers our online
              store. These partners are contractually required to handle your
              data carefully.
            </p>
            <p>
              We may also share your information if we&apos;t legally required
              to — for example, in response to a subpoena, search warrant, or
              other valid legal request. Or if we need to protect our rights.
            </p>
          </div>
        </FadeUpSection>

        {/* Advertising & Analytics */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Advertising &amp; Analytics
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We use Google Analytics to understand how customers use our site.
              This helps us improve the experience.
            </p>
            <p>
              You can opt out of Google Analytics at any time:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                tools.google.com/dlpage/gaoptout
              </a>
            </p>
            <p>
              We may use your information to show you targeted ads or marketing
              we think you might find relevant. To learn more about how targeted
              advertising works, visit the Network Advertising Initiative
              educational page.
            </p>
            <div className="mt-4">
              <p className="font-semibold text-text mb-2">
                To opt out of targeted advertising:
              </p>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Google Analytics Opt-out:{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-primary underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tools.google.com/dlpage/gaoptout
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Facebook Ad preferences: manage in your Facebook account
                  settings
                </li>
              </ul>
            </div>
            <p className="mt-4">
              We may also share information about your site usage and purchases
              with our advertising partners.
            </p>
          </div>
        </FadeUpSection>

        {/* Your Rights */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Your Rights
          </h2>
          <p className="text-muted leading-relaxed">
            If you live in certain regions (like the EU, California, or other
            territories with privacy laws), you may have the right to access,
            correct, or delete the personal information we hold about you.
          </p>
          <p className="text-muted leading-relaxed mt-3">
            To exercise these rights, contact us at:{" "}
            <a
              href="mailto:Contact@StllaserCreations.com"
              className="text-primary underline hover:no-underline"
            >
              Contact@StllaserCreations.com
            </a>
          </p>
        </FadeUpSection>

        {/* Data Retention */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Data Retention
          </h2>
          <p className="text-muted leading-relaxed">
            We keep your personal information for our records unless and until
            you ask us to delete it. If you&apos;d like us to delete your data,
            email us at the address above.
          </p>
        </FadeUpSection>

        {/* Children */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Children
          </h2>
          <p className="text-muted leading-relaxed">
            Our site is not intended for individuals under the age of 18. We do
            not knowingly collect information from minors.
          </p>
        </FadeUpSection>

        {/* Changes to This Policy */}
        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Changes to This Policy
          </h2>
          <p className="text-muted leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in how we operate, or for legal, operational, or regulatory
            reasons. If we make meaningful changes, we&apos;ll note them on this
            page.
          </p>
        </FadeUpSection>

        {/* Contact */}
        <FadeUpSection className="text-center mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Questions? We&apos;re Happy to Talk
          </h2>
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
