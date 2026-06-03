import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import SectionLabel from "@/components/ui/SectionLabel";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, getFaqJsonLd } from "@/lib/seo";
import { getTopicHubBySlug, topicHubs } from "@/lib/topic-hubs";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ slug: hub.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const hub = getTopicHubBySlug(params.slug);
  if (!hub) {
    return { title: "Topic Not Found" };
  }

  return createPageMetadata({
    title: hub.title,
    description: hub.description,
    path: `/topics/${hub.slug}`,
  });
}

export default function TopicHubPage({ params }: PageProps) {
  const hub = getTopicHubBySlug(params.slug);
  if (!hub) notFound();

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: hub.title,
    description: hub.description,
    url: absoluteUrl(`/topics/${hub.slug}`),
    inLanguage: "en-US",
    mainEntity: {
      "@type": "Question",
      name: hub.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: hub.answer,
      },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <JsonLd data={pageJsonLd} />
      <JsonLd data={getFaqJsonLd(hub.faqs)} />
      <article className="max-w-4xl mx-auto px-6">
        <FadeUpSection>
          <nav className="mb-8 text-sm text-muted">
            <Link href="/topics" className="hover:text-primary transition-colors">
              Topic Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{hub.title}</span>
          </nav>

          <SectionLabel>{hub.eyebrow}</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mt-5">
            {hub.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed mt-6 max-w-3xl">
            {hub.description}
          </p>
        </FadeUpSection>

        <FadeUpSection className="mt-12 bg-surface border border-white/5 p-7 md:p-9">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            What should buyers know about {hub.title}?
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            {hub.answer} In 2026, St. Louis Creations uses this page as one of
            five core buyer guides for professional laser engraving and 3D
            printing decisions. The guide is written for quote planning: it
            separates best-fit use cases, material limits, file requirements,
            proofing needs, and production tradeoffs so a buyer can decide what
            to send before a project is reviewed.
          </p>
        </FadeUpSection>

        <div className="mt-14 space-y-12">
          {hub.sections.map((section) => (
            <FadeUpSection key={section.title}>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                {section.title}
              </h2>
              <p className="text-muted leading-relaxed mt-4">{section.body}</p>
              {section.bullets ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="bg-surface border border-white/5 p-4 text-sm text-muted leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </FadeUpSection>
          ))}
        </div>

        <FadeUpSection className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Related St. Louis Creations Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {hub.proofPages ? (
              <>
                <Link
                  href={`/topics/${hub.slug}/faq`}
                  className="bg-surface border border-white/5 p-4 text-sm text-primary hover:border-primary/30 transition-colors"
                >
                  {hub.proofPages.faq.title}
                </Link>
                <Link
                  href={`/topics/${hub.slug}/use-case`}
                  className="bg-surface border border-white/5 p-4 text-sm text-primary hover:border-primary/30 transition-colors"
                >
                  {hub.proofPages.useCase.title}
                </Link>
              </>
            ) : null}
            {hub.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-surface border border-white/5 p-4 text-sm text-primary hover:border-primary/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </FadeUpSection>

        <FadeUpSection className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold">FAQ</h2>
          <div className="space-y-4 mt-6">
            {hub.faqs.map((faq) => (
              <div key={faq.q} className="bg-surface border border-white/5 p-5">
                <h3 className="font-display font-bold">{faq.q}</h3>
                <p className="text-muted leading-relaxed mt-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </FadeUpSection>

        <FadeUpSection className="mt-16 pt-12 border-t border-white/5 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to plan a project?
          </h2>
          <p className="text-muted mb-6">
            Send the use case, material, quantity, deadline, and artwork or
            model files so the quote can be reviewed against the real job.
          </p>
          <GlowButton href="/contact" variant="primary">
            Request a Quote
          </GlowButton>
        </FadeUpSection>
      </article>
    </div>
  );
}
