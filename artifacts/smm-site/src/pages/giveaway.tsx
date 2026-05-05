import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Trophy, Users, Star, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const tomorrow = new Date();
tomorrow.setHours(24, 0, 0, 0);

export default function Giveaway() {
  const countdown = useCountdown(tomorrow);
  const [email, setEmail] = useState("");
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    if (email) setEntered(true);
  };

  const leaderboard = [
    { rank: 1, name: "Tunde O.", tickets: 24, badge: "🥇" },
    { rank: 2, name: "Chioma N.", tickets: 19, badge: "🥈" },
    { rank: 3, name: "Umar A.", tickets: 15, badge: "🥉" },
    { rank: 4, name: "Sade B.", tickets: 12, badge: "" },
    { rank: 5, name: "Kelechi I.", tickets: 9, badge: "" },
  ];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card text-xs font-semibold text-primary mb-5 uppercase tracking-wider">
            🎁 Daily Giveaway + Weekly Challenge
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">Win every day.</h1>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">Compete every week.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter the daily draw for free service credits. Refer friends for extra entries. Top weekly performers win massive prize bundles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr,360px] gap-6">
          {/* Left: Draw card */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-primary mb-1">TODAY'S DRAW</div>
                  <h3 className="text-2xl font-black">Daily Giveaway</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border/40 bg-background/60 mb-5">
                <div className="text-xs text-muted-foreground mb-1">Today's prize</div>
                <div className="text-2xl font-black">₦10,000 Service Bundle</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 text-center">
                  <div className="text-2xl font-black">0</div>
                  <div className="text-xs text-muted-foreground">Participants today</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 text-center">
                  <div className="text-2xl font-black">0</div>
                  <div className="text-xs text-muted-foreground">Your tickets</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                <Clock className="h-4 w-4 text-primary" />
                Draw in <span className="font-mono font-bold text-foreground">{countdown}</span>
              </div>

              {entered ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 flex items-center gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-green-400">You're in the draw!</div>
                    <div className="text-xs text-muted-foreground">Refer friends to earn bonus tickets. 1 referral = 1 extra entry.</div>
                  </div>
                </motion.div>
              ) : (
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-background/50 text-sm mb-3 focus:outline-none focus:border-primary/50"
                  />
                  <button
                    onClick={handleEnter}
                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all orange-glow"
                  >
                    <Gift className="h-5 w-5" />
                    Sign up to Enter Free
                  </button>
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    Refer friends to earn bonus tickets. 1 referral = 1 extra entry.
                  </div>
                </div>
              )}
            </motion.div>

            {/* How to earn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { icon: "🎫", title: "1 Entry", desc: "Join the daily draw" },
                { icon: "👥", title: "+1 Entry", desc: "Refer a friend" },
                { icon: "⭐", title: "+3 Points", desc: "Place an order" },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-xl border border-border/50 bg-card text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-bold text-sm text-primary">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                </div>
              ))}
            </motion.div>

            {/* Weekly prizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Weekly Challenge Prizes
              </h3>
              <div className="space-y-3">
                {[
                  { pos: "1st Place", prize: "₦50,000 Service Credit", icon: "🥇" },
                  { pos: "2nd Place", prize: "₦25,000 Service Credit", icon: "🥈" },
                  { pos: "3rd Place", prize: "₦10,000 Service Credit", icon: "🥉" },
                  { pos: "Top 10", prize: "₦2,000 Service Credit each", icon: "⭐" },
                ].map(item => (
                  <div key={item.pos} className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-background/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-sm">{item.pos}</span>
                    </div>
                    <span className="text-primary font-bold text-sm">{item.prize}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: My rank + Recent winners */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">My Weekly Rank</h3>
              </div>
              {!entered ? (
                <div className="text-center py-8">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-sm text-muted-foreground mb-4">Sign in to track your rank</p>
                  <button
                    onClick={() => setEntered(true)}
                    className="px-6 h-9 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
                  >
                    Sign In →
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-5xl font-black text-primary mb-1">#—</div>
                  <div className="text-sm text-muted-foreground">Your position this week</div>
                  <div className="mt-4 text-xs text-muted-foreground">Place orders and refer friends to climb the leaderboard</div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Top Participants</h3>
              </div>
              <div className="space-y-2">
                {leaderboard.map(player => (
                  <div
                    key={player.rank}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border",
                      player.rank === 1 ? "border-yellow-500/30 bg-yellow-500/5" :
                      player.rank === 2 ? "border-slate-400/30 bg-slate-400/5" :
                      player.rank === 3 ? "border-amber-600/30 bg-amber-600/5" :
                      "border-border/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg w-6">{player.badge || `#${player.rank}`}</span>
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{player.tickets} tickets</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Gift className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Recent Winners</h3>
              </div>
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">Be the first winner today!</p>
                <p className="text-xs text-muted-foreground mt-1">Winners announced daily at midnight.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
