import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ShoppingCart, MessageCircle, Menu, X, Zap, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function Layout() {
  const { cart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const cartCount = cart.reduce((sum, item) => sum + (item.qty ?? item.quantity ?? 1), 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      <div className="w-full bg-gradient-to-r from-green-700 via-emerald-700 to-green-700 py-2 text-center text-xs font-semibold text-white tracking-wide">
        🚚 Free Delivery on Orders Above Rs. 5,000 · 🇵🇰 Cash on Delivery Available Nationwide
      </div>

      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-lg shadow-gray-200/60' : 'bg-white/95 backdrop-blur-md'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">

          <Link to="/" className="group flex items-center gap-2 focus:outline-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-md">
              <Zap className="h-4 w-4 fill-white text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-gray-900 sm:text-lg">
              The Market<span className="text-green-600">_Hawk</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${isActive(to) ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        <div className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold ${isActive(to) ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {label}
                <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="mt-auto w-full bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="mb-4 inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-700">
                  <Zap className="h-4 w-4 fill-white text-white" />
                </div>
                <span className="text-lg font-black">The Market<span className="text-green-400">_Hawk</span></span>
              </Link>
              <p className="text-sm text-gray-400">Pakistan's trusted Cash on Delivery store.</p>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}