"use client";

import { useState, useEffect } from "react";

export function ClickCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/clicks")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(-1));
  }, []);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/clicks", { method: "POST" });
    const data = await res.json();
    setCount(data.count);
    setLoading(false);
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4 text-center">
      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
        Webflow Cloud SQLite
      </p>
      <p className="text-5xl font-bold text-emerald-400">
        {count === null ? "..." : count === -1 ? "err" : count}
      </p>
      <p className="text-sm text-slate-400">
        {count === -1 ? "помилка API" : "кліків збережено в D1"}
      </p>
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold rounded-full transition-colors"
      >
        {loading ? "..." : "Клікни мене"}
      </button>
    </div>
  );
}
