'use client'
import { useState } from 'react'
import { ArrowLeft, Menu, Search, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  type: 'tournament' | 'event';
}

export default function RangePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'balls' | 'waitlist'>('info')
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

  const events: Event[] = [
    {
      id: '1',
      title: 'Summer Golf Tournament',
      description: 'Join our annual summer tournament with great prizes and fun for all skill levels.',
      image: '/images/events.webp',
      date: 'Sat 12/14/24',
      type: 'tournament'
    },
    {
      id: '2',
      title: 'Twilight Picnic on The Course',
      description: 'Experience the beauty of our course in our bi-weekly twilight series every Saturday.',
      image: '/images/events.webp',
      date: 'Sat 12/14/24',
      type: 'event'
    },
    // ... other events
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
          <Link href="/courses/bellair/home">
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
        <div className="relative flex mx-6 mb-6 border border-gray-200 rounded-xl p-1 overflow-hidden">
          <motion.div
            className="absolute inset-y-[4px] bg-[#00A6B2] rounded-lg"
            initial={false}
            animate={{
              left: activeTab === 'info' 
                ? '1%' 
                : activeTab === 'balls'
                  ? '34%'
                  : '67%'
            }}
            style={{ width: '31%' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
          />
          <button
            onClick={() => setActiveTab('info')}
            className={`relative flex-1 py-1.5 text-center z-10 ${
              activeTab === 'info' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab('balls')}
            className={`relative flex-1 py-1.5 text-center z-10 ${
              activeTab === 'balls' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Balls
          </button>
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`relative flex-1 py-1.5 text-center z-10 ${
              activeTab === 'waitlist' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Waitlist
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'info' ? (
            <motion.div
              key="info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Available Range Times</h2>
                <Link href="/courses/bellair/range/all" className="text-[#00A6B2] flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">About Bellair Driving Range</h3>
                <p className="text-gray-600">
                  Located in Glendale, AZ, Bellair Driving Range offers a premier golfing experience with state-of-the-art facilities. Whether you're a beginner or a seasoned golfer, our range provides the perfect environment to practice your swing.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Facilities</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Advanced swing analysis systems</li>
                  <li>Gaming systems for fun practice</li>
                  <li>Pro shop with the latest gear</li>
                  <li>On-site restaurant and bar</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Hours of Operation</h3>
                <p className="text-gray-600">
                  Open daily from 6am to 10pm. On Tuesdays, the range opens at 9am for maintenance.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 flex justify-center items-center h-[200px]"
            >
              <p className="text-gray-500 text-lg">Coming Soon</p>
            </motion.div>
          )}
        </AnimatePresence>

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