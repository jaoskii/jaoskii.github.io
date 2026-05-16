"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft, ArrowRight, ExternalLink, Github, Star, Tag,
  Copy, Check, Calendar, Layers, ChevronLeft, ChevronRight,
  Maximize2, X, Images,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { Navbar } from "@/components/layout/Navbar";

/* ── Palettes ────────────────────────────────────────────────────────── */
const palettes = [
  { from: "rgba(192,132,252,0.30)", to: "rgba(249,115,22,0.18)",  line: "#c084fc" },
  { from: "rgba(74,222,128,0.25)",  to: "rgba(192,132,252,0.18)", line: "#4ade80" },
  { from: "rgba(249,115,22,0.30)",  to: "rgba(74,222,128,0.18)",  line: "#f97316" },
  { from: "rgba(192,132,252,0.25)", to: "rgba(74,222,128,0.22)",  line: "#c084fc" },
  { from: "rgba(74,222,128,0.30)",  to: "rgba(249,115,22,0.22)",  line: "#4ade80" },
  { from: "rgba(249,115,22,0.25)",  to: "rgba(192,132,252,0.22)", line: "#f97316" },
];
type Palette = typeof palettes[0];

function slideVariations(p: Palette) {
  return [
    { from: p.from,                   to: p.to                   },
    { from: "rgba(74,222,128,0.20)",  to: p.from                 },
    { from: p.to,                     to: "rgba(74,222,128,0.15)"},
    { from: "rgba(192,132,252,0.20)", to: p.to                   },
    { from: p.from,                   to: "rgba(249,115,22,0.20)"},
  ];
}

/* ── EVA corners ─────────────────────────────────────────────────────── */
function Corners({ accent, size = 16 }: { accent: string; size?: number }) {
  const s = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", width: size, height: size, ...pos,
  });
  const bar = (style: React.CSSProperties) => (
    <span style={{ position: "absolute", background: accent, ...style }} />
  );
  return (
    <>
      <span style={s({ top: 12, left: 12 })}>
        {bar({ top: 0, left: 0, width: "100%", height: 1 })}
        {bar({ top: 0, left: 0, width: 1, height: "100%" })}
      </span>
      <span style={s({ top: 12, right: 12 })}>
        {bar({ top: 0, right: 0, width: "100%", height: 1 })}
        {bar({ top: 0, right: 0, width: 1, height: "100%" })}
      </span>
      <span style={s({ bottom: 12, left: 12 })}>
        {bar({ bottom: 0, left: 0, width: "100%", height: 1 })}
        {bar({ bottom: 0, left: 0, width: 1, height: "100%" })}
      </span>
      <span style={s({ bottom: 12, right: 12 })}>
        {bar({ bottom: 0, right: 0, width: "100%", height: 1 })}
        {bar({ bottom: 0, right: 0, width: 1, height: "100%" })}
      </span>
    </>
  );
}

/* ── Copy button ─────────────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent-green transition-colors px-2 py-1 border border-border hover:border-accent-green/30">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={copied ? "c" : "x"}
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.15 }} className="flex items-center gap-1.5">
          {copied ? <><Check size={11} className="text-accent-green" /> copied</> : <><Copy size={11} /> copy url</>}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ── Lightbox slide motion ───────────────────────────────────────────── */
const lbVariants = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
};

