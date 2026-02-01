import { z } from "zod";

export const TeamInputSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1),
  shortName: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  badgeUrl: z.string().url().optional(),
});

export const ChampionshipInputSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1),
  country: z.string().min(1).optional(),
  season: z.string().min(1).optional(),
});

export const GameInputSchema = z.object({
  externalId: z.string().min(1).optional(),
  championshipId: z.string().min(1).optional(),
  kickoffAt: z.string().datetime().optional(),
  status: z.enum(["scheduled", "live", "finished", "canceled"]).optional(),
  homeTeamId: z.string().min(1),
  awayTeamId: z.string().min(1),
  homeScore: z.number().int().nonnegative().optional(),
  awayScore: z.number().int().nonnegative().optional(),
});

export const MarketInputSchema = z.object({
  externalId: z.string().min(1).optional(),
  gameId: z.string().min(1),
  provider: z.string().min(1).optional(),
  marketType: z.string().min(1),
  selection: z.string().min(1).optional(),
  odds: z.number().positive(),
  isProcessed: z.boolean().optional(),
  isProfitable: z.boolean().optional(),
  profitScore: z.number().optional(),
  raw: z.unknown().optional(),
});

export const IngestInputSchema = z.object({
  teams: z.array(TeamInputSchema).optional(),
  championships: z.array(ChampionshipInputSchema).optional(),
  games: z.array(GameInputSchema).optional(),
  markets: z.array(MarketInputSchema).optional(),
});

