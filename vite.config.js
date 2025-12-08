import { defineConfig } from "vite";
import { resolve } from "path";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },

    base: "/cinemania/",

    build: {
      sourcemap: true,

      rollupOptions: {
        /* PROJE KÖKÜNDEKİ HTML DOSYALARINI INPUT YAP */
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
    ],
  };
});