/* ── Coverflow gallery ───────────────────────────────────────────────── */
function ProjectGallery({ screenshots, palette, initials }: {
  screenshots: string[]; palette: Palette; initials: string;
}) {
  const [cur, setCur]           = useState(0);
  const [dir, setDir]           = useState(1);
  const [lightbox, setLightbox] = useState(false);

  /* card width measured from the stage so x offset is in real pixels */
  const stageRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(400);
  const cardH = Math.round(cardW * 9 / 16);

  useEffect(() => {
    if (!stageRef.current) return;
    const update = () => {
      if (stageRef.current)
        setCardW(Math.min(Math.round(stageRef.current.offsetWidth * 0.58), 480));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  /* drag detection — guarded by pointerDown flag to avoid false positives */
  const dragStartX    = useRef(0);
  const didPointerDown = useRef(false);
  const wasDrag       = useRef(false);

  const slides = slideVariations(palette);
  const slide  = (i: number) => slides[i % slides.length];

  const go = (next: number) => {
    const n = Math.max(0, Math.min(screenshots.length - 1, next));
    setDir(n > cur ? 1 : -1);
    setCur(n);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { setDir(-1); setCur(c => Math.max(0, c - 1)); }
      if (e.key === "ArrowRight") { setDir(1);  setCur(c => Math.min(screenshots.length - 1, c + 1)); }
      if (e.key === "Escape")     setLightbox(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [screenshots.length]);

  /* pixel-based x avoids percentage-string interpolation issues */
  const cardAnim = (offset: number) => {
    const abs = Math.abs(offset);
    return {
      x:       offset * cardW * 0.64,   // pixels from card's own center
      rotateY: offset * -42,
      scale:   1 - abs * 0.11,
      z:       -abs * 80,
      opacity: abs > 2 ? 0 : 1 - abs * 0.27,
    };
  };

  /* sort far cards first → center card last = natural DOM stacking, no zIndex needed */
  const visibleCards = screenshots
    .map((caption, i) => ({ caption, i, offset: i - cur, abs: Math.abs(i - cur) }))
    .filter(({ abs }) => abs <= 2)
    .sort((a, b) => b.abs - a.abs);

  return (
    <motion.div className="mb-16"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}>

      <p className="font-mono text-[10px] text-accent-orange uppercase tracking-widest mb-5 flex items-center gap-2">
        <Images size={10} /> Gallery
      </p>

      {/* ── Stage — isolation:isolate creates its own stacking context ── */}
      <div
        ref={stageRef}
        className="relative"
        style={{ height: cardH + 24, perspective: "1100px", isolation: "isolate" }}
        onPointerDown={(e) => {
          dragStartX.current   = e.clientX;
          didPointerDown.current = true;
          wasDrag.current      = false;
        }}
        onPointerMove={(e) => {
          if (didPointerDown.current && Math.abs(e.clientX - dragStartX.current) > 8)
            wasDrag.current = true;
        }}
        onPointerUp={(e) => {
          if (!didPointerDown.current) return;
          didPointerDown.current = false;
          const d = e.clientX - dragStartX.current;
          if (wasDrag.current && Math.abs(d) > 40) d < 0 ? go(cur + 1) : go(cur - 1);
          /* delay reset so card onClick fires before wasDrag clears */
          setTimeout(() => { wasDrag.current = false; }, 0);
        }}
      >
        {/* edge fades (pointer-events-none so they never block clicks) */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0d0f17 20%, transparent)", zIndex: 2 }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0d0f17 20%, transparent)", zIndex: 2 }} />

        {visibleCards.map(({ caption, i, offset, abs }) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              /* margin-based centering so Framer Motion x is purely the offset delta */
              left: "50%",
              top: "50%",
              width: cardW,
              marginLeft: -cardW / 2,
              marginTop:  -cardH / 2,
              transformStyle: "preserve-3d",
              cursor: offset === 0 ? "zoom-in" : "pointer",
            }}
            animate={cardAnim(offset)}
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
            onClick={() => {
              if (wasDrag.current) return;
              offset === 0 ? setLightbox(true) : go(i);
            }}
          >
            {/* face */}
            <div
              className="relative overflow-hidden"
              style={{
                width: cardW, height: cardH,
                background: `linear-gradient(135deg, ${slide(i).from}, ${slide(i).to})`,
                border: `1px solid ${offset === 0 ? `${palette.line}55` : "rgba(48,40,63,0.6)"}`,
                boxShadow: offset === 0
                  ? `0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px ${palette.line}15, inset 0 0 60px ${palette.line}08`
                  : "0 8px 24px rgba(0,0,0,0.45)",
              }}
            >
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(${palette.line}18 1px, transparent 1px), linear-gradient(90deg, ${palette.line}18 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }} />
              <span className="absolute font-bold tracking-tighter select-none pointer-events-none"
                style={{ fontSize: "clamp(36px,8vw,110px)", color: palette.line, opacity: 0.07, bottom: "-8%", right: "2%" }}>
                {initials}
              </span>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
                style={{ background: "linear-gradient(to top, rgba(13,15,23,0.90), transparent)" }}>
                <span className="font-mono text-sm font-semibold leading-none" style={{ color: palette.line }}>
                  {caption}
                </span>
              </div>
              {offset === 0 && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 font-mono text-[9px] bg-bg-primary/50 border border-border/40 px-1.5 py-0.5 text-text-muted">
                  <Maximize2 size={8} /> expand
                </div>
              )}
              <Corners accent={palette.line} size={offset === 0 ? 14 : 10} />
            </div>

            {/* reflection — pointer-events-none, doesn't extend card hit area */}
            <div
              className="pointer-events-none"
              style={{
                position: "absolute", top: cardH, left: 0, width: cardW, height: Math.round(cardH * 0.4),
                background: `linear-gradient(135deg, ${slide(i).from}, ${slide(i).to})`,
                transform: "scaleY(-1)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 100%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Nav — sits outside the isolated stage, always on top ── */}
      <div className="relative flex items-center justify-center gap-4 mt-4" style={{ zIndex: 1 }}>
        <button
          type="button"
          onClick={() => { setDir(-1); setCur(c => Math.max(0, c - 1)); }}
          disabled={cur === 0}
          className="p-1.5 border border-border hover:border-border-light text-text-muted hover:text-text-secondary transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex gap-1.5 items-center">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              style={{ height: 3, width: i === cur ? 20 : 6, background: i === cur ? palette.line : `${palette.line}40`, transition: "all 0.3s" }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => { setDir(1); setCur(c => Math.min(screenshots.length - 1, c + 1)); }}
          disabled={cur === screenshots.length - 1}
          className="p-1.5 border border-border hover:border-border-light text-text-muted hover:text-text-secondary transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(13,15,23,0.97)" }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl overflow-hidden border border-border"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={dir} initial={false} mode="wait">
                <motion.div
                  key={cur} custom={dir} variants={lbVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) go(cur + 1);
                    else if (info.offset.x > 50) go(cur - 1);
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${slide(cur).from}, ${slide(cur).to})` }}
                >
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${palette.line}20 1px, transparent 1px), linear-gradient(90deg, ${palette.line}20 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }} />
                  <span className="absolute font-bold tracking-tighter select-none pointer-events-none"
                    style={{ fontSize: "clamp(60px,16vw,200px)", color: palette.line, opacity: 0.06, bottom: "-5%", right: "1%" }}>
                    {initials}
                  </span>
                  <div className="relative flex flex-col items-center gap-3 px-8 text-center">
                    <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: palette.line, opacity: 0.5 }}>
                      {cur + 1} / {screenshots.length}
                    </span>
                    <span className="font-bold text-3xl md:text-4xl tracking-tight"
                      style={{ color: palette.line, opacity: 0.9, textShadow: `0 0 60px ${palette.line}60` }}>
                      {screenshots[cur]}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {screenshots.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); go(cur - 1); }} disabled={cur === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-bg-primary/70 border border-border hover:border-border-light disabled:opacity-25 transition-colors">
                    <ChevronLeft size={20} className="text-text-secondary" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); go(cur + 1); }} disabled={cur === screenshots.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-bg-primary/70 border border-border hover:border-border-light disabled:opacity-25 transition-colors">
                    <ChevronRight size={20} className="text-text-secondary" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {screenshots.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); go(i); }}
                    style={{ height: 3, width: i === cur ? 20 : 6, background: i === cur ? palette.line : `${palette.line}44`, transition: "all 0.25s" }} />
                ))}
              </div>
              <Corners accent={palette.line} size={20} />
            </motion.div>

            {/* thumbnails */}
            {screenshots.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
                {screenshots.map((caption, i) => (
                  <button key={i} onClick={() => go(i)} title={caption}
                    className="relative shrink-0 w-20 h-14 overflow-hidden border transition-colors"
                    style={{ background: `linear-gradient(135deg, ${slide(i).from}, ${slide(i).to})`, borderColor: i === cur ? palette.line : "rgba(48,40,63,0.5)" }}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(${palette.line}22 1px, transparent 1px), linear-gradient(90deg, ${palette.line}22 1px, transparent 1px)`,
                      backgroundSize: "8px 8px",
                    }} />
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[7px] text-center px-1 leading-tight"
                      style={{ color: palette.line, opacity: 0.85 }}>{caption}</span>
                    {i === cur && (
                      <motion.span layoutId="lb-thumb" className="absolute inset-0"
                        style={{ border: `1px solid ${palette.line}` }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                    )}
                  </button>
                ))}
              </div>
            )}

            <p className="mt-4 font-mono text-[10px] text-text-muted flex items-center gap-2 select-none">
              <span style={{ color: palette.line }}>← →</span> navigate
              <span className="mx-1 opacity-30">|</span> drag to swipe
              <span className="mx-1 opacity-30">|</span>
              <span className="text-accent-orange">esc</span> close
            </p>
            <button onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 p-2 bg-bg-card border border-border hover:border-accent-orange/50 hover:text-accent-orange text-text-muted transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Related card ────────────────────────────────────────────────────── */
