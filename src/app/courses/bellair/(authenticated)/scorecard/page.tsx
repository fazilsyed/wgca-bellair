'use client'
import { useState } from 'react'
import { Menu, Minus, Plus, Eye } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  
  const [activeTab, setActiveTab] = useState<'current' | 'previous'>('current')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
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
      const totalScore = updatedHoles.reduce((sum, hole) => sum + hole.score, 0)
      const totalPar = updatedHoles.reduce((sum, hole) => sum + hole.par, 0)

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
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/isabel-round-avatar.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-lg">Hello Isabel 👋</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Scorecard Info Card */}
        <div className="mx-6 p-6 bg-[#00A6B2] rounded-xl text-white mb-6">
          <h2 className="text-2xl font-semibold mb-2">My Scorecard</h2>
          <p className="opacity-90">
            Track your score, save, and share with friends. After 10 rounds, our AI Buddy can analyze your scores and offer free tips!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex px-4 mb-6">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 text-center rounded-full mx-2 ${
              activeTab === 'current' 
                ? 'bg-[#00A6B2] text-white' 
                : 'text-gray-500'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`flex-1 py-2 text-center rounded-full mx-2 ${
              activeTab === 'previous' 
                ? 'bg-[#00A6B2] text-white' 
                : 'text-gray-500'
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
                <div className="flex justify-between px-4 mb-6">
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

                {/* Holes List */}
                <div className="px-4 space-y-3 mb-6">
                  {currentScorecard.holes.map((hole) => (
                    <div 
                      key={hole.number}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <div className="relative flex items-center">
                          {/* Hole layout image - increased from w-12/h-12 to w-14/h-14 */}
                          <div className="relative w-14 h-14">
                            <Image
                              src={hole.layoutImageUrl}
                              alt={`Hole ${hole.number} layout`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          {/* Hole number circle - moved to left-4 for more overlap */}
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#00A6B2] text-white rounded-full flex items-center justify-center text-sm">
                            {hole.number}
                          </div>
                        </div>
                        <span className="text-gray-500 ml-3">Par {hole.par}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => updateHoleScore(hole.number, false)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-4 text-center">{hole.score}</span>
                        <button 
                          onClick={() => updateHoleScore(hole.number, true)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <div className="w-8 text-center">
                          {hole.score > hole.par 
                            ? `+${hole.score - hole.par}`
                            : hole.score < hole.par 
                              ? hole.score - hole.par
                              : '0'}
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