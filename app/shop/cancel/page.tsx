import Link from "next/link";
import FadeUpSection from "@/components/ui/FadeUpSection";

export default function CancelPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background flex items-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUpSection>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Order Cancelled
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            Your checkout was cancelled. No charges were made.
            Your cart items are still saved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold hover:shadow-glow transition-shadow"
            >
              Back to Shop
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white/20 text-text font-display text-xs uppercase tracking-wider font-bold hover:border-primary transition-colors"
            >
              Need Help?
            </Link>
          </div>
        </FadeUpSection>
      </div>
    </div>
  );
}
