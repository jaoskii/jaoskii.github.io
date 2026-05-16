"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Github, Mail, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, projects, personalInfo } from "@/data/portfolio";

type Cmd = {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  group: string;
  run: () => void;
};

function buildCommands(close: () => void): Cmd[] {
  return [
    ...navItems.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      sub: `Go to ${item.label.toLowerCase()} section`,
      icon: <ArrowRight size={14} />,
      group: "Navigate",
      run: () => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        close();
      },
    })),
    {
      id: "resume",
      label: "View Resume",
      sub: "Open PDF in new tab",
      icon: <FileText size={14} />,
      group: "Links",
      run: () => {
        window.open(personalInfo.resumeUrl, "_blank");
        close();
      },
    },
    {
      id: "github",
      label: "GitHub Profile",
      sub: "github.com",
      icon: <Github size={14} />,
      group: "Links",
      run: () => {
        window.open(personalInfo.github, "_blank");
        close();
      },
    },
    {
      id: "email",
      label: "Send Email",
      sub: personalInfo.email,
      icon: <Mail size={14} />,
      group: "Links",
      run: () => {
        window.location.href = `mailto:${personalInfo.email}`;
        close();
      },
    },
    ...projects.slice(0, 4).map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      sub: p.tags.slice(0, 3).join(" · "),
      icon: <Zap size={14} />,
      group: "Projects",
      run: () => {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
        close();
      },
    })),
  ];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const commands = buildCommands(close);

  const results = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.sub.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const grouped = results.reduce<Record<string, (Cmd & { idx: number })[]>>(
    (acc, cmd, i) => {
      (acc[cmd.group] ??= []).push({ ...cmd, idx: i });
      return acc;
    },
    {}
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) setQuery("");
          return !o;
        });
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    const onOpen = () => {
      setQuery("");
      setOpen(true);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("openCommandPalette", onOpen as EventListener);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("openCommandPalette", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[selected]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-lg bg-bg-secondary border border-accent/25 rounded-xl overflow-hidden shadow-2xl shadow-accent/10"
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onDialogKey}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Search size={15} className="text-accent shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-muted"
              />
              <kbd className="text-accent-orange text-[10px] font-mono bg-bg-card px-1.5 py-0.5 rounded border border-accent-orange/30 leading-tight">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto overscroll-contain py-1.5">
              {results.length === 0 ? (
                <p className="text-text-muted text-sm text-center py-10">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                Object.entries(grouped).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-accent-orange text-[9px] font-mono uppercase tracking-[0.15em] px-4 pt-3 pb-1">
                      {group}
                    </p>
                    {items.map((cmd) => (
                      <button
                        key={cmd.id}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors text-sm",
                          cmd.idx === selected
                            ? "bg-accent-green/10 text-text-primary"
                            : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                        )}
                        onMouseEnter={() => setSelected(cmd.idx)}
                        onClick={cmd.run}
                      >
                        <span
                          className={cn(
                            "shrink-0 transition-colors",
                            cmd.idx === selected ? "text-accent-green" : "text-text-muted"
                          )}
                        >
                          {cmd.icon}
                        </span>
                        <span className="flex-1 font-medium">{cmd.label}</span>
                        <span className="text-text-muted text-xs truncate max-w-[150px] hidden sm:block">
                          {cmd.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-accent/15 bg-bg-primary/60">
              {[
                { k: "↑↓", l: "navigate", cls: "text-accent-green border-accent-green/30" },
                { k: "↵",  l: "open",     cls: "text-accent border-accent/30" },
                { k: "esc", l: "close",   cls: "text-accent-orange border-accent-orange/30" },
              ].map(({ k, l, cls }) => (
                <span
                  key={k}
                  className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono"
                >
                  <kbd className={`bg-bg-card border rounded px-1 py-0.5 ${cls}`}>{k}</kbd>
                  {l}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
