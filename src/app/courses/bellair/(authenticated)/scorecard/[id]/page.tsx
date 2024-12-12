'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import BottomNavigation from '@/components/BottomNavigation'

interface ScorecardData {
  date: string;
  time: string;
  scores: Array<{
    hole: number;
    par: number;
    score: number;
  }>;
  total: {
    score: number;
    over: number;
  };
  notes: string;
}

export default function ViewScorecardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'statistics' | 'journal'>('statistics')

  // Mock data - replace with actual data fetching
  const scorecardData: ScorecardData = {
    date: 'Sun. December 12, 2024',
    time: 'Saved: 3:30p MST',
    scores: Array(18).fill(null).map((_, i) => ({
      hole: i + 1,
      par: 4,
      score: 3
    })),
    total: {
      score: 87,
      over: 18
    },
    notes: "Today felt like one of those rounds where golf reminds you it's as much mental as physical. I started strong—crisp drives and clean approaches made the front nine a breeze. But by the time I hit the 12th, my focus wavered, and those easy two-putts turned into frustrating three-putts.\n\nMy save on the 16th, though, was the highlight—a long bunker shot that rolled up close to the pin, salvaging a par. That one felt good, like a little reminder from the golf gods that persistence pays off."
  }

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <div className="w-full max-w-[430px] relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold">View Scorecard</span>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>

        {/* Tabs */}
        <div className="border border-gray-200 rounded-lg mx-4 mb-4 p-1 bg-white">
          <div className="flex w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <motion.div
                  className={`h-full ${
                    activeTab === 'statistics' ? 'w-1/2 left-0' : 'w-1/2 left-1/2'
                  } absolute bg-[#00A6B2] rounded-md`}
                  layoutId="tabHighlight"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              </motion.div>
            </AnimatePresence>
            
            <button
              onClick={() => setActiveTab('statistics')}
              className={`flex-1 py-2 px-4 rounded-md text-center transition-colors relative z-10 ${
                activeTab === 'statistics' 
                  ? 'text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <motion.span
                animate={{ scale: activeTab === 'statistics' ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Statistics
              </motion.span>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex-1 py-2 px-4 rounded-md text-center transition-colors relative z-10 ${
                activeTab === 'journal' 
                  ? 'text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <motion.span
                animate={{ scale: activeTab === 'journal' ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Journal Entry
              </motion.span>
            </button>
          </div>
        </div>

        {/* Date Info */}
        <div className="px-4 mb-6">
          <p className="text-gray-600">
            {scorecardData.date} | {scorecardData.time}
          </p>
        </div>

        {/* Content Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'statistics' ? (
              <div className="px-4 pb-24">
                <table className="w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-2 px-2 text-left">#</th>
                      <th className="py-2 px-2">PAR</th>
                      <th className="py-2 px-2">(NAME)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scorecardData.scores.map((hole) => (
                      <tr key={hole.hole} className="border-b border-gray-100">
                        <td className="py-2">
                          <span className="w-8 h-8 bg-[#00A6B2] text-white rounded-full flex items-center justify-center">
                            {hole.hole}
                          </span>
                        </td>
                        <td className="py-2 text-center">P{hole.par}</td>
                        <td className="py-2 text-center text-gray-500">({hole.score})</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-800 text-white">
                      <td className="py-2 px-2">TOTAL</td>
                      <td className="py-2 text-center">{scorecardData.total.score}</td>
                      <td className="py-2 text-center text-gray-300">+{scorecardData.total.over}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-4 pb-24">
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <p className="text-gray-700 whitespace-pre-line">
                    {scorecardData.notes}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
          <div className="w-full max-w-[430px]">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  )
} 