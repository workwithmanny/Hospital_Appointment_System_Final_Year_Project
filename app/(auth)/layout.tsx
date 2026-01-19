import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-stretch justify-center px-4 py-8 sm:px-8">
      <div className="gradient-orbit" />

      <div className="relative z-20 grid w-full max-w-5xl grid-cols-1 gap-10 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-[0_28px_120px_rgba(15,23,42,0.95)] backdrop-blur-3xl sm:p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <section className="flex flex-col justify-between gap-6 border-b border-slate-800/70 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="pill flex items-center justify-center px-3 py-1 text-xs text-cyan-200">
                <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.5)]">
                  ✚
                </span>
                <span className="font-medium tracking-wide">
                  LiffeyCare Hospital
                </span>
              </div>
            </Link>
            <p className="hidden text-[0.78rem] text-slate-400 sm:block">
              Dublin 8 · St. James&apos;s Campus
            </p>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Your appointments,
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                all in one calm timeline.
              </span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-slate-300/85">
              Securely access upcoming and past visits, letters, and results for
              LiffeyCare clinics. Hosted in the EU and aligned with Irish
              healthcare standards.
            </p>
          </div>

          <div className="mt-auto space-y-2 text-[0.78rem] text-slate-400">
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Backed by Supabase auth · data stays in EU regions.
            </p>
            <p>Need help? Ask your clinic to resend your patient portal invite.</p>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">{children}</div>
        </section>
      </div>
    </div>
  );
}


