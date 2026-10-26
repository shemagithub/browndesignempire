export type Product = {
  id: string
  name: string
  price: number
  image: string
  fit?: "contain"
  look: string
  tags: string[]
  sizes: string[]
  description: string
}

export type Look = {
  id: string
  name: string
  image: string
  copy: string
  products: string[]
}

export const looks: Look[] = [
  {
    id: "01",
    name: "The Empire Suit",
    image: "/images/look-empire.jpg",
    copy: "A white pinstripe jacket with a shoulder cut like architecture, a narrow black tie, and a black wool trouser. Made in the Kigali house.",
    products: ["pinstripe-jacket", "empire-suit"]
  },
  {
    id: "02",
    name: "Noir & Gold",
    image: "/images/look-gold.jpg",
    copy: "Evening stripes in black and gold. A halter column with a high-low hem, finished with a fine gold sandal.",
    products: ["gold-gown", "gold-sandal"]
  },
  {
    id: "03",
    name: "Civil Vow",
    image: "/images/look-civil.jpg",
    copy: "Ivory wool for the ceremony and the dinner after. A three-piece suit, a black shirt, and a line that stays clean in photographs.",
    products: ["ivory-jacket", "ivory-suit"]
  },
  {
    id: "04",
    name: "The Trench",
    image: "/images/look-trench.jpg",
    copy: "An oversized cotton trench, belted once, over a black slip. The coat that leaves the house with you, with a kitten slingback.",
    products: ["trench", "slingback"]
  },
  {
    id: "05",
    name: "His & Hers",
    image: "/images/look-blush.jpg",
    copy: "Blush tailoring with a soft shoulder and a wide-leg trouser. Cut as a pair, for the two of you.",
    products: ["blush-jacket", "blush-trouser"]
  },
  {
    id: "06",
    name: "After Dark",
    image: "/images/look-noir.jpg",
    copy: "Charcoal, double-breasted, after dark. A strong shoulder, a black shirt, and nothing extra.",
    products: ["charcoal-jacket", "after-dark"]
  }
]

