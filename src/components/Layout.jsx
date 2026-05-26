import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ShoppingCart, MessageCircle, Menu, X, Zap, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function Layout() {
  const { cart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const location = useLocation()

  // total quantity across all cart items (works whether cart items have qty or not)
  const cartCount = cart.reduce((sum, item) => sum + (item.qty ?? item.quantity ?? 1), 0)

  // Scroll detection for navbar shadow/bg transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const navLinks = [
    { to: '/',        label: 'Home'    },
    { to: '/shop',    label: 'Shop'    },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      {/* ── Announcement bar ───────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-green-700 py-2 text-center text-xs font-semibold text-white tracking-wide">
        🚚 Free Delivery on Orders Above Rs. 5,000 &nbsp;·&nbsp; 🇵🇰 Cash on Delivery Available Nationwide
      </div>

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg shadow-gray-200/60'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-md transition-transform duration-200 group-hover:scale-105">
              <Zap className="h-4 w-4 fill-white text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900">
              The Market
              <span className="text-green-600">_Hawk</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                  isActive(to)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Cart button */}
            <Link
              to="/cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all duration-150 hover:bg-green-50 hover:text-green-700"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
            mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive(to)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'
                }`}
              >
                {label}
                <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}

            {/* Mobile cart link */}
            <Link
              to="/cart"
              className="flex items-center justify-between rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-green-700"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                My Cart
              </span>
              {cartCount > 0 && (
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-black text-green-700">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Page content ──────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="mt-auto bg-gray-950 text-white">

        {/* Top grid */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>
              <Link to="/" className="group mb-4 inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-md">
                  <Zap className="h-4 w-4 fill-white text-white" />
                </div>
                <span className="text-lg font-black">
                  The Market<span className="text-green-400">_Hawk</span>
                </span>
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                Pakistan's trusted Cash on Delivery store. Authentic products delivered to your doorstep.
              </p>
              <a
                href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-green-500 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {[['/', 'Home'], ['/shop', 'Shop All'], ['/contact', 'Contact']].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="transition-colors hover:text-green-400">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                Policies
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {[
                  ['/return-policy',  'Refund Policy'],
                  ['/privacy-policy', 'Privacy Policy'],
                  ['/terms',          'Terms of Service'],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="transition-colors hover:text-green-400">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <a
                    href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    WhatsApp Support
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">📍</span> Pakistan — Nationwide COD
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">🕐</span> Mon–Sat, 9 AM – 9 PM
                </li>
              </ul>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {['COD Available', '7-Day Return', 'Fast Shipping'].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-gray-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} The Market_Hawk — Cash on Delivery shopping in Pakistan 🇵🇰
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link to="/return-policy" className="hover:text-green-400 transition-colors">Refund Policy</Link>
              <span className="opacity-30">·</span>
              <Link to="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy</Link>
              <span className="opacity-30">·</span>
              <Link to="/terms"          className="hover:text-green-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp button ───────────────────────────────────── */}
      <a
        href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-900/40 ring-4 ring-green-400/20 transition-all duration-200 hover:scale-110 hover:bg-green-400 active:scale-95"
      >
        {/* WhatsApp SVG (matches original MessageCircle intent, now uses brand icon) */}
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  )
}
