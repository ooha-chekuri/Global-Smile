import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex-1">
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-semibold text-teal-600">Global Smile Portal</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">{session.user.email}</span>
            <Link
              href="/api/auth/signout"
              className="text-gray-400 hover:text-gray-600"
            >
              Sign out
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
