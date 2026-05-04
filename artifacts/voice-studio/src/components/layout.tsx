import { Link, useLocation } from "wouter";
import { useGetCredits } from "@workspace/api-client-react";
import { Mic, Headphones, Plus, CreditCard, History, Coins, Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: credits } = useGetCredits();

  const navItems = [
    { href: "/studio", label: "Studio", icon: Mic },
    { href: "/voices", label: "Voices", icon: Headphones },
    { href: "/clone", label: "Clone", icon: Plus },
    { href: "/history", label: "History", icon: History },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight font-sans">
                BMsureplug
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-secondary/50 border border-border/50 rounded-full px-3 py-1.5 shadow-inner">
              <Coins className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">
                {credits ? credits.credits.toLocaleString() : "..."} Credits
              </span>
              <Link href="/pricing">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary ml-2">
                  Top up
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-accent" />
                  <span className="font-medium">
                    {credits ? credits.credits.toLocaleString() : "..."} Credits
                  </span>
                </div>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm">Top up</Button>
                </Link>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/50 py-8 bg-background mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BMsureplug Voice Studio. All rights reserved.</p>
          <p className="mt-2">Built for Nigerian Creators.</p>
        </div>
      </footer>
    </div>
  );
}