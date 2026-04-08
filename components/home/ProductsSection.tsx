"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { productCategories } from "@/lib/constants";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function ProductsSection() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="text-center mb-16">
          <SectionLabel>Product Categories</SectionLabel>
          <AnimatedHeading
            text="Built for Your Business"
            as="h2"
            className="font-display text-3xl md:text-5xl font-bold mt-4"
          />
        </FadeUpSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((cat, i) => (
            <FadeUpSection key={cat.title} delay={i * 0.08}>
              <Link href={cat.href}>
                <motion.div
                  className="group relative bg-background border border-white/5 overflow-hidden h-64 flex items-end p-6 cursor-pointer"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 30px rgba(255,107,0,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

                  {/* Placeholder bg pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10" />
                  </div>

                  <div className="relative z-20">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-muted text-sm mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
