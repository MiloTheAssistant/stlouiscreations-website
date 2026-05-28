import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <article className="max-w-3xl mx-auto px-6">
        <FadeUpSection>
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted">
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{post.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div>
              <div className="flex items-center gap-4 text-muted text-xs font-display uppercase tracking-wider mb-4">
                <time>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(post.date))}
                </time>
                <span>&bull;</span>
                <span>{post.readTime} read</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </FadeUpSection>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted prose-strong:text-text prose-a:text-primary hover:prose-a:underline">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i}>{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph
                .split("\n")
                .map((line) => line.replace("- ", ""));
              return (
                <ul key={i}>
                  {items.map((item, j) => (
                    <li
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: item.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        ),
                      }}
                    />
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ),
                }}
              />
            );
          })}
        </div>

        {/* CTA */}
        <FadeUpSection className="mt-16 pt-12 border-t border-white/5 text-center">
          <h3 className="font-display text-2xl font-bold mb-4">
            Have a Project in Mind?
          </h3>
          <p className="text-muted mb-6">
            Let&apos;s bring your vision to life with precision laser engraving.
          </p>
          <GlowButton href="/contact" variant="primary">
            Request a Quote
          </GlowButton>
        </FadeUpSection>
      </article>
    </div>
  );
}
