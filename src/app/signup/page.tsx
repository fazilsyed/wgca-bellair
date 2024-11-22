'use client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

export default function SignUp() {
  const { register } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill in all fields')
      return
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms & Conditions')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signUp(formData.email, formData.password, formData.firstName + " " + formData.lastName)
      router.push('/home')
    } catch (error) {
      setError('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <main className="w-full max-w-[430px] relative min-h-screen px-6">
        {/* Header */}
        <div className="relative pt-4 pb-8">
          <Link href="/" className="absolute left-0 top-5">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
        </div>

        {/* Add error message display */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Content */}
        <div className="pb-32">
          <p className="text-gray-600 mb-8">
            Sign up and get access to all of our services and app features like our Course Map and digital Scorecard.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name Field */}
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                />
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  placeholder="example@email.com..."
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                  placeholder="Password..."
                  className="w-full bg-gray-50 pl-10 pr-12 py-3 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <Eye className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300" 
              />
              <span className="text-sm text-gray-600">
                I agree to Bellair Golf Park{' '}
                <Link href="/terms" className="text-[#00A6B2]">
                  Terms & Conditions
                </Link>
              </span>
            </label>
          </form>
        </div>

        {/* Bottom Fixed Section */}
        <div className="fixed bottom-8 left-0 right-0 w-full max-w-[430px] mx-auto px-6">
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="text-center mt-4 space-x-1">
            <span className="text-gray-600 text-[15px]">Already have an account?</span>
            <Link href="/signin" className="text-[#00A6B2] text-[15px]">
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 