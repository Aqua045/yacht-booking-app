import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Where is the yacht boarding location in Mumbai?',
      answer:
        'All YachtWay charters depart directly from Jetty No. 5 (opposite The Taj Mahal Palace Hotel), Gateway of India, Colaba, Mumbai. Our concierge escort will meet you at the jetty and assist you with private tender boarding.',
    },
    {
      question: 'What are the best time slots for sailing in Mumbai?',
      answer:
        'Our most popular slot is the Sunset Cruise (04:30 PM – 06:30 PM) which offers golden hour panoramic views of Mumbai skyline and the Arabian Sea. We also offer Sunrise Sails (07:00 AM – 09:00 AM) with calm seas and Starlight Dinner Cruises (08:00 PM onwards).',
    },
    {
      question: 'Can we bring our own birthday cake, food, and music playlist?',
      answer:
        'Yes! You are welcome to connect via Bluetooth to our onboard high-definition sound systems. You can also bring your own refreshments, or pre-book our customized Birthday/Anniversary packs which include designer cakes, balloon decor, and gourmet catering.',
    },
    {
      question: 'Is yacht sailing safe for children and senior citizens?',
      answer:
        'Absolutely. All YachtWay vessels are DG Shipping approved, fully insured, and equipped with life jackets for all age groups (including infants and children), first-aid kits, and trained maritime crew.',
    },
    {
      question: 'What happens in case of heavy rain or bad weather?',
      answer:
        'Passenger safety is our highest priority. If sea conditions are unsuitable or Coast Guard advisories are active, we provide 100% free date rescheduling or a full refund as per your preference.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#081017] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-luxury uppercase tracking-wide text-white mb-3">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Quick answers to common questions about booking, boarding, and sailing with YachtWay.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0b1622] border border-[#1b2f42] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#d4a359]/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-sans flex items-center gap-3">
                    <span className="text-[#d4a359] text-xs font-mono">0{idx + 1}.</span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d4a359] transform transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#162738]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
