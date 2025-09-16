// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},  // Changed from '@tailwindcss/postcss'
    autoprefixer: {},
  },
};

export default config;