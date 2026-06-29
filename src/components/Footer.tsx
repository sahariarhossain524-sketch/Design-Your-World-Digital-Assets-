import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const shopLinks = ['Icons', 'Fonts', 'Templates', 'Presentations', 'Mockups', 'UI Kits'];
const companyLinks = ['About Us', 'Blog', 'Careers', 'Press', 'Contact'];
const supportLinks = ['Help Center', 'Licensing', 'Terms of Service', 'Privacy Policy', 'Refund Policy'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const ref = useScrollAnimation<HTMLElement>({ y: 30, stagger: 0.1, children: true });

  return (
    <footer id="footer" ref={ref} className="bg-[#262626] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-white/10 mb-12">
          <div>
            <h4 className="text-xl font-bold uppercase mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Stay in the Loop
            </h4>
            <p className="text-sm text-white/60">Get updates on new assets, bundles, and exclusive deals.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-[280px] h-11 px-4 rounded-lg border border-white/20 bg-transparent text-white text-sm placeholder:text-white/40 focus:border-[#F89B72] focus:outline-none transition-colors"
            />
            <button className="btn-primary shrink-0 h-11 px-6">Subscribe</button>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold uppercase block mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Design<span className="text-[#F89B72]">Vault</span>
            </span>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Premium digital assets for creative professionals.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-white hover:text-[#F89B72] transition-colors">
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="text-sm font-bold uppercase text-[#F89B72] mb-4">Shop</h5>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link}>
                  <Link to={`/explore?category=${link}`} className="text-sm text-white/70 hover:text-[#F89B72] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-sm font-bold uppercase text-[#F89B72] mb-4">Company</h5>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/70 hover:text-[#F89B72] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-sm font-bold uppercase text-[#F89B72] mb-4">Support</h5>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/70 hover:text-[#F89B72] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2024 DesignVault. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {['Visa', 'MC', 'Amex', 'PayPal', 'Stripe'].map((name) => (
              <span key={name} className="text-[10px] font-semibold text-white/30 uppercase tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
