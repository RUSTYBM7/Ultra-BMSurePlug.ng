import { motion } from "framer-motion";
import { TrendingUp, Package, Globe, Zap, ArrowRight, CheckCircle, Briefcase } from "lucide-react";
import { Instagram, Youtube } from "lucide-react";
import { SiTiktok, SiFacebook, SiTelegram, SiX, SiSpotify, SiDiscord, SiTwitch, SiSnapchat, SiPinterest } from "react-icons/si";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { Icon: Instagram, label: "Instagram", count: 805, color: "text-pink-400" },
  { Icon: SiTiktok, label: "TikTok", count: 432, color: "text-slate-300" },
  { Icon: Youtube, label: "YouTube", count: 451, color: "text-red-400" },
  { Icon: SiFacebook, label: "Facebook", count: 507, color: "text-blue-400" },
  { Icon: SiX, label: "Threads", count: 44, color: "text-slate-400" },
  { Icon: SiX, label: "X (Twitter)", count: 287, color: "text-slate-300" },
  { Icon: Globe, label: "SEO & Traffic", count: 59, color: "text-violet-400" },
  { Icon: SiTelegram, label: "telegram", count: 610, color: "text-sky-400" },
  { Icon: Briefcase, label: "linkedin", count: 31, color: "text-blue-500" },
  { Icon: SiDiscord, label: "discord", count: 25, color: "text-indigo-400" },
  { Icon: SiTwitch, label: "twitch", count: 78, color: "text-purple-400" },
  { Icon: SiSnapchat, label: "snapchat", count: 19, color: "text-yellow-400" },
  { Icon: SiPinterest, label: "pinterest", count: 10, color: "text-red-400" },
  { Icon: SiSpotify, label: "spotify", count: 388, color: "text-green-400" },
];

const TOP_SERVICES = [
  { platform: "instagram", Icon: Instagram, name: "IG Followers (NG Fast)", tier: "Fast", price: "₦1,360/1k" },
  { platform: "instagram", Icon: Instagram, name: "IG Followers (NG Plus)", tier: "Plus", price: "₦1,920/1k", refill: true },
  { platform: "instagram", Icon: Instagram, name: "IG Followers (Global Plus)", tier: "Plus", price: "₦1,520/1k", refill: true },
  { platform: "instagram", Icon: Instagram, name: "IG Likes (NG Plus)", tier: "Plus", price: "₦800/1k", refill: true },
  { platform: "tiktok", Icon: SiTiktok, name: "TK Views (Fast)", tier: "Fast", price: "₦160/1k" },
  { platform: "tiktok", Icon: SiTiktok, name: "TK Followers (NG Plus)", tier: "Plus", price: "₦1,800/1k", refill: true },
  { platform: "youtube", Icon: Youtube, name: "YT Subscribers (Fast)", tier: "Fast", price: "₦3,200/1k", refill: true },
  { platform: "spotify", Icon: SiSpotify, name: "Spotify Streams (Fast)", tier: "Fast", price: "₦380/1k" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-primary mb-1">LIVE DASHBOARD</div>
            <h1 className="text-3xl md:text-4xl font-black">Platform Overview</h1>
          </div>
          <div className="bg-card border border-border/50 rounded-xl px-5 py-3 text-right">
            <div className="text-xs text-muted-foreground mb-0.5">AVAILABLE BALANCE</div>
            <div className="text-2xl font-black text-primary">₦2,305,771</div>
            <div className="text-xs text-muted-foreground">NGN</div>
          </div>
        </motion.div>

        {/* Main stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: TrendingUp, label: "Orders Delivered", value: "82,140,000", sub: "All time", color: "text-primary" },
            { icon: Package, label: "Services Available", value: "3,746", sub: "Active", color: "text-blue-400" },
            { icon: Globe, label: "Platforms Covered", value: "14+", sub: "Platforms", color: "text-violet-400" },
            { icon: Zap, label: "Delivered Today", value: "14,280+", sub: "Today", color: "text-primary" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={cn("h-4 w-4", stat.color)} />
                  <span className="text-xs text-muted-foreground">{stat.sub}</span>
                </div>
                <div className={cn("text-2xl font-black tabular-nums mb-0.5", stat.color)}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-8"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
            <h2 className="font-bold">Platforms</h2>
            <button className="text-sm text-primary flex items-center gap-1 hover:opacity-70 transition-opacity">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-border/20">
            {PLATFORMS.map(({ Icon, label, count, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 px-5 py-4 hover:bg-secondary/20 transition-colors cursor-pointer"
              >
                <Icon className={cn("h-5 w-5 shrink-0", color)} />
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">{count} services</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
            <h2 className="font-bold">Top Services</h2>
            <a href="/services" className="text-sm text-primary flex items-center gap-1 hover:opacity-70 transition-opacity">
              Browse catalog <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="divide-y divide-border/20">
            {TOP_SERVICES.map((service, i) => {
              const Icon = service.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary transition-colors">{service.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{service.tier}</span>
                        {service.refill && (
                          <span className="text-xs text-green-400 flex items-center gap-0.5">
                            <CheckCircle className="h-2.5 w-2.5" /> Refill
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold text-sm">{service.price}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
