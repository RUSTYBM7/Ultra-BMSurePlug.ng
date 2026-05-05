import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock, Users, Package, TrendingUp, DollarSign, Settings,
  BarChart3, ShieldCheck, Trash2, Edit, Plus, Eye, EyeOff,
  CheckCircle, XCircle, Clock, RefreshCcw, Search, Download
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_PASSWORD = "bmsocial2025";

const MOCK_USERS = [
  { id: "U001", name: "Chidi Okonkwo", email: "chidi@example.com", balance: 45200, orders: 12, joined: "Mar 2025", status: "active" },
  { id: "U002", name: "Amaka Eze", email: "amaka@example.com", balance: 12800, orders: 5, joined: "Apr 2025", status: "active" },
  { id: "U003", name: "Tunde Adeyemi", email: "tunde@example.com", balance: 0, orders: 28, joined: "Jan 2025", status: "active" },
  { id: "U004", name: "Ngozi Obi", email: "ngozi@example.com", balance: 88500, orders: 47, joined: "Feb 2025", status: "vip" },
  { id: "U005", name: "Emeka Nwosu", email: "emeka@example.com", balance: 5600, orders: 3, joined: "May 2025", status: "active" },
  { id: "U006", name: "Fatima Bello", email: "fatima@example.com", balance: 0, orders: 1, joined: "May 2025", status: "suspended" },
];

const MOCK_ORDERS = [
  { id: "ORD-8841", user: "Chidi Okonkwo", service: "IG Followers (NG Plus)", qty: 5000, status: "Active", charge: 9600, progress: 73, time: "2h ago" },
  { id: "ORD-8840", user: "Amaka Eze", service: "TK Views (Fast)", qty: 50000, status: "Completed", charge: 8000, progress: 100, time: "5h ago" },
  { id: "ORD-8839", user: "Tunde Adeyemi", service: "YT Subscribers (Fast)", qty: 1000, status: "Pending", charge: 3200, progress: 0, time: "Just now" },
  { id: "ORD-8838", user: "Ngozi Obi", service: "Telegram Members (Real)", qty: 2000, status: "Completed", charge: 4400, progress: 100, time: "1 day ago" },
  { id: "ORD-8837", user: "Emeka Nwosu", service: "Spotify Streams (Fast)", qty: 10000, status: "Completed", charge: 3800, progress: 100, time: "2 days ago" },
  { id: "ORD-8836", user: "Ngozi Obi", service: "FB Page Likes (NG)", qty: 3000, status: "Partial", charge: 3300, progress: 65, time: "3 days ago" },
];

const STATUS_COLORS: Record<string, string> = {
  Active: "text-primary bg-primary/10 border-primary/30",
  Completed: "text-green-400 bg-green-400/10 border-green-400/30",
  Pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Partial: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
};

