"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── ASCII Art ───

const NEOFETCH_LINES = [
  "       ▄▄▄▄▄▄▄▄▄▄▄        ",
  "    ▄███████████████▄     ",
  "   ███████████████████    ",
  "   ███████████████████    ",
  "   ████▀▀▀▀▀▀▀▀▀█████    ",
  "   ████   QFC-OS  ████    ",
  "   ████  v2.0.0   ████    ",
  "   ████▄▄▄▄▄▄▄▄▄█████    ",
  "   ███████████████████    ",
  "    ▀███████████████▀     ",
  "       ▀▀▀▀▀▀▀▀▀▀▀        ",
];

const PRESET_COMMANDS = [
  {
    cmd: "mail --to quesede",
    label: "Enviar email",
    color: "#5dade2",
    action: "mailto:quesede@email.com",
  },
  {
    cmd: "open github",
    label: "Ver repositórios",
    color: "#58d68d",
    action: "https://github.com/consagradobr",
  },
  {
    cmd: "cat curriculo.pdf",
    label: "Baixar currículo",
    color: "#af7ac5",
    action: "/curriculo.pdf",
  },
  {
    cmd: "open linkedin",
    label: "Abrir LinkedIn",
    color: "#f7dc6f",
    action: "https://linkedin.com/in/consagradobr",
  },
];

interface LogEntry {
  type: "input" | "output" | "system";
  text: string;
}

