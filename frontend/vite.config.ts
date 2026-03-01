import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "RoomSensePanel",
      formats: ["iife"],
      fileName: () => "roomsense-panel.js",
    },
    outDir: "../custom_components/roomsense/frontend",
    emptyOutDir: false,
    rollupOptions: {
      // No external dependencies – everything is bundled
    },
  },
});
