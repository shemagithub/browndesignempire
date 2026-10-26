<script setup lang="ts">
import { findProduct, money } from "~/data/catalog"
import type { Order, OrderInfo } from "~/composables/useBoutique"

const shop = useBoutique()
const mode = ref<"lines" | "checkout" | "done">("lines")
const lastOrder = ref<Order | null>(null)
const error = ref("")
const form = reactive<OrderInfo>({ name: "", email: "", city: "", country: "", note: "" })

watch(() => shop.cartOpen.value, (open) => {
  if (!open) return
  if (mode.value === "done") mode.value = "lines"
  const user = shop.user.value
  if (user) {
    form.name = user.name
    form.email = user.email
  }
})

function close() {
  shop.cartOpen.value = false
  mode.value = "lines"
}

function submit() {
  error.value = ""
  if (!form.name.trim() || !form.email.includes("@") || !form.email.includes(".") || !form.city.trim() || !form.country.trim()) {
    error.value = "Add a name, a real email, a city, and a country."
    return
  }
  if (!shop.cart.value.length) {
    error.value = "The cart is empty."
    return
  }
  lastOrder.value = shop.placeOrder({
    name: form.name.trim(),
    email: form.email.trim(),
    city: form.city.trim(),
    country: form.country.trim(),
    note: form.note.trim()
  })
  mode.value = "done"
}

function lineProduct(id: string) {
  return findProduct(id)
}
</script>

<template>
  <div v-if="shop.cartOpen.value" class="fixed inset-0 z-50 bg-ink/30" @click="close" />
  <aside
    v-if="shop.cartOpen.value"
    class="fixed inset-y-0 right-0 z-[60] flex w-full max-w-[420px] flex-col bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.06)]"
    aria-label="Cart"
  >
    <div class="flex items-center justify-between border-b border-line px-5 py-4">
      <h2 class="text-xs uppercase tracking-[0.16em]">Cart</h2>
      <button type="button" aria-label="Close cart" @click="close">Close</button>
    </div>

    <div class="flex-1 overflow-auto px-5 py-2">
      <template v-if="mode === 'done' && lastOrder">
        <p class="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted">Request received</p>
        <h3 class="font-serif text-4xl font-medium">{{ lastOrder.id }}</h3>
        <p class="mt-2 text-sm leading-relaxed">
          Thank you, {{ lastOrder.info.name }}. The house will write to {{ lastOrder.info.email }} to confirm making and shipping to {{ lastOrder.info.city }}, {{ lastOrder.info.country }}. Nothing is charged on this page.
        </p>
        <ul class="mt-4">
          <li v-for="line in lastOrder.items" :key="line.id + line.size" class="flex justify-between gap-3 border-b border-[#f2f2f2] py-2 text-sm">
            <span>{{ lineProduct(line.id)?.name }} · {{ line.size }} × {{ line.qty }}</span>
            <span>{{ lineProduct(line.id) ? money(lineProduct(line.id)!.price * line.qty) : "" }}</span>
          </li>
        </ul>
        <p class="mt-3 font-semibold">{{ money(lastOrder.total) }}</p>
      </template>

      <form v-else-if="mode === 'checkout'" class="grid gap-3 py-4" @submit.prevent="submit">
        <p class="text-[11px] uppercase tracking-[0.16em] text-muted">Order request · {{ money(shop.subtotal.value) }}</p>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Full name<input v-model="form.name" required class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Email<input v-model="form.email" type="email" required class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">City<input v-model="form.city" required class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Country<input v-model="form.country" required class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Note for the house<textarea v-model="form.note" class="min-h-24 resize-y border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none" placeholder="Occasion, timing, measurements" /></label>
        <p class="min-h-5 text-sm text-[#9a3b3b]">{{ error }}</p>
        <button type="submit" class="h-12 bg-ink text-xs uppercase tracking-[0.14em] text-white">Send request</button>
        <button type="button" class="border-b border-ink pb-0.5 text-xs uppercase tracking-[0.14em]" @click="mode = 'lines'">Back to cart</button>
      </form>

      <template v-else>
        <p v-if="!shop.cart.value.length" class="py-10 text-muted">
          Your cart is empty. Choose a size on a look, then use the plus.
        </p>
        <NuxtLink v-if="!shop.cart.value.length" to="/clothing" class="border-b border-ink text-[11px] uppercase tracking-[0.14em]" @click="close">Browse clothing</NuxtLink>
        <article v-for="line in shop.cart.value" :key="line.id + line.size" class="grid grid-cols-[84px_1fr_auto] gap-3 border-b border-[#f1f1f1] py-3.5">
          <NuxtLink :to="`/product/${line.id}`" @click="close"><img :src="lineProduct(line.id)?.image" alt="" class="h-28 w-[84px] bg-soft object-cover"></NuxtLink>
          <div>
            <NuxtLink :to="`/product/${line.id}`" class="text-[13px] uppercase tracking-wide" @click="close">{{ lineProduct(line.id)?.name }}</NuxtLink>
            <p class="mt-1 text-xs text-muted">Size {{ line.size }}</p>
            <div class="mt-2 inline-flex items-center gap-2">
              <button type="button" class="h-7 w-7 border border-line" aria-label="Decrease quantity" @click="shop.setQty(line.id, line.size, line.qty - 1)">−</button>
              <span>{{ line.qty }}</span>
              <button type="button" class="h-7 w-7 border border-line" aria-label="Increase quantity" @click="shop.setQty(line.id, line.size, line.qty + 1)">+</button>
            </div>
          </div>
          <div class="text-right">
            <p>{{ lineProduct(line.id) ? money(lineProduct(line.id)!.price * line.qty) : "" }}</p>
            <button type="button" class="mt-2 text-xs text-muted" @click="shop.remove(line.id, line.size)">Remove</button>
          </div>
        </article>
      </template>
    </div>

    <div v-if="mode === 'lines' && shop.cart.value.length" class="border-t border-line px-5 py-4">
      <div class="mb-3 flex justify-between text-[15px]">
        <span>Subtotal</span>
        <strong>{{ money(shop.subtotal.value) }}</strong>
      </div>
      <p class="mb-3 text-[13px] text-muted">Made to order in Kigali. Ships worldwide in 2–3 weeks. This confirms a request. The house writes to you before anything is sent.</p>
      <button type="button" class="h-12 w-full bg-ink text-xs uppercase tracking-[0.14em] text-white" @click="mode = 'checkout'">Place order request</button>
    </div>
    <div v-else-if="mode === 'done'" class="border-t border-line px-5 py-4">
      <button type="button" class="h-12 w-full bg-ink text-xs uppercase tracking-[0.14em] text-white" @click="close">Keep browsing</button>
    </div>
  </aside>
</template>
