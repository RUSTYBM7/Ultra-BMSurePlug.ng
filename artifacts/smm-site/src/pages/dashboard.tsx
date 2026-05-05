import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  TrendingUp, Package, Globe, Zap, ArrowRight, CheckCircle, Clock,
  ShoppingCart, Wallet, RefreshCcw, BarChart3, User, Bell, Plus
} from "lucide-react";
import { Instagram, Youtube } from "lucide-react";
import { SiTiktok, SiFacebook, SiTelegram, SiX, SiSpotify, SiDiscord, SiTwitch, SiSnapchat, SiPinterest } from "react-icons/si";
import { useAuth } from "@workspace/replit-auth-web";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { Icon: Instagram, label: "Instagram", count: 820, color: "text-pink-400" },
  { Icon: SiTiktok, label: "TikTok", count: 432, color: "text-slate-300" },
  { Icon: Youtube, label: "YouTube", count: 451, color: "text-red-400" },
  { Icon: SiFacebook, label: "Facebook", count: 507, color: "text-blue-400" },
  { Icon: SiX, label: "Threads", count: 44, color: "text-slate-400" },
  { Icon: SiX, label: "X (Twitter)", count: 287, color: "text-slate-300" },
  { Icon: Globe, label: "SEO & Traffic", count: 59, color: "text-violet-400" },
  { Icon: SiTelegram, label: "Telegram", count: 610, color: "text-sky-400" },
  { Icon: SiSpotify, label: "Spotify", count: 388, color: "text-green-400" },
  { Icon: SiDiscord, label: "Discord", count: 25, color: "text-indigo-400" },
  { Icon: SiTwitch, label: "Twitch", count: 78, color: "text-purple-400" },
  { Icon: SiSnapchat, label: "Snapchat", count: 19, color: "text-yellow-400" },
];

const MOCK_ORDERS = [
  { id: "ORD-8841", service: "IG Followers (NG Plus)", platform: "instagram", Icon: Instagram, qty: 5000, status: "Active", progress: 73, charged: 9600, delivered: 3650, link: "@youraccount", started: "2h ago" },
  { id: "ORD-8840", service: "TK Views (Fast)", platform: "tiktok", Icon: SiTiktok, qty: 50000, status: "Completed", progress: 100, charged: 8000, delivered: 50000, link: "tiktok.com/v/123", started: "5h ago" },
  { id: "ORD-8839", service: "YT Subscribers (Fast)", platform: "youtube", Icon: Youtube, qty: 1000, status: "Pending", progress: 0, charged: 3200, delivered: 0, link: "youtube.com/@channel", started: "Just now" },
  { id: "ORD-8838", service: "Telegram Members (Real)", platform: "telegram", Icon: SiTelegram, qty: 2000, status: "Completed", progress: 100, charged: 4400, delivered: 2000, link: "t.me/yourgroup", started: "1 day ago" },
  { id: "ORD-8837", service: "Spotify Streams (Fast)", platform: "spotify", Icon: SiSpotify, qty: 10000, status: "Completed", progress: 100, charged: 3800, delivered: 10000, link: "open.spotify.com/track/...", started: "2 days ago" },
];

const STATUS_COLORS: Record<string, string> = {
  Active: "text-primary bg-primary/10 border-primary/30",
  Completed: "text-green-400 bg-green-400/10 border-green-400/30",
  Pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Partial: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
};

