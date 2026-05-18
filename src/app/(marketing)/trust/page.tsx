import TrustPortal from "@/components/trust/TrustPortal";

export default function TrustPage() {
  return (
    <div className="flex-1 bg-white">
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-32 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-teal/5 border border-brand-teal/10">
             <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
             <span className="text-brand-teal text-[10px] font-bold uppercase tracking-[0.2em]">Clinical Transparency Protocol</span>
          </div>
          
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tighter text-gray-900 leading-[0.9]">
            Credential & Protocol <br />
            <span className="text-gray-400 font-light italic">Verification Audit.</span>
          </h1>
          
          <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Direct access to our verified clinical certifications, sterilization logs, 
            and real-time anonymized patient milestones. Built on evidence, not promises.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <TrustPortal standalone={false} />
      </div>
    </div>
  );
}

