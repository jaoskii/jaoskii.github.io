"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader label="Skills" title="My tech stack." />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => {
            const [headingColor, dotColor] = [
              ["text-accent", "bg-accent"],
              ["text-accent-green", "bg-accent-green"],
              ["text-accent-orange", "bg-accent-orange"],
              ["text-accent-green", "bg-accent-green"],
              ["text-accent-orange", "bg-accent-orange"],
            ][i] ?? ["text-accent", "bg-accent"];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-bg-card border border-border rounded-lg p-6"
              >
                <h3 className={`${headingColor} font-mono text-sm tracking-widest uppercase mb-5`}>
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} opacity-60 flex-shrink-0`} />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
