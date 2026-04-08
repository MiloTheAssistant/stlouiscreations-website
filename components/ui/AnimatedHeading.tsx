"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}

export default function AnimatedHeading({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
