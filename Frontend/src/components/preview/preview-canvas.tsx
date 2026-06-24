"use client";

import { useWorkspace } from "@/lib/state";
import { HierarchyWaterfall } from "@/components/preview/hierarchy-waterfall";
import { UiPreview } from "@/components/preview/ui-preview/ui-preview";

export function PreviewCanvas() {
  const { state } = useWorkspace();

  return state.preview.mode === "waterfall" ? <HierarchyWaterfall /> : <UiPreview />;
}
