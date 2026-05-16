"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Github, Linkedin, Twitter, Mail, FileText, ArrowUp } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

function DockItem({
  mouseX,
  icon,
  label,
  onClick,
}: {
  mouseX: MotionValue<number>;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? val - r.left - r.width / 2 : 0;
  });

  const sizeRaw = useTransform(distance, [-100, 0, 100], [36, 52, 36]);
  const size = useSpring(sizeRaw, { stiffness: 350, damping: 25, mass: 0.4 });

  return (
    <div className="relative group flex flex-col items-center justify-end">
      {/* Tooltip */}
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-bg-secondary border border-border text-text-primary text-[10px] font-mono px-2 py-1 rounded-md pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
        {label}
      </span>
      <motion.button
        ref={ref}
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.82 }}
        onClick={onClick}
        title={label}
        className="flex items-center justify-center rounded-xl bg-bg-card border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors shrink-0"
      >
        {icon}
      </motion.button>
    </div>
  );
}

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const social = [
    {
      label: "GitHub",
      icon: <Github size={15} />,
      action: () => window.open(personalInfo.github, "_blank"),
    },
    {
      label: "LinkedIn",
      icon: <Linkedin size={15} />,
      action: () => window.open(personalInfo.linkedin, "_blank"),
    },
    {
      label: "Twitter",
      icon: <Twitter size={15} />,
      action: () => window.open(personalInfo.twitter, "_blank"),
    },
    {
      label: "Email",
      icon: <Mail size={15} />,
      action: () => {
        window.location.href = `mailto:${personalInfo.email}`;
      },
    },
  ];

  const actions = [
    {
      label: "Resume",
      icon: <FileText size={15} />,
      action: () => window.open(personalInfo.resumeUrl, "_blank"),
    },
    {
      label: "Back to top",
      icon: <ArrowUp size={15} />,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
  ];

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
    >
      <div
        className="flex items-end gap-2 bg-bg-secondary/80 backdrop-blur-md border border-border px-3 py-2.5 rounded-2xl shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {social.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            onClick={item.action}
          />
        ))}
        <div className="w-px h-6 bg-border mx-1 self-center" />
        {actions.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            onClick={item.action}
          />
        ))}
      </div>
    </motion.div>
  );
}
