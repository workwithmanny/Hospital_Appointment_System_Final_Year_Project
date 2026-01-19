"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const supabase = supabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/update-password`
              : undefined,
        }
      );

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setMessage(
        "If an account exists for that address, we’ve emailed you a secure link to reset your password."
      );
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Something went wrong requesting a reset.";
      setError(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel w-full max-w-md p-6 sm:p-7">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          Reset your password
        </h2>
        <p className="text-sm text-slate-300/85">
          Enter the email linked to your LiffeyCare account. We&apos;ll send you
          a short, time‑limited link to choose a new password.
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
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

        {error && (
          <p className="rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </p>
        )}

        {message && (
          <p className="rounded-2xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="primary-button flex w-full items-center justify-center px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? "Sending reset link…" : "Email me a reset link"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-400">
        Remembered it?{" "}
        <Link href="/login" className="subtle-link">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}


