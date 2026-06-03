"use client";

import Image from "next/image";
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
          <SectionLabel>Physical Outcomes</SectionLabel>
          <AnimatedHeading
            text="Built for Modern Brands"
            as="h2"
            className="font-display text-3xl md:text-5xl font-bold mt-4"
          />
          <p className="text-muted mt-5 max-w-2xl mx-auto leading-relaxed">
            From branded merchandise to recognition systems, every product path
            starts with the intended use, finish, material, and production goal.
          </p>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent z-10" />

                  <Image
                    src={cat.image}
                    alt={`${cat.title} from St. Louis Creations`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                  />

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

        <FadeUpSection className="mt-12 border border-white/5 bg-background p-8">
          <h2 className="font-display text-2xl font-bold">
            Product categories for branded and local production
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            The St. Louis Creations product catalog focuses on customizable
            drinkware, awards, recognition pieces, corporate gifts, fundraiser
            products, wood and slate goods, and 3D printed products. Each
            product path is selected around the intended use, material, finish,
            artwork, quantity, and deadline so the final object can work as a
            gift, campaign item, brand touchpoint, prototype, or finished
            production piece.
          </p>
        </FadeUpSection>
      </div>
    </section>
  );
}
