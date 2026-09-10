import React from 'react';
import { Anchor, ShieldCheck, Award, Clock, MapPin, Mail, Phone, Globe, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050a0f] border-t border-[#1b2f42] pt-16 pb-12 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#d4a359]/60 bg-navy-900 flex items-center justify-center">
                <Anchor className="w-4 h-4 text-[#d4a359]" />
              </div>
              <span className="text-xl font-bold tracking-wider uppercase font-luxury text-white">
                YACHT<span className="text-[#d4a359]">WAY</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Mumbai's premier luxury yacht charter company. Providing unforgettable sunset cruises, private birthday parties, romantic sailing, and high-speed coastal adventures from Gateway of India to Alibaug and Mandwa.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Jetty No. 5, Gateway of India, Colaba, Mumbai</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>+91 98765 43210 / +91 98201 54321</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>reservations@yachtway.in</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#d4a359] uppercase tracking-widest mb-4 font-luxury">
              Our Fleet
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#fleet" className="hover:text-[#d4a359] transition-colors">Ocean Majesty</a></li>
              <li><a href="#fleet" className="hover:text-[#d4a359] transition-colors">Royal Horizon</a></li>
              <li><a href="#fleet" className="hover:text-[#d4a359] transition-colors">Blue Infinity</a></li>
              <li><a href="#fleet" className="hover:text-[#d4a359] transition-colors">Sea Princess (Speed Boat)</a></li>
              <li><a href="#fleet" className="hover:text-[#d4a359] transition-colors">Majestic Empress (Party)</a></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-xs font-bold text-[#d4a359] uppercase tracking-widest mb-4 font-luxury">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#destinations" className="hover:text-[#d4a359] transition-colors">Gateway of India</a></li>
              <li><a href="#destinations" className="hover:text-[#d4a359] transition-colors">Alibaug Coastal Escape</a></li>
              <li><a href="#destinations" className="hover:text-[#d4a359] transition-colors">Elephanta Island</a></li>
              <li><a href="#destinations" className="hover:text-[#d4a359] transition-colors">Mandwa Beach</a></li>
              <li><a href="#destinations" className="hover:text-[#d4a359] transition-colors">Mumbai Harbour Cruise</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-[#d4a359] uppercase tracking-widest mb-4 font-luxury">
              VIP Updates
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for exclusive weekend sunset offers and monsoon yacht packages.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to YachtWay updates!');
              }}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0b1622] border border-[#1b2f42] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#162636] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 YachtWay Mumbai. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-400">Terms of Charter</a>
            <a href="#" className="hover:text-slate-400">Safety & Maritime Guidelines</a>
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#contact" className="hover:text-slate-400">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
