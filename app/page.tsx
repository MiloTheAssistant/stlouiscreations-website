import HeroSection from "@/components/home/HeroSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import MaterialsShowcase from "@/components/home/MaterialsShowcase";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CtaSection from "@/components/home/CtaSection";
import BlogPreview from "@/components/home/BlogPreview";
import JsonLd from "@/components/seo/JsonLd";
import { getProductCategoryJsonLd, getServiceJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={getServiceJsonLd()} />
      <JsonLd data={getProductCategoryJsonLd()} />
      <HeroSection />
      <ServicesStrip />
      <MaterialsShowcase />
      <ProductsSection />
      <WhyChooseUs />
      <CtaSection />
      <BlogPreview />
    </>
  );
}
