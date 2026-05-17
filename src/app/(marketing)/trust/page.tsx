import { Suspense } from "react";
import CredentialWall from "@/components/trust/CredentialWall";
import SterilizationStatus from "@/components/trust/SterilizationStatus";
import PhotoCarousel from "@/components/trust/PhotoCarousel";
import MilestoneFeed from "@/components/trust/MilestoneFeed";
import GoogleReviews from "@/components/trust/GoogleReviews";
import VideoTestimonial from "@/components/trust/VideoTestimonial";

export default function TrustPage() {
  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Trust-Chain Verification Dashboard
          </h1>
          <p className="text-teal-100 text-lg">
            Every credential. Every protocol. Every milestone. See it all here.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <CredentialWall />
        <SterilizationStatus />
        <PhotoCarousel />
        <Suspense
          fallback={
            <div className="text-center py-8 text-gray-400">
              Loading milestones...
            </div>
          }
        >
          <MilestoneFeed />
        </Suspense>
        <GoogleReviews />
        <VideoTestimonial />
      </section>
    </div>
  );
}
