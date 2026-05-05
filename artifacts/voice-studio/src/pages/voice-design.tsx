import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, Play, Pause, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const PRESETS = [
  { label: "Warm Naija Male", prompt: "A warm, friendly Nigerian male voice with a Lagos accent. Confident and clear, like a radio presenter." },
  { label: "Professional Female", prompt: "A polished, professional Nigerian female voice. Calm, articulate, and authoritative. Perfect for corporate narration." },
  { label: "Energetic Youth", prompt: "A young, energetic Nigerian voice full of enthusiasm. Upbeat and vibrant, like a Gen-Z content creator." },
  { label: "Elder Storyteller", prompt: "A wise, deep Nigerian elder's voice. Slow and deliberate, with the gravitas of a seasoned storyteller." },
  { label: "News Anchor", prompt: "A crisp, neutral Nigerian news anchor voice. Professional and measured with perfect diction." },
  { label: "Cheerful Yoruba", prompt: "A cheerful, warm Yoruba-accented voice. Friendly and inviting with gentle Yoruba tonal inflections." },
];

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-12 w-full">
      {Array.from({ length: 48 }).map((_, i) => (
        <motion.div key={i} className="rounded-full bg-primary flex-1"
          animate={active ? { scaleY: [0.1, Math.random()*0.9+0.1, 0.1], opacity: [0.5, 1, 0.5] } : { scaleY: 0.1 }}
          transition={{ duration: 0.7+Math.random()*0.4, repeat: Infinity, delay: i*0.025, ease: "easeInOut" }}
          initial={{ scaleY: 0.1, height: "100%" }}
        />
      ))}
    </div>
  );
}

export default function VoiceDesign() {
  const [prompt, setPrompt] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "neutral">("female");
  const [age, setAge] = useState([35]);
  const [energy, setEnergy] = useState([60]);
  const [depth, setDepth] = useState([50]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) { toast({ title: "Describe a voice first", variant: "destructive" }); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
    toast({ title: "Voice designed!", description: "Your custom AI voice is ready to use." });
  };

  const handlePlay = () => {
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
    const utter = new SpeechSynthesisUtterance("Hello! This is your custom designed voice. You described me, and AI brought me to life. Pretty amazing, right?");
    utter.rate = 0.9; utter.onend = () => setPlaying(false);
    window.speechSynthesis.speak(utter);
    setPlaying(true);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><Palette className="h-5 w-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold">Voice Design</h1>
              <p className="text-sm text-muted-foreground">Describe a voice in words — AI generates it from scratch</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-5">
            {/* Prompt */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/40">
                <h3 className="text-sm font-semibold">Describe your voice</h3>
                <p className="text-xs text-muted-foreground">Be specific about accent, tone, age, energy, and purpose</p>
              </div>
              <Textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g. A warm, confident Lagos female voice in her 30s. Slightly husky, professional but approachable. Perfect for podcast hosting." className="min-h-[140px] border-0 focus-visible:ring-0 resize-none bg-transparent text-sm p-4" />
            </motion.div>

            {/* Presets */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Quick presets</div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => setPrompt(p.prompt)} className="text-xs px-3 py-1.5 rounded-full border border-border/50 bg-card hover:border-primary/50 hover:text-primary transition-all">
                    {p.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Output */}
            <AnimatePresence>
              {(generating || generated) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                  {generating ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Designing your voice...
                      </div>
                      <Waveform active={true} />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">✓ Voice designed</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => { setGenerated(false); handleGenerate(); }} className="gap-1 text-xs h-7">
                            <RefreshCcw className="h-3 w-3" /> Regenerate
                          </Button>
                        </div>
                      </div>
                      <Waveform active={playing} />
                      <div className="flex items-center gap-3">
                        <Button size="sm" onClick={handlePlay} className="gap-2">
                          {playing ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Preview</>}
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">Save to Library</Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              <h3 className="text-sm font-semibold">Voice Parameters</h3>

              <div>
                <div className="text-xs font-medium mb-2">Gender</div>
                <div className="grid grid-cols-3 gap-1">
                  {(["male", "female", "neutral"] as const).map(g => (
                    <button key={g} onClick={() => setGender(g)} className={`py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${gender === g ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/40"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: "Age", value: age, setter: setAge, min: 15, max: 80, display: `${age[0]}y` },
                { label: "Energy Level", value: energy, setter: setEnergy, min: 0, max: 100, display: `${energy[0]}%` },
                { label: "Voice Depth", value: depth, setter: setDepth, min: 0, max: 100, display: `${depth[0]}%` },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">{s.label}</span>
                    <span className="text-xs text-muted-foreground font-mono">{s.display}</span>
                  </div>
                  <Slider value={s.value} onValueChange={s.setter} min={s.min} max={s.max} step={1} />
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Button className="w-full h-12 gap-2 font-semibold shadow-lg shadow-primary/20" onClick={handleGenerate} disabled={!prompt.trim() || generating}>
                {generating ? <><div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />Designing...</> : <><Sparkles className="h-5 w-5" />Design Voice<span className="ml-auto text-xs opacity-70">25 cr</span></>}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
