import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SplitText } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const templateProducts = products.filter((p) => p.category === 'Templates');
const parallaxCards = templateProducts.slice(0, 4);
const gridProducts = templateProducts.slice(0, 4);

const tagColors = ['#F89B72', '#C8FFCA', '#E6E4FF', '#FFE4E4'];

export default function TemplatesParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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

      // Parallax stack
      if (stackRef.current) {
        const cards = stackRef.current.querySelectorAll('.parallax-card');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 200 + i * 80, opacity: 0 },
            {
              y: i * 20,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stackRef.current,
                start: 'top 80%',
                end: 'bottom 30%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="templates" className="relative py-20 md:py-28 lg:py-[120px]">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
          <div>
            <h2 className="section-heading text-[#262626] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Templates
            </h2>
            <p className="text-sm text-[#262626]/60">Professional website and app templates</p>
          </div>
          <Link
            to="/explore?category=Templates"
            className="text-sm font-semibold text-[#7C93E0] hover:text-[#F89B72] transition-colors underline underline-offset-4 mt-2 sm:mt-0"
          >
            View all →
          </Link>
        </div>

        {/* Parallax Card Stack */}
        <div ref={stackRef} className="relative h-[500px] md:h-[600px] mb-16 md:mb-20">
          {parallaxCards.map((card, i) => (
            <div
              key={card.id}
              className="parallax-card absolute left-0 right-0 bg-white rounded-xl overflow-hidden shadow-lg border border-[#E6E4FF]"
              style={{
                top: `${i * 15}px`,
                zIndex: 4 - i,
              }}
            >
              <div className="flex flex-col md:flex-row h-[220px] md:h-[260px]">
                <div className="md:w-1/2 h-32 md:h-full relative overflow-hidden bg-[#F0F0F0]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-1/2 p-5 md:p-8 flex flex-col justify-center">
                  <span
                    className="category-tag self-start mb-2"
                    style={{ backgroundColor: tagColors[i], color: '#262626' }}
                  >
                    {card.category}
                  </span>
                  <h3 className="text-lg md:text-[22px] font-bold uppercase mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#262626]/60 mb-3 line-clamp-2">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#F89B72]">${card.price.toFixed(2)}</span>
                    <Link
                      to={`/explore?q=${encodeURIComponent(card.title)}`}
                      className="text-sm font-semibold text-[#7C93E0] hover:text-[#F89B72] transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
