'use client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { auth, db } from '@/lib/firebase/config'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

interface FirebaseError {
  code: string;
  message: string;
}

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.data()

      localStorage.setItem('user', JSON.stringify({
        name: userData?.firstName ? `${userData.firstName} ${userData.lastName}` : email.split('@')[0],
        email: user.email,
        phoneNumber: userData?.phoneNumber || '',
        photoURL: user.photoURL || '/images/default-avatar.png'
      }))
      
      router.push('/courses/bellair/home')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as FirebaseError).message)
      } else {
        setError('Failed to sign in')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (!userDoc.exists()) {
        // Store temporary user data
        localStorage.setItem('tempUserData', JSON.stringify({
          uid: user.uid,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          photoURL: user.photoURL
        }))
        
        // Redirect to complete profile page
        router.push('/courses/bellair/complete-profile')
        return
      }

      // Existing user - store data and redirect to home
      localStorage.setItem('user', JSON.stringify({
        name: user.displayName,
        email: user.email,
        phoneNumber: userDoc.data().phoneNumber,
        photoURL: user.photoURL
      }))

      router.push('/courses/bellair/home')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as FirebaseError).message)
      } else {
        setError('Failed to sign in with Google')
      }
    } finally {
      setIsLoading(false)
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
          <Link href="/courses/bellair" className="absolute left-0 top-5">
            <motion.div
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <h1 className="text-center text-2xl font-semibold">Sign In</h1>
        </motion.div>

        {/* Form Content */}
        <form onSubmit={handleSignIn} className="pb-32">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 p-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                href="/courses/bellair/reset-password" 
                className="block text-[#00A6B2] text-right text-[15px] hover:opacity-80 transition-opacity"
              >
                Forgot Password?
              </Link>
            </motion.div>
          </div>
<br/>
          {/* Sign In Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base 
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
          </motion.button>

          {/* Google Sign In */}
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full mt-4 border border-gray-300 bg-white text-gray-700 py-4 rounded-[32px] font-medium text-base flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Sign in with Google
          </motion.button>
        </form>

        {/* Bottom Fixed Section */}
        <motion.div 
          variants={itemVariants}
          className="fixed bottom-8 left-0 right-0 w-full max-w-[430px] mx-auto px-6"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mt-4 space-x-1"
          >
            <span className="text-gray-600 text-[15px]">Don't have an account?</span>
            <Link 
              href="/courses/bellair/signup" 
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