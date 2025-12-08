import { defineConfig } from "vite";
import { resolve } from "path";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries";
import fs from "fs";
import path from "path";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    base: "/cinemania/",
    build: {
      sourcemap: true,
      define: {},
      css: {},
      esbuild: {},
      resolve: {},
      optimizeDeps: {},
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          catalog: resolve(__dirname, "catalog.html"),
          library: resolve(__dirname, "myLibrary.html"),
        },

        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },

          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "commonHelpers") {
              return "commonHelpers.js";
            }
            return "[name].js";
          },
        },
      },

      outDir: "dist",
      emptyOutDir: true,
    },

    plugins: [
      injectHTML(),
      FullReload(["./src/**/**.html"]),
      SortCss({
        sort: "mobile-first",
      }),
      {
        name: "add-headers",
        closeBundle() {
          const headersContent = `
/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable
        `;

          const outPath = path.resolve(__dirname, "dist/_headers");
          fs.writeFileSync(outPath, headersContent.trim());
        },
      },
    ],
  };
});
