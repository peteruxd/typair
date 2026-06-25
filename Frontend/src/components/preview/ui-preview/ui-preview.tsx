"use client";

import { useState, useRef, useCallback } from "react";
import { useScale } from "@/hooks/use-scale";
import { useWorkspace } from "@/lib/state";
import { ExternalLink, Calculator, Search, Shuffle, Layout, Monitor, Code, Menu } from "lucide-react";

function HoverEdit({
  initial, className = "", style = {}, as: Tag = "span", fontFamily, userFont = false, serif = false,
}: {
  initial: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  fontFamily?: string | null;
  userFont?: boolean;
  serif?: boolean;
}) {
  const [text, setText] = useState(initial);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    setText(e.currentTarget.textContent || initial);
    setEditing(false);
  }, [initial]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditing(false);
      if (ref.current) ref.current.textContent = text;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  }, [text]);

  return (
    <Tag
      ref={ref as never}
      contentEditable={editing}
      suppressContentEditableWarning
      onDoubleClick={() => setEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        ...style,
        fontFamily: userFont && fontFamily ? `${fontFamily}, ${serif ? "Georgia, serif" : "Arial, sans-serif"}` : undefined,
        cursor: editing ? "text" : "pointer",
        outline: editing ? "2px dashed #10b981" : "none",
        outlineOffset: 2,
        borderRadius: editing ? "2px" : undefined,
      }}
    >
      {text}
    </Tag>
  );
}

