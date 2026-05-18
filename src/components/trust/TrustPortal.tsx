import CredentialWall from "./CredentialWall";
import SterilizationStatus from "./SterilizationStatus";
import PhotoCarousel from "./PhotoCarousel";
import MilestoneFeed from "./MilestoneFeed";
import GoogleReviews from "./GoogleReviews";
import VideoTestimonial from "./VideoTestimonial";
import { Suspense } from "react";

interface TrustPortalProps {
  standalone?: boolean;
}

export default function TrustPortal({ standalone = true }: TrustPortalProps) {
  return (
    <div className={`space-y-32 ${standalone ? 'max-w-7xl mx-auto px-6 py-24' : ''}`}>
      {standalone && (
        <div className="text-center space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/5 border border-brand-teal/10">
             <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
             <span className="text-brand-teal text-[10px] font-bold uppercase tracking-[0.2em]">Live Clinical Audit</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter">Verified Protocol Standards</h2>
        </div>
      )}
      
      <CredentialWall />
      <SterilizationStatus />
      
      <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
         <div className="lg:col-span-7">
            <PhotoCarousel />
         </div>
         <div className="lg:col-span-5">
            <VideoTestimonial />
         </div>
      </div>

      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse rounded-[2rem] border border-gray-100" />}>
        <MilestoneFeed />
      </Suspense>

      <GoogleReviews />
    </div>
  );
}
