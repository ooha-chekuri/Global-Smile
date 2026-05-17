export default function VideoTestimonial() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Video Testimonials
      </h2>
      <div className="bg-white border rounded-xl p-6">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          <div className="text-center">
            <svg className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Video testimonial coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
