"use client";

import { Star } from "@phosphor-icons/react";

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
          className={i < count ? "text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        What Our Patients Say
      </h2>
      <p className="text-gray-500 mb-6">
        Real feedback from patients across India and around the world.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.location}</p>
                </div>
              </div>
              <StarRating count={review.rating} />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-2">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="text-xs text-gray-400 mt-2">{review.date}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61235.80916384012!2d80.5840455513672!3d16.5061743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35efff5e7e1e3b%3A0x8b9b5f5c5e0c5b0!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "250px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Practice Location - Vijayawada"
          />
        </div>
        <div className="p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Global Smile Prosthodontics
            </p>
            <p className="text-xs text-gray-500">Vijayawada, Andhra Pradesh, India</p>
          </div>
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            <Star size={16} weight="fill" />
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
}
