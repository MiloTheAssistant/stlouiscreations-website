import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { materials } from "@/lib/constants";
import { products } from "@/lib/products";
import { absoluteUrl, canonicalHost } from "@/lib/seo";
import { getTopicProofRoutes, topicHubs } from "@/lib/topic-hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: canonicalHost, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: absoluteUrl("/materials"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: absoluteUrl("/catalogs"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: absoluteUrl("/fundraisers"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: absoluteUrl("/fundraisers/water-bottles-accessories"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: absoluteUrl("/topics"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: absoluteUrl("/privacy-policy"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: absoluteUrl("/refund-policy"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: absoluteUrl("/shipping"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
  ];

  const materialPages = materials.map((material) => ({
    url: absoluteUrl(`/materials/${material.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((product) => ({
    url: absoluteUrl(`/shop/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: product.status === "draft" ? 0.45 : 0.65,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const topicPages = topicHubs.map((hub) => ({
    url: absoluteUrl(`/topics/${hub.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const topicProofPages = getTopicProofRoutes().map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...materialPages,
    ...productPages,
    ...topicPages,
    ...topicProofPages,
    ...blogPages,
  ];
}
