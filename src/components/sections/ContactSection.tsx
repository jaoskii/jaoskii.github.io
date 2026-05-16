"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { personalInfo } from "@/data/portfolio";

const links = [
  { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: Mail, color: "text-accent" },
  { label: "GitHub", value: "github.com/alexrivera", href: personalInfo.github, icon: Github, color: "text-accent-green" },
  { label: "LinkedIn", value: "linkedin.com/in/alexrivera", href: personalInfo.linkedin, icon: Linkedin, color: "text-accent" },
  { label: "Twitter", value: "@alexrivera", href: personalInfo.twitter, icon: Twitter, color: "text-accent-orange" },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader label="Contact" title="Let's work together." />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-text-secondary leading-relaxed mb-8">
              I&apos;m currently{" "}
              <span className="text-accent">
                {personalInfo.availableForWork ? "open to new opportunities" : "not actively looking"}
              </span>
              . Whether you have a project in mind, want to collaborate, or just
              want to say hi — my inbox is always open.
            </p>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary font-semibold rounded text-sm hover:bg-accent-dim transition-colors duration-200"
            >
              <Mail size={16} />
              Say hello
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {links.map(({ label, value, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-bg-card border border-border rounded-lg hover:border-border-light group transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={color} />
                  <div>
                    <p className="text-xs text-text-muted font-mono">{label}</p>
                    <p className="text-text-secondary text-sm">{value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-text-muted group-hover:text-accent transition-colors"
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
