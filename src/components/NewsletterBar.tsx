import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const messages = [
  'Get 20% off your first order — Use code WELCOME20',
  'Free shipping on orders over $50',
  'New bundles added weekly — Stay tuned!',
];

export default function NewsletterBar() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const closed = localStorage.getItem('newsletter-bar-closed');
      if (!closed || Date.now() - parseInt(closed) > 24 * 60 * 60 * 1000) {
        setVisible(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('newsletter-bar-closed', Date.now().toString());
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-[#7C93E0] z-10 flex items-center justify-center animate-slide-up">
      <p className="text-sm font-medium text-white text-center px-12 transition-opacity duration-300">
        {messages[currentIndex]}
      </p>
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
