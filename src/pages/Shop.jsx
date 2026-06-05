import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, PackageOpen, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Shop({ compact = false }) {
  // ✅ All state unchanged
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [q, setQ]               = useState('')

  // ✅ UI-only additions
  const [loading,  setLoading]  = useState(true)
  const [category, setCategory] = useState('All')
  useEffect(() => {
  const urlCategory = searchParams.get('category')
  if (urlCategory) {
    setCategory(urlCategory)
  }
}, [searchParams])

  // ✅ Supabase fetch — completely unchanged
  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
  }, [])

  // ✅ Original filter + compact slice — unchanged, category layered on top
  const filtered = products
    .filter(p =>
      (p.name + p.category).toLowerCase().includes(q.toLowerCase()) &&
      (category === 'All' || p.category === category)
    )
    .slice(0, compact ? 6 : 999)

  // Derive category list from live fetched products — no static data
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]

  // ─── Compact mode (used on Home page) ──────────────────────────────────────
  if (compact) {
    return (
      <>
        {loading ? (
          <CompactSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </>
    )
  }

  // ─── Full Shop page ─────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-7xl">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
          Our Collection
        </span>
        <h1 className="mt-3 text-4xl font-black text-gray-900">Shop All Products</h1>
        <p className="mt-2 text-gray-500">
          {loading
            ? 'Loading products…'
            : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* ── Search + filter bar ─────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Search input — ✅ value/onChange unchanged */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 placeholder-gray-400 shadow-sm outline-none transition-all focus:border-green-400 focus:ring-2 focus:ring-green-100"
            placeholder="Search products…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && (
            <button
              onClick={() => setQ('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* Category pills — derived from live products */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <SlidersHorizontal className="h-4 w-4 flex-shrink-0 text-gray-400" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                category === cat
                  ? 'bg-green-600 text-white shadow-md shadow-green-200'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Loading skeleton ─────────────────────────────────────────── */}
      {loading && <FullSkeleton />}

      {/* ── Empty state ──────────────────────────────────────────────── */}
      {!loading && filtered.length === 0 && (
        <EmptyState query={q} category={category} onReset={() => { setQ(''); setCategory('All') }} />
      )}

      {/* ── Product grid — ✅ ProductCard props unchanged ────────────── */}
      {!loading && filtered.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Loading skeletons ────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="h-56 w-full bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 rounded-full bg-gray-200" />
        <div className="h-4 w-3/4 rounded-full bg-gray-200" />
        <div className="h-3 w-1/2 rounded-full bg-gray-200" />
        <div className="mt-4 h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  )
}

function FullSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

function CompactSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ query, category, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <PackageOpen className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No products found</h3>
      <p className="mt-1.5 max-w-xs text-sm text-gray-500">
        {query || (category && category !== 'All')
          ? `No results for "${query}"${category !== 'All' ? ` in "${category}"` : ''}. Try a different search or filter.`
          : 'No products available right now. Check back soon!'}
      </p>
      {(query || (category && category !== 'All')) && onReset && (
        <button
          onClick={onReset}
          className="mt-5 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-green-700 hover:scale-105"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
