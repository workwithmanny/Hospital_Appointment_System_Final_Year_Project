"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import { 
  LogOut, 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  ChevronRight, 
  Activity, 
  Clipboard, 
  User,
  UserCircle,
  Heart,
  FileText,
  Search,
  Plus,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function AppHomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  const [ppsNumber, setPpsNumber] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowserClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? null);
      const metadata = data.user.user_metadata || {};
      setFirstName(metadata.first_name || null);
      setLastName(metadata.last_name || null);
      setPhone(metadata.phone || null);
      setDateOfBirth(metadata.date_of_birth || null);
      setPpsNumber(metadata.pps_number || null);
      setAllergies(metadata.allergies || []);
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900 text-blue-600 font-bold">
      <div className="animate-pulse">LiffeyCare...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
      
      {/* 1. Refined Sidebar */}
      <aside className="hidden w-72 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 lg:flex flex-col">
        <div className="p-8 pb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <span className="font-bold text-xl">✚</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">Liffey<span className="text-blue-600 dark:text-blue-400">Care</span></span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {[
            { label: "Dashboard", icon: Activity, href: "/app", active: true },
            { label: "Appointments", icon: Calendar, href: "/app/appointments", active: false },
            { label: "Records", icon: Clipboard, href: "/app/records", active: false },
            { label: "Profile", icon: UserCircle, href: "/app/profile", active: false },
            { label: "Settings", icon: User, href: "/app/settings", active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center gap-3.5 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all ${
                item.active 
                ? "bg-blue-600 text-white" 
                : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={() => setShowSignOutConfirm(true)}
            className="flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-400 hover:text-red-500 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-800 px-10">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 px-5 py-2.5 rounded-2xl w-full max-w-md">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-400" />
            <input type="text" placeholder="Search appointments or results..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 dark:placeholder:text-slate-400 font-medium text-slate-900 dark:text-slate-100" />
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-700 hover:scale-105 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="relative rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-700 hover:scale-105 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-700" />
            </button>
            <div className="h-11 w-11 rounded-2xl border-2 border-blue-50 dark:border-blue-900 bg-slate-100 dark:bg-slate-700 overflow-hidden">
               <Image src="https://i.pravatar.cc/150?u=44" alt="avatar" width={44} height={44}/>
            </div>
          </div>
        </header>

        {/* Scroll Area */}
        <main className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            
            <div className="lg:col-span-2 space-y-10">
              {/* Hero Banner */}
              <section className="relative rounded-[2.5rem] bg-blue-600 dark:bg-blue-700 p-10 text-white shadow-2xl shadow-blue-100 dark:shadow-none overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-3">Welcome back.</h2>
                  <p className="max-w-md text-blue-100 font-medium mb-8 leading-relaxed">
                    You have an upcoming Cardiology check-up in 2 days at St. James&apos;s Campus.
                  </p>
                  <button className="flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-100 px-8 py-4 text-sm font-black text-blue-600 dark:text-blue-700 hover:scale-105 transition-all active:scale-95">
                    Pre-check in
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <Activity className="absolute right-[-20px] bottom-[-20px] h-64 w-64 text-white opacity-5" />
              </section>

              {/* Next Visit */}
              <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Next Visit</h3>
                  <Link href="/app/appointments" className="text-sm font-bold text-blue-600 hover:text-blue-700">View History</Link>
                </div>
                
                <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                  <div className="flex flex-col gap-8 md:flex-row md:items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <Calendar className="h-7 w-7" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">Cardiology</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md">Confirmed</span>
                      </div>
                      <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">Dr. Ní Bhraonáin</h4>
                      <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 09:20 AM</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Dublin 8</span>
                      </div>
                    </div>
                    <button className="rounded-2xl border-2 border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50 px-8 py-4 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                      Reschedule
                    </button>
                  </div>
                </div>
              </section>

              {/* Recent Documents */}
              <section className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                   <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Recent Documents</h3>
                   <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400"><Plus className="h-4 w-4"/> Upload New</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { name: "Blood_Test_Dec25.pdf", type: "Lab Results", date: "15 Dec 2025" },
                     { name: "Referral_Letter.pdf", type: "Cardiology", date: "02 Jan 2026" }
                   ].map((doc, i) => (
                     <div key={i} className="flex items-center gap-4 rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-blue-200 dark:hover:border-blue-700 cursor-pointer transition-all shadow-sm dark:shadow-none">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate text-sm font-black text-slate-800 dark:text-slate-100">{doc.name}</p>
                          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{doc.type} · {doc.date}</p>
                        </div>
                     </div>
                   ))}
                 </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Health Profile</h3>
                  <Link href="/app/profile" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View Profile
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 rounded-3xl bg-slate-50 dark:bg-slate-700 p-5 border border-slate-100/50 dark:border-slate-600/50">
                    <div className="h-12 w-12 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-black text-lg">
                      {(firstName?.charAt(0) || email?.charAt(0) || "U").toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-sm font-black text-slate-800 dark:text-slate-100">
                        {firstName && lastName ? `${firstName} ${lastName}` : email || "User"}
                      </p>
                      <p className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">Verified Patient</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    {ppsNumber && (
                      <div className="flex justify-between items-center text-sm font-bold px-1">
                        <span className="text-slate-400 dark:text-slate-500">PPS Number</span>
                        <span className="text-slate-800 dark:text-slate-200">
                          {ppsNumber.length > 4 ? `${ppsNumber.slice(0, 4)}***${ppsNumber.slice(-1)}` : "***"}
                        </span>
                      </div>
                    )}
                    {dateOfBirth && (
                      <div className="flex justify-between items-center text-sm font-bold px-1">
                        <span className="text-slate-400 dark:text-slate-500">Date of Birth</span>
                        <span className="text-slate-800 dark:text-slate-200">
                          {new Date(dateOfBirth).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    {phone && (
                      <div className="flex justify-between items-center text-sm font-bold px-1">
                        <span className="text-slate-400 dark:text-slate-500">Phone</span>
                        <span className="text-slate-800 dark:text-slate-200">{phone}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm font-bold px-1 text-red-500 dark:text-red-400 bg-red-50/50 dark:bg-red-900/30 p-3 rounded-2xl">
                      <span className="flex items-center gap-2"><Heart className="h-4 w-4 fill-red-500 dark:fill-red-400" /> Allergies</span>
                      <span className="text-xs font-black uppercase tracking-tighter">
                        {allergies && allergies.length > 0 ? allergies.join(", ") : "None recorded"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEW Replacement Card: Vitals Overview */}
              <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Active Vitals</h4>
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
                </div>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-black text-slate-800 dark:text-slate-100">72</span>
                  <span className="text-sm font-black text-slate-400 dark:text-slate-500 mb-1.5 uppercase">bpm</span>
                </div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6">Resting heart rate (Measured today)</p>
                
                {/* Visual heart rate graph placeholder */}
                <div className="flex items-end gap-1 h-12">
                   {[40, 60, 45, 80, 55, 70, 50, 65, 90, 60].map((h, i) => (
                     <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-all rounded-sm" />
                   ))}
                </div>
                
                <button className="w-full mt-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                  Sync Apple Health
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Sign Out Confirmation Dialog */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-2xl">
            <h3 className="mb-2 text-2xl font-black text-slate-800 dark:text-slate-100">Sign Out</h3>
            <p className="mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              Are you sure you want to sign out? You&apos;ll need to log in again to access your account.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-3.5 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 rounded-2xl bg-red-500 px-6 py-3.5 text-sm font-black text-white shadow-lg dark:shadow-none shadow-red-100 hover:bg-red-600 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}