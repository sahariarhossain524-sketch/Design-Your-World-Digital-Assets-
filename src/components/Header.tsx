import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Categories', href: '/explore' },
  { label: 'Bundles', href: '/explore?category=Bundles' },
  { label: 'Fonts', href: '/explore?category=Fonts' },
  { label: 'Icons', href: '/explore?category=Icons' },
  { label: 'Presentations', href: '/explore?category=Presentations' },
  { label: 'Contact', href: '/#footer' },
];

export default function Header({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span
              className="text-2xl font-bold uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className={scrolled ? 'text-[#262626]' : 'text-white'}>Design</span>
              <span className="bg-gradient-to-r from-[#F89B72] to-[#7C93E0] bg-clip-text text-transparent">Vault</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-semibold transition-all duration-200 hover:text-[#F89B72] underline-offset-4 hover:underline ${
                  scrolled ? 'text-[#262626]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSearchOpen}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 ${
                scrolled ? 'text-[#262626] hover:bg-[#FFF6EE]' : 'text-white'
              }`}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            <button
              onClick={toggleCart}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 ${
                scrolled ? 'text-[#262626] hover:bg-[#FFF6EE]' : 'text-white'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart size={20} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#F89B72] text-white text-[10px] font-bold flex items-center justify-center animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center ${
                scrolled ? 'text-[#262626]' : 'text-white'
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-white p-6 flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between mb-8">
              <span
                className="text-xl font-bold uppercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Design<span className="text-[#F89B72]">Vault</span>
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} strokeWidth={2} />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="text-lg font-semibold text-[#262626] hover:text-[#F89B72] hover:translate-x-2 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
