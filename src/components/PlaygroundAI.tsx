import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";

/* =========================================================
   TYPES
========================================================= */

type Message = { id: number; role: "user" | "ai"; text: string };

type AppId =
  | "ai"
  | "browser"
  | "vscode"
  | "tictactoe"
  | "console"
  | "gallery"
  | "calculator";

type WindowInstance = {
  id: AppId;
  zIndex: number;
  x: number;
  y: number;
  maximized: boolean;
  minimized: boolean;
};

type AppMeta = {
  id: AppId;
  name: string;
  glyph: string;
  bg: string;
  width: number;
  height: number;
};

const BROWSER_TARGET_URL = "https://github.com/sumit12c";

const APPS: AppMeta[] = [
  {
    id: "ai",
    name: "Stime's AI",
    glyph: "⌘",
    bg: "linear-gradient(135deg,#145cff,#050505)",
    width: 900,
    height: 560,
  },
  {
    id: "browser",
    name: "Browser",
    glyph: "◐",
    bg: "linear-gradient(135deg,#69a0ff,#050505)",
    width: 0,
    height: 0,
  },
  {
    id: "vscode",
    name: "VS Code",
    glyph: "</>",
    bg: "linear-gradient(135deg,#1a73e8,#050505)",
    width: 960,
    height: 580,
  },
  {
    id: "tictactoe",
    name: "Circle Cross",
    glyph: "✕",
    bg: "linear-gradient(135deg,#c16bff,#050505)",
    width: 400,
    height: 580,
  },
  {
    id: "console",
    name: "Console",
    glyph: "▶",
    bg: "linear-gradient(135deg,#555,#050505)",
    width: 760,
    height: 480,
  },
  {
    id: "gallery",
    name: "Gallery",
    glyph: "❖",
    bg: "linear-gradient(135deg,#ff5f57,#050505)",
    width: 820,
    height: 560,
  },
  {
    id: "calculator",
    name: "Calculator",
    glyph: "±",
    bg: "linear-gradient(135deg,#febc2e,#050505)",
    width: 300,
    height: 440,
  },
];

const suggestions = [
  "What projects has Sumit built?",
  "What does Sumit know about AI?",
  "What technologies does Sumit use?",
  "Tell me about Dragon Music Player",
];

