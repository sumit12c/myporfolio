import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(serverDirectory, "..");

const apiServer = spawn(process.execPath, [path.join(serverDirectory, "index.mjs")], {
  stdio: "inherit",
});

const vite = spawn(
  process.execPath,
  [path.join(rootDirectory, "node_modules", "vite", "bin", "vite.js")],
  { cwd: rootDirectory, stdio: "inherit" }
);

let stopping = false;

const stop = () => {
  if (stopping) return;
  stopping = true;
  apiServer.kill("SIGTERM");
  vite.kill("SIGTERM");
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
process.on("exit", stop);

apiServer.on("error", (err) => console.error("API Server error:", err));
vite.on("error", (err) => console.error("Vite error:", err));

apiServer.on("exit", (code) => {
  if (!stopping) {
    console.error(`API server stopped unexpectedly (exit code ${code ?? "unknown"}).`);
    stop();
    process.exitCode = code ?? 1;
  }
});

vite.on("exit", (code) => {
  if (!stopping) {
    stop();
  }
});