import { polarCamelProducts } from "./polar-camel-products";

export interface Product {
  slug: string;
  name: string;
  price: number; // cents
  stripePriceId: string;
  images: string[];
  videos?: string[];
  description: string;
  details: string[];
  category: string;
  subcategory?: string;
  tags?: string[];
  supplier?: string;
  supplierSku?: string;
  inventoryQuantity?: number;
  availabilityQuantity?: number;
  purchaseMode?: "cart" | "quote";
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  featured?: boolean;
  shopifyId?: number;
  status?: string;
}

export {
  drinkwareSubcategoryGroups,
  drinkwareSubcategories,
  polarCamelSubcategoryGroups,
  polarCamelSubcategories,
} from "./shop-navigation";

const featuredProductSlugs = new Set([
  "polar-camel-ltm7201-stainless-steel-20oz-ringneck-tumbler-standard-lid",
  "polar-camel-ltm7217-yellow-20-oz-polar-camel-ringneck-tumbler-with-standard-lid",
  "polar-camel-dcs301s-750-ml-polar-camel-square-decanter-set-with-4-11-oz-square-rocks-glasses",
  "polar-camel-lwc101-black-polar-camel-powder-coated-wine-chiller",
  "polar-camel-lsb202-white-1-1-4-quart-polar-camel-hot-cold-serving-bowl-with-lid",
  "airflyte-p5473-rosewood-gold-sunburst-plaque",
  "stllc-slt075",
  "stllc-slt001",
]);

const stlflix3dPrintDetails = [
  "3D printed product placeholder listing",
  "Placeholder price: $0.00",
  "Inventory placeholder: 0 available",
  "Availability placeholder: 0 available",
  "Final material, color, finish, lead time, and price to be confirmed before production",
];

const stlflix3dPrintTags = [
  "3D Print",
  "STLFlix",
  "Placeholder Price",
  "Inventory: 0",
];

function normalizeShopCategory(product: Product): Product {
  if (product.category !== "glassware") {
    return product;
  }

  return {
    ...product,
    category: "home-goods",
  };
}

interface Stlflix3dPrintInput {
  slug: string;
  name: string;
  supplierSku: string;
  folder: string;
  images: string[];
  video: string;
}

function wackyWeeniesProduct({
  slug,
  name,
  supplierSku,
  folder,
  images,
  video,
}: Stlflix3dPrintInput): Product {
  const basePath = `/images/products/3d-prints/wacky-weenies/${folder}`;

  return {
    slug,
    name,
    price: 0,
    stripePriceId: "quote",
    images: images.map((image) => `${basePath}/${image}`),
    videos: [`${basePath}/${video}`],
    description:
      "STLFlix Wacky Weenies 3D print with placeholder pricing while final print settings and availability are confirmed.",
    details: stlflix3dPrintDetails,
    category: "3d-prints",
    subcategory: "wacky-weenies",
    tags: stlflix3dPrintTags,
    supplier: "STLFlix",
    supplierSku,
    inventoryQuantity: 0,
    availabilityQuantity: 0,
    purchaseMode: "quote",
    status: "active",
  };
}

