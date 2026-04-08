"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8 pt-20">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-2xl font-display uppercase tracking-wider text-text hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-4 inline-flex items-center px-8 py-4 bg-primary text-white font-display text-sm uppercase tracking-wider font-bold"
              >
                Get a Quote
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
