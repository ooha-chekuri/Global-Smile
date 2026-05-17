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
    <div className={`space-y-24 ${standalone ? 'max-w-4xl mx-auto px-6 py-16' : ''}`}>
      {standalone && (
        <div className="text-center space-y-4">
          <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em]">Trust-Chain Verification</h2>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">Audit Our Clinical Standards</p>
        </div>
      )}
      
      <CredentialWall />
      <SterilizationStatus />
      <PhotoCarousel />
      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse rounded-xl" />}>
        <MilestoneFeed />
      </Suspense>
      <GoogleReviews />
      <VideoTestimonial />
    </div>
  );
}
