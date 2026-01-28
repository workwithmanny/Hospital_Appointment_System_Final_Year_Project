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
  FileText,
  Phone,
  Mail
} from "lucide-react";

export default function DoctorPatientsPage() {
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

  const patients = [
    {
      id: 1,
      name: "Sarah O'Connor",
      age: 45,
      lastVisit: "15 Jan 2026",
      nextAppointment: "22 Jan 2026",
      status: "Active",
      condition: "Hypertension"
    },
    {
      id: 2,
      name: "Michael Walsh",
      age: 52,
      lastVisit: "10 Jan 2026",
      nextAppointment: "25 Jan 2026",
      status: "Active",
      condition: "Cardiac monitoring"
    },
    {
      id: 3,
      name: "Emma Byrne",
      age: 38,
      lastVisit: "08 Jan 2026",
      nextAppointment: "20 Jan 2026",
      status: "Active",
      condition: "Routine check-up"
    },
    {
      id: 4,
      name: "James Murphy",
      age: 61,
      lastVisit: "12 Jan 2026",
      nextAppointment: "18 Jan 2026",
      status: "Active",
      condition: "Medication review"
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
            { label: "Appointments", icon: Calendar, href: "/doctor/appointments", active: false },
            { label: "Patients", icon: Users, href: "/doctor/patients", active: true },
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
            <input type="text" placeholder="Search patients..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 dark:placeholder:text-slate-400 font-medium text-slate-900 dark:text-slate-100" />
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
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Patients</h1>
              <p className="text-sm font-medium text-slate-400">Manage your patient list</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700 transition-all">
              <Plus className="h-4 w-4" />
              Add Patient
            </button>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div key={patient.id} className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-3xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">{patient.name}</h4>
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500">{patient.age} years old</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-400 dark:text-slate-500">Condition</span>
                    <span className="text-slate-800 dark:text-slate-200">{patient.condition}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-400 dark:text-slate-500">Last Visit</span>
                    <span className="text-slate-800 dark:text-slate-200">{patient.lastVisit}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-400 dark:text-slate-500">Next Appointment</span>
                    <span className="text-blue-600 dark:text-blue-400 font-black">{patient.nextAppointment}</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button className="flex-1 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-2.5 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                    <FileText className="h-4 w-4 mx-auto" />
                  </button>
                  <button className="flex-1 rounded-2xl border-2 border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-2.5 text-sm font-black text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all">
                    <User className="h-4 w-4 mx-auto" />
                  </button>
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

