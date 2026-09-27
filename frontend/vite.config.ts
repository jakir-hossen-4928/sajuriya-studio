import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

const HOST_ONLY_FILES = [".htaccess", "nginx.conf"];

function stripHostConfigFiles(): Plugin {
  let outDir = "dist";
  return {
    name: "strip-host-config-files",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      for (const file of HOST_ONLY_FILES) {
        fs.rmSync(path.resolve(outDir, file), { force: true });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), stripHostConfigFiles(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
