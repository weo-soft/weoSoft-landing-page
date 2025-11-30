import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages: if GITHUB_REPOSITORY is set, use repo name as base path
  // Otherwise, use VITE_BASE_PATH or default to '/'
  const getBasePath = () => {
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      return `/${repoName}/`;
    }
    return process.env.VITE_BASE_PATH || '/';
  };

  return {
    base: getBasePath(),
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
