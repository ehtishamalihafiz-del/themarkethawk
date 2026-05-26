import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const CartContext = createContext()
export const useCart = () => useContext(CartContext)
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'))
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])
  const addToCart = (product, qty = 1) => setCart(items => {
    const found = items.find(i => i.id === product.id)
    if (found) return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
    return [...items, { ...product, quantity: qty }]
  })
  const removeFromCart = id => setCart(items => items.filter(i => i.id !== id))
  const changeQty = (id, delta) => setCart(items => items.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
  const clearCart = () => setCart([])
  const total = useMemo(() => cart.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0), [cart])
  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart, total }}>{children}</CartContext.Provider>
}
