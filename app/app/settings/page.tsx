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
  Bell, 
  Activity, 
  Clipboard, 
  User,
  UserCircle,
  Search,
  Mail,
  Phone,
  Shield,
  Bell as BellIcon,
  Lock,
  Heart,
  Save,
  ChevronRight,
  Moon,
  Sun
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  useEffect(() => {
    const supabase = supabaseBrowserClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? null);
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
            { label: "Dashboard", icon: Activity, href: "/app", active: false },
            { label: "Appointments", icon: Calendar, href: "/app/appointments", active: false },
            { label: "Records", icon: Clipboard, href: "/app/records", active: false },
            { label: "Profile", icon: UserCircle, href: "/app/profile", active: false },
            { label: "Settings", icon: User, href: "/app/settings", active: true },
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
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-400" />
            <input type="text" placeholder="Search settings..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 dark:placeholder:text-slate-400 font-medium text-slate-900 dark:text-slate-100" />
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-700 hover:scale-105 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="relative rounded-2xl border border-slate-100 dark:border-slate-700 p-2.5 text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-700 shadow-sm hover:scale-105 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-700" />
            </button>
            <div className="h-11 w-11 rounded-2xl border-2 border-blue-50 dark:border-blue-900 bg-slate-100 dark:bg-slate-700 overflow-hidden shadow-sm">
               <Image src="https://i.pravatar.cc/150?u=44" alt="avatar" width={44} height={44}/>
            </div>
          </div>
        </header>

        {/* Scroll Area */}
        <main className="flex-1 overflow-y-auto p-10 space-y-10">
          
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Settings</h1>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500">Manage your account preferences and privacy</p>
          </div>

          {/* Profile Section */}
          <section className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none">
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Profile Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl">
                  {email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">{email}</p>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter">Verified Patient</p>
                </div>
                <button className="rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-3 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                  Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Email Address</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                    <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input type="email" value={email || ""} readOnly className="flex-1 bg-transparent text-sm font-bold text-slate-800 dark:text-slate-100 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Phone Number</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                    <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input type="tel" placeholder="+353 85 123 4567" className="flex-1 bg-transparent text-sm font-bold text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none">
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { key: "email", label: "Email Notifications", description: "Receive updates via email" },
                { key: "sms", label: "SMS Notifications", description: "Receive text message alerts" },
                { key: "push", label: "Push Notifications", description: "Browser and app notifications" }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
                  <div className="flex items-center gap-4">
                    <BellIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.label}</p>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    className={`relative h-6 w-11 rounded-full transition-all ${
                      notifications[item.key as keyof typeof notifications] ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Security Section */}
          <section className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none">
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Security & Privacy</h3>
            <div className="space-y-4">
              <button className="flex w-full items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                <div className="flex items-center gap-4">
                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  <div className="text-left">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">Change Password</p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Update your account password</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </button>
              <button className="flex w-full items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                <div className="flex items-center gap-4">
                  <Shield className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  <div className="text-left">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">Privacy Settings</p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Manage data sharing preferences</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </button>
              <button className="flex w-full items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                <div className="flex items-center gap-4">
                  <Heart className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  <div className="text-left">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">Health Information</p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Update allergies and medical history</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-lg dark:shadow-none shadow-blue-100 hover:bg-blue-700 transition-all">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
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

