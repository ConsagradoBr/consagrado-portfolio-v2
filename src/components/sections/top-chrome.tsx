"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

// ─── Nav: only actual pages ───
const NAV_ITEMS = [
  { label: "~/INÍCIO", short: "INI", id: "boot" },
  { label: "~/PROJETOS", short: "PROJ", id: "projects" },
  { label: "~/STACK", short: "STACK", id: "stack" },
  { label: "~/CONTATO", short: "CONT", id: "contact" },
];

const PALETTE_COMMANDS = [
  { cmd: "cd ~/inicio", label: "Início / Boot", id: "boot" },
  { cmd: "cd ~/projetos", label: "Projetos como apps", id: "projects" },
  { cmd: "cd ~/stack", label: "Sistema / Stack", id: "stack" },
  { cmd: "ssh contato@qfc", label: "Contato / Terminal", id: "contact" },
];

// ─── Neofetch-style ASCII for the palette ───
const QFC_LOGO = [
  "  ██████  ███████  ██████  ██████   ██████",
  " ██       ██      ██      ██   ██ ██     ",
  " ██  ███  █████   ██      ██████  ██  ███",
  " ██   ██  ██      ██      ██   ██ ██   ██",
  "  █████   ██       ██████ ██   ██  █████ ",
];

const SYS_INFO = [
  "OS:      QFC-OS v2.0.0",
  "Host:    Portfolio Terminal",
  "Kernel:  Next.js 16.2.7",
  "Shell:   bash 5.2+",
  "Uptime:  ativo desde 2026",
  "Status:  available",
];

// ─── Killua Zoldyck ASCII art ───
const KILLUA_OPEN = [
  "      ╔══════════════╗      ",
  "   ╔══╝   ╔══════╗   ╚══╗   ",
  "  ╔╝     ╔╝ ▄▄▄▄ ╚╗     ╚╗  ",
  " ╔╝  ╔══╗╚╗ ████ ╔╝╔══╗  ╚╗ ",
  " ║  ╔╝  ╚╗╚╗ ██ ╔╝╔╝  ╚╗  ║ ",
  " ║  ║ ██ ║ ╚╗  ╔╝ ║ ██ ║  ║ ",
  " ║  ║ ██ ║  ╚══╝  ║ ██ ║  ║ ",
  " ║  ╚╗    ╚══════╝╔╝    ╔╝  ║ ",
  " ║   ╚╗  ╔══════╗ ╔╝   ╔╝   ║ ",
  " ║    ╚╗ ╚══════╝ ╔╝   ╔╝    ║ ",
  " ║     ╚══════════╝    ╔╝     ║ ",
  " ║   ╔══════════════╗  ╔╝     ║ ",
  " ║   ║  ⚡      ⚡   ║  ╔╝     ║ ",
  " ║   ╚══════════════╝ ╔╝      ║ ",
  " ╚╗                  ╔╝      ╔╝ ",
  "  ╚╗                ╔╝       ╔╝  ",
  "   ╚╗              ╔╝       ╔╝   ",
  "    ╚══════════════╝        ╔╝    ",
];

const KILLUA_CLOSED = [
  "      ╔══════════════╗      ",
  "   ╔══╝   ╔══════╗   ╚══╗   ",
  "  ╔╝     ╔╝ ▄▄▄▄ ╚╗     ╚╗  ",
  " ╔╝  ╔══╗╚╗ ████ ╔╝╔══╗  ╚╗ ",
  " ║  ╔╝  ╚╗╚╗ ██ ╔╝╔╝  ╚╗  ║ ",
  " ║  ║    ║ ╚╗  ╔╝ ║    ║  ║ ",
  " ║  ║    ║  ╚══╝  ║    ║  ║ ",
  " ║  ╚╗    ╚══════╝╔╝    ╔╝  ║ ",
  " ║   ╚╗  ╔══════╗ ╔╝   ╔╝   ║ ",
  " ║    ╚╗ ╚══════╝ ╔╝   ╔╝    ║ ",
  " ║     ╚══════════╝    ╔╝     ║ ",
  " ║   ╔══════════════╗  ╔╝     ║ ",
  " ║   ║  ⚡      ⚡   ║  ╔╝     ║ ",
  " ║   ╚══════════════╝ ╔╝      ║ ",
  " ╚╗                  ╔╝      ╔╝ ",
  "  ╚╗                ╔╝       ╔╝  ",
  "   ╚╗              ╔╝       ╔╝   ",
  "    ╚══════════════╝        ╔╝    ",
];

