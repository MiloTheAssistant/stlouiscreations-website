import type { Metadata } from "next";
import Link from "next/link";
import { getAdminSession } from "@/lib/admin/session";
import JdsImportWidget from "@/app/admin/JdsImportWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminPageProps {
  searchParams?: {
    error?: string;
  };
}

function errorMessage(error?: string): string | null {
  if (error === "forbidden") {
    return "This Vercel account is not allowed to access the admin page.";
  }

  if (error === "auth") {
    return "The Vercel sign-in attempt could not be completed.";
  }

  return null;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await getAdminSession();
  const error = errorMessage(searchParams?.error);

  if (!session) {
    return (
      <div className="min-h-[70vh] bg-background px-6 py-20">
        <section className="mx-auto max-w-xl border border-white/10 bg-surface p-8 shadow-2xl shadow-black/30">
          <p className="font-display text-xs uppercase tracking-wider text-primary">
            St. Louis Creations
          </p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-wide text-text">
            Admin
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Sign in with the approved Vercel account to manage private catalog
            workflows.
          </p>
          {error && (
            <p className="mt-5 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
          <Link
            href="/api/auth/login"
            className="mt-7 inline-flex min-h-12 items-center justify-center bg-primary px-6 font-display text-xs font-bold uppercase tracking-wider text-white transition-shadow hover:shadow-glow-sm"
          >
            Sign In With Vercel
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-wider text-primary">
              Admin Console
            </p>
            <h1 className="mt-2 font-display text-4xl font-black uppercase tracking-wide text-text">
              Product Catalog
            </h1>
            <p className="mt-2 text-sm text-muted">{session.email}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="min-h-11 border border-white/10 px-5 font-display text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-primary/50 hover:text-text"
            >
              Sign Out
            </button>
          </form>
        </header>
        <JdsImportWidget />
      </div>
    </div>
  );
}
