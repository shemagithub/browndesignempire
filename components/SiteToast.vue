<script setup lang="ts">
const shop = useBoutique()
</script>

<template>
  <div
    v-if="shop.toastText.value"
    class="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center bg-ink px-4 py-3 text-[13px] tracking-wide text-white"
    role="status"
  >
    <span>{{ shop.toastText.value }}</span>
    <button
      v-if="shop.toastCart.value"
      type="button"
      class="ml-3 border-b border-white text-[11px] uppercase tracking-[0.08em]"
      @click="shop.cartOpen.value = true; shop.toastText.value = ''"
    >
      Open cart
    </button>
  </div>
</template>
