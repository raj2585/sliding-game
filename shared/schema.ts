import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const puzzleImages = {
  mehrangarh: {
    id: "mehrangarh",
    name: "Mehrangarh Fort",
    path: "mehrangarh_fort_jodh_e91f273d.jpg",
  },
  blueCity: {
    id: "blueCity",
    name: "Blue City",
    path: "jodhpur_blue_city_ae_458ca24a.jpg",
  },
  ghantaGhar: {
    id: "ghantaGhar",
    name: "Ghanta Ghar",
    path: "ghanta_ghar_clock_to_35fa07b3.jpg",
  },
  umaidBhavan: {
    id: "umaidBhavan",
    name: "Umaid Bhavan Palace",
    path: "umaid_bhavan_palace__3cd5570e.jpg",
  },
  jaswantThada: {
    id: "jaswantThada",
    name: "Jaswant Thada",
    path: "jaswant_thada_white__a863f28a.jpg",
  },
  stepwell: {
    id: "stepwell",
    name: "Toorji Ka Jhalra",
    path: "toorji_ka_jhalra_ste_72c4e8ae.jpg",
  },
} as const;

export type PuzzleImageId = keyof typeof puzzleImages;

export const puzzleSizeSchema = z.enum(["4x4", "5x5"]);
export type PuzzleSize = z.infer<typeof puzzleSizeSchema>;

export interface PuzzleTile {
  id: number;
  position: number;
  correctPosition: number;
  isEmpty: boolean;
}

export interface GameState {
  tiles: PuzzleTile[];
  moves: number;
  startTime: number | null;
  isComplete: boolean;
  selectedImage: PuzzleImageId;
  puzzleSize: PuzzleSize;
}

export interface BestScore {
  time: number;
  moves: number;
  date: string;
}

export type BestScores = {
  [key in PuzzleSize]: {
    [key in PuzzleImageId]?: BestScore;
  };
};
