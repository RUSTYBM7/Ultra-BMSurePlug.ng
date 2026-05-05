import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, RefreshCcw, Zap, ChevronDown, ShoppingCart, Info } from "lucide-react";
import { Instagram, Youtube, Globe } from "lucide-react";
import { SiTiktok, SiFacebook, SiTelegram, SiX, SiSpotify, SiDiscord, SiTwitch, SiSnapchat, SiPinterest, SiWhatsapp, SiSoundcloud } from "react-icons/si";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES_CATALOG, PLATFORMS_META, TOTAL_SERVICES, type Service } from "@/data/services-catalog";

const TIER_COLORS: Record<string, string> = {
  Fast: "bg-green-500/15 text-green-400 border-green-500/25",
  Plus: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Pro: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  Steady: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  Premium: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  Elite: "bg-red-500/15 text-red-400 border-red-500/25",
};

const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  tiktok: SiTiktok,
  youtube: Youtube,
  facebook: SiFacebook,
  x: SiX,
  telegram: SiTelegram,
  spotify: SiSpotify,
  discord: SiDiscord,
  twitch: SiTwitch,
  snapchat: SiSnapchat,
  pinterest: SiPinterest,
  linkedin: Briefcase,
  whatsapp: SiWhatsapp,
  soundcloud: SiSoundcloud,
  seo: Globe,
  threads: SiX,
};

const TIERS = ["All Tiers", "Fast", "Plus", "Pro", "Steady", "Premium", "Elite"];
const PAGE_SIZE = 100;

function formatPrice(pricePerK: number, minQty: number) {
  const minOrder = (pricePerK * minQty) / 1000;
  return { perK: pricePerK, minOrder };
}

