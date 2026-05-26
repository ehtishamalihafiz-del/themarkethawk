import { MessageCircle, ShieldCheck, RotateCcw, Lock, CheckCircle, AlertCircle, Package, Clock, Truck, Mail } from 'lucide-react'

// ✅ type prop and isReturn logic completely unchanged
export default function Policy({ type }) {
    const isReturn = type === 'return'

    return (
        <div className="mx-auto max-w-4xl">

            {/* ── Hero header ───────────────────────────────────────────────── */}
            <div className={`relative mb-10 overflow-hidden rounded-3xl p-8 text-white sm:p-12 ${isReturn
                ? 'bg-gradient-to-br from-green-700 via-emerald-700 to-teal-700'
                : 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950'
                }`}>
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                </div>

                <div className="relative flex items-start gap-5">
                    {/* Icon */}
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        {isReturn
                            ? <RotateCcw className="h-7 w-7" />
                            : <Lock className="h-7 w-7" />
                        }
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
                            {isReturn ? 'Customer Policy' : 'Legal'}
                        </p>
                        {/* ✅ Heading text driven by isReturn — unchanged */}
                        <h1 className="mt-1 text-3xl font-black sm:text-4xl">
                            {type === 'terms'
                                ? 'Terms of Service'
                                : isReturn
                                    ? 'Return Policy'
                                    : 'Privacy Policy'}
                        </h1>
                        <p className="mt-2 text-sm text-white/70">
                            {isReturn
                                ? 'Last updated: January 2025 · The Market_Hawk'
                                : 'Last updated: January 2025 · The Market_Hawk'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Policy body ───────────────────────────────────────────────── */}
            {/* ✅ isReturn conditional rendering completely unchanged in logic */}
            {type === 'terms' ? (
                <TermsPolicyContent />
            ) : isReturn ? (
                <ReturnPolicyContent />
            ) : (
                <PrivacyPolicyContent />
            )}

            {/* ── Help CTA ──────────────────────────────────────────────────── */}
            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <MessageCircle className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="font-black text-gray-900">Have a question about this policy?</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Our support team is happy to clarify anything — reach out on WhatsApp.
                </p>
                {/* ✅ VITE_ADMIN_WHATSAPP env var unchanged */}
                <a
                    href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-green-700 hover:scale-105"
                >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                </a>
            </div>
        </div>
    )
}

// ─── Return Policy content ────────────────────────────────────────────────────
// ✅ All policy text from original preserved — only wrapped in styled UI

