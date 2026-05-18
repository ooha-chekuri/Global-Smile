import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  UserCircle, 
  SignOut, 
  Layout, 
  UsersThree,
  ShieldCheck,
  House
} from "@phosphor-icons/react/dist/ssr";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const isSpecialist = session.user.role === "specialist" || session.user.email === "specialist@globalsmile.in";
  const isDentist = session.user.role === "dentist" || session.user.email === "dentist@globalsmile.in";

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-brand-teal rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-teal/20 group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="font-bold text-gray-900 tracking-tight group-hover:text-brand-teal transition-colors">Global Smile <span className="text-brand-gold font-light">Portal</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            {isSpecialist ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 text-brand-teal hover:text-brand-teal transition-colors">
                  <Layout size={18} weight="bold" /> Cases
                </Link>
                <Link href="/referral" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <UsersThree size={18} /> Referring GPs
                </Link>
              </>
            ) : isDentist ? (
              <>
                <Link href="/referral/dashboard" className="flex items-center gap-2 text-brand-teal hover:text-brand-teal transition-colors">
                  <Layout size={18} weight="bold" /> My Referrals
                </Link>
                <Link href="/trust" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <ShieldCheck size={18} /> Trust Audit
                </Link>
              </>
            ) : (
              <>
                <Link href="/patient/dashboard" className="flex items-center gap-2 text-brand-teal hover:text-brand-teal transition-colors">
                  <House size={18} weight="bold" /> My Journey
                </Link>
                <Link href="/trust" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <ShieldCheck size={18} /> Trust Wall
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gray-900">{session.user.name}</span>
              <span className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{isSpecialist ? "Prosthodontist" : "Patient"}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shadow-inner overflow-hidden">
               {session.user.image ? <img src={session.user.image} alt="" className="h-full w-full object-cover" /> : <UserCircle size={24} />}
            </div>
            <Link
              href="/api/auth/signout"
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <SignOut size={20} />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
