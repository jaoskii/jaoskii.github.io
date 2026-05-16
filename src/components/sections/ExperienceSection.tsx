"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader label="Experience" title="Where I've worked." />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="md:pl-16 relative"
              >
                {/* Dot */}
                <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-accent-green animate-pulse" : "bg-accent"}`} />
                </div>

                <div className="bg-bg-card border border-border rounded-lg p-6 hover:border-border-light transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-text-primary font-semibold text-lg">
                        {exp.role}
                      </h3>
                      <p className="text-accent text-sm font-mono">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-text-muted text-xs font-mono">
                        {exp.period}
                      </span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded font-mono",
                          exp.type === "freelance"
                            ? "bg-accent-orange/10 text-accent-orange"
                            : "bg-accent/10 text-accent"
                        )}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Briefcase size={13} className="text-accent-green mt-0.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
