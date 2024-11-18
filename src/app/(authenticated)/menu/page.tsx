'use client'
import { useState } from 'react'
import { Menu, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'Drinks' | 'Food' | 'Snacks';
}

export default function MenuPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<{[key: string]: number}>({})

  const menuItems: MenuItem[] = [
    {
      id: 'coca-cola',
      title: 'Coca Cola',
      description: 'Classic refreshing cola served ice cold',
      price: 3.50,
      image: '/images/coke.png',
      category: 'Drinks'
    },
    {
      id: 'diet-coke',
      title: 'Diet Coke',
      description: 'Zero-calorie cola with the same great taste',
      price: 3.50,
      image: '/images/diet-coke.png',
      category: 'Drinks'
    },
    {
      id: 'sprite',
      title: 'Sprite',
      description: 'Refreshing lemon-lime soda',
      price: 4.50,
      image: '/images/sprite.png',
      category: 'Drinks'
    },
    {
      id: 'lemonade',
      title: 'Lemonade',
      description: 'Freshly squeezed lemon juice with sugar',
      price: 3.50,
      image: '/images/lemonade.png',
      category: 'Drinks'
    },
    {
      id: 'hot-coffee',
      title: 'Hot Coffee',
      description: 'Rich and flavorful coffee served hot',
      price: 4.50,
      image: '/images/coffee.png',
      category: 'Drinks'
    },
    {
      id: 'iced-coffee',
      title: 'Iced Coffee',
      description: 'Cool and refreshing iced coffee',
      price: 4.50,
      image: '/images/iced-coffee.png',
      category: 'Drinks'
    }
    // Add more menu items here for Food and Snacks categories
  ]

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  const updateQuantity = (itemId: string, increment: boolean) => {
    setCart(prev => {
      const currentQuantity = prev[itemId] || 0
      const newQuantity = increment 
        ? currentQuantity + 1 
        : Math.max(0, currentQuantity - 1)

      if (newQuantity === 0) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [itemId]: newQuantity }
    })
  }

  const calculateTotals = () => {
    const subtotal = Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId)
      return total + (item?.price || 0) * quantity
    }, 0)
    
    const salesTax = subtotal * 0.08
    const total = subtotal + salesTax

    // Create cart items array for storage
    const cartItemsForStorage = Object.entries(cart).map(([itemId, quantity]) => {
      const item = menuItems.find(i => i.id === itemId)
      return {
        id: itemId,
        name: item?.title || '',
        quantity,
        price: (item?.price || 0) * quantity
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

  const clearCart = () => setCart({})

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems

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
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <Image
                src="/images/golf-background.jpg"
                alt="The Patio Restaurant"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white">
                <h1 className="text-2xl font-semibold mb-2">The Patio Restaurant</h1>
                <p className="text-white/90">Course Delivery or Pickup</p>
                <p className="text-sm text-white/80 mt-1">
                  Enjoy a snack or a drink while Slowey McSlowerson takes another practice swing 🏌️
                </p>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-4 px-6 mb-6"
          >
            {['Drinks', 'Food', 'Snacks'].map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2 rounded-full flex-shrink-0 ${
                  selectedCategory === category 
                    ? 'bg-[#00A6B2] text-white' 
                    : 'border border-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Menu Items Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 px-6 mb-6"
          >
            <AnimatePresence mode="wait">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuItemCard
                    item={item}
                    quantity={cart[item.id] || 0}
                    onUpdateQuantity={(increment) => updateQuantity(item.id, increment)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Order Details */}
          <AnimatePresence>
            {Object.keys(cart).length > 0 && (
              <>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="px-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Order Details</h2>

                  {/* Cart Items */}
                  {Object.entries(cart).map(([itemId, quantity]) => {
                    const item = menuItems.find(i => i.id === itemId)
                    if (!item) return null
                    return (
                      <div key={itemId} className="flex justify-between items-center mb-2 text-sm">
                        <span>{quantity}× {item.title}</span>
                        <div className="flex items-center gap-2">
                          <span>${(item.price * quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => {
                              const newCart = { ...cart }
                              delete newCart[itemId]
                              setCart(newCart)
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  {/* Totals */}
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${calculateTotals().subtotal}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Sales Tax</span>
                      <span>${calculateTotals().salesTax}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotals().total}</span>
                    </div>
                  </div>

                  {/* Action Buttons - Now part of the main content flow */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 mb-6"
                  >
                    <div className="flex gap-4">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          calculateTotals() // This will now store cart items too
                          router.push('/payment?type=pickup&source=menu')
                        }}
                        className="flex-1 bg-[#00A6B2] text-white py-3 rounded-lg font-medium"
                      >
                        Pick Up
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          calculateTotals() // This will now store cart items too
                          router.push('/payment?type=delivery&source=menu')
                        }}
                        className="flex-1 border border-[#00A6B2] text-[#00A6B2] py-3 rounded-lg font-medium"
                      >
                        Course Delivery
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
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

function MenuItemCard({ 
  item,
  quantity,
  onUpdateQuantity
}: { 
  item: MenuItem
  quantity: number
  onUpdateQuantity: (increment: boolean) => void
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-50 rounded-lg overflow-hidden"
    >
      <div className="relative h-40 p-4 bg-white flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.title}
          width={120}
          height={120}
          className="object-contain"
          style={{ maxHeight: '120px' }}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
        <p className="text-[#00A6B2] mb-3">${item.price.toFixed(2)}</p>
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