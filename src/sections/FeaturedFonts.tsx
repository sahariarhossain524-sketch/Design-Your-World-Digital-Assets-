import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fontItems } from '@/data/products';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, string> = {
  'Sans Serif': '#C8FFCA',
  'Serif': '#FFF2E2',
  'Display': '#FFE4E4',
  'Script': '#E6E4FF',
  'Slab Serif': '#E6F2FF',
};

export default function FeaturedFonts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

      if (carouselRef.current) {
        const cards = carouselRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: carouselRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-[120px]">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
          <div>
            <h2 className="section-heading text-[#262626] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Featured Fonts
            </h2>
            <p className="text-lg md:text-[22px] text-[#262626]/70 font-normal">
              Premium typefaces for every project
            </p>
          </div>
          <Link
            to="/explore?category=Fonts"
            className="text-sm font-semibold text-[#7C93E0] hover:text-[#F89B72] transition-colors underline underline-offset-4 mt-2 sm:mt-0"
          >
            View all →
          </Link>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {fontItems.map((font, i) => {
            const isHovered = hoveredIdx === i;
            const leftNeighbor = hoveredIdx !== null && i === hoveredIdx - 1;
            const rightNeighbor = hoveredIdx !== null && i === hoveredIdx + 1;

            return (
              <div
                key={font.name}
                className="font-card shrink-0 w-[260px] md:w-[300px] bg-white rounded-xl shadow-sm border border-[#E6E4FF] overflow-hidden select-none"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: leftNeighbor ? 'translateX(8px)' : rightNeighbor ? 'translateX(-8px)' : undefined,
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Specimen area */}
                <div className="h-[200px] md:h-[240px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFF6EE] to-white">
                  <p
                    className="text-3xl md:text-5xl font-bold text-[#262626] text-center mb-3 transition-transform duration-300"
                    style={{
                      fontFamily: font.name,
                      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {font.name}
                  </p>
                  <p
                    className="text-xs md:text-sm text-[#262626]/50 text-center line-clamp-1"
                    style={{ fontFamily: font.name }}
                  >
                    {font.specimen}
                  </p>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded"
                      style={{
                        backgroundColor: categoryColors[font.category] || '#F0F0F0',
                        color: '#262626',
                      }}
                    >
                      {font.category}
                    </span>
                    <span className="text-xs text-[#C8C8C8]">{font.styles} Styles</span>
                  </div>
                  <p className="text-base font-bold text-[#F89B72]">${font.price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
