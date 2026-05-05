import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Play, Pause, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { label: "All", id: "all" },
  { label: "Nature", id: "nature" },
  { label: "Urban", id: "urban" },
  { label: "Music", id: "music" },
  { label: "Sci-Fi", id: "scifi" },
  { label: "Horror", id: "horror" },
  { label: "Comedy", id: "comedy" },
];

const PRESETS = [
  { cat: "nature", label: "Tropical rainforest with birds chirping", emoji: "🌴" },
  { cat: "nature", label: "Ocean waves crashing on a Lagos beach", emoji: "🌊" },
  { cat: "urban", label: "Busy Lagos market with motorbikes and vendors", emoji: "🛵" },
  { cat: "urban", label: "Abuja city traffic at peak hour", emoji: "🚗" },
  { cat: "music", label: "Afrobeats drum pattern with shakers", emoji: "🥁" },
  { cat: "music", label: "Traditional talking drum sequence", emoji: "🎵" },
  { cat: "scifi", label: "Futuristic laser blast", emoji: "⚡" },
  { cat: "scifi", label: "Spaceship engine humming", emoji: "🚀" },
  { cat: "horror", label: "Creaking door in an empty room", emoji: "🚪" },
  { cat: "horror", label: "Thunder and lightning storm", emoji: "⛈" },
  { cat: "comedy", label: "Cartoon boing sound effect", emoji: "🎪" },
  { cat: "comedy", label: "Slide whistle falling", emoji: "😂" },
];

function Bars({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-8">
      {Array.from({ length: 32 }).map((_, i) => (
        <motion.div key={i} className="rounded-full bg-primary flex-1"
          animate={active ? { scaleY: [0.1, Math.random()*0.9+0.1, 0.1] } : { scaleY: 0.1 }}
          transition={{ duration: 0.5+Math.random()*0.4, repeat: Infinity, delay: i*0.03, ease: "easeInOut" }}
          initial={{ scaleY: 0.1, height: "100%" }}
        />
      ))}
    </div>
  );
}

export default function SoundEffects() {
  const [prompt, setPrompt] = useState("");
  const [cat, setCat] = useState("all");
  const [duration, setDuration] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) { toast({ title: "Describe a sound effect", variant: "destructive" }); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(prompt);
    toast({ title: "Sound effect generated!" });
  };

  const handlePlay = () => {
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
    setPlaying(true);
    setTimeout(() => setPlaying(false), duration * 1000);
  };

  const filteredPresets = cat === "all" ? PRESETS : PRESETS.filter(p => p.cat === cat);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><Volume2 className="h-5 w-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold">Sound Effects Generator</h1>
              <p className="text-sm text-muted-foreground">Generate any sound effect using text prompts — all AI-powered</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,280px] gap-6">
          <div className="space-y-5">
            {/* Prompt */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/40">
                <h3 className="text-sm font-semibold">Describe your sound effect</h3>
              </div>
              <div className="p-4">
                <input
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g. Busy Lagos street market with motorbikes and vendors shouting..."
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
                />
              </div>
            </motion.div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`px-3 py-1.5 rounded-full text-sm border transition-all ${cat === c.id ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/40"}`}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Presets */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Quick prompts</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {filteredPresets.map(p => (
                  <button key={p.label} onClick={() => setPrompt(p.label)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 text-left transition-all group">
                    <span className="text-lg">{p.emoji}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{p.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Output */}
            <AnimatePresence>
              {(generating || generated) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                  {generating ? (
                    <><div className="flex items-center gap-2 text-sm text-primary font-medium"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" />Generating sound effect...</div><Bars active={true} /></>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">✓ Sound effect ready</span>
                        <span className="text-xs text-muted-foreground">{duration}s</span>
                      </div>
                      <Bars active={playing} />
                      <div className="flex items-center gap-3">
                        <Button size="sm" className="gap-2" onClick={handlePlay}>
                          {playing ? <><Pause className="h-4 w-4" />Stop</> : <><Play className="h-4 w-4" />Play</>}
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2" disabled><Download className="h-4 w-4" />Download</Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
              <h3 className="text-sm font-semibold">Settings</h3>
              <div>
                <div className="flex justify-between mb-2 text-xs">
                  <span className="font-medium">Duration</span>
                  <span className="text-muted-foreground font-mono">{duration}s</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[3, 5, 10, 15, 22].map(d => (
                    <button key={d} onClick={() => setDuration(d)} className={`px-3 py-1 rounded-lg text-xs border transition-all ${duration === d ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/40"}`}>{d}s</button>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-border/30">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between"><span>3s</span><span className="text-primary">2 credits</span></div>
                  <div className="flex justify-between"><span>5s</span><span className="text-primary">3 credits</span></div>
                  <div className="flex justify-between"><span>10s</span><span className="text-primary">5 credits</span></div>
                  <div className="flex justify-between"><span>22s</span><span className="text-primary">10 credits</span></div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Button className="w-full h-12 gap-2 font-semibold shadow-lg shadow-primary/20" onClick={handleGenerate} disabled={!prompt.trim() || generating}>
                {generating ? <><div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />Generating...</> : <><Sparkles className="h-5 w-5" />Generate Sound<span className="ml-auto text-xs opacity-70">{duration <= 3 ? 2 : duration <= 5 ? 3 : duration <= 10 ? 5 : 10} cr</span></>}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
