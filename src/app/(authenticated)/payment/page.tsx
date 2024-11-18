'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Menu, Car, ChevronRight, PenLine } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, Suspense } from 'react'
import Sidebar from '@/components/Sidebar'

// Add this interface
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Create a component that uses useSearchParams
function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const source = searchParams.get('source')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [deliveryNote, setDeliveryNote] = useState('We are currently starting to tee off on 10th')
  
  const [orderDetails, setOrderDetails] = useState({
    total: '0.00',
    subtotal: '0.00',
    tax: '0.00',
    serviceFee: '1.00'
  })

  // Add state for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    const total = localStorage.getItem('orderTotal') || '0.00'
    const subtotal = localStorage.getItem('orderSubtotal') || '0.00'
    const tax = localStorage.getItem('orderTax') || '0.00'
    // Add this line to get cart items
    const storedCartItems = localStorage.getItem('cartItems')
    
    setOrderDetails({
      total: Number(total).toFixed(2),
      subtotal: Number(subtotal).toFixed(2),
      tax: Number(tax).toFixed(2),
      serviceFee: '1.00'
    })

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [])

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

  // Mock order items - in real app would come from cart/localStorage
  const orderItems = [
    { id: 1, name: 'Coca Cola', quantity: 1, price: '3.50' },
    { id: 2, name: 'Lemonade', quantity: 2, price: '7.00' },
    { id: 3, name: 'Dr. Pepper', quantity: 1, price: '3.50' },
    { id: 4, name: 'Chicken Caesar Wrap', quantity: 1, price: '12.95' },
    { id: 5, name: 'Hamburger w/French Fries', quantity: 1, price: '15.95' }
  ]

  const handlePlaceOrder = () => {
    setShowConfirmation(true)
    
    // Clear cart data from localStorage
    localStorage.removeItem('cartItems')
    localStorage.removeItem('orderTotal')
    localStorage.removeItem('orderSubtotal')
    localStorage.removeItem('orderTax')
    
    // Wait 3 seconds, then navigate to home
    setTimeout(() => {
      router.push('/home')
    }, 3000)
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
            className="flex justify-between items-center p-6 border-b"
          >
            <Link href={`/${source}`}>
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <span className="text-xl font-semibold">Checkout</span>
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </motion.div>

          {/* Delivery Type */}
          <motion.div
            variants={itemVariants}
            className="p-6 flex items-center justify-between border-b"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#00A6B2] p-3 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium">Course Delivery</span>
            </div>
            <button className="text-[#00A6B2]">Change</button>
          </motion.div>

          {/* Order Details */}
          <motion.div variants={itemVariants} className="p-6 border-b">
            <h2 className="font-semibold text-lg mb-4">Order Details</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <span>{item.quantity}× {item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${orderDetails.subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Sales Tax</span>
                <span>${orderDetails.tax}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${orderDetails.total}</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Notes */}
          <motion.div variants={itemVariants} className="p-6 border-b">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold text-lg">Delivery / Pickup Notes</h2>
              <button className="text-[#00A6B2] flex items-center gap-1">
                Edit <PenLine className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600">{deliveryNote}</p>
          </motion.div>

          {/* Payment Method */}
          <motion.div variants={itemVariants} className="p-6 border-b">
            <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
            <button className="w-full flex items-center justify-between">
              <div>
                <h3 className="font-medium">Choose Payment</h3>
                <p className="text-sm text-gray-500">Choose your payment method</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </motion.div>

          {/* Payment Details */}
          <motion.div variants={itemVariants} className="p-6">
            <h2 className="font-semibold text-lg mb-4">Payment Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Grand Subtotal</span>
                <span>${orderDetails.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${orderDetails.serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                <span>Total Payment</span>
                <span>${(Number(orderDetails.total) + Number(orderDetails.serviceFee)).toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t flex gap-4 justify-center">
            <div className="w-full max-w-[430px] flex gap-4">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#4CAF50] text-white py-4 rounded-full font-medium"
                onClick={handlePlaceOrder}
              >
                Place Order
              </motion.button>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border border-red-500 text-red-500 py-4 rounded-full font-medium"
                onClick={() => router.back()}
              >
                Cancel
              </motion.button>
            </div>
          </div>

          {/* Confirmation Popup */}
          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              >
                <div className="bg-white rounded-lg p-6 m-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">Order placed</h3>
                  <p className="text-gray-600">Taking you to home...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
}

// Main page component
export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
} 