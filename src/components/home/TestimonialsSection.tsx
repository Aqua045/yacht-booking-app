import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Rohan & Ananya Mehra',
      location: 'Bandra, Mumbai',
      occasion: 'Sunset Marriage Proposal on Royal Horizon',
      rating: 5,
      comment:
        'The proposal on Royal Horizon was magical beyond words! The captain timed the golden hour view right in front of Gateway of India. The champagne and cake setup were ready when we boarded. Thank you YachtWay!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      date: 'Chartered Aug 2026',
    },
    {
      name: 'Kunal Deshmukh',
      location: 'Worli, Mumbai',
      occasion: '30th Birthday Party on Blue Infinity',
      rating: 5,
      comment:
        'Hosted 14 friends for my 30th birthday. The sound system was incredible, and the crew was attentive throughout. Booking online took literally 2 minutes with the exact time slot we wanted.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      date: 'Chartered Aug 2026',
    },
    {
      name: 'Pooja Singhal',
      location: 'Juhu, Mumbai',
      occasion: 'Family Sunset Cruise on Ocean Majesty',
      rating: 5,
      comment:
        'Super smooth sailing experience with my parents and kids. Very safe, clean cabins, and the sunset over the Arabian Sea was breathtaking. Highly recommend YachtWay for family celebrations!',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      date: 'Chartered July 2026',
    },
  ];

  return (
    <section className="py-24 bg-[#060c12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            GUEST EXPERIENCES
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-luxury uppercase tracking-wide text-white mb-4">
            LOVED BY 10,000+ GUESTS
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Read real stories and verified reviews from guests who celebrated their special milestones aboard our Mumbai fleet.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#0b1622] border border-[#1b2f42] rounded-xl p-7 flex flex-col justify-between shadow-xl relative group hover:border-[#d4a359]/60 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[#d4a359]/20 absolute top-5 right-5 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#d4a359] fill-[#d4a359]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-4 border-t border-[#162738] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#d4a359]/50"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  </h4>
                  <span className="text-[10px] text-[#d4a359] block">{rev.occasion}</span>
                  <span className="text-[10px] text-slate-500">{rev.location} • {rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
