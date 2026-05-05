import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Zap, TrendingUp, Gift } from "lucide-react";
import poster1 from "@assets/IMG_1148_1777965417896.png";
import poster2 from "@assets/IMG_1147_1777965417896.png";
import poster3 from "@assets/IMG_1146_1777965417896.png";
import poster4 from "@assets/IMG_1071_1777965417896.png";
import { Link } from "wouter";

const PROMOS = [
  {
    id: 1,
    img: poster1,
    headline: "THE ALGORITHM IS NOT IGNORING YOU",
    sub: "It just hasn't met BM SocialMedia Hub yet.",
    cta: "Get Followers Now",
    href: "/services",
    badge: "VIRAL",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    img: poster2,
    headline: "3,700+ Services. Every Platform.",
    sub: "Real followers, views, and engagement — delivered fast.",
    cta: "Browse Catalog",
    href: "/services",
    badge: "TRENDING",
    badgeColor: "bg-primary",
  },
  {
    id: 3,
    img: poster3,
    headline: "Get the Engagement You Deserve",
    sub: "Nigerian creators trust BM SocialMedia Hub for real growth.",
    cta: "Start Growing",
    href: "/services",
    badge: "NEW",
    badgeColor: "bg-pink-500",
  },
  {
    id: 4,
    img: poster4,
    headline: "Building a Brand Online is Now Easy",
    sub: "Start with 100 followers. End with 100,000.",
    cta: "View Plans",
    href: "/plans",
    badge: "POPULAR",
    badgeColor: "bg-orange-500",
  },
];

export function FloatingPromoBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [promoIdx, setPromoIdx] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setPromoIdx(i => (i + 1) % PROMOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  const promo = PROMOS[promoIdx];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="float-banner"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-72 shadow-2xl rounded-2xl overflow-hidden border border-border/60"
        >
          <div className="relative">
            <img src={promo.img} alt={promo.headline} className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <button
              onClick={() => { setVisible(false); setDismissed(true); }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
            <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full text-white ${promo.badgeColor}`}>
              {promo.badge}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="text-white font-black text-sm leading-tight mb-0.5">{promo.headline}</div>
              <div className="text-white/70 text-xs">{promo.sub}</div>
            </div>
          </div>
          <div className="bg-card p-3 flex items-center justify-between">
            <div className="flex gap-1">
              {PROMOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPromoIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === promoIdx ? "bg-primary w-4" : "bg-border"}`}
                />
              ))}
            </div>
            <Link
              href={promo.href}
              onClick={() => setVisible(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              {promo.cta} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PagePromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-b border-primary/20"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-foreground">Daily Giveaway — ₦5,000 in free services!</div>
            <div className="text-xs text-muted-foreground truncate">Follow us on Instagram + comment your handle to enter</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/giveaway" className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-bold hover:bg-primary/90 transition-colors">
            Enter Now
          </Link>
          <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function SidebarPosterWidget() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % 4), 4000);
    return () => clearInterval(t);
  }, []);

  const imgs = [poster1, poster2, poster3, poster4];
  const captions = [
    "The Algorithm Is Not Ignoring You",
    "BMSureplug.ng — Your Growth Partner",
    "Get The Engagement You Deserve",
    "Building an Online Brand — Made Easy",
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-80 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={imgs[idx]}
          alt={captions[idx]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-white font-bold text-sm mb-2">{captions[idx]}</div>
        <Link href="/services" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-bold">
          Get Started <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="absolute bottom-2 right-3 flex gap-1">
        {imgs.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-white w-3" : "bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
