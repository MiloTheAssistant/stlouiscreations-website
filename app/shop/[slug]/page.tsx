import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: ProductDetailPageProps): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | St. Louis Creations",
    };
  }

  const title = product.seo?.title ?? `${product.name} | St. Louis Creations`;
  const description = product.seo?.description ?? product.description;

  return {
    title,
    description,
    keywords: product.seo?.keywords ?? product.tags,
    openGraph: {
      title,
      description,
      type: "website",
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : [],
    },
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
