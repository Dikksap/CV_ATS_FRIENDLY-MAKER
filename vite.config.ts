import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/CV_ATS_FRIENDLY-MAKER/", // <- sesuai nama repo GitHub
  plugins: [react()],
  optimizeDeps: {
    include: ["lucide-react"],
  },
});
