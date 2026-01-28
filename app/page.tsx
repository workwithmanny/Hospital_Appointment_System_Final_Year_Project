import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ShieldCheck,
  ArrowRight,
  Activity,
  Users,
  Stethoscope,
  Video,
  ClipboardList,
  Star
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">

      {/* 1. Header Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
              <span className="text-xl font-bold text-white">✚</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Liffey<span className="text-blue-600">Care</span>
            </span>
          </div>

          <div className="hidden items-center gap-10 md:flex">
            <Link href="#how-it-works" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">How it works</Link>
            <Link href="#services" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Specialists</Link>
            <div className="h-4 w-px bg-slate-200" />
            <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-blue-600">Log in</Link>
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* 2. Focused Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-12">
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left">
              <div className="flex-1 space-y-8">
                <h1 className="text-5xl font-[900] leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  Modern care <br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    for everyone.
                  </span>
                </h1>


                <p className="max-w-2xl text-xl leading-relaxed text-slate-500 lg:mx-0">
                  Dublin’s most advanced digital patient portal. Connect with top-tier specialists, manage appointments, and access your health records from any device.
                </p>

                <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start">
                  <Link
                    href="/signup"
                    className="flex h-16 items-center justify-center rounded-2xl bg-blue-600 px-10 text-lg font-bold text-white shadow-2xl shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-[1.02]"
                  >
                    Start Your Journey
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="flex h-16 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 text-lg font-bold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Watch how it works
                  </Link>
                </div>

                <div className="flex items-center gap-4 pt-4 text-slate-400">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden">
                        <Image src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" width={40} height={40} />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium">
                    <span className="font-bold text-slate-900">4.9/5 Rating</span> from 2,000+ Dubliners
                  </p>
                </div>
              </div>

              <div className="relative mt-20 flex-1 lg:mt-0 lg:ml-20">
                <div className="relative z-10 overflow-hidden rounded-[4rem] border-[16px] border-slate-50 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
                    alt="Professional doctor"
                    width={1000}
                    height={1200}
                    className="aspect-[4/5] object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-[100px]" />
                <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-100/50 blur-[100px]" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trusted By (Logo Section) */}
        <section className="border-y border-slate-100 bg-slate-50/50 py-12">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 text-center">
            <p className="mb-8 text-sm font-bold uppercase tracking-widest text-slate-400">Aligned with Ireland's Leading Authorities</p>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
              {/* Replace with actual partner logos as needed */}
              <span className="text-xl font-bold">HSE Ireland</span>
              <span className="text-xl font-bold">Medical Council</span>
              <span className="text-xl font-bold">VHI Health</span>
              <span className="text-xl font-bold">Laya Healthcare</span>
            </div>
          </div>
        </section>

        {/* 4. How It Works (Process Section) */}
        <section id="how-it-works" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-12">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Healthcare in three simple steps</h2>
              <p className="text-lg text-slate-500">We've removed the bureaucracy. Just focus on feeling better.</p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                { step: "01", title: "Create Profile", desc: "Sign up in minutes with your PPS number for instant verification.", icon: ClipboardList, color: "bg-blue-50 text-blue-600" },
                { step: "02", title: "Choose Specialty", desc: "Select from over 50+ vetted clinicians and specialists in Dublin.", icon: Stethoscope, color: "bg-emerald-50 text-emerald-600" },
                { step: "03", title: "Attend Digitally", desc: "Meet via secure video link or book an in-person clinic visit.", icon: Video, color: "bg-purple-50 text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="relative group p-8 rounded-3xl transition-all hover:bg-slate-50">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-2xl font-bold`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute top-8 right-8 text-6xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">{item.step}</div>
                  <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Specialists / Department Section (Grid Style) */}
        <section id="services" className="bg-slate-900 py-24 text-white lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 sm:px-12">
            <div className="mb-20 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Our Medical Departments</h2>
                <p className="max-w-xl text-slate-400">Access world-class diagnostics and treatment across every major field of medicine.</p>
              </div>
              <Link href="#" className="inline-flex items-center font-bold text-blue-400 hover:text-blue-300">
                View all departments <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-px bg-slate-800 overflow-hidden rounded-3xl border border-slate-800">
              {[
                { title: "Cardiology", stats: "12 Specialists", icon: Activity },
                { title: "Psychiatry", stats: "08 Specialists", icon: ShieldCheck },
                { title: "Pediatrics", stats: "15 Specialists", icon: Users },
                { title: "Surgery", stats: "10 Specialists", icon: Stethoscope },
                { title: "Family Medicine", stats: "22 Specialists", icon: ClipboardList },
                { title: "Diagnostics", stats: "24/7 Lab", icon: Clock },
              ].map((dept, i) => (
                <div key={i} className="group bg-slate-900 p-10 transition-all hover:bg-blue-600">
                  <dept.icon className="mb-6 h-10 w-10 text-blue-500 group-hover:text-white" />
                  <h3 className="text-2xl font-bold">{dept.title}</h3>
                  <p className="mt-2 text-slate-400 group-hover:text-blue-100">{dept.stats}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 6. Professional Footer */}
      <footer className="bg-white pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">✚</div>
                <span className="text-2xl font-black">LiffeyCare</span>
              </div>
              <p className="max-w-sm text-lg text-slate-500">
                Revolutionizing the Irish healthcare experience through empathy, speed, and secure technology.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
              <div className="space-y-4">
                <h4 className="font-bold">Platform</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><Link href="#" className="hover:text-blue-600">Find a Doctor</Link></li>
                  <li><Link href="#" className="hover:text-blue-600">Video Consult</Link></li>
                  <li><Link href="#" className="hover:text-blue-600">Emergency Care</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">Company</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
                  <li><Link href="#" className="hover:text-blue-600">Carrers</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold">Legal</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-blue-600">GDPR Compliance</Link></li>
                  <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">For healthcare professionals:</p>
              <Link
                href="/doctor/login"
                className="flex items-center gap-2 rounded-2xl border-2 border-blue-600 bg-white px-6 py-3 text-sm font-black text-blue-600 hover:bg-blue-50 transition-all"
              >
                <Stethoscope className="h-4 w-4" />
                Doctor/Nurse Login
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm">© 2026 LiffeyCare Medical Group. All rights reserved.</p>
            <div className="flex gap-6 text-slate-400 text-sm">
              <span>HSE-Certified Infrastructure</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}