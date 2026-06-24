"use client";

import { useWorkspace } from "@/lib/state";

export function useViewport() {
  const { state, dispatch } = useWorkspace();
  const { viewport, desktopScale, mobileScale, stepsUp, stepsDown } = state;

  const viewportWidth = viewport.mode === "mobile" ? 375 : viewport.mode === "desktop" ? 1200 : undefined;

  return {
    mode: viewport.mode,
    sync: viewport.sync,
    desktopScale,
    mobileScale,
    stepsUp,
    stepsDown,
    viewportWidth,
    setMode: (v: typeof viewport.mode) => dispatch({ type: "SET_VIEWPORT_MODE", value: v }),
    toggleSync: () => dispatch({ type: "TOGGLE_SYNC" }),
  };
}
