"use client";

import Link from "next/link";
import Image from "next/image";
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
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square bg-white overflow-hidden border-b border-white/10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-7 transition-transform duration-300 group-hover:scale-[1.03]"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-primary">
                  {product.name[0]}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted text-xs mt-1 line-clamp-2">{product.description}</p>
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] text-muted border border-white/10 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-lg font-bold text-primary">
            {product.purchaseMode === "quote"
              ? `From ${formatPrice(product.price)}`
              : formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </motion.div>
  );
}
