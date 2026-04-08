import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUpSection from "@/components/ui/FadeUpSection";
import GlowButton from "@/components/ui/GlowButton";

const posts: Record<
  string,
  { title: string; date: string; readTime: string; content: string }
> = {
  "custom-tumblers-bulk-orders": {
    title: "Why Custom Tumblers Are the #1 Corporate Gift",
    date: "2026-03-15",
    readTime: "5 min",
    content: `Custom laser-engraved tumblers have become the most popular corporate gift choice — and for good reason. They're practical, premium-feeling, and offer a large engraving surface for your brand.

## Why Tumblers Work

Unlike pens or notepads that get lost in a drawer, a quality tumbler becomes part of someone's daily routine. Every morning coffee, every gym session, every desk sip — your brand is right there.

## The Bulk Advantage

When ordering in bulk (50+ units), per-unit costs drop significantly. Our laser engraving process is efficient at scale — setup happens once, and each subsequent tumbler takes seconds to engrave.

## Customization Options

We offer a range of tumbler styles, sizes (20oz and 30oz), and colors. Your logo, event name, or custom message is permanently laser-engraved — it won't peel, fade, or wash off.

## Popular Use Cases

- **Employee onboarding gifts** — Welcome new hires with branded drinkware
- **Conference swag** — Premium giveaways that attendees actually keep
- **Client appreciation** — Show valued clients you care with personalized gifts
- **Team building events** — Custom tumblers for sports leagues and company outings

Ready to order custom tumblers for your team? Contact us for bulk pricing and a free digital proof.`,
  },
  "laser-engraving-materials-guide": {
    title: "The Ultimate Guide to Laser Engraving Materials",
    date: "2026-03-01",
    readTime: "8 min",
    content: `Choosing the right material is crucial for a great laser engraving result. Different materials react differently to laser energy, producing varying effects in color, depth, and contrast.

## Acrylic

Acrylic is one of the most versatile materials for laser work. It cuts cleanly with polished edges and engraves with a frosted white appearance that contrasts beautifully against clear or colored acrylic.

**Best for:** Awards, signage, displays, keychains

## Wood

Wood engraving produces a natural, warm aesthetic. Hardwoods like maple and walnut give the best results — they engrave with beautiful contrast and minimal charring.

**Best for:** Cutting boards, signs, coasters, plaques

## Glass

Glass engraving creates an elegant frosted effect. The laser fractures the surface at a microscopic level, producing a white, frosted appearance.

**Best for:** Wine glasses, awards, vases, decanters

## Metal

Bare metal requires a special marking compound or anodized coating for direct laser engraving. Anodized aluminum engraves with exceptional contrast and durability.

**Best for:** Name plates, dog tags, business cards, tools

## Leather

Leather responds beautifully to laser engraving, producing a dark, debossed effect. Both genuine and faux leather work well.

**Best for:** Wallets, journals, belts, portfolios

## Stone

Natural stone like slate and marble engraves with a light-colored mark against the dark surface. The results are permanent and weather-resistant.

**Best for:** Memorials, tiles, coasters, garden markers

## Choosing the Right Material

Consider your end use, budget, and desired aesthetic. We're happy to help you choose — contact us for material recommendations and samples.`,
  },
  "sports-awards-season": {
    title: "Getting Ready for Awards Season: A Planning Guide",
    date: "2026-02-15",
    readTime: "6 min",
    content: `Whether you're organizing awards for a youth sports league, corporate event, or academic achievement ceremony, planning ahead is key to getting the best results and pricing.

## Start Early

We recommend placing your award order at least 3-4 weeks before your event. This gives time for design proofs, production, and shipping — without rush fees.

## Choose Your Award Type

- **Crystal awards** — Premium, elegant, perfect for top-tier recognition
- **Acrylic plaques** — Modern, versatile, great for bulk orders
- **Wood plaques** — Traditional, warm, classic look
- **Medals** — Great for individual participants and team sports

## Customization Tips

- Keep text concise — longer text means smaller font
- Vector logos engrave best — send us AI, EPS, or SVG files
- Consider adding the date and event name for a keepsake quality
- Ask about color-fill options for added visual impact

## Bulk Pricing

Our pricing tiers are designed for bulk orders. The more you order, the lower the per-unit cost. We offer special pricing for:

- Youth sports leagues (50+ awards)
- Corporate recognition programs (100+ awards)
- School and academic ceremonies (25+ awards)

## Next Steps

Send us your event details, estimated quantities, and any design ideas you have. We'll provide a custom quote and digital proof within 24 hours.`,
  },
};

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = posts[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts[params.slug];
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
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted prose-strong:text-text prose-a:text-primary hover:prose-a:underline">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i}>{paragraph.replace("## ", "")}</h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").map((line) => line.replace("- ", ""));
                return (
                  <ul key={i}>
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("**")) {
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-white/5 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-muted mb-6">
              Let&apos;s bring your vision to life with precision laser engraving.
            </p>
            <GlowButton href="/contact" variant="primary">
              Request a Quote
            </GlowButton>
          </div>
        </FadeUpSection>
      </article>
    </div>
  );
}
