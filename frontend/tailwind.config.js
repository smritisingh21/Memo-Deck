/** @type {import('tailwindcss').Config} */
import { all } from 'axios';
import daisyui from 'daisyui'; // DaisyUI is imported here as a Tailwind plugin

export default {
  // This is the CRITICAL part: it tells Tailwind which files to scan for classes.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // DaisyUI is listed as a plugin for Tailwind
  plugins: [daisyui],
  daisyui:{
    themes: ['forest' , 'caramellatte' , 'retro' ,'coffee' , 'halloween','abyss' ,'acid' , 'dracula','dark'],
  }
}