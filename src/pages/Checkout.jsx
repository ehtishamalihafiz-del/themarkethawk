import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from 'emailjs-com'
import {
    ShieldCheck, Truck, RotateCcw, MapPin, Phone, MessageCircle,
    User, FileText, Loader2, CheckCircle, Lock, ChevronRight
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useCart } from '../context/CartContext.jsx'
import { currency, makeWhatsAppLink } from '../utils/helpers.js'

export default function Checkout() {
    const { cart, total, clearCart } = useCart()
    const nav = useNavigate()

    const DELIVERY_CHARGES = 220
    const grandTotal = total + DELIVERY_CHARGES

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        customer_name: '',
        phone: '',
        whatsapp: '',
        city: '',
        address: '',
        note: '',
    })

    const set = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    async function submit(e) {
        e.preventDefault()
        if (!cart.length) return alert('Cart is empty')
        setLoading(true)

        const order = {
            ...form,
            items: cart.map(i => ({
                id: i.id,
                name: i.name,
                product_code: i.product_code,
                price: i.price,
                quantity: i.quantity
            })),
            total_amount: grandTotal,
            status: 'Pending',
        }

        const { data, error } = await supabase.from('orders').insert(order).select().single()
        if (error) { alert(error.message); setLoading(false); return }

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    to_email: import.meta.env.VITE_ADMIN_EMAIL,
                    order_id: data.id,
                    customer_name: data.customer_name,
                    phone: data.phone,
                    whatsapp: data.whatsapp,
                    city: data.city,
                    address: data.address,
                    product_id: data.items.map(i => i.product_code || i.id).join(', '),
                    quantity: data.items.map(i => i.quantity).join(', '),
                    items: data.items.map(i => `${i.name} x ${i.quantity}`).join(', '),
                    total_amount: data.total_amount,
                    note: data.note,
                    status: data.status,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            )
        } catch (err) { console.log('EmailJS failed', err) }

        // window.open(makeWhatsAppLink(data), '_blank')
        clearCart()
        nav(`/success/${data.id}`)
    }

    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-8">
                <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                    Almost there!
                </span>
                <h1 className="mt-3 text-4xl font-black text-gray-900">Checkout</h1>
                <p className="mt-1 text-gray-500">Fill in your details below — pay cash when your order arrives.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <form onSubmit={submit} className="space-y-6">
                    <FormSection icon={User} title="Personal Details">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InputField icon={User} required name="customer_name" placeholder="Full name" onChange={set} />
                            <InputField icon={Phone} required name="phone" placeholder="Phone number" type="tel" onChange={set} />
                        </div>
                        <InputField icon={MessageCircle} name="whatsapp" placeholder="WhatsApp number (if different)" type="tel" onChange={set} />
                    </FormSection>

                    <FormSection icon={MapPin} title="Delivery Details">
                        <InputField icon={MapPin} required name="city" placeholder="City" onChange={set} />
                        <TextareaField icon={MapPin} required name="address" placeholder="Complete delivery address (street, area, landmark…)" rows={3} onChange={set} />
                    </FormSection>

                    <FormSection icon={FileText} title="Order Note" optional>
                        <TextareaField icon={FileText} name="note" placeholder="Any special instructions for your order? (optional)" rows={2} onChange={set} />
                    </FormSection>

                    <FormSection icon={ShieldCheck} title="Payment Method">
                        <div className="flex items-center gap-4 rounded-2xl border-2 border-green-500 bg-green-50 p-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Cash on Delivery (COD)</p>
                                <p className="text-sm text-gray-500">Pay the rider in cash when your parcel arrives. No card needed.</p>
                            </div>
                            <div className="ml-auto">
                                <span className="rounded-lg bg-green-600 px-3 py-1 text-xs font-bold text-white">Selected</span>
                            </div>
                        </div>
                    </FormSection>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 text-lg font-black text-white shadow-lg shadow-green-200 transition-all duration-200 hover:bg-green-700 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Placing Your Order…
                            </>
                        ) : (
                            <>
                                <Lock className="h-5 w-5" />
                                Place COD Order
                                <ChevronRight className="h-5 w-5" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        🔒 Your order will be saved securely. Admin will receive WhatsApp &amp; email confirmation.
                    </p>
                </form>

                <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-black text-gray-900">Order Summary</h2>

                        <div className="space-y-3">
                            {cart.map(i => (
                                <div key={i.id} className="flex items-center gap-3">
                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        <img src={i.image_url} alt={i.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="truncate text-sm font-semibold text-gray-900">{i.name}</p>
                                        <p className="text-xs text-gray-400">Qty: {i.quantity}</p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">
                                        {currency(i.price * i.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="my-4 border-t border-gray-100" />

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">{currency(total)}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Charges</span>
                                <span className="font-semibold">{currency(DELIVERY_CHARGES)}</span>
                            </div>

                            <div className="my-2 border-t border-gray-100" />

                            <div className="flex justify-between">
                                <span className="text-base font-black text-gray-900">Total</span>
                                <span className="text-xl font-black text-green-700">{currency(grandTotal)}</span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-xs font-semibold text-green-700">
                            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                            Pay cash on delivery — no prepayment required
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { Icon: ShieldCheck, label: 'Secure Order' },
                            { Icon: Truck, label: 'Fast Delivery' },
                            { Icon: RotateCcw, label: '7-Day Return' },
                        ].map(({ Icon, label }) => (
                            <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white py-3 text-center shadow-sm">
                                <Icon className="h-4 w-4 text-green-600" />
                                <span className="text-[11px] font-semibold text-gray-600">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-sm font-bold text-gray-900">Delivery Information</h3>
                        <ul className="space-y-2.5 text-xs text-gray-500">
                            {[
                                ['🚚', 'Standard delivery: 2–5 business days'],
                                ['🏙️', 'Major cities: Karachi, Lahore, Islamabad — 2–3 days'],
                                ['💵', 'Cash on Delivery available nationwide'],
                                ['📦', 'Orders packed and dispatched within 24 hours'],
                                ['📲', 'WhatsApp confirmation sent after order placement'],
                            ].map(([emoji, text]) => (
                                <li key={text} className="flex items-start gap-2">
                                    <span className="flex-shrink-0">{emoji}</span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FormSection({ icon: Icon, title, optional, children }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-gray-100 px-5 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100">
                    <Icon className="h-4 w-4 text-green-700" />
                </div>
                <h2 className="font-bold text-gray-900">{title}</h2>
                {optional && (
                    <span className="ml-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                        Optional
                    </span>
                )}
            </div>
            <div className="space-y-3 p-5">{children}</div>
        </div>
    )
}

function InputField({ icon: Icon, name, placeholder, required, type = 'text', onChange }) {
    return (
        <div className="relative">
            {Icon && (
                <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            )}
            <input
                required={required}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
        </div>
    )
}

function TextareaField({ icon: Icon, name, placeholder, required, rows = 3, onChange }) {
    return (
        <div className="relative">
            {Icon && (
                <Icon className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            )}
            <textarea
                required={required}
                name={name}
                placeholder={placeholder}
                rows={rows}
                onChange={onChange}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
        </div>
    )
}