import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bundles } from '@/data/products';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = allProducts.slice(0, 12);

export default function FeaturedBundles() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Cards slide in
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards[0],
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } }
        );
        gsap.fromTo(
          cards[1],
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Duplicate marquee items for seamless loop
  const duplicatedMarquee = [...marqueeItems, ...marqueeItems];

  return (
    <section ref={sectionRef} id="bundles" className="relative py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Heading */}
        <div ref={headingRef} className="mb-8 md:mb-10">
          <h2 className="section-heading text-[#262626] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Featured Bundles
          </h2>
          <p className="text-lg md:text-[22px] text-[#262626]/70 font-normal">
            Curated collections at unbeatable prices
          </p>
        </div>

        {/* Bundle Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16">
          {bundles.map((bundle) => (
            <ProductCard key={bundle.id} product={bundle} horizontal />
          ))}
        </div>

        {/* Marquee */}
        <div className="overflow-hidden -mx-5">
          <div
            className="marquee-track marquee-left"
            style={{ '--duration': '40s' } as React.CSSProperties}
          >
            {duplicatedMarquee.map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="w-[120px] h-[160px] rounded-lg overflow-hidden bg-white shadow-sm mx-2 shrink-0"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
