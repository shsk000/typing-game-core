/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import dtsPlugin from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "debug") {
    return {
      base: "./",
    };
  }
  if (mode === "lib")
    return {
      base: "./",

      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "index",
          fileName: "index",
          formats: ["es", "umd", "cjs"],
        },
      },

      plugins: [dtsPlugin()],
    };
});
