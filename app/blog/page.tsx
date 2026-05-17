import { Metadata } from "next";
import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";
import { StampedPageHero } from "@/components/brand/BrandVisuals";
import { getAllPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas and guides on digital fabrication, laser engraving, materials, branded products, and custom production.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <StampedPageHero
          label="Studio Notes"
          heading="Insights & Ideas"
          source="studio-precision"
          visualLabel="Maker Notes"
          visualCaption="Practical ideas from the overlap of engraving, additive manufacturing, and material craft."
        >
          <p>
            Ideas for digital fabrication, materials, branded products, and
            physical concepts worth producing.
          </p>
        </StampedPageHero>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <FadeUpSection key={post.slug} delay={i * 0.05}>
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
