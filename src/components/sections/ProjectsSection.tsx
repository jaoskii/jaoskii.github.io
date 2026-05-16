"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const visible = showAll ? projects : featured;

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader label="Work" title="Things I've built." />
        </motion.div>

        {/* Featured grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {visible.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-bg-card border border-border rounded-lg p-6 flex flex-col hover:border-border-light transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs text-accent-orange">{project.year}</span>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub repo"
                      className="text-text-muted hover:text-accent-green transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live site"
                      className="text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-text-primary font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} label={tag} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
          {rest.length > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-text-secondary hover:text-accent transition-colors duration-200 font-mono"
            >
              {showAll ? "Show less ↑" : `Show ${rest.length} more ↓`}
            </button>
          )}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-mono text-accent-orange hover:text-accent-orange/80 transition-colors"
          >
            View full showcase <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
