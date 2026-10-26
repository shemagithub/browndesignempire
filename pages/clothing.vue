<script setup lang="ts">
import { categories, filterProducts, findLook } from "~/data/catalog"

const route = useRoute()
const router = useRouter()

const q = ref(typeof route.query.q === "string" ? route.query.q : "")
const sort = ref(typeof route.query.sort === "string" ? route.query.sort : "featured")

watch(() => route.query.q, (value) => {
  q.value = typeof value === "string" ? value : ""
})
watch(() => route.query.sort, (value) => {
  sort.value = typeof value === "string" ? value : "featured"
})

const cat = computed(() => typeof route.query.cat === "string" ? route.query.cat : "")
const lookId = computed(() => typeof route.query.look === "string" ? route.query.look : "")
const lookName = computed(() => lookId.value ? findLook(lookId.value)?.name || "" : "")
const list = computed(() => filterProducts({ cat: cat.value, look: lookId.value, q: q.value, sort: sort.value }))

function pushFilters() {
  const query: Record<string, string> = {}
  if (cat.value) query.cat = cat.value
  if (lookId.value) query.look = lookId.value
  if (q.value.trim()) query.q = q.value.trim()
  if (sort.value && sort.value !== "featured") query.sort = sort.value
  router.replace({ path: "/clothing", query })
}

useSeoMeta({
  title: () => lookName.value ? `${lookName.value} — Brown Design Empire` : "Clothing — Brown Design Empire",
  description: "Men's and women's clothing from Brown Design Empire."
})
</script>

<template>
  <div class="mx-auto w-[min(1180px,calc(100%-2rem))] py-9 lg:w-[min(1180px,calc(100%-3rem))]">
    <header class="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted">{{ lookName ? "Shop the look" : "Clothing" }}</p>
        <h1 class="font-serif text-5xl font-medium leading-none">{{ lookName || "The edit" }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <label class="sr-only" for="shop-q">Search clothing</label>
        <input id="shop-q" v-model="q" type="search" placeholder="Search" class="w-40 border-0 border-b border-line bg-transparent py-2 outline-none" @change="pushFilters">
        <label class="sr-only" for="shop-sort">Sort</label>
        <select id="shop-sort" v-model="sort" class="border-0 border-b border-line bg-transparent py-2 outline-none" @change="pushFilters">
          <option value="featured">Featured</option>
          <option value="low">Price, low</option>
          <option value="high">Price, high</option>
        </select>
      </div>
    </header>
    <div class="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      <NuxtLink
        v-for="item in categories"
        :key="item.label"
        :to="item.id ? `/clothing?cat=${item.id}` : '/clothing'"
        class="border-b border-transparent pb-1 text-[11px] uppercase tracking-[0.14em]"
        :class="!lookId && cat === item.id ? 'border-ink text-ink' : 'text-neutral-500'"
        :aria-current="!lookId && cat === item.id ? 'page' : undefined"
      >
        {{ item.label }}
      </NuxtLink>
      <NuxtLink v-if="lookId" to="/clothing" class="border-b border-ink text-[11px] uppercase tracking-[0.14em]">Clear look</NuxtLink>
    </div>
    <p class="mb-5 text-sm text-muted">{{ list.length }} {{ list.length === 1 ? "piece" : "pieces" }}</p>
    <div v-if="list.length" class="grid grid-cols-1 gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
      <PieceCard v-for="product in list" :key="product.id" :product="product" />
    </div>
    <div v-else class="py-12 text-muted">
      <p>Nothing in this edit.</p>
      <NuxtLink to="/clothing" class="mt-2 inline-block border-b border-ink text-[11px] uppercase tracking-[0.14em] text-ink">View all clothing</NuxtLink>
    </div>
  </div>
</template>
