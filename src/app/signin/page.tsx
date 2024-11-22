'use client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "isabel@whispering.ai",
    password: "password"
  });
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signIn(formData.email, formData.password)
      router.push('/home')
    } catch (error) {
      setError('Invalid email or password')
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
          <Link href="/" className="absolute left-0 top-5">
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <h1 className="text-center text-2xl font-semibold">Sign In</h1>
        </motion.div>

        {/* Add error message display */}
        {error && (
          <motion.div 
            variants={itemVariants}
            className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Form Content */}
        <div className="pb-32">
          <div className="space-y-6">
            {/* Email Field */}
            <motion.div 
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="block text-sm">Email</label>
              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg transition-shadow duration-200 focus:shadow-md outline-none"
                  placeholder="Enter your email"
                />
              </motion.div>
            </motion.div>

            {/* Password Field */}
            <motion.div 
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="block text-sm">Password</label>
              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                  className="w-full bg-gray-50 pl-10 pr-12 py-3 rounded-lg transition-shadow duration-200 focus:shadow-md outline-none"
                  placeholder="Enter your password"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <Eye className="h-5 w-5 text-gray-400" />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/reset-password" 
                className="block text-[#00A6B2] text-right text-[15px] hover:opacity-80 transition-opacity"
              >
                Forgot Password?
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Fixed Section */}
        <motion.div 
          variants={itemVariants}
          className="fixed bottom-8 left-0 right-0 w-full max-w-[430px] mx-auto px-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <motion.div 
            variants={itemVariants}
            className="text-center mt-4 space-x-1"
          >
            <span className="text-gray-600 text-[15px]">Don't have an account?</span>
            <Link 
              href="/signup" 
              className="text-[#00A6B2] text-[15px] hover:opacity-80 transition-opacity"
            >
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  )
} 