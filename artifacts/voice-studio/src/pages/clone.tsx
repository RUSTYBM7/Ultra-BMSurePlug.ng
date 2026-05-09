import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCloneVoice, useListVoices } from "@workspace/api-client-react";
import { Upload, Mic, CheckCircle, AlertCircle, Play, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Clone() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [clonedVoice, setClonedVoice] = useState<null | { voiceId: string; name: string }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: voicesData } = useListVoices({ category: "cloned" });
  const clonedVoices = voicesData?.voices?.filter(v => v.isCloned) || [];

  const clone = useCloneVoice();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("audio/")) {
      setFile(dropped);
    } else {
      toast({ title: "Invalid file", description: "Please upload an audio file (MP3, WAV, M4A).", variant: "destructive" });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const toBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  const handleClone = async () => {
    if (!file) {
      toast({ title: "No audio file", description: "Please upload an audio sample first.", variant: "destructive" });
      return;
    }
    if (!name.trim()) {
      toast({ title: "No name", description: "Please give your cloned voice a name.", variant: "destructive" });
      return;
    }

    const audioBase64 = await toBase64(file);
    clone.mutate(
      { data: { name, description, audioBase64, fileName: file.name } },
      {
        onSuccess: (data) => {
          setClonedVoice({ voiceId: data.voiceId, name: data.name });
          toast({ title: "Voice cloned!", description: `"${data.name}" is ready to use in the studio.` });
          setFile(null);
          setName("");
          setDescription("");
        },
        onError: () => {
          toast({ title: "Cloning failed", description: "Please try again.", variant: "destructive" });
        },
      }
    );
  };

  const fileSize = file ? (file.size / (1024 * 1024)).toFixed(2) : null;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Cloning</h1>
          <p className="text-muted-foreground">Upload a 30+ second audio sample to create your digital voice twin.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          {/* Clone form */}
          <div className="space-y-5">
            {/* Upload area */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300",
                  isDragging
                    ? "border-primary bg-primary/10"
                    : file
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileSelect} />

                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div
                      key="file"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-2"
                    >
                      <CheckCircle className="h-10 w-10 text-green-400 mx-auto" />
                      <div className="font-semibold">{file.name}</div>
                      <div className="text-sm text-muted-foreground">{fileSize} MB · {file.type}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-muted-foreground hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      >
                        <X className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-3"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                      <div>
                        <div className="font-semibold mb-1">Drop your audio file here</div>
                        <div className="text-sm text-muted-foreground">MP3, WAV, M4A · Max 25MB · Min 30 seconds</div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2" onClick={e => e.stopPropagation()}>
                        <Upload className="h-3.5 w-3.5" />
                        Browse files
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Voice name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-border/50 bg-card p-5 space-y-4"
            >
              <h3 className="text-sm font-semibold">Voice Details</h3>
              <div>
                <label className="block text-sm font-medium mb-1.5">Voice Name <span className="text-destructive">*</span></label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Podcast Voice, Brand Narrator..."
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Description <span className="text-muted-foreground text-xs">(optional)</span></label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Warm Nigerian male voice for podcast narration"
                  className="bg-background/50 border-border/50"
                />
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-border/40 bg-card/50 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold">Tips for best results</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Record in a quiet room with minimal background noise",
                  "Speak naturally and clearly — avoid whispering or shouting",
                  "Minimum 30 seconds, 1-3 minutes for best quality",
                  "Avoid music or other voices in the background",
                  "Use a good quality microphone if possible",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Clone button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Button
                className="w-full h-12 text-base font-semibold gap-2 shadow-lg shadow-primary/20"
                onClick={handleClone}
                disabled={clone.isPending || !file || !name.trim()}
              >
                {clone.isPending ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Cloning voice...
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Clone My Voice
                    <span className="ml-auto text-xs opacity-70">100 credits</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Success */}
            <AnimatePresence>
              {clonedVoice && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 flex items-center gap-4"
                >
                  <CheckCircle className="h-8 w-8 text-green-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-green-400">Voice "{clonedVoice.name}" is ready!</div>
                    <div className="text-sm text-muted-foreground mt-0.5">Go to the Studio to start generating audio with your new voice.</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cloned voices list */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-border/50 bg-card overflow-hidden sticky top-20"
            >
              <div className="px-5 py-4 border-b border-border/40">
                <h3 className="font-semibold">Your Cloned Voices</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{clonedVoices.length} voice{clonedVoices.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="p-4 space-y-3">
                {clonedVoices.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Mic className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No cloned voices yet.</p>
                    <p className="text-xs mt-1">Upload your first audio sample to get started.</p>
                  </div>
                ) : (
                  clonedVoices.map((voice) => (
                    <div key={voice.id} className="p-3 rounded-lg border border-border/40 bg-background/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{voice.name}</span>
                        <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">cloned</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{voice.description}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="px-5 py-4 border-t border-border/40">
                <div className="text-xs text-muted-foreground text-center">
                  Voice cloning costs <strong className="text-primary">100 credits</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
