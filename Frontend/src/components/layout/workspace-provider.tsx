"use client";

import { useReducer, useEffect } from "react";
import { WorkspaceCtx, reducer, initialState } from "@/lib/state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isDark = state.theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, [state.theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceCtx.Provider value={{ state, dispatch }}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: "#0f172a", color: "#f8fafc", fontSize: 13, borderRadius: 8 },
          }}
        />
      </WorkspaceCtx.Provider>
    </QueryClientProvider>
  );
}
