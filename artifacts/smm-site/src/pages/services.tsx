import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, RefreshCcw, Zap, Star } from "lucide-react";
import { Instagram, Youtube } from "lucide-react";
import { SiTiktok, SiFacebook, SiTelegram, SiX, SiSpotify, SiDiscord, SiTwitch, SiSnapchat, SiPinterest } from "react-icons/si";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { id: "all", label: "All Platforms", Icon: null },
  { id: "instagram", label: "Instagram", Icon: Instagram },
  { id: "tiktok", label: "TikTok", Icon: SiTiktok },
  { id: "youtube", label: "YouTube", Icon: Youtube },
  { id: "facebook", label: "Facebook", Icon: SiFacebook },
  { id: "threads", label: "Threads", Icon: null },
  { id: "x", label: "X (Twitter)", Icon: SiX },
  { id: "seo", label: "SEO & Traffic", Icon: Globe },
  { id: "telegram", label: "telegram", Icon: SiTelegram },
  { id: "linkedin", label: "linkedin", Icon: null },
  { id: "discord", label: "discord", Icon: SiDiscord },
  { id: "twitch", label: "twitch", Icon: SiTwitch },
  { id: "snapchat", label: "snapchat", Icon: SiSnapchat },
  { id: "pinterest", label: "pinterest", Icon: SiPinterest },
  { id: "spotify", label: "spotify", Icon: SiSpotify },
];

const TIERS = ["All Tiers", "Fast", "Plus", "Pro", "Steady", "Premium", "Elite"];

const TIER_COLORS: Record<string, string> = {
  Fast: "bg-green-500/15 text-green-400 border-green-500/25",
  Plus: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Pro: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  Steady: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  Premium: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  Elite: "bg-red-500/15 text-red-400 border-red-500/25",
};

const SERVICES = [
  { id: 1, platform: "discord", name: "Discord Offline Server Members | Offline Users | No Drop", tier: "Plus", minQty: 20, maxQty: 1500, pricePerK: 128933, refill: true },
  { id: 2, platform: "discord", name: "Discord Members | Offline | Add Bot", tier: "Plus", minQty: 20, maxQty: 1500, pricePerK: 127805, refill: true },
  { id: 3, platform: "discord", name: "Discord Members | Offline | Add Bot", tier: "Plus", minQty: 20, maxQty: 1500, pricePerK: 133379, refill: false },
  { id: 4, platform: "discord", name: "Discord x20 Server Boost 1 Months [Refill: 30D] [Instant Start] [No Bot]", tier: "Fast", minQty: 1, maxQty: 100, pricePerK: 48500, refill: true },
  { id: 5, platform: "discord", name: "Discord x14 Server Boost 1 Months [Refill: 30D] [Instant Start] [No Bot]", tier: "Fast", minQty: 1, maxQty: 100, pricePerK: 33950, refill: true },
  { id: 6, platform: "instagram", name: "IG Followers (NG Fast)", tier: "Fast", minQty: 100, maxQty: 100000, pricePerK: 1360, refill: true },
  { id: 7, platform: "instagram", name: "IG Followers (NG Plus)", tier: "Plus", minQty: 100, maxQty: 100000, pricePerK: 1920, refill: true },
  { id: 8, platform: "instagram", name: "IG Followers (Global Plus)", tier: "Plus", minQty: 100, maxQty: 100000, pricePerK: 1520, refill: true },
  { id: 9, platform: "instagram", name: "IG Likes (NG Plus)", tier: "Plus", minQty: 50, maxQty: 50000, pricePerK: 800, refill: true },
  { id: 10, platform: "instagram", name: "IG Views (Reels — Fast)", tier: "Fast", minQty: 500, maxQty: 1000000, pricePerK: 280, refill: false },
  { id: 11, platform: "instagram", name: "IG Story Views (NG)", tier: "Fast", minQty: 100, maxQty: 100000, pricePerK: 320, refill: false },
  { id: 12, platform: "tiktok", name: "TK Views (Fast)", tier: "Fast", minQty: 1000, maxQty: 10000000, pricePerK: 160, refill: false },
  { id: 13, platform: "tiktok", name: "TK Followers (NG Plus)", tier: "Plus", minQty: 100, maxQty: 50000, pricePerK: 1800, refill: true },
  { id: 14, platform: "tiktok", name: "TK Likes (Fast)", tier: "Fast", minQty: 100, maxQty: 500000, pricePerK: 280, refill: false },
  { id: 15, platform: "tiktok", name: "TK Comments (Random)", tier: "Pro", minQty: 10, maxQty: 10000, pricePerK: 4500, refill: false },
  { id: 16, platform: "youtube", name: "YT Subscribers (Fast)", tier: "Fast", minQty: 100, maxQty: 100000, pricePerK: 3200, refill: true },
  { id: 17, platform: "youtube", name: "YT Views (Monetize Safe)", tier: "Pro", minQty: 1000, maxQty: 1000000, pricePerK: 620, refill: false },
  { id: 18, platform: "youtube", name: "YT Likes (Fast)", tier: "Fast", minQty: 50, maxQty: 50000, pricePerK: 950, refill: false },
  { id: 19, platform: "youtube", name: "YT Watch Hours (4,000hr Package)", tier: "Premium", minQty: 1, maxQty: 1, pricePerK: 85000, refill: false },
  { id: 20, platform: "facebook", name: "FB Page Likes (NG)", tier: "Fast", minQty: 100, maxQty: 100000, pricePerK: 1100, refill: true },
  { id: 21, platform: "facebook", name: "FB Post Likes", tier: "Fast", minQty: 50, maxQty: 50000, pricePerK: 650, refill: false },
  { id: 22, platform: "facebook", name: "FB Group Members", tier: "Plus", minQty: 100, maxQty: 10000, pricePerK: 2400, refill: true },
  { id: 23, platform: "x", name: "X (Twitter) Followers (NG)", tier: "Fast", minQty: 100, maxQty: 50000, pricePerK: 1600, refill: true },
  { id: 24, platform: "x", name: "X (Twitter) Likes (Fast)", tier: "Fast", minQty: 50, maxQty: 50000, pricePerK: 480, refill: false },
  { id: 25, platform: "telegram", name: "Telegram Members (Real)", tier: "Plus", minQty: 100, maxQty: 500000, pricePerK: 2200, refill: true },
  { id: 26, platform: "telegram", name: "Telegram Post Views", tier: "Fast", minQty: 100, maxQty: 1000000, pricePerK: 180, refill: false },
  { id: 27, platform: "spotify", name: "Spotify Streams (Fast)", tier: "Fast", minQty: 1000, maxQty: 10000000, pricePerK: 380, refill: false },
  { id: 28, platform: "spotify", name: "Spotify Followers", tier: "Plus", minQty: 100, maxQty: 100000, pricePerK: 2800, refill: true },
  { id: 29, platform: "seo", name: "Website Traffic (Real Visitors)", tier: "Pro", minQty: 1000, maxQty: 1000000, pricePerK: 520, refill: false },
  { id: 30, platform: "seo", name: "Google Maps Reviews", tier: "Premium", minQty: 5, maxQty: 500, pricePerK: 18000, refill: false },
  { id: 31, platform: "linkedin", name: "LinkedIn Connections (NG)", tier: "Plus", minQty: 100, maxQty: 10000, pricePerK: 3200, refill: true },
  { id: 32, platform: "twitch", name: "Twitch Followers", tier: "Fast", minQty: 100, maxQty: 50000, pricePerK: 2400, refill: true },
  { id: 33, platform: "snapchat", name: "Snapchat Followers", tier: "Fast", minQty: 100, maxQty: 10000, pricePerK: 1800, refill: true },
  { id: 34, platform: "pinterest", name: "Pinterest Followers", tier: "Fast", minQty: 100, maxQty: 50000, pricePerK: 1400, refill: true },
  { id: 35, platform: "threads", name: "Threads Followers (NG)", tier: "Fast", minQty: 100, maxQty: 100000, pricePerK: 1900, refill: true },
];

