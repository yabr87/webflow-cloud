import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

export async function GET() {
  const { env } = await getCloudflareContext({ async: true });
  const result = await env.DB.prepare("SELECT count FROM clicks WHERE id = 1").first<{ count: number }>();
  return Response.json({ count: result?.count ?? 0 });
}

export async function POST() {
  const { env } = await getCloudflareContext({ async: true });
  await env.DB.prepare("UPDATE clicks SET count = count + 1 WHERE id = 1").run();
  const result = await env.DB.prepare("SELECT count FROM clicks WHERE id = 1").first<{ count: number }>();
  return Response.json({ count: result?.count ?? 0 });
}
