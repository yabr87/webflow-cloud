import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
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
    const result = await env.DB.prepare(
      "UPDATE clicks SET count = count + 1 WHERE id = 1 RETURNING count"
    ).first<{ count: number }>();
    return Response.json({ count: result?.count ?? 0 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
