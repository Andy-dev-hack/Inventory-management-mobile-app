/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Plutux Vault",
        short_name: "Plutux",
        description: "Premium Asset Management System",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "src/api/**",
        "src/context/**",
        "src/hooks/**",
        "src/schemas/**",
        "src/utils/**",
      ],
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "**/*.test.tsx",
        "**/*.test.ts",
        "**/*config.ts",
        "**/*config.js",
      ],
      thresholds: {
        statements: 95,
        branches: 80, // Practical limit for v8 branch coverage with heavy mocking
        functions: 95,
        lines: 95,
      },
    },
  },
});
