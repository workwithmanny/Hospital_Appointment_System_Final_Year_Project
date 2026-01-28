"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import { useTheme } from "@/app/contexts/ThemeContext";
import { 
  LogOut, 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  Activity, 
  Clipboard, 
  User, 
  Search,
  Plus,
  Users,
  Stethoscope,
  Filter,
  Moon,
  Sun,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function DoctorAppointmentsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowserClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/doctor/login");
        return;
      }
      setEmail(data.user.email ?? null);
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/doctor/login");
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900 text-blue-600 font-bold">
      <div className="animate-pulse">LiffeyCare...</div>
    </div>
  );

  const appointments = [
    {
      id: 1,
      patient: "Sarah O'Connor",
      time: "09:00 AM",
      type: "Follow-up",
      status: "Confirmed",
      duration: "30 min",
      reason: "Cardiac check-up"
    },
    {
      id: 2,
      patient: "Michael Walsh",
      time: "10:30 AM",
      type: "Consultation",
      status: "Confirmed",
      duration: "45 min",
      reason: "Chest pain evaluation"
    },
    {
      id: 3,
      patient: "Emma Byrne",
      time: "02:00 PM",
      type: "Check-up",
      status: "Pending",
      duration: "30 min",
      reason: "Annual physical"
    },
    {
      id: 4,
      patient: "James Murphy",
      time: "03:30 PM",
      type: "Follow-up",
      status: "Confirmed",
      duration: "30 min",
      reason: "Medication review"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Sidebar */}
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
            { label: "Dashboard", icon: Activity, href: "/doctor/dashboard", active: false },
            { label: "Appointments", icon: Calendar, href: "/doctor/appointments", active: true },
            { label: "Patients", icon: Users, href: "/doctor/patients", active: false },
            { label: "Records", icon: Clipboard, href: "/doctor/records", active: false },
            { label: "Schedule", icon: Clock, href: "/doctor/schedule", active: false },
            { label: "Settings", icon: User, href: "/doctor/settings", active: false },
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
            className="flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-red-500 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-800 px-10">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 px-5 py-2.5 rounded-2xl w-full max-w-md">
            <Search className="h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search appointments..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 dark:placeholder:text-slate-400 font-medium text-slate-900 dark:text-slate-100" />
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 bg-white dark:bg-slate-700 shadow-sm hover:scale-105 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="relative rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 bg-white dark:bg-slate-700 shadow-sm hover:scale-105 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-700" />
            </button>
            <div className="h-11 w-11 rounded-2xl border-2 border-blue-50 dark:border-blue-900 bg-blue-600 overflow-hidden shadow-sm flex items-center justify-center text-white font-black">
              {email?.charAt(0).toUpperCase() || "D"}
            </div>
          </div>
        </header>

        {/* Scroll Area */}
        <main className="flex-1 overflow-y-auto p-10 space-y-10">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Appointments</h1>
              <p className="text-sm font-medium text-slate-400">Manage and view all your appointments</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700 transition-all">
              <Plus className="h-4 w-4" />
              New Appointment
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              All
            </button>
            <button className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              Today
            </button>
            <button className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              Upcoming
            </button>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
                        {appointment.type}
                      </span>
                      {appointment.status === "Confirmed" ? (
                        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-xl">
                          <CheckCircle2 className="h-3 w-3" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-xl">
                          <AlertCircle className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">{appointment.patient}</h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{appointment.reason}</p>
                    <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {appointment.time}</span>
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {appointment.duration}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="rounded-2xl border-2 border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50 px-6 py-3 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                      View Details
                    </button>
                    <button className="rounded-2xl border-2 border-blue-50 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/30 px-6 py-3 text-sm font-black text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all">
                      Patient Record
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                className="flex-1 rounded-2xl bg-red-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-100 hover:bg-red-600 transition-all"
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

