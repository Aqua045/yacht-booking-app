import React from 'react';
import { Utensils, Anchor, Waves, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const CharterExperience: React.FC = () => {
  const experiences = [
    {
      icon: Utensils,
      title: 'Michelin-Caliber Onboard Gastronomy',
      description: 'Your private executive chef creates bespoke breakfast, lunch, and seven-course dinner tasting menus paired with sommelier-curated grand cru vintages.',
      stats: 'Private Chef on Every Charter'
    },
    {
      icon: Waves,
      title: 'State-of-the-Art Water Toy Armadas',
      description: 'Fly above the sea on Fliteboard eFoils, glide beneath the crystal surface with SeaBob F5 SR scooters, or explore sea caves on custom tenders.',
      stats: 'Unlimited Water Sports'
    },
    {
      icon: Anchor,
      title: 'Bespoke Freedom of the High Seas',
      description: 'Anchor in secluded turquoise coves unreachable by land. Wake up in Saint-Tropez, lunch off Corsican cliffs, and dine beneath the Monaco fireworks.',
      stats: 'Flexible Captain Routes'
    },
    {
      icon: Shield,
      title: 'Discretion, VIP Security & Helipads',
      description: 'Total privacy for high-profile families and executives. Certified touch-and-go helipads, satellite encrypted comms, and discrete 5-star service.',
      stats: '100% Guaranteed Privacy'
    },
  ];

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Five-Star Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-luxury uppercase tracking-tight">
            The Aura Marine Experience
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            A luxury yacht charter is not merely a vacation—it is an ultra-exclusive lifestyle tailored entirely to your desires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-navy-900/60 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-luxury"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-400 group-hover:shadow-gold-glow transition-all">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="text-base font-bold font-luxury text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] font-bold text-gold-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{exp.stats}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
