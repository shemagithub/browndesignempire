<script setup lang="ts">
import { looks } from "~/data/catalog"

useSeoMeta({
  title: "Lookbook — Brown Design Empire",
  description: "Atelier 2026 looks from Brown Design Empire."
})
</script>

<template>
  <div>
    <section v-for="(look, index) in looks" :key="look.id" class="grid min-h-[70vh] border-b border-line lg:grid-cols-[1.1fr_0.9fr]">
      <div class="min-h-[460px] bg-stage" :class="index % 2 === 1 ? 'lg:order-2' : ''">
        <img :src="look.image" :alt="look.name" class="h-full w-full object-contain object-bottom">
      </div>
      <div class="flex flex-col justify-center px-6 py-10 lg:px-12">
        <p class="font-serif text-xl tracking-[0.16em]">Look {{ look.id }}</p>
        <h2 class="mt-2 font-serif text-5xl font-medium leading-none lg:text-6xl">{{ look.name }}</h2>
        <p class="mt-4 max-w-md text-neutral-700">{{ look.copy }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-6">
          <NuxtLink :to="`/?look=${look.id}`" class="inline-flex h-12 items-center bg-ink px-5 text-xs uppercase tracking-[0.14em] text-white">View on runway</NuxtLink>
          <NuxtLink :to="`/clothing?look=${look.id}`" class="border-b border-ink text-[11px] uppercase tracking-[0.14em]">Shop the look</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
