import Hero from '@/sections/Hero';
import CategoriesGrid from '@/sections/CategoriesGrid';
import FeaturedBundles from '@/sections/FeaturedBundles';
import TemplatesParallax from '@/sections/TemplatesParallax';
import CircleCarousel from '@/sections/CircleCarousel';
import FeaturedProducts from '@/sections/FeaturedProducts';
import FeaturedFonts from '@/sections/FeaturedFonts';
import IconsShowcase from '@/sections/IconsShowcase';
import Presentations from '@/sections/Presentations';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <FeaturedBundles />
      <TemplatesParallax />
      <CircleCarousel />
      <FeaturedProducts />
      <FeaturedFonts />
      <IconsShowcase />
      <Presentations />
    </>
  );
}
