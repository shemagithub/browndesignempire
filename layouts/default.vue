<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <a href="#page" class="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[90] focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
    <AppHeader />
    <main id="page">
      <slot />
    </main>
    <footer v-if="route.path !== '/'" class="mx-auto mt-12 flex w-[min(1180px,calc(100%-2rem))] flex-col gap-3 border-t border-line py-7 text-xs tracking-wide text-muted sm:flex-row sm:justify-between">
      <span>Brown Design Empire · Ise Brawn · Kigali</span>
      <a class="border-b border-neutral-300" href="https://www.instagram.com/brown_design_empire250/" target="_blank" rel="noopener">@brown_design_empire250</a>
    </footer>
    <CartDrawer />
    <SavedDrawer />
    <LoginDialog />
    <SiteToast />
  </div>
</template>
