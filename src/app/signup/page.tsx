'use client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye } from 'lucide-react'
import { useState } from 'react'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

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

        {/* Form Content */}
        <div className="pb-32">
          <p className="text-gray-600 mb-8">
            Sign up and get access to all of our services and app features like our Course Map and digital Scorecard.
          </p>

          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
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
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
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
            type="submit"
            className="w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base"
          >
            Sign Up
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