"use client";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { Navbar } from "@/components/layout/Navbar";

/* ── Unique tags for filter bar ─────────────────────────────────────── */
const allTags = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))).slice(0, 10),
];

/* ── Per-project placeholder palette ────────────────────────────────── */
const palettes = [
  { from: "rgba(192,132,252,0.25)", to: "rgba(249,115,22,0.15)",  line: "#c084fc" },
  { from: "rgba(74,222,128,0.2)",   to: "rgba(192,132,252,0.15)", line: "#4ade80" },
  { from: "rgba(249,115,22,0.25)",  to: "rgba(74,222,128,0.15)",  line: "#f97316" },
  { from: "rgba(192,132,252,0.2)",  to: "rgba(74,222,128,0.2)",   line: "#c084fc" },
  { from: "rgba(74,222,128,0.25)",  to: "rgba(249,115,22,0.2)",   line: "#4ade80" },
  { from: "rgba(249,115,22,0.2)",   to: "rgba(192,132,252,0.2)",  line: "#f97316" },
];

/* ── EVA corner marks ────────────────────────────────────────────────── */
function Corners({ accent }: { accent: string }) {
  const s = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", width: 14, height: 14, ...pos,
  });
  const bar = (style: React.CSSProperties) => (
    <span style={{ position: "absolute", background: accent, ...style }} />
  );
  return (
    <>
      <span style={s({ top: 8, left: 8 })}>
        {bar({ top: 0, left: 0, width: "100%", height: 1 })}
        {bar({ top: 0, left: 0, width: 1, height: "100%" })}
      </span>
      <span style={s({ top: 8, right: 8 })}>
        {bar({ top: 0, right: 0, width: "100%", height: 1 })}
        {bar({ top: 0, right: 0, width: 1, height: "100%" })}
      </span>
      <span style={s({ bottom: 8, left: 8 })}>
        {bar({ bottom: 0, left: 0, width: "100%", height: 1 })}
        {bar({ bottom: 0, left: 0, width: 1, height: "100%" })}
      </span>
      <span style={s({ bottom: 8, right: 8 })}>
        {bar({ bottom: 0, right: 0, width: "100%", height: 1 })}
        {bar({ bottom: 0, right: 0, width: 1, height: "100%" })}
      </span>
    </>
  );
}

/* ── 3-D tilt card — navigates to detail page on click ──────────────── */
function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 400, damping: 40 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 400, damping: 40 });
  const sc   = useSpring(1, { stiffness: 400, damping: 40 });
  const palette = palettes[index % palettes.length];

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, scale: sc, transformPerspective: 900 }}
      onMouseMove={move}
      onMouseEnter={() => sc.set(1.03)}
      onMouseLeave={() => { mx.set(0); my.set(0); sc.set(1); }}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link href={`/projects/${project.id}`} className="group block h-full">
        <div className="bg-bg-card border border-border group-hover:border-border-light transition-colors duration-300 overflow-hidden h-full flex flex-col">

          {/* Image placeholder */}
          <div
            className="relative h-44 flex items-center justify-center overflow-hidden shrink-0"
            style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${palette.line}22 1px, transparent 1px), linear-gradient(90deg, ${palette.line}22 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <span
              className="relative font-bold text-5xl tracking-tighter select-none"
              style={{ color: palette.line, opacity: 0.25 }}
            >
              {project.title.split(" ").map((w) => w[0]).join("")}
            </span>
            <span className="absolute top-3 left-3 font-mono text-[10px] text-accent-orange">
              {project.year}
            </span>
            {project.featured && (
              <span className="absolute top-3 right-3 flex items-center gap-1 font-mono text-[10px] text-accent-green">
                <Star size={9} fill="currentColor" /> featured
              </span>
            )}
            <div className="absolute inset-0 bg-bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="text-text-primary text-sm font-medium tracking-wide font-mono">
                View details →
              </span>
            </div>
            <Corners accent={palette.line} />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-text-primary font-semibold text-base mb-2 group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 bg-bg-hover border border-border text-text-muted"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[10px] font-mono px-2 py-0.5 text-text-muted">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.preventDefault() || window.open(project.repoUrl, "_blank")}
                  className="text-text-muted hover:text-accent-green transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={15} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.preventDefault() || window.open(project.liveUrl, "_blank")}
                  className="text-text-muted hover:text-accent transition-colors"
                  aria-label="Live site"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <CommandPalette />
      <Navbar />
      <FloatingDock />

      <main className="min-h-screen pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-3">
              — showcase
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-4">
              All <span className="text-accent">Projects</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-xl">
              {projects.length} projects across full-stack, tooling, and open-source.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="relative px-3 py-1.5 text-xs font-mono transition-colors duration-200"
              >
                {activeTag === tag && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-accent/15 border border-accent/40"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className={`relative ${activeTag === tag ? "text-accent" : "text-text-muted hover:text-text-secondary"}`}>
                  {tag}
                </span>
              </button>
            ))}
            <span className="ml-auto self-center text-text-muted font-mono text-[10px]">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <TiltCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-text-muted font-mono py-20"
            >
              No projects match &ldquo;{activeTag}&rdquo;
            </motion.p>
          )}
        </div>
      </main>
    </>
  );
}
