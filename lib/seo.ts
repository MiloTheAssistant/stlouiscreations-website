import type { Metadata } from "next";
import {
  businessFacts,
  contactLinks,
  productCategories,
  services,
  siteConfig,
  socialLinks,
} from "@/lib/constants";
import type { Product } from "@/lib/products";

export const canonicalHost = siteConfig.url;

const defaultImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "St. Louis Creations digital fabrication studio",
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${canonicalHost}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
  images,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: NonNullable<Metadata["openGraph"]>["images"];
}): Metadata {
  const canonical = absoluteUrl(path);
  const openGraphImages = images ?? [defaultImage];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage.url],
    },
  };
}

const organizationId = `${canonicalHost}/#organization`;
const websiteId = `${canonicalHost}/#website`;

export function getSiteJsonLd() {
  const sameAs = [socialLinks.facebook, socialLinks.instagram].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": organizationId,
        name: siteConfig.name,
        alternateName: "STL Laser Creations",
        url: canonicalHost,
        logo: absoluteUrl("/brand/logo.png"),
        image: absoluteUrl("/og-image.png"),
        description: siteConfig.description,
        email: contactLinks.email,
        telephone: businessFacts.phone.schema,
        priceRange: "$$",
        sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: businessFacts.location.locality,
          addressRegion: businessFacts.location.region,
          addressCountry: businessFacts.location.country,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: businessFacts.hours.weekdays,
            opens: businessFacts.hours.opens,
            closes: businessFacts.hours.closes,
          },
        ],
        areaServed: [
          {
            "@type": "City",
            name: businessFacts.location.locality,
          },
          {
            "@type": "State",
            name: "Missouri",
          },
        ],
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: absoluteUrl(service.href),
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: canonicalHost,
        description: siteConfig.description,
        publisher: {
          "@id": organizationId,
        },
        inLanguage: "en-US",
      },
    ],
  };
}

export function getServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      "@id": `${absoluteUrl(service.href)}#service`,
      name: service.title,
      description: service.description,
      url: absoluteUrl(service.href),
      provider: {
        "@id": organizationId,
      },
      areaServed: {
        "@type": "Place",
        name: "St. Louis, MO",
      },
      serviceType: service.title,
    })),
  };
}

export function getProductCategoryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": productCategories.map((category) => ({
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(category.href)}#collection`,
      name: category.title,
      description: category.description,
      url: absoluteUrl(category.href),
      image: absoluteUrl(category.image),
      isPartOf: {
        "@id": websiteId,
      },
      publisher: {
        "@id": organizationId,
      },
    })),
  };
}

export function getProductJsonLd(product: Product) {
  const image = product.images[0]?.startsWith("http")
    ? product.images[0]
    : absoluteUrl(product.images[0] ?? "/og-image.png");
  const hasPublicPrice = product.price > 0 && product.purchaseMode !== "quote";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/shop/${product.slug}`)}#product`,
    name: product.name,
    description: product.description,
    image,
    sku: product.supplierSku ?? product.slug,
    brand: {
      "@id": organizationId,
    },
    category: product.category,
    offers: hasPublicPrice
      ? {
          "@type": "Offer",
          url: absoluteUrl(`/shop/${product.slug}`),
          priceCurrency: "USD",
          price: (product.price / 100).toFixed(2),
          availability: "https://schema.org/InStock",
          seller: {
            "@id": organizationId,
          },
        }
      : undefined,
  };
}

export function getFaqJsonLd(
  faqs: Array<{
    q: string;
    a: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function getArticleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    url: absoluteUrl(path),
    image: absoluteUrl("/og-image.png"),
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}
