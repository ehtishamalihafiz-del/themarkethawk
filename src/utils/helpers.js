export const currency = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`
export const makeSlug = (text) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
export const orderStatuses = ['Pending', 'Confirmed', 'Ordered on Markaz', 'Shipped', 'Delivered', 'Cancelled']
export const makeWhatsAppLink = (order) => {
  const admin = import.meta.env.VITE_ADMIN_WHATSAPP
  const items = order.items
  .map(i => `${i.name}${i.product_code ? `\nCode: ${i.product_code}` : ''} x ${i.quantity} = ${currency(i.price * i.quantity)}`)
  .join('\n')
  const msg = `New COD Order%0AOrder ID: ${order.id}%0AName: ${order.customer_name}%0APhone: ${order.phone}%0AWhatsApp: ${order.whatsapp}%0ACity: ${order.city}%0AAddress: ${order.address}%0AItems:%0A${encodeURIComponent(items)}%0ATotal: Rs. ${order.total_amount}%0ANote: ${order.note || '-'}%0AStatus: ${order.status}`
  return `https://wa.me/${admin}?text=${msg}`
}
export const exportCSV = (rows, filename='orders.csv') => {
  const headers = ['id','customer_name','phone','whatsapp','city','address','total_amount','status','created_at']
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => `"${String(r[h] ?? '').replace(/"/g,'""')}"`).join(','))].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url)
}
