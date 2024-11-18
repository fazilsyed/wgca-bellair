'use client'
import { useState } from 'react'
import { ArrowLeft, Menu, Search, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function RangePage() {
  const [activeTab, setActiveTab] = useState('time-slots')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const rangeTimes = [
    { date: 'Mon 12/15/24', time: '7:15 AM', available: 3 },
    { date: 'Mon 12/15/24', time: '9:35 AM', available: 2 },
    { date: 'Mon 12/15/24', time: '11:15 AM', available: 1 },
    { date: 'Mon 12/15/24', time: '1:15 PM', available: 4 },
    { date: 'Mon 12/15/24', time: '4:15 PM', available: 2 },
  ]

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
          <span className="text-lg font-semibold">Bellair Driving Range</span>
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
            alt="Driving Range"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
            <h1 className="text-white text-2xl font-semibold mb-2">
              Reserve Your Spot on The Range!
            </h1>
            <p className="text-white/90">
              Reserve time on the range and practice your swing with our advanced swing analysis and gaming systems.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex px-4 mb-6">
          <button
            onClick={() => setActiveTab('time-slots')}
            className={`flex-1 py-2 ${activeTab === 'time-slots' ? '' : 'text-gray-500'}`}
          >
            Time Slots
          </button>
          <button
            onClick={() => setActiveTab('my-reservations')}
            className={`flex-1 py-2 ${
              activeTab === 'my-reservations' 
                ? 'bg-[#00A6B2] text-white rounded-full mx-2' 
                : 'text-gray-500'
            }`}
          >
            My Reservations
          </button>
        </motion.div>

        {/* Range Times List */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Range Times</h2>
            <Link href="/range/all" className="text-[#00A6B2] flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {rangeTimes.map((time, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="text-gray-600">{time.date}</div>
                  <div className="font-medium">{time.time}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {time.available} avail
                  </span>
                  {index === 0 && (
                    <span className="text-[#00A6B2]">View</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div variants={itemVariants} className="px-4 mt-6 pb-24">
          <h3 className="text-lg font-medium mb-4">Search Range Times</h3>
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
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Add Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
          <div className="w-full max-w-[430px]">
            <BottomNavigation />
          </div>
        </div>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
} 