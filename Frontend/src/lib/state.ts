import { createContext, useContext } from "react";

export interface FontsState {
  header: string | null;
  body: string | null;
  headerLocked: boolean;
  bodyLocked: boolean;
  headerWeight: number;
  bodyWeight: number;
}

export interface ViewportState {
  mode: "desktop" | "mobile" | "fluid";
  sync: boolean;
}

export interface PreviewState {
  mode: "layout" | "waterfall" | "code";
  customText: string;
}

export interface WorkspaceState {
  stepsUp: number;
  stepsDown: number;
  desktopScale: { baseSize: number; ratio: number };
  mobileScale: { baseSize: number; ratio: number };
  fonts: FontsState;
  viewport: ViewportState;
  preview: PreviewState;
  theme: "light" | "dark";
}

export type Action =
  | { type: "SET_STEPS_UP"; value: number }
  | { type: "SET_STEPS_DOWN"; value: number }
  | { type: "SET_HEADER_FONT"; value: string | null }
  | { type: "SET_BODY_FONT"; value: string | null }
  | { type: "TOGGLE_HEADER_LOCK" }
  | { type: "TOGGLE_BODY_LOCK" }
  | { type: "SET_HEADER_WEIGHT"; value: number }
  | { type: "SET_BODY_WEIGHT"; value: number }
  | { type: "SET_DESKTOP_BASE"; value: number }
  | { type: "SET_DESKTOP_RATIO"; value: number }
  | { type: "SET_MOBILE_BASE"; value: number }
  | { type: "SET_MOBILE_RATIO"; value: number }
  | { type: "SET_VIEWPORT_MODE"; value: "desktop" | "mobile" | "fluid" }
  | { type: "TOGGLE_SYNC" }
  | { type: "SET_PREVIEW_MODE"; value: "layout" | "waterfall" | "code" }
  | { type: "SET_THEME"; value: "light" | "dark" }
  | { type: "SET_FONTS"; value: { header: string | null; body: string | null } }
  | { type: "RESET" };

export const initialState: WorkspaceState = {
  stepsUp: 4,
  stepsDown: 1,
  desktopScale: { baseSize: 16, ratio: 1.333 },
  mobileScale: { baseSize: 14, ratio: 1.2 },
  fonts: {
    header: "Playfair Display",
    body: "Inter",
    headerLocked: false,
    bodyLocked: false,
    headerWeight: 700,
    bodyWeight: 400,
  },
  viewport: { mode: "desktop", sync: false },
  preview: { mode: "layout", customText: "" },
  theme: "light",
};

export function reducer(state: WorkspaceState, action: Action): WorkspaceState {
  switch (action.type) {
    case "SET_STEPS_UP": return { ...state, stepsUp: action.value };
    case "SET_STEPS_DOWN": return { ...state, stepsDown: action.value };
    case "SET_HEADER_FONT": return { ...state, fonts: { ...state.fonts, header: action.value } };
    case "SET_BODY_FONT": return { ...state, fonts: { ...state.fonts, body: action.value } };
    case "TOGGLE_HEADER_LOCK": return { ...state, fonts: { ...state.fonts, headerLocked: !state.fonts.headerLocked } };
    case "TOGGLE_BODY_LOCK": return { ...state, fonts: { ...state.fonts, bodyLocked: !state.fonts.bodyLocked } };
    case "SET_HEADER_WEIGHT": return { ...state, fonts: { ...state.fonts, headerWeight: action.value } };
    case "SET_BODY_WEIGHT": return { ...state, fonts: { ...state.fonts, bodyWeight: action.value } };
    case "SET_DESKTOP_BASE": return { ...state, desktopScale: { ...state.desktopScale, baseSize: action.value } };
    case "SET_DESKTOP_RATIO": return { ...state, desktopScale: { ...state.desktopScale, ratio: action.value } };
    case "SET_MOBILE_BASE": return { ...state, mobileScale: { ...state.mobileScale, baseSize: action.value } };
    case "SET_MOBILE_RATIO": return { ...state, mobileScale: { ...state.mobileScale, ratio: action.value } };
    case "SET_VIEWPORT_MODE": return { ...state, viewport: { ...state.viewport, mode: action.value } };
    case "TOGGLE_SYNC": return { ...state, viewport: { ...state.viewport, sync: !state.viewport.sync } };
    case "SET_PREVIEW_MODE": return { ...state, preview: { ...state.preview, mode: action.value } };
    case "SET_THEME": return { ...state, theme: action.value };
    case "SET_FONTS": return { ...state, fonts: { ...state.fonts, header: action.value.header, body: action.value.body } };
    case "RESET": return initialState;
    default: return state;
  }
}

export interface WorkspaceContextValue {
  state: WorkspaceState;
  dispatch: React.Dispatch<Action>;
}

export const WorkspaceCtx = createContext<WorkspaceContextValue | null>(null);

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceCtx);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
