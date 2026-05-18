"use client";

import { Star, MapPin, ChatCenteredDots, GoogleLogo } from "@phosphor-icons/react";

const REVIEWS = [
  {
    name: "Rajesh K.",
    location: "Hyderabad",
    rating: 5,
    text: "Came to Dr. Chekuri for full-arch rehabilitation after years of suffering. The team explained every step, and the result is life-changing. Saved 60% compared to Hyderabad quotes.",
    date: "2 months ago",
  },
  {
    name: "Sarah T.",
    location: "London, UK",
    rating: 5,
    text: "Combined a dental tourism trip with a visit to Andhra Pradesh. The clinic is world-class — digital scans, same-day temporaries, impeccable sterilization protocols. Half the cost of London.",
    date: "1 month ago",
  },
  {
    name: "Priya M.",
    location: "Vijayawada",
    rating: 5,
    text: "Finally a specialist clinic in Vijayawada with international standards. My implant surgery was painless and the follow-up care has been outstanding. Highly recommend.",
    date: "3 weeks ago",
  },
  {
    name: "Michael R.",
    location: "Sydney, Australia",
    rating: 5,
    text: "Was skeptical about dental tourism but the transparent pricing and video consultations put me at ease. The full treatment plan was cheaper than my airfare would have been back home.",
    date: "2 weeks ago",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < count ? "fill" : "regular"}
          className={i < count ? "text-amber-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="space-y-12">
      <div className="flex items-center gap-6">
         <h2 className="text-2xl font-bold text-gray-900 tracking-tight shrink-0 flex items-center gap-3">
            <ChatCenteredDots size={28} className="text-brand-teal" weight="fill" />
            Patient Testimonials
         </h2>
         <div className="h-px bg-gray-100 flex-1" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-brand-teal/5 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-[2rem] -mr-8 -mt-8 group-hover:bg-brand-teal/5 transition-colors" />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-brand-teal/5 border border-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-lg shadow-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 tracking-tight">{review.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin size={12} weight="fill" className="text-brand-teal/40" /> {review.location}
                  </p>
                </div>
              </div>
              <StarRating count={review.rating} />
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed font-light relative z-10 italic">
              &ldquo;{review.text}&rdquo;
            </p>
            
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
               <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">{review.date}</p>
               <GoogleLogo size={18} weight="bold" className="text-gray-200 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-teal/5 transition-all group">
        <div className="aspect-video w-full relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61235.80916384012!2d80.5840455513672!3d16.5061743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35efff5e7e1e3b%3A0x8b9b5f5c5e0c5b0!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "350px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Practice Location - Vijayawada"
            className="grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50/50 backdrop-blur-sm">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-lg font-bold text-gray-900 tracking-tight">
              Global Smile Centre <span className="text-brand-gold font-light italic ml-1">Prosthodontics</span>
            </p>
            <p className="text-xs text-gray-400 font-light flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest">
              <MapPin size={14} weight="fill" className="text-brand-teal" /> Vijayawada, Andhra Pradesh, India
            </p>
          </div>
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-ink text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-teal transition-all shadow-xl shadow-brand-ink/10 active:scale-95 group"
          >
            <Star size={16} weight="fill" className="text-brand-gold group-hover:scale-110 transition-transform" />
            Publish Audit Review
          </a>
        </div>
      </div>
    </section>
  );
}
