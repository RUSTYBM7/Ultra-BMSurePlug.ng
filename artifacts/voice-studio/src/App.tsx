import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";

import Home from "@/pages/home";
import Studio from "@/pages/studio";
import Voices from "@/pages/voices";
import Clone from "@/pages/clone";
import Pricing from "@/pages/pricing";
import History from "@/pages/history";
import Features from "@/pages/features";
import SpeechToSpeech from "@/pages/speech-to-speech";
import VoiceDesign from "@/pages/voice-design";
import SoundEffects from "@/pages/sound-effects";
import Dubbing from "@/pages/dubbing";
import Projects from "@/pages/projects";
import UIShowcase from "@/pages/ui-showcase";

const queryClient = new QueryClient();

function StubPage({ title, emoji, desc }: { title: string; emoji: string; desc: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-6xl mb-6">{emoji}</div>
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="text-muted-foreground text-lg max-w-md leading-relaxed mb-8">{desc}</p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
        Coming soon — currently in development
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/studio" component={Studio} />
      <Route path="/voices" component={Voices} />
      <Route path="/clone" component={Clone} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/history" component={History} />
      <Route path="/speech-to-speech" component={SpeechToSpeech} />
      <Route path="/voice-design" component={VoiceDesign} />
      <Route path="/sound-effects" component={SoundEffects} />
      <Route path="/dubbing" component={Dubbing} />
      <Route path="/projects" component={Projects} />
      <Route path="/ui-showcase" component={UIShowcase} />

      {/* Stub pages for remaining features */}
      <Route path="/podcast">
        {() => <StubPage emoji="🎙" title="Podcast Studio" desc="Multi-speaker podcast creation with automated mixing, transitions, and episode management. Assign different voices to different hosts." />}
      </Route>
      <Route path="/audiobook">
        {() => <StubPage emoji="📚" title="Audiobook Creator" desc="Import manuscripts and generate complete audiobooks with consistent voice, automatic chapter detection, and export to M4B/MP3." />}
      </Route>
      <Route path="/voice-changer">
        {() => <StubPage emoji="🎭" title="Real-time Voice Changer" desc="Transform your voice live during calls, Zoom meetings, or streams. Select a target voice and it converts in real-time under 200ms." />}
      </Route>
      <Route path="/multi-speaker">
        {() => <StubPage emoji="👥" title="Multi-Speaker Dialogue" desc="Assign different voices to different speakers in a script and generate entire conversations at once. Perfect for drama and roleplay content." />}
      </Route>
      <Route path="/emotion">
        {() => <StubPage emoji="😊" title="Emotion Control" desc="Fine-tune the emotional tone of generated audio — happy, sad, excited, calm, professional, or fearful. Slider-based control per sentence." />}
      </Route>
      <Route path="/ssml">
        {() => <StubPage emoji="💻" title="SSML Editor" desc="Advanced markup editor for precise speech control — add pauses, emphasis, phonemes, prosody, and speaking rate adjustments with live preview." />}
      </Route>
      <Route path="/pronunciation">
        {() => <StubPage emoji="📖" title="Pronunciation Dictionary" desc="Add custom pronunciations for brand names, technical terms, and Nigerian proper nouns like Olusegun, Chidinma, or Dangote." />}
      </Route>
      <Route path="/audio-native">
        {() => <StubPage emoji="🌐" title="Audio Native" desc="Embed a listen button on your website or blog. Visitors can hear your articles read aloud automatically — no extra setup required." />}
      </Route>
      <Route path="/ad-spots">
        {() => <StubPage emoji="📢" title="Ad Spot Creator" desc="Create professional radio and digital ad spots with jingles, voice-overs, and background music. Export radio-ready 30s and 60s cuts." />}
      </Route>
      <Route path="/ivr">
        {() => <StubPage emoji="📞" title="IVR & Phone Voices" desc="Generate professional phone system voices — IVR menus, hold scripts, and auto-attendant greetings. Export in 8kHz/16kHz WAV for telephony." />}
      </Route>
      <Route path="/character">
        {() => <StubPage emoji="🦸" title="Character Voices" desc="Expressive, dramatic voices built for animation, games, and storytelling. From heroes to villains — full range of character archetypes." />}
      </Route>
      <Route path="/batch">
        {() => <StubPage emoji="⚡" title="Batch Processing" desc="Submit hundreds of text-to-speech jobs at once via CSV upload or API. Perfect for localisation workflows and content at scale." />}
      </Route>
      <Route path="/music-mixer">
        {() => <StubPage emoji="🎵" title="Background Music Mixer" desc="Add royalty-free background music to your generated audio. Choose from 500+ tracks, adjust volume, and auto-fade at the end." />}
      </Route>
      <Route path="/language-tts">
        {() => <StubPage emoji="🗣" title="Language Translation TTS" desc="Write in English, generate in Yoruba, Igbo, Hausa, Pidgin, French, and 30+ languages. Native-sounding voices for each language." />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
