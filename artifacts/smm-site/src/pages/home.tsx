import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Instagram, Youtube, ArrowRight, CheckCircle, Star, Zap,
  TrendingUp, Shield, Users, Globe, RefreshCcw, Headphones, Mic, Waves
} from "lucide-react";
import { SiTiktok, SiTelegram, SiFacebook, SiX, SiSpotify } from "react-icons/si";
import { cn } from "@/lib/utils";

const VOICE_STUDIO_URL = "/voice-studio/";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = end / 60;
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + step;
        if (next >= end) { clearInterval(timer); return end; }
        return next;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{Math.floor(count).toLocaleString()}{suffix}</>;
}

const platforms = [
  { Icon: Instagram, label: "Instagram", count: "805", color: "from-pink-500 to-purple-600" },
  { Icon: SiTiktok, label: "TikTok", count: "432", color: "from-slate-800 to-slate-600" },
  { Icon: Youtube, label: "YouTube", count: "451", color: "from-red-600 to-red-700" },
  { Icon: SiFacebook, label: "Facebook", count: "507", color: "from-blue-600 to-blue-700" },
  { Icon: SiX, label: "X (Twitter)", count: "287", color: "from-slate-700 to-slate-800" },
  { Icon: SiTelegram, label: "Telegram", count: "610", color: "from-sky-500 to-blue-600" },
  { Icon: SiSpotify, label: "Spotify", count: "388", color: "from-green-600 to-green-700" },
  { Icon: Globe, label: "SEO & Traffic", count: "59", color: "from-violet-600 to-purple-700" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(21_100%_52%/0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(21_100%_52%/0.06)_0%,transparent_50%)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/80 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Nigeria's #1 Social Growth Studio · 3,700+ services live
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] mb-6 tracking-tight">
                Grow your brand
                <br />on every platform.
                <br />
                <span className="text-primary">Real results, fast.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                BM SocialMedia Hub delivers real followers, views, and engagement across 20+ platforms. No passwords. Transparent Naira pricing. Built for Nigerian creators, trusted globally.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/services">
                  <button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-all orange-glow hover:scale-105">
                    Start Growing →
                  </button>
                </Link>
                <Link href="/services">
                  <button className="h-12 px-8 rounded-full border-2 border-border/60 text-foreground font-semibold text-base hover:border-primary/50 transition-all">
                    Browse 3,700+ Services
                  </button>
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { value: "3,700+", label: "Services" },
                  { value: "20+", label: "Platforms" },
                  { value: "₦1,600", label: "NGN Rate" },
                  { value: "30-day", label: "Refill" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-black text-primary tabular-nums">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Live Orders mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Floating platform badges */}
              <div className="absolute -top-6 -right-4 z-20">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-xl animate-float">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute top-1/3 -right-6 z-20">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-black flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                  <SiTiktok className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 z-20">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "2s" }}>
                  <Youtube className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-1/4 -left-4 z-20">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "0.5s" }}>
                  <SiFacebook className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Main card */}
              <div className="rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/40">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground flex-1 text-center">BM SocialMedia Hub — Live Orders</span>
                  <span className="text-xs text-primary font-medium">● Live</span>
                </div>

                <div className="p-4 space-y-3">
                  {[
                    {
                      platform: "ig",
                      service: "IG Followers (NG Plus)",
                      detail: "10,000 followers · @yourhandle",
                      status: "Live",
                      progress: 73,
                      remaining: "2,700",
                      charged: "₦7,840",
                    },
                    {
                      platform: "tk",
                      service: "TK Views (Fast)",
                      detail: "50,000 views · Done in 8 min",
                      status: "Done",
                      progress: 100,
                      remaining: "0",
                      charged: "₦2,100",
                    },
                    {
                      platform: "yt",
                      service: "Order complete — email sent",
                      detail: "YT Subscribers (Pro) · 5,000 delivered",
                      status: "Complete",
                      progress: 100,
                      remaining: "0",
                      charged: "₦4,500",
                    },
                  ].map((order, i) => (
                    <div key={i} className="p-3 rounded-lg border border-border/40 bg-background/60">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            order.platform === "ig" ? "bg-pink-500/20 text-pink-400" :
                            order.platform === "tk" ? "bg-slate-500/20 text-slate-400" :
                            "bg-red-500/20 text-red-400"
                          )}>
                            {order.platform === "ig" ? <Instagram className="h-3 w-3" /> :
                             order.platform === "tk" ? <SiTiktok className="h-3 w-3" /> :
                             <Youtube className="h-3 w-3" />}
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{order.service}</div>
                            <div className="text-xs text-muted-foreground">{order.detail}</div>
                          </div>
                        </div>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          order.status === "Live" ? "bg-primary/20 text-primary" :
                          order.status === "Done" ? "bg-green-500/20 text-green-400" :
                          "bg-blue-500/20 text-blue-400"
                        )}>
                          {order.status === "Done" ? "✓ Done" : order.status}
                        </span>
                      </div>
                      {order.status === "Live" && (
                        <>
                          <div className="h-1.5 bg-secondary rounded-full mb-2 overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${order.progress}%` }} />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "Progress", value: `${order.progress}%` },
                              { label: "Remaining", value: order.remaining },
                              { label: "Charged", value: order.charged },
                            ].map((m) => (
                              <div key={m.label} className="text-center">
                                <div className={cn("text-sm font-bold", m.label === "Charged" ? "text-primary" : "")}>{m.value}</div>
                                <div className="text-xs text-muted-foreground">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      Today's delivery
                    </div>
                    <span className="text-sm font-bold text-primary">14,280+ units</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 border-y border-border/30 bg-card/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 82140000, suffix: "+", label: "Orders Delivered", desc: "All time" },
              { value: 3746, suffix: "", label: "Services Available", desc: "Active" },
              { value: 14, suffix: "+", label: "Platforms Covered", desc: "Platforms" },
              { value: 14280, suffix: "+", label: "Delivered Today", desc: "Today" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black tabular-nums text-primary mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-semibold text-sm">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Every platform. All in one place.</h2>
            <p className="text-muted-foreground text-lg">3,700+ services across 14+ platforms. Structured across six tiers — Fast, Plus, Pro, Steady, Premium, Elite.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {platforms.map(({ Icon, label, count, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href="/services">
                  <div className="group p-5 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-all cursor-pointer">
                    <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 group-hover:scale-110 transition-transform", color)}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="font-bold text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">{count} services</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BM */}
      <section className="py-20 px-4 bg-card/20 border-y border-border/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Why Nigerian creators choose BM</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We're not just a panel. We're Nigeria's social growth partner.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Shield, title: "No Password Required", desc: "We never ask for your login credentials. Everything works through your public profile URL. Zero risk." },
              { Icon: Zap, title: "Instant Delivery", desc: "Most orders start within minutes. Fast tier delivers in under 10 minutes. Track every unit in real time." },
              { Icon: RefreshCcw, title: "30-Day Refill Guarantee", desc: "If your followers drop within 30 days, we refill them for free. No questions asked." },
              { Icon: TrendingUp, title: "Real Growth Metrics", desc: "No bots or fake accounts. Our services use authentic engagement methods that stick and build real credibility." },
              { Icon: Globe, title: "NGN-First Pricing", desc: "All prices in Naira. No dollar conversion. No bank fees. Pay with your Nigerian account directly." },
              { Icon: Users, title: "Built for Nigeria", desc: "Localized support, Naira pricing, and services optimized for Nigerian audiences and algorithms." },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BMVoicePlug PROMO SECTION ===== */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(184_100%_50%/0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[hsl(184_100%_50%/0.25)] bg-gradient-to-br from-[hsl(184_100%_50%/0.08)] via-card to-card p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-[hsl(184_100%_50%/0.08)]"
          >
            {/* Decorative waveform */}
            <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 flex items-center gap-[2px] overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-[hsl(184_100%_50%)]"
                  style={{
                    height: `${Math.sin(i * 0.5) * 50 + 60}%`,
                    opacity: 0.5 + Math.sin(i * 0.3) * 0.5,
                  }}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(184_100%_50%/0.3)] bg-[hsl(184_100%_50%/0.1)] text-[hsl(184_100%_50%)] text-xs font-semibold tracking-wider uppercase mb-5">
                  <Waves className="h-3.5 w-3.5" />
                  New Product · AI Voice Platform
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                  Meet{" "}
                  <span className="text-[hsl(184_100%_50%)]">BMVoicePlug</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nigeria's first AI voice studio. Generate studio-quality voiceovers in authentic Nigerian accents. Clone your voice. Create content that sounds real.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "20+ ElevenLabs-style voice features",
                    "15+ authentic Nigerian voices",
                    "Text to speech, voice cloning, dubbing & more",
                    "Pricing from ₦25 — start free",
                    "Independent platform: BMVoicePlug.ng",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-[hsl(184_100%_50%)] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href={VOICE_STUDIO_URL} target="_blank" rel="noreferrer">
                  <button className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[hsl(184_100%_50%)] text-black font-bold text-base hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[hsl(184_100%_50%/0.3)]">
                    <Mic className="h-5 w-5" />
                    Try BMVoicePlug Free
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </a>
              </div>

              {/* Mini preview card */}
              <div className="rounded-2xl border border-[hsl(184_100%_50%/0.2)] bg-background/60 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[hsl(184_100%_50%)] animate-pulse" />
                  <span className="text-xs font-semibold text-[hsl(184_100%_50%)] uppercase tracking-wider">BMVoicePlug Studio · Live</span>
                </div>

                <div className="bg-card/80 rounded-xl p-3 mb-4 border border-border/30 font-mono text-xs text-muted-foreground leading-relaxed">
                  "Welcome to BMVoicePlug — Nigeria's premier AI voice studio. Your brand, your voice, amplified by AI."
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { name: "Amara", accent: "Lagos Female", active: true },
                    { name: "Emeka", accent: "Igbo Male", active: false },
                    { name: "Zara", accent: "Abuja Female", active: false },
                  ].map((voice) => (
                    <div key={voice.name} className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all",
                      voice.active
                        ? "border-[hsl(184_100%_50%/0.4)] bg-[hsl(184_100%_50%/0.08)]"
                        : "border-border/30 bg-card/50"
                    )}>
                      <div className="flex items-center gap-2">
                        <Headphones className={cn("h-4 w-4", voice.active ? "text-[hsl(184_100%_50%)]" : "text-muted-foreground")} />
                        <span className={voice.active ? "font-medium" : "text-muted-foreground"}>{voice.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{voice.accent}</span>
                    </div>
                  ))}
                </div>

                {/* Mini waveform */}
                <div className="flex items-center gap-[2px] h-8">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-[hsl(184_100%_50%)]"
                      style={{
                        height: `${Math.abs(Math.sin(i * 0.4)) * 70 + 15}%`,
                        opacity: 0.4 + Math.abs(Math.sin(i * 0.3)) * 0.6,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-border/30">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "Voices", value: "20+" },
                      { label: "Features", value: "20+" },
                      { label: "From", value: "₦25" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="text-lg font-black text-[hsl(184_100%_50%)]">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans preview */}
      <section className="py-20 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Predictable growth. Serious results.</h2>
            <p className="text-muted-foreground text-lg">Monthly packages built for Nigerian businesses serious about scaling their social presence.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter", naira: "₦49,000", desc: "For growing creators & small businesses",
                features: ["5,000 Instagram Followers/mo", "10,000 TikTok Views/mo", "2,000 YouTube Views/mo", "2 platforms covered", "30-day refill guarantee"],
                popular: false
              },
              {
                name: "Growth", naira: "₦149,000", desc: "For scaling brands & marketing teams",
                features: ["20,000 Instagram Followers/mo", "50,000 TikTok Views + Likes", "10,000 YouTube Subscribers/mo", "4 platforms covered", "Bi-weekly analytics report"],
                popular: true
              },
              {
                name: "Enterprise", naira: "₦399,000", desc: "For agencies & large organisations",
                features: ["Unlimited monthly engagement", "10+ platforms covered", "Dedicated account manager", "24/7 WhatsApp priority support", "White-label reporting"],
                popular: false
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 border relative",
                  plan.popular
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card shadow-xl shadow-primary/10"
                    : "border-border/50 bg-card"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-lg">Most Popular</span>
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-widest font-bold text-primary mb-1">{plan.name}</div>
                  <div className="text-3xl font-black mb-1">{plan.naira}</div>
                  <div className="text-xs text-muted-foreground">per month · billed monthly</div>
                  <div className="text-sm text-muted-foreground mt-2">{plan.desc}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/plans">
                  <button className={cn(
                    "w-full h-10 rounded-xl font-semibold text-sm transition-all",
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90 orange-glow"
                      : "border border-border/60 hover:border-primary/40 hover:text-primary"
                  )}>
                    Get {plan.name}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/plans">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mx-auto">
                View full plan details <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to grow?</h2>
            <p className="text-muted-foreground text-xl mb-10">Join thousands of Nigerian creators already growing with BM SocialMedia Hub.</p>
            <Link href="/services">
              <button className="h-14 px-12 rounded-full bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all orange-glow hover:scale-105">
                Browse 3,700+ Services →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
