"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

export default function AppHomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = supabaseBrowserClient();

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? null);
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="gradient-orbit" />
        <div className="glass-panel px-6 py-4 text-sm text-slate-200">
          Checking your session…
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col px-4 py-6 sm:px-10 sm:py-8">
      <div className="gradient-orbit" />

      <header className="relative z-20 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="pill flex items-center gap-2 px-3 py-1">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.6)]">
              ✚
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-100">
              LiffeyCare · Patient portal
            </span>
          </Link>
          <span className="hidden text-xs text-slate-400 sm:inline">
            Signed in as{" "}
            <span className="font-medium text-slate-200">{email}</span>
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="subtle-link rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1.5 text-xs"
        >
          Sign out
        </button>
      </header>

      <main className="relative z-20 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="space-y-4">
          <div className="glass-panel p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-400">
                  Today at LiffeyCare
                </p>
                <p className="mt-1 text-sm text-slate-100">
                  Your appointment overview
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[0.7rem] text-emerald-300">
                Demo environment
              </span>
            </div>

            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-3">
                <p className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400">
                  Next appointment
                </p>
                <p className="mt-2 text-sm font-medium text-slate-50">
                  Dr. Ní Bhraonáin · Cardiology
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Wednesday · 09:20 · Outpatients · St. James&apos;s Campus
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-3">
                <p className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400">
                  Reminders
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-200">
                  <li>• Bring a list of medications you currently take</li>
                  <li>• Arrive 10 minutes early for check‑in</li>
                  <li>• Update your contact details if they&apos;ve changed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between text-xs">
              <p className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400">
                Appointment timeline
              </p>
              <span className="rounded-full bg-slate-900/60 px-2.5 py-1 text-[0.7rem] text-slate-300">
                Coming soon · powered by Supabase
              </span>
            </div>
            <p className="mb-3 text-xs text-slate-300/90">
              This is where we&apos;ll surface upcoming and previous appointments,
              pulled directly from your Supabase-backed schedules.
            </p>
            <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/60 px-4 py-3 text-xs text-slate-300">
              <span>Next step: connect Supabase tables for clinics and slots.</span>
              <span className="hidden text-[0.7rem] text-cyan-300 sm:inline">
                We&apos;ll wire this up in the next phase.
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="glass-panel p-5 sm:p-6">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400">
              Profile snippet
            </p>
            <div className="mt-3 space-y-1 text-sm text-slate-200">
              <p>{email}</p>
              <p className="text-xs text-slate-400">
                In a full build, this card will show your NHS number (if
                applicable), GP, and emergency contact details.
              </p>
            </div>
          </div>

          <div className="glass-panel p-5 sm:p-6">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400">
              What&apos;s next
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
              <li>• Hook this dashboard up to Supabase tables for appointments.</li>
              <li>• Add role‑based access for clinicians vs patients.</li>
              <li>• Build booking flows for outpatient clinics and procedures.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}


