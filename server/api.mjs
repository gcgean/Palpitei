import http from "node:http";
import { randomUUID } from "node:crypto";
import { readCollection, writeCollection, deleteById } from "./storage.mjs";
import {
  TeamInputSchema,
  ChampionshipInputSchema,
  GameInputSchema,
  MarketInputSchema,
  IngestInputSchema,
} from "./schemas.mjs";

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

function noContent(res, statusCode = 204) {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end();
}

async function readJsonBody(req) {
  const contentType = (req.headers["content-type"] || "").toLowerCase();
  if (!contentType.includes("application/json")) return undefined;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return undefined;
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return undefined;
  return JSON.parse(raw);
}

function nowIso() {
  return new Date().toISOString();
}

function parseUrl(req) {
  const url = new URL(req.url || "/", "http://localhost");
  return { pathname: url.pathname, searchParams: url.searchParams };
}

function matchPath(pathname, template) {
  const pathParts = pathname.split("/").filter(Boolean);
  const tplParts = template.split("/").filter(Boolean);
  if (pathParts.length !== tplParts.length) return null;

  const params = {};
  for (let i = 0; i < tplParts.length; i++) {
    const t = tplParts[i];
    const p = pathParts[i];
    if (t.startsWith(":")) params[t.slice(1)] = decodeURIComponent(p);
    else if (t !== p) return null;
  }
  return params;
}

function findById(items, id) {
  return items.find((x) => x.id === id);
}

function upsertByExternalOrId(existing, incoming) {
  const byExternalId = new Map(
    existing
      .filter((x) => x.externalId)
      .map((x) => [String(x.externalId), x])
  );

  const byId = new Map(existing.map((x) => [x.id, x]));

  const upserted = [];
  for (const item of incoming) {
    const candidate =
      (item.externalId && byExternalId.get(String(item.externalId))) ||
      (item.id && byId.get(item.id));
    if (candidate) {
      upserted.push({
        ...candidate,
        ...item,
        id: candidate.id,
        updatedAt: nowIso(),
      });
    } else {
      upserted.push({
        ...item,
        id: item.id ?? randomUUID(),
        createdAt: nowIso(),
        updatedAt: nowIso(),
      });
    }
  }

  const merged = [...existing];
  const replaceIndexById = new Map(merged.map((x, i) => [x.id, i]));
  for (const item of upserted) {
    const idx = replaceIndexById.get(item.id);
    if (idx !== undefined) merged[idx] = item;
    else merged.push(item);
  }
  return { merged, upserted };
}

async function handleTeams(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/teams") {
    const items = await readCollection("teams");
    return json(res, 200, items);
  }

  if (req.method === "POST" && pathname === "/api/teams") {
    const body = await readJsonBody(req);
    const parsed = TeamInputSchema.safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const existing = await readCollection("teams");
    const { merged, upserted } = upsertByExternalOrId(existing, [parsed.data]);
    await writeCollection("teams", merged);
    return json(res, 201, upserted[0]);
  }

  const mGet = matchPath(pathname, "/api/teams/:id");
  if (req.method === "GET" && mGet) {
    const items = await readCollection("teams");
    const found = findById(items, mGet.id);
    if (!found) return json(res, 404, { error: "TEAM_NOT_FOUND" });
    return json(res, 200, found);
  }

  const mPut = matchPath(pathname, "/api/teams/:id");
  if ((req.method === "PUT" || req.method === "PATCH") && mPut) {
    const body = await readJsonBody(req);
    const parsed = TeamInputSchema.partial().safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const items = await readCollection("teams");
    const found = findById(items, mPut.id);
    if (!found) return json(res, 404, { error: "TEAM_NOT_FOUND" });

    const updated = { ...found, ...parsed.data, id: found.id, updatedAt: nowIso() };
    const next = items.map((x) => (x.id === found.id ? updated : x));
    await writeCollection("teams", next);
    return json(res, 200, updated);
  }

  const mDel = matchPath(pathname, "/api/teams/:id");
  if (req.method === "DELETE" && mDel) {
    const deleted = await deleteById("teams", mDel.id);
    if (!deleted) return json(res, 404, { error: "TEAM_NOT_FOUND" });
    return noContent(res, 204);
  }

  return false;
}

