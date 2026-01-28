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
  Save,
  Edit,
  X,
  Moon,
  Sun,
  Heart,
  Shield,
  Clock,
  Plus,
  Trash2
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ppsNumber, setPpsNumber] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const supabase = supabaseBrowserClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? null);
      setUserId(data.user.id);
      const metadata = data.user.user_metadata || {};
      setFirstName(metadata.first_name || "");
      setLastName(metadata.last_name || "");
      setPhone(metadata.phone || "");
      setDateOfBirth(metadata.date_of_birth || "");
      setPpsNumber(metadata.pps_number || "");
      setAllergies(metadata.allergies || []);
      setLoading(false);
    });
  }, [router]);

  const handleSave = async () => {
    if (!userId) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = supabaseBrowserClient();
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          phone: phone || null,
          date_of_birth: dateOfBirth || null,
          pps_number: ppsNumber || null,
          allergies: allergies.length > 0 ? allergies : null,
        },
      });

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const calculateAge = (dob: string) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const handleSaveAllergies = async () => {
    if (!userId) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = supabaseBrowserClient();
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          allergies: allergies.length > 0 ? allergies : null,
        },
      });

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setSuccess("Allergies updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update allergies");
    } finally {
      setSaving(false);
    }
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
            { label: "Profile", icon: UserCircle, href: "/app/profile", active: true },
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
            <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 dark:placeholder:text-slate-400 font-medium text-slate-900 dark:text-slate-100" />
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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">My Profile</h1>
              <p className="text-sm font-medium text-slate-400 dark:text-slate-500">View and manage your personal information</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700 transition-all"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500/60 dark:border-red-500/40 bg-red-500/10 dark:bg-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-emerald-500/60 dark:border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
              {success}
            </div>
          )}

          {/* Profile Information */}
          <section className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none">
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Personal Information</h3>
            
            <div className="space-y-6">
              {/* Profile Avatar */}
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-3xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-black text-3xl">
                  {(firstName?.charAt(0) || lastName?.charAt(0) || email?.charAt(0) || "U").toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
                    {firstName && lastName ? `${firstName} ${lastName}` : email || "User"}
                  </p>
                  <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">Verified Patient</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First Name"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{firstName || "Not set"}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last Name"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{lastName || "Not set"}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                    <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{email || "Not set"}</p>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                      <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-bold text-slate-800 dark:text-slate-100 outline-none"
                        placeholder="+353 85 123 4567"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                      <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{phone || "Not set"}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                      <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {dateOfBirth 
                          ? `${new Date(dateOfBirth).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })} (${calculateAge(dateOfBirth)} years)`
                          : "Not set"}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    PPS Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={ppsNumber}
                      onChange={(e) => setPpsNumber(e.target.value.toUpperCase())}
                      maxLength={9}
                      className="w-full rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234567A"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-4 py-3">
                      <Shield className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {ppsNumber 
                          ? `${ppsNumber.slice(0, 4)}***${ppsNumber.slice(-1)}`
                          : "Not set"}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Required for Irish healthcare system</p>
                </div>
              </div>
            </div>
          </section>

          {/* Medical Information */}
          <section className="rounded-[2.5rem] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-none">
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">Medical Information</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="h-5 w-5 text-red-500 dark:text-red-400" />
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 mb-1">Allergies</p>
                    {allergies.length === 0 ? (
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">No allergies recorded</p>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-tight"
                          >
                            {allergy}
                            <button
                              onClick={() => handleRemoveAllergy(allergy)}
                              className="hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full p-0.5 transition-colors"
                              aria-label={`Remove ${allergy}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Add Allergy Input */}
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAllergy();
                      }
                    }}
                    placeholder="Enter allergy (e.g., Penicillin, Peanuts)"
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                  <button
                    onClick={handleAddAllergy}
                    disabled={!newAllergy.trim() || allergies.includes(newAllergy.trim())}
                    className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-black text-white hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
                
                {allergies.length > 0 && (
                  <button
                    onClick={handleSaveAllergies}
                    disabled={saving}
                    className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Allergies"}
                  </button>
                )}
              </div>
            </div>
          </section>

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

