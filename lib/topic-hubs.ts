export interface TopicHub {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  answer: string;
  isCore?: boolean;
  evidenceBlocks?: Array<{
    title: string;
    body: string;
    facts: string[];
  }>;
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
    a: "Vector files such as AI, EPS, SVG, or PDF are usually best for logos, line art, QR codes, and clean text because they preserve sharp edges when artwork is resized. High-resolution PNG or JPG files may work for photos or simple artwork, but they should be reviewed before production because low-resolution files can create soft edges, uneven marks, or unreadable small text. For a 12, 24, or 50 piece order, the safest path is artwork review, proof approval, then production.",
  },
  {
    q: "Is laser engraving better than printing for corporate gifts?",
    a: "Laser engraving is usually better when permanence, texture, and a premium feel matter, especially on wood, slate, acrylic, coated metal, leatherette, and selected drinkware. Printing may be better for full-color artwork, soft goods, or designs that require exact brand-color matching. A buyer choosing between the two should compare the item surface, expected handling, logo complexity, quantity, deadline, and whether the gift should look understated or highly colorful. Engraving is often the stronger choice for awards, donor gifts, employee recognition, and sponsor pieces.",
  },
  {
    q: "Can laser engraving be used for QR codes or asset tags?",
    a: "Yes. Laser engraving can mark QR codes, serial numbers, asset IDs, and labels on suitable materials, but code readability should be treated as a production requirement rather than an assumption. Code size, contrast, material finish, scanning distance, and whether the item is flat or curved all affect results. For a larger batch, St. Louis Creations should review the code artwork, test the mark on the chosen material when needed, and confirm that a phone or scanner can read the final size before producing 24, 50, or more pieces.",
  },
];

const business3dFaq = [
  {
    q: "When should a business use 3D printing instead of machining?",
    a: "Use 3D printing when the quantity is low, the design may change, the geometry is complex, or speed matters more than high-volume unit cost. Typical business examples include 1 prototype, 2 to 5 fit-test versions, or a 10 to 50 piece short run for holders, brackets, fixtures, display parts, or mockups. Machining may be better for tight tolerances, metal parts, high heat, heavy loads, certified materials, or production environments that cannot accept layer lines or printed-plastic behavior.",
  },
  {
    q: "What files are needed for a 3D printing quote?",
    a: "An STL, STEP, OBJ, 3MF, or native CAD file is helpful for a 3D printing quote. STL and 3MF files are common for printing, while STEP or CAD files are often better when dimensions need review or the model may need changes. If a file is not available, provide photos, dimensions, sketches, the intended use, quantity, deadline, and any fit, load, heat, or appearance requirements. The goal is to decide whether the part is printable as-is, needs design work, or should use another production method.",
  },
  {
    q: "Can 3D printing be used for finished business parts?",
    a: "Yes, in some cases. Finished printed parts can work for fixtures, holders, displays, prototypes, mockups, organizers, and low-volume parts when the material and design match the job. Before treating a printed item as an end-use part, review load, tolerance, heat, sunlight, chemicals, flexing, wall thickness, infill, layer orientation, and surface finish. A printed part that works as a desk fixture may not work as an outdoor bracket or a high-stress mechanical component. Business buyers should describe the real environment, not just the shape.",
  },
];

const consumer3dFaq = [
  {
    q: "What kinds of consumer projects are good for custom 3D printing?",
    a: "Good consumer projects include replacement knobs, brackets, hobby parts, cosplay accessories, tabletop gaming items, desk organizers, custom gifts, decor, display pieces, and one-off inventions where size, material, and detail expectations are realistic. The best requests explain whether the item is decorative, functional, handled daily, exposed to heat, or expected to flex. One custom gift, a small family set, or a few spare repair parts can be a good fit. Safety-critical parts, food-contact items, high-heat parts, and heavy-load parts need extra review before printing.",
  },
  {
    q: "Can St. Louis Creations print a file downloaded from the internet?",
    a: "Often, yes. A downloaded STL, 3MF, or OBJ file can be a useful starting point, but it still needs a printability check for scale, wall thickness, orientation, supports, licensing, and whether the part is designed for the printer and material requested. A file that looks good on screen may be too thin, too large, unsupported, or intended for a different process. If the item is based on copyrighted characters or branded designs, the request also needs a rights and usage check before production.",
  },
  {
    q: "Is 3D printing safe for food, heat, or mechanical loads?",
    a: "Consumer 3D printed parts need careful review before food contact, heat exposure, outdoor use, or mechanical loading. Layer lines, material choice, coatings, cleaning limits, and the way a part is printed can make it unsuitable for some uses. PLA may soften in hot environments, TPU flexes but is not a universal rubber replacement, and resin or painted parts may have handling limits. For anything involving heat, children, pets, food, structural support, or repeated stress, the quote request should describe the risk so St. Louis Creations can recommend a safer path or decline the job.",
  },
];

