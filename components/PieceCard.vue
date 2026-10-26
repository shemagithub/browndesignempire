<script setup lang="ts">
import type { Product } from "~/data/catalog"
import { money } from "~/data/catalog"

const props = defineProps<{ product: Product }>()
const shop = useBoutique()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

function onDoc(event: MouseEvent) {
  if (!open.value || !root.value) return
  if (!root.value.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener("click", onDoc))
onBeforeUnmount(() => document.removeEventListener("click", onDoc))

function choose(size: string) {
  if (shop.add(props.product.id, size)) {
    open.value = false
    shop.showToast(`Added ${props.product.name}, size ${size}`, true)
  }
}

function save() {
  shop.toggleWish(props.product.id)
  shop.showToast(shop.wished(props.product.id) ? `Saved ${props.product.name}` : `Removed ${props.product.name}`)
}
</script>

<template>
  <article ref="root" class="relative px-4 pb-5 pt-2">
    <button
      type="button"
      class="absolute left-6 top-4 z-[2] grid h-9 w-9 place-items-center"
      :aria-pressed="shop.wished(product.id)"
      :aria-label="shop.wished(product.id) ? 'Remove from saved' : 'Save this piece'"
      @click="save"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19.5s-6.5-4.1-6.5-8.2A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.5 3.3c0 4.1-6.5 8.2-6.5 8.2z"
          :fill="shop.wished(product.id) ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
    </button>
    <NuxtLink :to="`/product/${product.id}`" class="block aspect-[3/4] overflow-hidden bg-soft">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full"
        :class="product.fit === 'contain' ? 'object-contain' : 'object-cover'"
      >
    </NuxtLink>
    <div class="grid grid-cols-[1fr_auto] items-start gap-x-3 pt-3">
      <NuxtLink :to="`/product/${product.id}`" class="text-[11px] uppercase leading-snug tracking-[0.08em]">
        {{ product.name }}
      </NuxtLink>
      <button type="button" class="row-span-2 self-center px-1 text-[26px] leading-none" :aria-label="`Add ${product.name}`" @click="open = !open">+</button>
      <p class="text-[13px] text-neutral-700">{{ money(product.price) }}</p>
    </div>
    <div v-if="open" class="absolute bottom-[4.5rem] right-4 z-[4] grid w-44 grid-cols-3 gap-1.5 border border-line bg-white p-2.5">
      <p class="col-span-3 text-[10px] uppercase tracking-[0.14em] text-muted">Choose a size</p>
      <button
        v-for="size in product.sizes"
        :key="size"
        type="button"
        class="min-h-[34px] border border-line bg-white hover:border-ink hover:bg-ink hover:text-white"
        @click="choose(size)"
      >
        {{ size }}
      </button>
    </div>
  </article>
</template>