type AdminTab = "overview" | "orders" | "users" | "services" | "settings";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<AdminTab>("overview");
  const [search, setSearch] = useState("");

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-center mb-1">Admin Access</h1>
            <p className="text-muted-foreground text-sm text-center mb-6">BM SocialMedia Hub · Control Panel</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Admin Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        if (password === ADMIN_PASSWORD) setAuthed(true);
                        else setError("Incorrect password");
                      }
                    }}
                    placeholder="Enter admin password"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
              </div>
              <button
                onClick={() => {
                  if (password === ADMIN_PASSWORD) setAuthed(true);
                  else setError("Incorrect password");
                }}
                className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                Access Control Panel
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              This panel is for authorized administrators only.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalRevenue = MOCK_ORDERS.filter(o => o.status === "Completed").reduce((a, o) => a + o.charge, 0);
  const activeOrders = MOCK_ORDERS.filter(o => o.status === "Active").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="sticky top-16 z-40 border-b border-border/50 bg-card/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm">Admin Panel</span>
            <span className="text-xs text-muted-foreground">· BM SocialMedia Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Live
            </span>
            <button
              onClick={() => setAuthed(false)}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border/40 hover:border-border transition-colors"
            >
              Lock
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Nav tabs */}
        <div className="flex items-center gap-1 mb-6 flex-wrap">
          {([
            { key: "overview", label: "Overview", icon: BarChart3 },
            { key: "orders", label: "Orders", icon: Package },
            { key: "users", label: "Users", icon: Users },
            { key: "services", label: "Services", icon: Settings },
            { key: "settings", label: "Settings", icon: Settings },
          ] as { key: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[]).map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  tab === item.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: DollarSign, label: "Revenue (Completed)", value: `₦${totalRevenue.toLocaleString()}`, sub: "All orders", color: "text-primary" },
                { icon: Package, label: "Total Orders", value: MOCK_ORDERS.length.toString(), sub: "In DB", color: "text-blue-400" },
                { icon: Users, label: "Total Users", value: MOCK_USERS.length.toString(), sub: "Registered", color: "text-violet-400" },
                { icon: TrendingUp, label: "Active Orders", value: activeOrders.toString(), sub: "Running", color: "text-green-400" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={cn("h-4 w-4", stat.color)} />
                      <span className="text-xs text-muted-foreground">{stat.sub}</span>
                    </div>
                    <div className={cn("text-2xl font-black mb-0.5", stat.color)}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent orders */}
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
                <h2 className="font-bold">Recent Orders</h2>
                <button onClick={() => setTab("orders")} className="text-xs text-primary">View all →</button>
              </div>
              <div className="divide-y divide-border/20">
                {MOCK_ORDERS.slice(0, 5).map(order => (
                  <div key={order.id} className="px-6 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
                        <span className="text-sm font-medium">{order.service}</span>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full border", STATUS_COLORS[order.status])}>{order.status}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{order.user} · {order.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary text-sm">₦{order.charge.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{order.qty.toLocaleString()} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User status breakdown */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Active Users", count: MOCK_USERS.filter(u => u.status === "active").length, color: "text-green-400" },
                { label: "VIP Users", count: MOCK_USERS.filter(u => u.status === "vip").length, color: "text-primary" },
                { label: "Suspended", count: MOCK_USERS.filter(u => u.status === "suspended").length, color: "text-red-400" },
              ].map(item => (
                <div key={item.label} className="bg-card border border-border/50 rounded-xl p-5 text-center">
                  <div className={cn("text-3xl font-black mb-1", item.color)}>{item.count}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <h2 className="font-bold">All Orders</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search orders..."
                    className="h-8 pl-9 pr-3 rounded-lg border border-border/50 bg-background text-xs focus:outline-none focus:border-primary/50 w-40"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 text-xs hover:border-primary/40 transition-colors">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-[90px_1fr_100px_80px_80px_90px_80px] border-b border-border/30 bg-secondary/20">
              {["Order ID", "Service / User", "Status", "Qty", "Progress", "Charged", "Actions"].map(h => (
                <div key={h} className="px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</div>
              ))}
            </div>

            <div className="divide-y divide-border/20">
              {MOCK_ORDERS.filter(o =>
                !search || o.id.includes(search) || o.service.toLowerCase().includes(search.toLowerCase()) || o.user.toLowerCase().includes(search.toLowerCase())
              ).map(order => (
                <div key={order.id} className="hover:bg-secondary/10 transition-colors">
                  <div className="hidden md:grid grid-cols-[90px_1fr_100px_80px_80px_90px_80px] items-center">
                    <div className="px-4 py-4 font-mono text-xs text-muted-foreground">{order.id}</div>
                    <div className="px-4 py-4">
                      <div className="text-sm font-medium">{order.service}</div>
                      <div className="text-xs text-muted-foreground">{order.user} · {order.time}</div>
                    </div>
                    <div className="px-4 py-4">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUS_COLORS[order.status])}>
                        {order.status}
                      </span>
                    </div>
                    <div className="px-4 py-4 text-xs">{order.qty.toLocaleString()}</div>
                    <div className="px-4 py-4">
                      <div className="text-xs mb-1">{order.progress}%</div>
                      <div className="w-full bg-secondary/50 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${order.progress}%` }} />
                      </div>
                    </div>
                    <div className="px-4 py-4 text-sm font-bold text-primary">₦{order.charge.toLocaleString()}</div>
                    <div className="px-4 py-4 flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors">
                        <RefreshCcw className="h-3 w-3" />
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-red-500/30 flex items-center justify-center hover:border-red-500/60 transition-colors">
                        <XCircle className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="md:hidden p-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border", STATUS_COLORS[order.status])}>{order.status}</span>
                    </div>
                    <div className="font-medium text-sm">{order.service}</div>
                    <div className="text-xs text-muted-foreground">{order.user} · ₦{order.charge.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === "users" && (
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <h2 className="font-bold">Users ({MOCK_USERS.length})</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                <Plus className="h-3.5 w-3.5" /> Add User
              </button>
            </div>

            <div className="hidden md:grid grid-cols-[60px_1fr_120px_80px_80px_90px_80px] border-b border-border/30 bg-secondary/20">
              {["ID", "Name / Email", "Status", "Orders", "Balance", "Joined", "Actions"].map(h => (
                <div key={h} className="px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</div>
              ))}
            </div>

            <div className="divide-y divide-border/20">
              {MOCK_USERS.map(user => (
                <div key={user.id} className="hover:bg-secondary/10 transition-colors">
                  <div className="hidden md:grid grid-cols-[60px_1fr_120px_80px_80px_90px_80px] items-center">
                    <div className="px-4 py-4 font-mono text-xs text-muted-foreground">{user.id}</div>
                    <div className="px-4 py-4">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="px-4 py-4">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", {
                        "text-green-400 bg-green-400/10 border-green-400/30": user.status === "active",
                        "text-primary bg-primary/10 border-primary/30": user.status === "vip",
                        "text-red-400 bg-red-400/10 border-red-400/30": user.status === "suspended",
                      })}>
                        {user.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="px-4 py-4 text-sm">{user.orders}</div>
                    <div className="px-4 py-4 text-sm font-medium">₦{user.balance.toLocaleString()}</div>
                    <div className="px-4 py-4 text-xs text-muted-foreground">{user.joined}</div>
                    <div className="px-4 py-4 flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-red-500/30 flex items-center justify-center hover:border-red-500/60 transition-colors">
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="md:hidden p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">₦{user.balance.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{user.orders} orders</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {tab === "services" && (
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <h2 className="font-bold mb-4">Service Management</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Services", val: "3,746", color: "text-primary" },
                { label: "Active", val: "3,746", color: "text-green-400" },
                { label: "Platforms", val: "20+", color: "text-blue-400" },
              ].map(s => (
                <div key={s.label} className="border border-border/50 rounded-xl p-4 text-center">
                  <div className={cn("text-3xl font-black mb-1", s.color)}>{s.val}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4" /> Add Service
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/50 text-sm hover:border-primary/40 transition-colors">
                <Download className="h-4 w-4" /> Import CSV
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/50 text-sm hover:border-primary/40 transition-colors">
                <RefreshCcw className="h-4 w-4" /> Sync Prices
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Services are loaded from the catalog. Use the CSV import to bulk-update prices or add new services.
            </p>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Site Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "Site Name", val: "BM SocialMedia Hub" },
                  { label: "Domain", val: "bmsureplug.online" },
                  { label: "NGN Rate (USD)", val: "1,600" },
                  { label: "Paystack Public Key", val: "pk_live_..." },
                ].map(item => (
                  <div key={item.label}>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">{item.label}</label>
                    <input
                      defaultValue={item.val}
                      className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                ))}
                <button className="w-full h-10 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Admin Password</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Current Password</label>
                  <input type="password" className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">New Password</label>
                  <input type="password" className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all" />
                </div>
                <button className="w-full h-10 bg-card border border-primary/50 text-primary rounded-xl font-bold text-sm hover:bg-primary/5 transition-colors">
                  Update Password
                </button>
              </div>
              <div className="mt-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                <div className="text-xs text-yellow-400 font-semibold mb-1">Security Note</div>
                <div className="text-xs text-muted-foreground">
                  Change the default password immediately. Store it securely — there is no recovery.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
