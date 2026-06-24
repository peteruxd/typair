"use client";

import { useViewport } from "@/hooks/use-viewport";
import { PreviewCanvas } from "@/components/preview/preview-canvas";
import { useWorkspace } from "@/lib/state";

export function RightPanel() {
  const { viewportWidth, mode, setMode } = useViewport();
  const { state, dispatch } = useWorkspace();

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-[#0f172a]">
      <div className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-2 dark:border-[#334155]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("desktop")}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              mode === "desktop"
                ? "bg-[#10b981] text-white"
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] dark:bg-[#1e293b] dark:hover:bg-[#334155]"
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setMode("mobile")}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              mode === "mobile"
                ? "bg-[#10b981] text-white"
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] dark:bg-[#1e293b] dark:hover:bg-[#334155]"
            }`}
          >
            Mobile
          </button>
        </div>
        <span className="font-mono text-[11px] text-[#64748b]">
          {viewportWidth ? `${viewportWidth}px` : "Fluid"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", value: "layout" })}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              state.preview.mode === "layout"
                ? "bg-[#0f172a] text-white dark:bg-[#f8fafc] dark:text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
            }`}
          >
            Full Layout
          </button>
          <button
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", value: "waterfall" })}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              state.preview.mode === "waterfall"
                ? "bg-[#0f172a] text-white dark:bg-[#f8fafc] dark:text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc]"
            }`}
          >
            Hierarchy Waterfall
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={viewportWidth ? { maxWidth: viewportWidth, margin: "0 auto", width: "100%" } : undefined}
      >
        <PreviewCanvas />
      </div>
    </main>
  );
}
