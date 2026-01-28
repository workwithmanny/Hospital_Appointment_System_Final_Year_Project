import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* --- Left Column: Dynamic Forms (Login/Signup) --- */}
      <main className="flex w-full flex-col justify-center px-6 py-12 lg:w-[45%] lg:px-12 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Shared Navigation Header */}
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

          {/* This is where your Login or Signup form will render */}
          {children}

          {/* Shared Compliance Footer */}
          <div className="mt-12 flex items-center justify-center gap-6 border-t border-slate-100 pt-8 text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              HSE Aligned
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              GDPR Ready
            </span>
          </div>
        </div>
      </main>

      {/* --- Right Column: Static Brand Showcase --- */}
      <aside className="relative hidden w-[55%] lg:block">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
          alt="LiffeyCare modern facility"
          fill
          className="object-cover"
          priority
        />
        {/* Deep blue overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-900/20 to-transparent" />
        
        {/* Floating Info Card */}
        <div className="absolute bottom-12 left-12 max-w-lg space-y-6 rounded-[2rem] border border-white/20 bg-white/10 p-10 backdrop-blur-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white leading-tight">
              A calmer way to <br />
              <span className="text-blue-300">manage your health.</span>
            </h2>
            <p className="text-blue-50 text-lg leading-relaxed">
              Join over 12,000 Dubliners accessing instant appointments, 
              secure lab results, and 24/7 specialist care.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-blue-400 bg-slate-200">
                  <Image 
                    src={`https://i.pravatar.cc/150?u=${i + 20}`} 
                    alt="Patient" 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Trusted by patients across Dublin 8
            </p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute top-12 right-12 rounded-full bg-white/90 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-widest text-slate-800 shadow-xl backdrop-blur-md">
           📍 St. James&apos;s Campus, Dublin
        </div>
      </aside>
    </div>
  );
}