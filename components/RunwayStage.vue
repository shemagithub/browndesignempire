<script setup lang="ts">
import type { CSSProperties } from "vue"
import { looks, piecesFor } from "~/data/catalog"

type Slot = { left: string; width: string; blur: number; opacity: number; scale: number; z: number }

const desktop: Record<number, Slot> = {
  0: { left: "52%", width: "42%", blur: 0, opacity: 1, scale: 1, z: 5 },
  [-1]: { left: "26%", width: "36%", blur: 1.5, opacity: 1, scale: 0.94, z: 4 },
  [-2]: { left: "5%", width: "32%", blur: 8, opacity: 0.9, scale: 0.86, z: 3 },
  [-3]: { left: "-14%", width: "30%", blur: 16, opacity: 0.4, scale: 0.8, z: 2 },
  1: { left: "96%", width: "42%", blur: 0, opacity: 0, scale: 1, z: 1 }
}

const mobile: Record<number, Slot> = {
  0: { left: "22%", width: "74%", blur: 0, opacity: 1, scale: 1, z: 5 },
  [-1]: { left: "-22%", width: "58%", blur: 7, opacity: 0.85, scale: 0.86, z: 3 },
  1: { left: "88%", width: "60%", blur: 0, opacity: 0, scale: 0.9, z: 2 }
}

const route = useRoute()
const router = useRouter()
const shop = useBoutique()
const narrow = ref(false)
const smooth = ref(false)
const index = ref(0)
const styles = ref<Record<string, CSSProperties>>({})
const prevDelta = new Map<string, number>()

const look = computed(() => looks[index.value] || looks[0])
const pieces = computed(() => piecesFor(look.value.id))

function deltaFor(i: number) {
  let d = i - index.value
  const n = looks.length
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

function layout() {
  const map = narrow.value ? mobile : desktop
  const next: Record<string, CSSProperties> = {}
  looks.forEach((item, i) => {
    const d = deltaFor(i)
    const slot = map[d] || (d > 0
      ? { left: "110%", width: narrow.value ? "70%" : "40%", blur: 0, opacity: 0, scale: 1, z: 1 }
      : { left: "-46%", width: narrow.value ? "50%" : "30%", blur: 18, opacity: 0, scale: 0.8, z: 0 })
    const before = prevDelta.get(item.id)
    const jump = before !== undefined && Math.abs(before - d) > 2
    prevDelta.set(item.id, d)
    next[item.id] = {
      left: slot.left,
      width: slot.width,
      zIndex: slot.z,
      opacity: slot.opacity,
      filter: `blur(${slot.blur}px)`,
      transform: `scale(${slot.scale})`,
      pointerEvents: slot.opacity < 0.15 ? "none" : "auto",
      transition: smooth.value && !jump ? "left .7s cubic-bezier(.22,.8,.24,1), transform .7s cubic-bezier(.22,.8,.24,1), filter .7s ease, opacity .55s ease, width .7s cubic-bezier(.22,.8,.24,1)" : "none"
    }
  })
  styles.value = next
}

function readQuery() {
  const id = route.query.look
  if (typeof id !== "string") return
  const found = looks.findIndex((item) => item.id === id)
  if (found >= 0) index.value = found
}

function setLook(id: string) {
  const found = looks.findIndex((item) => item.id === id)
  if (found < 0) return
  index.value = found
  if (route.path === "/" && route.query.look !== id) {
    router.replace({ path: "/", query: { look: id } })
  }
}

function step(dir: number) {
  const next = (index.value + dir + looks.length) % looks.length
  setLook(looks[next].id)
}

function focus(id: string) {
  if (look.value.id !== id) setLook(id)
}

function measure() {
  narrow.value = window.matchMedia("(max-width: 1023px)").matches
}

function onKey(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.closest("input, textarea, select")) return
  if (shop.locked.value) return
  if (event.key === "ArrowRight") { event.preventDefault(); step(1) }
  if (event.key === "ArrowLeft") { event.preventDefault(); step(-1) }
}

