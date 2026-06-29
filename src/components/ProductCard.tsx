import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useToastStore } from '@/store/useToastStore';
import type { Product } from '@/types';

const categoryColors: Record<string, string> = {
  Icons: '#E6E4FF',
  Fonts: '#FFF2E2',
  Templates: '#C8FFCA',
  Presentations: '#FFE4E4',
  Mockups: '#E6F2FF',
  'UI Kits': '#F0E6FF',
  'Social Media': '#FFF8E6',
  Illustrations: '#E6FFE6',
  Bundles: '#C8FFCA',
};

export default function ProductCard({ product, horizontal = false }: { product: Product; horizontal?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);
  const inWishlist = isInWishlist(product.id);
  const tagColor = categoryColors[product.category] || '#F89B72';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    addToast(`${product.title} added to cart`, 'cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(product);
    addToast(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      'wishlist'
    );
  };

  if (horizontal) {
    return (
      <div className="bg-white rounded-xl border border-[#E6E4FF] overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-[#F89B72] transition-all duration-300 flex flex-col md:flex-row">
        <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-[#F0F0F0]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span
            className="absolute top-3 left-3 px-3 py-1 text-[10px] font-semibold uppercase rounded"
            style={{ backgroundColor: tagColor, color: '#262626' }}
          >
            {product.category}
          </span>
        </div>
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold uppercase mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {product.title}
            </h3>
            <p className="text-sm text-[#262626]/70 mb-3 line-clamp-2">{product.description}</p>
            {product.isBundle && product.items && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.items.map((item) => (
                  <span key={item} className="text-[10px] font-medium px-2 py-0.5 bg-[#FFF6EE] rounded text-[#262626]/60">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#F89B72]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-[#C8C8C8] line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlist}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                  inWishlist ? 'bg-[#F89B72] text-white scale-110' : 'bg-[#FFF6EE] text-[#262626] hover:bg-[#F89B72] hover:text-white'
                }`}
              >
                <Heart size={16} strokeWidth={2} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleAddToCart}
                className="w-9 h-9 rounded-full bg-[#F89B72] text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ShoppingCart size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#E6E4FF] overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-[#F89B72] transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F0F0]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className="absolute top-3 left-3 px-3 py-1 text-[10px] font-semibold uppercase rounded"
          style={{ backgroundColor: tagColor, color: '#262626' }}
        >
          {product.category}
        </span>
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            inWishlist ? 'bg-[#F89B72] text-white opacity-100' : 'bg-white/80 text-[#262626]'
          }`}
        >
          <Heart size={14} strokeWidth={2} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#262626] line-clamp-2 mb-2 group-hover:text-[#F89B72] transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-[#F89B72] fill-[#F89B72]" />
          <span className="text-xs text-[#262626]/60">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#F89B72]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#C8C8C8] line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-full bg-[#F89B72] text-white flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
          >
            <ShoppingCart size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