const stlflix3dPrintProducts: Product[] = [
  {
    slug: "feline-sphere-table-lamp",
    name: "Feline Sphere Table Lamp",
    price: 0,
    stripePriceId: "quote",
    images: [
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_1_7022effbf5.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_2_5d1d51d374.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_3_32615f28ae.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_4_a147be8561.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_5_6c7ba53c9c.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_6_67ce78b5b6.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_7_af60e9a703.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_8_24c5805b38.png",
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_Table_Lamp_9_4787cb442f.png",
    ],
    videos: [
      "/images/products/3d-prints/feline-sphere-table-lamp/Feline_Sphere_WEBM_5ce5b00f53.webm",
    ],
    description:
      "STLFlix 3D printed table lamp concept with placeholder pricing while final print settings and availability are confirmed.",
    details: stlflix3dPrintDetails,
    category: "3d-prints",
    tags: stlflix3dPrintTags,
    supplier: "STLFlix",
    supplierSku: "STLFLIX-FELINE-SPHERE-LAMP",
    inventoryQuantity: 0,
    availabilityQuantity: 0,
    purchaseMode: "quote",
    status: "active",
  },
  wackyWeeniesProduct({
    slug: "burnt-ween",
    name: "Burnt Ween",
    supplierSku: "STLFLIX-BURNT-WEEN",
    folder: "burnt-ween",
    images: [
      "Burnt_Ween1_939f854778.png",
      "Burnt_Ween2_b475bae0f5.png",
      "Burnt_Ween3_c9c2b61dac.png",
      "Burnt_Ween4_8ef70fd208.png",
      "Burnt_Ween5_b61ddc5454.png",
      "Burnt_Ween6_720e90d042.png",
    ],
    video: "Burnt_Ween_WEBM_b8bb0a50d4.webm",
  }),
  wackyWeeniesProduct({
    slug: "done-ween",
    name: "Done Ween",
    supplierSku: "STLFLIX-DONE-WEEN",
    folder: "done-ween",
    images: [
      "Done_Ween1_f9e18f8333.png",
      "Done_Ween2_8b40d4e0f5.png",
      "Done_Ween3_aaed522301.png",
      "Done_Ween4_3beb87c2d5.png",
      "Done_Ween5_ba803e93d5.png",
      "Done_Ween6_20c5ba8cf6.png",
    ],
    video: "Done_Ween_WEBM_e7c0672c5e.webm",
  }),
  wackyWeeniesProduct({
    slug: "golden-ween",
    name: "Golden Ween",
    supplierSku: "STLFLIX-GOLDEN-WEEN",
    folder: "golden-ween",
    images: [
      "Golden_Ween1_c6e89f6f97.png",
      "Golden_Ween2_42ee23890d.png",
      "Golden_Ween3_a9d6dea527.png",
      "Golden_Ween4_c99d49a315.png",
      "Golden_Ween5_37de9417a5.png",
      "Golden_Ween6_1bfcc2bd02.png",
    ],
    video: "Golden_Ween_WEBM_396c02b076.webm",
  }),
  wackyWeeniesProduct({
    slug: "raw-ween",
    name: "Raw Ween",
    supplierSku: "STLFLIX-RAW-WEEN",
    folder: "raw-ween",
    images: [
      "Raw_Ween1_f2c83768e8.png",
      "Raw_Ween2_d73645b561.png",
      "Raw_Ween3_71965c26e4.png",
      "Raw_Ween4_61c3def0ad.png",
      "Raw_Ween5_7504014506.png",
      "Raw_Ween6_8fbd183be4.png",
    ],
    video: "Raw_Ween_WEBM_20975a7ad7.webm",
  }),
  wackyWeeniesProduct({
    slug: "simmering-ween",
    name: "Simmering Ween",
    supplierSku: "STLFLIX-SIMMERING-WEEN",
    folder: "simmering-ween",
    images: [
      "Simmering_Ween1_01871df78f.png",
      "Simmering_Ween2_26fcde576d.png",
      "Simmering_Ween3_d51b1594b4.png",
      "Simmering_Ween4_a3827f55b0.png",
      "Simmering_Ween5_ae8e4d5787.png",
      "Simmering_Ween6_d02d23f3ca.png",
    ],
    video: "Simmering_Ween_WEBM_b7ab5a2a76.webm",
  }),
  wackyWeeniesProduct({
    slug: "sizzled-ween",
    name: "Sizzled Ween",
    supplierSku: "STLFLIX-SIZZLED-WEEN",
    folder: "sizzled-ween",
    images: [
      "Sizzled_Ween1_91f1be1cd5.png",
      "Sizzled_Ween2_3f31d8df65.png",
      "Sizzled_Ween3_445bb661f9.png",
      "Sizzled_Ween4_39de39400c.png",
      "Sizzled_Ween5_68e8dcafb9.png",
      "Sizzled_Ween6_fed8c1aa25.png",
    ],
    video: "Sizzled_Ween_WEBM_e38bc8e45b.webm",
  }),
  wackyWeeniesProduct({
    slug: "smoking-ween",
    name: "Smoking Ween",
    supplierSku: "STLFLIX-SMOKING-WEEN",
    folder: "smoking-ween",
    images: [
      "Smoking_Ween_1_a545f64beb.png",
      "Smoking_Ween_2_5a93ace484.png",
      "Smoking_Ween_3_9b0ced1d35.png",
      "Smoking_Ween_4_e72c728c6a.png",
      "Smoking_Ween_5_aba2b045e1.png",
      "Smoking_Ween_6_aed9f05bb3.png",
    ],
    video: "Smoking_Ween_WEBM_8d374a7880.webm",
  }),
  wackyWeeniesProduct({
    slug: "the-skewer",
    name: "The Skewer",
    supplierSku: "STLFLIX-THE-SKEWER",
    folder: "the-skewer",
    images: [
      "The_Skewer_1_be301a64ec.png",
      "The_Skewer_2_8f61143657.png",
      "The_Skewer_3_ebe9a8cdc4.png",
      "The_Skewer_4_86c4b4c97a.png",
      "The_Skewer_5_fc0f513e65.png",
    ],
    video: "The_Skewer_WEBM_3dec63809f.webm",
  }),
  wackyWeeniesProduct({
    slug: "thirsty-ween",
    name: "Thirsty Ween",
    supplierSku: "STLFLIX-THIRSTY-WEEN",
    folder: "thirsty-ween",
    images: [
      "Thirsty_Ween1_6a657d9d0b.png",
      "Thirsty_Ween2_ccc9952201.png",
      "Thirsty_Ween3_37d647424f.png",
      "Thirsty_Ween4_afdcb5493a.png",
      "Thirsty_Ween5_5dd7635f4e.png",
      "Thirsty_Ween6_717ff594d8.png",
    ],
    video: "Thirsty_Ween_WEBM_1d97ae074e.webm",
  }),
];

