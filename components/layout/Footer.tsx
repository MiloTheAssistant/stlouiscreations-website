import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/constants";

export default function Footer() {
  const policyLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Return and Refund Policy", href: "/refund-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Contact Us", href: "/contact" },
  ];

  const brandLinks = [
    { label: "Amazon Store", href: "https://www.amazon.com" },
    { label: "eBay Store", href: "https://www.ebay.com" },
    { label: "JDS Direct, LLC", href: "https://stllasercreations.com" },
  ];

  return (
    <footer className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block">
              <h3 className="font-display text-2xl font-bold text-text tracking-tight leading-none">
                St. Louis<span className="text-primary">.</span> Creations
              </h3>
              <p className="font-body italic text-sm text-muted mt-2 tracking-wide">
                {siteConfig.tagline}
              </p>
              <p className="font-display text-[11px] uppercase tracking-[0.22em] text-primary mt-2">
                {siteConfig.descriptor}
              </p>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs mt-5">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-text mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-text mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-muted text-sm">
              <li>St. Louis, MO</li>
              <li>
                <a
                  href="mailto:contact@stlouiscreations.com"
                  className="hover:text-primary transition-colors"
                >
                  contact@stlouiscreations.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15735000064"
                  className="hover:text-primary transition-colors"
                >
                  (573) 500-0064
                </a>
              </li>
            </ul>
          </div>

          {/* Policies and brand links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-text mb-4">
              Customer Care
            </h4>
            <ul className="space-y-3 mb-8">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-display text-sm uppercase tracking-wider text-text mb-4">
              Our Brand Online
            </h4>
            <ul className="space-y-3">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} St. Louis Creations. All rights reserved.
          </p>
          <p className="text-muted/50 text-xs">
            Creatively engineered in St. Louis, MO
          </p>
        </div>
      </div>
    </footer>
  );
}
