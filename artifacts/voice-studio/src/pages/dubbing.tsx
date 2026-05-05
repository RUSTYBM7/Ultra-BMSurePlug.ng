import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Upload, Play, Pause, Sparkles, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "yo", label: "Yoruba", flag: "🇳🇬" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "pcm", label: "Pidgin English", flag: "🇳🇬" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷" },
  { code: "sw", label: "Swahili", flag: "🇰🇪" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "zh", label: "Mandarin", flag: "🇨🇳" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
];

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-8">
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div key={i} className="rounded-full bg-primary flex-1"
          animate={active ? { scaleY: [0.1, Math.random()*0.9+0.1, 0.1], opacity: [0.5, 1, 0.5] } : { scaleY: 0.1 }}
          transition={{ duration: 0.6+Math.random()*0.4, repeat: Infinity, delay: i*0.03, ease: "easeInOut" }}
          initial={{ scaleY: 0.1, height: "100%" }}
        />
      ))}
    </div>
  );
}

export default function Dubbing() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetLang, setTargetLang] = useState("yo");
  const [preserveVoice, setPreserveVoice] = useState(true);
  const [dubbing, setDubbing] = useState(false);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("audio/") || f?.type.startsWith("video/")) setFile(f);
    else toast({ title: "Invalid file", description: "Please upload audio or video.", variant: "destructive" });
  };

  const handleDub = async () => {
    if (!file) return;
    setDubbing(true);
    await new Promise(r => setTimeout(r, 3000));
    setDubbing(false);
    setDone(true);
    toast({ title: "Dubbing complete!", description: `Audio dubbed into ${LANGUAGES.find(l => l.code === targetLang)?.label}` });
  };

  const handlePlay = () => {
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
    const lang = LANGUAGES.find(l => l.code === targetLang);
    const utter = new SpeechSynthesisUtterance(`This is a demonstration of the AI dubbing feature. Your content has been translated and dubbed into ${lang?.label || "the target language"}.`);
    utter.rate = 0.9; utter.onend = () => setPlaying(false);
    window.speechSynthesis.speak(utter); setPlaying(true);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><Globe className="h-5 w-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold">AI Dubbing</h1>
              <p className="text-sm text-muted-foreground">Translate and restyle audio into 30+ languages while preserving the original voice</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-5">
            {/* Upload */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all",
                  isDragging ? "border-primary bg-primary/10" :
                  file ? "border-green-500/50 bg-green-500/5" :
                  "border-border/50 bg-card hover:border-primary/50"
                )}
              >
                <input ref={fileInputRef} type="file" accept="audio/*,video/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile(f); setDone(false); } }} />
                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-2" />
                      <div className="font-semibold">{file.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{(file.size / (1024*1024)).toFixed(2)} MB</div>
                      <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground" onClick={e => { e.stopPropagation(); setFile(null); setDone(false); }}>
                        <X className="h-3.5 w-3.5 mr-1" />Remove
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <div className="font-semibold mb-1">Upload audio or video</div>
                      <div className="text-sm text-muted-foreground">MP3, MP4, WAV, MOV · Max 100MB · Max 10 minutes</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Language grid */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">Target Language</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {LANGUAGES.map(lang => (
                  <button key={lang.code} onClick={() => setTargetLang(lang.code)} className={cn(
                    "flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-medium transition-all",
                    targetLang === lang.code ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/40"
                  )}>
                    <span className="text-xl">{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Options */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">Options</h3>
              <div className="space-y-3">
                {[
                  { label: "Preserve original voice", desc: "Maintain speaker's voice characteristics in the dubbed audio", state: preserveVoice, setter: setPreserveVoice },
                ].map(opt => (
                  <div key={opt.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.desc}</div>
                    </div>
                    <button onClick={() => opt.setter(!opt.state)} className={cn(
                      "w-11 h-6 rounded-full border transition-all relative",
                      opt.state ? "bg-primary border-primary" : "bg-secondary border-border/50"
                    )}>
                      <div className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all", opt.state ? "left-5" : "left-0.5")} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Output */}
            <AnimatePresence>
              {(dubbing || done) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                  {dubbing ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Translating and dubbing audio...
                      </div>
                      <Waveform active={true} />
                      <div className="text-xs text-muted-foreground">This may take 1-2 minutes for longer files</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">✓ Dubbing complete</span>
                        <span className="text-xs text-muted-foreground">{LANGUAGES.find(l => l.code === targetLang)?.flag} {LANGUAGES.find(l => l.code === targetLang)?.label}</span>
                      </div>
                      <Waveform active={playing} />
                      <Button size="sm" className="gap-2" onClick={handlePlay}>
                        {playing ? <><Pause className="h-4 w-4" />Pause</> : <><Play className="h-4 w-4" />Play Dubbed Audio</>}
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">Credit Cost</h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: "< 1 min", cost: "20 credits" },
                  { label: "1 – 5 min", cost: "80 credits" },
                  { label: "5 – 10 min", cost: "150 credits" },
                ].map(t => (
                  <div key={t.label} className="flex justify-between py-1.5 border-b border-border/20 last:border-0">
                    <span className="text-muted-foreground">{t.label}</span>
                    <span className="text-primary font-semibold">{t.cost}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="rounded-xl border border-border/40 bg-card/50 p-5">
              <h3 className="text-sm font-semibold mb-2">How it works</h3>
              <ul className="space-y-1.5">
                {["AI detects speech in your audio", "Translates to your target language", "Synthesizes using your original voice characteristics", "Syncs timing to original audio"].map(s => (
                  <li key={s} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">·</span>{s}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Button className="w-full h-12 gap-2 font-semibold shadow-lg shadow-primary/20" onClick={handleDub} disabled={!file || dubbing}>
                {dubbing ? <><div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />Dubbing...</> : <><Sparkles className="h-5 w-5" />Start Dubbing</>}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