const baseProducts: Product[] = [
  ...polarCamelProducts,
  ...stlflix3dPrintProducts,
  {
    slug: "airflyte-p5473-rosewood-gold-sunburst-plaque",
    name: "Airflyte P5473 Rosewood Gold Sunburst Plaque",
    price: 21000,
    stripePriceId: "quote",
    images: ["/images/products/airflyte/p5473.png"],
    description:
      "Personalized Airflyte P5473 rosewood piano finish plaque with a gold sunburst frame casting and brass-plated steel LaserFX engraving plate for polished recognition awards.",
    details: [
      "Airflyte SKU: P5473",
      "Size: 11\" x 15\"",
      "Rosewood piano finish plaque with goldtone metal frame casting",
      "Brass-plated steel LaserFX engraving plate",
      "Personalization, proofing, and current availability confirmed before production",
    ],
    category: "awards",
    tags: [
      "corporate awards",
      "rosewood plaque",
      "laser engraved plaque",
      "recognition awards",
      "Airflyte awards",
    ],
    supplier: "Airflyte",
    supplierSku: "P5473",
    purchaseMode: "quote",
    seo: {
      title: "Airflyte P5473 Rosewood Gold Sunburst Plaque",
      description:
        "Personalized Airflyte P5473 rosewood piano finish plaque with gold sunburst frame casting for corporate awards, service recognition, and milestone honors.",
      keywords: [
        "Airflyte P5473",
        "rosewood plaque",
        "gold sunburst plaque",
        "corporate recognition awards",
        "laser engraved plaque St. Louis",
      ],
    },
    featured: false,
    status: "active",
  },
  {
    slug: "10-tips-to-buy-use-a-laser-in-your-soho-business",
    name: "10 Tips To Buy & Use a Laser in Your SOHO Business",
    price: 0,
    stripePriceId: "free",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/RedLaser.jpg?v=1674676855"],
    description: "We will provide a link to download a .PDF file that contains the 10 Tips To Buy &amp; Use a Laser in Your SOHO Business.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "digital",
    featured: false,
    shopifyId: 7952514810019,
    status: "draft",
  },
  {
    slug: "stllc-slt075",
    name: "13 1/4\" x 7\" Acacia Wood/Slate Cutting Board (Personalized)",
    price: 3496,
    stripePriceId: "price_1TP0y2HYoNGH7WzgaOr1z94V",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT075_Mom.png?v=1679718385", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT075.png?v=1679718385", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT075_BLANK.png?v=1679718385", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT075_BACK_BLANK.png?v=1679718385"],
    description: "Looking for the perfect wedding or housewarming gift? Look no further than this stunning custom engraved cutting board! Made of beautiful slate and solid Acacia wood, this board is not only a gorgeous addition to any kitchen, but it's also incredibly useful.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991189930147,
    status: "active",
  },
  {
    slug: "stllc-slt076",
    name: "16\" x 7 3/4\" Acacia Wood/Slate Cutting Board",
    price: 2696,
    stripePriceId: "price_1TP0y2HYoNGH7WzgTlBwtM5E",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT076.png?v=1679718717", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT076_BLANK.png?v=1679718717", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT076_BACK_BLANK.png?v=1679718653"],
    description: "Looking for the perfect wedding or housewarming gift? Look no further than this stunning custom engraved cutting board! Made of beautiful slate and solid Acacia wood, this board is not only a gorgeous addition to any kitchen, but it's also incredibly useful.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991189962915,
    status: "active",
  },
  {
    slug: "stllc-slt081",
    name: "17 1/2\" x 6\" Acacia Wood/Slate Serving Board with Two Tools",
    price: 3696,
    stripePriceId: "price_1TP0y3HYoNGH7WzgRDIZswma",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT081.png?v=1679720091", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT081_STYLED.png?v=1679720105", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT081_BLANK.png?v=1679720105", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT081_BACK_BLANK.png?v=1679720105"],
    description: "Looking for the perfect wedding or housewarming gift? Look no further than this stunning custom engraved cutting board! Made of beautiful slate and solid Acacia wood, this board is not only a gorgeous addition to any kitchen, but it's also incredibly useful.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190126755,
    status: "active",
  },
  {
    slug: "stllc-slt078",
    name: "18 1/2\" x 4 1/4\" Acacia Wood/Slate Serving Board",
    price: 2996,
    stripePriceId: "price_1TP0y4HYoNGH7WzgV87iYwdN",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_STYLED.png?v=1679719283", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078.png?v=1679719283", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_1.png?v=1679719283", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_BLANK.png?v=1679719283"],
    description: "This custom engraved solid wood serving board with handle and slate coasters can be customized to suit. It makes a wonderful wedding or house-warming gift! It is also a beautiful, useful piece to add to your own kitchen, and use to host your favorite guests.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: false,
    shopifyId: 7991190028451,
    status: "draft",
  },
  {
    slug: "stllc-slt001",
    name: "4\" x 4\" Slate Coaster (Round / Square) - Personalized",
    price: 499,
    stripePriceId: "price_1TP0y4HYoNGH7Wzg38UnHgbZ",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/files/gps_generated_86ff66f6-c82d-47f9-a889-881e4c7c6ebf.png?v=1719258159", "https://cdn.shopify.com/s/files/1/0459/7586/3459/files/gps_generated.png?v=1719258927", "https://cdn.shopify.com/s/files/1/0459/7586/3459/files/gps_generated_c4ab6943-64c1-40f1-9ce3-23f10289cb71.png?v=1719258927", "https://cdn.shopify.com/s/files/1/0459/7586/3459/files/4__x_4__Slate_Coaster__Round___Square__-_Personalized_edited_1.png?v=1719258923"],
    description: "Looking for a unique and customizable gift idea for your next corporate event or special occasion? Check out our personalized slate stone decor pieces! Each piece is made of real slate, ensuring that no two are exactly alike.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190159523,
    status: "active",
  },
  {
    slug: "stllc-slt077",
    name: "Acacia Wood/Slate Cutting Board 13\" x 9\"",
    price: 3696,
    stripePriceId: "price_1TP0y5HYoNGH7WzgYBOzawQN",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT077_Mom.png?v=1679718474", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT077.png?v=1679718474", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT077_BACK_BLANK.png?v=1679718474", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT077_BLANK.png?v=1679718475"],
    description: "Looking for the perfect wedding or housewarming gift? Look no further than this stunning custom engraved cutting board! Made of beautiful slate and solid Acacia wood, this board is not only a gorgeous addition to any kitchen, but it's also incredibly useful.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991189995683,
    status: "active",
  },
  {
    slug: "slate-coaster-serving-board-set",
    name: "Acadia Wood and Slate Serving Board",
    price: 3496,
    stripePriceId: "price_1TP0y6HYoNGH7Wzg1Gty7XBh",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_49405c37-1d05-4be7-ad79-32d4b0d6598a.png?v=1717113738", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_1_cb695f6a-d2de-4e0f-861e-7144b422d18e.png?v=1717113738", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_BLANK_a1626832-8dab-4c14-a58b-625a7bb679c6.png?v=1717113738", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078_STYLED_f48d3cad-6d3d-4f4b-a9a6-54d7380a5794.png?v=1717113738"],
    description: "Individual beverage coasters are a great addition to the Acadia Wood and Slate serving board and at $4.00 each you can have several coasters to use in conjunction with the serving board.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7952532996259,
    status: "active",
  },
  {
    slug: "stllc-slt061",
    name: "Rectangle Slate Cutting Board with Hanger String - 11 1/2\" x 8 3/4\"",
    price: 1696,
    stripePriceId: "price_1TP0y6HYoNGH7WzgzIQUM2CJ",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT061.png?v=1679722949", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT061set.jpg?v=1679931267", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT061_BLANK.png?v=1679931267"],
    description: "Introducing our laserable Slate Stone Decor piece, the perfect choice for corporate or personal gifts! With the option to customize it with your choice of engraving, this is a truly unique and personalized present.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190683811,
    status: "active",
  },
  {
    slug: "stllc-slt071",
    name: "Rectangle Slate Cutting Board with Hanger String - 13 1/2\" x 7\"",
    price: 1696,
    stripePriceId: "price_1TP0y7HYoNGH7WzgI96CvJYQ",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT071.png?v=1679718286", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT071_BLANK.png?v=1679718313"],
    description: "Looking for a unique and personalized gift that's sure to impress? Look no further than our laserable Slate Stone Decor piece! Whether you're in the market for a corporate gift or something special for a loved one, this customizable piece is sure to fit the bill.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190945955,
    status: "active",
  },
  {
    slug: "stllc-slt030",
    name: "Rectangle Slate Decor with Hanger String - 10\" x 4\"",
    price: 1496,
    stripePriceId: "price_1TP0y8HYoNGH7WzgK9FuL52q",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT030.png?v=1679721521", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT030_BLANK.png?v=1679721521"],
    description: "Enhance the aesthetic appeal of your cherished living area with our exquisite natural slate decor, perfectly suitable for indoor display. This beautiful slate hanger serves as an exceptional gift for significant occasions such as weddings or housewarmings.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190388899,
    status: "active",
  },
  {
    slug: "stllc-slt042",
    name: "Rectangle Slate Decor with Plastic Feet - 10\" x 8\"",
    price: 1696,
    stripePriceId: "price_1TP0y8HYoNGH7Wzgk4cqU4ud",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT042.png?v=1679930206", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT042-Set.jpg?v=1679930206", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT042_FRONT_BLANK.png?v=1679930201", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT042_BLANK.png?v=1679930201"],
    description: "Introducing our laserable Slate Stone Decor, an exceptional gift for both corporate and personal occasions. Please note that as these are authentic slate stones, each piece may slightly vary in shape and color, rendering them unique and one-of-a-kind.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190519971,
    status: "active",
  },
  {
    slug: "stllc-slt078r",
    name: "Replacement Coasters for SLT078",
    price: 1499,
    stripePriceId: "price_1TP0y9HYoNGH7Wzg6R7HJ7NZ",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT078R.jpg?v=1679719432"],
    description: "Replacement coaster for SLT078",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: false,
    shopifyId: 7991190978723,
    status: "draft",
  },
  {
    slug: "stllc-slt080",
    name: "Round Acacia Wood/Slate Serving Board with Handle - 10 1/2\" x 14 1/2\"",
    price: 2996,
    stripePriceId: "price_1TP0yAHYoNGH7Wzg0UpRaZeJ",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT080.jpg?v=1679674756"],
    description: "This exquisite cutting board, crafted from high-quality Acacia wood and slate, is available for customization to meet your specific preferences. The board features an ergonomic handle, making it convenient to use for preparing your favorite dishes.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190093987,
    status: "active",
  },
  {
    slug: "stllc-slt079",
    name: "Round Acacia Wood/Slate Serving Board with Handle - 8 1/4\" x 12 1/4\"",
    price: 2496,
    stripePriceId: "price_1TP0yAHYoNGH7WzgBNNJ8CrO",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT079.png?v=1679719323", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT079_BACK_BLANK.png?v=1679719323", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT079_BLANK.png?v=1679719323"],
    description: "Looking for the perfect wedding or housewarming gift? Look no further than this stunning custom engraved cutting board! Made of beautiful slate and solid Acacia wood, this board is not only a gorgeous addition to any kitchen, but it's also incredibly useful.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190061219,
    status: "active",
  },
  {
    slug: "stllc-slt051",
    name: "Round Slate Decor with Foam Pads - 11 3/4\"",
    price: 1996,
    stripePriceId: "price_1TP0yBHYoNGH7WzgGYSy4wq7",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT051.png?v=1679724043", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT051_ANGLEa_BLANK.png?v=1679724043", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT051_BLANK.png?v=1679724043"],
    description: "Introducing our Laserable Slate Stone Decor piece, the perfect gift for any occasion! Whether you're looking for a unique corporate gift or a personalized present for a loved one, this slate stone decor piece is sure to impress.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: true,
    shopifyId: 7991190585507,
    status: "active",
  },
  {
    slug: "slate-coaster-square-round",
    name: "Slate Coaster - Square / Round",
    price: 499,
    stripePriceId: "price_1TP0yCHYoNGH7WzgmSbcSRq3",
    images: ["https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT002.png?v=1679948154", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT002_KNIGHTS.png?v=1679948154", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT001_0bf82dfe-270d-498d-8923-506a91070a81.png?v=1679948154", "https://cdn.shopify.com/s/files/1/0459/7586/3459/products/SLT001_WOLF.png?v=1679948154"],
    description: "Looking for a unique and customizable gift idea for your next corporate event or special occasion? Check out our laserable slate stone decor pieces! Each piece is made of real slate, ensuring that no two are exactly alike.",
    details: ["Custom laser engraved in St. Louis, MO", "Veteran-owned small business", "Garage workshop \u2014 full customer satisfaction guarantee", "Fast turnaround \u2014 ships within days"],
    category: "wood-slate",
    featured: false,
    shopifyId: 7984264937635,
    status: "draft",
  },
];

export const products: Product[] = baseProducts.map((product) => {
  const normalizedProduct = normalizeShopCategory(product);

  if (!featuredProductSlugs.has(normalizedProduct.slug)) {
    return normalizedProduct;
  }

  const tags = normalizedProduct.tags?.includes("Featured")
    ? normalizedProduct.tags
    : ["Featured", ...(normalizedProduct.tags ?? [])];

  return {
    ...normalizedProduct,
    tags,
    featured: true,
  };
});

export const categories = [
  { slug: "drinkware", label: "Drinkware" },
  { slug: "home-goods", label: "Home Goods" },
  { slug: "wood-slate", label: "Wood & Slate" },
  { slug: "awards", label: "Awards" },
  { slug: "3d-prints", label: "3D Prints" },
  { slug: "fundraiser", label: "Fundraiser" },
  { slug: "digital", label: "Digital Products" },
  { slug: "other", label: "Other" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.tags?.includes("Featured"));
}