export function ContactSection() {
  const [input, setInput] = useState("");
  const [showAscii, setShowAscii] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleString("pt-BR"));
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("pt-BR"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Focus input when contact section scrolls into view
  useEffect(() => {
    if (!contactRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => inputRef.current?.focus(), 300);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    try {
      const saved = localStorage.getItem("qfc-session-log");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Focus input when terminal is clicked
  const [inputFocused, setInputFocused] = useState(false);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const addLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => {
      const next = [...prev, entry];
      // Persist to localStorage (keep max 200 lines)
      try {
        const trimmed = next.slice(-200);
        localStorage.setItem("qfc-session-log", JSON.stringify(trimmed));
      } catch {}
      return next;
    });
  }, [setLogs]);

  const executeCommand = useCallback((raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    addLog({ type: "input", text: cmd });

    const parts = cmd.split(/\s+/);
    const main = parts[0].toLowerCase();
    const args = parts.slice(1);
    const fullCmd = parts.join(" ");

    // Built-in commands
    switch (main) {
      case "help":
        addLog({ type: "output", text: `Comandos disponíveis:
  help                  — mostra esta mensagem
  ls                    — lista seções do sistema
  cd ~/<secao>          — navega para uma seção
  clear                 — limpa o terminal
  whoami                — mostra identidade
  date                  — data e hora atual
  neofetch              — mostra/oculta ASCII art
  echo <texto>          — repete o texto
  mail --to quesede     — enviar email
  open github           — abrir GitHub
  open linkedin         — abrir LinkedIn
  cat curriculo.pdf     — baixar currículo` });
        return;

      case "ls": {
        const sections = [
          { name: "boot", desc: "Início / Terminal Principal" },
          { name: "projects", desc: "Projetos como apps do sistema" },
          { name: "stack", desc: "Módulos da stack instalada" },
          { name: "contact", desc: "Sessão SSH / Contato" },
        ];
        const lines = sections.map(
          (s) => `  ${s.name.padEnd(14)} ${s.desc}`
        );
        addLog({ type: "output", text: `Seções do sistema:\n${lines.join("\n")}` });
        return;
      }

      case "cd": {
        const target = args[0]?.replace(/^~\//, "");
        const sections = ["boot", "projects", "stack", "contact"];
        if (target && sections.includes(target)) {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          addLog({ type: "output", text: `Navegando para ~/${target}...` });
        } else if (!target) {
          addLog({ type: "output", text: `Uso: cd ~/<secao>\nSeções: ${sections.join(", ")}` });
        } else {
          addLog({ type: "output", text: `cd: ${target}: seção não encontrada` });
        }
        return;
      }

      case "clear":
        setLogs([]);
        try { localStorage.removeItem("qfc-session-log"); } catch {}
        return;

      case "whoami":
        addLog({ type: "output", text: `Quésede Filipe Constantino
  Técnico em Desenvolvimento de Sistemas
  Administrador | Automação | Full-Stack` });
        return;

      case "date":
        addLog({ type: "output", text: new Date().toLocaleString("pt-BR") });
        return;

      case "neofetch":
        setShowAscii((p) => !p);
        addLog({ type: "output", text: `neofetch ${showAscii ? "--hide" : "--show"}` });
        return;

      case "echo":
        addLog({ type: "output", text: args.join(" ") || "" });
        return;

      default:
        break;
    }

    // External action commands
    const preset = PRESET_COMMANDS.find((p) => p.cmd === fullCmd);
    if (preset) {
      if (preset.action.startsWith("http") || preset.action.startsWith("mailto")) {
        window.open(preset.action, "_blank");
      }
      const outputs: Record<string, string> = {
        "mail --to quesede": `Enviando para quesede@email.com...
  [✅ 200] Mensagem encaminhada ao servidor SMTP.
  Aguardando resposta...`,
        "open github": `Resolvendo github.com...
  [✅ 200] Conexão estabelecida.
  Abrindo repositórios remotos...`,
        "cat curriculo.pdf": `Buscando curriculo.pdf...
  [✅ 200] Arquivo encontrado.
  Iniciando download...`,
        "open linkedin": `Resolvendo linkedin.com...
  [✅ 200] Conexão estabelecida.
  Redirecionando...`,
      };
      addLog({ type: "output", text: outputs[fullCmd] || `Executando ${fullCmd}...` });
      return;
    }

    // Unknown command
    addLog({
      type: "output",
      text: `${cmd}: comando não encontrado. Digite 'help' para lista de comandos.`,
    });
  }, [addLog, showAscii, setLogs]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput("");
  }, [executeCommand, input]);

  // Click-to-execute for preset commands
  const handlePresetClick = useCallback((cmd: string) => {
    executeCommand(cmd);
  }, [executeCommand]);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen pt-[86px] pb-20"
    >
      {/* Grid + minimal green glow */}
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-1/4 right-1/3 w-1/3 h-1/3 bg-accent-green/1.5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-[58px] pt-12 md:pt-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.12, 0.23, 0.15, 0.99] as const }}
        >
          <span className="font-mono text-[10px] md:text-[13px] font-bold tracking-[1.6px] md:tracking-[2.08px] text-accent-purple">
            QFC@CONTACT:~$ ssh contato@qfc
          </span>
          <h2 className="font-mono text-[36px] md:text-[82px] font-bold leading-[0.94] text-text-primary mt-3 md:mt-4">
            Abrir uma
            <br />
            sessão comigo
          </h2>
          <p className="font-sans text-[15px] md:text-[21px] leading-[1.5] text-text-secondary max-w-[600px] mt-3 md:mt-6">
            Terminal SSH real. Comandos funcionais. Conexão direta.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 md:mt-14">
          {/* ─── Terminal Mac ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[700px]"
          >
            <motion.div
              animate={{
                boxShadow: inputFocused
                  ? "0 0 0 1px rgba(93, 173, 226, 0.25)"
                  : "0 0 0 0px rgba(93, 173, 226, 0)",
              }}
              transition={{ duration: 0.25 }}
              className="rounded-[12px] overflow-hidden shadow-2xl"
              style={{
                background: "#000000",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Mac Terminal Chrome */}
              <div
                className="h-8 md:h-9 flex items-center px-3 md:px-4 gap-1.5 md:gap-2 select-none"
                style={{ background: "#1c1c1e" }}
              >
                {/* Traffic lights */}
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
                <span
                  className="font-mono text-[10px] md:text-[12px] ml-2 md:ml-4"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  contato@qfc — ssh — 80×24
                </span>
              </div>

              {/* Terminal Body */}
              <div
                ref={terminalRef}
                onClick={focusInput}
                className="p-3 md:p-5 font-mono text-[12px] md:text-[14px] leading-[1.6] overflow-y-auto"
                style={{
                  background: "#000000",
                  color: "#e4e4e4",
                  minHeight: 350,
                  maxHeight: 520,
                }}
              >
                {/* Welcome message */}
                <div className="space-y-1.5 text-[11px] md:text-[13px] opacity-80" suppressHydrationWarning>
                  <p suppressHydrationWarning>
                    Last login: {currentTime}
                  </p>
                  <p className="text-[#58d68d]">
                    Welcome to QFC-OS v2.0.0 — Interactive Session
                  </p>
                  <p className="text-[#5dade2]">
                    Type a command or click to execute. Digite &apos;help&apos;.
                  </p>
                </div>

                {/* ASCII Art (neofetch-style) */}
                <AnimatePresence>
                  {showAscii && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-3 md:mt-4 mb-4 md:mb-6"
                    >
                      <div className="flex gap-3 md:gap-6">
                        {/* ASCII Logo */}
                        <pre
                          className="text-[7px] md:text-[11px] leading-[1.2]"
                          style={{ color: "#5dade2" }}
                        >
                          {NEOFETCH_LINES.join("\n")}
                        </pre>
                        {/* System Info */}
                        <div className="text-[9px] md:text-[12px] space-y-0.5 pt-0.5">
                          <p>
                            <span className="text-[#58d68d]">user</span>
                            <span className="opacity-50">@</span>
                            <span className="text-[#5dade2]">qfc-os</span>
                          </p>
                          <p className="opacity-70">──────────────</p>
                          <p>
                            <span className="opacity-60">OS: </span>
                            <span>QFC-OS v2.0.0</span>
                          </p>
                          <p>
                            <span className="opacity-60">Host: </span>
                            <span>Portfolio Terminal</span>
                          </p>
                          <p>
                            <span className="opacity-60">Kernel: </span>
                            <span>Next.js 16.2.7</span>
                          </p>
                          <p>
                            <span className="opacity-60">Shell: </span>
                            <span>bash 5.2+</span>
                          </p>
                          <p>
                            <span className="opacity-60">Uptime: </span>
                            <span>ativo desde 2026</span>
                          </p>
                          <p>
                            <span className="opacity-60">Status: </span>
                            <span className="text-[#58d68d]">available</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Session Logs */}
                {logs.map((entry, i) => (
                  <div key={i} className="mt-1.5">
                    {entry.type === "input" && (
                      <p>
                        <span style={{ color: "#f7dc6f" }}>
                          quesede@qfc-os ~ %{" "}
                        </span>
                        <span className="text-white">{entry.text}</span>
                      </p>
                    )}
                    {entry.type === "output" && (
                      <pre className="text-[11px] md:text-[13px] mt-0.5 opacity-85 whitespace-pre-wrap">
                        {entry.text}
                      </pre>
                    )}
                  </div>
                ))}

                {/* Initial command hints (shown when no logs) */}
                {logs.length === 0 && (
                  <div className="mt-4 md:mt-6 border-t border-white/10 pt-3 md:pt-4">
                    <p className="text-[10px] md:text-[12px] opacity-50 uppercase tracking-wider mb-2 md:mb-3">
                      Comandos disponíveis
                    </p>
                    <div className="space-y-1.5 md:space-y-2">
                      {PRESET_COMMANDS.map((cmd) => (
                        <motion.button
                          key={cmd.cmd}
                          onClick={() => handlePresetClick(cmd.cmd)}
                          className="w-full flex items-center gap-2 md:gap-3 text-left group"
                          whileHover={{ x: 6 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0"
                            style={{ background: cmd.color }}
                          />
                          <span className="text-[11px] md:text-[13px]" style={{ color: cmd.color }}>
                            {cmd.cmd}
                          </span>
                          <span className="opacity-40 group-hover:opacity-80 transition-opacity text-[10px] md:text-[13px]">
                            — {cmd.label}
                          </span>
                          <span className="ml-auto text-[10px] md:text-[11px] opacity-0 group-hover:opacity-40 transition-opacity">
                            ↵
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input line */}
                <form onSubmit={handleSubmit} className="mt-3 md:mt-4 flex items-center">
                  <span className="text-[11px] md:text-[13px] shrink-0" style={{ color: "#f7dc6f" }}>
                    quesede@qfc-os ~ %{" "}
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    className="flex-1 bg-transparent border-none outline-none text-[11px] md:text-[13px] text-white font-mono"
                    style={{ caretColor: "#e4e4e4" }}
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                  />
                </form>
              </div>
          </motion.div>
          </motion.div>

          {/* ─── Identity Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-[360px] shrink-0"
          >
            <div
              className="relative rounded-[16px] p-5 md:p-8"
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/5">
                <div className="w-2 h-2.5 md:w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2.5 md:w-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2 h-2.5 md:w-2.5 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[10px] md:text-[11px] opacity-30 ml-2">
                  identity.card
                </span>
              </div>

              <span className="font-mono text-[10px] md:text-[11px] tracking-[1.2px] text-[#5dade2]">
                IDENTIDADE
              </span>

              <h3
                className="font-mono text-[22px] md:text-[28px] font-bold leading-[1.15] mt-3 md:mt-4"
                style={{ color: "#e4e4e4" }}
              >
                Quésede Filipe
                <br />
                Constantino
              </h3>

              <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] md:text-[11px] text-[#58d68d] mt-0.5">
                    ▸
                  </span>
                  <p className="font-sans text-[12px] md:text-[14px] leading-[1.5] opacity-70">
                    Desenvolvimento de Sistemas
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] md:text-[11px] text-[#58d68d] mt-0.5">
                    ▸
                  </span>
                  <p className="font-sans text-[12px] md:text-[14px] leading-[1.5] opacity-70">
                    Administração + processos
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] md:text-[11px] text-[#58d68d] mt-0.5">
                    ▸
                  </span>
                  <p className="font-sans text-[12px] md:text-[14px] leading-[1.5] opacity-70">
                    Projetos pequenos, úteis e demonstráveis
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/5 space-y-1.5">
                <p className="font-mono text-[11px] md:text-[12px] text-[#5dade2]">
                  <span className="opacity-40">{">"} </span>status:{" "}
                  <span className="text-[#58d68d]">available</span>
                </p>
                <p className="font-mono text-[11px] md:text-[12px] text-[#5dade2]">
                  <span className="opacity-40">{">"} </span>stack: frontend /
                  automation / deploy
                </p>
                <p className="font-mono text-[11px] md:text-[12px] text-[#5dade2]">
                  <span className="opacity-40">{">"} </span>base: operations /
                  finance / support
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="absolute bottom-8 left-4 md:left-[58px] font-mono text-[10px] md:text-[12px] tracking-[0.96px] opacity-30">
        $ terminal interativo — session log persistido via localStorage
      </p>
    </section>
  );
}
