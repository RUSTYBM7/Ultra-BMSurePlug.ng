import { useState } from "react";
import { motion } from "framer-motion";
import { useListVoices, getListVoicesQueryKey } from "@workspace/api-client-react";
import { Play, Pause, Mic, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  free: "bg-green-500/10 text-green-400 border-green-500/20",
  premium: "bg-primary/10 text-primary border-primary/20",
  cloned: "bg-accent/10 text-accent border-accent/20",
};

export default function Voices() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [gender, setGender] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const { data, isLoading } = useListVoices({ category: category === "all" ? undefined : category }, { query: { queryKey: getListVoicesQueryKey({ category }) } });
  const voices = data?.voices || [];

  const filtered = voices.filter((v) => {
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.accent.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase());
    const matchGender = gender === "all" || v.gender === gender;
    return matchSearch && matchGender;
  });

  const handlePlay = (voiceId: string, voiceName: string) => {
    if (playingId === voiceId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(`Hello, my name is ${voiceName}. I am a voice available on BMsureplug Voice Studio.`);
      utter.rate = 0.9;
      utter.onend = () => setPlayingId(null);
      utter.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utter);
      setPlayingId(voiceId);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Library</h1>
          <p className="text-muted-foreground">
            {voices.length} voices across Nigerian accents, languages, and international styles.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search voices..."
              className="pl-9 bg-card border-border/50"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {["all", "free", "premium", "cloned"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all capitalize",
                  category === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
            <div className="w-px h-5 bg-border/50 mx-1" />
            {["all", "male", "female", "neutral"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all capitalize",
                  gender === g
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mb-5 text-sm text-muted-foreground">
          {isLoading ? "Loading..." : `${filtered.length} voices found`}
        </div>

        {/* Voice grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((voice, i) => (
            <motion.div
              key={voice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{voice.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-muted-foreground">{voice.accent}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground capitalize">{voice.gender}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("text-xs capitalize", categoryColors[voice.category])}>
                    {voice.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {voice.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {((voice.tags as string[]) || []).slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-muted-foreground border border-border/30">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={playingId === voice.id ? "default" : "outline"}
                    className="gap-1.5 flex-1"
                    onClick={() => handlePlay(voice.id, voice.name)}
                  >
                    {playingId === voice.id ? (
                      <><Pause className="h-3.5 w-3.5" /> Stop</>
                    ) : (
                      <><Play className="h-3.5 w-3.5" /> Preview</>
                    )}
                  </Button>
                  <Link href={`/studio?voice=${voice.id}`}>
                    <Button size="sm" variant="ghost" className="gap-1.5">
                      <Mic className="h-3.5 w-3.5" />
                      Use
                    </Button>
                  </Link>
                </div>
              </div>

              {playingId === voice.id && (
                <div className="px-5 pb-4">
                  <div className="flex items-center gap-[2px] h-6">
                    {Array.from({ length: 24 }).map((_, j) => (
                      <motion.div
                        key={j}
                        className="w-1 rounded-full bg-primary"
                        animate={{
                          scaleY: [0.2, Math.random() * 0.8 + 0.2, 0.2],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.4,
                          repeat: Infinity,
                          delay: j * 0.04,
                          ease: "easeInOut",
                        }}
                        style={{ height: "100%", transformOrigin: "center" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {!isLoading && filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              <Mic className="h-10 w-10 mx-auto mb-4 opacity-30" />
              <p>No voices match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
