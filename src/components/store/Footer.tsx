import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setViewMode, setIsTrackingOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer id="atelier" className="bg-[#1F4D3A] text-[#FAF6EE] pt-16 pb-12 border-t border-[#C9A24B]/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* Miniature emblem */}
              <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" fill="#FAF6EE" />
                <circle cx="50" cy="50" r="43.5" stroke="#C9A24B" strokeWidth="2" fill="none" />
                <path
                  d="M 50 24 C 42 32, 35 44, 35 55 C 35 63, 42 70, 50 74 C 58 70, 65 63, 65 55 C 65 44, 58 32, 50 24 Z"
                  fill="#1F4D3A"
                />
                <line x1="50" y1="24" x2="50" y2="74" stroke="#FAF6EE" strokeWidth="1.5" />
                <path
                  d="M 36 78 C 44 83, 56 83, 64 78"
                  stroke="#C9A24B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <span className="text-xl font-bold font-brand-serif tracking-[0.24em] text-[#FAF6EE] block leading-none">
                  SHIFA
                </span>
                <span className="text-[10px] font-semibold tracking-[0.48em] text-[#C9A24B] uppercase mt-1 block leading-none font-brand-sans">
                  CLOTHING
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF6EE]/80 leading-relaxed max-w-sm">
              Shifa Clothing is a luxury bespoke atelier dedicated to the healing purity of natural textiles. Crafted from pure raw silks and unbleached organic flax, embroidered with artisanal gold needlework.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#C9A24B]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                <span className="text-[#FAF6EE]/90">Zero Synthetic Blends</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                <span className="text-[#FAF6EE]/90">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A24B]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EE]/75">
              <li><a href="#collections" className="hover:text-[#C9A24B] transition-colors">The Emerald Sovereign</a></li>
              <li><a href="#collections" className="hover:text-[#C9A24B] transition-colors">Normandy Linen Atelier</a></li>
              <li><a href="#collections" className="hover:text-[#C9A24B] transition-colors">Mulberry Silk Abayas</a></li>
              <li><a href="#collections" className="hover:text-[#C9A24B] transition-colors">Himalayan Pashmina</a></li>
              <li><a href="#collections" className="hover:text-[#C9A24B] transition-colors">Bespoke Custom Orders</a></li>
            </ul>
          </div>

          {/* Col 4: Atelier & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A24B]">
              Atelier Houses
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6EE]/75">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>DIFC Gate Avenue, Dubai, UAE</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>+92 300 8472910 / +971 4 819200</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>atelier@shifaclothing.com</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Brand Suite Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A24B]">
              Private Salon Dispatch
            </h4>
            <p className="text-xs text-[#FAF6EE]/75 leading-relaxed">
              Receive private previews of limited-run silk weaves and invitations to salon trunk shows.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white/10 border border-[#C9A24B]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C9A24B]"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#C9A24B] text-[#1F4D3A] hover:bg-[#C9A24B]/90 rounded-lg text-xs font-bold cursor-pointer shrink-0 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#C9A24B] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Welcome to the Shifa Salon.</span>
                </p>
              )}
            </form>

            <div className="pt-2">
              <button
                onClick={() => setViewMode('logo-studio')}
                className="w-full py-2 px-3 rounded-lg border border-[#C9A24B]/50 text-[#C9A24B] hover:bg-[#C9A24B]/15 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Inspect Logo & Vector Studio
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EE]/60">
          <p>© {new Date().getFullYear()} Shifa Clothing Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hover:text-[#C9A24B] cursor-pointer"
            >
              Order Tracking
            </button>
            <a href="#story" className="hover:text-[#C9A24B]">Bespoke Terms</a>
            <a href="#hero" className="hover:text-[#C9A24B]">Back to Top</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
