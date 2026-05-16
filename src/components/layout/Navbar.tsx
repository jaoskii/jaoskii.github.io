"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Command, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems, personalInfo } from "@/data/portfolio";

export function Navbar() {
  const scrolled  = useScrolled();
  const pathname  = usePathname();
  const isHome    = pathname === "/";

  const sectionIds = navItems.map((n) => n.href.replace("#", ""));
  const active     = useActiveSection(isHome ? sectionIds : []);
  const [open, setOpen]       = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("openCommandPalette"));

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — always links to home */}
        <Link
          href="/"
          className="font-mono text-accent font-semibold text-lg tracking-tight"
        >
          {personalInfo.header_nickname}.dev
        </Link>

        {isHome ? (
          /* ── Full nav (home only) ─────────────────────────────────── */
          <>
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                return (
                  <li key={item.href} className="relative pb-0.5">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "relative text-sm px-3 py-1.5 transition-colors duration-200 inline-flex items-center",
                        active === id
                          ? "text-accent"
                          : hovered === id
                          ? "text-accent-green"
                          : "text-text-secondary"
                      )}
                    >
                      <span className="relative z-10 uppercase tracking-wider text-xs">
                        {item.label}
                      </span>
                    </a>
                    {active === id && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent-green"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </li>
                );
              })}

              <li>
                <button
                  onClick={openPalette}
                  className="flex items-center gap-1.5 text-[11px] text-accent-orange border border-accent-orange/30 hover:border-accent-orange hover:bg-accent-orange/10 rounded-md px-2.5 py-1.5 transition-colors ml-2 font-mono"
                >
                  <Command size={11} />
                  <span>K</span>
                </button>
              </li>

              <li>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-1.5 border border-accent text-accent rounded hover:bg-accent hover:text-bg-primary transition-colors duration-200 ml-2"
                >
                  Resume
                </a>
              </li>
            </ul>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-text-secondary hover:text-text-primary"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </>
        ) : (
          /* ── Back to home (all other routes) ─────────────────────── */
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent-green transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            back to home
          </Link>
        )}
      </nav>

      {/* Mobile menu — home only */}
      {isHome && (
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden bg-bg-secondary border-b border-border px-6 pb-6 pt-2 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <ul className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-text-secondary hover:text-text-primary text-base block"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.04, duration: 0.2 }}
                >
                  <a href={personalInfo.resumeUrl} className="text-accent text-base">
                    Resume ↗
                  </a>
                </motion.li>
                <motion.li
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navItems.length + 1) * 0.04, duration: 0.2 }}
                >
                  <button
                    onClick={() => { setOpen(false); openPalette(); }}
                    className="flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm"
                  >
                    <Command size={13} />
                    Open command palette
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
