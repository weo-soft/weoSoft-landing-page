import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages: if GITHUB_REPOSITORY is set, use repo name as base path
  // Otherwise, use VITE_BASE_PATH or default to '/'
  const getBasePath = () => {
    // Check for explicit base path first (set in GitHub Actions)
    if (process.env.VITE_BASE_PATH) {
      // Ensure it starts and ends with a slash
      let basePath = process.env.VITE_BASE_PATH.trim();
      if (!basePath.startsWith('/')) {
        basePath = '/' + basePath;
      }
      if (!basePath.endsWith('/')) {
        basePath = basePath + '/';
      }
      return basePath;
    }
    // For GitHub Actions builds, extract repo name from GITHUB_REPOSITORY
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      return `/${repoName}/`;
    }
    // Default to root for local development
    return '/';
  };

  const base = getBasePath();
  
  // Log the base path for debugging (only in non-production to avoid noise)
  if (mode !== 'production' || process.env.VITE_BASE_PATH) {
    console.log(`Building with base path: ${base}`);
  }

  return {
    base,
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
