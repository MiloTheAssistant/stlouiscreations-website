import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and insights on laser engraving, custom products, and business gifting from St. Louis Creations.",
};

const posts = [
  {
    slug: "custom-tumblers-bulk-orders",
    title: "Why Custom Tumblers Are the #1 Corporate Gift",
    excerpt:
      "Discover why laser-engraved tumblers have become the go-to choice for corporate gifting, team events, and branded merchandise.",
    date: "2026-03-15",
    readTime: "5 min",
  },
  {
    slug: "laser-engraving-materials-guide",
    title: "The Ultimate Guide to Laser Engraving Materials",
    excerpt:
      "From acrylic to stone — learn which materials work best for different laser engraving applications and how to choose the right one.",
    date: "2026-03-01",
    readTime: "8 min",
  },
  {
    slug: "sports-awards-season",
    title: "Getting Ready for Awards Season: A Planning Guide",
    excerpt:
      "Plan ahead for your league or tournament awards. Tips on bulk ordering, customization options, and turnaround times.",
    date: "2026-02-15",
    readTime: "6 min",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="text-center mb-16">
          <SectionLabel>Blog</SectionLabel>
          <AnimatedHeading
            text="Insights & Ideas"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Tips, guides, and inspiration for custom laser engraving and business gifting.
          </p>
        </FadeUpSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <FadeUpSection key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-surface border border-white/5 p-8 hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-4 text-muted text-xs font-display uppercase tracking-wider mb-4">
                    <time>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(post.date))}
                    </time>
                    <span>&bull;</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="font-display text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed flex-1">
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
    </div>
  );
}
