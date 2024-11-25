'use client'
import { useState, useEffect } from 'react'
import { Menu, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'Accessories' | 'Equipment' | 'Merch';
}

interface CartItem {
  productId: string;
  quantity: number;
}

export default function ProShopPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const products: Product[] = [
    {
      id: 'golf-balls',
      title: 'Golf Balls (12pk)',
      description: 'Premium quality golf balls for maximum performance',
      price: 3.50,
      image: '/images/pro-golf-balls.png',
      category: 'Equipment'
    },
    {
      id: 'golf-tees',
      title: 'Golf Tees (25pk)',
      description: 'Durable wooden tees in various lengths',
      price: 3.50,
      image: '/images/pro-golf-tees.png',
      category: 'Accessories'
    },
    {
      id: 'glove',
      title: 'Glove (RH)',
      description: 'Premium leather glove for enhanced grip',
      price: 4.50,
      image: '/images/pro-glove.png',
      category: 'Accessories'
    },
    {
      id: 'socks',
      title: 'Pair White Socks',
      description: 'Comfortable cotton blend golf socks',
      price: 3.50,
      image: '/images/pro-socks.png',
      category: 'Merch'
    },
    {
      id: 'divot-tool',
      title: 'Divot Tool',
      description: 'Sturdy metal divot repair tool',
      price: 4.50,
      image: '/images/pro-divot-tool.png',
      category: 'Equipment'
    },
    {
      id: 'head-cover',
      title: 'Head Cover',
      description: 'Protective cover for your club heads',
      price: 4.50,
      image: '/images/pro-head-cover.png',
      category: 'Accessories'
    },
  ]

  // Filter handling function
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      // If clicking the same category again, show all products
      setSelectedCategory(null)
    } else {
      // Otherwise, filter by the selected category
      setSelectedCategory(category)
    }
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  // Cart functions
  const updateQuantity = (productId: string, increment: boolean) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId)
      
      if (existingItem) {
        // Update existing item
        const newQuantity = increment 
          ? existingItem.quantity + 1 
          : Math.max(0, existingItem.quantity - 1)

        if (newQuantity === 0) {
          // Remove item if quantity becomes 0
          return prevCart.filter(item => item.productId !== productId)
        }

        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else if (increment) {
        // Add new item
        return [...prevCart, { productId, quantity: 1 }]
      }

      return prevCart
    })
  }

  const getItemQuantity = (productId: string): number => {
    return cart.find(item => item.productId === productId)?.quantity || 0
  }

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId)
      return sum + (product?.price || 0) * item.quantity
    }, 0)
    
    const salesTax = subtotal * 0.08
    const total = subtotal + salesTax

    // Create cart items array for storage
    const cartItemsForStorage = cart.map(item => {
      const product = products.find(p => p.id === item.productId)
      return {
        id: item.productId,
        name: product?.title || '',
        quantity: item.quantity,
        price: (product?.price || 0) * item.quantity
      }
    })

    // Store values in localStorage
    localStorage.setItem('orderTotal', total.toFixed(2))
    localStorage.setItem('orderSubtotal', subtotal.toFixed(2))
    localStorage.setItem('orderTax', salesTax.toFixed(2))
    localStorage.setItem('cartItems', JSON.stringify(cartItemsForStorage))

    return {
      subtotal: subtotal.toFixed(2),
      salesTax: salesTax.toFixed(2),
      total: total.toFixed(2)
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center w-full bg-white min-h-screen"
    >
      <div className="w-full max-w-[430px] relative">
        <main className="pb-24">
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-between items-center p-6"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/isabel-round-avatar.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg">Hello, Isabel 👋</span>
            </div>
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </motion.div>

          {/* Hero Banner */}
          <motion.div 
            variants={itemVariants}
            className="mx-6 mb-6"
          >
            <div className="relative h-48 overflow-hidden rounded-lg">
              <Image
                src="/images/golf-background.jpg"
                alt="Pro Shop Banner"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white">
                <h1 className="text-2xl font-semibold mb-2">Bellair Pro Shop</h1>
                <p className="text-white/90">Course Delivery or Pickup</p>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-4 px-6 mb-6"
          >
            {['Accessories', 'Equipment', 'Merch'].map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category 
                    ? 'bg-[#00A6B2] text-white' 
                    : 'border border-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 px-6 mb-6"
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard
                    product={product}
                    quantity={getItemQuantity(product.id)}
                    onUpdateQuantity={(increment) => updateQuantity(product.id, increment)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Order Details */}
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-6"
              >
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                
                {/* Cart Items */}
                {cart.map((item) => {
                  const product = products.find(p => p.id === item.productId)
                  if (!product) return null
                  return (
                    <div key={item.productId} className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span>{item.quantity}×</span>
                        <span>{product.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>${(product.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => {
                            setCart(cart.filter(cartItem => cartItem.productId !== item.productId))
                          }}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )
                })}

                {/* Totals */}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span>Subtotal</span>
                    <span>${calculateTotals().subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Sales Tax</span>
                    <span>${calculateTotals().salesTax}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t mt-2">
                    <span className="font-medium">Total</span>
                    <span className="font-semibold">${calculateTotals().total}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 mb-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      calculateTotals()
                      router.push('/courses/bellair/payment?type=pickup&source=pro-shop')
                    }}
                    className="flex-1 bg-[#00A6B2] text-white py-3 rounded-lg font-medium"
                  >
                    Pick Up
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      calculateTotals()
                      router.push('/courses/bellair/payment?type=delivery&source=pro-shop')
                    }}
                    className="flex-1 border border-[#00A6B2] text-[#00A6B2] py-3 rounded-lg font-medium"
                  >
                    Course Delivery
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
          <div className="w-full max-w-[430px]">
            <BottomNavigation />
          </div>
        </div>
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
}

function ProductCard({ product, quantity, onUpdateQuantity }: { 
  product: Product
  quantity: number
  onUpdateQuantity: (increment: boolean) => void
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-50 rounded-lg overflow-hidden"
    >
      <div className="relative h-40 bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 200px"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-[#00A6B2] mb-3">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateQuantity(false)}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg"
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          <span>{quantity}</span>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateQuantity(true)}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
} 