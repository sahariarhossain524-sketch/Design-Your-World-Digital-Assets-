import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { SplitText } from '@/lib/gsap-utils';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.2
      )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.8
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          1.0
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          1.2
        );

      // SplitText for headline
      if (headlineRef.current) {
        const split = SplitText(headlineRef.current, { type: 'chars' });
        tl.fromTo(
          split.chars,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, ease: 'power3.out' },
          0.4
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) navigate(`/explore?q=${encodeURIComponent(q)}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Warm peach overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[90%] md:w-[60%] h-[80%] rounded-2xl"
          style={{ backgroundColor: 'rgba(248, 155, 114, 0.5)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-[800px] mx-auto">
        <p
          ref={taglineRef}
          className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4 opacity-0"
        >
          Premium Digital Assets
        </p>

        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-bold uppercase text-white mb-6 leading-[0.9] opacity-0"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
          }}
        >
          Design Your World
        </h1>

        <p
          ref={subtextRef}
          className="text-base md:text-lg lg:text-[22px] font-normal text-white max-w-[560px] mb-8 opacity-0 leading-relaxed"
        >
          Thousands of templates, fonts, icons & mockups for creative professionals
        </p>

        {/* Skeuomorphic Search Bar */}
        <div
          ref={searchRef}
          className="w-full max-w-[600px] md:max-w-[600px] animate-search-glow opacity-0"
        >
          <form
            onSubmit={handleSearch}
            className="relative h-16 rounded-full flex items-center px-2"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, #FFFFFF 20%, #F5F5F5 50%, #E8E8E8 100%)',
              border: '1px solid #E0E0E0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 1px rgba(0,0,0,0.02)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search templates, fonts, icons..."
              className="flex-1 h-full px-6 bg-transparent text-base text-[#262626] placeholder:text-[#C8C8C8] focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 px-8 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[inset_0_0_0_1px_#FFF2E2,0_0_0_3px_#F89B72] active:scale-95 shrink-0"
              style={{ background: 'linear-gradient(135deg, #F89B72, #F88953)' }}
            >
              Search
            </button>
          </form>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-8 opacity-0">
          <a href="#templates" className="btn-primary">Explore Templates</a>
          <a href="#bundles" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
            Browse Bundles
          </a>
        </div>
      </div>
    </section>
  );
}
