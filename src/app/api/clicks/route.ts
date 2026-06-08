import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });

    await env.DB.prepare(
      "CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)"
    ).run();
    await env.DB.prepare("INSERT OR IGNORE INTO clicks (id, count) VALUES (1, 0)").run();

    const result = await env.DB.prepare(
      "SELECT count FROM clicks WHERE id = 1"
    ).first<{ count: number }>();

    return Response.json({ count: result?.count ?? 0 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST() {
  try {
    const { env } = await getCloudflareContext({ async: true });

    await env.DB.prepare(
      "CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)"
    ).run();
    await env.DB.prepare("INSERT OR IGNORE INTO clicks (id, count) VALUES (1, 0)").run();
    await env.DB.prepare("UPDATE clicks SET count = count + 1 WHERE id = 1").run();

    const result = await env.DB.prepare(
      "SELECT count FROM clicks WHERE id = 1"
    ).first<{ count: number }>();

    return Response.json({ count: result?.count ?? 0 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
