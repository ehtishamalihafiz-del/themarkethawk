import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Zap, ArrowLeft, BadgeCheck, Truck, RotateCcw, Shield, Star } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useCart } from '../context/CartContext.jsx'
import { currency } from '../utils/helpers.js'

export default function ProductDetail() {
    // ✅ All logic unchanged
    const { slug } = useParams()
    const [p, setP] = useState(null)
    const { addToCart } = useCart()

    // ✅ UI-only additions
    const [added, setAdded] = useState(false)
    const [imgError, setImgError] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    // ✅ Supabase fetch — completely unchanged
    useEffect(() => {
        supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single()
            .then(({ data }) => {
                setP(data)
                setSelectedImage(data?.images?.[0] || data?.image_url || '')
            })
    }, [slug])

    // Tiny UX: flash confirmation — does NOT touch addToCart logic
    const handleAddToCart = () => {
        addToCart(p)
        setAdded(true)
        setTimeout(() => setAdded(false), 1800)
    }

    // ✅ Discount — same formula as ProductCard
    const discount = p?.old_price
        ? Math.round(((p.old_price - p.price) / p.old_price) * 100)
        : 0

    // ── Loading state ──────────────────────────────────────────────────────────
    if (!p) return <LoadingSkeleton />

    const inStock = !p.stock_status || p.stock_status.toLowerCase() !== 'out of stock'

    return (
        <div className="mx-auto max-w-6xl">

            {/* Back link */}
            <Link
                to="/shop"
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-green-700"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Shop
            </Link>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

                {/* ── Image column ──────────────────────────────────────────────── */}
                <div className="space-y-4">
                    {/* Main image */}
                    <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-md">
                        {discount > 0 && (
                            <span className="absolute left-4 top-4 z-10 rounded-xl bg-red-500 px-3 py-1.5 text-sm font-black text-white shadow">
                                -{discount}% OFF
                            </span>
                        )}
                        <img
                            src={imgError ? 'https://placehold.co/600x600?text=No+Image' : selectedImage}
                            alt={p.name}
                            onError={() => setImgError(true)}
                            className="h-[420px] w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-[500px]"
                        />
                    </div>
                </div>

                {p.images?.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {p.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedImage(img)
                                    setImgError(false)
                                }}
                                className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 ${selectedImage === img ? 'border-green-600' : 'border-gray-200'
                                    }`}
                            >
                                <img src={img} alt={`${p.name} ${index + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}



                {/* Trust strip below image */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { Icon: Truck, label: 'Fast Delivery' },
                        { Icon: RotateCcw, label: '7-Day Return' },
                        { Icon: Shield, label: '100% Authentic' },
                    ].map(({ Icon, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-1 rounded-2xl border border-gray-100 bg-white py-3 text-center shadow-sm"
                        >
                            <Icon className="h-4 w-4 text-green-600" />
                            <span className="text-[11px] font-semibold text-gray-600">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Detail column ─────────────────────────────────────────────── */}
            <div className="flex flex-col">
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">

                    {/* Category */}
                    {/* ✅ p.category unchanged */}
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-700">
                        {p.category}
                    </span>

                    {/* Name — ✅ p.name unchanged */}
                    <h1 className="mt-3 text-3xl font-black leading-tight text-gray-900 lg:text-4xl">
                        {p.name}
                    </h1>
                    {p.product_code && (
                        <p className="mt-2 text-sm font-semibold text-gray-500">
                            Product Code: {p.product_code}
                        </p>
                    )}

                    {/* Static stars — UI decoration only */}
                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">4.0 · Verified product</span>
                        <BadgeCheck className="h-4 w-4 text-green-600" />
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-100" />

                    {/* Price row — ✅ currency() and p.old_price unchanged */}
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-black text-gray-900">
                            {currency(p.price)}
                        </span>
                        {p.old_price && (
                            <>
                                <del className="mb-1 text-lg text-gray-400">{currency(p.old_price)}</del>
                                {discount > 0 && (
                                    <span className="mb-1 rounded-xl bg-red-50 px-2.5 py-1 text-sm font-bold text-red-600">
                                        Save {discount}%
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    {/* Description — ✅ p.description unchanged */}


                    {/* Stock status — ✅ p.stock_status unchanged */}
                    <div className="mt-4 flex items-center gap-2">
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-400'}`}
                        />
                        <span className={`text-sm font-semibold ${inStock ? 'text-green-700' : 'text-red-600'}`}>
                            {p.stock_status || 'In Stock'}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-100" />

                    {/* CTA buttons — ✅ addToCart(p) and /checkout route unchanged */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleAddToCart}
                            disabled={!inStock}
                            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold transition-all duration-200 active:scale-95 ${added
                                ? 'bg-green-100 text-green-700'
                                : inStock
                                    ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-200'
                                    : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                }`}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {added ? 'Added to Cart ✓' : 'Add to Cart'}
                        </button>

                        {/* ✅ /checkout route + addToCart(p) onClick unchanged */}
                        <Link
                            to="/checkout"
                            onClick={() => addToCart(p)}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-green-600 py-3.5 text-base font-bold text-green-700 transition-all duration-200 hover:bg-green-50 hover:scale-[1.01] active:scale-95"
                        >
                            <Zap className="h-5 w-5" />
                            Buy Now
                        </Link>
                    </div>
                   

                    <div className="mt-6 bg-gray-50 border rounded-2xl p-5">
                        <h2 className="font-bold mb-3">Product Description</h2>
                        <p className="whitespace-pre-line">{p.description}</p>
                    </div>

                    {/* WhatsApp order nudge */}
                    <a
                        href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}?text=${encodeURIComponent(
                            `Hi! I want to order: ${p.name}${p.product_code ? `\nProduct Code: ${p.product_code}` : ''
                            }`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-50 py-3 text-sm font-semibold text-gray-600 transition-all hover:bg-green-50 hover:text-green-700"
                    >
                        <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Order via WhatsApp
                    </a>
                </div>
            </div>
        </div>

    )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
    return (
        <div className="mx-auto max-w-6xl animate-pulse">
            <div className="mb-6 h-5 w-28 rounded-full bg-gray-200" />
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Image skeleton */}
                <div className="space-y-4">
                    <div className="h-[420px] w-full rounded-3xl bg-gray-200 lg:h-[500px]" />
                    <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="h-16 rounded-2xl bg-gray-200" />
                        ))}
                    </div>
                </div>
                {/* Detail skeleton */}
                <div className="rounded-3xl bg-white p-8 shadow-sm space-y-4">
                    <div className="h-5 w-24 rounded-full bg-gray-200" />
                    <div className="h-9 w-3/4 rounded-xl bg-gray-200" />
                    <div className="h-4 w-32 rounded-full bg-gray-200" />
                    <div className="my-5 h-px bg-gray-100" />
                    <div className="h-10 w-40 rounded-xl bg-gray-200" />
                    <div className="space-y-2">
                        <div className="h-4 w-full rounded-full bg-gray-200" />
                        <div className="h-4 w-5/6 rounded-full bg-gray-200" />
                        <div className="h-4 w-4/6 rounded-full bg-gray-200" />
                    </div>
                    <div className="my-5 h-px bg-gray-100" />
                    <div className="h-12 w-full rounded-2xl bg-gray-200" />
                    <div className="h-12 w-full rounded-2xl bg-gray-200" />
                </div>
            </div>
        </div>
    )
}
