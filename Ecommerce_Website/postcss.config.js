import path from "path";
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
