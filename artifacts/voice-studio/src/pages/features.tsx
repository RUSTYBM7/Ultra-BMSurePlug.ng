import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  { id: "studio", emoji: "🎤", title: "Text to Speech", desc: "Convert any text into studio-quality audio using 15+ Nigerian and international voices.", href: "/studio", badge: "Core" },
  { id: "speech-to-speech", emoji: "🔄", title: "Speech to Speech", desc: "Upload or record audio and transform it using a different voice while keeping the same delivery.", href: "/speech-to-speech", badge: "New" },
  { id: "voice-design", emoji: "🎨", title: "Voice Design", desc: "Describe a voice in words and let AI generate it. Create unique voices from scratch.", href: "/voice-design", badge: "AI" },
  { id: "clone", emoji: "🧬", title: "Instant Voice Cloning", desc: "Clone any voice from a 30-second audio sample. Your digital twin, ready in minutes.", href: "/clone", badge: "Pro" },
  { id: "dubbing", emoji: "🌍", title: "AI Dubbing", desc: "Automatically translate and restyle audio into 30+ languages while preserving the original voice.", href: "/dubbing", badge: "New" },
  { id: "sound-effects", emoji: "🔊", title: "Sound Effects", desc: "Generate any sound effect using text prompts. Explosions, nature, foley — all AI-generated.", href: "/sound-effects", badge: "New" },
  { id: "projects", emoji: "📁", title: "Projects", desc: "Organise long-form audio projects. Build audiobooks, courses, and series with multiple chapters.", href: "/projects", badge: "Pro" },
  { id: "podcast", emoji: "🎙", title: "Podcast Studio", desc: "Multi-speaker podcast creation with automated mixing, transitions, and episode management.", href: "/podcast", badge: "Pro" },
  { id: "audiobook", emoji: "📚", title: "Audiobook Creator", desc: "Import manuscripts and generate full audiobooks with consistent voice and chapter navigation.", href: "/audiobook", badge: "Pro" },
  { id: "voice-changer", emoji: "🎭", title: "Real-time Voice Changer", desc: "Transform your voice live during calls, streams, or recordings. Apply effects in real-time.", href: "/voice-changer", badge: "Live" },
  { id: "multi-speaker", emoji: "👥", title: "Multi-Speaker Dialogue", desc: "Assign different voices to different speakers and generate entire conversations at once.", href: "/multi-speaker", badge: "New" },
  { id: "emotion", emoji: "😊", title: "Emotion Control", desc: "Fine-tune the emotional tone of generated audio — happy, sad, excited, calm, professional.", href: "/emotion", badge: "AI" },
  { id: "ssml", emoji: "💻", title: "SSML Editor", desc: "Advanced markup editor for precise control over speech: pauses, emphasis, phonemes, and more.", href: "/ssml", badge: "Dev" },
  { id: "pronunciation", emoji: "📖", title: "Pronunciation Dictionary", desc: "Add custom pronunciations for brand names, technical terms, and Nigerian proper nouns.", href: "/pronunciation", badge: "Pro" },
  { id: "audio-native", emoji: "🌐", title: "Audio Native", desc: "Embed a listen button on your website or blog. Visitors can hear your articles read aloud.", href: "/audio-native", badge: "Web" },
  { id: "ad-spots", emoji: "📢", title: "Ad Spot Creator", desc: "Create professional radio and digital ad spots with jingles, voice-overs, and background music.", href: "/ad-spots", badge: "New" },
  { id: "ivr", emoji: "📞", title: "IVR & Phone Voices", desc: "Generate professional phone system voices — hold music scripts, IVR menus, and auto-attendants.", href: "/ivr", badge: "Business" },
  { id: "character", emoji: "🦸", title: "Character Voices", desc: "Expressive voices built for animation, games, and storytelling. From heroes to villains.", href: "/character", badge: "Creative" },
  { id: "batch", emoji: "⚡", title: "Batch Processing", desc: "Submit hundreds of text-to-speech jobs at once. Perfect for localisation and content at scale.", href: "/batch", badge: "API" },
  { id: "music-mixer", emoji: "🎵", title: "Background Music Mixer", desc: "Add royalty-free background music to your generated audio. Adjust volume and fade automatically.", href: "/music-mixer", badge: "New" },
  { id: "language-tts", emoji: "🗣", title: "Language Translation TTS", desc: "Write in English, generate in Yoruba, Igbo, Hausa, Pidgin, French, and 30+ more languages.", href: "/language-tts", badge: "Global" },
  { id: "history", emoji: "📋", title: "Generation History", desc: "Browse, replay, and download all your past generations with full metadata and credit logs.", href: "/history", badge: "Core" },
];

const BADGE_COLORS: Record<string, string> = {
  Core: "bg-slate-700/50 text-slate-300 border-slate-600/40",
  New: "bg-primary/15 text-primary border-primary/25",
  AI: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  Pro: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Live: "bg-red-500/15 text-red-400 border-red-500/25",
  Dev: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Web: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  Business: "bg-green-500/15 text-green-400 border-green-500/25",
  Creative: "bg-pink-500/15 text-pink-400 border-pink-500/25",
  API: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
  Global: "bg-teal-500/15 text-teal-400 border-teal-500/25",
};

export default function Features() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            ✨ 20+ ElevenLabs-Style Features
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Everything Voice.</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(280_100%_60%)] mb-6">One Platform.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From basic text-to-speech to advanced AI dubbing, voice cloning, and real-time voice changing — BMVoicePlug has every audio creation tool Nigerian creators need.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link href={feature.href}>
                <div className="group h-full p-5 rounded-xl border border-border/50 bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{feature.emoji}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_COLORS[feature.badge] || "bg-secondary text-muted-foreground border-border/50"}`}>
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Try it now <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
