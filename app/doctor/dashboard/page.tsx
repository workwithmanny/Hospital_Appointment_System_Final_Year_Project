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
  Activity, 
  Clipboard, 
  User, 
  Search,
  Plus,
  Users,
  Stethoscope,
  FileText,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowserClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/doctor/login");
        return;
      }
      setEmail(data.user.email ?? null);
      // Get full name from user metadata
      const name = data.user.user_metadata?.full_name || data.user.user_metadata?.fullName || null;
      setFullName(name);
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

  const displayName = fullName || email?.split("@")[0] || "Provider";

  const todayAppointments = [
    {
      id: 1,
      patient: "Sarah O'Connor",
      time: "09:00 AM",
      type: "Follow-up",
      status: "Confirmed",
      duration: "30 min"
    },
    {
      id: 2,
      patient: "Michael Walsh",
      time: "10:30 AM",
      type: "Consultation",
      status: "Confirmed",
      duration: "45 min"
    },
    {
      id: 3,
      patient: "Emma Byrne",
      time: "02:00 PM",
      type: "Check-up",
      status: "Pending",
      duration: "30 min"
    },
    {
      id: 4,
      patient: "James Murphy",
      time: "03:30 PM",
      type: "Follow-up",
      status: "Confirmed",
      duration: "30 min"
    }
  ];

  const stats = [
    { label: "Today's Appointments", value: "12", icon: Calendar, color: "blue" },
    { label: "Pending Reviews", value: "8", icon: FileText, color: "amber" },
    { label: "Total Patients", value: "342", icon: Users, color: "emerald" },
    { label: "This Month", value: "156", icon: TrendingUp, color: "purple" }
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
            { label: "Dashboard", icon: Activity, href: "/doctor/dashboard", active: true },
            { label: "Appointments", icon: Calendar, href: "/doctor/appointments", active: false },
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
            className="flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-400 hover:text-red-500 transition-all"
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
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-400" />
            <input type="text" placeholder="Search patients, appointments..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 dark:placeholder:text-slate-400 font-medium text-slate-900 dark:text-slate-100" />
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
            <div className="h-11 w-11 rounded-2xl border-2 border-blue-50 dark:border-blue-900 bg-blue-600 overflow-hidden flex items-center justify-center text-white font-black">
              {email?.charAt(0).toUpperCase() || "D"}
            </div>
          </div>
        </header>

        {/* Scroll Area */}
        <main className="flex-1 overflow-y-auto p-10 space-y-10">
          
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Good morning, {fullName ? `Dr. ${fullName.split(" ")[fullName.split(" ").length - 1]}` : displayName}</h1>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-400">Here&apos;s your overview for today</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    stat.color === "blue" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" :
                    stat.color === "amber" ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" :
                    stat.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" :
                    "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  }`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            
            {/* Today's Schedule */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Today&apos;s Schedule</h3>
                <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-700 transition-all">
                  <Plus className="h-4 w-4" />
                  New Appointment
                </button>
              </div>

              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm dark:shadow-none transition-all hover:shadow-md dark:hover:shadow-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">{appointment.patient}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm font-bold text-slate-400 dark:text-slate-500">{appointment.time}</span>
                            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
                              {appointment.type}
                            </span>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{appointment.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
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
                        <button className="rounded-xl border border-slate-100 dark:border-slate-700 p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                          <User className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm dark:shadow-none">
                <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                    <FileText className="h-4 w-4" />
                    Review Records
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                    <Calendar className="h-4 w-4" />
                    View Calendar
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                    <Users className="h-4 w-4" />
                    Patient List
                  </button>
                </div>
              </div>

              {/* Profile Card */}
              <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm dark:shadow-none">
                <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Profile</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-3xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-black text-xl">
                      {email?.charAt(0).toUpperCase() || "D"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-black text-slate-800 dark:text-slate-100">{email}</p>
                      <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">Healthcare Provider</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-400 dark:text-slate-500">License</span>
                      <span className="text-slate-800 dark:text-slate-200">MC12345</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-400 dark:text-slate-500">Department</span>
                      <span className="text-slate-800 dark:text-slate-200">Cardiology</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-400 dark:text-slate-500">Status</span>
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm dark:shadow-none">
                <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Recent Updates</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100">New patient record</p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100">Appointment confirmed</p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">5 hours ago</p>
                    </div>
                  </div>
                </div>
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

