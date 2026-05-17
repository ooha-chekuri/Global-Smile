import { Suspense } from "react";
import CredentialWall from "@/components/trust/CredentialWall";
import SterilizationStatus from "@/components/trust/SterilizationStatus";
import PhotoCarousel from "@/components/trust/PhotoCarousel";
import MilestoneFeed from "@/components/trust/MilestoneFeed";
import GoogleReviews from "@/components/trust/GoogleReviews";
import VideoTestimonial from "@/components/trust/VideoTestimonial";

import TrustPortal from "@/components/trust/TrustPortal";

export default function TrustPage() {
  return (
    <div className="flex-1 bg-white">
      <section className="border-b border-gray-100 bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Verification Layer</p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-900 tracking-tight mb-4">
            Trust-Chain Dashboard
          </h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Direct access to our clinical credentials, sterilization protocols, 
            and real-time patient journey milestones.
          </p>
        </div>
      </section>

      <TrustPortal standalone={false} />
    </div>
  );
}

