/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
        colors: {
            "green": '#00AAA1',
            "light-green": "#F2F8F7",
            "black": "#222222",
            "grey":  "#333333",
            "light-grey": "#555555",
            "border-color": "#666666",
            "scrollbar-track-color": "#C4C4C4",
            "header-color": "#E8F3F3",
        },
        fontFamily: {
            sans: ["Noto Sans", "sans-serif"],
        }
    },
  },
  plugins: [],
}

