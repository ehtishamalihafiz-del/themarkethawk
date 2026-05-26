import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { currency } from '../utils/helpers.js'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  // ✅ Discount logic unchanged
  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0

  // Tiny UX: flash "Added!" then revert — does NOT touch addToCart logic
  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-50">

      {/* ── Image block ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* ✅ Link route unchanged */}
        <Link to={`/product/${product.slug}`} className="block">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        </Link>

        {/* Discount badge — top left */}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-xl bg-red-500 px-2.5 py-1 text-xs font-black text-white shadow-md">
            -{discount}%
          </span>
        )}

        {/* New badge — top right (shows when no discount) */}
        {discount === 0 && (
          <span className="absolute right-3 top-3 rounded-xl bg-green-600 px-2.5 py-1 text-xs font-bold text-white shadow-md">
            New
          </span>
        )}

        {/* Quick view button — appears on hover */}
        <Link
          to={`/product/${product.slug}`}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-gray-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-green-50 hover:text-green-700 whitespace-nowrap"
        >
          <Eye className="h-3.5 w-3.5" />
          Quick View
        </Link>
      </div>

      {/* ── Card body ───────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4">

        {/* Category */}
        {/* ✅ product.category unchanged */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">
          {product.category}
        </p>

        {/* Name — ✅ route unchanged */}
        <Link
          to={`/product/${product.slug}`}
          className="mt-1.5 block text-sm font-bold leading-snug text-gray-900 transition-colors duration-150 hover:text-green-700 line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Star decorations (static UI only — no rating field touched) */}
        <div className="mt-2 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
            />
          ))}
          <span className="ml-1 text-[10px] text-gray-400">(4.0)</span>
        </div>

        {/* Spacer pushes price + button to bottom */}
        <div className="flex-1" />

        {/* Price row — ✅ currency() and product.old_price unchanged */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-black text-gray-900">
            {currency(product.price)}
          </span>
          {product.old_price && (
            <del className="text-sm text-gray-400">
              {currency(product.old_price)}
            </del>
          )}
          {discount > 0 && (
            <span className="ml-auto rounded-lg bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
              Save {discount}%
            </span>
          )}
        </div>

        {/* Add to Cart — ✅ addToCart(product) unchanged */}
        <button
          onClick={handleAddToCart}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
            added
              ? 'bg-green-100 text-green-700'
              : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md hover:shadow-green-200'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {added ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
