import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Plus, Play, Pause, Mic, Clock, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const DEMO_PROJECTS = [
  {
    id: "1", title: "BM Brand Audio Guide", type: "Audiobook", chapters: 5, totalDuration: "24:30",
    status: "In Progress", lastEdited: "2h ago", progress: 60,
    chapters_list: [
      { id: "c1", title: "Introduction", duration: "3:45", status: "done" },
      { id: "c2", title: "Chapter 1: Vision", duration: "5:20", status: "done" },
      { id: "c3", title: "Chapter 2: Services", duration: "6:10", status: "in-progress" },
      { id: "c4", title: "Chapter 3: Growth", duration: "4:55", status: "pending" },
      { id: "c5", title: "Conclusion", duration: "4:20", status: "pending" },
    ]
  },
  {
    id: "2", title: "The Lagos Hustle Podcast", type: "Podcast", chapters: 8, totalDuration: "1:12:00",
    status: "Complete", lastEdited: "1d ago", progress: 100,
    chapters_list: []
  },
  {
    id: "3", title: "Product Explainer Series", type: "Series", chapters: 3, totalDuration: "15:00",
    status: "Draft", lastEdited: "3d ago", progress: 20,
    chapters_list: []
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [expanded, setExpanded] = useState<string | null>("1");
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string, title: string) => {
    if (playingId === id) { window.speechSynthesis.cancel(); setPlayingId(null); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(`Playing ${title}`);
    utter.onend = () => setPlayingId(null);
    window.speechSynthesis.speak(utter);
    setPlayingId(id);
  };

  const statusColors: Record<string, string> = {
    "done": "text-green-400",
    "in-progress": "text-primary",
    "pending": "text-muted-foreground",
    "In Progress": "bg-primary/10 text-primary border-primary/20",
    "Complete": "bg-green-500/10 text-green-400 border-green-500/20",
    "Draft": "bg-secondary text-muted-foreground border-border/50",
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><FolderOpen className="h-5 w-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-sm text-muted-foreground">Long-form audio projects with chapters and episodes</p>
            </div>
          </div>
          <Button onClick={() => setShowNew(true)} className="gap-2">
            <Plus className="h-4 w-4" />New Project
          </Button>
        </motion.div>

        {/* New project dialog */}
        <AnimatePresence>
          {showNew && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="rounded-xl border border-primary/30 bg-primary/5 p-5 mb-5">
              <h3 className="font-semibold mb-3">New Project</h3>
              <div className="flex gap-3">
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Project title..." className="flex-1 h-10 px-4 rounded-lg border border-border/50 bg-background/50 text-sm focus:outline-none focus:border-primary/50" />
                <Button onClick={() => { if (newTitle.trim()) { setProjects(p => [{ id: Date.now().toString(), title: newTitle, type: "Series", chapters: 0, totalDuration: "0:00", status: "Draft", lastEdited: "Just now", progress: 0, chapters_list: [] }, ...p]); setNewTitle(""); setShowNew(false); } }}>
                  Create
                </Button>
                <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects list */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              {/* Project header */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{project.title}</h3>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", statusColors[project.status])}>{project.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="bg-secondary/50 px-2 py-0.5 rounded">{project.type}</span>
                      <span className="flex items-center gap-1"><Mic className="h-3 w-3" />{project.chapters} chapters</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{project.totalDuration}</span>
                      <span>Edited {project.lastEdited}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handlePlay(project.id, project.title)}>
                      {playingId === project.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setProjects(p => p.filter(x => x.id !== project.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
                      <ChevronRight className={cn("h-4 w-4 transition-transform", expanded === project.id && "rotate-90")} />
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{project.progress}% complete</div>
              </div>

              {/* Chapters */}
              <AnimatePresence>
                {expanded === project.id && project.chapters_list.length > 0 && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border/30">
                    <div className="divide-y divide-border/20">
                      {project.chapters_list.map((ch) => (
                        <div key={ch.id} className="flex items-center justify-between px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", ch.status === "done" ? "bg-green-400" : ch.status === "in-progress" ? "bg-primary animate-pulse" : "bg-muted")} />
                            <span className={cn("text-sm", ch.status === "pending" ? "text-muted-foreground" : "")}>{ch.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground font-mono">{ch.duration}</span>
                            <span className={cn("text-xs capitalize", statusColors[ch.status] || "text-muted-foreground")}>{ch.status === "in-progress" ? "In Progress" : ch.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-border/20">
                      <Link href="/studio">
                        <Button size="sm" variant="outline" className="gap-2 text-xs">
                          <Plus className="h-3.5 w-3.5" />Add Chapter in Studio
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold mb-2">No projects yet</p>
              <p className="text-sm mb-6">Create your first project to organise long-form audio</p>
              <Button onClick={() => setShowNew(true)} className="gap-2"><Plus className="h-4 w-4" />New Project</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
