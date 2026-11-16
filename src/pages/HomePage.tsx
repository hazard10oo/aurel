import { CategoriesSection } from "@/features/home/CategoriesSection";
import { HeroSection } from "@/features/home/HeroSection";
import { NewsletterSection } from "@/features/home/NewsletterSection";
import { PromoBanner } from "@/features/home/PromoBanner";
import {
  BestSellersSection,
  NewArrivalsSection,
  TrendingSection,
} from "@/features/home/ProductSections";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TrendingSection />
      <PromoBanner />
      <NewArrivalsSection />
      <BestSellersSection />
      <NewsletterSection />
    </>
  );
}