export function UiPreview() {
  const { state } = useWorkspace();
  const { header, body, headerWeight, bodyWeight } = state.fonts;
  const { steps } = useScale();

  const h1 = steps.find((s) => s.name === "h1");
  const base = steps.find((s) => s.name === "base");
  const h3 = steps.find((s) => s.name === "h3");

  const h1Size = h1 ? `${h1.rem}rem` : "3.125rem";
  const h1Lh = h1?.lineHeight ?? 1.2;
  const baseSize = base ? `${base.rem}rem` : "1rem";
  const baseLh = base?.lineHeight ?? 1.5;
  const h3Size = h3 ? `${h3.rem}rem` : "1.75rem";
  const isMobile = state.viewport.mode === "mobile";

  return (
    <div className="min-h-full">
      {/* ─── Navbar ─── */}
      <div
        className="flex items-center justify-between border-b border-[#e2e8f0] bg-white px-6 dark:border-[#334155] dark:bg-[#1e293b]"
        style={{ height: 64 }}
      >
        <div className="flex items-center gap-8">
          <HoverEdit
            initial="TyPair"
            fontFamily={body}
            userFont
            className="text-lg font-semibold"
            style={{ fontWeight: bodyWeight }}
          />
          <div className={isMobile ? "hidden" : "flex items-center gap-6 text-sm text-[#64748b]"} style={{ fontFamily: body ? `${body}, sans-serif` : undefined }}>
            <span>Scale Calculator</span>
            <span>Font Pairing</span>
            <span>Code Export</span>
            <span>Blog</span>
          </div>
          {isMobile && <Menu className="h-5 w-5 text-[#0f172a] dark:text-[#f8fafc]" />}
        </div>
        <div className={`flex items-center ${isMobile ? "gap-2" : "gap-4"}`}>
          <ExternalLink className="h-5 w-5 text-[#0f172a] dark:text-[#f8fafc]" />
          <button className={`rounded-md bg-[#0f172a] font-medium text-white dark:bg-[#f8fafc] dark:text-[#0f172a] ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`} style={{ fontFamily: body ? `${body}, sans-serif` : undefined }}>
            Start Scaling &mdash; It&rsquo;s Free
          </button>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <div className={isMobile ? "px-4 py-10 text-center" : "px-16 py-20 text-center"}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <HoverEdit
            initial="Design your type system. Ship in seconds."
            fontFamily={header}
            userFont
            serif
            as="h1"
            className="mb-3 font-bold"
            style={{
              fontSize: h1Size,
              lineHeight: h1Lh,
              letterSpacing: h1?.letterSpacing ? `${h1.letterSpacing}em` : undefined,
              fontWeight: headerWeight,
            }}
          />
          <HoverEdit
            initial="TyPair is the complete typography workspace for designers and developers. Compute modular scales, pair header and body fonts, preview the hierarchy on real UI components, and export production-ready code &mdash; all without leaving your browser."
            fontFamily={body}
            userFont
            as="p"
            className="mx-auto text-[#64748b]"
            style={{
              fontSize: baseSize,
              lineHeight: baseLh,
              maxWidth: 700,
            }}
          />
        </div>
        <div className={`mt-6 flex items-center justify-center ${isMobile ? "gap-3" : "gap-4"}`}>
          <button className={`rounded-lg bg-[#0f172a] font-semibold text-white dark:bg-[#f8fafc] dark:text-[#0f172a] ${isMobile ? "px-5 py-3 text-sm" : "px-6 py-4 text-base"}`} style={{ fontFamily: body ? `${body}, sans-serif` : undefined }}>
            Start Scaling &mdash; It&rsquo;s Free
          </button>
          <span className={`font-medium text-[#64748b] ${isMobile ? "text-sm" : "text-base"}`} style={{ fontFamily: body ? `${body}, sans-serif` : undefined }}>See How It Works</span>
        </div>
      </div>

      {/* ─── Features ─── */}
      <div className={isMobile ? "px-4 pb-12 pt-8" : "px-16 pb-16 pt-12"}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <HoverEdit
            initial="Everything you need to ship great typography"
            fontFamily={header}
            userFont
            serif
            as="h2"
            className="mb-12 text-center font-bold"
            style={{ fontSize: "2rem", fontWeight: headerWeight }}
          />

          {/* Row 1 */}
          <div className={`mb-6 grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <FeatureCard icon={<Calculator className="h-6 w-6 text-[#10b981]" />} header={header} body={body} headerWeight={headerWeight} baseLh={baseLh}
              title="Modular Scale Calculator"
              desc="Choose from classic musical intervals or enter a custom ratio. TyPair computes every scale step in real time."
            />
            <FeatureCard icon={<Search className="h-6 w-6 text-[#10b981]" />} header={header} body={body} headerWeight={headerWeight} baseLh={baseLh}
              title="Dual Font Controller"
              desc="Search 1500+ Google Fonts with separate selectors for header and body fonts. Changes apply instantly."
            />
          </div>

          {/* Row 2 */}
          <div className={`mb-6 grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <FeatureCard icon={<Shuffle className="h-6 w-6 text-[#10b981]" />} header={header} body={body} headerWeight={headerWeight} baseLh={baseLh}
              title="Lock &amp; Roll"
              desc="Lock your header font, roll through complementary body fonts. Spacebar shortcut for rapid exploration."
            />
            <FeatureCard icon={<Layout className="h-6 w-6 text-[#10b981]" />} header={header} body={body} headerWeight={headerWeight} baseLh={baseLh}
              title="Live shadcn UI Preview"
              desc="See your type system on real shadcn components &mdash; navbar, hero, feature cards, blog, and footer."
            />
          </div>

          {/* Row 3 */}
          <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <FeatureCard icon={<Monitor className="h-6 w-6 text-[#10b981]" />} header={header} body={body} headerWeight={headerWeight} baseLh={baseLh}
              title="Responsive Dual Viewport"
              desc="Configure independent base sizes for desktop and mobile. Both viewports update in real time."
            />
            <FeatureCard icon={<Code className="h-6 w-6 text-[#10b981]" />} header={header} body={body} headerWeight={headerWeight} baseLh={baseLh}
              title="Code Export"
              desc="CSS Custom Properties, Tailwind v3/v4, Style Dictionary JSON &mdash; one click to copy."
            />
          </div>
        </div>
      </div>

      {/* ─── Blog ─── */}
      <div className={`bg-[#f1f5f9] dark:bg-[#1e293b] ${isMobile ? "px-4 py-10" : "px-16 py-16"}`}>
          <HoverEdit
            initial="Articles and resources for better typography"
            fontFamily={header}
            userFont
            serif
            as="h2"
          className="mb-8 text-center font-bold"
          style={{ fontSize: "1.75rem", fontWeight: headerWeight }}
        />
        <div className={`mx-auto grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`} style={{ maxWidth: 1012 }}>
          {[
            { tag: "Guides", title: "The Math Behind Modular Typography Scales", excerpt: "Understand how musical intervals map to visual hierarchy and how to use them in your next project." },
            { tag: "Engineering", title: "Fluid Typography with clamp() in Tailwind CSS v4", excerpt: "Practical guide to setting up responsive typography using CSS clamp() with live examples." },
            { tag: "Inspiration", title: "10 Font Pairings That Work Every Time", excerpt: "Curated combinations with visual breakdowns for serif, sans-serif, display, and mono pairings." },
          ].map((post) => (
            <div key={post.tag} className="rounded-lg border border-[#e2e8f0] bg-white p-6 dark:border-[#334155] dark:bg-[#1e293b]">
              <span className="inline-block rounded bg-[#10b981] px-2 py-0.5 text-[11px] font-semibold text-white">
                {post.tag}
              </span>
              <HoverEdit
                initial={post.title}
                fontFamily={header}
                userFont
                serif
                as="h3"
                className="mb-2 mt-3 font-semibold"
                style={{ fontSize: h3Size, fontWeight: headerWeight }}
              />
              <HoverEdit
                initial={post.excerpt}
                fontFamily={body}
                userFont
                as="p"
                className="text-sm leading-relaxed text-[#64748b]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div className={`bg-[#0f172a] text-center dark:bg-[#f8fafc] ${isMobile ? "px-4 py-8" : "px-16 py-12"}`}>
        <HoverEdit
          initial="TyPair &mdash; Scale, Pair, Preview, Ship."
          fontFamily={header}
          userFont
          serif
          as="div"
          className="mb-8 text-base font-medium text-white dark:text-[#1e293b]"
        />
        <div className={`mx-auto mb-8 grid gap-12 text-left ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-12"}`} style={{ maxWidth: 700 }}>
          {[
            { title: "PRODUCT", items: ["Scale Calculator", "Font Pairing", "Code Export"] },
            { title: "RESOURCES", items: ["Blog", "Documentation", "API Reference"] },
            { title: "COMPANY", items: ["About", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-2 text-xs font-semibold text-[#64748b]" style={{ fontFamily: header ? `${header}, Georgia, serif` : undefined }}>{col.title}</p>
              {col.items.map((item) => (
                <p key={item} className="text-sm text-white dark:text-[#1e293b]" style={{ fontFamily: body ? `${body}, sans-serif` : undefined }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-[#64748b]" style={{ fontFamily: body ? `${body}, sans-serif` : undefined }}>&copy; 2026 TyPair. All rights reserved.</p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon, title, desc, header, body, headerWeight, baseLh,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  header: string | null;
  body: string | null;
  headerWeight: number;
  baseLh: number;
}) {
  return (
    <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 dark:border-[#334155] dark:bg-[#1e293b]">
      <div className="mb-3">{icon}</div>
      <HoverEdit
        initial={title}
        fontFamily={header}
        userFont
        serif
        as="h3"
        className="mb-2 text-lg font-semibold"
        style={{ fontWeight: headerWeight }}
      />
      <HoverEdit
        initial={desc}
        fontFamily={body}
        userFont
        as="p"
        className="text-sm leading-relaxed text-[#64748b]"
        style={{ lineHeight: baseLh }}
      />
    </div>
  );
}
