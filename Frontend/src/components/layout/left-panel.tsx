"use client";

import { ScaleCalculator } from "@/components/controls/scale-calculator";
import { FontController } from "@/components/controls/font-controller";
import { ViewportConfig } from "@/components/controls/viewport-config";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UrlShare } from "@/components/shared/url-share";

export function LeftPanel() {
  return (
    <aside className="flex w-[300px] min-w-[300px] flex-col bg-[#0f172a] text-[#f8fafc]">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#10b981] text-[10px] font-bold text-white">
            TP
          </div>
          <span className="text-sm font-semibold tracking-tight">TyPair</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <UrlShare />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <ViewportConfig />
        <SectionDivider />
        <ScaleCalculator />
        <SectionDivider />
        <FontController />
      </div>
    </aside>
  );
}

function SectionDivider() {
  return <div className="my-4 h-px bg-[#1e293b]" />;
}
