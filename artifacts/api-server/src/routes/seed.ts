import { Router } from "express";
import { db } from "@workspace/db";
import { voicesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

const VOICES = [
  // ── NIGERIAN ──
  { id: "ng_adaeze", name: "Adaeze", category: "premium", gender: "female", accent: "Nigerian", language: "English", description: "Educated Nigerian female, warm and authoritative", tags: ["nigerian","female","premium","news"] },
  { id: "ng_aisha", name: "Aisha", category: "premium", gender: "female", accent: "Nigerian", language: "English", description: "Soft-spoken Northern Nigerian presenter", tags: ["nigerian","female","premium"] },
  { id: "ng_chukwuemeka", name: "Chukwuemeka", category: "free", gender: "male", accent: "Nigerian", language: "English", description: "Deep Igbo-accented male voice, storyteller", tags: ["nigerian","male","free","storytelling"] },
  { id: "ng_tunde", name: "Tunde", category: "free", gender: "male", accent: "Nigerian", language: "English", description: "Lagos street-smart Yoruba-accented male", tags: ["nigerian","male","free","casual"] },
  { id: "ng_ngozi", name: "Ngozi", category: "premium", gender: "female", accent: "Nigerian", language: "English", description: "Professional Igbo female presenter", tags: ["nigerian","female","premium","professional"] },
  { id: "ng_emeka", name: "Emeka", category: "free", gender: "male", accent: "Nigerian", language: "English", description: "Friendly Lagos male voice for social content", tags: ["nigerian","male","free","social"] },
  { id: "ng_fatima", name: "Fatima", category: "premium", gender: "female", accent: "Nigerian", language: "Hausa", description: "Hausa-language female presenter, Kano dialect", tags: ["nigerian","female","hausa","premium"] },
  { id: "ng_biodun", name: "Biodun", category: "free", gender: "male", accent: "Nigerian", language: "Yoruba", description: "Yoruba-language storyteller, Lagos", tags: ["nigerian","male","yoruba","free"] },
  { id: "ng_chisom", name: "Chisom", category: "premium", gender: "female", accent: "Nigerian", language: "Igbo", description: "Igbo-language female narrator, Enugu", tags: ["nigerian","female","igbo","premium"] },
  { id: "ng_seun", name: "Seun", category: "free", gender: "male", accent: "Nigerian", language: "English", description: "Young Yoruba-accented male, podcast host tone", tags: ["nigerian","male","free","podcast"] },
  { id: "ng_blessing", name: "Blessing", category: "premium", gender: "female", accent: "Nigerian", language: "English", description: "Delta-State female, vibrant and expressive", tags: ["nigerian","female","premium"] },
  { id: "ng_uche", name: "Uche", category: "free", gender: "male", accent: "Nigerian", language: "English", description: "Anambra male, calm narrator for explainers", tags: ["nigerian","male","free","explainer"] },

  // ── UK / BRITISH ──
  { id: "uk_james", name: "James", category: "premium", gender: "male", accent: "British", language: "English", description: "RP British male, BBC news presenter style", tags: ["british","male","premium","news"] },
  { id: "uk_olivia", name: "Olivia", category: "premium", gender: "female", accent: "British", language: "English", description: "Southern British female, professional narrator", tags: ["british","female","premium"] },
  { id: "uk_arthur", name: "Arthur", category: "free", gender: "male", accent: "British", language: "English", description: "Warm London male storyteller", tags: ["british","male","free","storytelling"] },
  { id: "uk_charlotte", name: "Charlotte", category: "premium", gender: "female", accent: "British", language: "English", description: "Posh British female, luxury brand voice", tags: ["british","female","premium","luxury"] },
  { id: "uk_harry", name: "Harry", category: "free", gender: "male", accent: "Scottish", language: "English", description: "Scottish male, warm and trustworthy", tags: ["british","scottish","male","free"] },
  { id: "uk_siobhan", name: "Siobhán", category: "premium", gender: "female", accent: "Irish", language: "English", description: "Irish female, melodic and engaging narrator", tags: ["british","irish","female","premium"] },

  // ── AMERICAN ──
  { id: "us_michael", name: "Michael", category: "premium", gender: "male", accent: "American", language: "English", description: "Deep American male narrator, documentary style", tags: ["american","male","premium","documentary"] },
  { id: "us_ashley", name: "Ashley", category: "free", gender: "female", accent: "American", language: "English", description: "Friendly Midwestern female, podcast host", tags: ["american","female","free","podcast"] },
  { id: "us_ryan", name: "Ryan", category: "premium", gender: "male", accent: "American", language: "English", description: "California tech-entrepreneur male voice", tags: ["american","male","premium","tech"] },
  { id: "us_jessica", name: "Jessica", category: "premium", gender: "female", accent: "American", language: "English", description: "New York female newsreader, crisp delivery", tags: ["american","female","premium","news"] },
  { id: "us_marcus", name: "Marcus", category: "free", gender: "male", accent: "American", language: "English", description: "Southern American storyteller, warm baritone", tags: ["american","male","free"] },
  { id: "us_sarah", name: "Sarah", category: "premium", gender: "female", accent: "American", language: "English", description: "Professional American female, e-learning specialist", tags: ["american","female","premium","elearning"] },
  { id: "us_derek", name: "Derek", category: "free", gender: "male", accent: "American", language: "English", description: "Energetic American male for ads and promos", tags: ["american","male","free","ads"] },
  { id: "us_brittany", name: "Brittany", category: "free", gender: "female", accent: "American", language: "English", description: "Gen-Z American female, relatable and fun", tags: ["american","female","free","social"] },

  // ── WEST AFRICAN ──
  { id: "gh_kwame", name: "Kwame", category: "premium", gender: "male", accent: "Ghanaian", language: "English", description: "Ghanaian male, educated Accra accent", tags: ["ghanaian","male","premium","west-african"] },
  { id: "gh_akosua", name: "Akosua", category: "free", gender: "female", accent: "Ghanaian", language: "English", description: "Friendly Ghanaian female presenter", tags: ["ghanaian","female","free","west-african"] },
  { id: "sn_mamadou", name: "Mamadou", category: "premium", gender: "male", accent: "Senegalese", language: "French", description: "Senegalese French-language male narrator", tags: ["senegalese","male","premium","french"] },
  { id: "ci_amani", name: "Amani", category: "free", gender: "female", accent: "Ivorian", language: "French", description: "Côte d'Ivoire French-language female voice", tags: ["ivorian","female","free","french"] },
  { id: "cm_paul", name: "Paul", category: "premium", gender: "male", accent: "Cameroonian", language: "French", description: "Bilingual Cameroonian male, French & English", tags: ["cameroonian","male","premium","bilingual"] },
  { id: "sl_aminata", name: "Aminata", category: "free", gender: "female", accent: "Sierra Leonean", language: "English", description: "Sierra Leone Krio-accented female narrator", tags: ["west-african","female","free"] },

  // ── EAST AFRICAN ──
  { id: "ke_wanjiru", name: "Wanjiru", category: "premium", gender: "female", accent: "Kenyan", language: "English", description: "Kenyan female, Nairobi metro presenter", tags: ["kenyan","female","premium","east-african"] },
  { id: "ke_jomo", name: "Jomo", category: "free", gender: "male", accent: "Kenyan", language: "English", description: "Warm Kenyan male for educational content", tags: ["kenyan","male","free","education"] },
  { id: "tz_amina", name: "Amina", category: "premium", gender: "female", accent: "Tanzanian", language: "Swahili", description: "Swahili-language female presenter, Dar es Salaam", tags: ["tanzanian","female","premium","swahili"] },
  { id: "et_abebe", name: "Abebe", category: "free", gender: "male", accent: "Ethiopian", language: "English", description: "Ethiopian-accented English male narrator", tags: ["ethiopian","male","free"] },
  { id: "rw_claire", name: "Claire", category: "premium", gender: "female", accent: "Rwandan", language: "English", description: "Kigali-based professional female presenter", tags: ["rwandan","female","premium"] },
  { id: "ug_david", name: "David", category: "free", gender: "male", accent: "Ugandan", language: "English", description: "Kampala Ugandan male, clear English presenter", tags: ["east-african","ugandan","male","free"] },

  // ── SOUTH AFRICAN ──
  { id: "za_lerato", name: "Lerato", category: "premium", gender: "female", accent: "South African", language: "English", description: "Johannesburg female, warm broadcast quality", tags: ["south-african","female","premium"] },
  { id: "za_sipho", name: "Sipho", category: "free", gender: "male", accent: "South African", language: "English", description: "Zulu-accented South African male presenter", tags: ["south-african","male","free"] },
  { id: "za_anri", name: "Anri", category: "premium", gender: "female", accent: "Afrikaans", language: "Afrikaans", description: "Afrikaans-language professional female", tags: ["south-african","female","afrikaans","premium"] },

  // ── SPANISH / LATIN ──
  { id: "es_carlos", name: "Carlos", category: "premium", gender: "male", accent: "Spanish", language: "Spanish", description: "Castilian Spanish male, professional narrator", tags: ["spanish","male","premium"] },
  { id: "mx_sofia", name: "Sofía", category: "free", gender: "female", accent: "Mexican", language: "Spanish", description: "Mexican Spanish female, warm and expressive", tags: ["spanish","mexican","female","free"] },
  { id: "ar_lucas", name: "Lucas", category: "premium", gender: "male", accent: "Argentine", language: "Spanish", description: "Buenos Aires Spanish male, storytelling", tags: ["spanish","argentine","male","premium"] },
  { id: "co_valeria", name: "Valeria", category: "free", gender: "female", accent: "Colombian", language: "Spanish", description: "Colombian Spanish female, Bogotá neutral accent", tags: ["spanish","colombian","female","free"] },
  { id: "br_pedro", name: "Pedro", category: "premium", gender: "male", accent: "Brazilian", language: "Portuguese", description: "Brazilian Portuguese male, São Paulo professional", tags: ["portuguese","brazilian","male","premium"] },
  { id: "br_ana", name: "Ana", category: "free", gender: "female", accent: "Brazilian", language: "Portuguese", description: "Brazilian Portuguese female, warm narrator", tags: ["portuguese","brazilian","female","free"] },
  { id: "cl_diego", name: "Diego", category: "premium", gender: "male", accent: "Chilean", language: "Spanish", description: "Chilean Spanish male, documentary narrator", tags: ["spanish","chilean","male","premium"] },
  { id: "ve_isabella", name: "Isabella", category: "free", gender: "female", accent: "Venezuelan", language: "Spanish", description: "Venezuelan female, telenovela-quality voice", tags: ["spanish","venezuelan","female","free"] },

  // ── FRENCH ──
  { id: "fr_pierre", name: "Pierre", category: "premium", gender: "male", accent: "French", language: "French", description: "Parisian French male, luxury brand quality", tags: ["french","male","premium"] },
  { id: "fr_marie", name: "Marie", category: "free", gender: "female", accent: "French", language: "French", description: "French female narrator, clear Parisian accent", tags: ["french","female","free"] },
  { id: "be_luc", name: "Luc", category: "premium", gender: "male", accent: "Belgian", language: "French", description: "Belgian French-speaking male narrator", tags: ["french","belgian","male","premium"] },
  { id: "ch_celine", name: "Céline", category: "free", gender: "female", accent: "Swiss French", language: "French", description: "Swiss French female, calm and professional", tags: ["french","swiss","female","free"] },

  // ── GERMAN ──
  { id: "de_hans", name: "Hans", category: "premium", gender: "male", accent: "German", language: "German", description: "German male, authoritative documentary voice", tags: ["german","male","premium"] },
  { id: "de_lena", name: "Lena", category: "free", gender: "female", accent: "German", language: "German", description: "German female, professional e-learning voice", tags: ["german","female","free"] },
  { id: "at_franz", name: "Franz", category: "premium", gender: "male", accent: "Austrian", language: "German", description: "Viennese Austrian German male presenter", tags: ["german","austrian","male","premium"] },

  // ── ARABIC ──
  { id: "ar_khalid", name: "Khalid", category: "premium", gender: "male", accent: "Gulf Arabic", language: "Arabic", description: "Gulf Arabic male, formal news presenter", tags: ["arabic","male","premium","news"] },
  { id: "ar_layla", name: "Layla", category: "free", gender: "female", accent: "Egyptian Arabic", language: "Arabic", description: "Egyptian Arabic female, warm storyteller", tags: ["arabic","female","free","egyptian"] },
  { id: "ar_omar", name: "Omar", category: "premium", gender: "male", accent: "Levantine Arabic", language: "Arabic", description: "Lebanese Arabic male, media professional", tags: ["arabic","male","premium","levantine"] },
  { id: "ar_nour", name: "Nour", category: "free", gender: "female", accent: "Syrian Arabic", language: "Arabic", description: "Syrian Arabic female, gentle narrator", tags: ["arabic","female","free"] },
  { id: "ma_youssef", name: "Youssef", category: "premium", gender: "male", accent: "Moroccan Arabic", language: "Arabic", description: "Moroccan Darija-accented male narrator", tags: ["arabic","moroccan","male","premium"] },

  // ── HINDI / SOUTH ASIAN ──
  { id: "in_arjun", name: "Arjun", category: "premium", gender: "male", accent: "Indian", language: "Hindi", description: "Bollywood-quality Hindi male voice", tags: ["hindi","indian","male","premium"] },
  { id: "in_priya", name: "Priya", category: "free", gender: "female", accent: "Indian", language: "Hindi", description: "Hindi female narrator, warm Delhi accent", tags: ["hindi","indian","female","free"] },
  { id: "in_raj", name: "Raj", category: "premium", gender: "male", accent: "Indian English", language: "English", description: "Indian-accented English male, tech sector", tags: ["indian","english","male","premium","tech"] },
  { id: "in_meera", name: "Meera", category: "free", gender: "female", accent: "Indian English", language: "English", description: "Mumbai English-speaking female presenter", tags: ["indian","english","female","free"] },
  { id: "pk_hassan", name: "Hassan", category: "premium", gender: "male", accent: "Pakistani", language: "Urdu", description: "Urdu-language professional male narrator", tags: ["urdu","pakistani","male","premium"] },
  { id: "bd_fatema", name: "Fatema", category: "free", gender: "female", accent: "Bangladeshi", language: "Bengali", description: "Bangladeshi Bengali female, clear Dhaka accent", tags: ["bengali","bangladeshi","female","free"] },

  // ── CHINESE / EAST ASIAN ──
  { id: "cn_wei", name: "Wei", category: "premium", gender: "male", accent: "Mandarin", language: "Mandarin", description: "Beijing Mandarin male, CCTV-style delivery", tags: ["mandarin","chinese","male","premium"] },
  { id: "cn_mei", name: "Mei", category: "free", gender: "female", accent: "Mandarin", language: "Mandarin", description: "Mandarin Chinese female, Shanghai accent", tags: ["mandarin","chinese","female","free"] },
  { id: "hk_alan", name: "Alan", category: "premium", gender: "male", accent: "Cantonese", language: "Cantonese", description: "Hong Kong Cantonese male presenter", tags: ["cantonese","hongkong","male","premium"] },
  { id: "jp_kenji", name: "Kenji", category: "premium", gender: "male", accent: "Japanese", language: "Japanese", description: "Japanese male, NHK broadcast quality", tags: ["japanese","male","premium"] },
  { id: "jp_yuki", name: "Yuki", category: "free", gender: "female", accent: "Japanese", language: "Japanese", description: "Japanese female, gentle and clear narrator", tags: ["japanese","female","free"] },
  { id: "kr_minho", name: "Minho", category: "premium", gender: "male", accent: "Korean", language: "Korean", description: "Korean male, K-drama narrator quality", tags: ["korean","male","premium"] },
  { id: "kr_jiyeon", name: "Jiyeon", category: "free", gender: "female", accent: "Korean", language: "Korean", description: "Korean female, clear Seoul accent", tags: ["korean","female","free"] },
  { id: "vn_hung", name: "Hùng", category: "premium", gender: "male", accent: "Vietnamese", language: "Vietnamese", description: "Vietnamese male presenter, Hanoi standard accent", tags: ["vietnamese","male","premium"] },

  // ── EUROPEAN ──
  { id: "it_marco", name: "Marco", category: "premium", gender: "male", accent: "Italian", language: "Italian", description: "Italian male, RAI broadcast quality", tags: ["italian","male","premium"] },
  { id: "it_giulia", name: "Giulia", category: "free", gender: "female", accent: "Italian", language: "Italian", description: "Italian female narrator, warm Milan accent", tags: ["italian","female","free"] },
  { id: "ru_dmitri", name: "Dmitri", category: "premium", gender: "male", accent: "Russian", language: "Russian", description: "Russian male, formal documentary voice", tags: ["russian","male","premium"] },
  { id: "ru_natasha", name: "Natasha", category: "free", gender: "female", accent: "Russian", language: "Russian", description: "Russian female, clear Moscow accent narrator", tags: ["russian","female","free"] },
  { id: "nl_jan", name: "Jan", category: "premium", gender: "male", accent: "Dutch", language: "Dutch", description: "Dutch male professional narrator", tags: ["dutch","male","premium"] },
  { id: "tr_mehmet", name: "Mehmet", category: "premium", gender: "male", accent: "Turkish", language: "Turkish", description: "Turkish male, TRT broadcast quality", tags: ["turkish","male","premium"] },
  { id: "pl_anna", name: "Anna", category: "free", gender: "female", accent: "Polish", language: "Polish", description: "Polish female narrator, Warsaw accent", tags: ["polish","female","free"] },
  { id: "se_erik", name: "Erik", category: "premium", gender: "male", accent: "Swedish", language: "Swedish", description: "Swedish male, calm Scandinavian narrator", tags: ["swedish","male","premium"] },
  { id: "no_ingrid", name: "Ingrid", category: "free", gender: "female", accent: "Norwegian", language: "Norwegian", description: "Norwegian female, Oslo accent presenter", tags: ["norwegian","female","free"] },
  { id: "gr_nikos", name: "Nikos", category: "premium", gender: "male", accent: "Greek", language: "Greek", description: "Greek male, Athens-accented professional narrator", tags: ["greek","male","premium"] },

  // ── SPECIAL STUDIO ──
  { id: "st_narrator_m", name: "Studio Narrator M", category: "premium", gender: "male", accent: "Neutral", language: "English", description: "Gender-neutral baritone for long-form narration", tags: ["neutral","male","premium","studio","narrator"] },
  { id: "st_narrator_f", name: "Studio Narrator F", category: "premium", gender: "female", accent: "Neutral", language: "English", description: "Crisp neutral female for documentaries & e-learning", tags: ["neutral","female","premium","studio","narrator"] },
  { id: "st_announcer", name: "The Announcer", category: "premium", gender: "male", accent: "American", language: "English", description: "Big event announcer, stadium-ready baritone", tags: ["american","male","premium","announcer","event"] },
  { id: "st_whisper_f", name: "Whisper (Feminine)", category: "premium", gender: "female", accent: "Neutral", language: "English", description: "Intimate ASMR whisper voice, meditation apps", tags: ["female","premium","asmr","whisper"] },
  { id: "st_child_m", name: "Cody (Child)", category: "premium", gender: "male", accent: "American", language: "English", description: "Child male voice for educational animation", tags: ["child","male","premium","animation"] },
  { id: "st_elder_ng", name: "Elder Samuel", category: "premium", gender: "male", accent: "Nigerian", language: "English", description: "Elderly wise Nigerian male, storytelling & proverbs", tags: ["nigerian","male","premium","elder","storytelling"] },
];

// POST /api/seed/voices — seeds 80+ voices (run once on deploy)
router.post("/voices", async (_req, res) => {
  try {
    await db.execute(sql`DELETE FROM voices WHERE is_cloned = false`);
    for (const v of VOICES) {
      await db.insert(voicesTable).values({
        id: v.id,
        name: v.name,
        category: v.category,
        gender: v.gender,
        accent: v.accent,
        language: v.language,
        description: v.description,
        tags: v.tags,
        isCloned: false,
        previewUrl: null,
      }).onConflictDoNothing();
    }
    res.json({ success: true, count: VOICES.length, message: `Seeded ${VOICES.length} voices` });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Seed failed" });
  }
});

export default router;
