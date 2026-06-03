import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata, getFaqJsonLd } from "@/lib/seo";
import { coreTopicHubs, getTopicHubBySlug } from "@/lib/topic-hubs";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return coreTopicHubs.map((hub) => ({ slug: hub.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const hub = getTopicHubBySlug(params.slug);
  const faq = hub?.proofPages?.faq;
  if (!hub || !faq) return { title: "FAQ Not Found" };

  return createPageMetadata({
    title: faq.title,
    description: faq.description,
    path: `/topics/${hub.slug}/faq`,
  });
}

export default function TopicFaqPage({ params }: PageProps) {
  const hub = getTopicHubBySlug(params.slug);
  const faq = hub?.proofPages?.faq;
  if (!hub || !faq) notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <JsonLd data={getFaqJsonLd(faq.questions)} />
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
            <span className="text-text">FAQ</span>
          </nav>

          <SectionLabel>{hub.eyebrow}</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mt-5">
            {faq.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed mt-6 max-w-3xl">
            {faq.intro} In 2026, St. Louis Creations uses this FAQ as a proof
            page for the related buyer guide, not as a keyword page. The
            answers focus on five practical quote factors: what the item must
            do, which material is being considered, what file or artwork is
            available, how many pieces are needed, and what deadline or proofing
            step controls the schedule.
          </p>
        </FadeUpSection>

        <div className="space-y-5 mt-12">
          {faq.questions.map((item) => (
            <FadeUpSection
              key={item.q}
              className="bg-surface border border-white/5 p-6"
            >
              <h2 className="font-display text-2xl font-bold">{item.q}</h2>
              <p className="text-muted leading-relaxed mt-4">{item.a}</p>
            </FadeUpSection>
          ))}
        </div>
      </article>
    </div>
  );
}
