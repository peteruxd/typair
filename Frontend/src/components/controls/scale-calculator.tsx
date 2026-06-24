"use client";

import { useScale } from "@/hooks/use-scale";
import * as Select from "@/components/ui/select";

export function ScaleCalculator() {
  const {
    baseSize, ratio, stepsUp, stepsDown,
    steps, intervalName, availableIntervals,
    setBaseSize, setRatio, setStepsUp, setStepsDown,
  } = useScale();

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">Scale</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs text-[#94a3b8]">Interval</label>
          <select
            value={intervalName}
            onChange={(e) => {
              const interval = availableIntervals.find((i) => i.name === e.target.value);
              if (interval) setRatio(interval.value);
            }}
            className="w-full rounded-md border border-[#334155] bg-[#1e293b] px-3 py-2 text-xs text-[#f8fafc] outline-none ring-[#10b981] focus:ring-2"
          >
            {availableIntervals.map(({ name, value }) => (
              <option key={name} value={name}>{name} ({value})</option>
            ))}
            <option value="Custom">Custom — {ratio}</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-[#94a3b8]">Base Size: {baseSize}px</label>
          <input
            type="range"
            min={12} max={24} step={1}
            value={baseSize}
            onChange={(e) => setBaseSize(Number(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-xs text-[#94a3b8]">Steps Up: {stepsUp}</label>
            <input
              type="range"
              min={1} max={6} step={1}
              value={stepsUp}
              onChange={(e) => setStepsUp(Number(e.target.value))}
              className="w-full accent-[#10b981]"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs text-[#94a3b8]">Steps Down: {stepsDown}</label>
            <input
              type="range"
              min={0} max={3} step={1}
              value={stepsDown}
              onChange={(e) => setStepsDown(Number(e.target.value))}
              className="w-full accent-[#10b981]"
            />
          </div>
        </div>

        <div className="rounded-md border border-[#334155] bg-[#1e293b] p-2">
          {steps.slice(0, 5).map((s) => (
            <div key={s.name} className="flex items-center justify-between py-1">
              <span className="font-mono text-[11px] text-[#94a3b8]">{s.name}</span>
              <span className="font-mono text-[11px] text-[#f8fafc]">
                {s.px}px / {s.rem}rem
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
