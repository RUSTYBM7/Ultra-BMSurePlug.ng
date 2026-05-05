import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Instagram, Youtube, ChevronRight } from "lucide-react";
import { SiTiktok, SiTelegram, SiWhatsapp, SiX } from "react-icons/si";
import { cn } from "@/lib/utils";

const VOICE_STUDIO_URL = "/voice-studio/";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/services", label: "Services" },
    { href: "/plans", label: "Plans" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/reseller", label: "Reseller" },
    { href: "/giveaway", label: "Giveaway 🎁" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs font-medium py-2 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content gap-16 px-8">
            {[1,2].map(k => (
              <span key={k} className="flex items-center gap-8">
                <span>🚀 3,700+ services live on BM SocialMedia Hub</span>
                <span className="opacity-60">·</span>
                <Link href="/services" className="underline underline-offset-2 hover:opacity-80">Browse catalog →</Link>
                <span className="opacity-60">·</span>
                <Link href="/giveaway" className="underline underline-offset-2 hover:opacity-80">Daily Giveaway 🎁</Link>
                <span className="opacity-60">·</span>
                <span>₦1,600 NGN Rate · 30-day Refill</span>
                <span className="opacity-60">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-tight hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-1">
              <span className="font-black text-xl text-white tracking-tight">bmsocial</span>
              <ChevronRight className="h-3 w-3 text-primary" />
            </div>
            <span className="font-black text-2xl text-primary -mt-1 leading-none">hub</span>
            <span className="text-[9px] text-muted-foreground tracking-wider font-medium">Social media Growth studio ▶</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Social icons */}
            <div className="hidden lg:flex items-center gap-2">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: SiTiktok, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-8 h-8 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
              <div className="w-7 h-7 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-xs font-bold text-muted-foreground">
                +17
              </div>
            </div>

            {/* Mobile menu */}
            <button
              className="md:hidden w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={VOICE_STUDIO_URL}
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center"
              >
                🎙 BMVoicePlug Studio
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex flex-col leading-tight mb-4">
                <div className="flex items-center gap-1">
                  <span className="font-black text-lg text-white">bmsocial</span>
                  <ChevronRight className="h-3 w-3 text-primary" />
                </div>
                <span className="font-black text-xl text-primary -mt-0.5">hub</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nigeria's #1 Social Media Growth Studio. Real results, transparent pricing, built for creators.
              </p>
              <div className="flex items-center gap-2 mt-4">
                {[Instagram, SiTiktok, Youtube, SiTelegram, SiWhatsapp].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-secondary/60 border border-border/50 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Platform</h4>
              <ul className="space-y-2">
                {["Services", "Plans", "Marketplace", "Dashboard", "Reseller"].map(item => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Platforms</h4>
              <ul className="space-y-2">
                {["Instagram", "TikTok", "YouTube", "Facebook", "X (Twitter)", "Telegram"].map(p => (
                  <li key={p}>
                    <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{p}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">BM Products</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">BM SocialMedia Hub</Link>
                </li>
                <li>
                  <a href={VOICE_STUDIO_URL} className="text-sm text-primary font-medium hover:opacity-80 transition-opacity flex items-center gap-1">
                    🎙 BMVoicePlug.ng
                    <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">New</span>
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Support</h4>
                <ul className="space-y-2">
                  {["Help Center", "WhatsApp Support", "API Access", "Terms of Service"].map(item => (
                    <li key={item}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BM SocialMedia Hub. All rights reserved. Nigeria's #1 Social Growth Platform.
            </p>
            <p className="text-xs text-muted-foreground">
              Built for Nigerian Creators · Transparent Naira Pricing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