export const products: Product[] = [
  {
    id: "pinstripe-jacket",
    name: "Architectural Pinstripe Jacket",
    price: 890,
    image: "/images/product-empire-jacket.jpg",
    look: "01",
    tags: ["suits", "men"],
    sizes: ["46", "48", "50", "52", "54"],
    description: "White pinstripe wool with an architectural shoulder, one button, and a narrow black tie. Cut in Kigali."
  },
  {
    id: "empire-suit",
    name: "The Empire Suit",
    price: 1170,
    image: "/images/look-empire.jpg",
    fit: "contain",
    look: "01",
    tags: ["suits", "men"],
    sizes: ["46", "48", "50", "52", "54"],
    description: "The full look: architectural pinstripe jacket, black wool trouser, and narrow tie."
  },
  {
    id: "gold-gown",
    name: "Noir & Gold Column",
    price: 740,
    image: "/images/product-gold-gown.jpg",
    look: "02",
    tags: ["gowns", "women"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Black and gold striped halter gown with a wrapped neck and a high-low hem."
  },
  {
    id: "gold-sandal",
    name: "Gold Strap Sandal",
    price: 210,
    image: "/images/product-gold-sandal.jpg",
    look: "02",
    tags: ["shoes", "women"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    description: "A fine gold strap sandal, worn with the evening column."
  },
  {
    id: "ivory-jacket",
    name: "Ivory Vow Jacket",
    price: 640,
    image: "/images/product-ivory-jacket.jpg",
    look: "03",
    tags: ["wedding", "suits", "men"],
    sizes: ["46", "48", "50", "52", "54"],
    description: "Ivory wool jacket with a black shirt. The jacket from the civil wedding suit."
  },
  {
    id: "ivory-suit",
    name: "Ivory Vow Suit",
    price: 960,
    image: "/images/look-civil.jpg",
    fit: "contain",
    look: "03",
    tags: ["wedding", "suits", "men"],
    sizes: ["46", "48", "50", "52", "54"],
    description: "Three-piece ivory wool suit with a black shirt and ivory tie. For the vow and the dinner after."
  },
  {
    id: "trench",
    name: "Atelier Cotton Trench",
    price: 420,
    image: "/images/product-trench.jpg",
    look: "04",
    tags: ["women", "outerwear"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Oversized beige cotton trench with a belt, gun flap, and dark buttons."
  },
  {
    id: "slingback",
    name: "Kitten Slingback",
    price: 240,
    image: "/images/product-heels.jpg",
    look: "04",
    tags: ["shoes", "women"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    description: "Black leather slingback with a kitten heel and a small bow."
  },
  {
    id: "blush-jacket",
    name: "Blush Shoulder Jacket",
    price: 480,
    image: "/images/product-blush-jacket.jpg",
    look: "05",
    tags: ["suits", "women", "his-hers"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Blush wool jacket with a soft peak lapel. Pair it with the wide-leg trouser."
  },
  {
    id: "blush-trouser",
    name: "Blush Wide-Leg Trouser",
    price: 310,
    image: "/images/product-blush-trousers.jpg",
    look: "05",
    tags: ["women", "his-hers"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-waist blush trouser with a full leg. Cut to match the shoulder jacket."
  },
  {
    id: "charcoal-jacket",
    name: "Charcoal Double-Breast Jacket",
    price: 720,
    image: "/images/product-charcoal-jacket.jpg",
    look: "06",
    tags: ["suits", "men"],
    sizes: ["46", "48", "50", "52", "54"],
    description: "Charcoal wool, double-breasted, with a strong shoulder and a dark satin lining."
  },
  {
    id: "after-dark",
    name: "After Dark Suit",
    price: 980,
    image: "/images/look-noir.jpg",
    fit: "contain",
    look: "06",
    tags: ["suits", "men"],
    sizes: ["46", "48", "50", "52", "54"],
    description: "The full charcoal double-breasted suit with a black shirt."
  }
]

export const collections = [
  { name: "His & Hers", text: "Blush tailoring cut as a pair.", image: "/images/look-blush.jpg", to: "/clothing?cat=his-hers" },
  { name: "Civil Wedding", text: "Ivory suiting for the vow and the dinner after.", image: "/images/look-civil.jpg", to: "/clothing?cat=wedding" },
  { name: "Men's Suits", text: "Architectural shoulders, black wool, charcoal after dark.", image: "/images/look-empire.jpg", to: "/clothing?cat=men" },
  { name: "Women's Evening", text: "Gold stripes and a column that moves.", image: "/images/look-gold.jpg", to: "/clothing?cat=gowns" }
]

export const atelierShots = [
  { src: "/images/ig1.jpg", alt: "A fitting underway in the Brown Design Empire house" },
  { src: "/images/ig2.jpg", alt: "Ise Brawn in a white jacket" },
  { src: "/images/ig3.jpg", alt: "White pinstripe suit with an architectural shoulder" },
  { src: "/images/ig4.jpg", alt: "Black and gold striped evening dress" }
]

export const categories = [
  { id: "", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "suits", label: "Suits" },
  { id: "gowns", label: "Gowns" },
  { id: "wedding", label: "Wedding" },
  { id: "his-hers", label: "His & Hers" },
  { id: "shoes", label: "Shoes" }
]

export function money(n: number) {
  return "$" + Number(n).toLocaleString("en-US")
}

export function findProduct(id: string) {
  return products.find((item) => item.id === id) || null
}

export function findLook(id: string) {
  return looks.find((item) => item.id === id) || null
}

export function piecesFor(lookId: string) {
  return (findLook(lookId)?.products || []).map(findProduct).filter((item): item is Product => Boolean(item))
}

export function filterProducts(opts: { cat?: string; look?: string; q?: string; sort?: string }) {
  const q = (opts.q || "").trim().toLowerCase()
  let list = products.filter((product) => {
    if (opts.cat && !product.tags.includes(opts.cat)) return false
    if (opts.look && product.look !== opts.look) return false
    if (q && !`${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase().includes(q)) return false
    return true
  })
  if (opts.sort === "low") list = [...list].sort((a, b) => a.price - b.price)
  if (opts.sort === "high") list = [...list].sort((a, b) => b.price - a.price)
  return list
}
