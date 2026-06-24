"use client";

import { useEffect, useRef } from "react";
import { useWorkspace, initialState, type WorkspaceState } from "@/lib/state";
import { serializeState, deserializeState } from "@/lib/url";

export function useUrlSync() {
  const { state, dispatch } = useWorkspace();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = deserializeState(window.location.search);
    if (saved) {
      const defaults = initialState as unknown as Record<string, unknown>;
      (Object.entries(saved) as [keyof WorkspaceState, unknown][]).forEach(([key, value]) => {
        if (JSON.stringify(value) !== JSON.stringify(defaults[key])) {
          if (key === "stepsUp") {
            dispatch({ type: "SET_STEPS_UP", value: value as number });
          } else if (key === "stepsDown") {
            dispatch({ type: "SET_STEPS_DOWN", value: value as number });
          } else if (key === "desktopScale") {
            dispatch({ type: "SET_DESKTOP_BASE", value: (value as typeof initialState.desktopScale).baseSize });
            dispatch({ type: "SET_DESKTOP_RATIO", value: (value as typeof initialState.desktopScale).ratio });
          } else if (key === "mobileScale") {
            dispatch({ type: "SET_MOBILE_BASE", value: (value as typeof initialState.mobileScale).baseSize });
            dispatch({ type: "SET_MOBILE_RATIO", value: (value as typeof initialState.mobileScale).ratio });
          } else if (key === "fonts") {
            const f = value as typeof initialState.fonts;
            dispatch({ type: "SET_FONTS", value: { header: f.header, body: f.body } });
            if (f.headerLocked) dispatch({ type: "TOGGLE_HEADER_LOCK" });
            if (f.bodyLocked) dispatch({ type: "TOGGLE_BODY_LOCK" });
            dispatch({ type: "SET_HEADER_WEIGHT", value: f.headerWeight });
            dispatch({ type: "SET_BODY_WEIGHT", value: f.bodyWeight });
          } else if (key === "viewport") {
            const v = value as typeof initialState.viewport;
            dispatch({ type: "SET_VIEWPORT_MODE", value: v.mode });
            if (v.sync !== initialState.viewport.sync) dispatch({ type: "TOGGLE_SYNC" });
          } else if (key === "preview") {
            const p = value as typeof initialState.preview;
            dispatch({ type: "SET_PREVIEW_MODE", value: p.mode });
          } else if (key === "theme") {
            dispatch({ type: "SET_THEME", value: value as "light" | "dark" });
          }
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!initialized.current) return;
    const timer = setTimeout(() => {
      const params = serializeState(state);
      const url = new URL(window.location.href);
      url.search = params;
      window.history.replaceState({}, "", url.toString());
    }, 500);
    return () => clearTimeout(timer);
  }, [state]);
}