export default function Dashboard() {
  const { user, isAuthenticated, login } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "place">("overview");
  const [newOrder, setNewOrder] = useState({ service: "", link: "", qty: "" });

  const displayName = user?.firstName || user?.username || "Creator";
  const totalSpent = MOCK_ORDERS.reduce((a, o) => a + o.charged, 0);
  const activeOrders = MOCK_ORDERS.filter(o => o.status === "Active").length;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">

        {/* Auth gate */}
        {!isAuthenticated && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <User className="h-9 w-9 text-primary" />
            </div>
            <h2 className="text-3xl font-black mb-3">Sign in to your Dashboard</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Track your orders, manage your balance, and view delivery progress — all in one place.
            </p>
            <button
              onClick={login}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-colors"
            >
              Sign In / Create Account
            </button>
            <div className="mt-12 text-sm text-muted-foreground">Preview dashboard below ↓</div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-primary mb-1">
              {isAuthenticated ? `Welcome back, ${displayName}` : "LIVE DASHBOARD"}
            </div>
            <h1 className="text-3xl md:text-4xl font-black">
              {isAuthenticated ? "Your Dashboard" : "Platform Overview"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            )}
            <div className="bg-card border border-border/50 rounded-xl px-5 py-3 text-right">
              <div className="text-xs text-muted-foreground mb-0.5">
                {isAuthenticated ? "YOUR BALANCE" : "PLATFORM BALANCE"}
              </div>
              <div className="text-2xl font-black text-primary">
                {isAuthenticated ? "₦0.00" : "₦2,305,771"}
              </div>
              <div className="text-xs text-muted-foreground">NGN</div>
            </div>
            {isAuthenticated && (
              <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4" />
                Fund Wallet
              </button>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 p-1 bg-card border border-border/50 rounded-xl w-fit">
          {[
            { key: "overview", label: "Overview", icon: BarChart3 },
            { key: "orders", label: "My Orders", icon: Package },
            { key: "place", label: "New Order", icon: ShoppingCart },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: TrendingUp, label: "Orders Delivered", value: isAuthenticated ? MOCK_ORDERS.filter(o => o.status === "Completed").length.toString() : "82,140,000", sub: "All time", color: "text-primary" },
                { icon: Package, label: "Services Available", value: "3,746", sub: "Active", color: "text-blue-400" },
                { icon: Globe, label: "Platforms Covered", value: "20+", sub: "Platforms", color: "text-violet-400" },
                { icon: Zap, label: isAuthenticated ? "Active Orders" : "Delivered Today", value: isAuthenticated ? activeOrders.toString() : "14,280+", sub: isAuthenticated ? "Running" : "Today", color: "text-primary" },
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

            {/* Active orders preview */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-8"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
                  <h2 className="font-bold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Active Orders
                  </h2>
                  <button onClick={() => setActiveTab("orders")} className="text-sm text-primary flex items-center gap-1 hover:opacity-70">
                    View all <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {MOCK_ORDERS.filter(o => o.status === "Active").map(order => {
                  const Icon = order.Icon;
                  return (
                    <div key={order.id} className="px-6 py-4 border-b border-border/20 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{order.service}</div>
                            <div className="text-xs text-muted-foreground">{order.link} · {order.started}</div>
                          </div>
                        </div>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUS_COLORS[order.status])}>
                          {order.status}
                        </span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>{order.delivered.toLocaleString()} delivered</span>
                        <span>{order.progress}% · {order.qty.toLocaleString()} total</span>
                      </div>
                    </div>
                  );
                })}
                {MOCK_ORDERS.filter(o => o.status === "Active").length === 0 && (
                  <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                    No active orders. <button onClick={() => setActiveTab("place")} className="text-primary">Place your first order</button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Platforms grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-8"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
                <h2 className="font-bold">Platforms</h2>
                <Link href="/services" className="text-sm text-primary flex items-center gap-1 hover:opacity-70">
                  Browse services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-border/20">
                {PLATFORMS.map(({ Icon, label, count, color }, i) => (
                  <Link
                    key={label}
                    href="/services"
                    className="flex items-center gap-3 px-5 py-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", color)} />
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-muted-foreground">{count.toLocaleString()} services</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <h2 className="font-bold">Order History</h2>
              <div className="text-sm text-muted-foreground">{MOCK_ORDERS.length} orders</div>
            </div>

            {/* Summary bar */}
            <div className="grid grid-cols-3 divide-x divide-border/30 border-b border-border/40">
              {[
                { label: "Total Spent", val: `₦${totalSpent.toLocaleString()}` },
                { label: "Completed", val: MOCK_ORDERS.filter(o => o.status === "Completed").length },
                { label: "Active", val: activeOrders },
              ].map(item => (
                <div key={item.label} className="px-6 py-3 text-center">
                  <div className="text-lg font-black text-primary">{item.val}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Orders table */}
            <div className="hidden md:grid grid-cols-[80px_1fr_80px_100px_80px_80px_90px] border-b border-border/40 bg-secondary/20">
              {["Order ID", "Service", "Status", "Link", "Qty", "Delivered", "Charged"].map(h => (
                <div key={h} className="px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</div>
              ))}
            </div>

            <div className="divide-y divide-border/20">
              {MOCK_ORDERS.map(order => {
                const Icon = order.Icon;
                return (
                  <div key={order.id} className="hover:bg-secondary/10 transition-colors">
                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-[80px_1fr_80px_100px_80px_80px_90px] items-center">
                      <div className="px-4 py-4 text-xs font-mono text-muted-foreground">{order.id}</div>
                      <div className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">{order.service}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 ml-5">{order.started}</div>
                      </div>
                      <div className="px-4 py-4">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUS_COLORS[order.status])}>
                          {order.status}
                        </span>
                      </div>
                      <div className="px-4 py-4 text-xs text-muted-foreground truncate">{order.link}</div>
                      <div className="px-4 py-4 text-xs text-foreground">{order.qty.toLocaleString()}</div>
                      <div className="px-4 py-4">
                        <div className="text-xs font-medium">{order.delivered.toLocaleString()}</div>
                        {order.status === "Active" && (
                          <div className="w-full bg-secondary/50 rounded-full h-1 mt-1">
                            <div className="bg-primary h-1 rounded-full" style={{ width: `${order.progress}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-4 text-sm font-bold text-primary">₦{order.charged.toLocaleString()}</div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{order.service}</span>
                        </div>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUS_COLORS[order.status])}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{order.id} · {order.started}</span>
                        <span className="text-primary font-bold">₦{order.charged.toLocaleString()}</span>
                      </div>
                      {order.status === "Active" && (
                        <div className="mt-2">
                          <div className="w-full bg-secondary/50 rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${order.progress}%` }} />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{order.delivered.toLocaleString()} / {order.qty.toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* NEW ORDER TAB */}
        {activeTab === "place" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-6">Place New Order</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Platform</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "instagram", Icon: Instagram, color: "text-pink-400" },
                      { id: "tiktok", Icon: SiTiktok, color: "text-slate-300" },
                      { id: "youtube", Icon: Youtube, color: "text-red-400" },
                      { id: "facebook", Icon: SiFacebook, color: "text-blue-400" },
                    ].map(({ id, Icon, color }) => (
                      <button key={id} className="aspect-square rounded-xl border border-border/50 flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-all">
                        <Icon className={cn("h-5 w-5", color)} />
                        <span className="text-[10px] text-muted-foreground capitalize">{id}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Profile / Link</label>
                  <input
                    type="text"
                    value={newOrder.link}
                    onChange={e => setNewOrder(p => ({ ...p, link: e.target.value }))}
                    placeholder="https://instagram.com/yourpage"
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newOrder.qty}
                    onChange={e => setNewOrder(p => ({ ...p, qty: e.target.value }))}
                    placeholder="1000"
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <button
                  onClick={() => !isAuthenticated ? login() : undefined}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {isAuthenticated ? "Place Order" : "Sign In to Order"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Quick Links</div>
                <div className="space-y-2">
                  {[
                    { label: "Browse All Services", href: "/services", icon: Package },
                    { label: "View Plans & Packages", href: "/plans", icon: Wallet },
                    { label: "Refill Policy", href: "#", icon: RefreshCcw },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-secondary/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Popular Services</div>
                {[
                  { name: "IG Followers (NG Fast)", price: "₦1,360/1k" },
                  { name: "TK Views (Viral)", price: "₦160/1k" },
                  { name: "YT Subscribers (HQ)", price: "₦3,200/1k" },
                  { name: "Spotify Streams", price: "₦380/1k" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                    <span className="text-sm">{s.name}</span>
                    <span className="text-primary font-bold text-sm">{s.price}</span>
                  </div>
                ))}
                <Link href="/services" className="flex items-center gap-1 text-xs text-primary mt-3 hover:opacity-70">
                  View all 3,746+ services <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
