import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="gradient-orbit" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pb-6 pt-4 sm:px-12">
        <div className="flex items-center gap-3">
          <div className="pill flex items-center gap-2 px-3 py-1 text-xs text-slate-200">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.6)]">
              ✚
            </span>
            <span className="font-medium tracking-wide">
              LiffeyCare Hospital · Dublin 8
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-4 text-sm text-slate-200/80 sm:flex">
          <span>24/7 Emergency</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span>Same‑day clinics</span>
        </div>
      </div>

      <main className="relative z-20 grid w-full max-w-6xl grid-cols-1 items-center gap-10 pt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs text-cyan-200 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.35)]" />
            <span className="uppercase tracking-[0.2em] text-slate-300 text-[0.7rem]">
              Dublin · Patient portal
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Book your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                LiffeyCare
              </span>{" "}
              appointments online.
            </h1>
            <p className="max-w-lg text-balance text-sm leading-relaxed text-slate-300/85 sm:text-[0.95rem]">
              A calm patient portal for Dublin — check times, confirm visits and
              get reminders without sitting on hold.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="primary-button inline-flex items-center justify-center px-6 py-2.5 text-sm"
            >
              Get started as a patient
              <span className="ml-2 text-base">→</span>
            </Link>
            <Link
              href="/login"
              className="subtle-link inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/40 px-5 py-2.5 text-sm"
            >
              I already have an account
            </Link>
          </div>

          <div className="grid max-w-xl grid-cols-2 gap-3 text-xs text-slate-300/90 sm:text-[0.78rem]">
            <div className="card-border">
              <div className="card-inner flex h-full flex-col justify-between p-3.5">
                <div className="mb-2 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
                  <span className="h-1 w-1 rounded-full bg-cyan-400" />
                  <span>For patients</span>
                </div>
                <p className="text-[0.8rem] leading-relaxed text-slate-200">
                  See real‑time availability, book follow‑ups, and receive SMS
                  reminders before your visit.
                </p>
              </div>
            </div>
            <div className="card-border">
              <div className="card-inner flex h-full flex-col justify-between p-3.5">
                <div className="mb-2 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span>For clinicians</span>
                </div>
                <p className="text-[0.8rem] leading-relaxed text-slate-200">
                  A clearer clinic list every day — with fewer DNAs and
                  smarter triage for urgent slots.
                </p>
              </div>
            </div>
          </div>

          <p className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-slate-500">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-500/80 to-transparent" />
            Built for Irish healthcare, powered by secure cloud infrastructure.
            <span className="hidden h-px w-6 bg-gradient-to-r from-slate-500/80 to-transparent sm:block" />
          </p>
        </section>

        <section className="relative">
          <div className="glass-panel relative mx-auto flex max-w-md flex-col gap-5 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3 text-xs text-slate-300/90">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-slate-400">
                  A calmer waiting room
                </p>
                <p className="mt-1 text-[0.8rem] text-slate-100">
                  LiffeyCare outpatient entrance · Dublin 8
                </p>
              </div>
              <div className="pill flex items-center gap-2 px-3 py-1 text-[0.7rem] text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.3)]" />
                <span>Patient portal first</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-slate-900/80" />
              <Image
                src="/hospital-hero.svg"
                alt="Illustration of a modern Dublin hospital lobby with calm patients checking in digitally"
                width={640}
                height={480}
                className="relative z-10 h-auto w-full"
                priority
              />
            </div>

            <div className="flex items-center justify-between text-[0.72rem] text-slate-400">
              <p className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cyan-300" />
                Built for Irish healthcare · hosted in EU regions.
              </p>
              <p>HSE‑aligned · GDPR‑ready</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
