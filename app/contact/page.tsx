
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">

            {/* 1. Header Navigation - Consistent with Landing Page */}
            <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
                            <span className="text-xl font-bold text-white">✚</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">
                            Liffey<span className="text-blue-600">Care</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-10 md:flex">
                        <Link href="/#how-it-works" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">How it works</Link>
                        <Link href="/#services" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Specialists</Link>
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
                {/* 2. Hero Section */}
                <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24">
                    <div className="mx-auto max-w-7xl px-6 sm:px-12 text-center lg:text-left">
                        <div className="lg:w-2/3">
                            <h1 className="text-5xl font-[900] leading-[1.1] tracking-tight text-slate-900 sm:text-6xl">
                                We're here to <br />
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    help you.
                                </span>
                            </h1>
                            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-500">
                                Have a question about appointments, insurance, or our services?
                                Our team is ready to assist you.
                            </p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute right-0 top-0 hidden h-[600px] w-[600px] lg:block">
                        <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-[100px]" />
                        <div className="absolute right-48 top-64 h-64 w-64 rounded-full bg-cyan-100/50 blur-[80px]" />
                    </div>
                </section>

                {/* 3. Contact Info & Form */}
                <section className="pb-24">
                    <div className="mx-auto max-w-7xl px-6 sm:px-12">
                        <div className="grid gap-12 lg:grid-cols-2">

                            {/* Contact Information Cards */}
                            <div className="space-y-8">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-colors hover:border-blue-100 hover:bg-blue-50/50">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Call Us</h3>
                                        <p className="mt-2 text-slate-500">+353 1 234 5678</p>
                                        <p className="text-sm text-slate-400">Mon-Fri, 9am - 6pm</p>
                                    </div>

                                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-colors hover:border-blue-100 hover:bg-blue-50/50">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Email Us</h3>
                                        <p className="mt-2 text-slate-500">support@liffeycare.ie</p>
                                        <p className="text-sm text-slate-400">Response within 24h</p>
                                    </div>

                                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-colors hover:border-blue-100 hover:bg-blue-50/50 sm:col-span-2">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Visit Us</h3>
                                        <p className="mt-2 text-slate-500">LiffeyCare Hospital, Grand Canal Dock, Dublin 2, Ireland</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 sm:p-12">
                                <h3 className="mb-8 text-2xl font-bold text-slate-900">Send us a message</h3>
                                <form className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-bold text-slate-700">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                                placeholder="e.g. Sarah"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-bold text-slate-700">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                                placeholder="e.g. O'Connor"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                            placeholder="sarah@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-bold text-slate-700">Subject</label>
                                        <select
                                            id="subject"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Appointment Help</option>
                                            <option>Insurance Question</option>
                                            <option>Technical Support</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:transform hover:scale-[1.01]"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. FAQ Section */}
                <section className="bg-slate-50 py-24">
                    <div className="mx-auto max-w-4xl px-6 sm:px-12">
                        <h2 className="mb-12 text-center text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: "How do I book an appointment?", a: "You can book an appointment directly through our patient portal or by calling our support line. New patients will need to create a profile first." },
                                { q: "Do you accept medical cards?", a: "Yes, we accept all major insurance providers and valid medical cards for covered services. Please have your card details ready when booking." },
                                { q: "Is there parking available?", a: "Yes, we have a multi-story car park directly adjacent to the main hospital entrance with discounted rates for patients." },
                            ].map((item, i) => (
                                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900">{item.q}</h3>
                                    <p className="mt-2 text-slate-500">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            {/* 5. Footer - Consistent with Landing Page */}
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
                                    <li><Link href="/" className="hover:text-blue-600">Find a Doctor</Link></li>
                                    <li><Link href="/" className="hover:text-blue-600">Video Consult</Link></li>
                                    <li><Link href="/" className="hover:text-blue-600">Emergency Care</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold">Company</h4>
                                <ul className="space-y-2 text-slate-500">
                                    <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
                                    <li><Link href="#" className="hover:text-blue-600">Carrers</Link></li>
                                    <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
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
                                {/* Simplified Stethoscope Icon for Footer */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                                    <circle cx="20" cy="10" r="2" />
                                </svg>
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