const KILLUA_SPARK = [
  "      ╔══════════════╗      ",
  "   ╔══╝   ╔══════╗   ╚══╗   ",
  "  ╔╝  ╔══╗╔╝ ▄▄ ╚╗╔══╗  ╚╗  ",
  " ╔╝  ║██║╚╗ ████ ╔╝║██║  ╚╗ ",
  " ║  ╔╝  ╚╗╚╗ ██ ╔╝╔╝  ╚╗  ║ ",
  " ║  ║ ██ ║ ╚╗  ╔╝ ║ ██ ║  ║ ",
  " ║  ║ ██ ║  ╚══╝  ║ ██ ║  ║ ",
  " ║  ╚╗    ╚══════╝╔╝    ╔╝  ║ ",
  " ║   ╚╗  ╔══════╗ ╔╝   ╔╝   ║ ",
  " ║    ╚╗ ╚══════╝ ╔╝   ╔╝    ║ ",
  " ║     ╚══════════╝ ╔══╗ ╔╝   ║ ",
  " ║   ╔══════════════╗ ╚╗╔╝    ║ ",
  " ║   ║  ⚡══════⚡  ║  ╚╝     ║ ",
  " ║   ╚══════════════╝         ║ ",
  " ╚╗                          ╔╝ ",
  "  ╚╗                        ╔╝  ",
  "   ╚╗                      ╔╝   ",
  "    ╚══════════════════════╝    ",
];

function useKillua() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return KILLUA_FRAMES[frame];
}

const KILLUA_FRAMES = [KILLUA_OPEN, KILLUA_CLOSED, KILLUA_SPARK];

function TerminalKilluaScene() {
  const art = useKillua();

  return (
    <pre
      className="font-mono text-[9px] leading-[1.25]"
      style={{ color: "rgba(255,255,255,0.15)" }}
    >
      {art.map((line, ri) => (
        <div key={ri} className="flex">
          {line.split("").map((cell, ci) => {
            // Color specific characters
            let color: string | undefined;
            if (cell === "⚡") color = "#f7dc6f";
            else if (cell === "█") color = "#5dade2";
            else if (cell === "●" || cell === "◉") color = "#5dade2";
            else if (cell === "▄" || cell === "▀") color = "rgba(255,255,255,0.2)";
            else if ("╔╗╚╝═║".includes(cell)) color = "rgba(255,255,255,0.1)";
            return (
              <span
                key={ci}
                style={{ color, textShadow: cell === "⚡" ? "0 0 4px #f7dc6f" : undefined }}
              >
                {cell}
              </span>
            );
          })}
        </div>
      ))}
    </pre>
  );
}

