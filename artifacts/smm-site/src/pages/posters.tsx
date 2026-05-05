import { motion } from "framer-motion";
import poster1 from "@assets/IMG_1148_1777965417896.png";
import poster2 from "@assets/IMG_1147_1777965417896.png";
import poster3 from "@assets/IMG_1146_1777965417896.png";
import poster4 from "@assets/IMG_1071_1777965417896.png";
import { Download, Share2, Star } from "lucide-react";

const POSTERS = [
  {
    id: 1,
    img: poster1,
    title: "The Algorithm Poster",
    desc: "Red background, bold newspaper headline. Viral engagement design.",
    tag: "Viral",
    color: "text-red-400",
    bg: "from-red-950/40 to-red-900/20",
  },
  {
    id: 2,
    img: poster2,
    title: "BMSureplug.ng Newspaper",
    desc: "Classic editorial newspaper poster for Instagram and Twitter ads.",
    tag: "Trending",
    color: "text-orange-400",
    bg: "from-orange-950/40 to-orange-900/20",
  },
  {
    id: 3,
    img: poster3,
    title: "Live Creator Poster",
    desc: "Creator with gimbal, pink background. Perfect for creator campaigns.",
    tag: "New",
    color: "text-pink-400",
    bg: "from-pink-950/40 to-pink-900/20",
  },
  {
    id: 4,
    img: poster4,
    title: "Brand Builder Poster",
    desc: "Man on phone, clean light background. Building an online brand.",
    tag: "Popular",
    color: "text-primary",
    bg: "from-primary/10 to-primary/5",
  },
];

export default function Posters() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs uppercase tracking-widest font-bold text-primary mb-2">PROMO POSTERS</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Brand Posters</h1>
          <p className="text-muted-foreground text-lg">Official BM SocialMedia Hub promotional materials. Use for ads, stories, and campaigns.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POSTERS.map((poster, i) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-b ${poster.bg}`}
            >
              <div className="aspect-[9/16] relative overflow-hidden">
                <img
                  src={poster.img}
                  alt={poster.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-full bg-black/50 border border-current ${poster.color}`}>
                  {poster.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className={`font-bold text-base mb-1 ${poster.color}`}>{poster.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{poster.desc}</p>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-border/50 text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center py-16 rounded-2xl border border-dashed border-border/50"
        >
          <Star className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-bold mb-2">Custom Poster Request</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            Need a custom promotional poster for your brand or campaign? We design custom materials for resellers and premium clients.
          </p>
          <a
            href="https://wa.me/234000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            Request Custom Poster
          </a>
        </motion.div>
      </div>
    </div>
  );
}
