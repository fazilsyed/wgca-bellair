'use client'
import { useState, useEffect } from 'react'
import { ArrowLeft, Menu, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { deleteUser, signOut } from 'firebase/auth'

interface UserData {
  firstName: string
  lastName: string
  email: string
  photoURL: string
  phoneNumber: string
}

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (!user) {
        router.push('/courses/bellair/signin')
        return
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData
          setUserData(data)
          setFirstName(data.firstName)
          setLastName(data.lastName)
          setPhoneNumber(data.phoneNumber)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError('Failed to load user data')
      }
    }

    fetchUserData()
  }, [router])

  const handleUpdate = async () => {
    setError('')
    setIsLoading(true)
    const user = auth.currentUser

    if (!user) {
      setError('No user found')
      setIsLoading(false)
      return
    }

    try {
      // Update Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        phoneNumber
      })

      // Update local state
      setUserData(prev => prev ? {
        ...prev,
        firstName,
        lastName,
        phoneNumber
      } : null)

      // Update localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        localStorage.setItem('user', JSON.stringify({
          ...parsedUser,
          name: `${firstName} ${lastName}`,
          phoneNumber
        }))
      }

      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setError('')
    setIsLoading(true)
    const user = auth.currentUser

    if (!user) {
      setError('No user found')
      setIsLoading(false)
      return
    }

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'users', user.uid))
      // Delete auth user
      await deleteUser(user)
      // Clear localStorage
      localStorage.removeItem('user')
      // Sign out
      await signOut(auth)
      // Redirect to home
      router.push('/courses/bellair')
    } catch (error) {
      console.error('Error deleting account:', error)
      setError('Failed to delete account')
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
      <div className="w-full max-w-[430px] relative">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between p-4"
        >
          <Link href="/courses/bellair/home">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <span className="text-lg font-semibold">Personal Info</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>

        <div className="px-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Profile Image */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <img
                src={userData?.photoURL || '/images/default-avatar.png'}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Form Fields */}
          <motion.div variants={itemVariants} className="space-y-6 pb-24">
            {/* First Name */}
            <div>
              <label className="block text-sm mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-white border border-gray-300' : 'bg-gray-50'}`}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-white border border-gray-300' : 'bg-gray-50'}`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={userData?.email || ''}
                readOnly
                className="w-full p-3 bg-gray-50 rounded-lg"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-white border border-gray-300' : 'bg-gray-50'}`}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="flex-1 bg-[#00A6B2] text-white py-3 rounded-full font-medium"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Save'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="flex-1 border border-[#00A6B2] text-[#00A6B2] py-3 rounded-full font-medium"
                  >
                    Cancel
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-[#00A6B2] text-white py-3 rounded-full font-medium"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex-1 border border-red-500 text-red-500 py-3 rounded-full font-medium"
                  >
                    Delete Account
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
              <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
          <div className="w-full max-w-[430px]">
            <BottomNavigation />
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
} 