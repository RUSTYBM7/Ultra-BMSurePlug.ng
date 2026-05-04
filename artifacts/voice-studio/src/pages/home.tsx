import { Link } from "wouter";
import { motion } from "framer-motion";
import { useGetVoiceStats, useGetPricing } from "@workspace/api-client-react";
import { Mic, Zap, Globe, Shield, Star, ChevronRight, Play, Users, Clock, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function WaveformAnimation({ active = true }: { active?: boolean }) {
  const bars = Array.from({ length: 32 });
  return (
    <div className="flex items-center gap-[2px] h-16">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-primary"
          animate={active ? {
            scaleY: [0.2, Math.random() * 0.8 + 0.2, 0.2],
            opacity: [0.4, 1, 0.4],
          } : { scaleY: 0.2 }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
          style={{ height: "100%", transformOrigin: "center" }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { data: stats } = useGetVoiceStats();
  const { data: pricing } = useGetPricing();

  const features = [
    { icon: Mic, title: "15+ Nigerian Voices", desc: "Authentic accents from Lagos, Abuja, Port Harcourt and beyond. Igbo, Yoruba, Hausa — your audience will feel at home." },
    { icon: Zap, title: "Instant Generation", desc: "Transform text to studio-quality audio in seconds. No queues, no waiting. Just type and generate." },
    { icon: Globe, title: "70+ Languages", desc: "Create content in multiple languages. Reach diaspora audiences and global markets with ease." },
    { icon: Shield, title: "Voice Cloning", desc: "Clone your own voice in minutes. Upload a 30-second audio sample and get a digital twin ready to generate." },
  ];

  const freePlan = pricing?.plans?.find(p => p.isFree);
  const proPlan = pricing?.plans?.find(p => p.isPopular);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
              Nigeria's #1 AI Voice Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Your voice,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
                amplified by AI
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Generate studio-quality voiceovers in authentic Nigerian accents. Clone your voice. Create content that sounds real — because it is.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link href="/studio">
                <Button size="lg" className="gap-2 px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20">
                  <Mic className="h-5 w-5" />
                  Start Creating Free
                </Button>
              </Link>
              <Link href="/voices">
                <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base border-border/50 hover:border-primary/50">
                  <Play className="h-4 w-4" />
                  Browse Voices
                </Button>
              </Link>
            </div>

            {/* Waveform */}
            <div className="flex justify-center mb-6">
              <WaveformAnimation />
            </div>

            <p className="text-xs text-muted-foreground tracking-wider uppercase">Live voice generation preview</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="py-16 border-y border-border/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { label: "Voices Available", value: `${stats.totalVoices}+`, icon: Mic },
                { label: "Generations", value: `${stats.totalGenerations.toLocaleString()}+`, icon: Zap },
                { label: "Minutes Generated", value: `${Math.round(stats.totalMinutes)}+`, icon: Clock },
                { label: "Active Creators", value: `${stats.activeUsers.toLocaleString()}+`, icon: Users },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="h-6 w-6 text-primary mx-auto mb-3 opacity-70" />
                    <div className="text-3xl md:text-4xl font-bold mb-1 tabular-nums">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for Nigerian Creators</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to create professional voice content — without the production cost.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voice Studio Preview */}
      <section className="py-24 px-4 bg-card/30 border-y border-border/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Try it right now</h2>
            <p className="text-muted-foreground text-lg">50 free credits every month. No card required.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card p-8 shadow-2xl shadow-primary/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Voice Studio</span>
            </div>

            <div className="bg-background/60 rounded-xl p-4 mb-6 border border-border/40 text-sm text-muted-foreground font-mono">
              "Welcome to BMsureplug Voice Studio — Nigeria's premier AI voice platform. Create stunning audio content in seconds."
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Waves className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Amara</div>
                  <div className="text-xs text-muted-foreground">Nigerian Female</div>
                </div>
              </div>
              <WaveformAnimation />
            </div>

            <Link href="/studio">
              <Button className="w-full gap-2 h-11">
                <Mic className="h-4 w-4" />
                Open Voice Studio
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing preview */}
      {pricing && (
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Priced for Nigeria</h2>
              <p className="text-muted-foreground text-lg">Start free. Pay only for what you use. No subscriptions required.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[freePlan, proPlan].filter(Boolean).map((plan) => (
                <motion.div
                  key={plan!.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-6 border ${plan!.isPopular ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10" : "border-border/50 bg-card"}`}
                >
                  {plan!.isPopular && (
                    <Badge className="mb-3 bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                  )}
                  <div className="text-2xl font-bold mb-1">{plan!.name}</div>
                  <div className="text-3xl font-extrabold mb-4">
                    {plan!.isFree ? "Free" : `₦${Number(plan!.priceNaira).toLocaleString()}`}
                    {!plan!.isFree && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">{plan!.credits} credits/month</div>
                  <ul className="space-y-2 mb-6">
                    {((plan!.features as string[]) || []).slice(0, 4).map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Star className="h-3.5 w-3.5 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing">
                    <Button variant={plan!.isPopular ? "default" : "outline"} className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                  View all plans and credit packs
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to find your voice?
            </h2>
            <p className="text-muted-foreground text-xl mb-10">
              Join thousands of Nigerian creators already using BMsureplug Voice Studio.
            </p>
            <Link href="/studio">
              <Button size="lg" className="gap-2 px-10 h-14 text-lg font-semibold shadow-xl shadow-primary/20">
                <Mic className="h-6 w-6" />
                Start for Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