export default function Services() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [tier, setTier] = useState("All Tiers");

  const filtered = SERVICES.filter(s => {
    const matchPlatform = platform === "all" || s.platform === platform;
    const matchTier = tier === "All Tiers" || s.tier === tier;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchTier && matchSearch;
  });

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-xs uppercase tracking-widest font-bold text-primary mb-2">SERVICE CATALOG</div>
          <h1 className="text-4xl md:text-6xl font-black mb-2">3,700+ services.</h1>
          <h2 className="text-4xl md:text-6xl font-black text-muted-foreground mb-6">Every platform.</h2>
          <p className="text-muted-foreground max-w-xl">Structured across six tiers — Fast, Plus, Pro, Steady, Premium, Elite.</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-border/50 bg-card text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Platform filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PLATFORMS.map(p => {
            const Icon = p.Icon;
            return (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                  platform === p.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Tier filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">TIER:</span>
          {TIERS.map(t => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                tier === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground mb-5 flex items-center justify-between">
          <span>{filtered.length.toLocaleString()} services found</span>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />
            <span>{platform === "all" ? "All Platforms" : platform} · {tier}</span>
          </div>
        </div>

        {/* Services list */}
        <div className="space-y-3">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              className="group p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", TIER_COLORS[service.tier] || "border-border/50 text-muted-foreground bg-secondary/30")}>
                      {service.tier}
                    </span>
                    {service.refill && (
                      <span className="text-xs flex items-center gap-1 text-green-400">
                        <RefreshCcw className="h-3 w-3" />
                        Refill
                      </span>
                    )}
                  </div>
                  <div className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{service.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {service.platform.charAt(0).toUpperCase() + service.platform.slice(1)} · {service.minQty.toLocaleString()} – {service.maxQty.toLocaleString()} units
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-primary font-bold">₦{service.pricePerK.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">/ 1,000 units</div>
                  <button className="mt-2 flex items-center gap-1 text-xs text-primary hover:opacity-70 transition-opacity ml-auto">
                    Order <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Star className="h-10 w-10 mx-auto mb-4 opacity-30" />
              <p>No services match your filters.</p>
            </div>
          )}
        </div>

        {/* Load more indicator */}
        {filtered.length > 0 && (
          <div className="text-center mt-8 text-sm text-muted-foreground">
            Showing {Math.min(filtered.length, 35)} of 3,700+ services. Use filters to narrow down.
          </div>
        )}
      </div>
    </div>
  );
}