const comparisonFaq = [
  {
    q: "What is the difference between laser engraving and 3D printing?",
    a: "Laser engraving modifies the surface of an existing item by marking, etching, or cutting a material. 3D printing creates a new object layer by layer from a digital model. Engraving is usually a marking or personalization process for logos, names, QR codes, awards, tags, signs, and product blanks. 3D printing is usually a part-making process for prototypes, fixtures, holders, repair parts, models, and custom shapes. A simple decision rule is this: choose engraving when the item already exists and needs a durable mark; choose 3D printing when the object itself needs to be made.",
  },
  {
    q: "Should a business choose laser engraving or 3D printing for branded products?",
    a: "Choose laser engraving when the goal is to mark an existing item with a logo, name, date, QR code, serial number, or artwork. That fits drinkware, plaques, tags, wood products, acrylic awards, leatherette gifts, and some coated metals. Choose 3D printing when the goal is to create a custom shape, prototype, fixture, model, holder, or small-batch part. For a branded desk item, engraving may mark a wood base while 3D printing creates a custom stand. The right answer depends on whether branding is the main job or the physical object still needs to be created.",
  },
  {
    q: "Can a project use both laser engraving and 3D printing?",
    a: "Yes. A project can use 3D printing to make a custom object and laser engraving to mark a plate, tag, packaging piece, display base, label, sign, or companion item. Combining methods works best when the design is planned from the start because the printed part, engraved surface, attachment method, and finish need to fit together. For example, a 3D printed product holder might use an engraved acrylic label, or an engraved wood base might hold a printed model. The quote should include both the artwork and the model or dimensions.",
  },
];

