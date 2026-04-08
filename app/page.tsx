import HeroSection from "@/components/home/HeroSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import MaterialsShowcase from "@/components/home/MaterialsShowcase";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CtaSection from "@/components/home/CtaSection";
import BlogPreview from "@/components/home/BlogPreview";

export default function Home() {
  return (
    <>
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
