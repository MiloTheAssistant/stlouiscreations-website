export interface TopicHub {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  answer: string;
  isCore?: boolean;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  proofPages?: {
    faq: {
      title: string;
      description: string;
      intro: string;
      questions: Array<{
        q: string;
        a: string;
      }>;
    };
    useCase: {
      title: string;
      description: string;
      summary: string;
      scenario: string;
      projectFit: string[];
      process: string[];
      quoteInputs: string[];
      decisionNotes: string[];
    };
  };
  links: Array<{
    label: string;
    href: string;
  }>;
}

const laserBusinessFaq = [
  {
    q: "What file format is best for business laser engraving?",
    a: "Vector files such as AI, EPS, SVG, or PDF are usually best for logos, line art, QR codes, and clean text. High-resolution PNG or JPG files may work for photos or simple artwork, but they should be reviewed before production because low-resolution files can produce soft edges or uneven marks.",
  },
  {
    q: "Is laser engraving better than printing for corporate gifts?",
    a: "Laser engraving is usually better when permanence, texture, and a premium feel matter. Printing may be better for full-color artwork, soft goods, or designs that require exact brand-color matching. The right choice depends on the item, the material, and the buyer's goal.",
  },
  {
    q: "Can laser engraving be used for QR codes or asset tags?",
    a: "Yes. Laser engraving can mark QR codes, serial numbers, asset IDs, and labels on suitable materials. Code size, contrast, material finish, and scanning distance should be tested before a large production run.",
  },
];

const business3dFaq = [
  {
    q: "When should a business use 3D printing instead of machining?",
    a: "Use 3D printing when the quantity is low, the design may change, the geometry is complex, or speed matters. Machining may be better for tight tolerances, metal parts, high heat, high loads, or production materials that cannot be printed effectively.",
  },
  {
    q: "What files are needed for a 3D printing quote?",
    a: "An STL, STEP, OBJ, or CAD file is helpful. If a file is not available, provide photos, dimensions, sketches, the intended use, quantity, and any fit or strength requirements so printability can be reviewed.",
  },
  {
    q: "Can 3D printing be used for finished business parts?",
    a: "Yes, in some cases. Finished printed parts can work for fixtures, holders, displays, prototypes, and low-volume parts, but material, load, tolerance, heat, and finish requirements need to be checked first.",
  },
];

const consumer3dFaq = [
  {
    q: "What kinds of consumer projects are good for custom 3D printing?",
    a: "Good consumer projects include replacement knobs, brackets, hobby parts, cosplay accessories, tabletop gaming items, desk organizers, custom gifts, decor, and one-off inventions where size, material, and detail expectations are realistic.",
  },
  {
    q: "Can St. Louis Creations print a file downloaded from the internet?",
    a: "Often, yes. A downloaded STL or 3MF file still needs a printability check for scale, wall thickness, orientation, supports, licensing, and whether the part is designed for the printer and material requested.",
  },
  {
    q: "Is 3D printing safe for food, heat, or mechanical loads?",
    a: "Consumer 3D printed parts need careful review before food contact, heat exposure, outdoor use, or mechanical loading. Layer lines, material choice, coatings, and cleaning limits can make a printed part unsuitable for some uses.",
  },
];

const comparisonFaq = [
  {
    q: "What is the difference between laser engraving and 3D printing?",
    a: "Laser engraving modifies the surface of an existing item by marking, etching, or cutting a material. 3D printing creates a new object layer by layer from a digital model. Engraving is usually a marking or personalization process; 3D printing is usually a part-making process.",
  },
  {
    q: "Should a business choose laser engraving or 3D printing for branded products?",
    a: "Choose laser engraving when the goal is to mark an existing item with a logo, name, date, QR code, or artwork. Choose 3D printing when the goal is to create a custom shape, prototype, fixture, model, holder, or small-batch part.",
  },
  {
    q: "Can a project use both laser engraving and 3D printing?",
    a: "Yes. A project can use 3D printing to make a custom object and laser engraving to mark a plate, tag, packaging piece, display base, or companion item. Combining methods works best when the design is planned from the start.",
  },
];

