import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const iconProducts = products.filter((p) => p.category === 'Icons');
const marqueeIcons = iconProducts.slice(0, 8);

// Generate icon thumbnails from product images for marquee
const marqueeRow1 = [...marqueeIcons, ...marqueeIcons, ...marqueeIcons, ...marqueeIcons];
const marqueeRow2 = [...marqueeIcons.slice().reverse(), ...marqueeIcons.slice().reverse(), ...marqueeIcons.slice().reverse(), ...marqueeIcons.slice().reverse()];
const marqueeRow3 = [...marqueeIcons, ...marqueeIcons, ...marqueeIcons, ...marqueeIcons];

export default function IconsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Marquee rows stagger in
      if (marqueeRef.current) {
        const rows = marqueeRef.current.children;
        Array.from(rows).forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.5, delay: i * 0.2, ease: 'power2.out',
              scrollTrigger: { trigger: marqueeRef.current, start: 'top 85%' },
            }
          );
        });
      }

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
      <div className="max-w-[1400px] mx-auto px-5">
        <div ref={headingRef} className="mb-10 md:mb-14">
          <h2 className="section-heading text-[#262626]" style={{ fontFamily: 'var(--font-display)' }}>
            Icons
          </h2>
        </div>

        {/* Marquee */}
        <div ref={marqueeRef} className="space-y-3 mb-12 md:mb-16 overflow-hidden">
          {/* Row 1 - scrolls left */}
          <div className="overflow-hidden">
            <div className="marquee-track marquee-left" style={{ '--duration': '30s' } as React.CSSProperties}>
              {marqueeRow1.map((icon, i) => (
                <div
                  key={`r1-${icon.id}-${i}`}
                  className="w-16 h-16 rounded-lg bg-white shadow-sm mx-1.5 shrink-0 overflow-hidden"
                >
                  <img src={icon.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 - scrolls right */}
          <div className="overflow-hidden">
            <div className="marquee-track marquee-right" style={{ '--duration': '25s' } as React.CSSProperties}>
              {marqueeRow2.map((icon, i) => (
                <div
                  key={`r2-${icon.id}-${i}`}
                  className="w-16 h-16 rounded-lg bg-white shadow-sm mx-1.5 shrink-0 overflow-hidden"
                >
                  <img src={icon.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          {/* Row 3 - scrolls left */}
          <div className="overflow-hidden">
            <div className="marquee-track marquee-left" style={{ '--duration': '35s' } as React.CSSProperties}>
              {marqueeRow3.map((icon, i) => (
                <div
                  key={`r3-${icon.id}-${i}`}
                  className="w-16 h-16 rounded-lg bg-white shadow-sm mx-1.5 shrink-0 overflow-hidden"
                >
                  <img src={icon.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {iconProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/explore?category=Icons" className="text-sm font-semibold text-[#7C93E0] hover:text-[#F89B72] transition-colors underline underline-offset-4">
            View all Icons →
          </Link>
        </div>
      </div>
    </section>
  );
}
