export const siteConfig = {
  name: "St. Louis Creations",
  descriptor: "Digital Fabrication Studio",
  description:
    "A St. Louis digital fabrication studio for laser engraving, 3D printing, custom awards, branded products, prototypes, and small-batch production.",
  url: "https://www.stlouiscreations.com",
  tagline: "Local Craft. Real Materials. Studio Precision.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Materials", href: "/materials" },
  { label: "Catalogs", href: "/catalogs" },
  { label: "Fundraisers", href: "/fundraisers" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    title: "Precision Laser Engraving",
    description:
      "Permanent, production-ready marks for branded products, awards, materials, and industrial details.",
    icon: "engraving",
    href: "/services#engraving",
  },
  {
    title: "Advanced Additive Manufacturing",
    description:
      "Professional 3D printing for prototypes, fixtures, parts, and small-batch creative production.",
    icon: "printing",
    href: "/services#printing",
  },
  {
    title: "Custom Design & Production",
    description:
      "From concept files to finished goods, we help turn digital ideas into physical reality.",
    icon: "cutting",
    href: "/services#production",
  },
];

export const materials = [
  {
    slug: "acrylic",
    name: "Acrylic",
    description: "Crystal-clear or colored acrylic for awards, signage, and displays.",
    uses: ["Awards", "Signage", "Displays", "Keychains"],
    image: "/images/materials/acrylic.png",
  },
  {
    slug: "wood",
    name: "Wood",
    description: "Natural wood engraving for a warm, rustic, handcrafted aesthetic.",
    uses: ["Cutting Boards", "Signs", "Coasters", "Plaques"],
    image: "/images/materials/wood.png",
  },
  {
    slug: "glass",
    name: "Glass",
    description: "Elegant glass etching for corporate gifts and premium awards.",
    uses: ["Wine Glasses", "Awards", "Vases", "Decanters"],
    image: "/images/materials/glass.png",
  },
  {
    slug: "metal",
    name: "Metal",
    description: "Durable metal engraving for industrial marking and luxury items.",
    uses: ["Name Plates", "Dog Tags", "Business Cards", "Tools"],
    image: "/images/materials/metal.png",
  },
  {
    slug: "leather",
    name: "Leather",
    description: "Premium leather personalization for wallets, belts, and journals.",
    uses: ["Wallets", "Journals", "Belts", "Portfolios"],
    image: "/images/materials/leather.png",
  },
  {
    slug: "stone-slate-tile",
    name: "Stone",
    description: "Permanent stone engraving for memorials, tiles, and outdoor markers.",
    uses: ["Memorials", "Tiles", "Coasters", "Garden Markers"],
    image: "/images/materials/stone.png",
  },
  {
    slug: "fabric",
    name: "Fabric",
    description: "Intricate fabric cutting and marking for textiles and apparel.",
    uses: ["Patches", "Labels", "Patterns", "Custom Apparel"],
    image: "/images/materials/fabric.png",
  },
  {
    slug: "rubber",
    name: "Rubber",
    description: "Custom rubber stamps and gaskets with precision laser cutting.",
    uses: ["Stamps", "Gaskets", "Seals", "Mats"],
    image: "/images/materials/rubber.png",
  },
];

export const productCategories = [
  {
    title: "Branded Drinkware",
    description: "Precision-engraved tumblers, mugs, and bottles for launches, teams, events, and client gifts.",
    image: "/images/products/polar-camel/ltm7201.png",
    href: "/shop?category=drinkware",
  },
  {
    title: "Wood, Slate & Display Pieces",
    description: "Premium materials shaped into signage, recognition pieces, home goods, and branded objects.",
    image: "/images/materials/wood.png",
    href: "/shop?category=wood-slate",
  },
  {
    title: "Awards & Recognition",
    description: "Plaques, trophies, and recognition systems produced with consistent detail and polish.",
    image: "/images/products/airflyte/p5473.png",
    href: "/shop?category=awards",
  },
  {
    title: "Corporate Gifts",
    description: "Executive gifts and branded merchandise engineered to feel intentional, durable, and refined.",
    image: "/images/materials/metal.png",
    href: "/shop?category=corporate",
  },
  {
    title: "Fundraiser Products",
    description: "Useful, customizable products for schools, teams, nonprofits, and community campaigns.",
    image: "/images/products/polar-camel/ltm7253.png",
    href: "/shop?category=fundraiser",
  },
];

export const valueProps = [
  {
    number: 3,
    suffix: "",
    label: "Fabrication Modes",
    description: "Laser engraving, additive manufacturing, and custom production under one studio workflow.",
  },
  {
    number: 8,
    suffix: "",
    label: "Material Families",
    description: "Acrylic, wood, glass, metal, leather, stone, fabric, and rubber for creative builds.",
  },
  {
    number: 24,
    suffix: "hr",
    label: "Quote Response",
    description: "Clear next steps for viable projects, materials, quantities, and deadlines.",
  },
  {
    number: 100,
    suffix: "%",
    label: "Custom Direction",
    description: "Every engagement starts with the intended form, finish, use case, and production goal.",
  },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/stllasercreations",
  messenger: "https://m.me/stllasercreations",
  instagram: "https://www.instagram.com/stllasercreations",
};

export const contactLinks = {
  email: "contact@stlouiscreations.com",
  quote: "/contact",
  orderSupport:
    "mailto:contact@stlouiscreations.com?subject=Order%20Status%20Request",
};

export const businessFacts = {
  location: {
    label: "St. Louis, MO",
    locality: "St. Louis",
    region: "MO",
    country: "US",
  },
  phone: {
    display: "(314) 350-0006",
    href: "tel:+13143500006",
    schema: "+1-314-350-0006",
  },
  hours: {
    weekdayLabel: "Monday - Friday: 8am - 5pm CT",
    weekendLabel: "Saturday - Sunday: Closed",
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  responseTime:
    "We respond to fabrication and quote inquiries within 24 hours during business days.",
} as const;
