import { Link, useParams } from 'react-router-dom'
import { ShoppingBag, MessageCircle, Truck, Clock, ShieldCheck, MapPin, Phone, CheckCircle } from 'lucide-react'

export default function Success() {
  // ✅ useParams and id completely unchanged
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-2xl">

      {/* ── Success card ──────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">

        {/* Green top band with animated checkmark */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 px-8 py-12 text-center text-white">
          {/* Background circles decoration */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10" />

          {/* Animated success icon */}
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
            <CheckCircle className="h-10 w-10 text-green-600" />
            {/* Ping ring */}
            <span className="absolute inset-0 animate-ping rounded-full bg-green-300 opacity-20" />
          </div>

          <h1 className="text-3xl font-black sm:text-4xl">Order Placed!</h1>
          <p className="mt-2 text-green-100/80">
  Thank you! Your Cash on Delivery order has been received and is being processed.
  Our team will confirm your order soon on WhatsApp.
</p>
        </div>

        {/* Card body */}
        <div className="p-6 sm:p-8">

          {/* ✅ Order ID from useParams — unchanged */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-green-200 bg-green-50">
            <div className="border-b border-green-200 px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700">Order Confirmation</p>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="mt-0.5 font-black text-gray-900 tracking-wide">#{id}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mb-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">What happens next</h2>
            <div className="space-y-3">
              {[
                { Icon: MessageCircle, color: 'bg-green-100 text-green-700', title: 'WhatsApp Confirmation',   desc: 'Admin receives your order details on WhatsApp instantly.'              },
                { Icon: Phone,         color: 'bg-blue-100 text-blue-700',   title: 'Order Verification Call', desc: 'Our team may call to confirm your address and delivery details.'       },
                { Icon: Truck,         color: 'bg-amber-100 text-amber-700', title: 'Dispatched in 24hrs',     desc: 'Your order is packed and handed to our courier partner.'              },
                { Icon: MapPin,        color: 'bg-purple-100 text-purple-700',title: 'Delivered to Your Door', desc: 'Pay in cash when the rider arrives — no prepayment needed.'          },
              ].map(({ Icon, color, title, desc }, i) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {i < 3 && <div className="h-6 w-px bg-gray-200" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-gray-900">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery info strip */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { Icon: Clock,        label: '2–5 Days',    sub: 'Est. delivery'  },
              { Icon: ShieldCheck,  label: 'COD',         sub: 'Pay on arrival' },
              { Icon: MessageCircle,label: 'WhatsApp',    sub: '24/7 Support'   },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-gray-50 py-3 text-center">
                <Icon className="h-4 w-4 text-green-600" />
                <p className="text-xs font-bold text-gray-900">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            {/* ✅ /shop route unchanged */}
            <Link
              to="/shop"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:scale-[1.02] active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Link>

            {/* WhatsApp support */}
            {/* ✅ VITE_ADMIN_WHATSAPP env var unchanged */}
            <a
              href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}?text=${encodeURIComponent(`Hi! I need help with my order #${id}`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3.5 text-sm font-bold text-gray-700 transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Track or Query Order #{id}
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom note ───────────────────────────────────────────────── */}
      <p className="mt-6 text-center text-xs text-gray-400">
        🔒 Your order is saved securely. Keep your Order ID <span className="font-bold text-gray-600">#{id}</span> for reference.
      </p>
    </div>
  )
}
