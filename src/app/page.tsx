import { ClickCounter } from "@/components/ClickCounter";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <p className="text-sm font-mono text-emerald-400 tracking-widest uppercase">
            Webflow Cloud
          </p>
          <h1 className="text-5xl font-bold tracking-tight">
            Next.js Test Page
          </h1>
          <p className="text-slate-400 text-lg">
            Deployed on Webflow Cloud infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Card title="Server Component" description="Rendered on the server with Next.js App Router" status="ok" />
          <Card title="Tailwind CSS" description="Styling works correctly" status="ok" />
          <Card title="TypeScript" description="Type checking enabled" status="ok" />
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-left space-y-3">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Environment</p>
          <div className="space-y-1 font-mono text-sm">
            <Row label="Framework" value="Next.js 15" />
            <Row label="Runtime" value="Node.js" />
            <Row label="Render" value="Server Component" />
            <Row label="Build" value={process.env.NODE_ENV ?? "unknown"} />
          </div>
        </div>

        <ClickCounter />

        <p className="text-slate-600 text-xs font-mono">
          {new Date().toISOString()}
        </p>
      </div>
    </main>
  );
}

function Card({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: "ok" | "error";
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-left space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        <span
          className={`w-2 h-2 rounded-full ${
            status === "ok" ? "bg-emerald-400" : "bg-red-400"
          }`}
        />
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="text-emerald-400">{value}</span>
    </div>
  );
}
