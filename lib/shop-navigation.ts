export const categories = [
  { slug: "drinkware", label: "Drinkware" },
  { slug: "glassware", label: "Glassware" },
  { slug: "home-goods", label: "Home Goods" },
  { slug: "wood-slate", label: "Wood & Slate" },
  { slug: "awards", label: "Awards" },
  { slug: "corporate", label: "Corporate" },
  { slug: "fundraiser", label: "Fundraiser" },
  { slug: "digital", label: "Digital Products" },
  { slug: "other", label: "Other" },
] satisfies Array<{ slug: string; label: string }>;

export const polarCamelSubcategoryGroups = [
  { slug: "original-polar-camel", label: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "ion-plated-drinkware", label: "ION Plated Drinkware", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "with-grips-sport-tumblers", label: "With Grips/Sport Tumblers", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "drinkware-accessories", label: "Drinkware Accessories", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "glassware", label: "Glassware", category: "glassware", categoryLabel: "Glassware" },
  { slug: "home-goods", label: "Home Goods", category: "home-goods", categoryLabel: "Home Goods" },
] satisfies Array<{ slug: string; label: string; category: string; categoryLabel: string }>;

export const polarCamelSubcategories = [
  { slug: "20-oz-ringneck-tumblers", label: "20 oz. Ringneck Tumblers", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "30-oz-ringneck-tumblers", label: "30 oz. Ringneck Tumblers", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "40-oz-travel-mugs", label: "40 oz. Travel Mugs", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "32-oz-travel-mugs", label: "32 oz. Travel Mugs", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "20-oz-travel-mugs", label: "20 oz. Travel Mugs", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "15-oz-coffee-mugs", label: "15 oz. Coffee Mugs", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "stemless-wine-tumblers", label: "Stemless Wine Tumblers", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "12-oz-water-bottles", label: "12 oz. Water Bottles", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "20-oz-water-bottles", label: "20 oz. Water Bottles", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "32-oz-water-bottles", label: "32 oz. Water Bottles", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "40-oz-water-bottles", label: "40 oz. Water Bottles", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "22-oz-skinny-tumblers", label: "22 oz. Skinny Tumblers", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "10-oz-tumblers", label: "10 oz. Tumblers", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "beverage-holders", label: "Beverage Holders", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "16-oz-pints", label: "16 oz. Pints", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "14-and-20-oz-pilsners", label: "14 & 20 oz. Pilsners", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "10-oz-sippy-cups", label: "10 oz. Sippy Cups", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "sublimatable", label: "Sublimatable", group: "original-polar-camel", groupLabel: "Original Polar Camel", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "prism", label: "Prism", group: "ion-plated-drinkware", groupLabel: "ION Plated Drinkware", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "bright-gold", label: "Bright Gold", group: "ion-plated-drinkware", groupLabel: "ION Plated Drinkware", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "rose-gold", label: "Rose Gold", group: "ion-plated-drinkware", groupLabel: "ION Plated Drinkware", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "ghost-black", label: "Ghost Black", group: "ion-plated-drinkware", groupLabel: "ION Plated Drinkware", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "limited-edition-colors-ghost-black", label: "Limited Edition Colors/Ghost Black", group: "ion-plated-drinkware", groupLabel: "ION Plated Drinkware", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "silicone-grip-tumblers", label: "Silicone Grip Tumblers", group: "with-grips-sport-tumblers", groupLabel: "With Grips/Sport Tumblers", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "leatherette-grip-tumblers", label: "Leatherette Grip Tumblers", group: "with-grips-sport-tumblers", groupLabel: "With Grips/Sport Tumblers", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "leatherette-grip-travel-mugs", label: "Leatherette Grip Travel Mugs", group: "with-grips-sport-tumblers", groupLabel: "With Grips/Sport Tumblers", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "sport-tumblers", label: "Sport Tumblers", group: "with-grips-sport-tumblers", groupLabel: "With Grips/Sport Tumblers", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "lids", label: "Lids", group: "drinkware-accessories", groupLabel: "Drinkware Accessories", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "handles-carabiners", label: "Handles/Carabiners", group: "drinkware-accessories", groupLabel: "Drinkware Accessories", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "water-bottle-boots", label: "Water Bottle Boots", group: "drinkware-accessories", groupLabel: "Drinkware Accessories", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "straws", label: "Straws", group: "drinkware-accessories", groupLabel: "Drinkware Accessories", category: "drinkware", categoryLabel: "Drinkware" },
  { slug: "decanter-sets-decanters-rocks-glasses", label: "Decanter Sets, Decanters, Rocks Glasses", group: "glassware", groupLabel: "Glassware", category: "glassware", categoryLabel: "Glassware" },
  { slug: "cocktail-and-shot-glasses", label: "Cocktail and Shot Glasses", group: "glassware", groupLabel: "Glassware", category: "glassware", categoryLabel: "Glassware" },
  { slug: "champagne-and-wine-glasses", label: "Champagne and Wine Glasses", group: "glassware", groupLabel: "Glassware", category: "glassware", categoryLabel: "Glassware" },
  { slug: "beer-and-coffee-glasses-and-mugs", label: "Beer and Coffee Glasses and Mugs", group: "glassware", groupLabel: "Glassware", category: "glassware", categoryLabel: "Glassware" },
  { slug: "wine-chillers", label: "Wine Chillers", group: "home-goods", groupLabel: "Home Goods", category: "home-goods", categoryLabel: "Home Goods" },
  { slug: "serving-bowls", label: "Serving Bowls", group: "home-goods", groupLabel: "Home Goods", category: "home-goods", categoryLabel: "Home Goods" },
  { slug: "pet-bowls", label: "Pet Bowls", group: "home-goods", groupLabel: "Home Goods", category: "home-goods", categoryLabel: "Home Goods" },
] satisfies Array<{
  slug: string;
  label: string;
  group: string;
  groupLabel: string;
  category: string;
  categoryLabel: string;
}>;

export const drinkwareSubcategoryGroups = polarCamelSubcategoryGroups.filter((group) => group.category === "drinkware");
export const drinkwareSubcategories = polarCamelSubcategories.filter((subcategory) => subcategory.category === "drinkware");
