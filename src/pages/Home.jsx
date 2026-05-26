import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, Truck, RotateCcw, MessageCircle,
  ChevronDown, Star, Package, CheckCircle, Headphones,
  ArrowRight, Sparkles, MapPin, Phone, Mail,
} from 'lucide-react'
import Shop from './Shop.jsx'

// ─── Static UI data (no products — those come from Shop) ────────────────────

const BADGES = [
  { label: 'Cash on Delivery', Icon: ShieldCheck, color: 'bg-green-50 text-green-700 border-green-200' },
  { label: 'Fast Delivery',     Icon: Truck,        color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'Easy Return',       Icon: RotateCcw,    color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { label: 'WhatsApp Support',  Icon: MessageCircle,color: 'bg-lime-50 text-lime-700 border-lime-200' },
]

const FEATURES = [
  { Icon: Truck,        title: 'Free Delivery',       desc: 'Free shipping on all orders above Rs. 5,000 across Pakistan.',       color: 'from-green-500 to-emerald-600' },
  { Icon: ShieldCheck,  title: 'Cash on Delivery',    desc: 'Pay when your parcel arrives. No prepayment required.',              color: 'from-emerald-500 to-teal-600' },
  { Icon: RotateCcw,    title: '7-Day Easy Return',   desc: 'Not satisfied? Return within 7 days, no questions asked.',           color: 'from-teal-500 to-green-600' },
  { Icon: MessageCircle,title: '24/7 WhatsApp',       desc: 'Dedicated support team available on WhatsApp around the clock.',     color: 'from-lime-500 to-green-600' },
  { Icon: Star,         title: '100% Authentic',      desc: 'Every product sourced directly from verified Pakistani suppliers.',   color: 'from-green-600 to-emerald-700' },
  { Icon: Package,      title: 'Secure Packaging',    desc: 'Orders packed carefully to ensure they arrive in perfect condition.', color: 'from-emerald-600 to-teal-700' },
]

const CATEGORIES = [
  { name: 'Kids & Mother', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80', sub: 'Baby, Kids & Mother Care' },
  { name: 'Woman Corner', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', sub: 'Fashion, Beauty & Accessories' },
  { name: 'China', image: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=600&q=80', sub: 'Imported China Products' },
  { name: 'Urdu Bazar', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80', sub: 'Books, Stationery & Study Items' },
  { name: 'Beauty & Care', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', sub: 'Skin, Hair & Personal Care' },
  { name: "Men's Fashion", image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80', sub: 'Clothing, Shoes & Accessories' },
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80', sub: 'Decor, Kitchen & Bedding' },
  { name: 'Tech & Tools', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', sub: 'Gadgets, Tools & Accessories' },
]

const HOW_IT_WORKS = [
  { step: '01', Icon: Package,      title: 'Browse & Select',   desc: 'Explore our curated collection and add your favourites to cart.'          },
  { step: '02', Icon: MessageCircle,title: 'Confirm on WhatsApp',desc: 'We confirm your order & delivery details via WhatsApp message.'           },
  { step: '03', Icon: Truck,        title: 'We Pack & Ship',    desc: 'Your order is packed securely and dispatched within 24 hours.'             },
  { step: '04', Icon: CheckCircle,  title: 'Pay on Delivery',   desc: 'Receive your parcel at your door and pay the rider — simple as that!'      },
]

const REVIEWS = [
  { name: 'Ayesha Malik',   city: 'Lahore',      text: 'Absolutely amazing quality! The lawn suit arrived perfectly packed. Will definitely order again.', rating: 5, initials: 'AM' },
  { name: 'Bilal Ahmed',    city: 'Karachi',     text: 'Fast delivery and authentic products. COD made it so easy. Got my order in 2 days!',              rating: 5, initials: 'BA' },
  { name: 'Sana Rehman',    city: 'Islamabad',   text: 'The embroidered shawl is stunning. Customer support was super responsive on WhatsApp.',           rating: 5, initials: 'SR' },
  { name: 'Usman Qureshi',  city: 'Rawalpindi',  text: 'Great prices and great products. WhatsApp ordering is the easiest thing ever. 10/10!',           rating: 4, initials: 'UQ' },
]

const FAQS = [
  { q: 'How long does delivery take?',       a: 'We deliver within 2–5 business days across Pakistan. Major cities like Karachi, Lahore, and Islamabad typically receive orders in 2–3 days.' },
  { q: 'Do you offer Cash on Delivery?',     a: 'Yes! COD is available across all major cities in Pakistan. You pay the rider when the parcel arrives at your door.' },
  { q: 'What is your return policy?',        a: 'We offer a 7-day easy return policy. Contact us via WhatsApp or email within 7 days and we\'ll arrange a hassle-free return.' },
  { q: 'How do I track my order?',           a: 'Once dispatched, you\'ll receive a tracking number via SMS and WhatsApp. Use it on our courier partner\'s website to track in real time.' },
  { q: 'Are your products 100% authentic?',  a: 'Absolutely. We work directly with verified Pakistani artisans and manufacturers to guarantee authenticity and quality.' },
  { q: 'Can I place a bulk/wholesale order?',a: 'Yes! We offer special bulk pricing for orders above 10 items. Reach out on WhatsApp for custom corporate pricing.' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < n ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${open ? 'border-green-300 shadow-md shadow-green-50' : 'border-gray-200 bg-white'}`}>
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
        <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div className="border-t border-green-100 bg-green-50/50 px-6 py-4">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  const productsRef = useRef(null)

  const scrollToProducts = (e) => {
    e.preventDefault()
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[520px] md:min-h-[88vh] overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800">

        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          {/* Animated blobs */}
          <div className="absolute -top-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-green-500/20 blur-3xl" />
          <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600/10 blur-3xl" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left */}
            <div className="text-center lg:text-left">
              {/* Pill badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                🇵🇰 Pakistan's Trusted COD Store
              </div>

              <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Trendy Products
                <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Delivered to
                </span>
                Your Door
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-green-100/80 lg:mx-0 mx-auto">
                Order from your mobile. Confirm on WhatsApp. Pay cash when the parcel arrives.
                No account needed — 100% hassle-free.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <button
                  onClick={scrollToProducts}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-green-400 px-8 py-4 text-base font-bold text-green-950 shadow-lg shadow-green-900/40 transition-all duration-200 hover:bg-green-300 hover:scale-105 active:scale-95"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <a
                  href="https://wa.me/923001234567?text=Hello!%20I%20want%20to%20place%20an%20order%20on%20PakDrop."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-105"
                >
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order on WhatsApp
                </a>
              </div>

              {/* Trust stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4">
                {[['10K+', 'Happy Customers'], ['500+', 'Products'], ['48hr', 'Avg Delivery'], ['100%', 'Authentic']].map(([val, lbl]) => (
                  <div key={lbl} className="text-center">
                    <div className="text-2xl font-black text-white">{val}</div>
                    <div className="mt-0.5 text-xs font-medium text-green-300/70">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — decorative image card stack */}
            <div className="relative hidden lg:flex items-center justify-center h-[480px]">
              {/* Main image */}
              <div className="relative z-10 w-72 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800"
                  alt="Featured products"
                  className="w-full h-80 object-cover"
                />
                <div className="bg-white p-4">
                  <p className="text-xs text-green-600 font-semibold">🛍️ New Arrivals</p>
                  <p className="font-black text-gray-900">Shop the Latest</p>
                </div>
              </div>

              {/* Floating badge cards */}
              <div className="absolute top-6 left-4 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl -rotate-6 hover:rotate-0 transition-transform duration-300">
                <p className="text-xs text-gray-500">Orders Today</p>
                <p className="text-lg font-black text-green-700">+238 🎉</p>
              </div>
              <div className="absolute bottom-8 right-0 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                <p className="text-xs text-gray-500">Delivery</p>
                <p className="text-lg font-black text-emerald-700">2–5 Days 🚚</p>
              </div>
              <div className="absolute top-1/2 -left-4 z-20 rounded-2xl bg-green-600 px-4 py-3 shadow-xl text-white -rotate-3 hover:rotate-0 transition-transform duration-300">
                <p className="text-xs text-green-200">Payment</p>
                <p className="text-base font-black">Cash on Delivery</p>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-green-400/10 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {BADGES.map(({ label, Icon, color }) => (
              <div
                key={label}
                className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color}`}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">

        {/* ── Gradient background ───────────────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950" />

        {/* ── Blurred glow blobs ────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-green-500/20 blur-[120px]" />
          <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[140px]" />
        </div>

        {/* ── Subtle dot grid ───────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="feat-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="14" cy="14" r="1.2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#feat-dots)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Heading ─────────────────────────────────────────────────── */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/20 px-4 py-1.5 text-sm font-semibold text-green-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Why The Market_Hawk?
            </span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Shop with Confidence
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-green-200/60">
              We've built every feature around making Pakistani online shopping trustworthy, fast, and effortless — from first click to your doorstep.
            </p>
          </div>

          {/* ── Trust stats row ─────────────────────────────────────────── */}
          <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { val: '10,000+', lbl: 'Happy Customers',    emoji: '😊' },
              { val: '24/7',    lbl: 'WhatsApp Support',   emoji: '💬' },
              { val: 'Nationwide', lbl: 'Delivery Coverage', emoji: '🇵🇰' },
              { val: '100%',    lbl: 'Secure COD Payments',emoji: '🔒' },
            ].map(({ val, lbl, emoji }) => (
              <div
                key={lbl}
                className="group flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-green-400/30 hover:bg-white/10"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xl font-black text-white sm:text-2xl">{val}</span>
                <span className="text-xs font-medium text-green-300/70">{lbl}</span>
              </div>
            ))}
          </div>

          {/* ── Feature cards ───────────────────────────────────────────── */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Truck,
                title: 'Free Delivery',
                // ✅ Updated text as requested
                desc: 'Free shipping on all orders above Rs. 5,000 across Pakistan.',
                color: 'from-green-400 to-emerald-500',
                badge: 'Nationwide',
                glow: 'group-hover:shadow-green-500/25',
              },
              {
                Icon: ShieldCheck,
                title: 'Cash on Delivery',
                desc: 'Pay when your parcel arrives. No prepayment required.',
                color: 'from-emerald-400 to-teal-500',
                badge: 'Trusted',
                glow: 'group-hover:shadow-emerald-500/25',
              },
              {
                Icon: RotateCcw,
                title: '7-Day Easy Return',
                desc: 'Not satisfied? Return within 7 days, no questions asked.',
                color: 'from-teal-400 to-green-500',
                badge: 'Guaranteed',
                glow: 'group-hover:shadow-teal-500/25',
              },
              {
                Icon: MessageCircle,
                title: '24/7 WhatsApp',
                desc: 'Dedicated support team available on WhatsApp around the clock.',
                color: 'from-lime-400 to-green-500',
                badge: 'Always On',
                glow: 'group-hover:shadow-lime-500/25',
              },
              {
                Icon: Star,
                title: '100% Authentic',
                desc: 'Every product sourced directly from verified Pakistani suppliers.',
                color: 'from-green-500 to-emerald-600',
                badge: 'Verified',
                glow: 'group-hover:shadow-green-500/25',
              },
              {
                Icon: Package,
                title: 'Secure Packaging',
                desc: 'Orders packed carefully to ensure they arrive in perfect condition.',
                color: 'from-emerald-500 to-teal-600',
                badge: 'Safe',
                glow: 'group-hover:shadow-emerald-500/25',
              },
            ].map(({ Icon, title, desc, color, badge, glow }) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-green-400/30 hover:bg-white/10 hover:shadow-2xl ${glow}`}
              >
                {/* Card top-right gradient blob */}
                <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl transition-all duration-300 group-hover:opacity-25`} />

                {/* Badge */}
                <div className="mb-4 flex items-center justify-between">
                  {/* Icon with gradient glow circle */}
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6 text-white" />
                    {/* Icon glow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-40 blur-md`} />
                  </div>
                  {/* Trust badge pill */}
                  <span className="rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-green-300">
                    {badge}
                  </span>
                </div>

                {/* Text */}
                <h3 className="mb-2 text-lg font-black text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-green-200/60">{desc}</p>

                {/* Bottom border gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-40`} />
              </div>
            ))}
          </div>

          {/* ── Bottom trust strip ──────────────────────────────────────── */}
          <div className="mt-14 flex flex-col items-center gap-3 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-green-300/60">
              {[
                '✅ Cash on Delivery',
                '🚚 2–5 Day Delivery',
                '↩️ 7-Day Returns',
                '🔒 100% Authentic',
                '💬 WhatsApp Support',
              ].map((t) => (
                <span key={t} className="font-medium">{t}</span>
              ))}
            </div>
            <p className="mt-1 text-xs font-semibold text-green-400/50 tracking-widest uppercase">
              Trusted by customers across Pakistan 🇵🇰
            </p>
          </div>

        </div>
      </section>


      {/* ── Featured Products (dynamic — from Shop) ───────────────────────── */}
      <section ref={productsRef} id="products" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                Our Collection
              </span>
              <h2 className="mt-3 text-4xl font-black text-gray-900">Featured Products</h2>
              <p className="mt-2 text-gray-500">
                Handpicked authentic products at unbeatable prices — fetched live from our store.
              </p>
            </div>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-2xl border-2 border-green-600 px-6 py-3 text-sm font-bold text-green-600 transition-all duration-200 hover:bg-green-600 hover:text-white flex-shrink-0"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ✅ Shop component unchanged — all backend fetching lives here */}
          <Shop compact />
        </div>
      </section>

            {/* ─────────────────────────────────────────────────────────────────
          STEP 1 — Replace the old CATEGORIES array at the top of Home.jsx
          with this one (remove the old const CATEGORIES = [...] block)
      ───────────────────────────────────────────────────────────────── */}

      {/*
const CATEGORIES = [
  {
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    sub: 'Lawn, Kurtas, Casual & More',
  },
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
    sub: 'Phones, Accessories & Gadgets',
  },
  {
    name: 'Jewellery',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    sub: 'Gold, Silver & Artificial Sets',
  },
  {
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    sub: 'Decor, Bedding & Storage',
  },
  {
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    sub: 'Chappals, Sneakers & Heels',
  },
  {
    name: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    sub: 'Cookware, Utensils & Appliances',
  },
]
      */}

      

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
              Browse
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Shop by Category
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Explore our curated range of authentic Pakistani products — find exactly what you're looking for.
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
           {[ 
            {
  name: 'Kids & Mother',
  image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
  sub: 'Baby, Kids & Mother Care',
},
{
  name: 'Woman Corner',
  image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
  sub: 'Fashion, Beauty & Accessories',
},
{
  name: 'China',
  image: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=600&q=80',
  sub: 'Imported China Products',
},
{
  name: 'Urdu Bazar',
  image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80',
  sub: 'Books, Stationery & Study Items',
},
{
  name: 'Beauty & Care',
  image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
  sub: 'Skin, Hair & Personal Care',
},
{
  name: "Men's Fashion",
  image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80',
  sub: 'Clothing, Shoes & Accessories',
},
{
  name: 'Home & Living',
  image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
  sub: 'Decor, Kitchen & Bedding',
},
{
  name: 'Tech & Tools',
  image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  sub: 'Gadgets, Tools & Accessories',
},
            ].map(({ name, image, sub }) => (
              // ✅ route unchanged: /shop?category=${name}
              <Link
                key={name}
                to={`/shop?category=${encodeURIComponent(name)}`}
                className="group relative overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Real photo background */}
                <div className="relative h-48 w-full sm:h-52 lg:h-56">
                  <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Dark gradient overlay — always visible at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Hover brightness tint */}
                  <div className="absolute inset-0 bg-green-900/0 transition-colors duration-300 group-hover:bg-green-900/20" />

                  {/* Text content — pinned bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-black leading-tight text-white sm:text-base">
                      {name}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-medium text-white/70 leading-tight">
                      {sub}
                    </p>
                  </div>

                  {/* Arrow indicator — appears on hover */}
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/0 text-white opacity-0 transition-all duration-300 group-hover:bg-white/20 group-hover:opacity-100 backdrop-blur-sm">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-2xl border-2 border-green-600 px-7 py-3 text-sm font-bold text-green-700 transition-all duration-200 hover:bg-green-600 hover:text-white"
            >
              Browse All Categories
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>


      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 to-emerald-900 py-20">
        {/* Dots pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="14" cy="14" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-semibold text-green-300">
              Simple Process
            </span>
            <h2 className="mt-3 text-4xl font-black text-white">How Ordering Works</h2>
            <p className="mx-auto mt-3 max-w-xl text-green-200/70">
              4 simple steps and authentic Pakistani goods are on their way to your door.
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connector line (desktop) */}
            <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-green-500/30 lg:block" />

            {HOW_IT_WORKS.map(({ step, Icon, title, desc }, i) => (
              <div key={step} className="group relative text-center">
                <div className="relative mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-green-500/30 group-hover:scale-110">
                  <Icon className="h-8 w-8" />
                  <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-400 text-xs font-black text-green-950">
                    {step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-green-200/60">{desc}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-14 text-center">
            <a
              href="https://wa.me/923001234567?text=Hello!%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-green-400 px-8 py-4 text-base font-bold text-green-950 shadow-xl transition-all duration-200 hover:bg-green-300 hover:scale-105"
            >
              <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
              Testimonials
            </span>
            <h2 className="mt-3 text-4xl font-black text-gray-900">What Our Customers Say</h2>
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="text-5xl font-black text-green-700">4.8</div>
              <Stars n={5} />
              <p className="text-sm text-gray-400">Based on 2,400+ verified reviews</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map(({ name, city, text, rating, initials }, i) => (
              <div
                key={name}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Stars n={rating} />
                <p className="mt-4 text-sm leading-relaxed text-gray-600">"{text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 text-sm font-bold text-white shadow">
                    {initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" /> {city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
              FAQ
            </span>
            <h2 className="mt-3 text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Everything you need to know before placing your first order.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="font-semibold text-gray-900">Still have a question?</p>
            <p className="mt-1 text-sm text-gray-500">Our support team is available Mon–Sat, 9AM–9PM.</p>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-green-700 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer CTA Banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 to-emerald-800 py-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-green-400/20 blur-3xl" />
          <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-green-300" />
            Limited Time — Free Delivery on Orders Above Rs. 5,000
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Ready to Order?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-green-100/80">
            Join 10,000+ happy customers across Pakistan. Order now with Cash on Delivery — no risk, no hassle.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-green-700 shadow-xl transition-all duration-200 hover:bg-green-50 hover:scale-105"
            >
              Browse Products
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a
              href="https://wa.me/923001234567?text=Hello!%20I%20want%20to%20shop%20from%20PakDrop."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-105"
            >
              <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>

          {/* Mini trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-green-200/80">
            {['✅ Cash on Delivery', '🚚 2–5 Day Delivery', '↩️ 7-Day Returns', '🔒 100% Authentic'].map((t) => (
              <span key={t} className="font-medium">{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
