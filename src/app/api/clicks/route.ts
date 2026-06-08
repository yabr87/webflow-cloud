export const runtime = "edge";

let localCount = 0;

async function getDB() {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    return env.DB ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const db = await getDB();

    if (!db) {
      return Response.json({ count: localCount, local: true });
    }

    await db.prepare(
      "CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY DEFAULT 1, count INTEGER NOT NULL DEFAULT 0)"
    ).run();
    await db.prepare("INSERT OR IGNORE INTO clicks (id, count) VALUES (1, 0)").run();

    const result = await db.prepare("SELECT count FROM clicks WHERE id = 1").first<{ count: number }>();
    return Response.json({ count: result?.count ?? 0 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = await getDB();

    if (!db) {
      localCount++;
      return Response.json({ count: localCount, local: true });
    }

    await db.prepare(
      "CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY DEFAULT 1, count INTEGER NOT NULL DEFAULT 0)"
    ).run();
    await db.prepare("INSERT OR IGNORE INTO clicks (id, count) VALUES (1, 0)").run();
    await db.prepare("UPDATE clicks SET count = count + 1 WHERE id = 1").run();

    const result = await db.prepare("SELECT count FROM clicks WHERE id = 1").first<{ count: number }>();
    return Response.json({ count: result?.count ?? 0 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