const materialsFaq = [
  {
    q: "Which materials work best for laser engraving?",
    a: "Common laser engraving materials include wood, acrylic, glass, slate, leatherette, coated metal, anodized aluminum, and selected plastics. Results vary by finish, color, coating, thickness, grain, texture, and the type of mark needed. Wood can show natural variation, acrylic can create clean contrast and polished edges, glass and slate can produce elegant etched marks, and coated metals depend heavily on the coating. For a batch order, the safest material choice considers the surface, handling, logo detail, desired contrast, and whether the item must be cut, marked, or personalized.",
  },
  {
    q: "Which materials work best for 3D printing?",
    a: "Common 3D printing materials include PLA for general parts, models, and gifts; PETG for tougher functional parts; TPU for flexible parts; ABS or ASA for selected heat or outdoor needs; and resin for high-detail models when that process fits the job. Material choice should follow the real use case. A display model, desk organizer, flexible bumper, outdoor bracket, and detailed miniature do not need the same plastic. Buyers should describe temperature exposure, sunlight, flexing, load, detail needs, color preference, and whether the item is decorative or functional.",
  },
  {
    q: "How should buyers choose a material?",
    a: "Start with the job the item must do: appearance, durability, heat, sunlight, water, flexibility, food contact, handling, detail, and budget. The same design can need different materials depending on whether it is a gift, display, prototype, fixture, or working part. For engraving, surface finish and contrast often matter most. For 3D printing, strength direction, wall thickness, layer orientation, and operating environment can matter more than color. A good quote request explains how the item will be used, how many pieces are needed, and what failure or appearance issues would be unacceptable.",
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
      "St. Louis Creations provides custom laser engraving for businesses that need durable branding, recognition pieces, fundraiser products, event merchandise, and marked operational assets. Laser engraving is a strong fit when a company needs crisp logos, recipient names, dates, serial numbers, QR codes, sponsor marks, or personalization on materials such as wood, acrylic, coated metal, glass, leatherette, slate, and selected product blanks. The right production path depends on the item, material, quantity, artwork quality, deadline, handling requirements, and whether the project needs a proof before production. Business buyers should prepare a logo or vector file, preferred product or material, estimated quantity, deadline, personalization data, and delivery needs before requesting a quote. That information lets the project be reviewed for contrast, readability, handling, schedule, and packaging before a batch is produced.",
    isCore: true,
    evidenceBlocks: [
      {
        title: "How should businesses plan engraving quantities and proofing?",
        body:
          "A business engraving request is easiest to quote when the buyer separates the proof item from the production batch. In practice, a 2026 planning pattern is 1 approved proof, then a small order such as 12 pieces, a team order such as 24 pieces, or a larger event run of 50 or more pieces. Those quantities are examples, not minimums or guarantees, but they show why setup, handling, and variable data matter. A logo-only run can move differently from a personalized run where every plaque, tumbler, or tag needs a different name, date, sponsor level, QR code, or serial number. St. Louis Creations should review artwork, confirm spelling, approve the visible layout, and then schedule production around product availability, engraving time, packaging, and pickup or shipping needs.",
        facts: [
          "Use 1 proof before a larger personalized run when accuracy matters.",
          "12, 24, and 50+ piece quantities are planning examples, not guarantees.",
          "Variable names, dates, QR codes, and serial numbers add review time.",
          "Production timing depends on artwork approval, product availability, and handling.",
        ],
      },
      {
        title: "Which material constraints affect the final engraved mark?",
        body:
          "Laser engraving results depend on the surface, not just the logo file. For example, wood can show grain variation, so two pieces may not mark with identical contrast. Clear acrylic, colored acrylic, and cast acrylic can produce different edge and engraving effects. Coated metal or anodized aluminum can mark cleanly when the coating supports contrast, while bare metal may need a different marking process or product choice. Glass and slate can look premium, but the mark depends on texture, curvature, thickness, and handling. Leatherette and fabric react to heat, so testing may be needed before a 24 or 50 piece order. QR codes and asset tags add another constraint: the final size and contrast must remain readable at the expected scanning distance.",
        facts: [
          "Wood grain, acrylic type, coating, curvature, and texture change contrast.",
          "QR codes need readable size, contrast, and scanning distance.",
          "Leatherette and fabric can require testing because heat changes the surface.",
          "Bare metal and coated metal may require different marking recommendations.",
        ],
      },
    ],
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
          "This FAQ helps business buyers prepare laser engraving projects with fewer production surprises. It focuses on artwork quality, material choice, personalization data, proofs, lead time, and when engraving is the right marking method. A strong engraving request usually identifies the item or material, the estimated quantity, the logo or text file, any variable names or numbers, the deadline, and whether pickup, shipping, packaging, or event sorting matters. For planning, buyers can think in stages: 1 proof or sample review, then a small batch such as 12 pieces, a team batch such as 24 pieces, or a larger run of 50 or more pieces when the design is approved. Those examples are not guarantees, but they show why artwork approval and data accuracy affect cost, timing, and production risk.",
        questions: [
          ...laserBusinessFaq,
          {
            q: "What information should be included in a bulk engraving quote request?",
            a: "Include the product or material, quantity, logo file, personalization spreadsheet if names vary, deadline, packaging needs, delivery or pickup preference, and whether the buyer wants a digital or physical proof before production. For a 12, 24, or 50+ item run, it also helps to state whether every item is identical or whether names, titles, dates, QR codes, or sponsor marks change by piece. That detail affects setup, review time, error control, and packaging.",
          },
          {
            q: "How does personalization affect engraving cost and timing?",
            a: "Personalization adds setup and review time because each item may need unique text, names, dates, numbers, award categories, sponsor levels, or QR codes. A clean spreadsheet and approved naming format reduce errors and speed up production. The buyer should decide capitalization, titles, line breaks, and name order before proofing. For event orders, the schedule should allow time to review the variable data and fix spelling issues before production starts, not after items are engraved.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Engraved Recognition Kits For A Business Event",
        description:
          "How a company can plan branded awards, sponsor gifts, and personalized recognition pieces without creating production risk.",
        summary:
          "A practical business engraving project often combines a repeated brand mark with a small amount of variable information, such as recipient names, dates, award categories, QR codes, serial numbers, or sponsor levels. The project succeeds when the buyer confirms the item, file quality, personalization data, proofing process, and delivery date before production begins. A typical planning path is to approve 1 layout proof, confirm the final spreadsheet, and then produce the needed batch, whether that is 12 awards, 24 speaker gifts, or 50+ donor pieces. These quantities are planning examples, not minimums or delivery promises. They show why the quote should include packaging, event sorting, pickup or shipping, and a deadline tied to proof approval rather than only engraving time.",
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
      "St. Louis Creations provides 3D printing services for businesses that need prototypes, product mockups, jigs, fixtures, brackets, holders, replacement parts, display pieces, and low-volume production components. 3D printing is useful when speed, customization, geometry, or small quantity matters more than high-volume unit cost. It is not automatically the best choice for every part: tolerance, strength, temperature exposure, surface finish, load, material, and end-use conditions all affect whether a printed part is appropriate. A useful quote request includes an STL, STEP, OBJ, 3MF, or CAD file when available, plus the part purpose, quantity, size, deadline, material expectations, and any fit or strength requirements. Business buyers should also explain whether the part is for a visual review, a fit test, a shop-floor tool, or an end-use component.",
    isCore: true,
    evidenceBlocks: [
      {
        title: "How should businesses plan 3D printing quantities and iterations?",
        body:
          "A business 3D printing project often starts smaller than a buyer expects because the first goal is to reduce design risk. In practice, 1 prototype can check size and presentation. Two to 5 fit-test versions can compare clearances, wall thickness, fastener locations, or hand feel. A 10 to 50 piece short run can make sense for fixtures, holders, brackets, or display components when tooling would be too slow or too expensive. Those ranges are 2026 planning examples, not a production promise. The right path depends on model quality, print time, material, support needs, post-processing, and whether the part must survive heat, load, sunlight, chemicals, repeated flexing, or tight mechanical fit. If the first print reveals a fit issue, the model may need revision before the final quantity is scheduled.",
        facts: [
          "1 prototype can validate size or presentation.",
          "2 to 5 fit-test versions can resolve clearance and strength issues.",
          "10 to 50 pieces can fit some short-run fixture or display needs.",
          "Heat, load, sunlight, chemicals, and tolerance requirements drive material choice.",
        ],
      },
      {
        title: "Which file and material constraints matter for business 3D printing?",
        body:
          "A useful 3D printing quote includes more than a file upload. For example, STL and 3MF files are common for printing, STEP files are stronger for dimensional review, OBJ files are often visual, and native CAD files can help when changes are expected. Material choice should follow the job. PLA can work for visual models and lower-stress parts, PETG for tougher functional pieces, TPU for flexible parts, ABS or ASA for selected heat or outdoor needs, and resin for high-detail models when resin handling is appropriate. Strength is also directional: layer orientation, wall count, infill, supports, and print direction can change whether a bracket, holder, fixture, or replacement part behaves well in use. Fit points and load direction should be identified before quoting.",
        facts: [
          "STL, 3MF, STEP, OBJ, and CAD files communicate different details.",
          "PLA, PETG, TPU, ABS, ASA, and resin fit different use cases.",
          "Layer orientation can affect strength and fit.",
          "Wall count, infill, supports, and print direction should match the part's job.",
        ],
      },
    ],
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
          "This FAQ is for business buyers who need to know whether 3D printing fits a real job. It covers file preparation, material expectations, tolerance limits, production use, and the information needed for a responsible quote. A useful request explains whether the buyer needs 1 prototype, 2 to 5 fit-test iterations, a 10 to 50 piece short run, or another quantity tied to a specific workflow. It should also identify the file type, critical dimensions, mating parts, deadline, and the environment where the item will be used. St. Louis Creations can then review whether PLA, PETG, TPU, ABS, ASA, resin, or another path is appropriate, or whether machining, commercial sourcing, or redesign is a better fit. That review helps prevent treating a test print like a certified production part.",
        questions: [
          ...business3dFaq,
          {
            q: "What makes a business part print-ready?",
            a: "A print-ready part has clear scale, closed geometry, reasonable wall thickness, known fit requirements, and a stated use case. Functional parts also need material, load, heat, and durability expectations before printing. A bracket, holder, jig, or replacement part should identify critical mating surfaces, screw locations, clearance needs, and which direction force will be applied. If those details are unknown, the first print should be treated as a test version rather than final production.",
          },
          {
            q: "Can a printed prototype be turned into a production part later?",
            a: "Yes, but the production method may change. A printed prototype can validate fit, shape, ergonomics, and presentation before the design moves to machining, molding, fabrication, or a stronger printed material. The prototype should be labeled by purpose: visual model, fit test, functional trial, or sales sample. That distinction matters because a part that works for a meeting may not be strong, smooth, heat-resistant, or precise enough for repeated end use.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Replacement Fixture For A Small Business Workflow",
        description:
          "How a local business can use 3D printing to replace a low-volume fixture without waiting for tooling or a minimum production run.",
        summary:
          "Business 3D printing is most useful when a company needs a specific physical aid quickly and in low quantity. A fixture, bracket, holder, guide, mockup, or replacement part can often be printed after the use case, fit points, and material expectations are reviewed. The planning path usually starts with 1 prototype or measurement review, then 2 to 5 fit-test changes if clearances or mounting points are uncertain, and finally the approved quantity when the part behaves as expected. These ranges are examples, not promises. They show why a quote should include the part purpose, file type, dimensions, quantity, deadline, heat or load exposure, and whether the buyer accepts a test print before the final batch. Functional use should be confirmed before repeat production.",
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
      "Consumer 3D printing is useful when someone needs a custom object, replacement piece, hobby part, personalized gift, decor item, cosplay accessory, tabletop gaming item, or one-off idea that is not easily bought from a standard store. St. Louis Creations can review files, sketches, photos, dimensions, and project goals to determine whether a print is practical. The best consumer 3D printing requests explain what the item must do, where it will be used, how large it should be, whether appearance or strength matters more, and whether the buyer already has a printable file. Not every idea is ready to print immediately; thin walls, unsupported details, incorrect scale, copyright limits, food contact, heat, and load requirements can all change the recommendation. A clear request also states color, quantity, and whether a test print is acceptable.",
    isCore: true,
    evidenceBlocks: [
      {
        title: "Which consumer project details make a 3D printing quote useful?",
        body:
          "A consumer 3D printing request becomes easier to evaluate when it includes the object type, size, color preference, quantity, deadline, and how the item will be used. For example, one custom gift, a small family set, 2 replacement clips, or a few tabletop pieces can all be reasonable starting points when the geometry is clear. A downloaded STL or 3MF file may be enough for a simple decor item, while a repair part often needs photos, measurements, and the mating surface it connects to. If the buyer only has a sketch, the request may need design work before printing. The quote should also state whether appearance, strength, flexibility, or fit matters most. That priority helps avoid spending time on the wrong material or finish.",
        facts: [
          "One gift, 2 replacement clips, or a small set are realistic planning examples.",
          "Photos and mating-surface dimensions help repair-part requests.",
          "Downloaded STL or 3MF files still need printability review.",
          "Appearance, strength, flexibility, and fit should be prioritized before printing.",
        ],
      },
      {
        title: "Which safety, heat, and rights limits affect consumer 3D prints?",
        body:
          "Custom consumer prints should be screened for limits before production. In practice, PLA can be useful for display items, desk accessories, and light-duty objects, but it may soften in hot cars or sun-exposed areas. PETG may be a better fit for tougher household parts, TPU for flexible pieces, and resin for detail-focused display pieces when the handling requirements are appropriate. Food contact, child use, pet use, heavy loads, heat, outdoor exposure, and repeated flexing all require caution. Copyright and licensing also matter: a file found online or a character-style request may not be appropriate for commercial production. St. Louis Creations should confirm the use case before accepting a print as safe or suitable. A safer answer may be to redesign, resize, or decline the request.",
        facts: [
          "PLA can soften in hot or sun-exposed environments.",
          "PETG, TPU, and resin serve different consumer use cases.",
          "Food, child, pet, heat, and load uses need extra review.",
          "Downloaded or character-style files may have copyright or licensing limits.",
        ],
      },
    ],
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
          "This FAQ helps consumers understand what information makes a custom 3D printing request practical. It focuses on printability, files, materials, size, safety limits, and realistic expectations for one-off objects. A strong consumer request usually includes the file or sketch, approximate dimensions, color preference, quantity, deadline, and a plain description of how the item will be used. One gift, 2 replacement clips, a small tabletop set, or a few spare parts can be reasonable when the geometry is clear and the use is low-risk. St. Louis Creations should still review heat, food contact, child or pet use, repeated flexing, copyrighted designs, and load-bearing expectations before accepting the part as suitable. The safer path may be redesign, material change, more context, or decline.",
        questions: [
          ...consumer3dFaq,
          {
            q: "What if I only have a photo or sketch?",
            a: "A photo or sketch can start the conversation, especially for simple shapes, but it may require design work before printing. Include dimensions, use case, and any part that the object must fit against. For a repair part, photos should show the broken item, the mating surface, and the direction of force or movement. For a gift or decor item, include the desired size, color, quantity, and whether the final piece needs names, dates, or other personalization.",
          },
          {
            q: "Can 3D printed items be painted or finished?",
            a: "Many printed items can be sanded, primed, painted, or assembled after printing, but finish quality depends on material, layer height, geometry, time, and the level of post-processing requested. A quick functional part may keep visible layer lines, while a display piece may need additional sanding, primer, paint, or assembly. Buyers should explain whether the item is a utility part, a gift, a collectible, or a presentation piece so finish expectations are realistic before quoting.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Turning A Household Repair Idea Into A Printed Part",
        description:
          "How a consumer can prepare a practical 3D printing request for a replacement clip, bracket, knob, or small repair part.",
        summary:
          "A consumer repair print works best when the broken part is available for reference, the dimensions are known, and the buyer explains how the part will be handled. The goal is to determine whether a printed part is suitable before spending time on modeling or production. A low-risk clip, knob, cover, bracket, or organizer part may start with 1 test print, then 1 or 2 adjusted versions if the fit is uncertain. The buyer should provide photos of the mating surface, approximate dimensions, color preference, and whether the part flexes, snaps, screws in, or carries weight. Heat, food contact, child use, pet use, and safety-critical loads should be treated as constraints that may change or stop the project. Fit is more important than novelty for repair work.",
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
    evidenceBlocks: [
      {
        title: "How should buyers decide between laser engraving and 3D printing?",
        body:
          "The clearest decision rule is to define the job before choosing the machine. In practice, if the buyer already has a product blank, award, sign, tag, drinkware item, slate piece, wood base, or coated metal plate and needs a logo, name, date, QR code, or serial number, laser engraving is usually the first process to review. If the buyer needs a new shape, prototype, holder, fixture, model, replacement part, or short-run component made from a digital model, 3D printing is usually the first process to review. If the project includes both a custom object and a durable brand mark, the quote should describe both workflows from the start so material, attachment, finish, and proofing decisions do not conflict. This avoids treating a fabrication choice as a keyword choice.",
        facts: [
          "Engraving fits existing items that need durable marks.",
          "3D printing fits new objects made from digital models.",
          "Combined projects should plan attachment, finish, and proofing early.",
          "QR codes, names, serial numbers, and prototypes point to different workflows.",
        ],
      },
      {
        title: "What are examples of combined laser engraving and 3D printing projects?",
        body:
          "A combined production path can make a branded product feel more complete, but it adds decisions. For example, a 3D printed product stand may need an engraved acrylic label or wood base. An engraved award may need a printed insert, spacer, display holder, or prototype for layout review. A trade show kit may use printed sample holders, engraved sponsor tags, and branded signage in the same campaign. These examples do not imply a fixed package; they show why the buyer should submit artwork, model files, dimensions, quantity, deadline, and the final use environment together. Separating the engraving request from the printing request can miss fit, color, attachment, or schedule constraints. Shared review also helps decide whether 1 proof or multiple test pieces are needed.",
        facts: [
          "Printed stands can pair with engraved acrylic labels or wood bases.",
          "Awards may use printed spacers, holders, or layout prototypes.",
          "Trade show kits can combine holders, sponsor tags, and signage.",
          "Artwork, model files, dimensions, quantity, and deadline should be reviewed together.",
        ],
      },
    ],
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
          "This FAQ helps buyers choose the right production path before requesting a quote. It separates marking, cutting, personalization, prototyping, replacement parts, and custom objects into plain-language decisions. The most useful first question is whether the buyer already has the object and needs a mark, or whether the object itself still needs to be made. Laser engraving usually fits existing products, tags, awards, signs, drinkware, and material blanks that need logos, names, dates, QR codes, or serial numbers. 3D printing usually fits new shapes, prototypes, fixtures, holders, models, repair parts, and short-run components. Some projects need both processes, but combined work should be planned together so dimensions, attachments, finish, and proofing do not conflict. The answer should follow the job, not the tool name.",
        questions: [
          ...comparisonFaq,
          {
            q: "Which process is better for a prototype?",
            a: "3D printing is usually better for physical prototypes because it creates a new object from a digital model. It can support 1 visual model, 2 to 5 fit-test versions, or a low-volume trial before a design moves to another production method. Laser engraving can support prototypes when the need is labeling, branding, panels, tags, display pieces, or marked inserts. If the prototype needs both a custom shape and a finished brand presentation, the model file and artwork should be reviewed together.",
          },
          {
            q: "Which process is better for a corporate gift?",
            a: "Laser engraving is usually better for corporate gifts because the product already exists and needs a durable logo, name, date, award title, sponsor mark, or message. It fits drinkware, plaques, slate, acrylic awards, leatherette goods, wood pieces, and selected coated metals. 3D printing can support gifts when the item itself must be custom shaped, such as a small desk object, display stand, ornament, or model. For a 12, 24, or 50+ piece gift run, proofing and variable data should be confirmed before production.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Choosing The Right Process For A Branded Product Idea",
        description:
          "How a buyer can decide between engraved merchandise, a printed custom object, or a combined production path.",
        summary:
          "The simplest way to choose between laser engraving and 3D printing is to ask whether the project needs a mark on an existing item or a new object made from a model. If the answer is both, the project should be planned as a combined process from the start. For example, an engraved pen holder may need only artwork and a product blank, while a 3D printed product stand needs a model, dimensions, material choice, and fit review. A combined stand with an engraved wood or acrylic nameplate needs both workflows aligned. The quote should include quantity, deadline, artwork, model files, attachment expectations, and whether the buyer wants 1 proof or a test print before final production. Shared review reduces mismatched parts and missed deadlines.",
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
      "Material selection controls how a laser engraved or 3D printed project looks, performs, and lasts. For laser engraving, buyers should consider surface finish, contrast, coating, heat response, thickness, product handling, and whether the goal is marking, etching, cutting, or personalization. Wood, acrylic, glass, leatherette, slate, coated metal, and selected plastics can all produce different results. For 3D printing, buyers should consider strength, flexibility, heat exposure, sunlight, layer direction, surface finish, detail level, and whether the part is a prototype, display model, fixture, gift, or working component. PLA, PETG, TPU, ABS, ASA, resin, and specialty materials each fit different jobs. The best material choice starts with the item's real use rather than a generic material list, especially when a batch includes 12, 24, or 50+ pieces.",
    isCore: true,
    evidenceBlocks: [
      {
        title: "Which laser material evidence should buyers compare?",
        body:
          "Laser engraving material choice should start with the mark the buyer needs. For example, wood can create warm contrast, but grain and finish make each piece slightly different. Acrylic can support clean awards, signs, ornaments, and display pieces, but clear, colored, cast, and coated acrylic do not always behave the same. Glass can look refined but may need careful layout and handling because curvature and thickness matter. Coated metal and anodized aluminum can produce durable tags or plates when the coating supports contrast. Slate and stone add texture and permanence but can vary by surface. For 12, 24, or 50+ item runs, material testing or proof approval helps prevent a whole batch from inheriting a contrast problem. The material should match both appearance and handling.",
        facts: [
          "Wood grain and finish can vary piece to piece.",
          "Clear, colored, cast, and coated acrylic can mark differently.",
          "Glass curvature and thickness affect layout and handling.",
          "12, 24, and 50+ item runs benefit from proof approval.",
        ],
      },
      {
        title: "Which 3D printing material evidence should buyers compare?",
        body:
          "3D printing material choice should start with the part's environment. In practice, PLA is useful for models, gifts, and lower-stress indoor parts, but heat can be a concern. PETG can fit tougher functional parts when the design supports it. TPU can flex, but flexible parts need geometry that allows the material to work. ABS or ASA may be considered for selected heat or outdoor needs, depending on the project. Resin can create high-detail display pieces, but handling and brittleness may matter. Strength is not only material: layer direction, wall thickness, infill, supports, and part orientation all affect performance. A quote request should describe whether the item is decorative, functional, handled daily, or exposed to heat, sunlight, or load. Quantity also matters because 1 prototype and 50 finished parts carry different risk.",
        facts: [
          "PLA, PETG, TPU, ABS, ASA, and resin are not interchangeable.",
          "Heat, sunlight, load, and daily handling affect material choice.",
          "Layer direction, walls, infill, supports, and orientation affect strength.",
          "Decorative and functional parts need different material assumptions.",
        ],
      },
    ],
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
          "This FAQ helps buyers connect material choices to real use cases. It avoids treating materials as interchangeable and focuses on appearance, durability, heat, flexibility, detail, and production fit. For laser engraving, the same logo can look different on wood, acrylic, glass, slate, leatherette, coated metal, or anodized aluminum because surface finish, coating, texture, and contrast all matter. For 3D printing, PLA, PETG, TPU, ABS, ASA, resin, and specialty materials behave differently under heat, load, sunlight, flexing, and daily handling. A useful quote request states the item role, quantity, environment, deadline, and what would count as failure, such as unreadable engraving, weak fit, poor contrast, softening, cracking, or visible layer lines. Material choice should reduce risk before it improves appearance or style.",
        questions: [
          ...materialsFaq,
          {
            q: "Why does the same engraving look different on different materials?",
            a: "Each material reacts differently to heat, surface removal, coating changes, and contrast. Grain, color, finish, coating, and texture all affect how visible and refined the engraved mark appears. A logo that looks crisp on coated metal may look warmer and less uniform on wood because grain varies. Glass, slate, acrylic, and leatherette each create different contrast and edge behavior. For a 12, 24, or 50+ item run, proof approval helps confirm the material before the full batch is produced.",
          },
          {
            q: "Why does 3D print orientation matter?",
            a: "Print orientation affects surface finish, support marks, strength direction, and fit. A part can be stronger in one direction and weaker between layers, so functional parts need orientation review. A bracket, holder, clip, or fixture should be evaluated by the direction force will be applied, not only by how it looks on screen. Orientation can also change visible layer lines, support cleanup, and whether critical surfaces print cleanly. For end-use parts, orientation is part of the material decision.",
          },
        ],
      },
      useCase: {
        title: "Use Case: Choosing Materials For A Mixed Business Order",
        description:
          "How material decisions change when a project includes engraved gifts, signage, and 3D printed display parts.",
        summary:
          "Mixed fabrication orders need material choices tied to each item's role. A client gift, sign, display part, and functional holder may all belong to the same campaign but require different materials and production assumptions. A 24 piece engraved gift run might prioritize contrast, presentation, and packaging, while 10 printed sample holders might prioritize fit, stability, and material strength. Acrylic can work for clean signage, wood or slate for premium gift surfaces, and PLA or PETG for display holders depending on heat, handling, and load. The quote should separate item roles, quantities, artwork, model files, dimensions, deadline, and environment instead of treating the order as one generic material choice. That separation keeps proofing and production decisions specific to each item and use.",
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
