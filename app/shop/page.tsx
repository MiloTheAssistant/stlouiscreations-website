import { Suspense } from "react";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="text-center mb-12">
          <SectionLabel>Shop</SectionLabel>
          <AnimatedHeading
            text="Our Products"
            as="h1"
            className="font-display text-4xl md:text-6xl font-bold mt-4"
          />
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Custom laser engraved products for every occasion.
            All items are fully customizable with your design.
          </p>
        </FadeUpSection>

        {/* Category Filter */}
        <FadeUpSection delay={0.2} className="mb-12">
          <Suspense fallback={null}>
            <ShopClient />
          </Suspense>
        </FadeUpSection>
      </div>
    </div>
  );
}
