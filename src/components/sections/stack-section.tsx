"use client";

import { motion } from "framer-motion";

const MODULES = [
  {
    name: "Frontend",
    pid: "PID 001",
    status: "running" as const,
    color: "#1788d1",
    items: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    name: "Automação",
    pid: "PID 002",
    status: "running" as const,
    color: "#20d991",
    items: ["Python", "Bash", "GitHub Actions", "Playwright"],
  },
  {
    name: "Infra",
    pid: "PID 003",
    status: "running" as const,
    color: "#8b5cf6",
    items: ["Docker", "Nginx", "VPS", "Cloudflare"],
  },
  {
    name: "Dados",
    pid: "PID 004",
    status: "running" as const,
    color: "#f2d675",
    items: ["PostgreSQL", "SQLite", "Redis", "Prisma"],
  },
  {
    name: "Deploy",
    pid: "PID 005",
    status: "stopped" as const,
    color: "#ff6b6b",
    items: ["GitHub Pages", "Vercel", "Render", "PM2"],
  },
  {
    name: "Ferramentas",
    pid: "PID 006",
    status: "running" as const,
    color: "#1788d1",
    items: ["Penpot", "Notion", "Figma", "Linear"],
  },
];

export function StackSection() {
  return (
    <section
      id="stack"
      className="relative min-h-screen pt-[86px] overflow-hidden"
    >
      {/* Grid overlay + steel glow */}
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-accent-steel/2 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-[58px] pt-12 md:pt-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.12, 0.23, 0.15, 0.99] }}
        >
          <span className="font-mono text-[10px] md:text-[13px] font-bold tracking-[1.6px] md:tracking-[2.08px] text-accent-purple">
            QFC@STACK:~$ cat /etc/os-release
          </span>
          <h2 className="font-mono text-[36px] md:text-[72px] font-bold leading-[0.95] text-text-primary mt-3 md:mt-4">
            Stack como
            <br />
            módulos do sistema
          </h2>
          <p className="font-sans text-[15px] md:text-[21px] leading-[1.5] text-text-secondary max-w-[560px] mt-3 md:mt-6">
            Cada tecnologia instalada com propósito. Sem listas genéricas — cada
            módulo explica uso real.
          </p>
        </motion.div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-14">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.12, 0.23, 0.15, 0.99],
              }}
              className="relative rounded-[16px] bg-bg-surface/86 border border-stroke-subtle p-3 md:p-5 group hover:border-accent-blue/30 hover:bg-bg-surface transition-all duration-300"
            >
              {/* Shadow */}
              <div className="absolute -bottom-1 left-2 right-2 h-full bg-black/30 rounded-[16px] -z-10" />

              {/* Header */}
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span
                  className="font-mono text-[9px] md:text-[10px] tracking-[1.2px] px-1.5 md:px-2 py-0.5 md:py-1 rounded-[4px] border"
                  style={{
                    borderColor: mod.color,
                    color: mod.color,
                    background: `${mod.color}15`,
                  }}
                >
                  {mod.pid}
                </span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  {mod.status === "running" ? (
                    <motion.span
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full block"
                      style={{ backgroundColor: "#20d991" }}
                      animate={{ opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <span
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full block"
                      style={{ backgroundColor: "#ff6b6b" }}
                    />
                  )}
                  <span className="font-mono text-[8px] md:text-[10px] text-text-muted uppercase tracking-[1px]">
                    {mod.status}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h3
                className="font-mono text-[17px] md:text-[22px] font-bold leading-[1.1]"
                style={{ color: mod.color }}
              >
                {mod.name}
              </h3>

              {/* Items */}
              <div className="mt-3 md:mt-4 space-y-0.5 md:space-y-1">
                {mod.items.map((item) => (
                  <span
                    key={item}
                    className="block font-sans text-[12px] md:text-[14px] leading-[1.6] text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="absolute bottom-8 left-4 md:left-[58px] font-mono text-[10px] md:text-[12px] tracking-[0.96px] text-text-muted">
        interaction: module hover → expand detail view; 1-6 select module
      </p>
    </section>
  );
}
