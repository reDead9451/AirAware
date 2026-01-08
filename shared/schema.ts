
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll use a simple user preferences table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  preferences: jsonb("preferences").$type<{
    sensitive: boolean;
    notifications: boolean;
    savedCities: string[];
  }>().default({ sensitive: false, notifications: false, savedCities: [] }),
});

export const insertUserSchema = createInsertSchema(users);
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Types for AQI Data (not in DB, just for API contract)
export const aqiDataSchema = z.object({
  aqi: z.number(),
  city: z.string(),
  pollutants: z.object({
    pm25: z.number(),
    pm10: z.number(),
    o3: z.number(),
    no2: z.number(),
  }),
  temperature: z.number(),
  humidity: z.number(),
  condition: z.string(),
  recommendation: z.string(),
  forecast: z.array(z.object({
    day: z.string(),
    aqi: z.number(),
  })),
});

export type AqiData = z.infer<typeof aqiDataSchema>;

export const chatRequestSchema = z.object({
  message: z.string(),
  context: z.any().optional(), // Can be AQI data or user profile
});

export const chatResponseSchema = z.object({
  response: z.string(),
});

export * from "./models/chat";
