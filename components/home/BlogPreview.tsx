"use client";

import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const placeholderPosts = [
  {
    slug: "custom-tumblers-bulk-orders",
    title: "Why Custom Tumblers Are the #1 Corporate Gift",
    excerpt:
      "Discover why laser-engraved tumblers have become the go-to choice for corporate gifting, team events, and branded merchandise.",
    date: "2026-03-15",
  },
  {
    slug: "laser-engraving-materials-guide",
    title: "The Ultimate Guide to Laser Engraving Materials",
    excerpt:
      "From acrylic to stone — learn which materials work best for different laser engraving applications and how to choose the right one.",
    date: "2026-03-01",
  },
  {
    slug: "sports-awards-season",
    title: "Getting Ready for Awards Season: A Planning Guide",
    excerpt:
      "Plan ahead for your league or tournament awards. Tips on bulk ordering, customization options, and turnaround times.",
    date: "2026-02-15",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <SectionLabel>From the Blog</SectionLabel>
            <AnimatedHeading
              text="Insights & Ideas"
              as="h2"
              className="font-display text-3xl md:text-5xl font-bold mt-4"
            />
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 text-primary text-sm font-display uppercase tracking-wider hover:underline"
          >
            View All Posts &rarr;
          </Link>
        </FadeUpSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholderPosts.map((post, i) => (
            <FadeUpSection key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="bg-surface border border-white/5 p-8 hover:border-primary/20 transition-all duration-300 h-full">
                  <time className="text-muted text-xs font-display uppercase tracking-wider">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(post.date))}
                  </time>
                  <h3 className="font-display text-lg font-bold mt-3 mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-xs font-display uppercase tracking-wider mt-6 group-hover:gap-3 transition-all">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
