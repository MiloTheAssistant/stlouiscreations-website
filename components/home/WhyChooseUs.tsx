"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { valueProps } from "@/lib/constants";
import FadeUpSection from "@/components/ui/FadeUpSection";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-primary">
      {count.toLocaleString()}
      <span className="text-secondary">{suffix}</span>
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUpSection className="text-center mb-16">
          <SectionLabel>Prototype to Production</SectionLabel>
          <AnimatedHeading
            text="A Studio Built for Physical Ideas"
            as="h2"
            className="font-display text-3xl md:text-5xl font-bold mt-4"
          />
          <p className="text-muted mt-5 max-w-2xl mx-auto leading-relaxed">
            The work is equal parts creative direction, engineering discipline,
            material selection, and production execution.
          </p>
        </FadeUpSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, i) => (
            <FadeUpSection key={prop.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <CountUp target={prop.number} suffix={prop.suffix} />
                <h3 className="font-display text-lg font-bold mt-3 mb-2">
                  {prop.label}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
