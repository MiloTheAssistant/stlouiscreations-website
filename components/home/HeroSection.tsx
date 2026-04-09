"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import GlowButton from "@/components/ui/GlowButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient + noise texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Orange radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      {/* Logo watermark — large, low-opacity, slow breathing animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[min(90vw,900px)] aspect-square"
          style={{
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 80px rgba(255,107,0,0.15))",
          }}
        >
          <Image
            src="/brand/logo.png"
            alt=""
            fill
            priority
            className="object-contain opacity-[0.10]"
            sizes="(max-width: 768px) 90vw, 900px"
          />
        </motion.div>
      </motion.div>

      {/* Soft vignette over logo to keep the heading readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.85) 80%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          className="text-primary text-xs font-display uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          St. Louis &bull; Precision Crafted
        </motion.p>

        {/* Main Heading */}
        <AnimatedHeading
          text="Engrave Your Imagination"
          as="h1"
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          delay={0.3}
        />

        {/* Subheading */}
        <motion.p
          className="mt-8 text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Custom laser engraving, cutting & 3D printing for businesses
          that demand precision at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <GlowButton href="/contact" variant="primary">
            Request a Quote
          </GlowButton>
          <GlowButton href="/shop" variant="outline">
            Explore Products
          </GlowButton>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
