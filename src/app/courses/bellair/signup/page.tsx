'use client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye, User, Phone } from 'lucide-react'
import { useState } from 'react'
import { auth, db } from '@/lib/firebase/config'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { generateLetterAvatar } from '@/lib/utils/generateAvatar'

interface FirebaseError {
  code: string;
  message: string;
}

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      setError('Please fill in all fields')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      // Create auth user first
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Generate avatar URL
      const avatarUrl = generateLetterAvatar(firstName)

      // Update auth profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: avatarUrl
      })

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email: user.email,
        phoneNumber,
        photoURL: avatarUrl,
        createdAt: new Date().toISOString()
      })

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: `${firstName} ${lastName}`,
        email: user.email,
        phoneNumber,
        photoURL: avatarUrl
      }))

      router.push('/courses/bellair/home')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as FirebaseError).message)
      } else {
        setError('Failed to sign up')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError('')
    setIsLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const nameParts = user.displayName?.split(' ') || ['', '']
      const googleFirstName = nameParts[0]
      const googleLastName = nameParts.slice(1).join(' ')

      // Use Google avatar if available, otherwise generate letter avatar
      const avatarUrl = user.photoURL || generateLetterAvatar(googleFirstName)

      if (!user.phoneNumber) {
        // Store temporary user data
        localStorage.setItem('tempUserData', JSON.stringify({
          uid: user.uid,
          firstName: googleFirstName,
          lastName: googleLastName,
          email: user.email,
          photoURL: avatarUrl
        }))
        
        // Redirect to complete profile page to collect phone number
        router.push('/courses/bellair/complete-profile')
        return
      }

      // If user has phone number, create full profile
      await setDoc(doc(db, 'users', user.uid), {
        firstName: googleFirstName,
        lastName: googleLastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: avatarUrl,
        createdAt: new Date().toISOString()
      })

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: avatarUrl
      }))

      router.push('/courses/bellair/home')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as FirebaseError).message)
      } else {
        setError('Failed to sign up with Google')
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
          <Link href="/courses/bellair" className="absolute left-0 top-5">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
        </div>

        {/* Form Content */}
        <div>
          <p className="text-gray-600 mb-8">
            Sign up and get access to all of our services and app features like our Course Map and digital Scorecard.
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* First Name */}
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
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                  placeholder="John"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
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
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg"
                  placeholder="(602) 555-1234"
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  className="w-full bg-gray-50 pl-10 pr-12 py-3 rounded-lg"
                  placeholder="Create a password"
                  required
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

          {/* Fixed Sign Up Button Section */}
          <div className="sticky bottom-0 bg-white pt-6 pb-4">
            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className={`w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {/* Or continue with section */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="mt-4 w-full border border-gray-300 bg-white text-gray-700 py-4 rounded-[32px] font-medium text-base flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Sign up with Google
            </motion.button>

            <div className="text-center mt-4 space-x-1">
              <span className="text-gray-600 text-[15px]">Already have an account?</span>
              <Link href="/courses/bellair/signin" className="text-[#00A6B2] text-[15px]">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 