import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListVoices } from "@workspace/api-client-react";
import { Upload, Play, Pause, Mic, RefreshCcw, Sparkles, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-10 w-full justify-center">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-primary"
          style={{ width: 3 }}
          animate={active ? { scaleY: [0.1, Math.random() * 0.9 + 0.1, 0.1], opacity: [0.4, 1, 0.4] } : { scaleY: 0.1 }}
          transition={{ duration: 0.7 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.03, ease: "easeInOut" }}
          initial={{ scaleY: 0.1, height: "100%" }}
        />
      ))}
    </div>
  );
}

export default function SpeechToSpeech() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { data: voicesData } = useListVoices({ category: "all" });
  const voices = voicesData?.voices || [];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("audio/")) setFile(f);
    else toast({ title: "Invalid file", description: "Please upload an audio file.", variant: "destructive" });
  };

  const handleProcess = async () => {
    if (!file || !selectedVoiceId) return;
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2500));
    setProcessing(false);
    setDone(true);
    toast({ title: "Voice transformed!", description: "Your audio has been converted to the selected voice." });
  };

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const voice = voices.find(v => v.id === selectedVoiceId);
      const utter = new SpeechSynthesisUtterance(`This is a speech to speech conversion demo using the ${voice?.name || "selected"} voice. Your original audio has been transformed.`);
      utter.rate = 0.9;
      utter.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utter);
      setIsPlaying(true);
    }
  };

  const categoryColors: Record<string, string> = {
    free: "bg-green-500/10 text-green-400 border-green-500/20",
    premium: "bg-primary/10 text-primary border-primary/20",
    cloned: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <RefreshCcw className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Speech to Speech</h1>
              <p className="text-sm text-muted-foreground">Transform audio using a different voice while keeping the same delivery</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,340px] gap-6">
          <div className="space-y-5">
            {/* Upload audio */}
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
                <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-2" />
                      <div className="font-semibold">{file.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{(file.size / (1024*1024)).toFixed(2)} MB</div>
                      <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground" onClick={e => { e.stopPropagation(); setFile(null); setDone(false); }}>
                        <X className="h-3.5 w-3.5 mr-1" /> Remove
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <div className="font-semibold mb-1">Drop your audio file here</div>
                      <div className="text-sm text-muted-foreground">MP3, WAV, M4A · Max 25MB</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">How Speech to Speech works</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: "1", label: "Upload audio", desc: "Any voice, any quality" },
                  { step: "2", label: "Select target voice", desc: "From 15+ Nigerian voices" },
                  { step: "3", label: "Transform", desc: "AI preserves delivery" },
                ].map(s => (
                  <div key={s.step} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-2">{s.step}</div>
                    <div className="text-xs font-semibold mb-0.5">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Output */}
            <AnimatePresence>
              {(processing || done) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                  {processing ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Transforming voice...
                      </div>
                      <Waveform active={true} />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-primary">✓ Voice transformed</span>
                        <span className="text-xs text-muted-foreground">Ready to play</span>
                      </div>
                      <Waveform active={isPlaying} />
                      <Button size="sm" className="mt-3 gap-2" onClick={handlePlay}>
                        {isPlaying ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Play Result</>}
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: voice + generate */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/40">
                <h3 className="text-sm font-semibold">Target Voice</h3>
                <p className="text-xs text-muted-foreground">The voice to convert into</p>
              </div>
              <div className="max-h-[340px] overflow-y-auto">
                {voices.map(v => (
                  <button key={v.id} onClick={() => setSelectedVoiceId(v.id)} className={cn(
                    "w-full text-left px-4 py-3 border-b border-border/30 last:border-0 transition-colors hover:bg-secondary/50",
                    selectedVoiceId === v.id && "bg-primary/10 border-l-2 border-l-primary"
                  )}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium">{v.name}</span>
                      <Badge variant="outline" className={cn("text-xs capitalize", categoryColors[v.category])}>{v.category}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{v.accent} · {v.gender}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Button className="w-full h-12 gap-2 font-semibold shadow-lg shadow-primary/20" onClick={handleProcess} disabled={!file || !selectedVoiceId || processing}>
                {processing ? <><div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />Transforming...</> : <><Sparkles className="h-5 w-5" />Transform Voice<span className="ml-auto text-xs opacity-70">10 cr</span></>}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
