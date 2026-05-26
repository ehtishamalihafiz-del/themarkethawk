import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, ArrowLeft, ShieldCheck, Truck, RotateCcw, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { currency } from '../utils/helpers.js'

export default function Cart() {
  const { cart, removeFromCart, changeQty, total } = useCart()

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100">
          <ShoppingCart className="h-12 w-12 text-gray-300" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Your cart is empty</h1>
        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything yet. Browse our collection and find something you love!
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-green-700 hover:scale-105 active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900">My Cart</h1>
          <p className="mt-1 text-sm text-gray-500">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:border-green-300 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map(i => (
            <CartItem
              key={i.id}
              item={i}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="space-y-4">
          <OrderSummary total={total} itemCount={cart.length} />
        </div>
      </div>
    </div>
  )
}

function CartItem({ item: i, onChangeQty, onRemove }) {
  return (
    <div className="group flex gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-green-200 hover:shadow-md sm:p-5">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
        <img
          src={i.image_url}
          alt={i.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-900">{i.name}</h3>
            {i.category && (
              <span className="mt-0.5 inline-block text-xs font-semibold uppercase tracking-wide text-green-600">
                {i.category}
              </span>
            )}
          </div>

          <button
            onClick={() => onRemove(i.id)}
            className="flex-shrink-0 rounded-xl p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => onChangeQty(i.id, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-gray-700 transition-all hover:bg-white hover:text-green-700 hover:shadow-sm active:scale-90"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-black text-gray-900">
              {i.quantity}
            </span>
            <button
              onClick={() => onChangeQty(i.id, 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-gray-700 transition-all hover:bg-white hover:text-green-700 hover:shadow-sm active:scale-90"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-base font-black text-gray-900">
              {currency(i.price * i.quantity)}
            </p>
            {i.quantity > 1 && (
              <p className="text-xs text-gray-400">
                {currency(i.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ total, itemCount }) {
  const deliveryFee = 220
  const grandTotal = total + deliveryFee

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-black text-gray-900">Order Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
            <span className="font-semibold text-gray-900">{currency(total)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Delivery Charges</span>
            <span className="font-semibold text-gray-900">{currency(deliveryFee)}</span>
          </div>

          <div className="my-2 border-t border-gray-100" />

          <div className="flex justify-between">
            <span className="text-base font-black text-gray-900">Total</span>
            <span className="text-xl font-black text-green-700">{currency(grandTotal)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-xs text-gray-500">
          <Tag className="h-3.5 w-3.5 flex-shrink-0 text-green-600" />
          Cash on Delivery — pay when your parcel arrives. No prepayment needed.
        </div>

        <Link
          to="/checkout"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 hover:scale-[1.02] active:scale-95"
        >
          <ShieldCheck className="h-5 w-5" />
          Checkout — Cash on Delivery
        </Link>

        <a
          href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}?text=${encodeURIComponent('Hi! I want to place a COD order.')}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition-all hover:border-green-300 hover:bg-green-50 hover:text-green-700"
        >
          Order via WhatsApp instead
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { Icon: ShieldCheck, label: 'Secure COD' },
          { Icon: Truck, label: 'Fast Delivery' },
          { Icon: RotateCcw, label: '7-Day Return' },
        ].map(({ Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white py-3 text-center shadow-sm"
          >
            <Icon className="h-4 w-4 text-green-600" />
            <span className="text-[11px] font-semibold text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </>
  )
}