// ─── Component ───
export function TopChrome() {
  const [activeSection, setActiveSection] = useState("boot");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (!e.metaKey && !e.ctrlKey && !isNaN(Number(e.key))) {
        const num = Number(e.key);
        if (num >= 1 && num <= 4) {
          const sections = ["boot", "projects", "stack", "contact"];
          scrollTo(sections[num - 1]);
        }
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollTo]);

  // Track active section
  useEffect(() => {
    const sections = ["boot", "projects", "stack", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div>
      {/* ─── Header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[52px] backdrop-blur-md"
        style={{
          background: "rgba(0,0,0,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center h-full px-4 md:px-[58px] max-w-[1440px] mx-auto">
          {/* Mac traffic light dots + brand */}
          <div className="flex items-center gap-1.5 md:gap-2 mr-3 md:mr-6">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
          </div>

          <motion.button
            onClick={() => scrollTo("boot")}
            className="font-mono text-[11px] md:text-[12px] font-bold tracking-[1.04px] text-[#5dade2] hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
          >
            QFC-OS
          </motion.button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 ml-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-mono text-[11px] font-semibold tracking-[1.6px] transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile nav — short labels */}
          <nav className="flex md:hidden items-center gap-1.5 ml-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-mono text-[9px] font-semibold tracking-[1.2px] transition-all duration-200 px-1.5 ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.short}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Terminal button — Mac style */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 md:gap-2 h-7 md:h-8 px-2 md:px-3 rounded-[6px] font-mono text-[10px] md:text-[11px] font-semibold tracking-[1.2px] transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
            }
          >
            <span className="hidden md:inline">TERMINAL</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>⌘K</span>
          </button>

          {/* CV button */}
          <motion.a
            href="/curriculo.pdf"
            target="_blank"
            className="ml-1 md:ml-2 flex items-center h-7 md:h-8 px-2 md:px-4 rounded-[6px] font-mono text-[10px] md:text-[11px] font-semibold tracking-[1.2px] text-white transition-all duration-200"
            style={{ background: "rgba(93, 173, 226, 0.2)" }}
            whileHover={{ background: "rgba(93, 173, 226, 0.35)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="hidden md:inline">cat currículo.pdf</span>
            <span className="md:hidden">CV</span>
          </motion.a>
        </div>
      </header>

      {/* ─── Command Palette — Mac Terminal ─── */}
      {commandPaletteOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[100px]"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.25,
              ease: [0.12, 0.23, 0.15, 0.99],
            }}
            className="w-[90vw] max-w-[520px] rounded-[12px] overflow-hidden shadow-2xl"
            style={{
              background: "#000",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Mac Terminal Chrome */}
              <div
                className="h-9 flex items-center px-4 gap-2 select-none"
                style={{ background: "#1c1c1e" }}
              >
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span
                  className="font-mono text-[11px] ml-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  command.palette — zsh
                </span>
              </div>

              {/* Terminal Body */}
              <div
                className="p-3 md:p-4 font-mono text-[12px] md:text-[13px] leading-[1.5]"
                style={{ background: "#000", color: "#e4e4e4" }}
              >
                {/* Pac-Man + Neofetch scene */}
                <div className="relative">
                  <TerminalKilluaScene />

                  {/* Overlay logo + sysinfo on top of the grid */}
                  <div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    style={{ marginTop: 8 }}
                  >
                    <div className="flex gap-3 md:gap-6">
                      <pre
                        className="text-[7px] md:text-[10px] leading-[1.2] md:leading-[1.3]"
                        style={{ color: "#5dade2" }}
                      >
                        {QFC_LOGO.join("\n")}
                      </pre>
                      <div className="text-[9px] md:text-[11px] space-y-0.5 pt-0.5">
                        <p className="text-[#58d68d]">
                          <span className="text-white/80">user</span>
                          <span className="opacity-40">@</span>
                          <span className="text-[#5dade2]">qfc-os</span>
                        </p>
                        <p className="opacity-30">──────────────────</p>
                        {SYS_INFO.map((line, i) => (
                          <p key={i} className="opacity-70">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Command items */}
                <div className="mt-3 space-y-0.5 border-t border-white/5 pt-3">
                  <p className="text-[11px] opacity-30 uppercase tracking-wider mb-2">
                    Navegação
                  </p>
                  {PALETTE_COMMANDS.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        scrollTo(item.id);
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-left transition-colors duration-100"
                      style={{ background: "transparent" }}
                      whileHover={{ x: 4 }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#58d68d" }}
                      />
                      <span style={{ color: "#5dade2" }}>{item.cmd}</span>
                      <span className="opacity-40">— {item.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-4 text-[10px] opacity-30">
                  <span>↑↓ navegar</span>
                  <span>↵ abrir</span>
                  <span>ESC fechar</span>
                  <span className="ml-auto" suppressHydrationWarning>
                    {new Date().toLocaleTimeString("pt-BR")}
                  </span>
                </div>
              </div>
          </motion.div>
        </div>
        )}
    </div>
  );
}
