import { useState } from "react";
import { motion } from "framer-motion";
import { useGetPricing } from "@workspace/api-client-react";
import { Check, Star, Zap, Calculator, CreditCard, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

function initializePaystackPayment(opts: {
  amount: number;
  email: string;
  label: string;
  onSuccess: (ref: string) => void;
}) {
  const { amount, email, label, onSuccess } = opts;
  const script = document.querySelector('script[src*="paystack"]');
  if (!script) {
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    document.head.appendChild(s);
    s.onload = () => initializePaystackPayment(opts);
    return;
  }
  const handler = (window as any).PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email || "customer@bmsureplug.online",
    amount: amount * 100,
    currency: "NGN",
    ref: `VOICE-${Date.now()}`,
    metadata: { custom_fields: [{ display_name: "Service", variable_name: "service", value: label }] },
    callback: (res: any) => onSuccess(res.reference),
    onClose: () => {},
  });
  handler.openIframe();
}

const CREDIT_PACKS_STATIC = [
  { id: "c1", label: "Starter Pack", credits: 50, priceNaira: 250, durationLabel: "~10 min audio", popular: false },
  { id: "c2", label: "Creator Pack", credits: 200, priceNaira: 900, durationLabel: "~40 min audio", popular: true },
  { id: "c3", label: "Pro Pack", credits: 500, priceNaira: 2000, durationLabel: "~100 min audio", popular: false },
  { id: "c4", label: "Studio Pack", credits: 1500, priceNaira: 5500, durationLabel: "300+ min audio", popular: false },
];

const PLANS_STATIC = [
  { id: "free", name: "Free", isFree: true, isPopular: false, priceNaira: 0, credits: 50, features: ["50 credits/month", "All standard voices", "MP3 download", "Basic studio", "1 voice clone slot"] },
  { id: "creator", name: "Creator", isFree: false, isPopular: false, priceNaira: 1800, credits: 250, features: ["250 credits/month", "All premium voices", "WAV + MP3 download", "Full studio access", "3 voice clone slots"] },
  { id: "pro", name: "Pro", isFree: false, isPopular: true, priceNaira: 4500, credits: 800, features: ["800 credits/month", "All 91+ voices", "Batch processing", "Priority delivery", "10 voice clone slots", "API access"] },
  { id: "studio", name: "Studio", isFree: false, isPopular: false, priceNaira: 12000, credits: 3000, features: ["3,000 credits/month", "All voices + early access", "Commercial license", "Resell rights", "Unlimited clones", "Dedicated support"] },
];

