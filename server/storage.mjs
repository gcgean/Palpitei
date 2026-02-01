import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "./data");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

function collectionPath(collectionName) {
  return path.join(dataDir, `${collectionName}.json`);
}

export async function readCollection(collectionName) {
  await ensureDataDir();
  const filePath = collectionPath(collectionName);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err && err.code === "ENOENT") return [];
    throw err;
  }
}

export async function writeCollection(collectionName, items) {
  await ensureDataDir();
  const filePath = collectionPath(collectionName);
  const tmpPath = `${filePath}.tmp`;
  const payload = JSON.stringify(items, null, 2);
  await fs.writeFile(tmpPath, payload, "utf8");
  await fs.rename(tmpPath, filePath);
}

export async function upsertMany(collectionName, items, getKey) {
  const existing = await readCollection(collectionName);
  const byKey = new Map(existing.map((item) => [getKey(item), item]));

  for (const item of items) {
    byKey.set(getKey(item), item);
  }

  const merged = Array.from(byKey.values());
  await writeCollection(collectionName, merged);
  return merged;
}

export async function deleteById(collectionName, id) {
  const existing = await readCollection(collectionName);
  const next = existing.filter((x) => x.id !== id);
  await writeCollection(collectionName, next);
  return next.length !== existing.length;
}

