import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Import Tailwind CSS directly
import autoprefixer from 'autoprefixer'; // Useful for production compatibility

export default defineConfig({
  plugins: [
    react(), // Enable React support
  ],
  css: {
    // Configure PostCSS to run Tailwind CSS and Autoprefixer
    postcss: {
      plugins: [
        tailwindcss(), // This finds and uses your tailwind.config.js
        autoprefixer(),
      ],
    },
  },
});