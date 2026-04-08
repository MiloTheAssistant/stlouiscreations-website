"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group bg-surface border border-white/5 overflow-hidden"
      whileHover={{
        boxShadow: "0 0 30px rgba(255,107,0,0.2)",
        borderColor: "rgba(255,107,0,0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Image placeholder */}
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square bg-background overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-primary">
                {product.name[0]}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted text-xs mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </motion.div>
  );
}
