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
  const db = await getDB();

  if (!db) {
    return Response.json({ count: localCount, local: true });
  }

  const result = await db.prepare("SELECT count FROM clicks WHERE id = 1").first<{ count: number }>();
  return Response.json({ count: result?.count ?? 0 });
}

export async function POST() {
  const db = await getDB();

  if (!db) {
    localCount++;
    return Response.json({ count: localCount, local: true });
  }

  await db.prepare("UPDATE clicks SET count = count + 1 WHERE id = 1").run();
  const result = await db.prepare("SELECT count FROM clicks WHERE id = 1").first<{ count: number }>();
  return Response.json({ count: result?.count ?? 0 });
}
