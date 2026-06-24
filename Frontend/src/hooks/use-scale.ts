"use client";

import { useMemo } from "react";
import { useWorkspace } from "@/lib/state";
import { computeScale, findIntervalName, INTERVALS } from "@/lib/scale";

export function useScale() {
  const { state, dispatch } = useWorkspace();
  const activeScale = state.viewport.mode === "desktop" ? state.desktopScale : state.mobileScale;
  const { baseSize, ratio } = activeScale;
  const { stepsUp, stepsDown, viewport } = state;

  const steps = useMemo(
    () => computeScale(baseSize, ratio, stepsUp, stepsDown),
    [baseSize, ratio, stepsUp, stepsDown],
  );

  const setBaseSize = (v: number) => {
    if (viewport.sync) {
      dispatch({ type: "SET_DESKTOP_BASE", value: v });
      dispatch({ type: "SET_MOBILE_BASE", value: v });
    } else if (viewport.mode === "desktop") {
      dispatch({ type: "SET_DESKTOP_BASE", value: v });
    } else {
      dispatch({ type: "SET_MOBILE_BASE", value: v });
    }
  };

  const setRatio = (v: number) => {
    if (viewport.sync) {
      dispatch({ type: "SET_DESKTOP_RATIO", value: v });
      dispatch({ type: "SET_MOBILE_RATIO", value: v });
    } else if (viewport.mode === "desktop") {
      dispatch({ type: "SET_DESKTOP_RATIO", value: v });
    } else {
      dispatch({ type: "SET_MOBILE_RATIO", value: v });
    }
  };

  return {
    baseSize,
    ratio,
    stepsUp,
    stepsDown,
    steps,
    intervalName: findIntervalName(ratio),
    availableIntervals: Object.entries(INTERVALS).map(([name, value]) => ({ name, value })),
    setBaseSize,
    setRatio,
    setStepsUp: (v: number) => dispatch({ type: "SET_STEPS_UP", value: v }),
    setStepsDown: (v: number) => dispatch({ type: "SET_STEPS_DOWN", value: v }),
  };
}