const materialsFaq = [
  {
    q: "Which materials work best for laser engraving?",
    a: "Common laser engraving materials include wood, acrylic, glass, slate, leatherette, coated metal, anodized aluminum, and selected plastics. Results vary by finish, color, coating, thickness, and the type of mark needed.",
  },
  {
    q: "Which materials work best for 3D printing?",
    a: "Common 3D printing materials include PLA for general parts and models, PETG for tougher functional parts, TPU for flexible parts, ABS or ASA for some heat and outdoor needs, and resin for high-detail models when the process is appropriate.",
  },
  {
    q: "How should buyers choose a material?",
    a: "Start with the job the item must do: appearance, durability, heat, sunlight, water, flexibility, food contact, handling, and budget. The same design can need different materials depending on whether it is a gift, display, prototype, fixture, or working part.",
  },
];

export const topicHubs: TopicHub[] = [
  {
    slug: "business-laser-engraving-st-louis",
    title: "Custom Laser Engraving For Businesses In St. Louis",
    eyebrow: "B2B laser engraving",
    description:
      "A buyer-ready guide to business laser engraving for corporate gifts, awards, branded merchandise, asset tags, and event products in St. Louis.",
    answer:
      "St. Louis Creations provides custom laser engraving for businesses that need durable branding, recognition pieces, fundraiser products, event merchandise, and marked operational assets. Laser engraving is a strong fit when a company needs crisp logos, recipient names, dates, serial numbers, QR codes, sponsor marks, or personalization on materials such as wood, acrylic, coated metal, glass, leatherette, slate, and selected product blanks. The right production path depends on the item, material, quantity, artwork quality, deadline, handling requirements, and whether the project needs a proof before production. Business buyers should prepare a logo or vector file, preferred product or material, estimated quantity, deadline, personalization data, and delivery needs before requesting a quote.",
    isCore: true,
    sections: [
      {
        title: "Best business uses",
        body:
          "Laser engraving works well when the mark should feel permanent, precise, and integrated with the product instead of temporarily applied on top of it.",
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
          "Material choice changes contrast, durability, production speed, and final appearance. Clean vector artwork usually gives the best logo result, while photos and raster artwork often need extra preparation before production.",
        bullets: [
          "Wood and slate provide natural contrast for gifts and recognition.",
          "Acrylic and glass work well for awards, signage, and display pieces.",
          "Metal marking depends on metal type, coating, finish, and desired contrast.",
          "Leatherette and fabric require careful testing because heat changes the surface.",
        ],
      },
      {
        title: "Quote readiness",
        body:
          "The fastest business engraving quotes include the product or material, quantity, logo or artwork, personalization fields, deadline, pickup or shipping needs, and proof requirements. Bulk pricing depends on setup, handling time, engraving time, material cost, and whether every item has unique text.",
      },
    ],
    faqs: laserBusinessFaq,
    proofPages: {
      faq: {
        title: "Business Laser Engraving FAQ",
        description:
          "Practical answers for companies planning engraved gifts, awards, tags, QR codes, and branded products.",
        intro:
          "This FAQ helps business buyers prepare laser engraving projects with fewer production surprises. It focuses on artwork quality, material choice, personalization data, proofs, lead time, and when engraving is the right marking method.",
        questions: [
          ...laserBusinessFaq,
          {
            q: "What information should be included in a bulk engraving quote request?",
            a: "Include the product or material, quantity, logo file, personalization spreadsheet if names vary, deadline, packaging needs, delivery or pickup preference, and whether the buyer wants a digital or physical proof before production.",
          },
          {
            q: "How does personalization affect engraving cost and timing?",
            a: "Personalization adds setup and review time because each item may need unique text, names, dates, numbers, or QR codes. A clean spreadsheet and approved naming format reduce errors and speed up production.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Engraved Recognition Kits For A Business Event",
        description:
          "How a company can plan branded awards, sponsor gifts, and personalized recognition pieces without creating production risk.",
        summary:
          "A practical business engraving project often combines a repeated brand mark with a small amount of variable information, such as recipient names, dates, award categories, or sponsor levels. The project succeeds when the buyer confirms the item, file quality, personalization data, proofing process, and delivery date before production begins.",
        scenario:
          "A St. Louis company is preparing a quarterly recognition event. The team wants engraved plaques for award recipients, branded drinkware for speakers, and a smaller sponsor gift for partner organizations. The project needs consistent branding, accurate names, and a finish that feels more permanent than a sticker or temporary imprint.",
        projectFit: [
          "Laser engraving is appropriate because the products need durable marks and a polished presentation.",
          "The project includes both repeated artwork and variable text, so proofing matters.",
          "The buyer has a fixed event date, which makes artwork approval and product availability part of the schedule.",
        ],
        process: [
          "Confirm the recipient list, award categories, and sponsor names in one final spreadsheet.",
          "Review logo files and convert or clean artwork before proofing.",
          "Choose materials that match the event tone, budget, and handling needs.",
          "Approve a proof before production, especially for names and sponsor marks.",
          "Package completed items by recipient group so event setup is straightforward.",
        ],
        quoteInputs: [
          "Award and gift quantities",
          "Logo or vector artwork",
          "Recipient names, titles, dates, and sponsor text",
          "Preferred product types and material choices",
          "Event date, pickup date, and packaging requirements",
        ],
        decisionNotes: [
          "Use engraving for permanence and perceived value.",
          "Use printing instead if the artwork requires full color or exact color matching.",
          "Build schedule around proof approval, not only production time.",
        ],
      },
    },
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
      "St. Louis Creations provides 3D printing services for businesses that need prototypes, product mockups, jigs, fixtures, brackets, holders, replacement parts, display pieces, and low-volume production components. 3D printing is useful when speed, customization, geometry, or small quantity matters more than high-volume unit cost. It is not automatically the best choice for every part: tolerance, strength, temperature exposure, surface finish, load, material, and end-use conditions all affect whether a printed part is appropriate. A useful quote request includes an STL, STEP, OBJ, or CAD file when available, plus the part purpose, quantity, size, deadline, material expectations, and any fit or strength requirements.",
    isCore: true,
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
    faqs: business3dFaq,
    proofPages: {
      faq: {
        title: "Business 3D Printing FAQ",
        description:
          "Answers for companies planning prototypes, replacement parts, jigs, fixtures, mockups, and short-run printed components.",
        intro:
          "This FAQ is for business buyers who need to know whether 3D printing fits a real job. It covers file preparation, material expectations, tolerance limits, production use, and the information needed for a responsible quote.",
        questions: [
          ...business3dFaq,
          {
            q: "What makes a business part print-ready?",
            a: "A print-ready part has clear scale, closed geometry, reasonable wall thickness, known fit requirements, and a stated use case. Functional parts also need material, load, heat, and durability expectations before printing.",
          },
          {
            q: "Can a printed prototype be turned into a production part later?",
            a: "Yes, but the production method may change. A printed prototype can validate fit, shape, and presentation before the design moves to machining, molding, fabrication, or a stronger printed material.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Replacement Fixture For A Small Business Workflow",
        description:
          "How a local business can use 3D printing to replace a low-volume fixture without waiting for tooling or a minimum production run.",
        summary:
          "Business 3D printing is most useful when a company needs a specific physical aid quickly and in low quantity. A fixture, bracket, holder, or guide can often be printed after the use case, fit points, and material expectations are reviewed.",
        scenario:
          "A small business has a workbench process that depends on a plastic alignment guide. The original guide is no longer available, but the team can provide the broken part, photos, measurements, and an explanation of how the guide is used during the workflow.",
        projectFit: [
          "The quantity is low, so tooling would not be economical.",
          "The part has a practical job but does not require metal strength.",
          "The design may need one test print before the final version.",
        ],
        process: [
          "Review the broken part, use case, and critical fit points.",
          "Model or adjust the geometry based on measurements and photos.",
          "Print a test version to check fit and handling.",
          "Revise the model if the test reveals clearance or strength issues.",
          "Print the approved quantity with the selected material and orientation.",
        ],
        quoteInputs: [
          "Photos or the original part",
          "Dimensions and important fit points",
          "Quantity needed now and likely future quantity",
          "Heat, load, chemical, and wear expectations",
          "Deadline and whether a test print is acceptable",
        ],
        decisionNotes: [
          "Use 3D printing for low quantity, fast iteration, and custom geometry.",
          "Use machining or commercial sourcing if the part needs tight tolerances, metal, or certified material performance.",
          "Treat the first print as validation when fit or strength is uncertain.",
        ],
      },
    },
    links: [
      { label: "3D printing services", href: "/services#printing" },
      { label: "Shop 3D printed products", href: "/shop?category=3d-prints" },
      { label: "Materials guide", href: "/materials" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    slug: "consumer-3d-printing-custom-gifts-repair-parts",
    title: "Consumer 3D Printing For Custom Gifts, Repair Parts, And Hobby Projects",
    eyebrow: "Consumer 3D printing",
    description:
      "A practical guide for consumers requesting custom 3D printed gifts, household parts, hobby pieces, miniatures, cosplay accessories, and one-off ideas.",
    answer:
      "Consumer 3D printing is useful when someone needs a custom object, replacement piece, hobby part, personalized gift, decor item, cosplay accessory, tabletop gaming item, or one-off idea that is not easily bought from a standard store. St. Louis Creations can review files, sketches, photos, dimensions, and project goals to determine whether a print is practical. The best consumer 3D printing requests explain what the item must do, where it will be used, how large it should be, whether appearance or strength matters more, and whether the buyer already has a printable file. Not every idea is ready to print immediately; thin walls, unsupported details, incorrect scale, copyright limits, food contact, heat, and load requirements can all change the recommendation.",
    isCore: true,
    sections: [
      {
        title: "Best consumer uses",
        body:
          "Consumer projects work best when the goal is custom shape, small quantity, personalization, or replacing something too specific to buy off the shelf.",
        bullets: [
          "Custom gifts, decor, desk accessories, and organizers",
          "Replacement knobs, covers, clips, brackets, and small household parts",
          "Cosplay accessories, prop components, and costume details",
          "Miniatures, tabletop terrain, hobby parts, and display stands",
          "Prototype ideas, inventions, and one-off creative objects",
        ],
      },
      {
        title: "What makes a consumer project realistic",
        body:
          "A realistic 3D printing request includes size, use, material expectations, finish expectations, and a willingness to adjust the design when printability requires it. The more specific the use case, the easier it is to recommend the right approach.",
      },
      {
        title: "Common consumer limits",
        body:
          "3D printing is flexible, but it is not magic. Food contact, high heat, heavy loads, exact replacement tolerances, copyrighted designs, and fragile details require extra review before accepting a project.",
      },
    ],
    faqs: consumer3dFaq,
    proofPages: {
      faq: {
        title: "Consumer 3D Printing FAQ",
        description:
          "Answers for custom gifts, household repair parts, hobby prints, cosplay pieces, and consumer 3D printing requests.",
        intro:
          "This FAQ helps consumers understand what information makes a custom 3D printing request practical. It focuses on printability, files, materials, size, safety limits, and realistic expectations for one-off objects.",
        questions: [
          ...consumer3dFaq,
          {
            q: "What if I only have a photo or sketch?",
            a: "A photo or sketch can start the conversation, especially for simple shapes, but it may require design work before printing. Include dimensions, use case, and any part that the object must fit against.",
          },
          {
            q: "Can 3D printed items be painted or finished?",
            a: "Many printed items can be sanded, primed, painted, or assembled after printing. Finish quality depends on material, layer height, geometry, time, and the level of post-processing requested.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Turning A Household Repair Idea Into A Printed Part",
        description:
          "How a consumer can prepare a practical 3D printing request for a replacement clip, bracket, knob, or small repair part.",
        summary:
          "A consumer repair print works best when the broken part is available for reference, the dimensions are known, and the buyer explains how the part will be handled. The goal is to determine whether a printed part is suitable before spending time on modeling or production.",
        scenario:
          "A homeowner has a broken plastic clip from a storage organizer. The part is not sold separately. The buyer can provide the broken clip, photos of where it attaches, rough dimensions, and the amount of stress the clip receives during normal use.",
        projectFit: [
          "The part is small, specific, and not readily available as a replacement.",
          "The geometry can be measured from the broken part or the mating surface.",
          "The use case is low-risk and does not involve heat, food contact, or safety-critical load.",
        ],
        process: [
          "Review the broken part and how it connects to the larger object.",
          "Confirm dimensions, stress points, and clearance needs.",
          "Create or adjust a printable model.",
          "Print a test part if fit is uncertain.",
          "Revise and print the final version if the test fit works.",
        ],
        quoteInputs: [
          "Photos of the broken part and the area where it fits",
          "Approximate dimensions or the original part",
          "A note about whether the part flexes, snaps, screws in, or carries weight",
          "Color preference and appearance expectations",
          "Whether one part or multiple spares are needed",
        ],
        decisionNotes: [
          "Use 3D printing for low-risk replacement parts with clear geometry.",
          "Avoid printing parts for safety-critical, high-heat, or high-load uses without deeper review.",
          "Expect one fit adjustment when the original part is worn or broken.",
        ],
      },
    },
    links: [
      { label: "3D printing services", href: "/services#printing" },
      { label: "3D printed products", href: "/shop?category=3d-prints" },
      { label: "Materials guide", href: "/materials" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    slug: "laser-engraving-vs-3d-printing",
    title: "Laser Engraving vs 3D Printing",
    eyebrow: "Process comparison",
    description:
      "A clear comparison for buyers deciding whether a project needs surface marking, personalization, cutting, prototyping, custom parts, or small-batch production.",
    answer:
      "Laser engraving and 3D printing solve different production problems. Laser engraving marks, etches, or cuts an existing material, making it useful for logos, names, QR codes, serial numbers, awards, signs, drinkware, and branded gifts. 3D printing creates a new object from a digital model, making it useful for prototypes, replacement parts, fixtures, models, hobby items, custom shapes, and low-volume components. Buyers should choose laser engraving when the product already exists and needs a durable mark or personalization. Buyers should choose 3D printing when the desired object does not exist yet, needs a custom shape, or must be tested before another production method. Some projects use both methods when a printed part also needs a marked tag, display base, package insert, or companion product.",
    isCore: true,
    sections: [
      {
        title: "Choose laser engraving when",
        body:
          "Engraving is the better fit when the project starts with a material or product blank and the goal is marking, personalization, contrast, or cutting.",
        bullets: [
          "You already have a product, blank, award, tag, or material.",
          "The project needs a logo, name, date, QR code, serial number, or message.",
          "The mark should be durable and integrated with the surface.",
          "The item is a gift, award, sign, label, or branded product.",
        ],
      },
      {
        title: "Choose 3D printing when",
        body:
          "3D printing is the better fit when the project needs a physical object made from a digital model rather than a mark on an existing object.",
        bullets: [
          "The part, model, holder, fixture, or prototype does not exist yet.",
          "The quantity is low or the design may change.",
          "Custom geometry matters more than high-volume unit cost.",
          "A prototype or fit test is needed before final production.",
        ],
      },
      {
        title: "When to combine both",
        body:
          "A combined project can use 3D printing for a custom object and laser engraving for a marked plate, wood base, product tag, instruction insert, display sign, or branded companion item.",
      },
    ],
    faqs: comparisonFaq,
    proofPages: {
      faq: {
        title: "Laser Engraving vs 3D Printing FAQ",
        description:
          "Straight answers for buyers deciding between marking an existing item and creating a custom object.",
        intro:
          "This FAQ helps buyers choose the right production path before requesting a quote. It separates marking, cutting, personalization, prototyping, replacement parts, and custom objects into plain-language decisions.",
        questions: [
          ...comparisonFaq,
          {
            q: "Which process is better for a prototype?",
            a: "3D printing is usually better for physical prototypes because it creates a new object from a digital model. Laser engraving can support prototypes when the need is labeling, branding, panels, tags, or display pieces.",
          },
          {
            q: "Which process is better for a corporate gift?",
            a: "Laser engraving is usually better for corporate gifts because the product already exists and needs a durable logo, name, or message. 3D printing can support gifts when the item itself must be custom shaped.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Choosing The Right Process For A Branded Product Idea",
        description:
          "How a buyer can decide between engraved merchandise, a printed custom object, or a combined production path.",
        summary:
          "The simplest way to choose between laser engraving and 3D printing is to ask whether the project needs a mark on an existing item or a new object made from a model. If the answer is both, the project should be planned as a combined process from the start.",
        scenario:
          "A business wants a branded desk item for a client meeting. One idea is an engraved wood pen holder. Another is a custom 3D printed product stand. A third is a printed stand with an engraved wood nameplate attached to the base.",
        projectFit: [
          "Laser engraving fits the wood pen holder because the main need is branding an existing material.",
          "3D printing fits the product stand because the object needs custom geometry.",
          "A combined process fits when the custom object also needs a premium nameplate or branded presentation element.",
        ],
        process: [
          "Define whether the project needs marking, object creation, or both.",
          "List the required quantity, deadline, and budget range.",
          "Confirm whether the buyer has artwork, a 3D model, or only a concept.",
          "Choose a material and process path based on use, appearance, and durability.",
          "Proof the visible branding before production.",
        ],
        quoteInputs: [
          "Project goal and intended recipient",
          "Existing product or 3D model, if available",
          "Logo, artwork, text, or personalization data",
          "Quantity and deadline",
          "Preferred material, color, and finish",
        ],
        decisionNotes: [
          "Start with the job the object must do, not the machine.",
          "Use engraving for durable personalization.",
          "Use 3D printing for custom geometry and prototypes.",
        ],
      },
    },
    links: [
      { label: "Laser engraving services", href: "/services#engraving" },
      { label: "3D printing services", href: "/services#printing" },
      { label: "Materials guide", href: "/materials" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    slug: "materials-guide-laser-engraving-3d-printing",
    title: "Materials Guide For Laser Engraving And 3D Printing",
    eyebrow: "Materials and fit",
    description:
      "A material-selection guide for wood, acrylic, glass, metal, leatherette, slate, PLA, PETG, TPU, ABS, ASA, resin, and specialty fabrication projects.",
    answer:
      "Material selection controls how a laser engraved or 3D printed project looks, performs, and lasts. For laser engraving, buyers should consider surface finish, contrast, coating, heat response, thickness, product handling, and whether the goal is marking, etching, cutting, or personalization. Wood, acrylic, glass, leatherette, slate, coated metal, and selected plastics can all produce different results. For 3D printing, buyers should consider strength, flexibility, heat exposure, sunlight, layer direction, surface finish, detail level, and whether the part is a prototype, display model, fixture, gift, or working component. PLA, PETG, TPU, ABS, ASA, resin, and specialty materials each fit different jobs. The best material choice starts with the item's real use rather than a generic material list.",
    isCore: true,
    sections: [
      {
        title: "Laser engraving material factors",
        body:
          "Engraving results depend on the interaction between the laser and the material surface. The same logo can look different on light wood, dark slate, clear acrylic, coated metal, or leatherette.",
        bullets: [
          "Wood: warm contrast, natural variation, strong for gifts and signs",
          "Acrylic: clean edges and premium presentation for awards and displays",
          "Glass: elegant etching for gifts, awards, and recognition pieces",
          "Coated metal: useful for plates, tags, and durable marked assets",
          "Slate and stone: permanent, textured marks for coasters and keepsakes",
        ],
      },
      {
        title: "3D printing material factors",
        body:
          "Printed material choice should follow the part's job. A display model, desk gift, fixture, flexible bumper, outdoor bracket, and detailed miniature do not need the same material.",
        bullets: [
          "PLA: general models, visual parts, gifts, and lower-stress objects",
          "PETG: tougher functional parts with better durability than basic PLA",
          "TPU: flexible parts such as bumpers, grips, and protective pieces",
          "ABS or ASA: selected functional uses where heat or outdoor exposure matters",
          "Resin: high-detail display pieces when the process fits the project",
        ],
      },
      {
        title: "How to choose",
        body:
          "Start with the environment and use: indoor or outdoor, handled or displayed, rigid or flexible, decorative or functional, short-term or durable, high detail or simple geometry. Those constraints should lead the material recommendation.",
      },
    ],
    faqs: materialsFaq,
    proofPages: {
      faq: {
        title: "Laser Engraving And 3D Printing Materials FAQ",
        description:
          "Answers about choosing materials for engraving, marking, cutting, prototypes, gifts, fixtures, and printed parts.",
        intro:
          "This FAQ helps buyers connect material choices to real use cases. It avoids treating materials as interchangeable and focuses on appearance, durability, heat, flexibility, detail, and production fit.",
        questions: [
          ...materialsFaq,
          {
            q: "Why does the same engraving look different on different materials?",
            a: "Each material reacts differently to heat, surface removal, coating changes, and contrast. Grain, color, finish, coating, and texture all affect how visible and refined the engraved mark appears.",
          },
          {
            q: "Why does 3D print orientation matter?",
            a: "Print orientation affects surface finish, support marks, strength direction, and fit. A part can be stronger in one direction and weaker between layers, so functional parts need orientation review.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Choosing Materials For A Mixed Business Order",
        description:
          "How material decisions change when a project includes engraved gifts, signage, and 3D printed display parts.",
        summary:
          "Mixed fabrication orders need material choices tied to each item's role. A client gift, sign, display part, and functional holder may all belong to the same campaign but require different materials and production assumptions.",
        scenario:
          "A business wants a small launch package: engraved client gifts, a table sign for an event, and 3D printed holders for sample products. The project needs a consistent brand presentation, but the items will be handled in different ways.",
        projectFit: [
          "Engraved wood or slate can provide a premium gift surface.",
          "Acrylic can work for clean table signage and display pieces.",
          "PETG or PLA can work for sample holders depending on stress, heat, and finish expectations.",
        ],
        process: [
          "Separate the order by item role: gift, sign, holder, display, or functional aid.",
          "Define handling, environment, durability, and finish expectations for each item.",
          "Match engraving materials and print materials to those requirements.",
          "Review artwork and model files before proofing.",
          "Approve samples or digital proofs before producing the full quantity.",
        ],
        quoteInputs: [
          "List of items and quantities",
          "Logo, artwork, and product dimensions",
          "Indoor or outdoor use",
          "Handling, heat, flex, and durability expectations",
          "Preferred colors, finishes, and deadline",
        ],
        decisionNotes: [
          "Do not choose one material for every item just for consistency.",
          "Use finish and design language to create consistency across different materials.",
          "Let function narrow the material options before appearance decisions are finalized.",
        ],
      },
    },
    links: [
      { label: "Materials overview", href: "/materials" },
      { label: "Laser engraving services", href: "/services#engraving" },
      { label: "3D printing services", href: "/services#printing" },
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

export const coreTopicHubs = topicHubs.filter((hub) => hub.isCore);

export function getTopicHubBySlug(slug: string): TopicHub | undefined {
  return topicHubs.find((hub) => hub.slug === slug);
}

export function getTopicProofRoutes() {
  return coreTopicHubs.flatMap((hub) => [
    `/topics/${hub.slug}/faq`,
    `/topics/${hub.slug}/use-case`,
  ]);
}
