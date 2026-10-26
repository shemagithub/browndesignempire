import { findProduct, money } from "~/data/catalog"

export type CartLine = { id: string; size: string; qty: number }
export type Client = { name: string; email: string }
export type OrderInfo = { name: string; email: string; city: string; country: string; note: string }
export type Order = { id: string; items: CartLine[]; info: OrderInfo; total: number; at: number }

const STORAGE_KEY = "bde-v1"

export function useBoutique() {
  const cart = useState<CartLine[]>("bde-cart", () => [])
  const wishlist = useState<string[]>("bde-wish", () => [])
  const user = useState<Client | null>("bde-user", () => null)
  const orders = useState<Order[]>("bde-orders", () => [])
  const cartOpen = useState("bde-cart-open", () => false)
  const wishOpen = useState("bde-wish-open", () => false)
  const searchOpen = useState("bde-search-open", () => false)
  const loginOpen = useState("bde-login-open", () => false)
  const menuOpen = useState("bde-menu-open", () => false)
  const toastText = useState("bde-toast", () => "")
  const toastCart = useState("bde-toast-cart", () => false)
  const hydrated = useState("bde-hydrated", () => false)

  const count = computed(() => cart.value.reduce((sum, line) => sum + line.qty, 0))
  const subtotal = computed(() => cart.value.reduce((sum, line) => {
    const product = findProduct(line.id)
    return sum + (product ? product.price * line.qty : 0)
  }, 0))
  const locked = computed(() => cartOpen.value || wishOpen.value || loginOpen.value || menuOpen.value)

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart: cart.value,
      wishlist: wishlist.value,
      user: user.value,
      orders: orders.value
    }))
  }

  function wished(id: string) {
    return wishlist.value.includes(id)
  }

  function add(id: string, size: string, qty = 1) {
    const product = findProduct(id)
    if (!product || !product.sizes.includes(size)) return false
    const line = cart.value.find((item) => item.id === id && item.size === size)
    if (line) line.qty += qty
    else cart.value.push({ id, size, qty })
    return true
  }

  function setQty(id: string, size: string, qty: number) {
    const line = cart.value.find((item) => item.id === id && item.size === size)
    if (!line) return
    if (qty <= 0) cart.value = cart.value.filter((item) => item !== line)
    else line.qty = qty
  }

  function remove(id: string, size: string) {
    cart.value = cart.value.filter((item) => !(item.id === id && item.size === size))
  }

  function toggleWish(id: string) {
    if (!findProduct(id)) return
    if (wishlist.value.includes(id)) wishlist.value = wishlist.value.filter((item) => item !== id)
    else wishlist.value.push(id)
  }

  function showToast(text: string, withCart = false) {
    toastText.value = text
    toastCart.value = withCart
    window.setTimeout(() => {
      if (toastText.value === text) toastText.value = ""
    }, 2800)
  }

  function placeOrder(info: OrderInfo) {
    const order: Order = {
      id: "BDE-" + Math.floor(1000 + Math.random() * 9000),
      items: cart.value.map((line) => ({ ...line })),
      info,
      total: subtotal.value,
      at: Date.now()
    }
    orders.value.unshift(order)
    cart.value = []
    return order
  }

  function closeOverlays() {
    cartOpen.value = false
    wishOpen.value = false
    loginOpen.value = false
    searchOpen.value = false
    menuOpen.value = false
  }

  if (import.meta.client) {
    onMounted(() => {
      if (!hydrated.value) {
        hydrated.value = true
        try {
          const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")
          if (saved) {
            cart.value = Array.isArray(saved.cart) ? saved.cart : []
            wishlist.value = Array.isArray(saved.wishlist) ? saved.wishlist : []
            user.value = saved.user && saved.user.email ? saved.user : null
            orders.value = Array.isArray(saved.orders) ? saved.orders : []
          }
        } catch {
          /* keep the empty cart */
        }
        watch([cart, wishlist, user, orders], persist, { deep: true })
      }
    })

    watch(locked, (on) => {
      document.body.style.overflow = on ? "hidden" : ""
    })
  }

  const route = useRoute()
  watch(() => route.fullPath, () => {
    menuOpen.value = false
    searchOpen.value = false
  })

  return {
    cart,
    wishlist,
    user,
    orders,
    cartOpen,
    wishOpen,
    searchOpen,
    loginOpen,
    menuOpen,
    toastText,
    toastCart,
    count,
    subtotal,
    locked,
    money,
    wished,
    add,
    setQty,
    remove,
    toggleWish,
    showToast,
    placeOrder,
    closeOverlays
  }
}
