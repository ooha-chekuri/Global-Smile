import Link from "next/link";

const modules = [
  {
    title: "AI Treatment Visualizer",
    description:
      "Upload a photo and describe your concern. Get a plain-language report showing restorative possibilities, complexity tier, and next steps.",
    href: "/visualizer",
    icon: "🔍",
    color: "from-teal-500 to-teal-700",
  },
  {
    title: "Dental Tourism Calculator",
    description:
      "Compare treatment costs in Vijayawada vs. New York, London, and Sydney. See your net savings including flights and stay.",
    href: "/calculator",
    icon: "💰",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    title: "Trust Dashboard",
    description:
      "Verify our credentials, sterilization protocols, and live anonymized patient milestones. Total transparency.",
    href: "/trust",
    icon: "🛡️",
    color: "from-cyan-500 to-cyan-700",
  },
  {
    title: "GP Referral Portal",
    description:
      "Secure referral portal for general dentists. Submit cases, track status, and receive closure summaries.",
    href: "/auth/signin",
    icon: "🔄",
    color: "from-teal-600 to-teal-800",
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            World-Class Prosthodontics in{" "}
            <span className="text-teal-200">Vijayawada</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto mb-8">
            Transparency. Trust. Technology. See why patients from around the
            world choose Global Smile for complex restorative dental care.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/visualizer"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-teal-700 px-6 py-3 font-semibold hover:bg-teal-50 transition-colors"
            >
              See Your Smile Potential
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-400 text-teal-100 px-6 py-3 font-semibold hover:bg-teal-600/50 transition-colors"
            >
              Calculate Your Savings
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${mod.color} transition-opacity`}
              />
              <span className="text-2xl mb-3 block" role="img" aria-hidden>
                {mod.icon}
              </span>
              <h3 className="font-semibold text-gray-800 mb-2">{mod.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {mod.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-t py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Global Smile?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            {[
              { title: "60-80% Cost Savings", desc: "vs. US/UK for equivalent specialist procedures" },
              { title: "Specialist-Only Care", desc: "MDS Prosthodontics, not general dentistry" },
              { title: "Full Transparency", desc: "Credentials, costs, milestones — all visible" },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-teal-700 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4 text-center text-sm text-gray-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-teal-600">Global Smile</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-600">
              Privacy Policy
            </Link>
            <Link href="/trust" className="hover:text-gray-600">
              Trust Dashboard
            </Link>
          </div>
          <span>&copy; {new Date().getFullYear()} Global Smile. Not a medical platform.</span>
        </div>
      </footer>
    </div>
  );
}
