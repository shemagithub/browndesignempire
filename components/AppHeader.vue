<script setup lang="ts">
const route = useRoute()
const shop = useBoutique()

const main = [
  { to: "/", label: "Runway", match: (path: string) => path === "/" },
  { to: "/house", label: "The House", match: (path: string) => path === "/house" },
  { to: "/lookbook", label: "Lookbook", match: (path: string) => path === "/lookbook" }
]

const sub = [
  { to: "/collections", label: "Collections", on: () => route.path === "/collections" },
  { to: "/clothing", label: "Clothing", on: () => route.path === "/clothing" && !route.query.cat },
  { to: "/clothing?cat=wedding", label: "Wedding", on: () => route.query.cat === "wedding" },
  { to: "/clothing?cat=suits", label: "Suits", on: () => route.query.cat === "suits" },
  { to: "/clothing?cat=gowns", label: "Gowns", on: () => route.query.cat === "gowns" },
  { to: "/house", label: "Atelier", on: () => route.path === "/house" }
]

const firstName = computed(() => shop.user.value?.name.split(" ")[0] || "Login")
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-white">
    <div class="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-4 lg:grid-cols-[1fr_auto_1fr] lg:px-7">
      <button
        type="button"
        class="text-[11px] font-bold uppercase tracking-[0.14em] lg:hidden"
        :aria-expanded="shop.menuOpen.value"
        @click="shop.menuOpen.value = !shop.menuOpen.value"
      >
        Menu
      </button>
      <NuxtLink to="/" class="justify-self-start" aria-label="Brown Design Empire">
        <img src="/images/logo.jpg" alt="Brown Design Empire" class="h-9 w-auto sm:h-11">
      </NuxtLink>
      <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary">
        <NuxtLink
          v-for="item in main"
          :key="item.label"
          :to="item.to"
          class="text-[11px] uppercase tracking-[0.16em]"
          :class="item.match(route.path) ? 'font-bold' : 'font-medium'"
          :aria-current="item.match(route.path) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="flex items-center justify-end gap-3 lg:gap-4">
        <button type="button" class="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]" @click="shop.loginOpen.value = true">
          <svg class="lg:hidden" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 19.2c1.4-2.6 3.6-3.7 6.5-3.7s5.1 1.1 6.5 3.7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          <span class="sr-only lg:not-sr-only">{{ firstName }}</span>
        </button>
        <button type="button" aria-label="Search" @click="shop.searchOpen.value = !shop.searchOpen.value">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 16.5L20.5 21" stroke="currentColor" stroke-width="1.6"/></svg>
        </button>
        <button type="button" class="inline-flex items-center gap-1" :aria-label="`Saved pieces, ${shop.wishlist.value.length}`" @click="shop.wishOpen.value = true">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.5s-6.5-4.1-6.5-8.2A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.5 3.3c0 4.1-6.5 8.2-6.5 8.2z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          <span class="text-[11px] font-semibold tabular-nums">{{ shop.wishlist.value.length }}</span>
        </button>
        <button type="button" class="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]" :aria-label="`Cart, ${shop.count.value} pieces`" @click="shop.cartOpen.value = true">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8h11l-.6 11H7.1L6.5 8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8V7a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          <span class="sr-only lg:not-sr-only">Cart</span>
          <span class="tabular-nums">{{ shop.count.value }}</span>
        </button>
      </div>
    </div>
    <nav class="flex h-11 items-center gap-5 overflow-x-auto border-t border-[#f2f2f2] px-4 lg:justify-center lg:gap-7 lg:px-0" aria-label="Categories">
      <NuxtLink
        v-for="item in sub"
        :key="item.label"
        :to="item.to"
        class="shrink-0 text-[11px] uppercase tracking-[0.16em]"
        :class="item.on() ? 'font-bold text-ink' : 'text-muted'"
        :aria-current="item.on() ? 'page' : undefined"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
    <SearchPanel />
  </header>

  <div v-if="shop.menuOpen.value" class="fixed inset-x-0 bottom-0 top-[108px] z-30 flex flex-col gap-5 bg-white px-6 py-8 lg:hidden">
    <NuxtLink v-for="item in main" :key="item.label" :to="item.to" class="font-serif text-3xl" @click="shop.menuOpen.value = false">{{ item.label }}</NuxtLink>
    <NuxtLink v-for="item in sub" :key="`m-${item.label}`" :to="item.to" class="font-serif text-2xl text-neutral-600" @click="shop.menuOpen.value = false">{{ item.label }}</NuxtLink>
  </div>
</template>
