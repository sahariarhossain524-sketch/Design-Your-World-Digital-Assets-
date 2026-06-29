import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { allProducts, categories } from '@/data/products';
import type { Product } from '@/types';

const popularSearches = ['Icons', 'Landing Page', 'Social Media', 'Mockups', 'Fonts', 'Presentation'];

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const filtered = allProducts.filter((p) => {
          const matchesQuery = p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            (p.tags || []).some((t) => t.toLowerCase().includes(q));
          const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
          return matchesQuery && matchesCategory;
        });
        setResults(filtered.slice(0, 12));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query, activeCategory]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/explore?q=${encodeURIComponent(query)}`);
    }
  }, [query, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-white animate-fade-in-scale">
      <div className="max-w-[1200px] mx-auto px-5 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            Search
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#FFF6EE] flex items-center justify-center transition-colors"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="relative mb-6">
          <Search size={24} strokeWidth={2} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#C8C8C8]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, fonts, icons..."
            className="w-full text-3xl md:text-5xl font-light bg-transparent border-b-2 border-[#262626] pb-4 pl-10 pr-4 focus:outline-none focus:border-[#F89B72] transition-colors placeholder:text-[#C8C8C8]"
          />
        </form>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {['All', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#F89B72] text-white'
                  : 'bg-[#F0F0F0] text-[#262626] hover:bg-[#E6E4FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results or Popular */}
        {query.trim() ? (
          results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => { onClose(); navigate(`/explore?q=${encodeURIComponent(product.title)}`); }}
                  className="text-left group"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F0F0F0] mb-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-semibold text-[#262626] group-hover:text-[#F89B72] transition-colors line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-xs text-[#F89B72] font-semibold">${product.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-[#262626] mb-2">No results for &quot;{query}&quot;</p>
              <p className="text-sm text-[#C8C8C8]">Try adjusting your search or browse categories</p>
            </div>
          )
        ) : (
          <div>
            <p className="text-sm font-medium text-[#C8C8C8] mb-4">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); }}
                  className="px-4 py-2 rounded-full bg-[#FFF6EE] text-sm font-medium text-[#262626] hover:bg-[#F89B72] hover:text-white transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
