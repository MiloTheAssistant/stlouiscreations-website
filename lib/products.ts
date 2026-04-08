export interface Product {
  slug: string;
  name: string;
  price: number; // cents
  stripePriceId: string;
  images: string[];
  description: string;
  details: string[];
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "custom-engraved-tumbler-20oz",
    name: "Custom Engraved Tumbler - 20oz",
    price: 2499,
    stripePriceId: "price_tumbler_20oz",
    images: ["/images/shop/tumbler-20oz.jpg"],
    description:
      "Premium 20oz stainless steel tumbler with custom laser engraving. Perfect for corporate gifts, team events, and branded merchandise.",
    details: [
      "20oz double-wall vacuum insulated",
      "Stainless steel construction",
      "Custom laser engraving included",
      "Keeps drinks cold 24hrs / hot 12hrs",
      "BPA-free slide lid included",
    ],
    category: "drinkware",
    featured: true,
  },
  {
    slug: "custom-engraved-tumbler-30oz",
    name: "Custom Engraved Tumbler - 30oz",
    price: 2999,
    stripePriceId: "price_tumbler_30oz",
    images: ["/images/shop/tumbler-30oz.jpg"],
    description:
      "Large 30oz stainless steel tumbler with precision laser engraving. Ideal for bulk orders and corporate gifting programs.",
    details: [
      "30oz double-wall vacuum insulated",
      "Stainless steel construction",
      "Custom laser engraving included",
      "Keeps drinks cold 24hrs / hot 12hrs",
      "BPA-free slide lid included",
    ],
    category: "drinkware",
    featured: true,
  },
  {
    slug: "engraved-cutting-board",
    name: "Engraved Bamboo Cutting Board",
    price: 3499,
    stripePriceId: "price_cutting_board",
    images: ["/images/shop/cutting-board.jpg"],
    description:
      "Beautiful bamboo cutting board with custom laser engraving. A perfect wedding gift, housewarming present, or corporate award.",
    details: [
      "Premium bamboo construction",
      "13.5\" x 11.5\" cutting surface",
      "Juice groove around edge",
      "Custom engraving on front face",
      "Food-safe finish",
    ],
    category: "wood-slate",
    featured: true,
  },
  {
    slug: "slate-coaster-set",
    name: "Custom Slate Coaster Set (4pc)",
    price: 2799,
    stripePriceId: "price_slate_coasters",
    images: ["/images/shop/slate-coasters.jpg"],
    description:
      "Set of 4 natural slate coasters with custom laser engraving. Great for restaurants, bars, and personalized home decor.",
    details: [
      "Natural slate material",
      "Set of 4 coasters",
      "4\" x 4\" each with foam backing",
      "Custom engraving on each coaster",
      "Gift-ready packaging",
    ],
    category: "wood-slate",
  },
  {
    slug: "crystal-award-tower",
    name: "Crystal Tower Award",
    price: 4999,
    stripePriceId: "price_crystal_tower",
    images: ["/images/shop/crystal-tower.jpg"],
    description:
      "Elegant crystal tower award with 3D laser engraving. Perfect for sports tournaments, corporate recognition, and achievement awards.",
    details: [
      "Premium optical crystal",
      '8" tall tower design',
      "3D sub-surface laser engraving",
      "Velvet-lined presentation box",
      "Custom text and logo support",
    ],
    category: "awards",
    featured: true,
  },
  {
    slug: "acrylic-plaque",
    name: "Custom Acrylic Plaque",
    price: 3299,
    stripePriceId: "price_acrylic_plaque",
    images: ["/images/shop/acrylic-plaque.jpg"],
    description:
      "Modern acrylic plaque with precision laser engraving. Ideal for employee recognition, sports awards, and milestone celebrations.",
    details: [
      "Clear acrylic construction",
      '8" x 10" standard size',
      "Laser engraved text and graphics",
      "Polished edges",
      "Desktop stand included",
    ],
    category: "awards",
  },
  {
    slug: "leather-journal",
    name: "Engraved Leather Journal",
    price: 2999,
    stripePriceId: "price_leather_journal",
    images: ["/images/shop/leather-journal.jpg"],
    description:
      "Premium leather journal with custom laser engraving on the cover. Perfect for executive gifts and corporate branding.",
    details: [
      "Genuine leather cover",
      '5" x 7" journal size',
      "200 lined pages",
      "Custom cover engraving",
      "Ribbon bookmark included",
    ],
    category: "corporate",
  },
  {
    slug: "custom-water-bottle",
    name: "Custom Water Bottle - Fundraiser",
    price: 1499,
    stripePriceId: "price_water_bottle",
    images: ["/images/shop/water-bottle.jpg"],
    description:
      "Affordable custom water bottles perfect for school fundraisers, team sports, and charity events. Bulk pricing available.",
    details: [
      "24oz BPA-free construction",
      "Custom laser engraving",
      "Leak-proof flip-top lid",
      "Available in multiple colors",
      "Bulk pricing for 50+ units",
    ],
    category: "fundraiser",
    featured: true,
  },
];

export const categories = [
  { slug: "all", label: "All Products" },
  { slug: "drinkware", label: "Drinkware" },
  { slug: "wood-slate", label: "Wood & Slate" },
  { slug: "awards", label: "Awards" },
  { slug: "corporate", label: "Corporate" },
  { slug: "fundraiser", label: "Fundraiser" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
