<script setup lang="ts">
import { findProduct, money } from "~/data/catalog"

const shop = useBoutique()
const openId = ref("")

function close() {
  shop.wishOpen.value = false
  openId.value = ""
}

function add(id: string, size: string, name: string) {
  if (shop.add(id, size)) {
    openId.value = ""
    shop.showToast(`Added ${name}, size ${size}`, true)
  }
}
</script>

<template>
  <div v-if="shop.wishOpen.value" class="fixed inset-0 z-50 bg-ink/30" @click="close" />
  <aside v-if="shop.wishOpen.value" class="fixed inset-y-0 right-0 z-[60] flex w-full max-w-[420px] flex-col bg-white" aria-label="Saved pieces">
    <div class="flex items-center justify-between border-b border-line px-5 py-4">
      <h2 class="text-xs uppercase tracking-[0.16em]">Saved</h2>
      <button type="button" aria-label="Close saved pieces" @click="close">Close</button>
    </div>
    <div class="flex-1 overflow-auto px-5">
      <p v-if="!shop.wishlist.value.length" class="py-10 text-muted">Nothing saved yet. Use the heart on a piece.</p>
      <article v-for="id in shop.wishlist.value" :key="id" class="relative grid grid-cols-[84px_1fr_auto] gap-3 border-b border-[#f1f1f1] py-3.5">
        <template v-if="findProduct(id)">
          <NuxtLink :to="`/product/${id}`" @click="close"><img :src="findProduct(id)!.image" alt="" class="h-28 w-[84px] bg-soft object-cover"></NuxtLink>
          <div>
            <NuxtLink :to="`/product/${id}`" class="text-[13px] uppercase tracking-wide" @click="close">{{ findProduct(id)!.name }}</NuxtLink>
            <p class="mt-1 text-xs text-muted">{{ money(findProduct(id)!.price) }}</p>
            <button type="button" class="mt-2 border-b border-ink text-[11px] uppercase tracking-[0.12em]" @click="openId = openId === id ? '' : id">Add a size</button>
            <div v-if="openId === id" class="mt-2 grid grid-cols-3 gap-1.5">
              <button
                v-for="size in findProduct(id)!.sizes"
                :key="size"
                type="button"
                class="min-h-8 border border-line hover:bg-ink hover:text-white"
                @click="add(id, size, findProduct(id)!.name)"
              >
                {{ size }}
              </button>
            </div>
          </div>
          <button type="button" class="text-xs text-muted" @click="shop.toggleWish(id)">Remove</button>
        </template>
      </article>
    </div>
  </aside>
</template>
