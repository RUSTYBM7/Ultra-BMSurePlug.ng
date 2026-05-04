import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListVoices, useTextToSpeech, useGetCredits } from "@workspace/api-client-react";
import { Mic, Play, Pause, Download, Settings2, Sparkles, Volume2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function Waveform({ isActive }: { isActive: boolean }) {
  const bars = Array.from({ length: 48 });
  return (
    <div className="flex items-center gap-[2px] h-12 w-full justify-center">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-primary"
          style={{ width: 3 }}
          animate={isActive ? {
            scaleY: [0.15, Math.random() * 0.9 + 0.1, 0.15],
            opacity: [0.5, 1, 0.5],
          } : { scaleY: 0.15, opacity: 0.3 }}
          transition={{
            duration: 0.6 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.03,
            ease: "easeInOut",
          }}
          initial={{ scaleY: 0.15, height: "100%" }}
        />
      ))}
    </div>
  );
}

export default function Studio() {
  const [text, setText] = useState("");
  const [selectedVoiceId, setSelectedVoiceId] = useState("");
  const [stability, setStability] = useState([0.5]);
  const [similarity, setSimilarity] = useState([0.75]);
  const [style, setStyle] = useState([0.0]);
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<null | { jobId: string; creditsUsed: number; durationSeconds: number; text: string }>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const { data: voicesData } = useListVoices({ category: "all" });
  const { data: credits } = useGetCredits();
  const tts = useTextToSpeech();

  const voices = voicesData?.voices || [];
  const selectedVoice = voices.find(v => v.id === selectedVoiceId);

  useEffect(() => {
    if (voices.length && !selectedVoiceId) {
      setSelectedVoiceId(voices[0]?.id || "");
    }
  }, [voices]);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estimatedDuration = Math.max(0.5, wordCount * 0.4);
  const estimatedCredits = estimatedDuration <= 60 ? 5 : estimatedDuration <= 120 ? 10 : estimatedDuration <= 300 ? 25 : 50;

  const handleGenerate = () => {
    if (!text.trim()) {
      toast({ title: "No text", description: "Please enter some text to convert to speech.", variant: "destructive" });
      return;
    }
    if (!selectedVoiceId) {
      toast({ title: "No voice selected", description: "Please select a voice first.", variant: "destructive" });
      return;
    }

    tts.mutate(
      { text, voiceId: selectedVoiceId, stability: stability[0], similarity: similarity[0], style: style[0] },
      {
        onSuccess: (data) => {
          setGeneratedAudio(data);
          toast({ title: "Audio generated!", description: `Used ${data.creditsUsed} credits. Duration: ${data.durationSeconds.toFixed(1)}s` });
          // Use Web Speech API for actual audio
          speakText(text);
        },
        onError: () => {
          toast({ title: "Generation failed", description: "Please try again.", variant: "destructive" });
        },
      }
    );
  };

  const speakText = (t: string) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(t);
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.onstart = () => setIsPlaying(true);
    utter.onend = () => setIsPlaying(false);
    utter.onerror = () => setIsPlaying(false);
    synthRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  const togglePlay = () => {
    if (!generatedAudio) return;
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        speakText(generatedAudio.text);
      }
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
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Voice Studio</h1>
              <p className="text-sm text-muted-foreground">Convert text to professional audio</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,360px] gap-6">
          {/* Main editor */}
          <div className="space-y-4">
            {/* Text input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-border/50 bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <span className="text-sm font-medium text-muted-foreground">Enter your text</span>
                <span className="text-xs text-muted-foreground">{charCount} chars · {wordCount} words</span>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here... BMsureplug Voice Studio will transform it into natural, expressive audio."
                className="min-h-[240px] border-0 focus-visible:ring-0 resize-none bg-transparent font-mono text-sm leading-relaxed p-4"
              />
              <div className="px-4 py-3 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full", text.length > 0 ? "bg-primary" : "bg-muted")} />
                  <span className="text-xs text-muted-foreground">
                    Est. {estimatedDuration.toFixed(0)}s · {estimatedCredits} credits
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="gap-1.5 text-muted-foreground h-7"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  Settings
                  <ChevronDown className={cn("h-3 w-3 transition-transform", showSettings && "rotate-180")} />
                </Button>
              </div>
            </motion.div>

            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Voice Settings</h3>
                    {[
                      { label: "Stability", value: stability, setter: setStability, desc: "Higher = more consistent. Lower = more expressive." },
                      { label: "Similarity Boost", value: similarity, setter: setSimilarity, desc: "How closely to mimic the original voice." },
                      { label: "Style Exaggeration", value: style, setter: setStyle, desc: "Amplify the speaking style of the voice." },
                    ].map((setting) => (
                      <div key={setting.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{setting.label}</span>
                          <span className="text-xs text-muted-foreground font-mono">{setting.value[0].toFixed(2)}</span>
                        </div>
                        <Slider
                          value={setting.value}
                          onValueChange={setting.setter}
                          min={0}
                          max={1}
                          step={0.01}
                          className="mb-1"
                        />
                        <p className="text-xs text-muted-foreground">{setting.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio output */}
            <AnimatePresence>
              {(generatedAudio || tts.isPending) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-primary/30 bg-primary/5 p-5"
                >
                  {tts.isPending ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Generating audio...
                      </div>
                      <Waveform isActive={true} />
                    </div>
                  ) : generatedAudio && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm font-medium text-primary">Audio ready</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{generatedAudio.durationSeconds.toFixed(1)}s</span>
                          <span>{generatedAudio.creditsUsed} credits used</span>
                        </div>
                      </div>
                      <Waveform isActive={isPlaying} />
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant={isPlaying ? "outline" : "default"}
                          onClick={togglePlay}
                          className="gap-2"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          {isPlaying ? "Pause" : "Play"}
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 ml-auto" disabled>
                          <Download className="h-4 w-4" />
                          Download MP3
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right column: voice selector + generate */}
          <div className="space-y-4">
            {/* Credits */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-border/50 bg-card p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Available Credits</div>
                <div className="text-2xl font-bold tabular-nums">{credits?.credits ?? "..."}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-0.5">{credits?.plan ?? "Free"} Plan</div>
                <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                  <a href="/pricing">Top up</a>
                </Button>
              </div>
            </motion.div>

            {/* Voice selector */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-border/50 bg-card overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-border/40">
                <h3 className="text-sm font-semibold">Select Voice</h3>
                {selectedVoice && (
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={cn("text-xs", categoryColors[selectedVoice.category])}>
                      {selectedVoice.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{selectedVoice.accent}</span>
                  </div>
                )}
              </div>
              <div className="max-h-[380px] overflow-y-auto">
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoiceId(voice.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 border-b border-border/30 last:border-0 transition-colors",
                      "hover:bg-secondary/50",
                      selectedVoiceId === voice.id && "bg-primary/10 border-l-2 border-l-primary"
                    )}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium">{voice.name}</span>
                      <Badge variant="outline" className={cn("text-xs capitalize", categoryColors[voice.category])}>
                        {voice.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{voice.accent}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground capitalize">{voice.gender}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Generate button */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                className="w-full h-12 text-base font-semibold gap-2 shadow-lg shadow-primary/20"
                onClick={handleGenerate}
                disabled={tts.isPending || !text.trim() || !selectedVoiceId}
              >
                {tts.isPending ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Audio
                    <span className="ml-auto text-xs opacity-70">{estimatedCredits} cr</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Volume info */}
            <div className="rounded-xl border border-border/40 bg-card/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credit Pricing</span>
              </div>
              {[
                { label: "0 – 1 min", credits: "5 cr", naira: "₦25" },
                { label: "1 – 2 min", credits: "10 cr", naira: "₦40" },
                { label: "2 – 5 min", credits: "25 cr", naira: "₦90" },
                { label: "5 – 10 min", credits: "50 cr", naira: "₦170" },
              ].map((tier) => (
                <div key={tier.label} className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
                  <span className="text-xs text-muted-foreground">{tier.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono">{tier.credits}</span>
                    <span className="text-xs text-primary font-semibold">{tier.naira}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
