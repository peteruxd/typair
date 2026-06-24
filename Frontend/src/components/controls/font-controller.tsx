"use client";

import { useState, useEffect, useCallback } from "react";
import { usePairings } from "@/hooks/use-pairings";
import { useFontSearch } from "@/hooks/use-fonts";
import { Lock, Unlock, Shuffle, Search } from "lucide-react";
import { useWorkspace } from "@/lib/state";

export function FontController() {
  const { state, dispatch } = useWorkspace();
  const { header, body, headerLocked, bodyLocked, toggleHeaderLock, toggleBodyLock, setHeader, setBody, roll } = usePairings();
  const { loadFont } = useFontSearch("");

  useEffect(() => {
    if (header) loadFont(header, [state.fonts.headerWeight]);
  }, [header, state.fonts.headerWeight, loadFont]);

  useEffect(() => {
    if (body) loadFont(body, [state.fonts.bodyWeight]);
  }, [body, state.fonts.bodyWeight, loadFont]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" && !e.repeat && !(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
      roll();
    }
  }, [roll]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">Fonts</span>
      </div>

      <div className="space-y-3">
        <FontSelectRow
          label="Header"
          value={header}
          onChange={setHeader}
          locked={headerLocked}
          onToggleLock={toggleHeaderLock}
          weight={state.fonts.headerWeight}
          onWeightChange={(v) => dispatch({ type: "SET_HEADER_WEIGHT", value: v })}
        />
        <FontSelectRow
          label="Body"
          value={body}
          onChange={setBody}
          locked={bodyLocked}
          onToggleLock={toggleBodyLock}
          weight={state.fonts.bodyWeight}
          onWeightChange={(v) => dispatch({ type: "SET_BODY_WEIGHT", value: v })}
        />

        <button
          onClick={roll}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[#334155] bg-[#1e293b] px-3 py-2 text-xs text-[#f8fafc] transition-colors hover:bg-[#334155]"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Roll (Space)
        </button>
      </div>
    </section>
  );
}

function FontSelectRow({
  label, value, onChange, locked, onToggleLock, weight, onWeightChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  locked: boolean;
  onToggleLock: () => void;
  weight: number;
  onWeightChange: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { fonts, loadFont } = useFontSearch(query);

  const selected = value ?? "";

  return (
    <div>
      <label className="mb-1 block text-xs text-[#94a3b8]">{label}</label>
      <div className="flex items-center gap-1">
        <div className="relative flex-1">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center rounded-md border border-[#334155] bg-[#1e293b] px-3 py-2 text-left text-xs text-[#f8fafc]"
            style={value ? { fontFamily: `${value}, Arial, sans-serif` } : undefined}
          >
            <span className="flex-1 truncate">{value ?? "Select font..."}</span>
          </button>
          {open && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-[#334155] bg-[#1e293b] shadow-lg">
              <div className="flex items-center gap-2 border-b border-[#334155] px-3 py-2">
                <Search className="h-3.5 w-3.5 shrink-0 text-[#64748b]" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fonts..."
                  className="w-full bg-transparent text-xs text-[#f8fafc] outline-none placeholder:text-[#64748b]"
                />
              </div>
              {fonts.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-[#64748b]">No fonts found</div>
              ) : (
                fonts.map((f) => (
                  <button
                    key={f.family}
                    onClick={() => {
                      onChange(f.family);
                      loadFont(f.family, [weight]);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:bg-[#334155] ${
                      f.family === selected ? "bg-[#10b981]/10 text-[#10b981]" : "text-[#f8fafc]"
                    }`}
                    style={{ fontFamily: `${f.family}, Arial, sans-serif` }}
                  >
                    {f.family}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button
          onClick={onToggleLock}
          className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-[#334155]"
          title={locked ? "Unlock this font" : "Lock this font"}
        >
          {locked ? (
            <Lock className="h-3.5 w-3.5 fill-[#10b981] text-[#10b981]" />
          ) : (
            <Unlock className="h-3.5 w-3.5 text-[#64748b]" />
          )}
        </button>
      </div>

      {value && (
        <div className="mt-1">
          <label className="mb-1 block text-[10px] text-[#64748b]">Weight: {weight}</label>
          <input
            type="range"
            min={100}
            max={900}
            step={100}
            value={weight}
            onChange={(e) => onWeightChange(Number(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>
      )}
    </div>
  );
}
