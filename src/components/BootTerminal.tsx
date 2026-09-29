import { motion } from "motion/react";

interface BootTerminalProps {
  onComplete: () => void;
}

const lines = [
  "> INITIALIZING PORTFOLIO SYSTEM...",
  "TARGET   : SUMIT PATEL",
  "SCANNING : CREATIVE RESOURCES",
  "STATUS   : FOUND",
  "ACCESS   : GRANTED",
];

export default function BootTerminal({ onComplete }: BootTerminalProps) {
  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0 }}
    >
      <motion.div
        className="terminal-window"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 2400);
        }}
      >
        <div className="terminal-bar">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />

          <span className="terminal-title">
            SUMIT_SYSTEM.exe
          </span>
        </div>

        <div className="terminal-body">
          {lines.map((line, index) => (
            <div
              key={line}
              className={`terminal-line ${
                index === 1 || index === 4
                  ? "terminal-highlight"
                  : ""
              }`}
              style={{
                animationDelay: `${index * 0.38}s`,
              }}
            >
              {line}
            </div>
          ))}

          <div
            className="terminal-line terminal-success"
            style={{ animationDelay: "2s" }}
          >
            _
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}