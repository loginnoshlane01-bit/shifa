import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF6EE] border-b border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
            Verified Patron Testimonials
          </p>
          <h2 className="text-3xl font-bold font-brand-serif text-[#1F4D3A]">
            The Feeling of Pure Shifa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-[#C9A24B]/25 flex flex-col justify-between space-y-4 hover:border-[#C9A24B] transition-colors"
            >
              <div className="space-y-3">
                {/* Stars & Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#C9A24B]/30" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#1F4D3A]/80 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-[#C9A24B]/15 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1F4D3A] flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#1F4D3A]" />
                  </h4>
                  <p className="text-[10px] text-[#1F4D3A]/50">{rev.location}</p>
                </div>
                <span className="text-[10px] text-[#C9A24B] font-semibold bg-[#FAF6EE] px-2 py-0.5 rounded">
                  {rev.verifiedPurchase}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
