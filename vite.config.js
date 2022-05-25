import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      viteStaticCopy({
        targets: [
          {
            src: "apple-touch-icon.png",
            dest: "./",
          },
          {
            src: "pwa-192x192.png",
            dest: "./",
          },
          {
            src: "pwa-512x512.png",
            dest: "./",
          },
          {
            src: "favicon-16x16.png",
            dest: "./",
          },
          {
            src: "favicon-32x32.png",
            dest: "./",
          },
          {
            src: "favicon.ico",
            dest: "./",
          },
        ],
      }),
      react(),
      VitePWA({
        includeAssets: [
          "school.png",
          "school.ico",
          "robots.txt",
          "apple-touch-icon.png",
        ],
        manifest: {
          name: "Ise School App",
          short_name: "Ise School",
          description: "App to solved activities.",
          theme_color: "#00b0bd",
          background_color: "#00b0bd",
          display: "standalone",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  });
};
