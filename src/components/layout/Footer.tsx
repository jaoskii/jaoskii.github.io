import { personalInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-mono">
          © {new Date().getFullYear()} {personalInfo.name}. Built with{" "}
          <span className="text-accent-orange">Next.js</span>.
        </p>
        <p className="text-text-muted text-sm">
          Designed & developed with care.
        </p>
      </div>
    </footer>
  );
}
