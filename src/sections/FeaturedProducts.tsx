import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProducts, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const gridProducts = products.filter((p) => !p.featured).slice(0, 8);

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        const split = SplitText(headingRef.current.querySelector('h2')!, { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
          }
        );
      }

      // Featured cards
      if (featuredRef.current) {
        const cards = featuredRef.current.children;
        Array.from(cards).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
              scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' },
            }
          );
        });
      }

      // Grid
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-[120px]">
      {/* Subtle white overlay */}
      <div className="absolute inset-0 bg-white/30 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-5">
        <div ref={headingRef} className="mb-10 md:mb-14">
          <h2 className="section-heading text-[#262626]" style={{ fontFamily: 'var(--font-display)' }}>
            Featured Projects
          </h2>
        </div>

        {/* Featured row */}
        <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProductCard({ product }: { product: typeof featuredProducts[0] }) {

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#E6E4FF] hover:border-[#F89B72] flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden bg-[#F0F0F0] relative shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-bold text-[#262626] mb-3 group-hover:text-[#F89B72] transition-colors leading-tight">
          {product.title}
        </h3>
        <p className="text-sm text-[#262626]/70 mb-5 flex-1 line-clamp-3">
          {product.description}
        </p>
        
        {product.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 text-[11px] font-semibold text-[#262626]/80 bg-[#F0F0F0] rounded border border-[#E0E0E0]">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#262626] hover:text-[#F89B72] transition-colors group-hover:underline underline-offset-4"
          >
            View Live Project →
          </a>
        </div>
      </div>
    </div>
  );
}
