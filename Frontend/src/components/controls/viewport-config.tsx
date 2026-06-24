"use client";

import { useViewport } from "@/hooks/use-viewport";

export function ViewportConfig() {
  const { mode, sync, setMode, toggleSync } = useViewport();

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">Viewport</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => setMode("desktop")}
            className={`rounded-md px-3 py-1.5 text-[11px] transition-colors ${
              mode === "desktop" ? "bg-[#10b981] text-white" : "bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]"
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setMode("mobile")}
            className={`rounded-md px-3 py-1.5 text-[11px] transition-colors ${
              mode === "mobile" ? "bg-[#10b981] text-white" : "bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]"
            }`}
          >
            Mobile
          </button>
        </div>
        <button
          onClick={toggleSync}
          className={`rounded-md px-3 py-1.5 text-[11px] transition-colors ${
            sync ? "bg-[#10b981] text-white" : "bg-[#1e293b] text-[#94a3b8]"
          }`}
        >
          {sync ? "Sync On" : "Sync Off"}
        </button>
      </div>
    </section>
  );
}
