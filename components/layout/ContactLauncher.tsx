"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { contactLinks, socialLinks } from "@/lib/constants";

const quickActions = [
  {
    label: "Message us on Facebook",
    description: "Fastest for quick questions",
    href: socialLinks.messenger,
    external: true,
    icon: (
      <path d="M12 2.5c-5.25 0-9.5 3.94-9.5 8.8 0 2.77 1.39 5.23 3.56 6.84v3.1l3.25-1.8c.86.24 1.77.36 2.69.36 5.25 0 9.5-3.94 9.5-8.8S17.25 2.5 12 2.5Zm.95 11.72-2.34-2.5-4.61 2.5 5.08-5.39 2.4 2.5 4.55-2.5-5.08 5.39Z" />
    ),
  },
  {
    label: "Fabrication quote",
    description: "Bulk, custom, or deadline-sensitive orders",
    href: contactLinks.quote,
    external: false,
    icon: (
      <path
        fillRule="evenodd"
        d="M5 4.75A2.75 2.75 0 0 1 7.75 2h8.5A2.75 2.75 0 0 1 19 4.75v14.5A2.75 2.75 0 0 1 16.25 22h-8.5A2.75 2.75 0 0 1 5 19.25V4.75ZM8 7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 5a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H9Z"
        clipRule="evenodd"
      />
    ),
  },
  {
    label: "Track an order",
    description: "Send your order number or name",
    href: contactLinks.orderSupport,
    external: true,
    icon: (
      <path
        fillRule="evenodd"
        d="M4 5a3 3 0 0 1 3-3h6.25a3 3 0 0 1 2.12.88l2.75 2.75A3 3 0 0 1 19 7.75V19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5Zm9-1v3a1 1 0 0 0 1 1h3v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6Zm-4 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H9Z"
        clipRule="evenodd"
      />
    ),
  },
  {
    label: "Email us",
    description: contactLinks.email,
    href: `mailto:${contactLinks.email}`,
    external: true,
    icon: (
      <path
        fillRule="evenodd"
        d="M3.75 5A2.75 2.75 0 0 1 6.5 2.25h11A2.75 2.75 0 0 1 20.25 5v14A2.75 2.75 0 0 1 17.5 21.75h-11A2.75 2.75 0 0 1 3.75 19V5Zm2.14 1.16a1 1 0 0 1 1.41-.02L12 10.72l4.7-4.58a1 1 0 1 1 1.4 1.43l-5.4 5.26a1 1 0 0 1-1.4 0L5.9 7.57a1 1 0 0 1-.02-1.41Z"
        clipRule="evenodd"
      />
    ),
  },
];

export default function ContactLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden border border-white/10 bg-surface shadow-2xl shadow-black/40"
            aria-label="Contact options"
          >
            <div className="bg-primary px-5 py-4 text-white">
              <p className="font-display text-lg font-bold">Start a project</p>
              <p className="mt-1 text-sm text-white/90">
                Message us or send a fabrication quote request.
              </p>
            </div>

            <div className="space-y-2 p-3">
              {quickActions.map((action) =>
                action.external ? (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      action.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex min-h-16 items-center gap-3 border border-white/10 bg-background px-4 py-3 text-left transition-colors hover:border-primary/60 hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-primary/70"
                  >
                    <ActionIcon>{action.icon}</ActionIcon>
                    <ActionText
                      label={action.label}
                      description={action.description}
                    />
                  </a>
                ) : (
                  <Link
                    key={action.label}
                    href={action.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-16 items-center gap-3 border border-white/10 bg-background px-4 py-3 text-left transition-colors hover:border-primary/60 hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-primary/70"
                  >
                    <ActionIcon>{action.icon}</ActionIcon>
                    <ActionText
                      label={action.label}
                      description={action.description}
                    />
                  </Link>
                )
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-glow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
      >
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {open ? (
            <path
              fillRule="evenodd"
              d="M6.23 4.81a1 1 0 0 0-1.42 1.42L10.59 12l-5.78 5.77a1 1 0 1 0 1.42 1.42L12 13.41l5.77 5.78a1 1 0 0 0 1.42-1.42L13.41 12l5.78-5.77a1 1 0 0 0-1.42-1.42L12 10.59 6.23 4.81Z"
              clipRule="evenodd"
            />
          ) : (
            <path d="M4.5 5.75A3.25 3.25 0 0 1 7.75 2.5h8.5a3.25 3.25 0 0 1 3.25 3.25v6.5a3.25 3.25 0 0 1-3.25 3.25h-3.68l-4.5 3.88A1 1 0 0 1 6.43 18v-2.55A3.25 3.25 0 0 1 4.5 12.5V5.75Z" />
          )}
        </svg>
      </button>
    </div>
  );
}

function ActionIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </span>
  );
}

function ActionText({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <span className="min-w-0">
      <span className="block font-display text-sm font-bold uppercase tracking-wider text-text">
        {label}
      </span>
      <span className="mt-1 block break-words text-sm text-muted">
        {description}
      </span>
    </span>
  );
}
