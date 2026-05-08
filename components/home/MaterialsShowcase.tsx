"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import { materials } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import MaterialVisual from "./MaterialVisual";

// Each material gets 60vh of scroll distance. Keeps the scroll-driven reveal
// feeling deliberate without feeling like the page is "stuck".
const SCROLL_PER_MATERIAL = 60;

export default function MaterialsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (isMobile || prefersReducedMotion) return;
    const index = Math.min(
      Math.floor(progress * materials.length),
      materials.length - 1
    );
    setActiveIndex(index);
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll to a specific material by calculating its position within the section
  const scrollToMaterial = useCallback((index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / materials.length;
    const targetScroll = sectionTop + sectionHeight * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  // Skip past the entire section
  const skipSection = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionBottom = window.scrollY + rect.bottom;
    window.scrollTo({ top: sectionBottom, behavior: "smooth" });
  }, []);

  // Mobile: simple grid
  if (isMobile) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Material Intelligence</SectionLabel>
            <h2 className="font-display text-3xl font-bold mt-4">
              Designed for the Right Surface
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {materials.map((mat) => (
              <div
                key={mat.name}
                className="bg-surface border border-white/5 overflow-hidden"
              >
                <div className="relative aspect-[16/10]">
                  <MaterialVisual material={mat.name} />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-primary mb-2">
                    {mat.name}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-3">
                    {mat.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {mat.uses.map((use) => (
                      <span
                        key={use}
                        className="text-[10px] px-2 py-0.5 bg-white/5 text-muted rounded-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const isLast = activeIndex === materials.length - 1;
  const isFirst = activeIndex === 0;

  // Desktop: scroll-driven sticky reveal
  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ minHeight: `${materials.length * SCROLL_PER_MATERIAL + 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel>Materials We Work With</SectionLabel>
              <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-[1.05]">
                Designed for the Right Surface.
              </h2>
            </div>
            <button
              onClick={skipSection}
              className="hidden lg:flex items-center gap-2 text-muted hover:text-primary transition-colors text-xs font-display uppercase tracking-wider"
              aria-label="Skip materials section"
            >
              Skip Section
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: Material Visual */}
            <div className="relative aspect-square bg-surface border border-white/5 overflow-hidden">
              {materials.map((mat, i) => (
                <motion.div
                  key={mat.name}
                  className="absolute inset-0"
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <MaterialVisual material={mat.name} />
                </motion.div>
              ))}

              {/* Counter badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/10 font-display text-xs uppercase tracking-wider text-primary">
                {String(activeIndex + 1).padStart(2, "0")} / {String(materials.length).padStart(2, "0")}
              </div>
            </div>

            {/* Right: Material Info */}
            <div className="relative h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={materials[activeIndex].name}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p className="text-primary text-sm font-display uppercase tracking-wider mb-2">
                    Material
                  </p>
                  <h3 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    {materials[activeIndex].name}
                  </h3>
                  <p className="text-muted text-base leading-relaxed mb-6">
                    {materials[activeIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {materials[activeIndex].uses.map((use) => (
                      <span
                        key={use}
                        className="text-xs px-3 py-1.5 bg-white/5 text-text border border-white/10"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation + progress */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between">
                {/* Prev/Next arrows */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollToMaterial(Math.max(0, activeIndex - 1))}
                    disabled={isFirst}
                    className="w-10 h-10 flex items-center justify-center border border-white/10 text-muted hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted disabled:hover:border-white/10"
                    aria-label="Previous material"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollToMaterial(Math.min(materials.length - 1, activeIndex + 1))}
                    disabled={isLast}
                    className="w-10 h-10 flex items-center justify-center border border-white/10 text-muted hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted disabled:hover:border-white/10"
                    aria-label="Next material"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Clickable progress dots */}
                <div className="flex gap-2">
                  {materials.map((mat, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToMaterial(i)}
                      className="group relative py-3"
                      aria-label={`Go to ${mat.name}`}
                    >
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activeIndex === i
                            ? "w-10 bg-primary"
                            : "w-2 bg-white/20 group-hover:bg-white/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint at bottom of viewport */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            animate={{ opacity: isLast ? 0 : 0.6, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.3 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <span className="text-muted text-[10px] font-display uppercase tracking-[0.25em]">
              Scroll to explore
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
