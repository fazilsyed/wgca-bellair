'use client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye, User } from 'lucide-react'
import { useState } from 'react'
import { auth } from '@/lib/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAgreed, setIsAgreed] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!isAgreed) {
      setError('Please agree to the Terms & Conditions')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update profile with full name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      })

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: `${firstName} ${lastName}`,
        email: user.email,
        photoURL: user.photoURL || '/images/default-avatar.png'
      }))

      router.push('/courses/bellair/home')
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <main className="w-full max-w-[430px] relative min-h-screen px-6">
        {/* Header */}
        <div className="relative pt-4 pb-8">
          <Link href="/courses/bellair" className="absolute left-0 top-5">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
        </div>

        {/* Form Content */}
        <div className="pb-32">
          <p className="text-gray-600 mb-8">
            Sign up and get access to all of our services and app features like our Course Map and digital Scorecard.
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* First Name Field */}
            <div className="space-y-2">
              <label className="block text-sm">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div className="space-y-2">
              <label className="block text-sm">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300" 
              />
              <span className="text-sm text-gray-600">
                I agree to Bellair Golf Park{' '}
                <Link href="/courses/bellair/terms" className="text-[#00A6B2]">
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
            disabled={isLoading}
            className={`w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>

          <div className="text-center mt-4 space-x-1">
            <span className="text-gray-600 text-[15px]">Already have an account?</span>
            <Link href="/courses/bellair/signin" className="text-[#00A6B2] text-[15px]">
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 