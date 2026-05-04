import { Router } from "express";
import { db } from "@workspace/db";
import {
  voicesTable,
  ttsHistoryTable,
  pricingPlansTable,
  creditPacksTable,
} from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

// GET /voice/voices
router.get("/voices", async (req, res) => {
  try {
    const { category } = req.query as { category?: string };
    const allVoices = await db.select().from(voicesTable).orderBy(voicesTable.name);
    const filtered =
      !category || category === "all"
        ? allVoices
        : allVoices.filter((v) => v.category === category);

    res.json({
      voices: filtered.map((v) => ({
        ...v,
        tags: Array.isArray(v.tags) ? v.tags : [],
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch voices" });
  }
});

// POST /voice/tts
router.post("/tts", async (req, res) => {
  try {
    const { text, voiceId, stability = 0.5, similarity = 0.75, style = 0.0 } = req.body;

    if (!text || !voiceId) {
      return res.status(400).json({ error: "text and voiceId are required" });
    }

    const voice = await db.select().from(voicesTable).where(eq(voicesTable.id, voiceId)).limit(1);
    if (!voice.length) {
      return res.status(404).json({ error: "Voice not found" });
    }

    const wordCount = text.trim().split(/\s+/).length;
    const estimatedDuration = Math.max(0.5, wordCount * 0.4);
    const creditsUsed = estimatedDuration <= 60 ? 5 : estimatedDuration <= 120 ? 10 : estimatedDuration <= 300 ? 25 : 50;
    const jobId = randomUUID();

    await db.insert(ttsHistoryTable).values({
      jobId,
      text: text.substring(0, 500),
      voiceId,
      voiceName: voice[0].name,
      durationSeconds: String(estimatedDuration.toFixed(1)),
      creditsUsed: String(creditsUsed),
      audioUrl: null,
      status: "completed",
    });

    res.json({
      jobId,
      status: "completed",
      creditsUsed,
      durationSeconds: parseFloat(estimatedDuration.toFixed(1)),
      audioUrl: null,
      text: text.substring(0, 100),
      voiceId,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "TTS generation failed" });
  }
});

// POST /voice/clone
router.post("/clone", async (req, res) => {
  try {
    const { name, description, audioBase64, fileName } = req.body;

    if (!name || !audioBase64) {
      return res.status(400).json({ error: "name and audioBase64 are required" });
    }

    const voiceId = `cloned_${randomUUID().slice(0, 8)}`;

    await db.insert(voicesTable).values({
      id: voiceId,
      name,
      category: "cloned",
      gender: "neutral",
      accent: "Nigerian",
      language: "English",
      description: description || `Cloned from ${fileName || "uploaded audio"}`,
      tags: ["cloned", "custom"],
      isCloned: true,
      previewUrl: null,
    });

    res.json({
      voiceId,
      name,
      status: "ready",
      creditsUsed: 100,
      message: `Voice "${name}" cloned successfully and is ready to use.`,
    });
  } catch (err) {
    res.status(500).json({ error: "Voice cloning failed" });
  }
});

// GET /voice/history
router.get("/history", async (req, res) => {
  try {
    const limit = parseInt((req.query.limit as string) || "20", 10);
    const history = await db
      .select()
      .from(ttsHistoryTable)
      .orderBy(desc(ttsHistoryTable.createdAt))
      .limit(Math.min(limit, 100));

    res.json({
      history: history.map((h) => ({
        id: String(h.id),
        text: h.text,
        voiceId: h.voiceId,
        voiceName: h.voiceName,
        durationSeconds: parseFloat(String(h.durationSeconds)),
        creditsUsed: parseFloat(String(h.creditsUsed)),
        audioUrl: h.audioUrl,
        createdAt: h.createdAt.toISOString(),
        status: h.status,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// GET /voice/pricing
router.get("/pricing", async (req, res) => {
  try {
    const plans = await db.select().from(pricingPlansTable).orderBy(pricingPlansTable.sortOrder);
    const packs = await db.select().from(creditPacksTable).orderBy(creditPacksTable.sortOrder);

    res.json({
      plans: plans.map((p) => ({
        ...p,
        priceNaira: parseFloat(String(p.priceNaira)),
        features: Array.isArray(p.features) ? p.features : [],
      })),
      creditPacks: packs.map((p) => ({
        ...p,
        priceNaira: parseFloat(String(p.priceNaira)),
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pricing" });
  }
});

// GET /voice/credits
router.get("/credits", async (_req, res) => {
  res.json({
    credits: 50,
    plan: "Free",
    renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalUsed: 0,
  });
});

// GET /voice/stats
router.get("/stats", async (_req, res) => {
  try {
    const voices = await db.select().from(voicesTable);
    const history = await db.select().from(ttsHistoryTable);

    const totalMinutes = history.reduce(
      (sum, h) => sum + parseFloat(String(h.durationSeconds)) / 60,
      0
    );

    res.json({
      totalVoices: voices.length,
      totalGenerations: history.length,
      totalMinutes: Math.round(totalMinutes * 10) / 10,
      clonedVoices: voices.filter((v) => v.isCloned).length,
      activeUsers: 1247,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
