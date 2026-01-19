/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

export default function LoginPage() {
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
      router.push("/app");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong logging in.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel w-full max-w-md p-6 sm:p-7">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          Welcome back
        </h2>
        <p className="text-sm text-slate-300/85">
          Sign in with the email your clinic used when inviting you to the
          LiffeyCare patient portal.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5 text-sm">
          <label
            htmlFor="email"
            className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            className="input"
            placeholder="you@example.ie"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
            >
              Password
            </label>
            <Link href="/forgot-password" className="subtle-link">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="primary-button flex w-full items-center justify-center px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? "Signing you in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-400">
        New to LiffeyCare?{" "}
        <Link href="/signup" className="subtle-link">
          Create your patient account
        </Link>
      </p>
    </div>
  );
}


