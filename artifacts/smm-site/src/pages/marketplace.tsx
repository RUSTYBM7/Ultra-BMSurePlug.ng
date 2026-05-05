import { motion } from "framer-motion";
import { Instagram, Youtube, Lock, Star, CheckCircle } from "lucide-react";
import { SiTiktok, SiFacebook, SiTelegram, SiX, SiSnapchat, SiSpotify } from "react-icons/si";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { Icon: Instagram, label: "Instagram", color: "from-pink-500 to-purple-600", count: 142 },
  { Icon: SiTiktok, label: "TikTok", color: "from-slate-700 to-black", count: 58 },
  { Icon: Youtube, label: "YouTube", color: "from-red-500 to-red-700", count: 74 },
  { Icon: SiFacebook, label: "Facebook", color: "from-blue-500 to-blue-700", count: 31 },
  { Icon: SiX, label: "X / Twitter", color: "from-slate-600 to-slate-800", count: 19 },
  { Icon: SiTelegram, label: "Telegram", color: "from-sky-500 to-blue-600", count: 27 },
  { Icon: SiSnapchat, label: "Snapchat", color: "from-yellow-400 to-yellow-500", count: 8 },
  { Icon: SiSpotify, label: "Spotify", color: "from-green-500 to-green-700", count: 12 },
];

const FAKE_LISTINGS = [
  { platform: "instagram", niche: "Fashion & Lifestyle", followers: "24K", verified: true, price: 185000 },
  { platform: "instagram", niche: "Food & Restaurants", followers: "18K", verified: true, price: 125000 },
  { platform: "tiktok", niche: "Finance & Wealth", followers: "52K", verified: false, price: 220000 },
  { platform: "youtube", niche: "Beauty & Makeup", followers: "11K", verified: true, price: 340000 },
  { platform: "facebook", niche: "Tech Reviews", followers: "38K", verified: false, price: 190000 },
  { platform: "instagram", niche: "Fitness & Gym", followers: "15K", verified: true, price: 145000 },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            🛍 BM Marketplace · Verified Account Trading
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-3">Buy & sell social media accounts.</h1>
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-6">Safe. Verified. Nigerian-built.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The largest verified social media account marketplace in Nigeria. Every account manually checked, every transaction secured by Paystack.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mt-8 mb-8">
            <input
              placeholder="Search by niche, platform, or keyword..."
              className="w-full h-14 px-6 rounded-2xl border border-border/50 bg-card text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { value: "320+", label: "Listed Accounts" },
              { value: "140+", label: "Verified Sellers" },
              { value: "850+", label: "Successful Deals" },
              { value: "8", label: "Platforms" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {PLATFORMS.map(({ Icon, label, color, count }) => (
            <button key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-all group">
              <div className={cn("w-6 h-6 rounded-lg bg-gradient-to-br flex items-center justify-center", color)}>
                <Icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{count}</span>
            </button>
          ))}
        </div>

        {/* Coming Soon overlay */}
        <div className="relative">
          {/* Blurred listings */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-20 blur-sm pointer-events-none select-none">
            {FAKE_LISTINGS.map((listing, i) => (
              <div key={i} className="p-5 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary" />
                    <div>
                      <div className="text-sm font-semibold">{listing.niche}</div>
                      <div className="text-xs text-muted-foreground">{listing.platform}</div>
                    </div>
                  </div>
                  {listing.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                </div>
                <div className="text-2xl font-black mb-1">{listing.followers}</div>
                <div className="text-xs text-muted-foreground mb-3">followers</div>
                <div className="text-primary font-bold">₦{listing.price.toLocaleString()}</div>
                <button className="w-full mt-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          {/* Coming soon overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/90 backdrop-blur-sm text-sm font-medium mb-6">
                <Lock className="h-4 w-4 text-primary" />
                Opening soon — Join the waitlist
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white/10 tracking-wider mb-2">COMING</h2>
              <h2 className="text-5xl md:text-8xl font-black text-primary/20 tracking-wider">SOON</h2>

              <div className="mt-8 max-w-md mx-auto">
                <p className="text-muted-foreground text-sm mb-4">Be first to access Nigeria's safest social media account marketplace. Enter your email to join the waitlist.</p>
                <div className="flex gap-3">
                  <input
                    placeholder="your@email.com"
                    className="flex-1 h-11 px-4 rounded-xl border border-border/50 bg-card text-sm focus:outline-none focus:border-primary/50"
                  />
                  <button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all whitespace-nowrap">
                    Join Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why marketplace */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Why BM Marketplace?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🔍", title: "Manual Verification", desc: "Every account is manually reviewed by our team for authenticity, engagement rate, and audience quality before listing." },
              { icon: "🔒", title: "Paystack Protection", desc: "All transactions are processed through Paystack. Funds are held in escrow until the buyer confirms account transfer." },
              { icon: "⭐", title: "Rated Sellers", desc: "Every seller is rated and reviewed. Only sellers with 4.5+ stars can list premium accounts on the marketplace." },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-xl border border-border/50 bg-card text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold mb-2">{item.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
