import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { carouselBundles } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function CircleCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(
        circleRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Scroll-driven rotation
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              const rotation = self.progress * 360;
              const normalized = ((rotation % 360) + 360) % 360;
              const idx = Math.round((360 - normalized) / 45) % 8;
              setActiveIndex(idx);
            },
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 300;

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-[120px] overflow-hidden min-h-[80vh] md:min-h-[100vh] flex items-center justify-center">
      <div className="relative w-full max-w-[900px] mx-auto px-5 flex items-center justify-center">
        {/* Circle container */}
        <div
          ref={circleRef}
          className="relative"
          style={{ width: radius * 2 + 220, height: radius * 2 + 220 }}
        >
          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#262626]">Curated</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#F89B72]">Bundles</p>
          </div>

          {/* Cards */}
          {carouselBundles.map((bundle, i) => {
            const angle = (i * 45 * Math.PI) / 180 - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = i === activeIndex;

            return (
              <div
                key={bundle.id}
                className={`circle-card absolute w-[140px] md:w-[200px] rounded-xl overflow-hidden bg-white shadow-md border border-[#E6E4FF] ${
                  isActive ? 'active' : ''
                }`}
                style={{
                  left: `calc(50% + ${x}px - ${isActive ? 100 : 70}px)`,
                  top: `calc(50% + ${y}px - 80px)`,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  zIndex: isActive ? 20 : 10,
                }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F0F0F0]">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2 md:p-3">
                  <p className="text-[10px] md:text-xs font-semibold text-[#262626] line-clamp-1">{bundle.title}</p>
                  <p className="text-[10px] text-[#F89B72] font-bold">${bundle.price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
