import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Shield, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    id: "bronze",
    name: "Bronze",
    icon: "🥉",
    discount: "Retail",
    tag: "Default tier",
    unlock: null,
    color: "border-amber-700/40 bg-amber-900/10",
    tagColor: "text-amber-500",
    features: [
      "Access to 3,700+ services",
      "₦1,600 rate on all prices",
      "5% commission on referrals",
      "Email order notifications",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    icon: "🥈",
    discount: "-8%",
    tag: "Unlock at ₦100,000 spent",
    unlock: 100000,
    color: "border-slate-500/40 bg-slate-500/10",
    tagColor: "text-slate-300",
    features: [
      "8% discount on all services",
      "Priority order processing",
      "5% referral commission",
      "Monthly report",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    icon: "🥇",
    discount: "-15%",
    tag: "Unlock at ₦500,000 spent",
    unlock: 500000,
    color: "border-yellow-500/40 bg-yellow-500/10",
    tagColor: "text-yellow-400",
    popular: true,
    features: [
      "15% discount on all services",
      "API access for automation",
      "5% referral commission",
      "Account manager",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: "💎",
    discount: "-22%",
    tag: "Unlock at ₦2,000,000 spent",
    unlock: 2000000,
    color: "border-cyan-400/30 bg-cyan-400/5",
    tagColor: "text-cyan-400",
    features: [
      "22% off — maximum savings",
      "Custom pricing on bulk",
      "5% referral commission",
      "White-label option",
    ],
  },
];

const EXAMPLE_SERVICE = { name: "IG Followers (Plus tier)", retailPrice: 1000 };

export default function Reseller() {
  const tiers = [
    { name: "Bronze", discount: 0 },
    { name: "Silver", discount: 0.08 },
    { name: "Gold", discount: 0.15 },
    { name: "Platinum", discount: 0.22 },
  ];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            🤝 Reseller Program
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">Grow your income while</h1>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">growing others.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock wholesale pricing, earn 5% on every referral, and scale from Bronze to Platinum as your volume grows. No targets. No contracts.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn("rounded-2xl p-5 border relative", tier.color)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                </div>
              )}
              <div className="text-2xl mb-2">{tier.icon}</div>
              <div className={cn("font-black text-lg mb-0.5", tier.tagColor)}>{tier.name}</div>
              <div className="text-3xl font-black mb-1">{tier.discount}</div>
              <div className="text-xs text-muted-foreground mb-4">{tier.tag}</div>
              <ul className="space-y-1.5">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-1.5 text-xs">
                    <ArrowRight className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Wholesale pricing example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-14"
        >
          <div className="px-6 py-5 border-b border-border/40">
            <h2 className="font-bold text-xl">Wholesale Pricing Example</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Based on {EXAMPLE_SERVICE.name} at ₦{EXAMPLE_SERVICE.retailPrice.toLocaleString()}/1k
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 bg-secondary/20">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tier</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Retail /1K</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Price /1K</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Savings /1K</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => {
                  const yourPrice = Math.round(EXAMPLE_SERVICE.retailPrice * (1 - tier.discount));
                  const savings = EXAMPLE_SERVICE.retailPrice - yourPrice;
                  return (
                    <tr key={tier.name} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-primary">{tier.name}</td>
                      <td className="text-center px-4 py-4 text-sm text-muted-foreground">₦{EXAMPLE_SERVICE.retailPrice.toLocaleString()}</td>
                      <td className="text-center px-4 py-4 font-bold text-primary">₦{yourPrice.toLocaleString()}</td>
                      <td className="text-center px-4 py-4 text-sm font-semibold text-green-400">
                        {savings > 0 ? `₦${savings.toLocaleString()}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            { Icon: TrendingUp, title: "Volume-based discounts", desc: "The more you spend, the bigger your discount. No manual negotiation — it unlocks automatically." },
            { Icon: Star, title: "5% Referral Commission", desc: "Earn 5% on every order your referrals make. Unlimited referrals, unlimited earnings. Paid monthly." },
            { Icon: Shield, title: "API Access at Gold+", desc: "Gold and Platinum resellers get full API access to automate bulk ordering and build their own panels." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-xl border border-border/50 bg-card">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-bold mb-2">{title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center rounded-2xl border border-primary/30 bg-primary/5 p-10">
          <h2 className="text-3xl font-black mb-3">Start reselling today</h2>
          <p className="text-muted-foreground mb-6">Create your free account and start at Bronze tier. Upgrade automatically as you grow.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all orange-glow">
              Create Reseller Account →
            </button>
            <button className="h-12 px-8 rounded-full border border-border/60 font-semibold hover:border-primary/40 transition-all">
              Read API Docs
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
