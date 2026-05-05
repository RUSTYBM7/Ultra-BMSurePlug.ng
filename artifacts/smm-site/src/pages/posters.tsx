import { motion } from "framer-motion";
import poster1 from "@assets/IMG_1148_1777965417896.png";
import poster2 from "@assets/IMG_1147_1777965417896.png";
import poster3 from "@assets/IMG_1146_1777965417896.png";
import poster4 from "@assets/IMG_1071_1777965417896.png";
import { Download, Share2, ExternalLink } from "lucide-react";

const POSTERS = [
  {
    id: 1,
    img: poster1,
    title: "The Algorithm Poster (v1)",
    desc: 'Red background, bold newspaper headline - "THE ALGORITHM IS NOT IGNORING YOU"',
    tag: "Viral",
    color: "text-red-400",
    bg: "from-red-950/40 to-red-900/20",
  },
  {
    id: 2,
    img: poster2,
    title: "BMSureplug.ng Newspaper",
    desc: "Classic editorial newspaper poster for Instagram & Twitter ads",
    tag: "Trending",
    color: "text-orange-400",
    bg: "from-orange-950/40 to-orange-900/20",
  },
  {
    id: 3,
    img: poster3,
    title: "Live Creator Poster",
    desc: 'Creator with gimbal, pink background - "Get the engagement it deserves"',
    tag: "New",
    color: "text-pink-400",
    bg: "from-pink-950/40 to-pink-900/20",
  },
  {
    id: 4,
    img: poster4,
    title: "Brand Builder Poster",
    desc: 'Man on phone, clean light background - "Building an online brand is now easier"',
    tag: "Popular",
    color: "text-primary",
    bg: "from-primary/10 to-primary/5",
  },
];

const GENERATED = [
  {
    id: 5,
    title: "Algorithm Newspaper Dark",
    desc: "Dark-mode editorial version with the bmsocial hub logo",
    tag: "Generated",
    color: "text-yellow-400",
    isHtml: true,
  },
  {
    id: 6,
    title: "200K Free TikTok Views",
    desc: "Promo card for new user free giveaway offer",
    tag: "Promo",
    color: "text-green-400",
    isHtml: true,
  },
  {
    id: 7,
    title: "Engagement Booster",
    desc: "Orange-branded story format for IG reels promotion",
    tag: "Story",
    color: "text-primary",
    isHtml: true,
  },
];

function GeneratedPoster({ p }: { p: typeof GENERATED[0] }) {
  const gradients: Record<number, string> = {
    5: "from-red-900 via-red-800 to-black",
    6: "from-green-900 via-emerald-800 to-black",
    7: "from-orange-900 via-orange-800 to-black",
  };
  const texts: Record<number, { headline: string; sub: string; cta: string }> = {
    5: { headline: "THE ALGORITHM IS NOT IGNORING YOU", sub: "IT JUST HAS NOT MET bmsocial hub YET", cta: "www.bmsureplug.online" },
    6: { headline: "New Users Get 200K FREE TikTok Views", sub: "PLUS Free IG Views, Likes & Post Boost", cta: "Sign up at BM SocialMedia Hub" },
    7: { headline: "Your Content Deserves Real Engagement", sub: "Get real followers, views & likes — fast", cta: "BMsureplug.ng ▶" },
  };
  const t = texts[p.id];
  const g = gradients[p.id];
  return (
    <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${g} flex flex-col justify-between p-6`}>
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold uppercase tracking-widest text-white/60">bmsocial hub</span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/10 ${p.color}`}>{p.tag}</span>
      </div>
      <div className="space-y-3">
        <div className="h-px bg-white/20" />
        <p className="font-black text-white text-xl leading-tight uppercase" style={{ fontFamily: "Georgia, serif" }}>
          {t.headline}
        </p>
        <p className="text-white/80 font-semibold text-sm leading-snug">
          {t.sub}
        </p>
        <div className="h-px bg-white/20" />
        <p className={`text-xs font-bold ${p.color}`}>{t.cta}</p>
      </div>
    </div>
  );
}

