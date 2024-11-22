'use client'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate email
    if (!email) {
      setError('Please enter your email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setLoading(true)
      await resetPassword(email)
      setShowPopup(true)
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/signin')
      }, 3000)
    } catch (error) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
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
      <main className="w-full max-w-[430px] relative min-h-screen px-6">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="relative pt-4 pb-8"
        >
          <Link href="/signin" className="absolute left-0 top-5">
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <h1 className="text-center text-2xl font-semibold">Reset Password</h1>
        </motion.div>

        {/* Form Content */}
        <motion.div 
          variants={itemVariants}
          className="pb-32"
        >
          <p className="text-gray-600 mb-8">
            Please enter your email and we will send a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg transition-shadow duration-200 focus:shadow-md outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>

        {/* Bottom Fixed Section */}
        <motion.div 
          variants={itemVariants}
          className="fixed bottom-8 left-0 right-0 w-full max-w-[430px] mx-auto px-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Continue'}
          </motion.button>
        </motion.div>

        {/* Popup Notification */}
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-gray-600">
                We've sent instructions to reset your password. Please check your email.
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </motion.div>
  )
} 