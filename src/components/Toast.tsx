import { Check, ShoppingCart, Heart, AlertCircle, X } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

const icons = {
  success: Check,
  cart: ShoppingCart,
  wishlist: Heart,
  error: AlertCircle,
};

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className="flex items-center gap-3 bg-white rounded-xl shadow-lg px-4 py-3 min-w-[280px] max-w-[360px] animate-toast-in border border-[#F0F0F0]"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === 'error' ? 'bg-red-100 text-red-500' : 'bg-[#FFF6EE] text-[#F89B72]'
            }`}>
              <Icon size={16} strokeWidth={2} />
            </div>
            <p className="text-sm font-medium text-[#262626] flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#C8C8C8] hover:text-[#262626] transition-colors"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
