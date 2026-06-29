import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import SearchModal from '@/components/SearchModal';
import Toast from '@/components/Toast';
import NewsletterBar from '@/components/NewsletterBar';
import ScrollProgress from '@/components/ScrollProgress';

import Home from '@/pages/Home';
import Explore from '@/pages/Explore';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen">
      {/* Global gradient background */}
      <div
        className="fixed inset-0 gradient-bg -z-10"
        style={{ animation: 'gradient-shift 20s linear infinite' }}
      />

      <ScrollProgress />
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <CartSidebar />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toast />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </main>

      <Footer />
      {isHome && <NewsletterBar />}
    </div>
  );
}

export default App;
