import { useState } from 'react'
import {
  MessageCircle, Phone, Mail, MapPin, Clock,
  Send, CheckCircle, ChevronDown, Headphones,
  ShieldCheck, Truck, RotateCcw,
} from 'lucide-react'

const FAQS = [
  { q: 'How do I track my order?',           a: 'Once your order is dispatched, you\'ll receive a tracking number via WhatsApp and SMS. Use it on our courier partner\'s website.' },
  { q: 'What is your return policy?',        a: 'We offer a 7-day easy return policy. Contact us on WhatsApp within 7 days of delivery and we\'ll arrange a hassle-free return.' },
  { q: 'Do you offer Cash on Delivery?',     a: 'Yes! COD is available across all major cities in Pakistan. You pay the rider when your parcel arrives.' },
  { q: 'How long does delivery take?',       a: 'Standard delivery takes 2–5 business days. Major cities like Karachi, Lahore, and Islamabad receive orders in 2–3 days.' },
  { q: 'Can I change or cancel my order?',   a: 'Yes, you can cancel or modify your order within 2 hours of placing it. Contact us immediately on WhatsApp.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open ? 'border-green-300 shadow-md shadow-green-50' : 'border-gray-200 bg-white'
      }`}
    >
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-gray-900 sm:text-base">{q}</span>
        <span
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div className="border-t border-green-100 bg-green-50/40 px-6 py-4">
          <p className="text-sm leading-relaxed text-gray-600">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  // Local UI state for the contact form (no backend logic in original — kept as UI enhancement only)
  const [sent, setSent]     = useState(false)
  const [formData, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const handleChange = (e) => setForm({ ...formData, [e.target.name]: e.target.value })

  // On submit: opens WhatsApp with prefilled message (no backend added — mirrors original WhatsApp-only approach)
  const handleSubmit = (e) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `*Contact Form — The Market_Hawk*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
    )
    // ✅ VITE_ADMIN_WHATSAPP env var unchanged
    window.open(`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}?text=${text}`, '_blank')
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-6xl">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
          Get in Touch
        </span>
        <h1 className="mt-3 text-4xl font-black text-gray-900 sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Have a question about your order? We're here to help — reach out on WhatsApp for the fastest response.
        </p>
      </div>

      {/* ── Primary WhatsApp CTA ───────────────────────────────────────── */}
      {/* ✅ href uses import.meta.env.VITE_ADMIN_WHATSAPP — unchanged */}
      <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-center text-white shadow-xl sm:p-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black sm:text-3xl">Fastest Support on WhatsApp</h2>
        <p className="mt-2 text-green-100/80">
          Get a reply in minutes. Our team is available Mon–Sat, 9 AM – 9 PM.
        </p>
        <a
          href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-green-700 shadow-lg transition-all duration-200 hover:bg-green-50 hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          Chat on WhatsApp
        </a>
      </div>

      {/* ── Contact info cards + form ─────────────────────────────────── */}
      <div className="mb-12 grid gap-8 lg:grid-cols-[340px_1fr]">

        {/* Contact info cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-gray-900">Our Contact Info</h2>

          {[
            {
              Icon: MessageCircle,
              label: 'WhatsApp',
              value: 'Chat with us instantly',
              sub: 'Mon–Sat · 9 AM – 9 PM',
              color: 'bg-green-50 text-green-600',
              href: `https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || ''}`,
            },
            {
              Icon: Phone,
              label: 'Phone',
              value: '+92 325 4128541',
              sub: 'Call us during business hours',
              color: 'bg-emerald-50 text-emerald-600',
            },
            {
              Icon: Mail,
              label: 'Email',
              value: 'support@themarkethawk.pk',
              sub: 'We reply within 24 hours',
              color: 'bg-teal-50 text-teal-600',
            },
            {
              Icon: MapPin,
              label: 'Location',
              value: 'Lahore, Pakistan',
              sub: 'Nationwide COD delivery',
              color: 'bg-lime-50 text-lime-600',
            },
            {
              Icon: Clock,
              label: 'Business Hours',
              value: 'Mon – Sat',
              sub: '9:00 AM – 9:00 PM PKT',
              color: 'bg-green-50 text-green-600',
            },
          ].map(({ Icon, label, value, sub, color, href }) => {
            const inner = (
              <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-green-200 hover:shadow-md">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
                  <p className="font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            )
            return href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer">{inner}</a>
            ) : (
              <div key={label}>{inner}</div>
            )
          })}

          {/* Support features */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { Icon: ShieldCheck, label: 'Secure'       },
              { Icon: Truck,       label: 'Fast Replies' },
              { Icon: RotateCcw,   label: '7-Day Return' },
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
        </div>

        {/* Message form — routes to WhatsApp (mirrors original approach) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Send className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h2 className="font-black text-gray-900">Send a Message</h2>
              <p className="text-xs text-gray-500">We'll reply on WhatsApp within minutes</p>
            </div>
          </div>

          {sent ? (
            /* Success state */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Message Sent!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your message has been opened in WhatsApp. We'll reply as soon as possible.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                className="mt-6 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-green-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Subject</label>
                <div className="relative">
                  <Headphones className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help you…"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:scale-[1.02] active:scale-95"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── FAQ section ───────────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-black text-gray-900">Common Questions</h2>
          <p className="mt-2 text-gray-500">
            Quick answers before you reach out — you might find what you need here.
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((faq) => <FaqItem key={faq.q} {...faq} />)}
        </div>

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="font-bold text-gray-900">Still need help?</p>
          <p className="mt-1 text-sm text-gray-500">Our support team typically replies within minutes on WhatsApp.</p>
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
    </div>
  )
}

// pulled out to keep JSX clean — no logic, pure icon label
function User(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