async function handleChampionships(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/championships") {
    const items = await readCollection("championships");
    return json(res, 200, items);
  }

  if (req.method === "POST" && pathname === "/api/championships") {
    const body = await readJsonBody(req);
    const parsed = ChampionshipInputSchema.safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const existing = await readCollection("championships");
    const { merged, upserted } = upsertByExternalOrId(existing, [parsed.data]);
    await writeCollection("championships", merged);
    return json(res, 201, upserted[0]);
  }

  const mGet = matchPath(pathname, "/api/championships/:id");
  if (req.method === "GET" && mGet) {
    const items = await readCollection("championships");
    const found = findById(items, mGet.id);
    if (!found) return json(res, 404, { error: "CHAMPIONSHIP_NOT_FOUND" });
    return json(res, 200, found);
  }

  const mPut = matchPath(pathname, "/api/championships/:id");
  if ((req.method === "PUT" || req.method === "PATCH") && mPut) {
    const body = await readJsonBody(req);
    const parsed = ChampionshipInputSchema.partial().safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const items = await readCollection("championships");
    const found = findById(items, mPut.id);
    if (!found) return json(res, 404, { error: "CHAMPIONSHIP_NOT_FOUND" });

    const updated = { ...found, ...parsed.data, id: found.id, updatedAt: nowIso() };
    const next = items.map((x) => (x.id === found.id ? updated : x));
    await writeCollection("championships", next);
    return json(res, 200, updated);
  }

  const mDel = matchPath(pathname, "/api/championships/:id");
  if (req.method === "DELETE" && mDel) {
    const deleted = await deleteById("championships", mDel.id);
    if (!deleted) return json(res, 404, { error: "CHAMPIONSHIP_NOT_FOUND" });
    return noContent(res, 204);
  }

  return false;
}

async function handleGames(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/games") {
    const items = await readCollection("games");
    return json(res, 200, items);
  }

  if (req.method === "POST" && pathname === "/api/games") {
    const body = await readJsonBody(req);
    const parsed = GameInputSchema.safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const existing = await readCollection("games");
    const { merged, upserted } = upsertByExternalOrId(existing, [parsed.data]);
    await writeCollection("games", merged);
    return json(res, 201, upserted[0]);
  }

  const mGet = matchPath(pathname, "/api/games/:id");
  if (req.method === "GET" && mGet) {
    const items = await readCollection("games");
    const found = findById(items, mGet.id);
    if (!found) return json(res, 404, { error: "GAME_NOT_FOUND" });
    return json(res, 200, found);
  }

  const mPut = matchPath(pathname, "/api/games/:id");
  if ((req.method === "PUT" || req.method === "PATCH") && mPut) {
    const body = await readJsonBody(req);
    const parsed = GameInputSchema.partial().safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const items = await readCollection("games");
    const found = findById(items, mPut.id);
    if (!found) return json(res, 404, { error: "GAME_NOT_FOUND" });

    const updated = { ...found, ...parsed.data, id: found.id, updatedAt: nowIso() };
    const next = items.map((x) => (x.id === found.id ? updated : x));
    await writeCollection("games", next);
    return json(res, 200, updated);
  }

  const mDel = matchPath(pathname, "/api/games/:id");
  if (req.method === "DELETE" && mDel) {
    const deleted = await deleteById("games", mDel.id);
    if (!deleted) return json(res, 404, { error: "GAME_NOT_FOUND" });
    return noContent(res, 204);
  }

  return false;
}

function normalizeBool(value) {
  if (value === null) return undefined;
  const v = String(value).toLowerCase();
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return undefined;
}

