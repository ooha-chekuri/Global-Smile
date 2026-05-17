import VisualizerModule from "@/components/visualizer/VisualizerModule";

export default function VisualizerPage() {
  return (
    <div className="flex-1 bg-white">
      <section className="border-b border-gray-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">
            Stage 1: Visual Assessment
          </p>
          <h1 className="mb-4 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900">
            AI Treatment Visualizer
          </h1>
          <p className="text-lg font-light leading-relaxed text-gray-500">
            Upload clinical photos and provide a brief concern to generate an educational
            restorative pathway summary for the patient journey.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <VisualizerModule />
      </section>
    </div>
  );
}