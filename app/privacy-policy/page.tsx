import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How St. Louis Creations collects, uses, shares, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="text-center mb-24">
          <SectionLabel>Legal</SectionLabel>
          <AnimatedHeading
            text="Privacy Policy"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            How St. Louis Creations collects, uses, shares, and protects your
            personal information when you visit our website, request a quote, or
            place an order.
          </p>
          <p className="text-muted/70 mt-4 text-sm">
            Last updated: May 7, 2026
          </p>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Scope of This Policy
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              This Privacy Policy describes how St. Louis Creations
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects,
              uses, and discloses personal information when you use{" "}
              <a
                href="https://stlouiscreations.com"
                className="text-primary underline hover:no-underline"
              >
                stlouiscreations.com
              </a>
              , communicate with us, subscribe to marketing, request a quote, or
              make a purchase.
            </p>
            <p>
              Personal information means information that identifies, relates
              to, describes, or can reasonably be linked to an individual.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Information We Collect
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Device and Site Usage Information
              </h3>
              <p className="text-muted leading-relaxed">
                When you visit the site, we may collect technical information
                such as your IP address, browser type, device type, pages
                viewed, referring pages, time zone, approximate location, and
                how you interact with the site. We collect this information
                through cookies, pixels, tags, log files, and similar
                technologies.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <span className="font-semibold text-text">
                  Why we collect it:{" "}
                </span>
                to load and secure the website, understand site performance,
                improve the customer experience, and measure marketing
                effectiveness.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Quote, Contact, and Customer Support Information
              </h3>
              <p className="text-muted leading-relaxed">
                If you request a quote, submit a contact form, email us, call
                us, or ask for support, we collect the information you provide,
                such as your name, email address, phone number, project details,
                order questions, uploaded design information, and any other
                message content you choose to share.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <span className="font-semibold text-text">
                  Why we collect it:{" "}
                </span>
                to respond to your request, prepare quotes, provide customer
                service, and manage custom orders.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Order and Checkout Information
              </h3>
              <p className="text-muted leading-relaxed">
                When you place an order, we may collect your name, email
                address, phone number, billing address, shipping address,
                products ordered, customization details, and payment-related
                information needed to complete checkout. Payments are processed
                through Stripe. We do not store full credit card numbers on our
                servers.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <span className="font-semibold text-text">
                  Why we collect it:{" "}
                </span>
                to process payment, fulfill your order, arrange shipping or
                pickup, send order confirmations, handle support, screen for
                fraud, and keep business records.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold mb-3 text-primary">
                Marketing Information
              </h3>
              <p className="text-muted leading-relaxed">
                If you subscribe to our email marketing or otherwise opt in, we
                collect your email address and related subscription preferences.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <span className="font-semibold text-text">
                  Why we collect it:{" "}
                </span>
                to send product updates, offers, announcements, and other
                marketing communications. You can unsubscribe from marketing
                emails at any time by using the unsubscribe link in the email or
                contacting us.
              </p>
            </div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            How We Use Personal Information
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We use personal information to operate the website, provide
              products and services, process transactions, fulfill custom
              orders, communicate with customers, respond to support requests,
              prevent fraud, comply with legal obligations, improve our
              services, and send marketing communications when permitted.
            </p>
            <p>
              We may also use aggregated or de-identified information that does
              not reasonably identify you for analytics, reporting, and business
              planning.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            How We Share Personal Information
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We share personal information with service providers that help us
              run the business, including website hosting, payment processing,
              analytics, advertising, email marketing, shipping, fulfillment,
              customer support, fraud prevention, and other operational
              services.
            </p>
            <p>
              We use Stripe to process payments. Stripe may collect and process
              payment information according to its own privacy practices.
            </p>
            <p>
              We may share information if required by law, subpoena, court
              order, or other lawful request, or when necessary to protect our
              rights, customers, business, or website.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Analytics, Advertising, and Cookies
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We use Google Analytics to understand how visitors use the site
              and to improve site performance and content. You can learn more
              about how Google uses information at{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/privacy
              </a>
              . You can opt out of Google Analytics at{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
            <p>
              We use Meta Pixel and related Meta advertising tools to measure ad
              performance, understand interactions with our website, and help
              show relevant ads on Meta platforms such as Facebook and
              Instagram. You can manage Meta ad preferences through your Meta or
              Facebook account settings.
            </p>
            <p>
              Cookies and similar technologies help the site remember
              preferences, support cart and checkout functionality, secure the
              website, measure analytics, and support advertising. Most browsers
              let you remove or block cookies through browser settings. Blocking
              cookies may affect how parts of the site work.
            </p>
            <p>
              Because there is no consistent industry standard for responding to
              &quot;Do Not Track&quot; signals, we do not currently change our
              data practices when we receive those signals.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Your Privacy Rights
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Depending on where you live, including California, the European
              Economic Area, the United Kingdom, or other regions with privacy
              laws, you may have rights to request access to, correction of,
              deletion of, or portability of certain personal information. You
              may also have the right to object to or restrict certain
              processing.
            </p>
            <p>
              To make a privacy request, contact us at{" "}
              <a
                href="mailto:contact@stlouiscreations.com"
                className="text-primary underline hover:no-underline"
              >
                contact@stlouiscreations.com
              </a>
              . We may need to verify your identity before completing a request.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Data Retention
          </h2>
          <p className="text-muted leading-relaxed">
            We keep personal information for as long as needed to provide
            services, complete orders, maintain business records, resolve
            disputes, comply with legal obligations, prevent fraud, and enforce
            our agreements. If you ask us to delete information, we will do so
            unless we need to keep it for legitimate business or legal reasons.
          </p>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Children
          </h2>
          <p className="text-muted leading-relaxed">
            Our website is not intended for children under 13. We do not
            knowingly collect personal information from children under 13. If
            you believe a child has provided personal information to us, contact
            us and we will take appropriate steps to delete it.
          </p>
        </FadeUpSection>

        <FadeUpSection className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Changes to This Policy
          </h2>
          <p className="text-muted leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or
            business operations. The updated version will be posted on this page
            with a revised &quot;Last updated&quot; date.
          </p>
        </FadeUpSection>

        <FadeUpSection className="text-center mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Questions About Privacy?
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
            <Link href="/terms" className="text-primary underline hover:no-underline">
              Terms of Service
            </Link>
          </p>
        </FadeUpSection>
      </div>
    </div>
  );
}
