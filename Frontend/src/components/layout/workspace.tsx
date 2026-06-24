"use client";

import { WorkspaceProvider } from "@/components/layout/workspace-provider";
import { LeftPanel } from "@/components/layout/left-panel";
import { RightPanel } from "@/components/layout/right-panel";
import { useUrlSync } from "@/hooks/use-url-state";

function UrlSyncer() {
  useUrlSync();
  return null;
}

export function Workspace() {
  return (
    <WorkspaceProvider>
      <UrlSyncer />
      <div className="flex h-screen overflow-hidden">
        <LeftPanel />
        <RightPanel />
      </div>
    </WorkspaceProvider>
  );
}
