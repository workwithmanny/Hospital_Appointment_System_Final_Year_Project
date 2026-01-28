/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import { Stethoscope, ArrowLeft } from "lucide-react";

export default function DoctorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = supabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.push("/doctor/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong logging in.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column: Form */}
      <main className="flex w-full flex-col justify-center px-6 py-12 lg:w-[45%] lg:px-12 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Navigation Header */}
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-105">
                <span className="font-bold text-lg">✚</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Liffey<span className="text-blue-600">Care</span>
              </span>
            </Link>
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </div>

          {/* Login Form */}
          <div className="glass-panel w-full max-w-md p-6 sm:p-7">
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  Healthcare Professional Login
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                Sign in to access the LiffeyCare provider portal. Manage appointments, view patient records, and update schedules.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  placeholder="doctor@liffeycare.ie"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                  >
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="rounded-2xl border-2 border-red-500/60 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75 transition-all"
              >
                {loading ? "Signing you in…" : "Sign in to Portal"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              New healthcare provider?{" "}
              <Link href="/doctor/signup" className="font-bold text-blue-600 hover:text-blue-700">
                Register your account
              </Link>
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-center text-xs text-slate-400 mb-3">Patient portal</p>
              <Link 
                href="/login" 
                className="block text-center text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign in as patient →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Right Column: Visual */}
      <aside className="hidden lg:flex lg:w-[55%] relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
        
        {/* Floating Info Card */}
        <div className="absolute bottom-12 left-12 max-w-lg space-y-6 rounded-[2rem] border border-white/20 bg-white/10 p-10 backdrop-blur-xl z-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white leading-tight">
              Streamline your practice <br />
              <span className="text-blue-200">with digital tools.</span>
            </h2>
            <p className="text-blue-50 text-lg leading-relaxed">
              Join over 500 healthcare professionals managing appointments, 
              accessing patient records, and coordinating care across Dublin.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-blue-400 bg-slate-200" />
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Trusted by medical professionals
            </p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute top-12 right-12 rounded-full bg-white/90 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-widest text-slate-800 shadow-xl backdrop-blur-md z-10">
          🏥 St. James&apos;s Campus, Dublin
        </div>
      </aside>
    </div>
  );
}

