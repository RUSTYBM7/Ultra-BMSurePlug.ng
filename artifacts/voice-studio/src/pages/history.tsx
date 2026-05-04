import { useState } from "react";
import { motion } from "framer-motion";
import { useGetHistory, getGetHistoryQueryKey } from "@workspace/api-client-react";
import { Play, Pause, Mic, Clock, Coins, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "Just now";
}

export default function History() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [limit, setLimit] = useState(20);

  const { data, isLoading } = useGetHistory({ limit }, { query: { queryKey: getGetHistoryQueryKey({ limit }) } });
  const history = data?.history || [];

  const handlePlay = (item: { id: string; text: string; voiceName: string }) => {
    if (playingId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(item.text);
      utter.rate = 0.9;
      utter.onend = () => setPlayingId(null);
      utter.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utter);
      setPlayingId(item.id);
    }
  };

  const totalCredits = history.reduce((sum, h) => sum + (Number(h.creditsUsed) || 0), 0);
  const totalMinutes = history.reduce((sum, h) => sum + (Number(h.durationSeconds) || 0), 0) / 60;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Generation History</h1>
              <p className="text-muted-foreground">{history.length} generations</p>
            </div>
            <Link href="/studio">
              <Button className="gap-2">
                <Mic className="h-4 w-4" />
                New Generation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Summary stats */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <Mic className="h-5 w-5 text-primary mx-auto mb-2 opacity-70" />
              <div className="text-2xl font-bold tabular-nums">{history.length}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Generations</div>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <Clock className="h-5 w-5 text-accent mx-auto mb-2 opacity-70" />
              <div className="text-2xl font-bold tabular-nums">{totalMinutes.toFixed(1)}m</div>
              <div className="text-xs text-muted-foreground mt-0.5">Total Audio</div>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <Coins className="h-5 w-5 text-yellow-400 mx-auto mb-2 opacity-70" />
              <div className="text-2xl font-bold tabular-nums">{totalCredits}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Credits Used</div>
            </div>
          </motion.div>
        )}

        {/* History list */}
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border/30 bg-card h-24 animate-pulse" />
            ))
          ) : history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-semibold mb-2">No generations yet</h3>
              <p className="text-muted-foreground mb-6">Start creating voice content in the Studio.</p>
              <Link href="/studio">
                <Button className="gap-2">
                  <Mic className="h-4 w-4" />
                  Open Studio
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-xl border border-border/50 bg-card hover:border-primary/20 transition-all duration-200 overflow-hidden"
              >
                <div className="p-4 flex items-start gap-4">
                  <Button
                    size="icon"
                    variant={playingId === item.id ? "default" : "outline"}
                    className="shrink-0 h-9 w-9"
                    onClick={() => handlePlay(item)}
                  >
                    {playingId === item.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate mb-1.5">{item.text}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {item.voiceName}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.durationSeconds.toFixed(1)}s
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Coins className="h-3 w-3" />
                        {item.creditsUsed} credits
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {playingId === item.id && (
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-[2px] h-5">
                      {Array.from({ length: 32 }).map((_, j) => (
                        <motion.div
                          key={j}
                          className="w-[3px] rounded-full bg-primary"
                          animate={{
                            scaleY: [0.2, Math.random() * 0.8 + 0.2, 0.2],
                            opacity: [0.4, 1, 0.4],
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
            ))
          )}
        </div>

        {history.length >= limit && (
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => setLimit(l => l + 20)}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
