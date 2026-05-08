export interface ShopProduct {
  slug: string;
  name: string;
  price: number;
  stripePriceId: string;
  images: string[];
  description: string;
  tags?: string[];
  purchaseMode?: "cart" | "quote";
}
