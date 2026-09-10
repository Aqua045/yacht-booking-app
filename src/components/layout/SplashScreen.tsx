import React, { useState, useEffect } from 'react';
import { Anchor, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check session storage so splash screen only shows once per browser session
    const hasSeenSplash = sessionStorage.getItem('yachtway_splash_seen');
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('yachtway_splash_seen', 'true');
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#04090f] flex flex-col items-center justify-center transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center space-y-6">
        {/* Glowing Anchor Logo */}
        <div className="relative w-24 h-24 rounded-full bg-[#091420] border-2 border-[#d4a359]/40 flex items-center justify-center shadow-2xl gold-pulse">
          <Anchor className="w-12 h-12 text-[#d4a359] animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-0 rounded-full border border-[#d4a359]/20 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        {/* Brand Title */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-black font-luxury text-white tracking-[0.25em] uppercase">
            YACHT<span className="text-[#d4a359]">WAY</span>
          </h1>
          <p className="text-[10px] sm:text-xs font-bold text-[#d4a359] uppercase tracking-[0.35em] mt-2">
            LUXURY YACHT CHARTERS · MUMBAI
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-[#091420] rounded-full overflow-hidden border border-white/10">
          <div className="h-full bg-gradient-to-r from-[#d4a359] via-amber-300 to-[#d4a359] animate-pulse rounded-full w-full" />
        </div>
      </div>
    </div>
  );
};
