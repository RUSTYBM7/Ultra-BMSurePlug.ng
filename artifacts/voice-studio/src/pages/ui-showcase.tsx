"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

// Showcase components inline since we're demonstrating them
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function UIShowcase() {
  const [activeTab, setActiveTab] = useState("buttons");
  const [toggleStates, setToggleStates] = useState({
    ios: false,
    neon: true,
    gradient: false,
    dayNight: false,
  });

  const tabs = [
    { id: "buttons", label: "Buttons" },
    { id: "loaders", label: "Loaders" },
    { id: "cards", label: "Cards" },
    { id: "inputs", label: "Inputs" },
    { id: "toggles", label: "Toggles" },
    { id: "badges", label: "Badges" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              UI Component Showcase
            </h1>
            <p className="text-zinc-400 mt-1">UIverse-inspired components for modern interfaces</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-zinc-900 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
          className="space-y-8"
        >
          {activeTab === "buttons" && (
            <>
              <Section title="Glow Buttons">
                <div className="flex flex-wrap gap-4">
                  <button className="relative px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300 ease-out hover:shadow-[0_0_40px_8px_rgba(124,58,237,0.5)] hover:scale-105 active:scale-95">
                    Glow Effect
                  </button>
                  <button className="relative px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 ease-out hover:shadow-[0_0_40px_8px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95">
                    Success Glow
                  </button>
                  <button className="relative px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 transition-all duration-300 ease-out hover:shadow-[0_0_40px_8px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95">
                    Danger Glow
                  </button>
                </div>
              </Section>

              <Section title="Neon Buttons">
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3 font-bold uppercase tracking-wider text-cyan-400 bg-transparent border-2 border-cyan-400 rounded transition-all duration-300 hover:bg-cyan-400 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                    Neon Cyan
                  </button>
                  <button className="px-8 py-3 font-bold uppercase tracking-wider text-pink-400 bg-transparent border-2 border-pink-400 rounded transition-all duration-300 hover:bg-pink-400 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(244,114,182,0.8)]">
                    Neon Pink
                  </button>
                  <button className="px-8 py-3 font-bold uppercase tracking-wider text-amber-400 bg-transparent border-2 border-amber-400 rounded transition-all duration-300 hover:bg-amber-400 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                    Neon Gold
                  </button>
                </div>
              </Section>

              <Section title="Slide & Morph Buttons">
                <div className="flex flex-wrap gap-4">
                  <button className="group relative px-8 py-3 font-semibold overflow-hidden rounded-lg bg-zinc-900 text-white border border-zinc-700 transition-all duration-300 hover:border-emerald-500/50">
                    <span className="relative flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-y-full">
                      Hover Me
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-emerald-400">
                      Hover Me
                    </span>
                  </button>
                  <button className="px-8 py-3 font-semibold text-white rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-95">
                    Glass Button
                  </button>
                </div>
              </Section>

              <Section title="Cyber Buttons">
                <div className="flex flex-wrap gap-4">
                  <button
                    className="relative px-8 py-3 font-bold uppercase tracking-widest bg-yellow-400 text-zinc-900 transition-all duration-150 hover:bg-yellow-300"
                    style={{ clipPath: "polygon(0 10%, 10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}
                  >
                    Cyber Punk
                  </button>
                  <button className="relative px-8 py-3 font-semibold text-white rounded-lg bg-zinc-900 overflow-hidden before:absolute before:inset-0 before:p-[2px] before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-cyan-500 before:-z-10 transition-transform duration-300 hover:scale-105">
                    Gradient Border
                  </button>
                </div>
              </Section>
            </>
          )}

          {activeTab === "loaders" && (
            <>
              <Section title="Pulse & Bounce Loaders">
                <div className="flex flex-wrap items-center gap-12">
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.6s" }}
                      />
                    ))}
                  </div>
                </div>
              </Section>

              <Section title="Spinner Loaders">
                <div className="flex flex-wrap items-center gap-12">
                  <div className="w-10 h-10 rounded-full border-4 border-zinc-700 border-t-cyan-500 animate-spin" />
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
                    <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-pink-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-500 animate-spin" style={{ animationDuration: "1.5s" }} />
                  </div>
                </div>
              </Section>

              <Section title="Creative Loaders">
                <div className="flex flex-wrap items-center gap-12">
                  <div className="grid grid-cols-3 gap-0.5 w-12 h-12">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-amber-500 rounded-sm animate-pulse"
                        style={{ animationDelay: `${(i % 3) * 0.1 + Math.floor(i / 3) * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 animate-[morph_2s_ease-in-out_infinite]" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}>
                    <style>{`
                      @keyframes morph {
                        0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                      }
                    `}</style>
                  </div>
                </div>
              </Section>

              <Section title="Progress Loaders">
                <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-[progress_1.5s_ease-in-out_infinite]">
                    <style>{`
                      @keyframes progress {
                        0% { width: 0%; margin-left: 0%; }
                        50% { width: 100%; margin-left: 0%; }
                        100% { width: 0%; margin-left: 100%; }
                      }
                    `}</style>
                  </div>
                </div>
              </Section>
            </>
          )}

          {activeTab === "cards" && (
            <>
              <Section title="Glass & Neon Cards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-white/15 hover:border-white/30">
                    <h3 className="text-lg font-bold text-white mb-2">Glass Card</h3>
                    <p className="text-zinc-300 text-sm">Beautiful glassmorphism effect with blur and transparency.</p>
                  </div>
                  <div className="relative p-6 rounded-xl bg-zinc-900 border border-cyan-500/30 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    <h3 className="text-lg font-bold text-white mb-2">Neon Card</h3>
                    <p className="text-zinc-300 text-sm">Cyberpunk-inspired neon glow on hover.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30">
                    <h3 className="text-lg font-bold text-white mb-2">Floating Card</h3>
                    <p className="text-zinc-300 text-sm">Subtle lift effect on hover with shadow.</p>
                  </div>
                </div>
              </Section>

              <Section title="Gradient & Holographic Cards">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-[gradient-x_3s_ease_infinite]" style={{ backgroundSize: "200% 200%" }}>
                    <div className="bg-zinc-900 rounded-[14px] p-6 h-full">
                      <h3 className="text-lg font-bold text-white mb-2">Gradient Border</h3>
                      <p className="text-zinc-300 text-sm">Animated gradient border that flows continuously.</p>
                    </div>
                    <style>{`
                      @keyframes gradient-x {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                      }
                    `}</style>
                  </div>
                  <div className="relative p-6 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.1)_40%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.1)_50%,transparent_70%)] bg-[length:200%_100%] animate-[shimmer_3s_ease_infinite]" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-2">Holographic Card</h3>
                      <p className="text-zinc-300 text-sm">Shimmering holographic effect that catches the light.</p>
                    </div>
                    <style>{`
                      @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                      }
                    `}</style>
                  </div>
                </div>
              </Section>

              <Section title="Pricing Cards">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Starter", price: "$9", features: ["5 Projects", "10GB Storage", "Basic Support"] },
                    { title: "Pro", price: "$29", features: ["Unlimited Projects", "100GB Storage", "Priority Support", "API Access"], popular: true },
                    { title: "Enterprise", price: "$99", features: ["Everything in Pro", "Dedicated Support", "Custom Integrations", "SLA"] },
                  ].map((plan, i) => (
                    <div
                      key={i}
                      className={`relative p-6 rounded-2xl bg-zinc-900 border transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 ${
                        plan.popular ? "border-indigo-500 scale-105" : "border-zinc-800 hover:border-indigo-400"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
                          Popular
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                      <div className="text-4xl font-bold text-white mb-6">
                        {plan.price}
                        <span className="text-sm text-zinc-400 font-normal">/month</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-zinc-300">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? "bg-indigo-500 text-white hover:bg-indigo-400" : "bg-zinc-800 text-white hover:bg-zinc-700"}`}>
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {activeTab === "inputs" && (
            <>
              <Section title="Floating Label Inputs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="relative">
                    <input
                      type="text"
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-transparent transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      placeholder="Email"
                    />
                    <label className="absolute left-4 top-2 text-xs text-indigo-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-transparent transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      placeholder="Password"
                    />
                    <label className="absolute left-4 top-2 text-xs text-indigo-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400">
                      Password
                    </label>
                  </div>
                </div>
              </Section>

              <Section title="Underline & Neon Inputs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  <div className="relative">
                    <input
                      type="text"
                      className="peer w-full px-0 py-2 bg-transparent border-b-2 border-zinc-600 text-white placeholder-transparent transition-all duration-200 focus:border-cyan-500 focus:outline-none"
                      placeholder="Username"
                    />
                    <label className="absolute left-0 -top-5 text-xs text-cyan-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400">
                      Username
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-cyan-400 placeholder-zinc-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:border-cyan-600"
                      placeholder="Search"
                    />
                    <label className="absolute -top-2.5 left-3 px-1 bg-zinc-900 text-xs text-cyan-400">Neon Search</label>
                  </div>
                </div>
              </Section>

              <Section title="Glass & Gradient Inputs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 transition-all duration-200 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Glass Input"
                  />
                  <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-[6px] bg-zinc-900 text-white placeholder-zinc-500 focus:outline-none"
                      placeholder="Gradient Border"
                    />
                  </div>
                </div>
              </Section>

              <Section title="Search & OTP Inputs">
                <div className="space-y-6 max-w-md">
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 rounded-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      placeholder="Search..."
                    />
                  </div>
                  <div className="flex gap-3">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 text-center text-xl font-bold rounded-lg bg-zinc-800 border-2 border-zinc-700 text-white transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>
              </Section>
            </>
          )}

          {activeTab === "toggles" && (
            <>
              <Section title="iOS & Neon Toggles">
                <div className="flex flex-wrap items-center gap-8">
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={toggleStates.ios}
                        onChange={(e) => setToggleStates({ ...toggleStates, ios: e.target.checked })}
                      />
                      <div className="w-14 h-8 rounded-full bg-zinc-700 peer-checked:bg-emerald-500 transition-colors duration-300" />
                      <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg peer-checked:translate-x-6 transition-transform duration-300" />
                    </div>
                    <span>iOS Style</span>
                  </label>
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={toggleStates.neon}
                        onChange={(e) => setToggleStates({ ...toggleStates, neon: e.target.checked })}
                      />
                      <div className="w-14 h-8 rounded-full bg-zinc-800 border border-zinc-700 peer-checked:border-cyan-500 peer-checked:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300" />
                      <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-zinc-600 peer-checked:bg-cyan-400 peer-checked:translate-x-6 peer-checked:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300" />
                    </div>
                    <span>Neon Style</span>
                  </label>
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={toggleStates.gradient}
                        onChange={(e) => setToggleStates({ ...toggleStates, gradient: e.target.checked })}
                      />
                      <div className="w-14 h-8 rounded-full bg-zinc-700 peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-violet-500 transition-all duration-300" />
                      <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white peer-checked:translate-x-6 transition-transform duration-300" />
                    </div>
                    <span>Gradient Style</span>
                  </label>
                </div>
              </Section>

              <Section title="Animated Checkboxes">
                <div className="flex flex-wrap items-center gap-8">
                  <label className="inline-flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-6 h-6 rounded-md border-2 border-zinc-600 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-all duration-200 group-hover:border-zinc-500" />
                      <svg className="absolute inset-0 w-6 h-6 text-white stroke-[3] scale-0 peer-checked:scale-100 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Animated Check</span>
                  </label>
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-600 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all duration-200" />
                      <svg className="absolute inset-0 w-6 h-6 text-white p-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Bounce Check</span>
                  </label>
                </div>
              </Section>

              <Section title="Day/Night Toggle">
                <button
                  onClick={() => setToggleStates({ ...toggleStates, dayNight: !toggleStates.dayNight })}
                  className={`relative w-20 h-10 rounded-full transition-colors duration-500 ${toggleStates.dayNight ? "bg-indigo-900" : "bg-sky-400"}`}
                >
                  <div className={`absolute top-1 w-8 h-8 rounded-full transition-all duration-500 ${toggleStates.dayNight ? "left-11 bg-zinc-200" : "left-1 bg-yellow-300"}`}>
                    {toggleStates.dayNight && (
                      <>
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-zinc-400" />
                        <div className="absolute top-3 left-5 w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      </>
                    )}
                  </div>
                  {toggleStates.dayNight && (
                    <>
                      <div className="absolute top-2 left-3 w-1 h-1 rounded-full bg-white animate-pulse" />
                      <div className="absolute top-5 left-5 w-0.5 h-0.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.5s" }} />
                      <div className="absolute top-3 left-7 w-0.5 h-0.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "1s" }} />
                    </>
                  )}
                  {!toggleStates.dayNight && (
                    <>
                      <div className="absolute top-2 right-3 w-4 h-2 bg-white rounded-full opacity-70" />
                      <div className="absolute top-5 right-5 w-3 h-1.5 bg-white rounded-full opacity-50" />
                    </>
                  )}
                </button>
              </Section>

              <Section title="Pill Toggle Group">
                <div className="inline-flex p-1 rounded-full bg-zinc-800">
                  {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => (
                    <button
                      key={option}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-zinc-400 hover:text-white first:bg-white first:text-zinc-900"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Section>
            </>
          )}

          {activeTab === "badges" && (
            <>
              <Section title="Glow & Gradient Badges">
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-shadow duration-300">
                    Glow Badge
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-violet-500/25">
                    Gradient Badge
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-transparent border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white transition-colors duration-200">
                    Outline Badge
                  </span>
                </div>
              </Section>

              <Section title="Status & Dot Badges">
                <div className="flex flex-wrap gap-4">
                  {(["online", "away", "busy", "offline"] as const).map((status) => {
                    const config = {
                      online: { color: "bg-emerald-500", ring: "ring-emerald-500/30" },
                      away: { color: "bg-amber-500", ring: "ring-amber-500/30" },
                      busy: { color: "bg-rose-500", ring: "ring-rose-500/30" },
                      offline: { color: "bg-zinc-500", ring: "ring-zinc-500/30" },
                    };
                    return (
                      <span key={status} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-300">
                        <span className={`w-2.5 h-2.5 rounded-full ring-4 ${config[status].color} ${config[status].ring}`} />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    );
                  })}
                </div>
              </Section>

              <Section title="Counter & Animated Badges">
                <div className="flex flex-wrap items-center gap-4">
                  {[3, 12, 99, 150].map((count) => (
                    <span key={count} className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full text-xs font-bold bg-rose-500 text-white">
                      {count > 99 ? "99+" : count}
                    </span>
                  ))}
                  <span className="relative inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-900 text-white overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                    Animated Badge
                    <style>{`
                      @keyframes shimmer {
                        100% { transform: translateX(100%); }
                      }
                    `}</style>
                  </span>
                </div>
              </Section>

              <Section title="Verified & Removable Tags">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">Username</span>
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5">
                      <svg className="w-3/4 h-3/4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  {["React", "TypeScript", "Tailwind"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-sm bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {tag}
                      <button className="p-0.5 rounded-full hover:bg-zinc-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </Section>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={itemVariants} className="space-y-4">
      <h2 className="text-xl font-semibold text-zinc-200">{title}</h2>
      <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
        {children}
      </div>
    </motion.section>
  );
}