function RelatedCard({ project }: { project: (typeof projects)[0] }) {
  const palette = palettes[projects.indexOf(project) % palettes.length];
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-bg-card border border-border group-hover:border-border-light transition-colors overflow-hidden">
        <div className="relative h-28 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${palette.line}22 1px, transparent 1px), linear-gradient(90deg, ${palette.line}22 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }} />
          <span className="relative font-bold text-3xl tracking-tighter select-none" style={{ color: palette.line, opacity: 0.25 }}>
            {project.title.split(" ").map((w) => w[0]).join("")}
          </span>
          <Corners accent={palette.line} size={12} />
        </div>
        <div className="p-4">
          <p className="text-text-primary text-sm font-semibold group-hover:text-accent transition-colors mb-1">{project.title}</p>
          <p className="text-text-muted text-xs font-mono">{project.year}</p>
        </div>
      </motion.div>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const projectIndex = projects.indexOf(project);
  const palette      = palettes[projectIndex % palettes.length];
  const prevProject  = projects[projectIndex - 1] ?? null;
  const nextProject  = projects[projectIndex + 1] ?? null;
  const related      = projects.filter((p) => p.id !== project.id && p.tags.some((t) => project.tags.includes(t))).slice(0, 3);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const initials    = project.title.split(" ").map((w) => w[0]).join("");

  return (
    <>
      <CommandPalette />
      <Navbar />
      <FloatingDock />

      {/* Hero */}
      <div ref={heroRef} className="relative h-[55vh] overflow-hidden">
        <motion.div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`, y: heroY }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${palette.line}33 1px, transparent 1px), linear-gradient(90deg, ${palette.line}33 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />
        </motion.div>
        <motion.div className="absolute inset-0 flex items-center justify-center select-none"
          style={{ y: heroY, opacity: heroOpacity }}>
          <span className="font-bold tracking-tighter pointer-events-none"
            style={{ fontSize: "20vw", color: palette.line, opacity: 0.1 }}>{initials}</span>
        </motion.div>
        <Corners accent={palette.line} size={20} />
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <span className="font-mono text-xs px-2 py-1 bg-bg-primary/60 border border-border text-accent-orange">
            <Calendar size={10} className="inline mr-1" />{project.year}
          </span>
          {project.featured && (
            <span className="font-mono text-xs px-2 py-1 bg-bg-primary/60 border border-border text-accent-green flex items-center gap-1">
              <Star size={10} fill="currentColor" /> featured
            </span>
          )}
        </div>
        <div className="absolute top-20 left-6 z-20">
          <Link href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 bg-bg-primary/60 border border-border text-text-muted hover:text-accent-green hover:border-accent-green/30 transition-colors">
            <ArrowLeft size={12} /> all projects
          </Link>
        </div>
        <motion.div className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-16"
          style={{ background: "linear-gradient(to top, rgba(13,15,23,0.95), transparent)" }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: palette.line }}>— project</p>
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">{project.title}</h1>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 pb-32">

        {/* Overview + Links */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <motion.div className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <p className="font-mono text-[10px] text-accent-orange uppercase tracking-widest mb-4">Overview</p>
            <p className="text-text-secondary text-lg leading-relaxed">{project.description}</p>
          </motion.div>
          <motion.div className="space-y-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <p className="font-mono text-[10px] text-accent-orange uppercase tracking-widest mb-4">Links</p>
            {project.repoUrl && (
              <div className="space-y-1.5">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-green transition-colors group">
                  <Github size={14} className="shrink-0" />
                  <span className="group-hover:underline underline-offset-2 truncate">Repository</span>
                  <ExternalLink size={10} className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <CopyButton text={project.repoUrl} />
              </div>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors group">
                <ExternalLink size={14} className="shrink-0" />
                <span className="group-hover:underline underline-offset-2">Live site</span>
                <ExternalLink size={10} className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {!project.repoUrl && !project.liveUrl && (
              <p className="text-text-muted text-xs font-mono">No links available.</p>
            )}
          </motion.div>
        </div>

        {/* Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <ProjectGallery screenshots={project.screenshots} palette={palette} initials={initials} />
        )}

        {/* Stack */}
        <motion.div className="mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
          <p className="font-mono text-[10px] text-accent-orange uppercase tracking-widest mb-5 flex items-center gap-2">
            <Layers size={10} /> Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span key={tag}
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.48 + i * 0.05 }}
                className="text-sm font-mono px-3 py-1.5 bg-bg-card border border-border text-text-secondary hover:border-border-light hover:text-text-primary transition-colors cursor-default">
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-3 gap-4 mb-16 p-6 bg-bg-card border border-border"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          {[
            { label: "Year",       value: project.year,                              color: "text-accent-orange" },
            { label: "Stack size", value: `${project.tags.length} tools`,            color: "text-accent-green"  },
            { label: "Status",     value: project.featured ? "Featured" : "Shipped", color: "text-accent"        },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className={`text-xl font-bold font-mono mb-1 ${color}`}>{value}</p>
              <p className="text-text-muted text-xs font-mono uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
            <p className="font-mono text-[10px] text-accent-orange uppercase tracking-widest mb-5 flex items-center gap-2">
              <Tag size={10} /> Related Projects
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => <RelatedCard key={p.id} project={p} />)}
            </div>
          </motion.div>
        )}

        {/* Prev / Next */}
        <motion.div className="flex items-center justify-between pt-8 border-t border-border"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-green transition-colors group">
              <ArrowLeft size={14} />
              <span className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider">Previous</span>
                <span className="group-hover:text-accent-green transition-colors">{prevProject.title}</span>
              </span>
            </Link>
          ) : <span />}
          {nextProject ? (
            <Link href={`/projects/${nextProject.id}`}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-green transition-colors group text-right">
              <span className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider">Next</span>
                <span className="group-hover:text-accent-green transition-colors">{nextProject.title}</span>
              </span>
              <ArrowRight size={14} />
            </Link>
          ) : <span />}
        </motion.div>
      </main>
    </>
  );
}
