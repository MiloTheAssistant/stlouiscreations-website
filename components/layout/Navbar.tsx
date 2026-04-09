"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/constants";
import { useCart } from "@/lib/cart-context";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/shop/CartDrawer";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(10,10,10,${v})`),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(255,255,255,${v})`
          ),
          backdropFilter: useTransform(bgOpacity, (v) =>
            v > 0.3 ? "blur(12px)" : "none"
          ),
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Wordmark + Tagline */}
          <Link
            href="/"
            className="flex flex-col leading-none"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="font-display text-xl md:text-2xl font-bold text-text tracking-tight">
              St. Louis<span className="text-primary">.</span> Creations
            </span>
            <span className="hidden sm:block font-body italic text-[11px] md:text-xs text-muted mt-1 tracking-wide">
              &ldquo;{siteConfig.tagline}&rdquo;
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-display uppercase tracking-wider text-muted hover:text-text transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA + Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold hover:shadow-glow transition-shadow duration-300"
            >
              Get a Quote
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-text hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-text"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
