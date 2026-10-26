import type { Config } from "tailwindcss"

export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161616",
        muted: "#8d8d8d",
        line: "#e7e7e7",
        stage: "#ececec",
        soft: "#f6f6f6"
      },
      fontFamily: {
        sans: ["Manrope", "Avenir Next", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
        serif: ["Cormorant Garamond", "Iowan Old Style", "Palatino", "Palatino Linotype", "serif"]
      }
    }
  }
} satisfies Config
