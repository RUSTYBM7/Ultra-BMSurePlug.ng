import { pgTable, text, serial, numeric, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const voicesTable = pgTable("voices", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // free | premium | cloned
  gender: text("gender").notNull(), // male | female | neutral
  accent: text("accent").notNull(),
  language: text("language").notNull().default("English"),
  description: text("description").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  isCloned: boolean("is_cloned").notNull().default(false),
  previewUrl: text("preview_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ttsHistoryTable = pgTable("tts_history", {
  id: serial("id").primaryKey(),
  jobId: text("job_id").notNull().unique(),
  text: text("text").notNull(),
  voiceId: text("voice_id").notNull(),
  voiceName: text("voice_name").notNull(),
  durationSeconds: numeric("duration_seconds").notNull().default("0"),
  creditsUsed: numeric("credits_used").notNull().default("0"),
  audioUrl: text("audio_url"),
  status: text("status").notNull().default("completed"), // pending | processing | completed | failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pricingPlansTable = pgTable("pricing_plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  priceNaira: numeric("price_naira").notNull().default("0"),
  credits: integer("credits").notNull().default(0),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  isFree: boolean("is_free").notNull().default(false),
  isPopular: boolean("is_popular").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const creditPacksTable = pgTable("credit_packs", {
  id: text("id").primaryKey(),
  credits: integer("credits").notNull(),
  priceNaira: numeric("price_naira").notNull(),
  label: text("label").notNull(),
  durationLabel: text("duration_label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertVoiceSchema = createInsertSchema(voicesTable);
export const insertHistorySchema = createInsertSchema(ttsHistoryTable).omit({ id: true });
export const insertPlanSchema = createInsertSchema(pricingPlansTable);
export const insertCreditPackSchema = createInsertSchema(creditPacksTable);

export type Voice = typeof voicesTable.$inferSelect;
export type TtsHistory = typeof ttsHistoryTable.$inferSelect;
export type PricingPlan = typeof pricingPlansTable.$inferSelect;
export type CreditPack = typeof creditPacksTable.$inferSelect;
export type InsertVoice = z.infer<typeof insertVoiceSchema>;
export type InsertHistory = z.infer<typeof insertHistorySchema>;