export default function Posters() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Brand Posters
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            bmsocial hub <span className="text-primary">Marketing</span> Kit
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Official promotional posters for social media, ads, and brand campaigns. Download and share.
          </p>
        </motion.div>

        {/* Real photo posters */}
        <h2 className="text-lg font-bold mb-6 text-muted-foreground uppercase tracking-widest">Photo Posters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {POSTERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-b ${p.bg} group relative`}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                  <a
                    href={p.img}
                    download
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-black hover:bg-white transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm ${p.color}`}>
                  {p.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Generated CSS posters */}
        <h2 className="text-lg font-bold mb-6 text-muted-foreground uppercase tracking-widest">Generated Brand Posters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {GENERATED.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-2xl overflow-hidden border border-border/40 group"
            >
              <GeneratedPoster p={p} />
              <div className="p-4 bg-card border-t border-border/30">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <button className="shrink-0 w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orange editorial poster inline */}
        <h2 className="text-lg font-bold mb-6 text-muted-foreground uppercase tracking-widest">Full-Size Editorial Poster</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl overflow-hidden border border-primary/30 max-w-2xl mx-auto"
        >
          {/* Inline editorial poster (orange #FF6200) */}
          <div
            className="relative overflow-hidden"
            style={{ background: "#FF6200", minHeight: 500, fontFamily: "'Montserrat', sans-serif" }}
          >
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }} />
            {/* Diagonal sweep */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(135deg, rgba(255,220,150,0.18) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)",
            }} />

            {/* Header bar */}
            <div className="relative z-10 flex items-center justify-between px-8 py-4" style={{ background: "#111" }}>
              <div>
                <div className="text-white font-black text-xs tracking-widest uppercase">bmsocial</div>
                <div className="font-black leading-none" style={{ fontFamily: "Impact, sans-serif", fontSize: 32, color: "#FF6200" }}>hub ▶</div>
              </div>
              <div className="text-[10px] text-gray-400 tracking-[3px] uppercase font-bold">Social Media Growth Studio</div>
            </div>

            {/* Main headline */}
            <div className="relative z-10 px-10 py-10 text-center">
              <div className="font-black text-5xl text-black leading-none mb-2" style={{ fontFamily: "Impact, sans-serif", letterSpacing: -1 }}>THE ALGORITHM</div>
              <div className="font-black text-5xl text-white leading-none mb-2" style={{ fontFamily: "Impact, sans-serif" }}>IS NOT IGNORING</div>
              <div className="font-black text-4xl text-black leading-none" style={{ fontFamily: "Impact, sans-serif" }}>YOU — IT JUST</div>
              <div className="font-black text-3xl text-white leading-none mt-2" style={{ fontFamily: "Impact, sans-serif" }}>HASN'T MET</div>
              <div className="font-black text-4xl leading-none mt-1" style={{ fontFamily: "Impact, sans-serif", color: "#111" }}>bmsocial hub YET</div>
            </div>

            {/* CTA bar */}
            <div className="relative z-10 px-8 py-5 flex items-center justify-between" style={{ background: "#111" }}>
              <div>
                <div className="font-black text-white text-base">Want more views, likes, and followers?</div>
                <div className="font-black text-lg" style={{ color: "#FF6200" }}>bmsocial hub is your plug.</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white bg-white/10 rounded-xl px-4 py-2">
                  <div className="text-primary mb-1 font-extrabold">NEW USERS ENJOY:</div>
                  <div className="text-white/80">• Get 200K FREE TikTok views</div>
                  <div className="text-white/80">• Get FREE IG views, likes & post boost.</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between px-8 py-3" style={{ background: "#0a0a0a" }}>
              <span className="text-xs text-gray-500">Social media Growth studio ▶</span>
              <span className="text-xs font-bold" style={{ color: "#FF6200" }}>WWW.BMSOCIALHUB.COM</span>
            </div>
          </div>

          <div className="p-5 bg-card border-t border-border/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm">Editorial Orange Poster</div>
              <div className="text-xs text-muted-foreground mt-0.5">Full resolution — perfect for IG feed, Facebook ads, Twitter</div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/50 text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* Usage tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 rounded-2xl border border-border/40 bg-card p-8 grid md:grid-cols-3 gap-6"
        >
          <div>
            <div className="text-primary font-bold mb-2">📱 Instagram</div>
            <p className="text-sm text-muted-foreground">Use portrait posters (3:4 ratio) for feed. Add story swipe-up to bmsureplug.online</p>
          </div>
          <div>
            <div className="text-primary font-bold mb-2">🐦 X / Twitter</div>
            <p className="text-sm text-muted-foreground">Landscape posters work best. Pin the Algorithm poster for maximum reach</p>
          </div>
          <div>
            <div className="text-primary font-bold mb-2">📘 Facebook Ads</div>
            <p className="text-sm text-muted-foreground">Use the editorial orange poster for engagement campaigns. CTA: "Get free views"</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
