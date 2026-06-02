"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "ERP Usinagem",
    desc: "TCC / processos industriais",
    cmd: "./open erp-usinagem",
    type: "tcc",
    color: "#1788d1",
    link: "#",
  },
  {
    id: "02",
    title: "Mini CRM",
    desc: "pipeline simples e demonstrável",
    cmd: "./open mini-crm",
    type: "useful",
    color: "#8b5cf6",
    link: "#",
  },
  {
    id: "03",
    title: "Deploy Lab",
    desc: "GitHub Pages + QA automatizado",
    cmd: "./open deploy-lab",
    type: "useful",
    color: "#20d991",
    link: "#",
  },
  {
    id: "04",
    title: "Playground",
    desc: "experimentos de interface",
    cmd: "./open playground",
    type: "playground",
    color: "#f2d675",
    link: "#",
  },
];

const FILTERS = [
  { label: "filter --type useful", value: "useful" },
  { label: "filter --type tcc", value: "tcc" },
  { label: "filter --type playground", value: "playground" },
] as const;

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<string | null>(null);

  const filtered = activeFilter
    ? PROJECTS.filter((p) => p.type === activeFilter)
    : PROJECTS;

  return (
    <section
      id="projects"
      className="relative min-h-screen pt-[86px] overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Purple glow */}
      <div className="absolute top-1/4 right-1/4 w-1/3 h-1/2 bg-accent-purple/2 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-[58px] pt-12 md:pt-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.12, 0.23, 0.15, 0.99] as const }}
        >
          <span className="font-mono text-[10px] md:text-[13px] font-bold tracking-[1.6px] md:tracking-[2.08px] text-accent-purple">
            QFC@PROJECTS:~$ ls --useful --demo
          </span>
          <h2 className="font-mono text-[36px] md:text-[72px] font-bold leading-[0.95] text-text-primary mt-3 md:mt-4">
            Projetos como
            <br />
            apps do sistema
          </h2>
          <p className="font-sans text-[15px] md:text-[21px] leading-[1.5] text-text-secondary max-w-[590px] mt-3 md:mt-6">
            Cada módulo precisa abrir rápido, explicar o problema, mostrar a
            demo e apontar para o repo. Nada de cards genéricos.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 md:gap-3 mt-6 md:mt-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() =>
                setActiveFilter(activeFilter === f.value ? null : f.value)
              }
              className={`px-3 md:px-4 h-7 md:h-9 rounded-full font-mono text-[9px] md:text-[11px] tracking-wide border transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-accent-blue/20 border-accent-blue text-accent-blue"
                  : "bg-bg-window border-stroke-subtle text-text-secondary hover:border-accent-blue/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-[380px_300px_300px] gap-4 md:gap-x-6 md:gap-y-6 mt-6 md:mt-10">
          <AnimatePresence mode="wait">
            {filtered.slice(0, 3).map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.12, 0.23, 0.15, 0.99] as const }}
                onMouseEnter={() => setPreviewProject(project.id)}
                onMouseLeave={() => setPreviewProject(null)}
                className="relative rounded-[18px] bg-bg-surface/86 border border-stroke-subtle p-4 cursor-pointer group transition-all duration-300 hover:border-accent-blue/30"
              >
                {/* Shadow */}
                <div className="absolute -bottom-1 left-2 right-2 h-full bg-black/30 rounded-[18px] -z-10" />

                <span className="font-mono text-[11px] md:text-[12px] tracking-wide text-accent-blue">
                  {project.id}
                </span>
                <h3 className="font-sans text-[20px] md:text-[26px] font-bold leading-[1.1] text-text-primary mt-2">
                  {project.title}
                </h3>
                <p className="font-sans text-[13px] md:text-[15px] leading-[1.5] text-text-secondary mt-1">
                  {project.desc}
                </p>
                <span className="inline-block font-mono text-[11px] md:text-[12px] text-accent-blue mt-4 md:mt-6 group-hover:text-accent-green group-hover:translate-x-2 transition-all duration-300">
                  {project.cmd}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Card 04 - wide */}
        {(!activeFilter || activeFilter === "playground") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative mt-4 md:mt-6 w-full max-w-[640px] rounded-[18px] bg-bg-surface/86 border border-stroke-subtle p-4 cursor-pointer group transition-all duration-300 hover:border-accent-yellow/30"
          >
            <div className="absolute -bottom-1 left-2 right-2 h-full bg-black/30 rounded-[18px] -z-10" />
            <span className="font-mono text-[11px] md:text-[12px] tracking-wide text-accent-yellow">
              04
            </span>
            <h3 className="font-sans text-[20px] md:text-[26px] font-bold leading-[1.1] text-text-primary mt-2">
              Playground
            </h3>
            <p className="font-sans text-[13px] md:text-[15px] leading-[1.5] text-text-secondary mt-1">
              experimentos de interface
            </p>
            <span className="inline-block font-mono text-[11px] md:text-[12px] text-accent-blue mt-2 group-hover:text-accent-green group-hover:translate-x-2 transition-all duration-300">
              ./open playground
            </span>
          </motion.div>
        )}

        {/* Preview Panel */}
        <motion.div
          animate={{
            opacity: previewProject ? 1 : 0.6,
            x: previewProject ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          className="hidden xl:block absolute top-44 right-[58px] w-[388px]"
        >
          <div className="rounded-[16px] bg-bg-window/90 border border-stroke-subtle overflow-hidden">
            <div className="h-14 bg-bg-surface/40 border-b border-stroke-subtle flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-red/65" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent-purple/65" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent-blue/65" />
              <span className="font-mono text-[20px] font-medium tracking-[0.72px] text-text-secondary ml-3">
                preview.panel
              </span>
            </div>
            <div className="p-6">
              <p className="font-mono text-[14px] leading-[1.8] text-accent-blue">
                {">"} hover app-card
                <br />
                {">"} reveal: problema / demo / repo
                <br />
                {">"} modal desktop
                <br />
                {">"} sheet mobile
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
