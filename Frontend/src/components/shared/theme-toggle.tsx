"use client";

import { Sun, Moon } from "lucide-react";
import { useWorkspace } from "@/lib/state";

export function ThemeToggle() {
  const { state, dispatch } = useWorkspace();

  return (
    <button
      onClick={() => dispatch({ type: "SET_THEME", value: state.theme === "light" ? "dark" : "light" })}
      className="flex h-7 w-7 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-[#1e293b] hover:text-[#f8fafc]"
      title={`Switch to ${state.theme === "light" ? "dark" : "light"} mode`}
    >
      {state.theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
    </button>
  );
}