let startX: number | null = null
let swiped = false

function down(event: PointerEvent) {
  if ((event.target as HTMLElement).closest("a, .arrow")) return
  startX = event.clientX
  swiped = false
}

function up(event: PointerEvent) {
  if (startX === null) return
  const dx = event.clientX - startX
  startX = null
  if (Math.abs(dx) > 48) {
    swiped = true
    step(dx < 0 ? 1 : -1)
  }
}

function captureClick(event: MouseEvent) {
  if (!swiped) return
  event.preventDefault()
  event.stopPropagation()
  swiped = false
}

readQuery()
watch(() => route.query.look, readQuery)
watch([index, narrow, smooth], layout, { immediate: true })

useSeoMeta({
  title: () => `Look ${look.value.id} — Brown Design Empire`,
  description: () => look.value.copy
})

onMounted(() => {
  measure()
  smooth.value = true
  window.addEventListener("resize", measure)
  window.addEventListener("keydown", onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", measure)
  window.removeEventListener("keydown", onKey)
})
</script>

<template>
  <section class="lg:grid lg:h-[calc(100vh-108px)] lg:min-h-[620px] lg:grid-cols-[minmax(0,1fr)_318px]">
    <div
      class="relative h-[78vh] min-h-[520px] overflow-hidden bg-stage lg:h-auto"
      @pointerdown="down"
      @pointerup="up"
      @click.capture="captureClick"
    >
      <div class="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[42%] bg-gradient-to-r from-stage/80 to-transparent" />
      <button
        v-for="item in looks"
        :key="item.id"
        type="button"
        class="runway-figure absolute bottom-0 h-[94%] origin-bottom border-0 bg-transparent p-0"
        :style="styles[item.id]"
        :aria-current="item.id === look.id ? 'true' : undefined"
        @click="focus(item.id)"
      >
        <img :src="item.image" :alt="item.name" draggable="false" class="pointer-events-none h-full w-full select-none object-contain object-bottom">
      </button>

      <div class="pointer-events-none absolute left-5 top-8 z-[6] w-[min(280px,62%)] sm:left-9 sm:w-[min(280px,34%)]">
        <h1 class="font-serif text-2xl font-medium uppercase leading-none tracking-[0.14em] sm:text-[32px]">Atelier 2026</h1>
        <p class="mt-3 text-[13px] leading-relaxed text-neutral-500">{{ look.copy }}</p>
      </div>

      <div class="absolute bottom-7 left-5 z-[6] sm:left-9">
        <p class="font-serif text-5xl font-medium uppercase leading-none tracking-[0.06em] sm:text-6xl">Look {{ look.id }}</p>
        <p class="mt-2 font-serif text-xl italic text-ink">{{ look.name }}</p>
        <NuxtLink :to="`/clothing?look=${look.id}`" class="mt-3.5 inline-block border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.18em]">
          Shop the look
        </NuxtLink>
      </div>

      <button type="button" class="arrow absolute left-4 top-1/2 z-[7] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90" aria-label="Previous look" @click="step(-1)">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5L7.5 12l7 7" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
      </button>
      <button type="button" class="arrow absolute right-4 top-1/2 z-[7] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90" aria-label="Next look" @click="step(1)">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
      </button>
    </div>

    <aside class="min-h-0 overflow-auto border-t border-line bg-white lg:border-l lg:border-t-0" aria-label="Pieces in this look">
      <p class="sticky top-0 z-[2] bg-white px-5 pb-2 pt-4 text-[11px] uppercase tracking-[0.16em] text-muted">In this look</p>
      <Transition name="rail" mode="out-in">
        <div :key="look.id" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          <PieceCard v-for="product in pieces" :key="product.id" :product="product" />
        </div>
      </Transition>
    </aside>
  </section>
</template>

<style scoped>
.rail-enter-active,
.rail-leave-active { transition: opacity 0.28s ease; }
.rail-enter-from,
.rail-leave-to { opacity: 0; }
</style>
