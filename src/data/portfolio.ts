import { Project, Skill, Experience, NavItem } from "@/types";

export const personalInfo = {
  name: "Rajhi John Tabora",
  header_nickname: "jaoski",
  nickname: "jao",
  title: "Full-Stack Developer",
  tagline: "I build fast, scalable web products.",
  bio: "I'm a full-stack engineer with 5+ years crafting end-to-end digital experiences. I care deeply about clean code, thoughtful architecture, and interfaces that get out of the user's way.",
  location: "Manila, Philippines",
  email: "dev.rtabora@gmail.com",
  github: "https://github.com/jaoski",
  linkedin: "https://linkedin.com/in/jaoski",
  twitter: "https://twitter.com/jaoski",
  resumeUrl: "/resume.pdf",
  availableForWork: true,
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Forge Dashboard",
    description:
      "A real-time analytics platform for SaaS companies. Built with Next.js, tRPC, and Prisma with WebSocket-powered live data feeds.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "WebSockets"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    year: "2024",
    screenshots: ["Dashboard Overview", "Real-time Analytics", "WebSocket Live Feed", "User Management"],
  },
  {
    id: "2",
    title: "Meridian API",
    description:
      "A high-throughput REST & GraphQL API serving 10M+ monthly requests. Implements JWT auth, rate limiting, and Redis caching.",
    tags: ["Node.js", "GraphQL", "Redis", "Docker", "AWS"],
    repoUrl: "https://github.com",
    featured: true,
    year: "2024",
    screenshots: ["API Explorer", "GraphQL Playground", "Rate Limit Monitor", "Auth Flow"],
  },
  {
    id: "3",
    title: "Lumen UI",
    description:
      "An open-source component library with 40+ accessible components. Zero runtime dependencies, full TypeScript support.",
    tags: ["React", "TypeScript", "Storybook", "Rollup"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    year: "2023",
    screenshots: ["Component Library", "Storybook Stories", "Dark Mode Preview", "Accessibility Panel"],
  },
  {
    id: "4",
    title: "Orbit CMS",
    description:
      "A headless CMS with a drag-and-drop page builder, multi-tenant support, and a plugin ecosystem.",
    tags: ["Next.js", "Payload CMS", "MongoDB", "S3"],
    liveUrl: "https://example.com",
    featured: false,
    year: "2023",
    screenshots: ["Page Builder", "Content Editor", "Plugin Manager", "Multi-tenant View"],
  },
  {
    id: "5",
    title: "PulseTrack",
    description:
      "Lightweight uptime monitoring tool with Slack/email alerts and a public status page generator.",
    tags: ["Go", "React", "SQLite", "Cron"],
    repoUrl: "https://github.com",
    featured: false,
    year: "2022",
    screenshots: ["Status Dashboard", "Alert Configuration", "Uptime Timeline"],
  },
  {
    id: "6",
    title: "Frostbite CLI",
    description:
      "Developer CLI for scaffolding full-stack projects with opinions on linting, formatting, and deployment.",
    tags: ["Node.js", "Commander.js", "Handlebars"],
    repoUrl: "https://github.com",
    featured: false,
    year: "2022",
    screenshots: ["CLI Interface", "Project Scaffold", "Config Wizard"],
  },
];

export const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Go", "Python", "REST APIs", "GraphQL", "tRPC"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Drizzle ORM"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx", "Terraform"],
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "Storybook", "Vitest", "Playwright", "Linear"],
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Full-Stack Engineer",
    company: "Syncwave Inc.",
    period: "Jan 2022 — Present",
    description:
      "Lead engineer on the core product team, owning the entire stack from database schema to UI components.",
    highlights: [
      "Reduced API response times by 60% via query optimization and Redis caching",
      "Architected a multi-tenant SaaS system serving 500+ enterprise clients",
      "Mentored 3 junior engineers through structured code reviews",
    ],
    type: "full-time",
  },
  {
    id: "2",
    role: "Full-Stack Developer",
    company: "Pixel Foundry",
    period: "Mar 2020 — Dec 2021",
    description:
      "Shipped client products across fintech, e-commerce, and healthcare verticals.",
    highlights: [
      "Delivered 8 production apps on time and under budget",
      "Built a reusable component library cutting UI dev time by 40%",
      "Integrated third-party payment processors (Stripe, PayMongo)",
    ],
    type: "full-time",
  },
  {
    id: "3",
    role: "Frontend Engineer",
    company: "Freelance",
    period: "Jun 2019 — Feb 2020",
    description:
      "Designed and built marketing sites and web apps for local startups and SMEs.",
    highlights: [
      "Completed 15+ projects across various industries",
      "Maintained 100% client satisfaction rate",
    ],
    type: "freelance",
  },
];
