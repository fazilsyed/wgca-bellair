'use client'

import { useState, useEffect } from 'react'
import { Menu, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc } from 'firebase/firestore'

interface UserData {
  firstName: string
  lastName: string
  email: string
  photoURL: string
  phoneNumber: string
}

interface Instructor {
  id: string;
  name: string;
  image: string;
  specialty: string;
  likes: number;
}

export default function GolfLessonsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
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

  const instructors: Instructor[] = [
    {
      id: '1',
      name: 'Scottie Smith',
      image: '/images/instructors/scottie-smith.png',
      specialty: 'Specializes in improving your short game',
      likes: 27
    },
    {
      id: '2',
      name: 'Sarah Williams',
      image: '/images/instructors/sarah-williams.png',
      specialty: 'Helps beginners build a solid foundation',
      likes: 52
    },
    {
      id: '3',
      name: 'Rory Jones',
      image: '/images/instructors/rory-jones.png',
      specialty: 'Expert in perfecting your swing technique',
      likes: 74
    },
    {
      id: '4',
      name: 'Nelly Anderson',
      image: '/images/instructors/nelly-anderson.png',
      specialty: 'Specializes in improving your short game',
      likes: 35
    }
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center w-full bg-white min-h-screen"
    >
      <div className="w-full max-w-[430px] relative">
        {/* Updated Header */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center p-6"
        >
          <div className="flex items-center gap-3">
            <Link href="/courses/bellair/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[40px] h-[40px] rounded-full overflow-hidden"
              >
                <img
                  src={userData?.photoURL || '/images/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                />
              </motion.div>
            </Link>
            <span className="text-lg">Hey {userData?.firstName || 'Guest'} 👋</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </motion.div>

        {/* Hero Card */}
        <motion.div 
          variants={itemVariants}
          className="mx-4 mb-6 rounded-lg overflow-hidden relative"
        >
          <div className="relative h-[200px] w-full">
            <Image
              src="/images/golf-background.jpg"
              alt="Instruction and Coaching"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Instruction and Coaching
              </h2>
              <p className="text-white text-sm">
                Take it up a notch by learning from our course pros below. Pay for lessons, then find room on their calendar to schedule a lesson.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructors Grid */}
        <motion.div 
          variants={itemVariants}
          className="px-4 pb-24"
        >
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {instructors.map((instructor) => (
                <motion.div
                  key={instructor.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg overflow-hidden bg-gray-50"
                >
                  {/* Instructor Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-2 right-2 bg-white rounded-full p-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </motion.div>
                  </div>
                  
                  {/* Instructor Info */}
                  <div className="p-3">
                    <h3 className="font-semibold">{instructor.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {instructor.specialty}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400">{instructor.likes}</span>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#00A6B2] text-white px-4 py-1 rounded-md text-sm"
                      >
                        Book now
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