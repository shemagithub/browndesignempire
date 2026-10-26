export default defineNuxtConfig({
  compatibilityDate: "2026-10-27",
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts"
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Brown Design Empire",
      meta: [
        { name: "description", content: "Brown Design Empire by Ise Brawn. Men's and women's clothing, cut in Kigali and shipped worldwide." }
      ],
      link: [
        { rel: "icon", href: "/favicon.jpg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&display=swap" }
      ]
    }
  }
})