export default function Services() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [tier, setTier] = useState("All Tiers");
  const [refillOnly, setRefillOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderQty, setOrderQty] = useState("");
  const [orderLink, setOrderLink] = useState("");

  const filtered = useMemo(() => {
    return SERVICES_CATALOG.filter(s => {
      if (platform !== "all" && s.platform !== platform) return false;
      if (tier !== "All Tiers" && s.tier !== tier) return false;
      if (refillOnly && !s.refill) return false;
      if (search) {
        const q = search.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.platform.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, platform, tier, refillOnly]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (key: string, val: string | boolean, reset = true) => {
    if (reset) setPage(1);
    if (key === "platform") setPlatform(val as string);
    if (key === "tier") setTier(val as string);
    if (key === "refill") setRefillOnly(val as boolean);
    if (key === "search") { setSearch(val as string); setPage(1); }
  };

  const orderTotal = selectedService && orderQty
    ? ((selectedService.pricePerK * Number(orderQty)) / 1000).toFixed(0)
    : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-xs uppercase tracking-widest font-bold text-primary mb-2">SERVICE CATALOG</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-black">
                {TOTAL_SERVICES.toLocaleString()}+ services.
              </h1>
              <h2 className="text-3xl md:text-5xl font-black text-muted-foreground">Every platform.</h2>
              <p className="text-muted-foreground mt-2">6 service tiers · Real delivery · Nigerian Naira pricing</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center md:text-right">
              {[
                { label: "Platforms", val: "20+" },
                { label: "Instant Start", val: "850+" },
                { label: "With Refill", val: "1,200+" },
              ].map(item => (
                <div key={item.label} className="bg-card border border-border/50 rounded-xl p-3">
                  <div className="text-xl font-black text-primary">{item.val}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-56 shrink-0 space-y-4">
            <div className="bg-card border border-border/50 rounded-xl p-4 sticky top-20">
              <div className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" /> Filters
              </div>

              {/* Platform list */}
              <div className="space-y-1 mb-5">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Platform</div>
                {PLATFORMS_META.slice(0, 16).map(p => {
                  const Icon = PLATFORM_ICONS[p.id];
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleFilter("platform", p.id)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                        platform === p.id
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                        {p.label}
                      </span>
                      {p.id !== "all" && (
                        <span className="text-[10px] opacity-60">{(p as any).count?.toLocaleString()}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tier */}
              <div className="space-y-1 mb-5">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tier</div>
                {TIERS.map(t => (
                  <button
                    key={t}
                    onClick={() => handleFilter("tier", t)}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                      tier === t
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    )}
                  >
                    {t !== "All Tiers" && (
                      <span className={cn("inline-block w-2 h-2 rounded-full mr-2", {
                        "bg-green-400": t === "Fast",
                        "bg-blue-400": t === "Plus",
                        "bg-violet-400": t === "Pro",
                        "bg-yellow-400": t === "Steady",
                        "bg-orange-400": t === "Premium",
                        "bg-red-400": t === "Elite",
                      })} />
                    )}
                    {t}
                  </button>
                ))}
              </div>

              {/* Refill toggle */}
              <button
                onClick={() => handleFilter("refill", !refillOnly)}
                className={cn(
                  "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium border transition-all",
                  refillOnly
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "border-border/50 text-muted-foreground hover:border-primary/30"
                )}
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Refill Only
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search + results count */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={e => handleFilter("search", e.target.value)}
                  placeholder="Search services, platforms..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/50 bg-card text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="shrink-0 text-sm text-muted-foreground whitespace-nowrap">
                <span className="font-bold text-foreground">{filtered.length.toLocaleString()}</span> found
              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[48px_1fr_80px_100px_80px_80px_90px] gap-0 border-b border-border/50 bg-secondary/30">
                {["ID", "Service Name", "Tier", "Category", "Min", "Max", "Rate/1K"].map((h, i) => (
                  <div key={h} className={cn("px-3 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider", i === 1 ? "col-span-1" : "")}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Service rows */}
              <div className="divide-y divide-border/30">
                {paged.map((service) => {
                  const PlatIcon = PLATFORM_ICONS[service.platform];
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        "group cursor-pointer hover:bg-primary/5 transition-colors",
                        selectedService?.id === service.id && "bg-primary/8 border-l-2 border-primary"
                      )}
                      onClick={() => setSelectedService(selectedService?.id === service.id ? null : service)}
                    >
                      {/* Desktop row */}
                      <div className="hidden md:grid grid-cols-[48px_1fr_80px_100px_80px_80px_90px] gap-0 items-center px-0 py-0">
                        <div className="px-3 py-3 text-xs text-muted-foreground font-mono">{service.id}</div>
                        <div className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            {PlatIcon && <PlatIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                            <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{service.name}</span>
                            {service.refill && <RefreshCcw className="h-3 w-3 text-green-400 shrink-0" />}
                          </div>
                          <div className="text-xs text-muted-foreground ml-5.5 mt-0.5">{service.avgTime} delivery</div>
                        </div>
                        <div className="px-3 py-3">
                          <span className={cn("text-[11px] px-2 py-0.5 rounded-full border font-medium", TIER_COLORS[service.tier] || "border-border/50")}>
                            {service.tier}
                          </span>
                        </div>
                        <div className="px-3 py-3 text-xs text-muted-foreground">{service.category}</div>
                        <div className="px-3 py-3 text-xs text-muted-foreground">{service.minQty.toLocaleString()}</div>
                        <div className="px-3 py-3 text-xs text-muted-foreground">{service.maxQty.toLocaleString()}</div>
                        <div className="px-3 py-3">
                          <div className="text-sm font-bold text-primary">₦{service.pricePerK.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Mobile card */}
                      <div className="md:hidden p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full border font-medium", TIER_COLORS[service.tier])}>
                                {service.tier}
                              </span>
                              {service.refill && <RefreshCcw className="h-3 w-3 text-green-400" />}
                            </div>
                            <div className="text-sm font-medium group-hover:text-primary transition-colors">{service.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {service.minQty.toLocaleString()} – {service.maxQty.toLocaleString()} · {service.avgTime}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-primary font-bold text-sm">₦{service.pricePerK.toLocaleString()}</div>
                            <div className="text-[10px] text-muted-foreground">/1,000</div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded order panel */}
                      {selectedService?.id === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="px-4 pb-4 border-t border-primary/20 bg-primary/5"
                        >
                          <div className="pt-4 grid md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-xs font-semibold mb-2 uppercase tracking-wider text-primary">Service Details</div>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <div>ID: <span className="font-mono text-foreground">#{service.id}</span></div>
                                <div>Platform: <span className="text-foreground capitalize">{service.platform}</span></div>
                                <div>Type: <span className="text-foreground">{service.type}</span></div>
                                <div>Delivery: <span className="text-foreground">{service.avgTime}</span></div>
                                <div>Refill: <span className={service.refill ? "text-green-400" : "text-muted-foreground"}>{service.refill ? "Yes (30 Days)" : "No"}</span></div>
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <div className="text-xs font-semibold mb-2 uppercase tracking-wider text-primary">Place Order</div>
                              <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                  <label className="text-xs text-muted-foreground block mb-1">Link / Username</label>
                                  <input
                                    type="text"
                                    value={orderLink}
                                    onChange={e => setOrderLink(e.target.value)}
                                    placeholder="https://instagram.com/yourpage"
                                    className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all text-xs"
                                    onClick={e => e.stopPropagation()}
                                  />
                                </div>
                                <div className="sm:w-32">
                                  <label className="text-xs text-muted-foreground block mb-1">
                                    Qty ({service.minQty.toLocaleString()}–{service.maxQty.toLocaleString()})
                                  </label>
                                  <input
                                    type="number"
                                    value={orderQty}
                                    onChange={e => setOrderQty(e.target.value)}
                                    min={service.minQty}
                                    max={service.maxQty}
                                    placeholder={service.minQty.toString()}
                                    className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 transition-all"
                                    onClick={e => e.stopPropagation()}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="text-sm">
                                  {orderTotal ? (
                                    <span>Total: <strong className="text-primary">₦{Number(orderTotal).toLocaleString()}</strong></span>
                                  ) : (
                                    <span className="text-muted-foreground text-xs">Enter quantity to see total</span>
                                  )}
                                </div>
                                <button
                                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                                  onClick={e => { e.stopPropagation(); alert("Sign in to place your order!"); }}
                                >
                                  <ShoppingCart className="h-3.5 w-3.5" />
                                  Order Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <Search className="h-10 w-10 mx-auto mb-4 opacity-20" />
                  <p>No services found. Try different filters.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5">
                <div className="text-sm text-muted-foreground">
                  Page {page} of {totalPages} · {filtered.length.toLocaleString()} services
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg border border-border/50 text-sm disabled:opacity-40 hover:border-primary/40 transition-colors"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={cn(
                          "w-9 h-9 rounded-lg text-sm font-medium border transition-colors",
                          page === p ? "bg-primary text-primary-foreground border-primary" : "border-border/50 text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-border/50 text-sm disabled:opacity-40 hover:border-primary/40 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-6">
              Showing {paged.length} of {filtered.length.toLocaleString()} matching services · Full catalog: {TOTAL_SERVICES.toLocaleString()}+ active services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
