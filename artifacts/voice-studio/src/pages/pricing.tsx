import { useState } from "react";
import { motion } from "framer-motion";
import { useGetPricing } from "@workspace/api-client-react";
import { Check, Star, Zap, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export default function Pricing() {
  const { data, isLoading } = useGetPricing();
  const [calcMinutes, setCalcMinutes] = useState([5]);

  const plans = data?.plans || [];
  const creditPacks = data?.creditPacks || [];

  const estimatedCredits = calcMinutes[0] <= 1 ? 5 : calcMinutes[0] <= 2 ? 10 : calcMinutes[0] <= 5 ? 25 : calcMinutes[0] <= 10 ? 50 : calcMinutes[0] <= 20 ? 100 : calcMinutes[0] <= 50 ? 250 : 500;
  const estimatedNaira = estimatedCredits === 5 ? 25 : estimatedCredits === 10 ? 40 : estimatedCredits === 25 ? 90 : estimatedCredits === 50 ? 170 : estimatedCredits === 100 ? 320 : estimatedCredits === 250 ? 750 : 1400;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
            Pricing in Naira
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Start free. Pay only when you need more. No hidden fees, no dollar conversion surprises.
          </p>
        </motion.div>

        {/* Plans */}
        {isLoading ? (
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border/30 bg-card h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {plans.map((plan, i) => (
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
                  <span className="text-sm font-semibold">{plan.credits.toLocaleString()} credits/mo</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {((plan.features as string[]) || []).map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className={cn("h-4 w-4 shrink-0 mt-0.5", plan.isPopular ? "text-primary" : "text-green-400")} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/studio">
                  <Button
                    className="w-full"
                    variant={plan.isPopular ? "default" : plan.isFree ? "outline" : "secondary"}
                  >
                    {plan.isFree ? "Start Free" : `Get ${plan.name}`}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Credit Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Pay Per Use — Credit Packs</h2>
            <p className="text-muted-foreground">No subscription needed. Buy credits when you need them.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPacks.map((pack, i) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{pack.label}</span>
                </div>
                <div className="text-3xl font-extrabold mb-1">₦{Number(pack.priceNaira).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mb-1">{pack.credits} credits</div>
                <div className="text-xs text-primary/80 mb-4">{pack.durationLabel}</div>
                <Button variant="outline" size="sm" className="w-full">Buy Now</Button>
              </motion.div>
            ))}
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
              <Slider
                value={calcMinutes}
                onValueChange={setCalcMinutes}
                min={1}
                max={100}
                step={1}
                className="mb-3"
              />
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

        {/* Voice duration pricing table */}
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
