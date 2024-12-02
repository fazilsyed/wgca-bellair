'use client'
import { useState, useEffect } from 'react'
import { ArrowLeft, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface UserData {
  name: string
  email: string
  photoURL: string
}

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    } else {
      // If no user data, redirect to sign in
      router.push('/courses/bellair/signin')
    }
  }, [router])

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
          {/* Profile Image */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={userData?.photoURL || '/images/isabel-round-avatar.png'}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Form Fields and Buttons */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6 pb-24"
          >
            {/* Name */}
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                value={userData?.name || ''}
                readOnly
                className="w-full p-3 bg-gray-50 rounded-lg"
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

            {/* Phone Number - Optional: You might want to add this to user data later */}
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Add your phone number"
                readOnly
                className="w-full p-3 bg-gray-50 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#00A6B2] text-white py-3 rounded-full font-medium"
              >
                Update
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border border-[#00A6B2] text-[#00A6B2] py-3 rounded-full font-medium"
              >
                Delete Account
              </motion.button>
            </div>
          </motion.div>
        </div>

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