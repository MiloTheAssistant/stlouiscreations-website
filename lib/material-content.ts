import { materials } from "./constants";

export type Material = (typeof materials)[number];

const materialCopy: Record<string, { title: string; overview: string; capabilities: string[] }> = {
  acrylic: {
    title: "Acrylic Material",
    overview:
      "Acrylic is one of the most versatile materials for laser work. It engraves with crisp contrast and cuts cleanly for awards, signage, displays, ornaments, keychains, and branded presentation pieces.",
    capabilities: ["Clear, frosted, and colored acrylic", "Polished-edge laser cutting", "Logo and text engraving", "Dimensional signs and displays"],
  },
  wood: {
    title: "Wood Material",
    overview:
      "Wood brings warmth and natural character to personalized gifts, signage, cutting boards, plaques, and home decor. Each species engraves differently, giving custom pieces a handcrafted look.",
    capabilities: ["Cutting boards and serving boards", "Plaques and signs", "Photo and logo engraving", "Custom coasters and keepsakes"],
  },
  glass: {
    title: "Glass Material",
    overview:
      "Glass etching creates a refined, permanent frosted mark for awards, drinkware, vases, decanters, and corporate gifts. It is ideal when the finished piece needs to feel polished and premium.",
    capabilities: ["Awards and recognition pieces", "Wine glasses and drinkware", "Vases and decanters", "Corporate gift personalization"],
  },
  metal: {
    title: "Metal Material",
    overview:
      "Metal marking and engraving supports durable identification, branded gifts, name plates, tools, tags, cards, and industrial parts. Results depend on the alloy, coating, and finish.",
    capabilities: ["Name plates and tags", "Tool and part marking", "Business cards and gifts", "Serialized text and logo marking"],
  },
  rubber: {
    title: "Rubber Material",
    overview:
      "Laser-cut rubber is useful for custom stamps, seals, gaskets, mats, and repeatable production pieces. The process creates precise edges and consistent detail.",
    capabilities: ["Custom rubber stamps", "Gaskets and seals", "Industrial mats", "Repeatable cut parts"],
  },
  fabric: {
    title: "Fabric Material",
    overview:
      "Fabric can be cut, marked, and personalized for patches, labels, patterns, apparel, and event pieces. Laser processing helps reduce fraying on many synthetic textiles.",
    capabilities: ["Patches and labels", "Pattern cutting", "Custom apparel accents", "Event and team merchandise"],
  },
  leather: {
    title: "Leather Material",
    overview:
      "Leather engraves with a rich, tactile finish for wallets, journals, portfolios, patches, belts, and premium accessories. It is a strong fit for personalized and branded gifts.",
    capabilities: ["Wallets and portfolios", "Journals and notebooks", "Patches and tags", "Belts and accessories"],
  },
  "stone-slate-tile": {
    title: "Stone / Slate / Tile",
    overview:
      "Stone, slate, and tile produce permanent, high-contrast marks for coasters, memorial pieces, garden markers, decor, and durable gifts. Natural variation makes every piece unique.",
    capabilities: ["Slate coasters and serving pieces", "Memorial and garden markers", "Decorative tiles", "Outdoor-friendly engraving"],
  },
};

export function getMaterialSlug(material: Material) {
  return material.slug;
}

export function getMaterialImageSlug(material: Material) {
  return material.slug === "stone-slate-tile" ? "stone" : material.slug;
}

export function getMaterialBySlug(slug: string) {
  return materials.find((material) => material.slug === slug);
}

export function getMaterialCopy(slug: string) {
  return materialCopy[slug];
}
