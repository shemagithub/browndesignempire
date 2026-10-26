<script setup lang="ts">
const shop = useBoutique()
const error = ref("")
const name = ref("")
const email = ref("")

function close() {
  shop.loginOpen.value = false
  error.value = ""
}

function submit() {
  if (name.value.trim().length < 2 || !email.value.includes("@") || !email.value.includes(".")) {
    error.value = "Enter your name and a full email."
    return
  }
  shop.user.value = { name: name.value.trim(), email: email.value.trim() }
  shop.showToast(`Welcome, ${name.value.trim().split(" ")[0]}.`)
  close()
}

function signOut() {
  const current = shop.user.value?.name
  shop.user.value = null
  name.value = ""
  email.value = ""
  shop.showToast(current ? `Signed out ${current.split(" ")[0]}.` : "Signed out.")
  close()
}
</script>

<template>
  <div v-if="shop.loginOpen.value" class="fixed inset-0 z-[70] grid place-items-center bg-ink/30 p-5" @click.self="close">
    <div class="w-full max-w-[420px] bg-white" role="dialog" aria-labelledby="login-title">
      <div class="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 id="login-title" class="text-xs uppercase tracking-[0.16em]">Login</h2>
        <button type="button" aria-label="Close login" @click="close">Close</button>
      </div>
      <div v-if="shop.user.value" class="grid gap-4 px-5 py-5">
        <p>Signed in as {{ shop.user.value.name }}. This name stays on this device with your cart.</p>
        <button type="button" class="h-12 bg-ink text-xs uppercase tracking-[0.14em] text-white" @click="signOut">Sign out</button>
      </div>
      <form v-else class="grid gap-3 px-5 py-5" @submit.prevent="submit">
        <p class="text-sm text-muted">Saved on this device only. The house keeps your name for the cart.</p>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Name<input v-model="name" required autocomplete="name" class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <label class="grid gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">Email<input v-model="email" type="email" required autocomplete="email" class="border-0 border-b border-line py-2 text-sm normal-case tracking-normal text-ink outline-none"></label>
        <p class="min-h-5 text-sm text-[#9a3b3b]">{{ error }}</p>
        <button type="submit" class="h-12 bg-ink text-xs uppercase tracking-[0.14em] text-white">Continue</button>
      </form>
    </div>
  </div>
</template>
