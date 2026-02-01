const baseUrl = process.env.API_BASE_URL || "http://localhost:3001";

async function request(path, options) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : undefined;
  if (!res.ok) {
    throw new Error(`${res.status} ${path}: ${text}`);
  }
  return json;
}

async function main() {
  await request("/health", { method: "GET" });

  const teamA = await request("/api/teams", {
    method: "POST",
    body: JSON.stringify({ name: "Time A", externalId: "team-a" }),
  });
  const teamB = await request("/api/teams", {
    method: "POST",
    body: JSON.stringify({ name: "Time B", externalId: "team-b" }),
  });

  const champ = await request("/api/championships", {
    method: "POST",
    body: JSON.stringify({ name: "Campeonato X", externalId: "champ-x" }),
  });

  const game = await request("/api/games", {
    method: "POST",
    body: JSON.stringify({
      externalId: "game-1",
      championshipId: champ.id,
      kickoffAt: new Date().toISOString(),
      status: "scheduled",
      homeTeamId: teamA.id,
      awayTeamId: teamB.id,
    }),
  });

  await request("/api/markets", {
    method: "POST",
    body: JSON.stringify({
      externalId: "mkt-1",
      gameId: game.id,
      marketType: "1x2",
      selection: "home",
      odds: 2.1,
      provider: "demo",
      raw: { source: "smoke-test" },
    }),
  });

  await request("/api/markets/processed", {
    method: "POST",
    body: JSON.stringify({
      items: [
        {
          externalId: "mkt-1",
          gameId: game.id,
          marketType: "1x2",
          selection: "home",
          odds: 2.1,
          provider: "demo",
          raw: { processed: true },
        },
      ],
    }),
  });

  await request("/api/markets/profitable", {
    method: "POST",
    body: JSON.stringify([
      {
        externalId: "mkt-1",
        gameId: game.id,
        marketType: "1x2",
        selection: "home",
        odds: 2.1,
        provider: "demo",
        profitScore: 0.42,
      },
    ]),
  });

  const profitable = await request("/api/markets?profitable=true", { method: "GET" });
  if (!Array.isArray(profitable) || profitable.length === 0) {
    throw new Error("Expected profitable markets");
  }
}

main()
  .then(() => {
    process.stdout.write("OK\n");
  })
  .catch((err) => {
    process.stderr.write(`${err.stack || err.message}\n`);
    process.exit(1);
  });

