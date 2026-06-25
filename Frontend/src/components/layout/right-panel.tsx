"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useViewport } from "@/hooks/use-viewport";
import { PreviewCanvas } from "@/components/preview/preview-canvas";
import { useWorkspace } from "@/lib/state";

export function RightPanel() {
  const { viewportWidth, mode, setMode } = useViewport();
  const { state, dispatch } = useWorkspace();

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-[#0f172a]">
      <div className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-2 dark:border-[#334155]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", value: "layout" })}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              state.preview.mode === "layout"
                ? "text-[#0f172a] font-semibold dark:text-[#f8fafc]"
                : "text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
            }`}
          >
            Full Layout
          </button>
          <button
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", value: "waterfall" })}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              state.preview.mode === "waterfall"
                ? "text-[#0f172a] font-semibold dark:text-[#f8fafc]"
                : "text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
            }`}
          >
            Hierarchy Waterfall
          </button>
          <button
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", value: "code" })}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              state.preview.mode === "code"
                ? "text-[#0f172a] font-semibold dark:text-[#f8fafc]"
                : "text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
            }`}
          >
            Code
          </button>
        </div>
        <span className="font-mono text-[11px] text-[#64748b]">
          {viewportWidth ? `${viewportWidth}px` : "Fluid"}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode("desktop")}
            aria-label="Desktop viewport"
            className={`rounded-md p-1.5 transition-colors ${
              mode === "desktop"
                ? "bg-[#10b981] text-white"
                : "text-[#64748b] hover:bg-[#e2e8f0] dark:hover:bg-[#334155]"
            }`}
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMode("mobile")}
            aria-label="Mobile viewport"
            className={`rounded-md p-1.5 transition-colors ${
              mode === "mobile"
                ? "bg-[#10b981] text-white"
                : "text-[#64748b] hover:bg-[#e2e8f0] dark:hover:bg-[#334155]"
            }`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={state.preview.mode !== "code" && viewportWidth ? { maxWidth: viewportWidth, margin: "0 auto", width: "100%" } : undefined}
      >
        <PreviewCanvas />
      </div>
    </main>
  );
}
