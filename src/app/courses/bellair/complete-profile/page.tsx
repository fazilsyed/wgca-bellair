'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { Phone, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface TempUserData {
  uid: string
  firstName: string
  lastName: string
  email: string | null
  photoURL: string | null
}

export default function CompleteProfile() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [tempUserData, setTempUserData] = useState<TempUserData | null>(null)

  useEffect(() => {
    const storedTempData = localStorage.getItem('tempUserData')
    if (!storedTempData) {
      router.push('/courses/bellair/signin')
      return
    }
    setTempUserData(JSON.parse(storedTempData))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tempUserData) return

    setError('')
    setIsLoading(true)

    try {
      // Create user document in Firestore
      await setDoc(doc(db, 'users', tempUserData.uid), {
        firstName: tempUserData.firstName,
        lastName: tempUserData.lastName,
        email: tempUserData.email,
        phoneNumber,
        photoURL: tempUserData.photoURL,
        createdAt: new Date().toISOString()
      })

      // Store complete user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: `${tempUserData.firstName} ${tempUserData.lastName}`,
        email: tempUserData.email,
        phoneNumber,
        photoURL: tempUserData.photoURL
      }))

      // Clear temporary data
      localStorage.removeItem('tempUserData')

      // Redirect to home
      router.push('/courses/bellair/home')
    } catch (error) {
      console.error('Error saving profile:', error)
      setError('Failed to save profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <main className="w-full max-w-[430px] relative min-h-screen px-6">
        <div className="relative pt-4 pb-8">
          <Link href="/courses/bellair/signin" className="absolute left-0 top-5">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-center text-2xl font-semibold">Complete Profile</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Please provide your phone number to complete your profile setup.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00A6B2] text-white py-4 rounded-[32px] font-medium text-base"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Complete Profile'}
          </button>
        </form>
      </main>
    </div>
  )
} 