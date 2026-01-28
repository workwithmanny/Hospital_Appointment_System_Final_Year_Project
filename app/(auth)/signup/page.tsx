"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ppsNumber, setPpsNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const supabase = supabaseBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/login`
              : undefined,
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            phone: phone || null,
            date_of_birth: dateOfBirth || null,
            pps_number: ppsNumber || null,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      setMessage(
        "Check your email to confirm your account. Once verified, you can sign in to the portal."
      );
    } catch (err) {
      const text =
        err instanceof Error ? err.message : "Something went wrong signing up.";
      setError(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel w-full max-w-md p-6 sm:p-7">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          Create your patient account
        </h2>
        <p className="text-sm text-slate-300/85">
          Use the same email you gave your GP or LiffeyCare clinic. We&apos;ll
          send a short email to verify it&apos;s really you.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 text-sm">
            <label
              htmlFor="firstName"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              className="input"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5 text-sm">
            <label
              htmlFor="lastName"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              className="input"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            Password
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

        <div className="space-y-1.5 text-sm">
          <label
            htmlFor="phone"
            className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            Phone Number <span className="text-slate-500">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            className="input"
            placeholder="+353 85 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-1.5 text-sm">
          <label
            htmlFor="dateOfBirth"
            className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            required
            className="input"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="space-y-1.5 text-sm">
          <label
            htmlFor="ppsNumber"
            className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            PPS Number
          </label>
          <input
            id="ppsNumber"
            type="text"
            required
            className="input"
            placeholder="1234567A"
            maxLength={9}
            value={ppsNumber}
            onChange={(e) => setPpsNumber(e.target.value.toUpperCase())}
          />
          <p className="text-xs text-slate-400 mt-1">
            Required for Irish healthcare system verification
          </p>
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
          {loading ? "Creating your account…" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-400">
        Already registered?{" "}
        <Link href="/login" className="subtle-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}


