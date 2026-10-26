<script setup lang="ts">
import { products } from "~/data/catalog"
import { money } from "~/data/catalog"

const shop = useBoutique()
const query = ref("")
const input = ref<HTMLInputElement | null>(null)

const hits = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return products.filter((product) => `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase().includes(q)).slice(0, 6)
})

watch(() => shop.searchOpen.value, async (open) => {
  if (!open) return
  await nextTick()
  input.value?.focus()
})
</script>

<template>
  <div v-if="shop.searchOpen.value" class="absolute inset-x-0 top-full border-b border-line bg-white pb-3">
    <div class="flex items-center px-5">
      <label class="sr-only" for="search-input">Search the house</label>
      <input
        id="search-input"
        ref="input"
        v-model="query"
        type="search"
        placeholder="Search suits, gowns, wedding"
        class="w-full border-0 border-b border-line bg-transparent py-3 font-serif text-xl outline-none"
        autocomplete="off"
      >
      <button type="button" class="px-2 text-sm uppercase tracking-[0.14em]" @click="shop.searchOpen.value = false">Close</button>
    </div>
    <div class="px-5">
      <p v-if="!query.trim()" class="py-3 text-sm text-muted">Try pinstripe, gold, wedding, trench, blush.</p>
      <p v-else-if="!hits.length" class="py-3 text-sm text-muted">Nothing under “{{ query.trim() }}”.</p>
      <div v-else>
        <NuxtLink
          v-for="product in hits"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-[#f3f3f3] py-2"
          @click="shop.searchOpen.value = false"
        >
          <img :src="product.image" alt="" class="h-16 w-12 bg-soft object-cover">
          <span class="text-sm">{{ product.name }}</span>
          <span>{{ money(product.price) }}</span>
        </NuxtLink>
        <NuxtLink :to="`/clothing?q=${encodeURIComponent(query.trim())}`" class="mt-3 inline-block border-b border-ink text-[11px] uppercase tracking-[0.14em]" @click="shop.searchOpen.value = false">
          See all matches
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
