import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { presentationItems } from '@/data/products';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function Presentations() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-[120px]">
      {/* Subtle white overlay */}
      <div className="absolute inset-0 bg-white/50 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-5">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
          <div>
            <h2 className="section-heading text-[#262626] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Presentations
            </h2>
            <p className="text-sm text-[#262626]/60">Pitch decks, keynotes, and slide templates</p>
          </div>
          <Link
            to="/explore?category=Presentations"
            className="text-sm font-semibold text-[#7C93E0] hover:text-[#F89B72] transition-colors underline underline-offset-4 mt-2 sm:mt-0"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
          {presentationItems.map((item) => (
            <div
              key={item.title}
              className="presentation-card bg-white rounded-xl overflow-hidden shadow-sm border border-[#E6E4FF] cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F0F0F0] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-[#262626] mb-1">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#C8C8C8]">{item.slides} Slides</span>
                  <span className="text-base font-bold text-[#F89B72]">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          ref={ctaRef}
          className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center md:text-left"
          style={{
            background: 'linear-gradient(135deg, #F89B72, #F88953)',
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 animate-gradient-shimmer opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3
                className="text-2xl md:text-4xl font-bold uppercase text-white mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Need a winning pitch deck?
              </h3>
              <p className="text-base text-white/80">Browse 680+ presentation templates</p>
            </div>
            <Link
              to="/explore?category=Presentations"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-semibold uppercase bg-white text-[#F89B72] hover:bg-[#FFF6EE] transition-colors shrink-0"
            >
              Browse Presentations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
