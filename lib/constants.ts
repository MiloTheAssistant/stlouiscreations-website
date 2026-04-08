export const siteConfig = {
  name: "St. Louis Creations",
  description:
    "Custom laser engraving, cutting & 3D printing for businesses that demand precision at scale.",
  url: "https://stlouiscreations.com",
  tagline: "Engrave Your Imagination",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    title: "Laser Engraving",
    description:
      "Precision engraving on virtually any surface — from tumblers to trophies.",
    icon: "engraving",
    href: "/services#engraving",
  },
  {
    title: "Laser Cutting",
    description:
      "Clean, accurate cuts for custom shapes, signage, and intricate designs.",
    icon: "cutting",
    href: "/services#cutting",
  },
  {
    title: "3D Printing",
    description:
      "Rapid prototyping and custom parts with professional-grade 3D printing.",
    icon: "printing",
    href: "/services#printing",
  },
];

export const materials = [
  {
    name: "Acrylic",
    description: "Crystal-clear or colored acrylic for awards, signage, and displays.",
    uses: ["Awards", "Signage", "Displays", "Keychains"],
    image: "/images/materials/acrylic.jpg",
  },
  {
    name: "Wood",
    description: "Natural wood engraving for a warm, rustic, handcrafted aesthetic.",
    uses: ["Cutting Boards", "Signs", "Coasters", "Plaques"],
    image: "/images/materials/wood.jpg",
  },
  {
    name: "Glass",
    description: "Elegant glass etching for corporate gifts and premium awards.",
    uses: ["Wine Glasses", "Awards", "Vases", "Decanters"],
    image: "/images/materials/glass.jpg",
  },
  {
    name: "Metal",
    description: "Durable metal engraving for industrial marking and luxury items.",
    uses: ["Name Plates", "Dog Tags", "Business Cards", "Tools"],
    image: "/images/materials/metal.jpg",
  },
  {
    name: "Leather",
    description: "Premium leather personalization for wallets, belts, and journals.",
    uses: ["Wallets", "Journals", "Belts", "Portfolios"],
    image: "/images/materials/leather.jpg",
  },
  {
    name: "Stone",
    description: "Permanent stone engraving for memorials, tiles, and outdoor markers.",
    uses: ["Memorials", "Tiles", "Coasters", "Garden Markers"],
    image: "/images/materials/stone.jpg",
  },
  {
    name: "Fabric",
    description: "Intricate fabric cutting and marking for textiles and apparel.",
    uses: ["Patches", "Labels", "Patterns", "Custom Apparel"],
    image: "/images/materials/fabric.jpg",
  },
  {
    name: "Rubber",
    description: "Custom rubber stamps and gaskets with precision laser cutting.",
    uses: ["Stamps", "Gaskets", "Seals", "Mats"],
    image: "/images/materials/rubber.jpg",
  },
];

export const productCategories = [
  {
    title: "Tumblers & Drinkware",
    description: "Custom engraved tumblers, mugs, and water bottles for every occasion.",
    image: "/images/products/tumblers.jpg",
    href: "/shop?category=drinkware",
  },
  {
    title: "Wood & Slate",
    description: "Handcrafted wood and slate products with precision laser engraving.",
    image: "/images/products/wood-slate.jpg",
    href: "/shop?category=wood-slate",
  },
  {
    title: "Sports Awards",
    description: "Trophies, plaques, and medals for teams, leagues, and tournaments.",
    image: "/images/products/sports-awards.jpg",
    href: "/shop?category=awards",
  },
  {
    title: "Corporate Gifts",
    description: "Branded merchandise and executive gifts that make an impression.",
    image: "/images/products/corporate-gifts.jpg",
    href: "/shop?category=corporate",
  },
  {
    title: "Fundraiser Items",
    description: "Custom water bottles, accessories, and items perfect for fundraising events.",
    image: "/images/products/fundraiser.jpg",
    href: "/shop?category=fundraiser",
  },
];

export const valueProps = [
  {
    number: 10000,
    suffix: "+",
    label: "Products Delivered",
    description: "Thousands of custom orders fulfilled with precision and care.",
  },
  {
    number: 24,
    suffix: "hr",
    label: "Fast Turnaround",
    description: "Rush orders available with 24-hour turnaround on most items.",
  },
  {
    number: 8,
    suffix: "",
    label: "Material Types",
    description: "Engrave on acrylic, wood, glass, metal, leather, stone, fabric, and rubber.",
  },
  {
    number: 100,
    suffix: "%",
    label: "Custom Everything",
    description: "Every order is fully customizable — your design, your way.",
  },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/stllasercreations",
  instagram: "https://www.instagram.com/stllasercreations",
};
