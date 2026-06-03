import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { materials } from "@/lib/constants";
import { products } from "@/lib/products";
import { topicHubs } from "@/lib/topic-hubs";

const baseUrl = "https://stlouiscreations.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/materials`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/catalogs`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${baseUrl}/fundraisers`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/fundraisers/water-bottles-accessories`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/topics`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${baseUrl}/shipping`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
  ];

  const materialPages = materials.map((material) => ({
    url: `${baseUrl}/materials/${material.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: product.status === "draft" ? 0.45 : 0.65,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const topicPages = topicHubs.map((hub) => ({
    url: `${baseUrl}/topics/${hub.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...materialPages, ...productPages, ...topicPages, ...blogPages];
}
