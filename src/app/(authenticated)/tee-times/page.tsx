'use client'
import { useState } from 'react'
import { ArrowLeft, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function TeeTimesPage() {
  const [activeTab, setActiveTab] = useState('tee-times')
  const [searchQuery, setSearchQuery] = useState('')
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

  const teeTimes = [
    { date: 'Mon 12/15/24', time: '7:15 AM', available: 3 },
    { date: 'Mon 12/15/24', time: '9:35 AM', available: 2 },
    { date: 'Mon 12/15/24', time: '11:15 AM', available: 1 },
    { date: 'Mon 12/15/24', time: '1:15 PM', available: 4 },
    { date: 'Mon 12/15/24', time: '4:15 PM', available: 2 },
  ]

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
          <span className="text-lg font-semibold">Belair Tee Times</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Hero Card */}
        <motion.div 
          variants={itemVariants}
          className="mx-4 rounded-lg overflow-hidden relative h-[180px] mb-6"
        >
          <Image
            src="/images/golf-background.jpg"
            alt="Golf Course"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
            <h2 className="text-white text-2xl font-semibold mb-2">
              Book a Tee Time Below
            </h2>
            <p className="text-white text-sm">
              Find the next available tee time, or search for availability at a future date. View and manage your tee times here as well.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex mb-6 px-4"
        >
          <button
            onClick={() => setActiveTab('tee-times')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'tee-times' ? '' : 'text-gray-500'
            }`}
          >
            Tee Times
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'reservations' 
                ? 'bg-[#00A6B2] text-white rounded-full'
                : 'text-gray-500'
            }`}
          >
            My Reservations
          </button>
        </motion.div>

        {/* Available Tee Times */}
        <motion.div 
          variants={itemVariants}
          className="px-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Available Tee Times</h3>
            <Link href="/tee-times/" className="text-[#00A6B2] flex items-center">
              View All <span className="ml-1">›</span>
            </Link>
          </div>

          {/* Tee Times List */}
          <div className="space-y-4">
            {teeTimes.map((teeTime, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex justify-between items-center"
              >
                <div>
                  <div className="text-gray-600">{teeTime.date}</div>
                  <div className="font-medium">{teeTime.time}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {teeTime.available} avail
                  </span>
                  {index === 0 && (
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-[#00A6B2] cursor-pointer"
                    >
                      View
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          variants={itemVariants}
          className="px-4 mt-6 pb-24"
        >
          <h3 className="text-lg font-medium mb-4">Search Tee Times</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Date Range"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200"
            />
            {searchQuery && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}
          </div>
        </motion.div>

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