export default function Pricing() {
  const { data, isLoading } = useGetPricing();
  const [calcMinutes, setCalcMinutes] = useState([5]);
  const [payingPack, setPayingPack] = useState<string | null>(null);
  const [payingPlan, setPayingPlan] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const plans = data?.plans?.length ? data.plans : PLANS_STATIC;
  const creditPacks = data?.creditPacks?.length ? data.creditPacks : CREDIT_PACKS_STATIC;

  const estimatedCredits = calcMinutes[0] <= 1 ? 5 : calcMinutes[0] <= 2 ? 10 : calcMinutes[0] <= 5 ? 25 : calcMinutes[0] <= 10 ? 50 : calcMinutes[0] <= 20 ? 100 : calcMinutes[0] <= 50 ? 250 : 500;
  const estimatedNaira = estimatedCredits === 5 ? 25 : estimatedCredits === 10 ? 40 : estimatedCredits === 25 ? 90 : estimatedCredits === 50 ? 170 : estimatedCredits === 100 ? 320 : estimatedCredits === 250 ? 750 : 1400;

  function handleBuyPack(pack: typeof CREDIT_PACKS_STATIC[0]) {
    setPayingPack(pack.id);
    setSuccessMsg("");
    initializePaystackPayment({
      amount: Number(pack.priceNaira),
      email: "customer@bmsureplug.online",
      label: `${pack.label} — ${pack.credits} credits`,
      onSuccess: (ref) => {
        setPayingPack(null);
        setSuccessMsg(`Payment successful! Ref: ${ref}. Credits will be added shortly.`);
      },
    });
    setTimeout(() => setPayingPack(null), 2000);
  }

  function handleBuyPlan(plan: typeof PLANS_STATIC[0]) {
    if (plan.isFree) return;
    setPayingPlan(plan.id);
    setSuccessMsg("");
    initializePaystackPayment({
      amount: Number(plan.priceNaira),
      email: "customer@bmsureplug.online",
      label: `${plan.name} Plan — ${plan.credits} credits/month`,
      onSuccess: (ref) => {
        setPayingPlan(null);
        setSuccessMsg(`Subscription activated! Ref: ${ref}. Your ${plan.name} plan is now active.`);
      },
    });
    setTimeout(() => setPayingPlan(null), 2000);
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
            Pricing in Naira · Paystack Secured
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Start free. Pay only when you need more. No hidden fees, no dollar conversion surprises.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-green-400" /> Paystack Secured</span>
            <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-blue-400" /> Cards · Bank · USSD</span>
          </div>
        </motion.div>

        {/* Success banner */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm flex items-center gap-3"
          >
            <Check className="h-5 w-5 shrink-0" />
            {successMsg}
          </motion.div>
        )}

        {/* Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {plans.map((plan: any, i: number) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-xl border p-6 relative flex flex-col",
                plan.isPopular
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-primary/5 shadow-xl shadow-primary/10"
                  : "border-border/50 bg-card"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-xs px-3 shadow-lg shadow-primary/30">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-4">
                <div className="text-lg font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-extrabold mb-1">
                  {plan.isFree ? "Free" : `₦${Number(plan.priceNaira).toLocaleString()}`}
                </div>
                {!plan.isFree && <div className="text-xs text-muted-foreground">per month</div>}
              </div>

              <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-background/50 border border-border/40">
                <Star className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-semibold">{Number(plan.credits).toLocaleString()} credits/mo</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {((plan.features as string[]) || []).map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className={cn("h-4 w-4 shrink-0 mt-0.5", plan.isPopular ? "text-primary" : "text-green-400")} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.isFree ? (
                <Link href="/studio">
                  <Button className="w-full" variant="outline">Start Free</Button>
                </Link>
              ) : (
                <button
                  onClick={() => handleBuyPlan(plan)}
                  disabled={payingPlan === plan.id}
                  className={cn(
                    "w-full h-10 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border/60 text-foreground hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  {payingPlan === plan.id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="h-3.5 w-3.5" />
                      Pay ₦{Number(plan.priceNaira).toLocaleString()}
                    </>
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Credit Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Pay Per Use — Credit Packs</h2>
            <p className="text-muted-foreground">No subscription needed. Buy credits when you need them. Instant activation via Paystack.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPacks.map((pack: any, i: number) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "rounded-xl border bg-card p-5 hover:border-primary/30 transition-all relative",
                  pack.popular ? "border-primary/40 shadow-lg shadow-primary/5" : "border-border/50"
                )}
              >
                {pack.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-primary text-primary-foreground">BEST VALUE</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{pack.label}</span>
                </div>
                <div className="text-3xl font-extrabold mb-1">₦{Number(pack.priceNaira).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mb-1">{Number(pack.credits).toLocaleString()} credits</div>
                <div className="text-xs text-primary/80 mb-5">{pack.durationLabel}</div>
                <button
                  onClick={() => handleBuyPack(pack)}
                  disabled={payingPack === pack.id}
                  className={cn(
                    "w-full h-9 rounded-lg text-sm font-semibold border transition-all flex items-center justify-center gap-2",
                    pack.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                      : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  {payingPack === pack.id ? (
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Buy Now <ChevronRight className="h-3 w-3" /></>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-green-400" />
            All payments secured by Paystack · Card, Bank Transfer, USSD accepted
          </div>
        </motion.div>

        {/* Credit calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card p-8 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Credit Calculator</h2>
              <p className="text-sm text-muted-foreground">Estimate your cost before you generate</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Audio Duration</span>
                <span className="text-lg font-bold tabular-nums">{calcMinutes[0]} min</span>
              </div>
              <Slider value={calcMinutes} onValueChange={setCalcMinutes} min={1} max={100} step={1} className="mb-3" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>1 min</span>
                <span>100 min</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/50 bg-background/50 p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Credits Needed</div>
                <div className="text-3xl font-extrabold text-primary tabular-nums">{estimatedCredits}</div>
                <div className="text-xs text-muted-foreground mt-1">credits</div>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Estimated Cost</div>
                <div className="text-3xl font-extrabold tabular-nums">₦{estimatedNaira}</div>
                <div className="text-xs text-muted-foreground mt-1">naira</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-border/40">
            <h2 className="text-xl font-bold">Audio Credit Pricing</h2>
            <p className="text-sm text-muted-foreground">Per-generation costs by audio length</p>
          </div>
          <div className="divide-y divide-border/30">
            {[
              { range: "0 – 1 minute", credits: 5, naira: 25 },
              { range: "1 – 2 minutes", credits: 10, naira: 40 },
              { range: "2 – 5 minutes", credits: 25, naira: 90 },
              { range: "5 – 10 minutes", credits: 50, naira: 170 },
              { range: "10 – 20 minutes", credits: 100, naira: 320 },
              { range: "20 – 50 minutes", credits: 250, naira: 750 },
              { range: "50 – 100 minutes", credits: 500, naira: 1400 },
            ].map((tier, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors">
                <span className="font-medium">{tier.range}</span>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-muted-foreground tabular-nums">{tier.credits} credits</span>
                  <span className="text-primary font-bold tabular-nums text-lg">₦{tier.naira}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
