'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
  menuCart: { [key: string]: number }
  proShopCart: { [key: string]: number }
  menuTotal: number
  proShopTotal: number
  setMenuCart: (cart: { [key: string]: number }) => void
  setProShopCart: (cart: { [key: string]: number }) => void
  setMenuTotal: (total: number) => void
  setProShopTotal: (total: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [menuCart, setMenuCart] = useState<{ [key: string]: number }>({})
  const [proShopCart, setProShopCart] = useState<{ [key: string]: number }>({})
  const [menuTotal, setMenuTotal] = useState(0)
  const [proShopTotal, setProShopTotal] = useState(0)

  const clearCart = () => {
    setMenuCart({})
    setProShopCart({})
    setMenuTotal(0)
    setProShopTotal(0)
  }

  return (
    <CartContext.Provider 
      value={{
        menuCart,
        proShopCart,
        menuTotal,
        proShopTotal,
        setMenuCart,
        setProShopCart,
        setMenuTotal,
        setProShopTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
