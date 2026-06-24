import type { WorkspaceState } from "./state";

const KEY = "typair-state";

export function serializeState(state: WorkspaceState): string {
  try {
    const params = new URLSearchParams();
    params.set("s", JSON.stringify(state));
    return params.toString();
  } catch {
    return "";
  }
}

export function deserializeState(search: string): WorkspaceState | null {
  try {
    const params = new URLSearchParams(search);
    const raw = params.get("s");
    if (!raw) return null;
    return JSON.parse(raw) as WorkspaceState;
  } catch {
    return null;
  }
}

export function copyShareUrl(): string {
  const url = new URL(window.location.href);
  const state = deserializeState(url.search);
  if (!state) return url.toString();
  url.search = serializeState(state);
  return url.toString();
}
