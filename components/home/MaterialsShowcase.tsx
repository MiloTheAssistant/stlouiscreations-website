"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { materials } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

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

  // Mobile: simple grid
  if (isMobile) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Materials We Work With</SectionLabel>
            <h2 className="font-display text-3xl font-bold mt-4">
              Any Surface. Every Detail.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {materials.map((mat) => (
              <div
                key={mat.name}
                className="bg-surface border border-white/5 p-6"
              >
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
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: scroll-driven sticky reveal
  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ minHeight: `${materials.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="mb-12">
            <SectionLabel>Materials We Work With</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
              Any Surface. Every Detail.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: Material Visual */}
            <div className="relative aspect-square bg-surface border border-white/5 overflow-hidden">
              {materials.map((mat, i) => (
                <motion.div
                  key={mat.name}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="text-center p-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display text-3xl font-bold text-primary">
                        {mat.name[0]}
                      </span>
                    </div>
                    <p className="text-muted text-sm">
                      Material Preview
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Material Info */}
            <div className="relative h-[300px]">
              {materials.map((mat, i) => (
                <motion.div
                  key={mat.name}
                  className="absolute inset-0"
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 30,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p className="text-primary text-sm font-display uppercase tracking-wider mb-2">
                    {String(i + 1).padStart(2, "0")} / {String(materials.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-4xl font-bold mb-4">
                    {mat.name}
                  </h3>
                  <p className="text-muted text-base leading-relaxed mb-6">
                    {mat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mat.uses.map((use) => (
                      <span
                        key={use}
                        className="text-xs px-3 py-1.5 bg-white/5 text-text border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-colors"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Progress dots */}
              <div className="absolute bottom-0 left-0 flex gap-2">
                {materials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-8 bg-primary"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
