'use client'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate email
    if (!email) {
      setError('Please enter your email address')
      setIsLoading(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setShowPopup(true)
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/courses/bellair/signin')
      }, 3000)
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address')
      } else {
        setError('Failed to send reset email. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <main className="w-full max-w-[430px] relative min-h-screen px-6">
        {/* Header */}
        <div className="relative pt-4 pb-8">
          <Link href="/courses/bellair/signin" className="absolute left-0 top-5">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-center text-2xl font-semibold">Reset Password</h1>
        </div>

        {/* Form Content */}
        <div className="pb-32">
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
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </form>
        </div>

        {/* Bottom Fixed Section */}
        <div className="fixed bottom-8 left-0 right-0 w-full max-w-[430px] mx-auto px-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Sending...' : 'Continue'}
          </button>
        </div>

        {/* Popup Notification */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-gray-600">
                We've sent instructions to reset your password to {email}. Please check your email.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 