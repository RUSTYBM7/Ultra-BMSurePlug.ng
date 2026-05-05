import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Plans() {
  const [email, setEmail] = useState("");

  const plans = [
    {
      id: "starter",
      tag: "STARTER",
      desc: "For growing creators & small businesses",
      price: 49000,
      tagline: "Ideal for solo creators, influencers starting out, and small Nigerian brands.",
      popular: false,
      agency: false,
      features: [
        "5,000 Instagram Followers/mo",
        "10,000 TikTok Views/mo",
        "2,000 YouTube Views/mo",
        "2 platforms covered",
        "Monthly performance report",
        "Email support (48hr response)",
        "Refill guarantee",
      ],
    },
    {
      id: "growth",
      tag: "GROWTH",
      desc: "For scaling brands & marketing teams",
      price: 149000,
      tagline: "Perfect for SMEs, e-commerce brands, and growing Nigerian businesses.",
      popular: true,
      agency: false,
      features: [
        "20,000 Instagram Followers/mo",
        "50,000 TikTok Views + Likes",
        "10,000 YouTube Subscribers/mo",
        "5,000 Telegram Members/mo",
        "4 platforms covered",
        "Bi-weekly analytics report",
        "Priority email support (12hr)",
        "30-day refill protection",
        "Dedicated growth strategy",
      ],
    },
    {
      id: "enterprise",
      tag: "ENTERPRISE",
      desc: "For agencies & large organisations",
      price: 399000,
      tagline: "Built for agencies, media houses, and enterprises managing multiple brands.",
      popular: false,
      agency: true,
      features: [
        "Unlimited monthly engagement",
        "10+ platforms covered",
        "Dedicated account manager",
        "Custom growth strategy",
        "24/7 WhatsApp priority support",
        "Weekly analytics & reporting",
        "API access for bulk orders",
        "White-label reporting available",
        "SLA-backed delivery",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            <Star className="h-3.5 w-3.5" />
            Monthly Business Plans
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">Predictable growth.</h1>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">Serious results.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Monthly packages built for Nigerian businesses that are serious about scaling their social presence. No guesswork. No waste. Just growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-2xl p-6 border relative flex flex-col",
                plan.popular
                  ? "border-primary/60 bg-gradient-to-b from-primary/12 to-card shadow-2xl shadow-primary/15"
                  : "border-border/50 bg-card"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-primary/30">
                    Most Popular
                  </div>
                </div>
              )}
              {plan.agency && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-card border border-border text-foreground text-xs font-bold px-5 py-1.5 rounded-full">
                    Agency Grade
                  </div>
                </div>
              )}

              <div className="mb-5">
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{plan.tag}</div>
                <div className="text-sm text-muted-foreground mb-3">{plan.desc}</div>
                <div className="text-4xl font-black mb-0.5">₦{plan.price.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">per month · billed monthly</div>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className={cn("h-4 w-4 shrink-0 mt-0.5", plan.popular ? "text-primary" : "text-green-400")} />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs text-muted-foreground/70 italic mb-4">{plan.tagline}</div>

              {/* Email input for starter plan */}
              {plan.id === "starter" && (
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-10 px-3 rounded-lg border border-border/50 bg-background/50 text-sm focus:outline-none focus:border-primary/50 mb-2"
                  />
                </div>
              )}

              <button className={cn(
                "w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all",
                plan.popular
                  ? "bg-primary text-primary-foreground hover:opacity-90 orange-glow"
                  : plan.agency
                  ? "bg-card border border-border/60 hover:border-primary/40 hover:text-primary"
                  : "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
              )}>
                Get {plan.tag.charAt(0) + plan.tag.slice(1).toLowerCase()} Plan
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
          <div className="px-6 py-5 border-b border-border/40">
            <h2 className="text-xl font-bold">Plan Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Feature</th>
                  {plans.map(p => (
                    <th key={p.id} className={cn("text-center px-4 py-4 text-sm font-semibold", p.popular ? "text-primary" : "")}>
                      {p.tag.charAt(0) + p.tag.slice(1).toLowerCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Monthly Platforms", values: ["2", "4", "10+"] },
                  { label: "Analytics Report", values: ["Monthly", "Bi-weekly", "Weekly"] },
                  { label: "Support Response", values: ["48hr email", "12hr email", "24/7 WhatsApp"] },
                  { label: "Refill Guarantee", values: [true, true, true] },
                  { label: "Account Manager", values: [false, false, true] },
                  { label: "White-label Reports", values: [false, false, true] },
                  { label: "API Access", values: [false, false, true] },
                  { label: "Custom Strategy", values: [false, true, true] },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="text-center px-4 py-3 text-sm">
                        {typeof val === "boolean" ? (
                          val ? <CheckCircle className="h-4 w-4 text-primary mx-auto" /> : <span className="text-muted-foreground/40">—</span>
                        ) : (
                          <span className={plans[j].popular ? "text-primary font-semibold" : ""}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "How does billing work?", a: "Plans are billed monthly in Naira. You can cancel at any time before the next billing cycle." },
              { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately." },
              { q: "What is the refill guarantee?", a: "If your engagement drops within 30 days of delivery, we refill it for free. No questions asked." },
              { q: "Do you need my password?", a: "Never. All our services use only your public profile URL. No login credentials required." },
            ].map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl border border-border/50 bg-card">
                <div className="font-semibold mb-2 flex items-start gap-2">
                  <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {faq.q}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
