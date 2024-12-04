'use client'
import { useState, useEffect } from 'react'
import { Menu, Minus, Plus, Eye } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

interface UserData {
  firstName: string
  lastName: string
  email: string
  photoURL: string
  phoneNumber: string
}

// This interface will help with Firebase integration later
interface Scorecard {
  id?: string;  // Firebase document ID
  userId: string;
  date: Date;
  totalScore: number;
  totalPar: number;
  holes: HoleScore[];
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface HoleScore {
  number: number;
  par: number;
  score: number;
  layoutImageUrl: string;
}

interface PreviousScorecard {
  id: string;
  date: Date;
  totalScore: number;
  totalPar: number;
}

export default function ScorecardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Add useEffect for fetching user data
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
  
  const [activeTab, setActiveTab] = useState<'current' | 'previous'>('current')
  
  // This will be fetched from Firebase later
  const [currentScorecard, setCurrentScorecard] = useState<Scorecard>({
    userId: 'user123', // Will come from auth
    date: new Date(),
    totalScore: 0,
    totalPar: 0,
    holes: Array.from({ length: 18 }, (_, i) => ({
      number: i + 1,
      par: [1, 8, 9, 10].includes(i + 1) ? 4 : 3, // Par 4 for holes 1, 8, 9, 10
      score: 0,
      layoutImageUrl: `/images/holes/bgp-hole-${String(i + 1).padStart(2, '0')}.png`
    })),
    isComplete: false,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const [previousScorecards] = useState<PreviousScorecard[]>([
    { id: '1', date: new Date('2024-12-12'), totalScore: 96, totalPar: 72 },
    { id: '2', date: new Date('2024-12-12'), totalScore: 92, totalPar: 72 },
    { id: '3', date: new Date('2024-12-12'), totalScore: 88, totalPar: 72 },
    { id: '4', date: new Date('2024-12-12'), totalScore: 94, totalPar: 72 },
    { id: '5', date: new Date('2024-12-12'), totalScore: 90, totalPar: 72 },
    { id: '6', date: new Date('2024-12-12'), totalScore: 86, totalPar: 72 },
  ])

  const updateHoleScore = (holeNumber: number, increment: boolean) => {
    setCurrentScorecard(prev => {
      const updatedHoles = prev.holes.map(hole => {
        if (hole.number === holeNumber) {
          return {
            ...hole,
            score: increment ? hole.score + 1 : Math.max(0, hole.score - 1)
          }
        }
        return hole
      })

      // Calculate new totals
      const totalScore = updatedHoles.reduce((sum, hole) => {
        return hole.score > 0 ? sum + hole.score : sum
      }, 0)
      const totalPar = updatedHoles.reduce((sum, hole) => {
        return hole.score > 0 ? sum + hole.par : sum
      }, 0)

      return {
        ...prev,
        holes: updatedHoles,
        totalScore,
        totalPar,
        updatedAt: new Date()
      }
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

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

        {/* Scorecard Info Card */}
        <div className="mx-6 p-6 bg-[#00A6B2] rounded-xl text-white mb-6">
          <h2 className="text-2xl font-semibold mb-2">My Scorecard</h2>
          <p className="opacity-90">
            Track your score, save, and share with friends. After 10 rounds, our AI Buddy can analyze your scores and offer free tips!
          </p>
        </div>

        {/* Tabs */}
        <div className="relative flex mx-6 mb-6 border border-gray-200 rounded-xl p-1 overflow-hidden">
          <motion.div
            className="absolute inset-y-[4px] bg-[#00A6B2] rounded-lg"
            initial={false}
            animate={{
              left: activeTab === 'current' 
                ? '1%' 
                : '50%'
            }}
            style={{ width: '48%' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
          />
          <button
            onClick={() => setActiveTab('current')}
            className={`relative flex-1 py-1.5 text-center z-10 ${
              activeTab === 'current' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`relative flex-1 py-1.5 text-center z-10 ${
              activeTab === 'previous' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Previous
          </button>
        </div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'current' ? (
            <motion.div
              key="current"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Current scorecard content */}
              <>
                {/* Score Summary */}
                <div className="flex justify-end px-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-gray-500">TOTAL:</span>
                      <span className="text-xl font-semibold ml-2">
                        {currentScorecard.totalScore}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">PAR:</span>
                      <span className="text-xl font-semibold ml-2">
                        {currentScorecard.totalScore > currentScorecard.totalPar 
                          ? '+' + (currentScorecard.totalScore - currentScorecard.totalPar)
                          : currentScorecard.totalScore - currentScorecard.totalPar}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Holes List */}
                <div className="px-4 space-y-3 mb-6">
                  {currentScorecard.holes.map((hole) => (
                    <div 
                      key={hole.number}
                      className="grid grid-cols-2 bg-gray-50 rounded-lg h-20"
                    >
                      <div className="flex items-center pl-3">
                        <div className="relative flex items-center">
                          {/* Hole layout image */}
                          <div className="relative w-14 h-14">
                            <Image
                              src={hole.layoutImageUrl}
                              alt={`Hole ${hole.number} layout`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          {/* Hole number circle */}
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#00A6B2] text-white rounded-full flex items-center justify-center text-sm">
                            {hole.number}
                          </div>
                        </div>
                        <span className="text-gray-500 ml-3">Par {hole.par}</span>
                      </div>

                      <div className="relative h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateHoleScore(hole.number, false)}
                              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="w-6 text-center text-lg font-medium">{hole.score}</span>
                            <button 
                              onClick={() => updateHoleScore(hole.number, true)}
                              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                            <div className="w-8 text-center text-lg ml-3">
                              {hole.score > hole.par 
                                ? `+${hole.score - hole.par}`
                                : hole.score < hole.par && hole.score > 0
                                  ? hole.score - hole.par
                                  : '0'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Date and Save Button */}
                <div className="flex justify-between items-center px-4 mb-24">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>December 15, 2024</span>
                  </div>
                  <button className="bg-[#00A6B2] text-white px-6 py-2 rounded-full">
                    Save
                  </button>
                </div>
              </>
            </motion.div>
          ) : (
            <motion.div
              key="previous"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Previous scorecards list */}
              <div className="px-4 space-y-3 mb-24">
                {previousScorecards.map((scorecard) => (
                  <motion.div
                    key={scorecard.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-gray-600">
                      {formatDate(scorecard.date)}
                    </span>
                    <button className="text-[#00A6B2]">
                      <Eye className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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