<script setup lang="ts">
import { atelierShots } from "~/data/catalog"

const sent = ref(false)
const error = ref("")
const name = ref("")
const contact = ref("")
const message = ref("")

function submit() {
  if (name.value.trim().length < 2 || contact.value.trim().length < 3 || message.value.trim().length < 8) {
    error.value = "Add your name, a way to reach you, and a short message."
    return
  }
  error.value = ""
  sent.value = true
}

useSeoMeta({
  title: "The House — Brown Design Empire",
  description: "Ise Brawn designs Brown Design Empire in Kigali. Men's and women's clothing, shipped worldwide."
})
</script>

<template>
  <div class="mx-auto w-[min(1180px,calc(100%-2rem))] py-8">
    <p class="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted">The house</p>
    <h1 class="max-w-[14ch] font-serif text-5xl font-medium leading-[0.9] sm:text-7xl">Fashion design and creativity.</h1>
    <div class="mt-8 grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <img src="/images/ig2.jpg" alt="Ise Brawn in a white jacket" class="aspect-[4/5] w-full bg-ink object-cover object-top">
      <div class="space-y-4 text-[15px] leading-relaxed">
        <p>Ise Brawn designs Brown Design Empire. The house cuts men's and women's clothing — suits, civil wedding clothes, and evening — and ships anywhere in the world.</p>
        <p>The runway is Atelier 2026. Use the arrows, or click a look standing behind the one in focus. The column on the right is what you can order from that look.</p>
        <p><a class="border-b border-ink text-[11px] uppercase tracking-[0.14em]" href="https://www.instagram.com/brown_design_empire250/" target="_blank" rel="noopener">@brown_design_empire250</a></p>
      </div>
    </div>
    <div class="my-9 grid gap-4 border-y border-line py-5 sm:grid-cols-3">
      <p><strong class="block text-[13px] uppercase tracking-[0.08em]">Men and women</strong><span class="text-sm text-muted">Suits, gowns, wedding, pairs.</span></p>
      <p><strong class="block text-[13px] uppercase tracking-[0.08em]">Kigali house</strong><span class="text-sm text-muted">Cut and finished in the atelier.</span></p>
      <p><strong class="block text-[13px] uppercase tracking-[0.08em]">Worldwide</strong><span class="text-sm text-muted">Shipping is arranged after the request.</span></p>
    </div>
    <p class="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted">From the atelier</p>
    <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <img v-for="shot in atelierShots" :key="shot.src" :src="shot.src" :alt="shot.alt" class="aspect-[4/5] w-full object-cover">
    </div>
    <div class="mt-12 max-w-xl">
      <p class="text-[11px] uppercase tracking-[0.18em] text-muted">Write to the house</p>
      <h2 class="mt-1 font-serif text-4xl font-medium">A note, a fitting, an order.</h2>
      <div v-if="sent" class="mt-4 bg-soft p-5">
        <p class="text-[11px] uppercase tracking-[0.16em] text-muted">Received</p>
        <p class="mt-2">Thank you, {{ name }}. This form keeps the note here on the page. For a reply, message <a class="border-b border-ink" href="https://www.instagram.com/brown_design_empire250/" target="_blank" rel="noopener">@brown_design_empire250</a>.</p>
      </div>
      <form v-else class="mt-4 grid gap-3" @submit.prevent="submit">
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Name<input v-model="name" required class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Email or Instagram<input v-model="contact" required class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Message<textarea v-model="message" required minlength="8" class="min-h-28 resize-y border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none" /></label>
        <p class="min-h-5 text-sm text-[#9a3b3b]">{{ error }}</p>
        <button type="submit" class="h-12 bg-ink text-xs uppercase tracking-[0.14em] text-white">Send note</button>
      </form>
    </div>
  </div>
</template>
