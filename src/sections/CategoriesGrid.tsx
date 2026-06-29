import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '@/data/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesGrid() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollAnimation<HTMLDivElement>({
    y: 40,
    stagger: 0.08,
    scale: 0.9,
    children: true,
    start: 'top 85%',
  });

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      const split = SplitText(headingRef.current!, { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, headingRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 md:py-28 lg:py-[120px]">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
          <h2
            className="section-heading text-[#262626] mb-2 sm:mb-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Browse Categories
          </h2>
          <Link
            to="/explore"
            className="text-sm font-semibold text-[#7C93E0] hover:text-[#F89B72] transition-colors underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="category-card rounded-xl p-5 md:p-6 flex flex-col items-center text-center gap-3 aspect-[3/4] md:aspect-auto md:h-[220px] justify-center"
              style={{ backgroundColor: cat.bgColor }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-white/40 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[80%] h-[80%] object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-[#262626]">{cat.name}</p>
                <p className="text-xs text-[#F89B72]">{cat.itemCount.toLocaleString()}+ items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
