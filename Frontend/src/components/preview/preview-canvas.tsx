"use client";

import { useWorkspace } from "@/lib/state";
import { HierarchyWaterfall } from "@/components/preview/hierarchy-waterfall";
import { UiPreview } from "@/components/preview/ui-preview/ui-preview";
import { ExportPanel } from "@/components/export/export-panel";

export function PreviewCanvas() {
  const { state } = useWorkspace();

  if (state.preview.mode === "code") return <div className="p-6"><ExportPanel /></div>;
  if (state.preview.mode === "waterfall") return <HierarchyWaterfall />;
  return <UiPreview />;
}
