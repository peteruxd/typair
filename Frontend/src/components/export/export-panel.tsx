"use client";

import { useMemo, useState } from "react";
import { useScale } from "@/hooks/use-scale";
import { useWorkspace } from "@/lib/state";
import { generateCode } from "@/lib/export";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const FORMATS = [
  { id: "css", label: "CSS" },
  { id: "tailwind-v3", label: "Tailwind v3" },
  { id: "tailwind-v4", label: "Tailwind v4" },
  { id: "json", label: "JSON" },
] as const;

export function ExportPanel() {
  const [format, setFormat] = useState<"css" | "tailwind-v3" | "tailwind-v4" | "json">("css");
  const { steps } = useScale();
  const { state } = useWorkspace();

  const code = useMemo(
    () => generateCode(format, steps, state.fonts),
    [format, steps, state.fonts],
  );

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Copied!");
  };

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">Export</span>
      </div>

      <div className="flex gap-1">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className={`rounded-md px-2.5 py-1.5 text-[11px] transition-colors ${
              format === f.id ? "bg-[#10b981] text-white" : "bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative mt-2">
        <pre className="overflow-x-auto rounded-md bg-[#0f172a] p-3 text-[11px] leading-relaxed text-[#f8fafc]">
          <code>{code}</code>
        </pre>
        <button
          onClick={copy}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-[#1e293b] text-[#94a3b8] transition-colors hover:bg-[#334155] hover:text-[#f8fafc]"
          title="Copy to clipboard"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}
