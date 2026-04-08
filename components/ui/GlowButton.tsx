"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  external?: boolean;
}

const variants = {
  primary:
    "bg-primary text-white hover:shadow-glow",
  outline:
    "border-2 border-text/20 text-text hover:border-primary hover:text-primary",
  ghost:
    "text-text hover:text-primary",
};

export default function GlowButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: GlowButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center px-8 py-4 font-display font-bold text-sm tracking-wider uppercase transition-all duration-300",
    variants[variant],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a className={classes} {...motionProps}>
        {children}
      </motion.a>
    </Link>
  );
}
