import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { allProducts, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const sortOptions = ['Popular', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Best Rated'];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('Popular');
  const [showSort, setShowSort] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'All';
    setQuery(q);
    setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Best Rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'Newest':
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, query, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="pt-28 md:pt-36 pb-10 md:pb-16 px-5">
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase gradient-text-fill mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Explore
          </h1>
          <p className="text-lg md:text-[22px] text-[#262626]/70 font-normal mb-8 max-w-[600px]">
            2,400+ premium digital assets for your creative projects
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-[800px]">
            <div
              className="relative h-14 rounded-full flex items-center px-2"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, #FFFFFF 20%, #F5F5F5 50%, #E8E8E8 100%)',
                border: '1px solid #E0E0E0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 1px rgba(0,0,0,0.02)',
              }}
            >
              <Search size={18} className="text-[#C8C8C8] ml-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search icons, fonts, templates..."
                className="flex-1 h-full px-3 bg-transparent text-sm text-[#262626] placeholder:text-[#C8C8C8] focus:outline-none"
              />
              <button
                type="submit"
                className="h-10 px-6 rounded-full text-sm font-semibold text-white transition-all hover:shadow-[inset_0_0_0_1px_#FFF2E2,0_0_0_3px_#F89B72] active:scale-95 shrink-0"
                style={{ background: 'linear-gradient(135deg, #F89B72, #F88953)' }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className={`sticky top-16 z-50 transition-all duration-300 ${
          isSticky ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center gap-4">
          {/* Category pills */}
          <div className="flex-1 flex gap-2 overflow-x-auto hide-scrollbar">
            {['All', ...categories.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#F89B72] text-white'
                    : 'bg-[#F0F0F0] text-[#262626] hover:bg-[#E6E4FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#262626] hover:text-[#F89B72] transition-colors"
            >
              <SlidersHorizontal size={14} />
              {sortBy}
            </button>
            {showSort && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-[#F0F0F0] z-50 py-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        sortBy === opt ? 'bg-[#FFF6EE] text-[#F89B72]' : 'text-[#262626] hover:bg-[#F0F0F0]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-[1400px] mx-auto px-5 py-8">
        <p className="text-xs text-[#C8C8C8] mb-6">
          Showing {filteredProducts.length} of {allProducts.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={48} strokeWidth={1} className="text-[#C8C8C8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#262626] mb-2">No products found</h3>
            <p className="text-sm text-[#C8C8C8] mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
                setSearchParams({});
              }}
              className="btn-secondary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
