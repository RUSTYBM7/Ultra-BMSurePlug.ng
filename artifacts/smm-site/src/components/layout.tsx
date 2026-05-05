import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Instagram, Youtube, LogIn, LogOut, User } from "lucide-react";
import { SiTiktok, SiTelegram, SiWhatsapp, SiX } from "react-icons/si";
import { useAuth } from "@workspace/replit-auth-web";
import { cn } from "@/lib/utils";
import logoImg from "@assets/7cc9b635-a649-48e0-9f17-b859010e9788_1777965417896.png";

const VOICE_STUDIO_URL = "/voice-studio/";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  const navItems = [
    { href: "/services", label: "Services" },
    { href: "/plans", label: "Plans" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/reseller", label: "Reseller" },
    { href: "/giveaway", label: "Giveaway 🎁" },
    { href: "/posters", label: "Posters" },
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
          {/* Logo — uses real brand image */}
          <Link href="/" className="flex items-center hover:opacity-85 transition-opacity">
            <img
              src={logoImg}
              alt="bmsocial hub"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
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
            {/* Social icons desktop */}
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
            </div>

            {/* Auth button */}
            {!isLoading && (
              isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-secondary/50 border border-border/40 rounded-full px-3 py-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium truncate max-w-[80px]">
                      {user?.firstName || user?.username || "User"}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Sign In
                </button>
              )
            )}

            {/* Mobile menu toggle */}
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
                className="mt-2 px-4 py-3 rounded-lg bg-[hsl(184_100%_50%/0.1)] border border-[hsl(184_100%_50%/0.3)] text-[hsl(184_100%_50%)] font-semibold text-center text-sm"
              >
                🎙 BMVoicePlug Studio
              </a>
              {!isLoading && (
                isAuthenticated ? (
                  <button
                    onClick={() => { setMobileOpen(false); logout(); }}
                    className="mt-1 px-4 py-3 rounded-lg border border-border/40 text-sm text-muted-foreground font-medium text-left flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out ({user?.firstName || "User"})
                  </button>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); login(); }}
                    className="mt-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center text-sm flex items-center justify-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In / Create Account
                  </button>
                )
              )}
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
              <img src={logoImg} alt="bmsocial hub" className="h-12 w-auto object-contain mb-4" />
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
              © {new Date().getFullYear()} BM SocialMedia Hub · www.bmsureplug.online
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
