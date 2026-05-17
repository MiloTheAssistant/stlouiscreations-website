"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ShopProduct } from "@/lib/shop-product";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: ShopProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideo = product.videos?.[0];

  function playPreview() {
    if (!videoRef.current) {
      return;
    }

    void videoRef.current.play().catch(() => {
      // Some browsers can still block programmatic playback; the image remains the fallback.
    });
  }

  function resetPreview() {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  return (
    <div
      className="group overflow-hidden border border-white/10 bg-[#101010] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_22px_55px_rgba(0,0,0,0.38),0_0_28px_rgba(255,107,0,0.16)]"
      onMouseEnter={playPreview}
      onMouseLeave={resetPreview}
      onFocus={playPreview}
      onBlur={resetPreview}
      style={{ contentVisibility: "auto", containIntrinsicSize: "420px" }}
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_50%_24%,rgba(255,107,0,0.18),rgba(255,107,0,0.04)_34%,rgba(6,6,6,0.98)_72%)]">
          <div className="absolute inset-4 border border-white/5 bg-black/30 shadow-[inset_0_0_36px_rgba(255,107,0,0.08)] transition-colors duration-300 group-hover:border-primary/20" />
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-8 drop-shadow-[0_20px_28px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.04]"
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
          {previewVideo && (
            <video
              ref={videoRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full bg-black object-contain p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              loop
              muted
              playsInline
              poster={product.images[0]}
              preload="metadata"
            >
              <source src={previewVideo} type="video/webm" />
            </video>
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
        <div className="mt-5 flex items-end justify-between gap-4">
          <span className="font-display text-lg font-bold leading-tight text-primary">
            {product.purchaseMode === "quote"
              ? `From ${formatPrice(product.price)}`
              : formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </div>
  );
}
