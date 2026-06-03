import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { coreTopicHubs, getTopicHubBySlug } from "@/lib/topic-hubs";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return coreTopicHubs.map((hub) => ({ slug: hub.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const hub = getTopicHubBySlug(params.slug);
  const useCase = hub?.proofPages?.useCase;
  if (!hub || !useCase) return { title: "Use Case Not Found" };

  return createPageMetadata({
    title: useCase.title,
    description: useCase.description,
    path: `/topics/${hub.slug}/use-case`,
  });
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-surface border border-white/5 p-6">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <ul className="space-y-3 mt-5">
        {items.map((item) => (
          <li key={item} className="text-muted leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function TopicUseCasePage({ params }: PageProps) {
  const hub = getTopicHubBySlug(params.slug);
  const useCase = hub?.proofPages?.useCase;
  if (!hub || !useCase) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: useCase.title,
    description: useCase.description,
    url: absoluteUrl(`/topics/${hub.slug}/use-case`),
    about: hub.title,
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <JsonLd data={jsonLd} />
      <article className="max-w-4xl mx-auto px-6">
        <FadeUpSection>
          <nav className="mb-8 text-sm text-muted">
            <Link href="/topics" className="hover:text-primary transition-colors">
              Topic Guides
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/topics/${hub.slug}`}
              className="hover:text-primary transition-colors"
            >
              {hub.title}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Use Case</span>
          </nav>

          <SectionLabel>{hub.eyebrow}</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mt-5">
            {useCase.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed mt-6 max-w-3xl">
            {useCase.summary} In 2026, St. Louis Creations uses this use-case
            page to show professional project reasoning without inventing a
            customer testimonial. The example explains the scenario, why the
            production method fits, which inputs are needed for a quote, what
            process steps reduce risk, and which decision notes should be
            resolved before production.
          </p>
        </FadeUpSection>

        <FadeUpSection className="mt-12 bg-surface border border-white/5 p-6">
          <h2 className="font-display text-2xl font-bold">Scenario</h2>
          <p className="text-muted leading-relaxed mt-4">{useCase.scenario}</p>
        </FadeUpSection>

        <div className="space-y-5 mt-5">
          <FadeUpSection>
            <ListSection title="Project Fit" items={useCase.projectFit} />
          </FadeUpSection>
          <FadeUpSection>
            <ListSection title="Process" items={useCase.process} />
          </FadeUpSection>
          <FadeUpSection>
            <ListSection title="Quote Inputs" items={useCase.quoteInputs} />
          </FadeUpSection>
          <FadeUpSection>
            <ListSection title="Decision Notes" items={useCase.decisionNotes} />
          </FadeUpSection>
        </div>
      </article>
    </div>
  );
}
