'use client'

import { useState } from 'react'
import { ArrowLeft, Menu, Calendar } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  type: 'tournament' | 'event' | 'private';
}

export default function EventsPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'event' | 'tournament' | 'private'>('all')

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
    {
      id: '3',
      title: 'Every Kid Counts Golf Day',
      description: 'Our annual fundraiser for supporting the kids in our communities and teaching them golf.',
      image: '/images/events.webp',
      date: 'Sat 12/14/24',
      type: 'event'
    },
    {
      id: '4',
      title: 'Junior Golf Camp for Beginners',
      description: 'Bring your kids to a fun camp to learn about golf and how to get started with your swing.',
      image: '/images/events.webp',
      date: 'Sat 12/14/24',
      type: 'tournament'
    },
    {
      id: '5',
      title: 'Corporate Golf Day',
      description: 'Private corporate event with exclusive course access and catering.',
      image: '/images/events.webp',
      date: 'Sat 12/14/24',
      type: 'private'
    },
    {
      id: '6',
      title: 'Member-Guest Tournament',
      description: 'Exclusive tournament for members and their invited guests.',
      image: '/images/events.webp',
      date: 'Sat 12/14/24',
      type: 'private'
    }
  ]

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.type === activeFilter)

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
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold">Event Calendar</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Hero Banner */}
        <motion.div 
          variants={itemVariants}
          className="mx-4 mb-6 rounded-lg overflow-hidden relative"
        >
          <div className="relative h-[200px] w-full">
            <Image
              src="/images/golf-background.jpg"
              alt="Join us For the Fun!"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Join us For the Fun!
              </h2>
              <p className="text-white text-sm">
                We host tournaments and events throughout the year. Check below to see what's coming up soon!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2"
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === 'all' 
                ? 'bg-[#00A6B2] text-white' 
                : 'border border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('event')}
            className={`px-4 py-2 rounded-full border whitespace-nowrap ${
              activeFilter === 'event' 
                ? 'bg-[#00A6B2] text-white' 
                : 'border-gray-200'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveFilter('tournament')}
            className={`px-4 py-2 rounded-full border whitespace-nowrap ${
              activeFilter === 'tournament' 
                ? 'bg-[#00A6B2] text-white' 
                : 'border-gray-200'
            }`}
          >
            Tournaments
          </button>
          <button
            onClick={() => setActiveFilter('private')}
            className={`px-4 py-2 rounded-full border whitespace-nowrap ${
              activeFilter === 'private' 
                ? 'bg-[#00A6B2] text-white' 
                : 'border-gray-200'
            }`}
          >
            Private
          </button>
        </motion.div>

        {/* Events Grid */}
        <motion.div 
          variants={itemVariants}
          className="px-4 pb-24"
        >
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                  transition={{ duration: 0.2 }}
                  className="bg-gray-50 rounded-lg overflow-hidden"
                >
                  <div className="relative h-40 bg-white p-4 flex items-center justify-center">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium mb-1">{event.title}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="bg-[#00A6B2] text-white px-4 py-1 rounded-lg text-sm"
                      >
                        More Info
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
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