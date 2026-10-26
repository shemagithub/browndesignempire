<script setup lang="ts">
import { collections } from "~/data/catalog"

useSeoMeta({
  title: "Collections — Brown Design Empire",
  description: "His and hers, civil wedding, men's suits, and women's evening from Brown Design Empire."
})
</script>

<template>
  <div class="mx-auto w-[min(1180px,calc(100%-2rem))] py-9">
    <p class="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted">Collections</p>
    <h1 class="mb-7 font-serif text-5xl font-medium leading-none">Four edits</h1>
    <div class="grid gap-3.5 md:grid-cols-2">
      <NuxtLink v-for="item in collections" :key="item.name" :to="item.to" class="relative flex min-h-[420px] items-end overflow-hidden bg-stage text-white">
        <img :src="item.image" alt="" class="absolute inset-0 h-full w-full object-cover object-top">
        <div class="relative w-full bg-gradient-to-t from-black/60 to-transparent p-7">
          <h2 class="font-serif text-4xl font-medium">{{ item.name }}</h2>
          <p class="mt-1.5">{{ item.text }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