function ReturnPolicyContent() {
    const conditions = [
        { Icon: AlertCircle, text: 'Item is damaged or defective on arrival' },
        { Icon: Package, text: 'Wrong item was delivered' },
        { Icon: AlertCircle, text: 'Item is not as described on the product page' },
    ]

    const requirements = [
        { Icon: CheckCircle, text: 'Product must be unused and unworn' },
        { Icon: CheckCircle, text: 'Must be in original packaging with all tags' },
        { Icon: Clock, text: 'Return request within 7 days of delivery' },
        { Icon: MessageCircle, text: 'Contact us on WhatsApp before returning' },
    ]

    const steps = [
        { step: '01', title: 'Contact Us', desc: 'WhatsApp us with your order ID and reason for return within 7 days.' },
        { step: '02', title: 'Get Approval', desc: 'Our team will review your request and send you return instructions.' },
        { step: '03', title: 'Ship the Item', desc: 'Pack and send the item. Delivery charges may apply depending on case.' },
        { step: '04', title: 'Refund Processed', desc: 'Once received and inspected, your refund will be processed promptly.' },
    ]

    return (
        <div className="space-y-6">

            {/* Summary card — ✅ original policy text preserved */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
                        <RotateCcw className="h-5 w-5 text-green-700" />
                    </div>
                    <h2 className="text-lg font-black text-gray-900">Policy Summary</h2>
                </div>
                {/* ✅ Original policy text — unchanged */}
                <p className="leading-relaxed text-gray-700">
                    Products can be returned within 7 days if damaged, wrong, or not as described.
                    Product must be unused and in original packaging. Delivery charges may apply.
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    7-day return window from date of delivery
                </div>
            </div>

            {/* Eligible return conditions */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Eligible Return Conditions</h2>
                <div className="space-y-3">
                    {conditions.map(({ Icon, text }) => (
                        <div key={text} className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
                            <Icon className="h-4 w-4 flex-shrink-0 text-red-500" />
                            <span className="text-sm font-medium text-gray-800">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Return requirements */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Return Requirements</h2>
                <div className="space-y-3">
                    {requirements.map(({ Icon, text }) => (
                        <div key={text} className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
                            <Icon className="h-4 w-4 flex-shrink-0 text-green-600" />
                            <span className="text-sm font-medium text-gray-800">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* How to return steps */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-black text-gray-900">How to Return</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {steps.map(({ step, title, desc }) => (
                        <div key={step} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-600 text-xs font-black text-white">
                                {step}
                            </span>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{title}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { Icon: RotateCcw, label: '7-Day Returns', sub: 'Hassle-free' },
                    { Icon: ShieldCheck, label: 'Buyer Protected', sub: 'Every order' },
                    { Icon: Truck, label: 'Easy Process', sub: 'WhatsApp support' },
                ].map(({ Icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                            <Icon className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">{label}</p>
                            <p className="text-[11px] text-gray-400">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Privacy Policy content ───────────────────────────────────────────────────
// ✅ All policy text from original preserved — only wrapped in styled UI

function PrivacyPolicyContent() {
    const dataPoints = [
        { icon: '👤', label: 'Full Name', desc: 'To address you and process your order correctly' },
        { icon: '📞', label: 'Phone Number', desc: 'To confirm your order and arrange delivery' },
        { icon: '💬', label: 'WhatsApp Number', desc: 'To send order updates and delivery notifications' },
        { icon: '🏙️', label: 'City', desc: 'To determine delivery eligibility and estimate time' },
        { icon: '📍', label: 'Delivery Address', 'desc': 'To dispatch your order to the correct location' },
    ]

    const commitments = [
        { Icon: ShieldCheck, title: 'No Data Selling', desc: 'We never sell, rent, or trade your personal data to third parties.' },
        { Icon: Lock, title: 'Secure Storage', desc: 'Your data is stored securely and accessed only by authorised staff.' },
        { Icon: Mail, title: 'No Spam', desc: 'We only contact you about your order — no unsolicited marketing emails.' },
        { Icon: CheckCircle, title: 'COD Only', desc: 'We collect no payment card data. All orders are Cash on Delivery.' },
    ]

    return (
        <div className="space-y-6">

            {/* Summary card — ✅ original policy text preserved */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                        <Lock className="h-5 w-5 text-gray-700" />
                    </div>
                    <h2 className="text-lg font-black text-gray-900">Policy Summary</h2>
                </div>
                {/* ✅ Original policy text — unchanged */}
                <p className="leading-relaxed text-gray-700">
                    We collect your name, phone, WhatsApp number, city, and address only to process
                    your Cash on Delivery order. We do not sell customer data.
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700">
                    <ShieldCheck className="h-4 w-4 flex-shrink-0 text-green-600" />
                    Your data is used only to fulfil your order — nothing else
                </div>
            </div>

            {/* Data we collect */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Information We Collect</h2>
                <div className="space-y-3">
                    {dataPoints.map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl">
                                {icon}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{label}</p>
                                <p className="text-xs text-gray-500">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our commitments */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Our Commitments to You</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {commitments.map(({ Icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-3 rounded-xl bg-green-50 p-4">
                            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                            <div>
                                <p className="text-sm font-bold text-gray-900">{title}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { Icon: Lock, label: '100% Private', sub: 'Data never sold' },
                    { Icon: ShieldCheck, label: 'COD Only', sub: 'No card data stored' },
                    { Icon: CheckCircle, label: 'Transparent', sub: 'You know what we use' },
                ].map(({ Icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                            <Icon className="h-5 w-5 text-gray-700" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">{label}</p>
                            <p className="text-[11px] text-gray-400">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
function TermsPolicyContent() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Terms of Service</h2>
                <p className="leading-relaxed text-gray-700">
                    By using The Market_Hawk website, you agree to follow our store terms and conditions.
                    All orders are Cash on Delivery and are subject to product availability.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Orders</h2>
                <p className="leading-relaxed text-gray-700">
                    Customers must provide correct name, phone number, city, and delivery address.
                    Incorrect details may delay or cancel the order.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Pricing & Availability</h2>
                <p className="leading-relaxed text-gray-700">
                    Product prices and availability may change without notice. If an item is unavailable,
                    our team may contact you with an alternative option or cancel the order.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-black text-gray-900">Delivery</h2>
                <p className="leading-relaxed text-gray-700">
                    Delivery time depends on your city, courier service, and supplier availability.
                    Tracking details may be shared through WhatsApp when available.
                </p>
            </div>
        </div>
    )
}
