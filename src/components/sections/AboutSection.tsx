"use client";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { personalInfo } from "@/data/portfolio";

const stats = [
  { value: "5+", label: "Years experience" },
  { value: "30+", label: "Projects shipped" },
  { value: "10M+", label: "API reqs/month" },
  { value: "3", label: "Engineers mentored" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeader label="About me" title="Shipping code with purpose." />

            <div className="space-y-4 text-text-secondary leading-relaxed mb-8">
              <p>
                I&apos;m a full-stack developer based in{" "}
                <span className="text-text-primary">{personalInfo.location}</span>,
                passionate about building software that genuinely improves how
                people work and live. I&apos;m equally comfortable deep in a
                database schema as I am polishing pixel-perfect UI.
              </p>
              <p>
                My background spans startups and agencies, giving me a bias
                toward pragmatic, well-architected solutions that ship on time.
                I believe great software is an intersection of good engineering
                and thoughtful design.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-accent" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail size={15} className="text-accent" />
                {personalInfo.email}
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => {
              const valueColor = [
                "text-accent",
                "text-accent-green",
                "text-accent-orange",
                "text-accent",
              ][i];
              return (
                <div
                  key={i}
                  className="bg-bg-card border border-border rounded-lg p-6 hover:border-border-light transition-colors duration-200"
                >
                  <p className={`text-3xl font-bold mb-1 ${valueColor}`}>{stat.value}</p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
