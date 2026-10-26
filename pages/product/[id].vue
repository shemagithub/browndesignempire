<script setup lang="ts">
import { findLook, findProduct, money, piecesFor } from "~/data/catalog"

const route = useRoute()
const shop = useBoutique()
const product = computed(() => findProduct(String(route.params.id || "")))
const look = computed(() => product.value ? findLook(product.value.look) : null)
const related = computed(() => product.value ? piecesFor(product.value.look).filter((item) => item.id !== product.value!.id) : [])
const selected = ref("")
const hint = ref("")

watch(() => route.params.id, () => {
  selected.value = ""
  hint.value = ""
})

function add() {
  if (!product.value) return
  if (!selected.value) {
    hint.value = "Choose a size first."
    return
  }
  shop.add(product.value.id, selected.value)
  hint.value = `Added, size ${selected.value}.`
  shop.showToast(`Added ${product.value.name}, size ${selected.value}`, true)
}

function save() {
  if (!product.value) return
  shop.toggleWish(product.value.id)
  shop.showToast(shop.wished(product.value.id) ? `Saved ${product.value.name}` : `Removed ${product.value.name}`)
}

useSeoMeta({
  title: () => product.value ? `${product.value.name} — Brown Design Empire` : "Brown Design Empire",
  description: () => product.value?.description || ""
})
</script>

<template>
  <div v-if="!product" class="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
    <h1 class="font-serif text-5xl font-medium">This piece is not in the house.</h1>
    <NuxtLink to="/clothing" class="mt-4 inline-block border-b border-ink text-[11px] uppercase tracking-[0.14em]">Back to clothing</NuxtLink>
  </div>
  <article v-else class="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
    <div class="aspect-[3/4] bg-stage">
      <img :src="product.image" :alt="product.name" class="h-full w-full" :class="product.fit === 'contain' ? 'object-contain' : 'object-cover'">
    </div>
    <div>
      <p class="text-[11px] uppercase tracking-[0.18em] text-muted">Look {{ product.look }}<span v-if="look"> · {{ look.name }}</span></p>
      <h1 class="mt-2 font-serif text-5xl font-medium leading-none">{{ product.name }}</h1>
      <p class="mt-3 text-lg">{{ money(product.price) }}</p>
      <p class="mt-4 max-w-md text-neutral-700">{{ product.description }}</p>
      <p class="mb-2 mt-6 text-[11px] uppercase tracking-[0.18em] text-muted">Size</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in product.sizes"
          :key="size"
          type="button"
          class="min-h-9 min-w-[52px] border px-2"
          :class="selected === size ? 'border-ink bg-ink text-white' : 'border-line bg-white'"
          @click="selected = size; hint = ''"
        >
          {{ size }}
        </button>
      </div>
      <p class="mt-3 min-h-5 text-sm text-[#9a3b3b]">{{ hint && hint.startsWith("Choose") ? hint : "" }}</p>
      <p v-if="hint && !hint.startsWith('Choose')" class="text-sm">{{ hint }}</p>
      <div class="mt-2 flex items-center gap-5">
        <button type="button" class="h-12 bg-ink px-6 text-xs uppercase tracking-[0.14em] text-white" @click="add">Add to cart</button>
        <button type="button" class="border-b border-ink pb-0.5 text-xs uppercase tracking-[0.14em]" @click="save">
          {{ shop.wished(product.id) ? "Saved" : "Save" }}
        </button>
      </div>
      <p class="mt-6 text-sm text-muted">Cut in Kigali. Ships worldwide in 2–3 weeks. Choose a size before adding. The heart saves it on this device.</p>
      <div v-if="related.length" class="mt-10">
        <h2 class="mb-3 font-serif text-3xl font-medium">Also in this look</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PieceCard v-for="item in related" :key="item.id" :product="item" />
        </div>
      </div>
      <NuxtLink :to="`/clothing?look=${product.look}`" class="mt-6 inline-block border-b border-ink text-[11px] uppercase tracking-[0.14em]">Shop the full look</NuxtLink>
    </div>
  </article>
</template>
