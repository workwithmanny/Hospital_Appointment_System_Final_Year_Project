"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import { useTheme } from "@/app/contexts/ThemeContext";
import { 
  LogOut, 
  Calendar, 
  Clock, 
  Bell, 
  Activity, 
  Clipboard, 
  User, 
  Search,
  Plus,
  Users,
  Stethoscope,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function DoctorSchedulePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const appointments = {
    "09:00": { patient: "Sarah O'Connor", type: "Follow-up" },
    "10:30": { patient: "Michael Walsh", type: "Consultation" },
    "14:00": { patient: "Emma Byrne", type: "Check-up" },
    "15:30": { patient: "James Murphy", type: "Follow-up" }
  };

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
            { label: "Appointments", icon: Calendar, href: "/doctor/appointments", active: false },
            { label: "Patients", icon: Users, href: "/doctor/patients", active: false },
            { label: "Records", icon: Clipboard, href: "/doctor/records", active: false },
            { label: "Schedule", icon: Clock, href: "/doctor/schedule", active: true },
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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 86400000))}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 bg-white dark:bg-slate-700 hover:scale-105 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 86400000))}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 bg-white dark:bg-slate-700 hover:scale-105 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
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
        <main className="flex-1 overflow-y-auto p-10">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Schedule</h1>
              <p className="text-sm font-medium text-slate-400">View and manage your daily schedule</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700 transition-all">
              <Plus className="h-4 w-4" />
              Block Time
            </button>
          </div>

          {/* Schedule Grid */}
          <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = appointments[time as keyof typeof appointments];
                return (
                  <div 
                    key={time} 
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      appointment 
                        ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30" 
                        : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div className="w-20 text-sm font-black text-slate-600 dark:text-slate-300">{time}</div>
                    <div className="flex-1">
                      {appointment ? (
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100">{appointment.patient}</p>
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{appointment.type}</p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500">Available</p>
                      )}
                    </div>
                    {appointment && (
                      <button className="rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-black text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
                        View
                      </button>
                    )}
                  </div>
                );
              })}
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

