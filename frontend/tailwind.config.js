import daisyui from 'daisyui';

/** * THE DAISYUI THEME STRATEGY:
 * 1. THEMES: Setting 'themes: true' enables all 30+ built-in DaisyUI themes.
 * 2. ORDER: The first theme in the array (or 'light' by default) is the default.
 * 3. ACTIVATION: Adding themes to this file only makes them available. 
 * To actually see them, you MUST apply the 'data-theme' attribute to your <html> tag.
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cupcake", 
      "bumblebee", 
      "emerald", 
      "corporate", 
      "synthwave", 
      "retro", 
      "cyberpunk", 
      "valentine", 
      "halloween", 
      "garden", 
      "forest", 
      "aqua", 
      "lofi", 
      "pastel", 
      "fantasy", 
      "wireframe", 
      "black", 
      "luxury", 
      "dracula", 
      "cmyk", 
      "autumn", 
      "business", 
      "acid", 
      "lemonade", 
      "night", 
      "coffee", 
      "winter", 
      "dim", 
      "nord", 
      "sunset",
    ],
  },
}