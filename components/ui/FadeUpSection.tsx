"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeUpSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function FadeUpSection({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: FadeUpSectionProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