const GALLERY_IMAGES = [
  { src: "kracit.png", label: "Kracit" },
  { src: "resqverse.png", label: "ResQVerse" },
  { src: "fileflick.png", label: "FileFlick" },
  { src: "cmdmusicplayer.png", label: "Dragon Music Player" },
  { src: "notesnap.png", label: "NoteSnap" },
  { src: "python.png", label: "Python" },
  { src: "html.png", label: "HTML" },
  { src: "js.png", label: "JavaScript" },
  { src: "css.png", label: "CSS" },
  { src: "React.png", label: "React" },
  { src: "figma.png", label: "Figma" },
  { src: "spline.png", label: "Spline" },
  { src: "ts.png", label: "TypeScript" },
  { src: "dijango.png", label: "Django" },
  { src: "AI.png", label: "AI" },
  { src: "sql.png", label: "SQL" },
  { src: "mac_bg.png", label: "macOS Wallpaper" },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function PlaygroundAI() {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [topZ, setTopZ] = useState(10);
  const [clock, setClock] = useState(new Date());
  const [helpOpen, setHelpOpen] = useState(false);
  const [powerStage, setPowerStage] = useState<"off" | "hello" | "on">("off");

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 20_000);
    return () => clearInterval(t);
  }, []);

  // Close help popover on outside click / Escape
  useEffect(() => {
    if (!helpOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".mac-help-container")) {
        setHelpOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHelpOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [helpOpen]);

  // Auto-advance hello → on
  useEffect(() => {
    if (powerStage !== "hello") return;
    const t = setTimeout(() => setPowerStage("on"), 2400);
    return () => clearTimeout(t);
  }, [powerStage]);

  const openApp = (id: AppId) => {
    if (id === "browser") {
      window.open(BROWSER_TARGET_URL, "_blank", "noopener,noreferrer");
      return;
    }
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      const nextZ = topZ + 1;
      setTopZ(nextZ);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZ, minimized: false } : w
        );
      }
      return [
        ...prev,
        { id, zIndex: nextZ, x: 0, y: 0, maximized: false, minimized: false },
      ];
    });
  };

  const closeApp = (id: AppId) =>
    setWindows((p) => p.filter((w) => w.id !== id));

  const minimizeApp = (id: AppId) =>
    setWindows((p) =>
      p.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );

  const toggleMaximize = (id: AppId) =>
    setWindows((p) =>
      p.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );

  const focusApp = (id: AppId) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setWindows((p) =>
      p.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
    );
  };

  const updatePos = (id: AppId, x: number, y: number) =>
    setWindows((p) => p.map((w) => (w.id === id ? { ...w, x, y } : w)));

  const timeLabel = clock.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateLabel = clock.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const renderApp = (id: AppId) => {
    switch (id) {
      case "ai":
        return <StimesAIContent />;
      case "vscode":
        return <VSCodeApp />;
      case "tictactoe":
        return <TicTacToeApp />;
      case "console":
        return <ConsoleApp />;
      case "gallery":
        return <GalleryApp />;
      case "calculator":
        return <CalculatorApp />;
      default:
        return null;
    }
  };

  return (
    <div className="playground-ai">
      {/* HEADING */}
      <motion.div
        className="playground-ai-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="playground-ai-kicker">06 / Playground</p>
        <h2>Playground.</h2>
        <p className="playground-ai-description">
          Want to know more about me? Try the AI running inside this Mac —
          ask it anything about my work, skills, and projects.
        </p>
      </motion.div>

      {/* =========================================================
          MAC STAGE WRAPPER — power → hello → desktop
      ========================================================= */}
      <div className="mac-stage-wrap">
        <AnimatePresence mode="wait">

          {/* ============ STAGE 1: POWER BUTTON ============ */}
          {powerStage === "off" && (
            <motion.div
              key="stage-power"
              className="mac-power-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                type="button"
                className="mac-power-btn"
                onClick={() => setPowerStage("hello")}
                aria-label="Power on"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
              >
                {/* Pulsing rings */}
                <motion.span
                  className="mac-power-ring"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.span
                  className="mac-power-ring mac-power-ring-delay"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1.2,
                  }}
                />

                {/* Power glyph */}
                <svg
                  className="mac-power-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3 L12 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M18.36 6.64 A9 9 0 1 1 5.64 6.64"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </motion.button>

              <motion.p
                className="mac-power-hint"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  press it
                </motion.span>
              </motion.p>
            </motion.div>
          )}

          {/* ============ STAGE 2: HELLO ============ */}
          {powerStage === "hello" && (
            <motion.div
              key="stage-hello"
              className="mac-hello-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mac-hello-text" aria-label="hello">
                {"hello".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 34, filter: "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.15 + i * 0.14,
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          )}

          {/* ============ STAGE 3: MAC DESKTOP ============ */}
          {powerStage === "on" && (
            <motion.div
              key="stage-desktop"
              className="mac-desktop"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(24px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* MENU BAR */}
              <div className="mac-menubar">
                <div className="mac-menubar-left">
                  <span className="mac-menubar-logo" aria-hidden="true">
                    ◉
                  </span>
                  <span className="mac-menubar-app">
                    Stime&apos;s Portfolio
                  </span>

                  <div className="mac-help-container">
                    <button
                      type="button"
                      className="mac-menubar-item mac-menubar-help"
                      onClick={() => setHelpOpen((o) => !o)}
                      aria-expanded={helpOpen}
                      aria-haspopup="true"
                    >
                      Help
                    </button>

                    <AnimatePresence>
                      {helpOpen && (
                        <motion.div
                          className="mac-help-popover"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{
                            duration: 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          role="dialog"
                        >
                          <span className="mac-help-title">Quick tips</span>
                          <p>
                            ▸ <strong>Double-click</strong> a desktop icon to
                            open the app.
                          </p>
                          <p>
                            ▸ <strong>Single-click</strong> a taskbar (dock)
                            app to open it.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mac-menubar-right">
                  <span>{dateLabel}</span>
                  <span>{timeLabel}</span>
                </div>
              </div>

              {/* DESKTOP AREA */}
              <div className="mac-desktop-area">
                <div className="mac-wallpaper-glow" aria-hidden="true" />

                <div className="mac-desktop-icons">
                  {APPS.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      className="mac-desktop-icon"
                      onDoubleClick={() => openApp(app.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") openApp(app.id);
                      }}
                      aria-label={`Open ${app.name}`}
                    >
                      <span
                        className="mac-desktop-icon-tile"
                        style={{ background: app.bg }}
                      >
                        {app.glyph}
                      </span>
                      <span className="mac-desktop-icon-label">
                        {app.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* WEATHER WIDGET */}
                <motion.div
                  className="mac-widget mac-weather-widget"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="mac-weather-top">
                    <span className="mac-weather-icon" aria-hidden="true">
                      ⛆
                    </span>
                    <div className="mac-weather-meta">
                      <span className="mac-weather-label">
                        TODAY · STUDIO
                      </span>
                      <strong className="mac-weather-title">
                        Creativity is raining.
                      </strong>
                    </div>
                  </div>
                  <div className="mac-weather-raindrops" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        style={{ animationDelay: `${i * 0.18}s` }}
                      />
                    ))}
                  </div>
                  <div className="mac-weather-footer">
                    <span>100% inspiration</span>
                    <span>·</span>
                    <span>Ideas all day</span>
                  </div>
                </motion.div>

                {/* MUSIC WIDGET */}
                <MusicWidget />

                {/* WINDOWS */}
                <AnimatePresence>
                  {windows.map((w) => {
                    const meta = APPS.find((a) => a.id === w.id)!;
                    return (
                      <MacWindow
                        key={w.id}
                        title={meta.name}
                        width={meta.width}
                        height={meta.height}
                        zIndex={w.zIndex}
                        x={w.x}
                        y={w.y}
                        maximized={w.maximized}
                        minimized={w.minimized}
                        onClose={() => closeApp(w.id)}
                        onMinimize={() => minimizeApp(w.id)}
                        onMaximize={() => toggleMaximize(w.id)}
                        onFocus={() => focusApp(w.id)}
                        onMove={(x, y) => updatePos(w.id, x, y)}
                      >
                        {renderApp(w.id)}
                      </MacWindow>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* DOCK */}
              <div className="mac-dock-wrap">
                <div className="mac-dock">
                  {APPS.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      className="mac-dock-icon"
                      onClick={() => openApp(app.id)}
                      aria-label={`Open ${app.name}`}
                      title={app.name}
                    >
                      <span
                        className="mac-dock-icon-tile"
                        style={{ background: app.bg }}
                      >
                        {app.glyph}
                      </span>
                      <span
                        className={`mac-dock-dot ${
                          windows.some((w) => w.id === app.id)
                            ? "is-active"
                            : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================
   WINDOW
========================================================= */

function MacWindow({
  title,
  children,
  width,
  height,
  zIndex,
  x,
  y,
  maximized,
  minimized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}: {
  title: string;
  children: ReactNode;
  width: number;
  height: number;
  zIndex: number;
  x: number;
  y: number;
  maximized: boolean;
  minimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const [pos, setPos] = useState({ x, y });
  const dragRef = useRef<{
    sx: number;
    sy: number;
    px: number;
    py: number;
  } | null>(null);

  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".mac-traffic-lights")) return;
    if (maximized) return;
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setPos({
      x: dragRef.current.px + (e.clientX - dragRef.current.sx),
      y: dragRef.current.py + (e.clientY - dragRef.current.sy),
    });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    onMove(pos.x, pos.y);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const wrapperStyle: React.CSSProperties = maximized
    ? {
        zIndex,
        top: 8,
        left: 8,
        width: "calc(100% - 16px)",
        height: "calc(100% - 90px)",
        transform: "none",
      }
    : {
        zIndex,
        width: `min(${width}px, calc(100% - 60px))`,
        height: `min(${height}px, calc(100% - 120px))`,
        transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
      };

  return (
    <div
      className={`mac-window-wrap ${minimized ? "is-minimized" : ""}`}
      style={wrapperStyle}
      onMouseDown={onFocus}
    >
      <motion.div
        className="mac-window"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: minimized ? 0 : 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="mac-window-titlebar"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div className="mac-traffic-lights">
            <button
              type="button"
              className="mac-light mac-light-close"
              onClick={onClose}
              aria-label="Close"
            >
              <span className="mac-light-glyph">×</span>
            </button>
            <button
              type="button"
              className="mac-light mac-light-min"
              onClick={onMinimize}
              aria-label="Minimize"
            >
              <span className="mac-light-glyph">−</span>
            </button>
            <button
              type="button"
              className="mac-light mac-light-max"
              onClick={onMaximize}
              aria-label="Maximize"
            >
              <span className="mac-light-glyph">+</span>
            </button>
          </div>
          <div className="mac-window-title">{title}</div>
          <div className="mac-window-titlebar-spacer" aria-hidden="true" />
        </div>
        <div className="mac-window-body">{children}</div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   STIME'S AI
========================================================= */

function StimesAIContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const askAI = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: trimmed };
    const aiId = Date.now() + 1;
    setMessages((c) => [...c, userMessage, { id: aiId, role: "ai", text: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      if (!response.ok || !response.body) throw new Error("Failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const dataStr = t.replace(/^data:\s*/, "");
          if (dataStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              setMessages((cur) =>
                cur.map((m) =>
                  m.id === aiId ? { ...m, text: m.text + parsed.text } : m
                )
              );
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    } catch (error) {
      console.error("Portfolio AI error:", error);
      setMessages((cur) =>
        cur.map((m) =>
          m.id === aiId
            ? {
                ...m,
                text: m.text || "I couldn't connect to the AI right now.",
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    askAI(input);
  };

  return (
    <div className="stimes-ai-app">
      <aside className="stimes-ai-sidebar">
        <div className="stimes-ai-sidebar-brand">
          <span className="stimes-ai-sidebar-dot" aria-hidden="true" />
          <span>Stime&apos;s AI</span>
        </div>
        <div className="stimes-ai-sidebar-section">
          <span className="stimes-ai-sidebar-label">Suggestions</span>
          <div className="stimes-ai-suggestions">
            {suggestions.map((q) => (
              <button
                key={q}
                type="button"
                disabled={loading}
                onClick={() => askAI(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div className="stimes-ai-sidebar-footer">
          <span className="stimes-ai-status-dot" aria-hidden="true" />
          <span>ONLINE · STIME_AI v1</span>
        </div>
      </aside>

      <div className="stimes-ai-main">
        <header className="stimes-ai-header">
          <div className="stimes-ai-header-left">
            <span className="stimes-ai-header-title">Ask about me</span>
            <span className="stimes-ai-header-sub">Live assistant</span>
          </div>
          <span className="stimes-ai-badge">STIME&apos;S AI</span>
        </header>

        {/* ⚠️ Warning — visible on both desktop and mobile */}
        <div className="stimes-ai-warning" role="note">
          <span className="stimes-ai-warning-icon" aria-hidden="true">
            ⚠
          </span>
          <p>
            This AI has limited knowledge and can make mistakes. Please verify
            important details — don&apos;t rely on it 100%.
          </p>
        </div>
        

        <div className="stimes-ai-chat" ref={chatRef}>
          {messages.length === 0 && (
            <div className="stimes-ai-welcome">
              <span className="stimes-ai-command">$</span>
              <div>
                <strong>STIME_AI READY</strong>
                <p>
                  Ask me anything about Sumit, his work, projects, skills, or
                  technologies.
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`stimes-ai-message ${
                m.role === "user" ? "is-user" : "is-ai"
              }`}
            >
              <span className="stimes-ai-message-label">
                {m.role === "user" ? "YOU" : "STIME_AI"}
              </span>
              <p>{m.text || (loading && m.role === "ai" ? "..." : "")}</p>
            </div>
          ))}

          {loading && messages.slice(-1)[0]?.text === "" && (
            <div className="stimes-ai-message is-ai">
              <span className="stimes-ai-message-label">STIME_AI</span>
              <p className="stimes-ai-thinking">
                thinking<span>.</span>
                <span>.</span>
                <span>.</span>
              </p>
            </div>
          )}
        </div>

        <form className="stimes-ai-input" onSubmit={handleSubmit}>
          <span className="stimes-ai-input-symbol">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about Sumit..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "..." : "ASK ↗"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   VS CODE (fake)
========================================================= */

const VSC_FILES: Record<string, string> = {
  "App.tsx": `import { AnimatePresence, motion } from "motion/react";
import BootTerminal from "./components/BootTerminal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  const [stage, setStage] = useState("boot");

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === "boot" && (
          <BootTerminal onComplete={() => setStage("portfolio")} />
        )}
      </AnimatePresence>

      {stage === "portfolio" && (
        <div id="top">
          <Navbar />
          <Hero />
        </div>
      )}
    </>
  );
}`,
  "PlaygroundAI.tsx": `export default function PlaygroundAI() {
  const [windows, setWindows] = useState([]);

  const openApp = (id) => {
    setWindows((prev) => [
      ...prev,
      { id, zIndex: prev.length + 10 },
    ]);
  };

  return (
    <div className="mac-desktop">
      {APPS.map((app) => (
        <DockIcon key={app.id} app={app} onOpen={openApp} />
      ))}
    </div>
  );
}`,
  "index.css": `.mac-desktop {
  position: relative;
  background-image: url("/assets/mac_bg.png");
  background-size: cover;
  overflow: hidden;
}

.mac-window {
  border-radius: 12px;
  background: #050505;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
}

.mac-dock {
  backdrop-filter: blur(28px) saturate(180%);
  background: rgba(255, 255, 255, 0.08);
}`,
  "README.md": `# Sumit Patel · Portfolio

Creative developer building interactive, visually
engaging, and intelligent digital experiences.

## Stack
- React + TypeScript + Vite
- Motion (Framer) for animation
- Node / Express / Gemini API for AI playground
- Custom macOS simulation playground
`,
};

function VSCodeApp() {
  const [activeFile, setActiveFile] = useState("App.tsx");
  return (
    <div className="vscode-app">
      <div className="vscode-sidebar">
        <div className="vscode-sidebar-title">EXPLORER</div>
        <div className="vscode-sidebar-folder">▾ SUMIT-PORTFOLIO</div>
        {Object.keys(VSC_FILES).map((name) => (
          <button
            key={name}
            type="button"
            className={`vscode-file ${activeFile === name ? "is-active" : ""}`}
            onClick={() => setActiveFile(name)}
          >
            <span className="vscode-file-icon">◇</span>
            {name}
          </button>
        ))}
      </div>
      <div className="vscode-main">
        <div className="vscode-tabs">
          {Object.keys(VSC_FILES).map((name) => (
            <div
              key={name}
              className={`vscode-tab ${activeFile === name ? "is-active" : ""}`}
            >
              {name}
            </div>
          ))}
        </div>
        <pre className="vscode-code">
          <code>{VSC_FILES[activeFile]}</code>
        </pre>
        <div className="vscode-statusbar">
          <span>main</span>
          <span>UTF-8 · TypeScript</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CIRCLE CROSS (Tic-Tac-Toe vs Computer)
========================================================= */

type Cell = "X" | "O" | null;

const TTT_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkTttWinner(
  b: Cell[]
): { winner: "X" | "O" | "draw"; line: number[] | null } | null {
  for (const line of TTT_LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { winner: b[a] as "X" | "O", line };
    }
  }
  if (b.every((v) => v)) return { winner: "draw", line: null };
  return null;
}

function aiPickMove(b: Cell[]): number {
  // 15% random move — makes the AI beatable
  if (Math.random() < 0.15) {
    const empties = b
      .map((v, i) => (v === null ? i : -1))
      .filter((i) => i >= 0);
    if (empties.length)
      return empties[Math.floor(Math.random() * empties.length)];
  }

  // 1. Win if possible
  for (const line of TTT_LINES) {
    const vals = line.map((i) => b[i]);
    if (vals.filter((v) => v === "O").length === 2 && vals.includes(null)) {
      return line[vals.indexOf(null)];
    }
  }
  // 2. Block player's win
  for (const line of TTT_LINES) {
    const vals = line.map((i) => b[i]);
    if (vals.filter((v) => v === "X").length === 2 && vals.includes(null)) {
      return line[vals.indexOf(null)];
    }
  }
  // 3. Center
  if (b[4] === null) return 4;
  // 4. Opposite corner
  const opposite: Record<number, number> = { 0: 8, 2: 6, 6: 2, 8: 0 };
  for (const c of [0, 2, 6, 8]) {
    if (b[c] === "X" && b[opposite[c]] === null) return opposite[c];
  }
  // 5. Empty corner
  const corners = [0, 2, 6, 8].filter((i) => b[i] === null);
  if (corners.length)
    return corners[Math.floor(Math.random() * corners.length)];
  // 6. Empty side
  const sides = [1, 3, 5, 7].filter((i) => b[i] === null);
  if (sides.length) return sides[Math.floor(Math.random() * sides.length)];
  return -1;
}

function TicTacToeApp() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [status, setStatus] = useState<"playing" | "won" | "lost" | "draw">(
    "playing"
  );
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const [score, setScore] = useState({ wins: 0, draws: 0, losses: 0 });

  const handleCell = (i: number) => {
    if (!playerTurn || status !== "playing" || board[i]) return;
    const next = [...board];
    next[i] = "X";
    const res = checkTttWinner(next);
    setBoard(next);
    if (res) {
      if (res.winner === "draw") {
        setStatus("draw");
        setScore((s) => ({ ...s, draws: s.draws + 1 }));
      } else {
        setStatus("won");
        setWinLine(res.line);
        setScore((s) => ({ ...s, wins: s.wins + 1 }));
      }
    } else {
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    if (playerTurn || status !== "playing") return;
    const t = setTimeout(() => {
      const move = aiPickMove(board);
      if (move < 0) return;
      const next = [...board];
      next[move] = "O";
      const res = checkTttWinner(next);
      setBoard(next);
      if (res) {
        if (res.winner === "draw") {
          setStatus("draw");
          setScore((s) => ({ ...s, draws: s.draws + 1 }));
        } else {
          setStatus("lost");
          setWinLine(res.line);
          setScore((s) => ({ ...s, losses: s.losses + 1 }));
        }
      } else {
        setPlayerTurn(true);
      }
    }, 420);
    return () => clearTimeout(t);
  }, [playerTurn, status, board]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setStatus("playing");
    setWinLine(null);
  };

  return (
    <div className="ttt-app">
      <div className="ttt-score">
        <div>
          <span>YOU</span>
          <strong>{score.wins}</strong>
        </div>
        <div>
          <span>DRAW</span>
          <strong>{score.draws}</strong>
        </div>
        <div>
          <span>CPU</span>
          <strong>{score.losses}</strong>
        </div>
      </div>

      <div className={`ttt-status is-${status}`}>
        {status === "playing" &&
          (playerTurn ? "Your turn · X" : "Computer thinking…")}
        {status === "won" && "You win 🎉"}
        {status === "lost" && "Computer wins"}
        {status === "draw" && "It's a draw"}
      </div>

      <div className="ttt-board">
        {board.map((v, i) => (
          <button
            key={i}
            type="button"
            className={[
              "ttt-cell",
              v === "X" ? "is-x" : "",
              v === "O" ? "is-o" : "",
              winLine?.includes(i) ? "is-win" : "",
            ]
              .join(" ")
              .trim()}
            onClick={() => handleCell(i)}
            disabled={!!v || !playerTurn || status !== "playing"}
            aria-label={`cell ${i + 1}`}
          >
            {v === "X" && <span className="ttt-mark ttt-mark-x">✕</span>}
            {v === "O" && <span className="ttt-mark ttt-mark-o">○</span>}
          </button>
        ))}
      </div>

      <button type="button" className="ttt-reset" onClick={reset}>
        {status === "playing" ? "Restart" : "Play again"}
      </button>
    </div>
  );
}

/* =========================================================
   CONSOLE
========================================================= */

function ConsoleApp() {
  const logs = [
    { time: "09:14:02", type: "info", text: "BootTerminal initialized" },
    { time: "09:14:03", type: "ok", text: "Decryption sequence verified" },
    { time: "09:14:04", type: "info", text: "Portfolio mounted successfully" },
    {
      time: "09:14:06",
      type: "ok",
      text: "Navbar: IntersectionObserver attached",
    },
    { time: "09:14:07", type: "ok", text: "Hero: marquee animation active" },
    { time: "09:14:09", type: "info", text: "Tracking 7 sections" },
    { time: "09:14:11", type: "ok", text: "Stime's AI: session established" },
    { time: "09:14:12", type: "info", text: "AI stream: /api/chat ready" },
    { time: "09:14:14", type: "warn", text: "Gallery: 17 assets loaded" },
    { time: "09:14:15", type: "ok", text: "Mac desktop simulation online" },
    { time: "09:14:17", type: "info", text: "Listening for user input..." },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= logs.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 320);
    return () => clearTimeout(t);
  }, [visible, logs.length]);

  return (
    <div className="console-app">
      <div className="console-titlebar">
        <span>●</span>
        <span>Console — Stime&apos;s Portfolio</span>
      </div>
      <div className="console-log">
        {logs.slice(0, visible).map((l, i) => (
          <div key={i} className="console-line">
            <span className="console-time">{l.time}</span>
            <span className={`console-type console-type-${l.type}`}>
              {l.type.toUpperCase()}
            </span>
            <span className="console-text">{l.text}</span>
          </div>
        ))}
        <div className="console-cursor">
          $ <span className="console-blink">_</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY (view-only, no click)
========================================================= */

function GalleryApp() {
  return (
    <div className="gallery-app">
      <div className="gallery-header">
        <span>Assets</span>
        <span className="gallery-count">{GALLERY_IMAGES.length} items</span>
      </div>
      <div className="gallery-grid">
        {GALLERY_IMAGES.map((img) => (
          <div key={img.src} className="gallery-item">
            <img
              src={`/assets/${img.src}`}
              alt={img.label}
              loading="lazy"
              draggable={false}
            />
            <span>{img.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   CALCULATOR
========================================================= */

function calcCompute(a: number, b: number, op: string) {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? 0 : a / b;
    default:
      return b;
  }
}

function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const handleNumber = (n: string) => {
    if (waiting) {
      setDisplay(n);
      setWaiting(false);
      return;
    }
    setDisplay((cur) => (cur === "0" ? n : cur + n));
  };

  const handleDot = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleOp = (nextOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op && !waiting) {
      const result = calcCompute(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setWaiting(true);
  };

  const handleEquals = () => {
    if (prev === null || !op) return;
    const result = calcCompute(prev, parseFloat(display), op);
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setWaiting(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setWaiting(false);
  };

  const handleSign = () =>
    setDisplay((d) => (d.startsWith("-") ? d.slice(1) : "-" + d));

  const handlePercent = () => setDisplay(String(parseFloat(display) / 100));

  const btns: { label: string; cls: string; onClick: () => void }[] = [
    { label: "AC", cls: "calc-btn-fn", onClick: handleClear },
    { label: "±", cls: "calc-btn-fn", onClick: handleSign },
    { label: "%", cls: "calc-btn-fn", onClick: handlePercent },
    { label: "÷", cls: "calc-btn-op", onClick: () => handleOp("÷") },
    { label: "7", cls: "", onClick: () => handleNumber("7") },
    { label: "8", cls: "", onClick: () => handleNumber("8") },
    { label: "9", cls: "", onClick: () => handleNumber("9") },
    { label: "×", cls: "calc-btn-op", onClick: () => handleOp("×") },
    { label: "4", cls: "", onClick: () => handleNumber("4") },
    { label: "5", cls: "", onClick: () => handleNumber("5") },
    { label: "6", cls: "", onClick: () => handleNumber("6") },
    { label: "−", cls: "calc-btn-op", onClick: () => handleOp("−") },
    { label: "1", cls: "", onClick: () => handleNumber("1") },
    { label: "2", cls: "", onClick: () => handleNumber("2") },
    { label: "3", cls: "", onClick: () => handleNumber("3") },
    { label: "+", cls: "calc-btn-op", onClick: () => handleOp("+") },
    { label: "0", cls: "calc-btn-zero", onClick: () => handleNumber("0") },
    { label: ".", cls: "", onClick: handleDot },
    { label: "=", cls: "calc-btn-op", onClick: handleEquals },
  ];

  return (
    <div className="calc-app">
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        {btns.map((b) => (
          <button
            key={b.label}
            type="button"
            className={`calc-btn ${b.cls}`}
            onClick={b.onClick}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MUSIC WIDGET
========================================================= */

function MusicWidget() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const ensureAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio("/assets/music/ambient.mp3");
      audio.loop = false;
      audio.volume = 0.35;
      audio.preload = "auto";
      audio.addEventListener("ended", () => {
        setPlaying(false);
        audio.currentTime = 0;
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const togglePlay = () => {
    const audio = ensureAudio();
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(console.error);
    }
  };

  const restart = () => {
    const audio = ensureAudio();
    audio.currentTime = 0;
    if (!playing) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <motion.div
      className="mac-widget mac-music-widget"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mac-music-top">
        <div className={`mac-music-disc ${playing ? "is-playing" : ""}`}>♪</div>
        <div className="mac-music-meta">
          <span className="mac-music-label">NOW PLAYING</span>
          <strong className="mac-music-title">Ambient Focus</strong>
          <span className="mac-music-artist">Stime&apos;s Studio</span>
        </div>
      </div>

      <div className="mac-music-controls">
        <button
          type="button"
          className="mac-music-btn"
          onClick={restart}
          aria-label="Restart"
        >
          ⏮
        </button>
        <button
          type="button"
          className={`mac-music-btn mac-music-btn-play ${
            playing ? "is-playing" : ""
          }`}
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          type="button"
          className="mac-music-btn"
          onClick={restart}
          aria-label="Next"
        >
          ⏭
        </button>
      </div>
    </motion.div>
  );
}