"use client";

import { useCallback } from "react";
import { useWorkspace } from "@/lib/state";
import { getNextPairing } from "@/lib/pairings";

export function usePairings() {
  const { state, dispatch } = useWorkspace();
  const { header, body, headerLocked, bodyLocked } = state.fonts;

  const roll = useCallback(() => {
    const next = getNextPairing(header, body, headerLocked, bodyLocked);
    dispatch({ type: "SET_FONTS", value: next });
  }, [header, body, headerLocked, bodyLocked, dispatch]);

  return {
    header,
    body,
    headerLocked,
    bodyLocked,
    toggleHeaderLock: () => dispatch({ type: "TOGGLE_HEADER_LOCK" }),
    toggleBodyLock: () => dispatch({ type: "TOGGLE_BODY_LOCK" }),
    setHeader: (v: string | null) => dispatch({ type: "SET_HEADER_FONT", value: v }),
    setBody: (v: string | null) => dispatch({ type: "SET_BODY_FONT", value: v }),
    roll,
  };
}
