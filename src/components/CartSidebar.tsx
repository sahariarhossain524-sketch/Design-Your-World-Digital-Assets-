import { useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} strokeWidth={2} className="text-[#F89B72]" />
            <h3 className="text-lg font-bold uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              Your Cart
            </h3>
            <span className="text-xs font-semibold bg-[#F89B72] text-white px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button onClick={closeCart} className="w-9 h-9 rounded-full hover:bg-[#FFF6EE] flex items-center justify-center transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={48} strokeWidth={1} className="text-[#C8C8C8] mb-4" />
              <p className="text-lg font-semibold text-[#262626] mb-2">Your cart is empty</p>
              <p className="text-sm text-[#C8C8C8] mb-6">Add some amazing assets to get started</p>
              <button onClick={closeCart} className="btn-primary">Browse Products</button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={item.product.id}
                className="flex gap-3 pb-4 border-b border-[#F0F0F0] last:border-0 animate-stagger-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-[60px] h-[60px] rounded-lg object-cover bg-[#F0F0F0]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#262626] truncate">{item.product.title}</p>
                  <p className="text-sm font-semibold text-[#F89B72]">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded border border-[#E0E0E0] flex items-center justify-center hover:border-[#F89B72] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded border border-[#E0E0E0] flex items-center justify-center hover:border-[#F89B72] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeItem(item.product.id);
                    addToast('Item removed from cart', 'success');
                  }}
                  className="text-[#C8C8C8] hover:text-[#F89B72] transition-colors self-start"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#F0F0F0] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#262626]">
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="text-lg font-bold text-[#262626]">${totalPrice().toFixed(2)}</span>
            </div>
            <button className="btn-primary w-full py-3.5 text-base">
              Checkout — ${totalPrice().toFixed(2)}
            </button>
            <button onClick={closeCart} className="w-full text-sm font-medium text-[#7C93E0] hover:text-[#F89B72] transition-colors text-center">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
