      "use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STAGGER_DELAY = 0.12;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.12, 0.23, 0.15, 0.99] as const,
    },
  },
};

const bootLines = [
  "[ OK ] kernel.qfc — loaded",
  "[ OK ] network.github — connected",
  "[ RUN ] desktop.pages — init",
  "[ OK ] shell.qfc — ready",
];

const TYPING_TEXT = "$ git log --oneline carreira_";

export function BootSection() {
  const [bootPhase, setBootPhase] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [typedChars, setTypedChars] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  // Boot sequence
  useEffect(() => {
    if (bootPhase < bootLines.length) {
      const timer = setTimeout(
        () => setBootPhase((p) => p + 1),
        200 + Math.random() * 300
      );
      return () => clearTimeout(timer);
    } else {
      // Start typing after boot
      const t = setTimeout(() => setBootComplete(true), 400);
      return () => clearTimeout(t);
    }
  }, [bootPhase]);

  // Typing animation
  useEffect(() => {
    if (!bootComplete) return;
    if (typedChars.length < TYPING_TEXT.length) {
      const timer = setTimeout(() => {
        setTypedChars(TYPING_TEXT.slice(0, typedChars.length + 1));
      }, 30 + Math.random() * 50);
      return () => clearTimeout(timer);
    } else {
      const t = setTimeout(() => setTypingDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [bootComplete, typedChars]);

  return (
    <section
      id="boot"
      className="relative min-h-screen pt-[86px] overflow-hidden scanlines"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-accent-blue/3 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-[58px] min-h-[calc(100vh-86px)] flex items-start pt-12 md:pt-20">
        <motion.div
          className="flex-1 max-w-[880px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Boot kicker */}
          <motion.div variants={itemVariants} className="mb-2">
            <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-1">
              {bootLines.slice(0, bootPhase).map((line, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] md:text-[12px] tracking-[0.96px] text-accent-blue"
                >
                  {line}
                </span>
              ))}
              {bootPhase <= bootLines.length && bootPhase < bootLines.length && (
                <span className="font-mono text-[10px] md:text-[12px] text-accent-blue animate-pulse">
                  _
                </span>
              )}
            </div>
          </motion.div>

          {/* Prompt */}
          <motion.div variants={itemVariants} className="mt-4 md:mt-6">
            <span className="font-mono text-[10px] md:text-[13px] font-bold tracking-[1.6px] md:tracking-[2.08px] text-accent-purple">
              QFC@PORTFOLIO:~$ ./START-DESKTOP.SH
            </span>
          </motion.div>

          {/* Hero name */}
          <motion.h1
            variants={itemVariants}
            className="font-mono text-[40px] md:text-[88px] font-bold leading-[0.9] md:leading-[0.88] text-hero-blue mt-3 md:mt-4"
          >
            Quésede
            <br />
            Filipe
            <br />
            Constantino
          </motion.h1>

          {/* Typing line */}
          <motion.div variants={itemVariants} className="mt-5 md:mt-8 h-[24px] md:h-[36px]">
            {bootComplete && (
              <span className="font-mono text-[13px] md:text-[22px] text-accent-blue">
                {typedChars}
                {!typingDone && (
                  <span className="animate-pulse">_</span>
                )}
              </span>
            )}
          </motion.div>

          {/* Body copy */}
          <motion.p
            variants={itemVariants}
            className="mt-3 md:mt-4 font-sans text-[15px] md:text-[24px] leading-[1.45] text-text-secondary max-w-[700px]"
          >
            Agora o portfólio funciona como um pequeno sistema: cada área tem
            sua própria página, e o terminal é o centro de tudo.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 md:gap-4 mt-8 md:mt-12">
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center px-4 md:px-6 h-10 md:h-12 rounded-[9px] bg-accent-blue/95 text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[1.2px] md:tracking-[1.44px] hover:bg-accent-blue transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ./OPEN PROJETOS
            </motion.a>
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center px-3 md:px-5 h-10 md:h-12 rounded-[9px] bg-bg-surface border border-stroke-subtle text-text-secondary font-mono text-[10px] md:text-[12px] font-bold tracking-[1.2px] md:tracking-[1.44px] hover:border-accent-blue/50 hover:text-text-primary transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ./OPEN TCC
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Status Window — Mac Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.8,
            ease: [0.12, 0.23, 0.15, 0.99] as const,
          }}
          className="hidden lg:block w-[400px] shrink-0 mt-12"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(23, 136, 209, 0)",
                "0 0 0 1px rgba(23, 136, 209, 0.08)",
                "0 0 0 0px rgba(23, 136, 209, 0)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[12px] overflow-hidden shadow-2xl"
            style={{
              background: "#000",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
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
                status.log — bash
              </span>
            </div>

            {/* Terminal content */}
            <div
              className="p-5 font-mono text-[13px] leading-[1.65]"
              style={{ background: "#000", color: "#e4e4e4" }}
            >
              <p className="text-[#58d68d]">
                $ systemctl status portfolio --active
              </p>
              <div className="mt-2 space-y-1.5">
                <p>
                  <span className="text-[#5dade2]">●</span> portfolio.service
                  —{" "}
                  <span className="text-[#58d68d]">active (running)</span>
                </p>
                <p className="opacity-60">Loaded: loaded</p>
                <p className="opacity-60">
                  Active: active (running) since 2026
                </p>
                <p className="opacity-60">Process: 1 running</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[#5dade2]">
                  ▸ <span className="text-white/80">Status:</span>{" "}
                  <span className="text-[#58d68d]">Disponível</span>
                </p>
                <p className="text-[#5dade2]">
                  ▸ <span className="text-white/80">Formação:</span>{" "}
                  <span className="text-white/60">
                    Técnico em Desenvolvimento de Sistemas
                  </span>
                </p>
                <p className="text-[#5dade2]">
                  ▸ <span className="text-white/80">Base:</span>{" "}
                  <span className="text-white/60">
                    Administração, compras, contratos, financeiro
                  </span>
                </p>
                <p className="text-[#5dade2]">
                  ▸ <span className="text-white/80">Projetos:</span>{" "}
                  <span className="text-white/60">
                    Pequenos, úteis e demonstráveis
                  </span>
                </p>
              </div>

              <div className="mt-4 flex items-center">
                <span className="text-[#f7dc6f]">
                  quesede@qfc-os ~ %
                </span>
                <span className="ml-2 w-2 h-4 bg-[#e4e4e4] animate-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[1.2px] text-text-muted">
          SCROLL PARA EXPLORAR
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-4 border-r border-b border-text-muted rotate-45"
        />
      </motion.div>
    </section>
  );
}
