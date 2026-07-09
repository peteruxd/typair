"use client";

import { useScale } from "@/hooks/use-scale";
import { useWorkspace } from "@/lib/state";

export function HierarchyWaterfall() {
  const { steps } = useScale();
  const { state } = useWorkspace();
  const { header, body, headerWeight, bodyWeight } = state.fonts;
  const isMobile = state.viewport.mode === "mobile";

  return (
    <div className={isMobile ? "p-4" : "p-6"}>
      <h2 className="mb-6 text-lg font-semibold text-[#0f172a] dark:text-[#f8fafc]">
        Type Scale Hierarchy
      </h2>

      <div className="space-y-1">
        {steps.map((s) => {
          const isHeader = s.step >= 1;
          const fontFamily = isHeader ? header : body;
          const fontWeight = isHeader ? headerWeight : bodyWeight;

          return (
            <div
              key={s.name}
              className={`flex items-center rounded-md transition-colors hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] ${
                isMobile ? "gap-2 px-2 py-1.5" : "gap-4 px-4 py-2"
              }`}
            >
              <div className={isMobile ? "w-14 shrink-0" : "w-20 shrink-0"}>
                <span className="font-mono text-[11px] text-[#64748b]">{s.name}</span>
              </div>
              <div className={isMobile ? "w-20 shrink-0" : "w-28 shrink-0"}>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  {s.px}px / {s.rem}rem
                </span>
              </div>
              <div className="flex-1 truncate" style={{ fontFamily: fontFamily ? `${fontFamily}, ${isHeader ? "serif" : "sans-serif"}` : undefined, fontSize: s.rem + "rem", fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing + "em" }}>
                {state.preview.customText || "The quick brown fox jumps over the lazy dog. Design your type system, ship in seconds."}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