async function handleMarkets(req, res, pathname, searchParams) {
  if (req.method === "GET" && pathname === "/api/markets") {
    const items = await readCollection("markets");
    const gameId = searchParams.get("gameId");
    const provider = searchParams.get("provider");
    const marketType = searchParams.get("marketType");
    const isProcessed = normalizeBool(searchParams.get("processed"));
    const isProfitable = normalizeBool(searchParams.get("profitable"));

    const filtered = items.filter((m) => {
      if (gameId && m.gameId !== gameId) return false;
      if (provider && m.provider !== provider) return false;
      if (marketType && m.marketType !== marketType) return false;
      if (isProcessed !== undefined && Boolean(m.isProcessed) !== isProcessed) return false;
      if (isProfitable !== undefined && Boolean(m.isProfitable) !== isProfitable) return false;
      return true;
    });

    return json(res, 200, filtered);
  }

  if (req.method === "POST" && pathname === "/api/markets") {
    const body = await readJsonBody(req);
    const parsed = MarketInputSchema.safeParse(body);
    if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

    const existing = await readCollection("markets");
    const normalized = {
      ...parsed.data,
      isProcessed: Boolean(parsed.data.isProcessed),
      isProfitable: Boolean(parsed.data.isProfitable),
    };
    const { merged, upserted } = upsertByExternalOrId(existing, [normalized]);
    await writeCollection("markets", merged);
    return json(res, 201, upserted[0]);
  }

  if (req.method === "POST" && pathname === "/api/markets/processed") {
    const body = await readJsonBody(req);
    const items = Array.isArray(body) ? body : body?.items;
    if (!Array.isArray(items)) return json(res, 400, { error: "INVALID_BODY" });

    const parsed = items.map((x) => MarketInputSchema.safeParse(x));
    const invalid = parsed.find((p) => !p.success);
    if (invalid && !invalid.success) return json(res, 400, { error: invalid.error.flatten() });

    const existing = await readCollection("markets");
    const incoming = parsed
      .filter((p) => p.success)
      .map((p) => ({ ...p.data, isProcessed: true, processedAt: nowIso() }));
    const { merged, upserted } = upsertByExternalOrId(existing, incoming);
    await writeCollection("markets", merged);
    return json(res, 200, { count: upserted.length });
  }

  if (req.method === "POST" && pathname === "/api/markets/profitable") {
    const body = await readJsonBody(req);
    const items = Array.isArray(body) ? body : body?.items;
    if (!Array.isArray(items)) return json(res, 400, { error: "INVALID_BODY" });

    const parsed = items.map((x) => MarketInputSchema.safeParse(x));
    const invalid = parsed.find((p) => !p.success);
    if (invalid && !invalid.success) return json(res, 400, { error: invalid.error.flatten() });

    const existing = await readCollection("markets");
    const incoming = parsed
      .filter((p) => p.success)
      .map((p) => ({ ...p.data, isProfitable: true, profitableAt: nowIso() }));
    const { merged, upserted } = upsertByExternalOrId(existing, incoming);
    await writeCollection("markets", merged);
    return json(res, 200, { count: upserted.length });
  }

  const mGet = matchPath(pathname, "/api/markets/:id");
  if (req.method === "GET" && mGet) {
    const items = await readCollection("markets");
    const found = findById(items, mGet.id);
    if (!found) return json(res, 404, { error: "MARKET_NOT_FOUND" });
    return json(res, 200, found);
  }

  const mDel = matchPath(pathname, "/api/markets/:id");
  if (req.method === "DELETE" && mDel) {
    const deleted = await deleteById("markets", mDel.id);
    if (!deleted) return json(res, 404, { error: "MARKET_NOT_FOUND" });
    return noContent(res, 204);
  }

  return false;
}

async function handleIngest(req, res, pathname) {
  if (req.method !== "POST" || pathname !== "/api/ingest") return false;

  const body = await readJsonBody(req);
  const parsed = IngestInputSchema.safeParse(body);
  if (!parsed.success) return json(res, 400, { error: parsed.error.flatten() });

  const payload = parsed.data;

  let teamsUpserted = 0;
  let championshipsUpserted = 0;
  let gamesUpserted = 0;
  let marketsUpserted = 0;

  if (payload.teams?.length) {
    const existing = await readCollection("teams");
    const { merged, upserted } = upsertByExternalOrId(existing, payload.teams);
    await writeCollection("teams", merged);
    teamsUpserted = upserted.length;
  }

  if (payload.championships?.length) {
    const existing = await readCollection("championships");
    const { merged, upserted } = upsertByExternalOrId(existing, payload.championships);
    await writeCollection("championships", merged);
    championshipsUpserted = upserted.length;
  }

  if (payload.games?.length) {
    const existing = await readCollection("games");
    const { merged, upserted } = upsertByExternalOrId(existing, payload.games);
    await writeCollection("games", merged);
    gamesUpserted = upserted.length;
  }

  if (payload.markets?.length) {
    const existing = await readCollection("markets");
    const normalized = payload.markets.map((m) => ({
      ...m,
      isProcessed: Boolean(m.isProcessed),
      isProfitable: Boolean(m.isProfitable),
    }));
    const { merged, upserted } = upsertByExternalOrId(existing, normalized);
    await writeCollection("markets", merged);
    marketsUpserted = upserted.length;
  }

  return json(res, 200, {
    teamsUpserted,
    championshipsUpserted,
    gamesUpserted,
    marketsUpserted,
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return noContent(res, 204);

  try {
    const { pathname, searchParams } = parseUrl(req);

    if (req.method === "GET" && pathname === "/health") {
      return json(res, 200, { ok: true, now: nowIso() });
    }

    if (await handleIngest(req, res, pathname)) return;
    if (await handleTeams(req, res, pathname)) return;
    if (await handleChampionships(req, res, pathname)) return;
    if (await handleGames(req, res, pathname)) return;
    if (await handleMarkets(req, res, pathname, searchParams)) return;

    return json(res, 404, { error: "NOT_FOUND" });
  } catch (err) {
    if (res.headersSent || res.writableEnded) return;
    return json(res, 500, { error: "INTERNAL_SERVER_ERROR" });
  }
});

const port = Number(process.env.PORT || 3001);
server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
