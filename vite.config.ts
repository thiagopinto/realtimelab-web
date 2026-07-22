import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // <-- Ativa o motor do Tailwind no nosso build],
  server: {
    port: 3000, // <-- Define a porta do servidor de desenvolvimento
    strictPort: true, // <-- Garante que a porta definida seja usada, caso contrário, o Vite tentará usar uma porta diferente 
  },
});
