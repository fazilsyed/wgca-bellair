'use client'
import { useState } from 'react'
import { ArrowLeft, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
          <Link href="/home">
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
                src="/images/isabel-round-avatar.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Form Fields */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                value="Isabel Prado"
                readOnly
                className="w-full p-3 bg-gray-50 rounded-lg"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                value="602-555-1234"
                readOnly
                className="w-full p-3 bg-gray-50 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value="isabel@whispering.ai"
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

        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
} 