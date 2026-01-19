"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const supabase = supabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
      setMessage("Password updated. You can now sign in with your new password.");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Something went wrong updating your password.";
      setError(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel w-full max-w-md p-6 sm:p-7">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          Choose a new password
        </h2>
        <p className="text-sm text-slate-300/85">
          This link is time‑limited. Once you set a new password, make sure you
          keep it private and unique.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1.5 text-sm">
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            New password
          </label>
          <input
            id="password"
            type="password"
            minLength={8}
            required
            className="input"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-400">
        Not you? Simply close this window, or{" "}
        <Link href="/login" className="subtle-link">
          return to sign in
        </Link>
        .
      </p>
    </div>
  );
}


