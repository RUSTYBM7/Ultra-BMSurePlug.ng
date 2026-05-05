import { Link, useLocation } from "wouter";
import { useGetCredits } from "@workspace/api-client-react";
import {
  Mic, Headphones, Plus, CreditCard, History, Coins, Activity,
  Menu, X, ChevronDown, LayoutGrid, RefreshCcw, Palette, Volume2,
  Globe, FolderOpen, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SMM_SITE_URL = "/smm/";

const TOOL_GROUPS = [
  {
    label: "Core Studio",
    items: [
      { href: "/studio", label: "Text to Speech", icon: Mic },
      { href: "/speech-to-speech", label: "Speech to Speech", icon: RefreshCcw },
      { href: "/voice-design", label: "Voice Design", icon: Palette },
      { href: "/sound-effects", label: "Sound Effects", icon: Volume2 },
    ]
  },
  {
    label: "Advanced",
    items: [
      { href: "/dubbing", label: "AI Dubbing", icon: Globe },
      { href: "/projects", label: "Projects", icon: FolderOpen },
      { href: "/clone", label: "Voice Cloning", icon: Plus },
    ]
  },
];

const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "All Features" },
  { href: "/studio", label: "Studio" },
  { href: "/voices", label: "Voices" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
];

const mobileAllItems = [
  { href: "/", label: "Home", icon: Activity },
  { href: "/features", label: "All Features (20+)", icon: LayoutGrid },
  { href: "/studio", label: "Text to Speech", icon: Mic },
  { href: "/speech-to-speech", label: "Speech to Speech", icon: RefreshCcw },
  { href: "/voice-design", label: "Voice Design", icon: Palette },
  { href: "/sound-effects", label: "Sound Effects", icon: Volume2 },
  { href: "/dubbing", label: "AI Dubbing", icon: Globe },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/voices", label: "Voice Library", icon: Headphones },
  { href: "/clone", label: "Voice Cloning", icon: Plus },
  { href: "/history", label: "History", icon: History },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const { data: credits } = useGetCredits();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Activity className="h-6 w-6 text-primary" />
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-lg tracking-tight">BMVoicePlug</span>
                <span className="text-[9px] text-muted-foreground font-medium tracking-widest uppercase">Voice Studio</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Tools dropdown */}
              <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  Tools <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", toolsOpen && "rotate-180")} />
                </button>
                {toolsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden z-50">
                    {TOOL_GROUPS.map(group => (
                      <div key={group.label}>
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30 bg-secondary/30">
                          {group.label}
                        </div>
                        {group.items.map(item => {
                          const Icon = item.icon;
                          return (
                            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-secondary/50 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* SMM Site link */}
            <a
              href={SMM_SITE_URL}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[hsl(21_100%_52%/0.3)] bg-[hsl(21_100%_52%/0.08)] text-[hsl(21_100%_52%)] text-xs font-semibold hover:bg-[hsl(21_100%_52%/0.15)] transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              BM SocialHub
            </a>

            {/* Credits */}
            <div className="hidden md:flex items-center gap-2 bg-secondary/50 border border-border/50 rounded-full px-3 py-1.5 shadow-inner">
              <Coins className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">
                {credits ? credits.credits.toLocaleString() : "..."} Credits
              </span>
              <Link href="/pricing">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary ml-2">Top up</Button>
              </Link>
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-accent" />
                  <span className="font-medium">{credits ? credits.credits.toLocaleString() : "..."} Credits</span>
                </div>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm">Top up</Button>
                </Link>
              </div>
              <nav className="flex flex-col gap-1">
                {mobileAllItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <a href={SMM_SITE_URL} className="flex items-center justify-center gap-2 h-10 rounded-xl border border-[hsl(21_100%_52%/0.3)] bg-[hsl(21_100%_52%/0.08)] text-[hsl(21_100%_52%)] font-semibold text-sm">
                <Sparkles className="h-4 w-4" />
                BM SocialMedia Hub
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/50 py-10 bg-card/30 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">BMVoicePlug</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nigeria's premier AI voice studio. 20+ voice features, 15+ Nigerian voices, starting from ₦25.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Features</div>
              <div className="grid grid-cols-2 gap-1">
                {["Text to Speech", "Speech to Speech", "Voice Design", "Sound Effects", "AI Dubbing", "Voice Cloning"].map(f => (
                  <span key={f} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">BM Products</div>
              <div className="space-y-2">
                <a href={SMM_SITE_URL} className="flex items-center gap-2 text-xs text-[hsl(21_100%_52%)] hover:opacity-80 transition-opacity">
                  <Sparkles className="h-3 w-3" />
                  BM SocialMedia Hub
                </a>
                <Link href="/" className="flex items-center gap-2 text-xs text-primary hover:opacity-80 transition-opacity">
                  <Activity className="h-3 w-3" />
                  BMVoicePlug Studio
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 pt-5 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} BMVoicePlug Voice Studio. All rights reserved. Built for Nigerian Creators.
          </div>
        </div>
      </footer>
    </div>
  );
}
