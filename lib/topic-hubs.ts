export interface TopicHub {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  answer: string;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export const topicHubs: TopicHub[] = [
  {
    slug: "business-laser-engraving-st-louis",
    title: "Custom Laser Engraving For Businesses In St. Louis",
    eyebrow: "B2B laser engraving",
    description:
      "A buyer-ready guide to business laser engraving for corporate gifts, awards, branded merchandise, asset tags, and event products in St. Louis.",
    answer:
      "St. Louis Creations provides custom laser engraving for businesses that need permanent branding, recognition pieces, fundraiser products, event merchandise, and practical marked assets. Laser engraving is a strong fit when a company needs crisp logos, names, serial numbers, QR codes, sponsor marks, or personalization on materials such as wood, acrylic, metal, glass, leather, slate, and select coated products. The right production path depends on the item, quantity, artwork quality, deadline, and whether the project needs a proof before production. Business buyers should prepare a logo or vector file, preferred product or material, estimated quantity, deadline, and any personalization data before requesting a quote.",
    sections: [
      {
        title: "Best business uses",
        body:
          "Laser engraving works well when the mark needs to feel permanent, precise, and integrated with the product instead of printed on top of it.",
        bullets: [
          "Corporate gifts, client gifts, and branded drinkware",
          "Awards, plaques, trophies, and employee recognition items",
          "Sponsor gifts, donor appreciation pieces, and event merchandise",
          "Serial numbers, QR codes, asset tags, labels, and tool marking",
          "School, team, nonprofit, tournament, and fundraiser products",
        ],
      },
      {
        title: "Material and artwork planning",
        body:
          "Material choice changes the look, durability, contrast, and cost of an engraved project. Clean vector artwork usually produces the best logo result, while photos and raster artwork may need extra prep before they are production-ready.",
        bullets: [
          "Wood and slate give warm, natural contrast for gifts and recognition.",
          "Acrylic and glass work well for awards, signage, and display pieces.",
          "Metal marking depends on the metal type, coating, finish, and desired contrast.",
          "Leather and fabric require careful testing because heat changes the surface.",
        ],
      },
      {
        title: "Quote readiness",
        body:
          "The fastest business engraving quotes include the product or material, quantity, logo or artwork, personalization fields, deadline, delivery needs, and whether a proof is required. Bulk pricing depends on setup, handling time, engraving time, material cost, and whether each item has unique text.",
      },
    ],
    faqs: [
      {
        q: "What file format is best for business laser engraving?",
        a: "Vector files such as AI, EPS, SVG, or PDF are usually best for logos and clean line art. High-resolution PNG or JPG files may work for photos or simple artwork, but they often need review before production.",
      },
      {
        q: "Is laser engraving better than printing for corporate gifts?",
        a: "Laser engraving is usually better when permanence, texture, and premium feel matter. Printing may be better for full-color graphics, soft goods, or designs that require exact color matching.",
      },
      {
        q: "Can laser engraving be used for QR codes or asset tags?",
        a: "Yes, laser engraving can mark QR codes, serial numbers, asset IDs, and labels on suitable materials. The item size, contrast, code density, and scanning distance should be checked before production.",
      },
    ],
    links: [
      { label: "Laser engraving services", href: "/services#engraving" },
      { label: "Materials guide", href: "/materials" },
      { label: "Corporate product catalogs", href: "/catalogs" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    slug: "business-3d-printing-st-louis",
    title: "3D Printing Services For Businesses In St. Louis",
    eyebrow: "B2B additive manufacturing",
    description:
      "A practical guide for St. Louis companies evaluating 3D printed prototypes, fixtures, custom parts, mockups, and short-run production.",
    answer:
      "St. Louis Creations provides 3D printing services for businesses that need prototypes, product mockups, jigs, fixtures, brackets, holders, replacement parts, display pieces, and short-run production components. 3D printing is useful when speed, customization, geometry, or low quantity matters more than high-volume unit cost. It is not automatically the best choice for every part: tolerances, strength, temperature exposure, surface finish, load, material, and end-use conditions all affect whether a printed part is appropriate. A useful quote request includes an STL, STEP, OBJ, or CAD file when available, plus the part purpose, quantity, size, deadline, material expectations, and any fit or strength requirements.",
    sections: [
      {
        title: "Where business 3D printing fits",
        body:
          "Additive manufacturing is strongest when a business needs to test, demonstrate, organize, replace, or produce a physical object without committing to tooling.",
        bullets: [
          "Prototype parts before machining, molding, or full production",
          "Create jigs, fixtures, holders, brackets, guides, and shop-floor tools",
          "Produce product mockups for sales meetings, displays, and presentations",
          "Make replacement parts or discontinued components when geometry is known",
          "Run small batches where customization matters more than volume pricing",
        ],
      },
      {
        title: "Files and design details",
        body:
          "STL files are common for printing, while STEP and native CAD files are often better for reviewing dimensions or making changes. OBJ files may be useful for visual models. The more the file communicates about fit and function, the easier it is to evaluate printability.",
      },
      {
        title: "Limits to confirm before production",
        body:
          "A printed part should be reviewed against its real use. Load, heat, sunlight, chemicals, repeated flexing, food contact, and precise mechanical fit can all change the right material or production method.",
        bullets: [
          "Tolerance expectations and mating surfaces",
          "Strength direction, infill, wall thickness, and layer orientation",
          "Surface finish, color, post-processing, and visible layer lines",
          "Whether the part is a prototype, presentation model, fixture, or end-use item",
        ],
      },
    ],
    faqs: [
      {
        q: "When should a business use 3D printing instead of machining?",
        a: "Use 3D printing when the quantity is low, the design may change, the geometry is complex, or speed matters. Machining may be better for tighter tolerances, metal parts, high heat, high loads, or production materials that cannot be printed effectively.",
      },
      {
        q: "What files are needed for a 3D printing quote?",
        a: "An STL, STEP, OBJ, or CAD file is helpful. If a file is not available, provide photos, dimensions, sketches, the intended use, quantity, and any fit or strength requirements.",
      },
      {
        q: "Can 3D printing be used for finished business parts?",
        a: "Yes, in some cases. Finished printed parts can work for fixtures, holders, displays, prototypes, and low-volume parts, but material, load, tolerance, heat, and finish requirements need to be checked first.",
      },
    ],
    links: [
      { label: "3D printing services", href: "/services#printing" },
      { label: "Shop 3D printed products", href: "/shop?category=3d-prints" },
      { label: "Materials guide", href: "/materials" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    slug: "custom-awards-recognition-corporate-gifts",
    title: "Custom Awards, Recognition, And Corporate Gifts",
    eyebrow: "Recognition and gifting",
    description:
      "A planning guide for custom awards, plaques, branded drinkware, sponsor gifts, donor appreciation items, and employee recognition products.",
    answer:
      "St. Louis Creations helps organizations plan custom awards, recognition pieces, and corporate gifts that are specific enough to feel intentional and practical enough to be kept. Strong projects usually start with the occasion, recipient group, budget range, deadline, and whether each item needs a name, logo, date, sponsor mark, or unique message. Laser engraving is often a good fit for plaques, trophies, drinkware, slate, glass, wood, leatherette, and display pieces because it creates a durable mark without relying on stickers or temporary decoration. For larger events, buyers should allow time for product selection, artwork review, proof approval, production, and pickup or shipping.",
    sections: [
      {
        title: "Recognition programs",
        body:
          "Awards and recognition projects are strongest when the item matches the moment. A sales award, volunteer thank-you, coach gift, donor recognition piece, and sponsor gift do not need the same material or layout.",
        bullets: [
          "Employee awards, years-of-service gifts, and milestone plaques",
          "Tournament trophies, team awards, school banquets, and coach gifts",
          "Donor, sponsor, volunteer, and board appreciation pieces",
          "Conference, event, and customer appreciation gifts",
        ],
      },
      {
        title: "Corporate gifts people keep",
        body:
          "Useful items with restrained branding tend to last longer than novelty giveaways. Engraved tumblers, bottles, mugs, desk pieces, serving boards, coasters, and leatherette goods can carry a logo while still feeling like a real gift.",
      },
      {
        title: "Planning timeline",
        body:
          "For events, start with the date and work backward. Leave time for selecting products, confirming stock, preparing artwork, approving proofs, engraving or printing, packaging, and delivery. Personalized names or variable data require extra review because spelling and formatting matter.",
      },
    ],
    faqs: [
      {
        q: "What makes a good corporate gift?",
        a: "A good corporate gift is useful, appropriately branded, durable, and matched to the recipient. Drinkware, desk accessories, serving pieces, plaques, and quality keepsakes usually perform better than disposable giveaways.",
      },
      {
        q: "How should a business prepare for an awards order?",
        a: "Prepare the event date, award categories, recipient names, logo files, quantity, preferred materials, and proof approval contact. Confirm spelling and titles before production begins.",
      },
      {
        q: "Can fundraiser or sponsor gifts be customized?",
        a: "Yes. Fundraiser and sponsor gifts can often include logos, names, dates, team marks, donor levels, or campaign artwork, depending on the product and material.",
      },
    ],
    links: [
      { label: "Awards and recognition products", href: "/shop?category=awards" },
      { label: "Corporate catalogs", href: "/catalogs" },
      { label: "Fundraiser products", href: "/fundraisers" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
];

export function getTopicHubBySlug(slug: string): TopicHub | undefined {
  return topicHubs.find((hub) => hub.slug === slug);
}
