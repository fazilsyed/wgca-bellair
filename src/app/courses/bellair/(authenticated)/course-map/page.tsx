'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import BottomNavigation from '@/components/BottomNavigation'

interface HoleInfo {
  holeNumber: number;
  par: number;
  tees: {
    red: number;
    white: number;
    blue: number;
  };
  description: string;
  imageUrl: string;
}

export default function CourseMapPage() {
  const router = useRouter()
  const [currentHole, setCurrentHole] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const holes: HoleInfo[] = [
    {
      holeNumber: 1,
      par: 3,
      tees: {
        red: 179,
        white: 179,
        blue: 195,
      },
      description: "A long par 4 with a dog leg right. Three bunkers guard the left fairway with water on the right. Green slopes north.",
      imageUrl: "/images/holes/aerial-hole-1.png"
    },
    {
      holeNumber: 2,
      par: 4,
      tees: {
        red: 320,
        white: 340,
        blue: 360,
      },
      description: "Straight par 4 with fairway bunkers on both sides. Elevated green protected by deep front bunkers.",
      imageUrl: "/images/holes/aerial-hole-2.png"
    },
    {
      holeNumber: 3,
      par: 5,
      tees: {
        red: 465,
        white: 485,
        blue: 510,
      },
      description: "Long par 5 with slight dogleg left. Water hazard runs along left side with bunkers protecting the green.",
      imageUrl: "/images/holes/aerial-hole-3.png"
    },
    {
      holeNumber: 4,
      par: 3,
      tees: {
        red: 145,
        white: 165,
        blue: 185,
      },
      description: "Short par 3 over water. Green surrounded by strategic bunker placement requires precise shot.",
      imageUrl: "/images/holes/aerial-hole-4.png"
    },
    {
      holeNumber: 5,
      par: 4,
      tees: {
        red: 350,
        white: 370,
        blue: 390,
      },
      description: "Dogleg right par 4. Strategic bunker placement demands careful tee shot positioning.",
      imageUrl: "/images/holes/aerial-hole-5.png"
    },
    {
      holeNumber: 6,
      par: 4,
      tees: {
        red: 330,
        white: 350,
        blue: 370,
      },
      description: "Straight par 4 featuring narrow fairway. Green protected by bunkers on both sides.",
      imageUrl: "/images/holes/aerial-hole-6.png"
    },
    {
      holeNumber: 7,
      par: 3,
      tees: {
        red: 155,
        white: 175,
        blue: 195,
      },
      description: "Challenging par 3 with water right. Back to front sloping green tests putting skills.",
      imageUrl: "/images/holes/aerial-hole-7.png"
    },
    {
      holeNumber: 8,
      par: 5,
      tees: {
        red: 475,
        white: 495,
        blue: 520,
      },
      description: "Long par 5 with water crossing fairway. Large but well-protected green requires accurate approach.",
      imageUrl: "/images/holes/aerial-hole-8.png"
    },
    {
      holeNumber: 9,
      par: 4,
      tees: {
        red: 340,
        white: 360,
        blue: 380,
      },
      description: "Front nine closer with slight dogleg left. Multiple bunkers guard the putting surface.",
      imageUrl: "/images/holes/aerial-hole-9.png"
    },
    {
      holeNumber: 10,
      par: 4,
      tees: {
        red: 345,
        white: 365,
        blue: 385,
      },
      description: "Straight par 4 opening back nine. Fairway bunkers on both sides require accurate drive.",
      imageUrl: "/images/holes/aerial-hole-10.png"
    },
    {
      holeNumber: 11,
      par: 3,
      tees: {
        red: 150,
        white: 170,
        blue: 190,
      },
      description: "Scenic par 3 with water fronting green. Multiple tee boxes offer varying challenges.",
      imageUrl: "/images/holes/aerial-hole-11.png"
    },
    {
      holeNumber: 12,
      par: 5,
      tees: {
        red: 480,
        white: 500,
        blue: 525,
      },
      description: "Risk-reward par 5 with water right of green. Second shot positioning crucial for scoring.",
      imageUrl: "/images/holes/aerial-hole-12.png"
    },
    {
      holeNumber: 13,
      par: 4,
      tees: {
        red: 335,
        white: 355,
        blue: 375,
      },
      description: "Dogleg right par 4. Precise tee shot required for optimal approach angle.",
      imageUrl: "/images/holes/aerial-hole-13.png"
    },
    {
      holeNumber: 14,
      par: 4,
      tees: {
        red: 325,
        white: 345,
        blue: 365,
      },
      description: "Straight par 4 with strategic fairway bunkers. Green slopes back to front.",
      imageUrl: "/images/holes/aerial-hole-14.png"
    },
    {
      holeNumber: 15,
      par: 3,
      tees: {
        red: 160,
        white: 180,
        blue: 200,
      },
      description: "Challenging par 3 featuring large green. Deep bunkers protect all sides.",
      imageUrl: "/images/holes/aerial-hole-15.png"
    },
    {
      holeNumber: 16,
      par: 5,
      tees: {
        red: 470,
        white: 490,
        blue: 515,
      },
      description: "Strategic par 5 with water hazard in play. Bunkers guard well-protected green complex.",
      imageUrl: "/images/holes/aerial-hole-16.png"
    },
    {
      holeNumber: 17,
      par: 4,
      tees: {
        red: 330,
        white: 350,
        blue: 370,
      },
      description: "Dogleg left par 4. Fairway bunkers demand careful tee shot placement.",
      imageUrl: "/images/holes/aerial-hole-17.png"
    },
    {
      holeNumber: 18,
      par: 4,
      tees: {
        red: 355,
        white: 375,
        blue: 395,
      },
      description: "Finishing hole with water right. Green slopes back to front with protective bunkers.",
      imageUrl: "/images/holes/aerial-hole-18.png"
    }
  ]

  const handleNextHole = () => {
    setCurrentHole(current => current === 18 ? 1 : current + 1)
  }

  const handlePreviousHole = () => {
    setCurrentHole(current => current === 1 ? 18 : current - 1)
  }

  const currentHoleInfo = holes[currentHole - 1]

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <div className="w-full max-w-[430px] relative">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center p-4"
        >
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Bellair Course Map</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>

        <div className="px-6 pb-24">
          {/* Hole Information */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentHole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-4"
            >
              <h2 className="text-2xl font-bold">Hole {currentHoleInfo.holeNumber}</h2>
              <p className="text-lg">Par {currentHoleInfo.par}</p>
            </motion.div>
          </AnimatePresence>

          {/* Tee Distances */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentHole}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mb-6"
            >
              <p className="text-sm">
                Tees: 
                <span className="text-gray-400"> {currentHoleInfo.tees.red}y</span> | 
                <span className="text-black"> {currentHoleInfo.tees.white}y</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Moved above image */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-6"
          >
            <button
              onClick={handlePreviousHole}
              className="flex-1 py-3 rounded-lg bg-[#E8F7F7] text-[#00A6B2] transition-colors hover:bg-[#d0f1f1]"
            >
              Previous
            </button>
            <button
              onClick={handleNextHole}
              className="flex-1 py-3 rounded-lg bg-[#00A6B2] text-white transition-colors hover:bg-[#008c96]"
            >
              Next
            </button>
          </motion.div>

          {/* Hole Image */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentHole}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative w-2/3 aspect-square mb-6 rounded-lg overflow-hidden bg-white mx-auto"
            >
              <Image
                src={currentHoleInfo.imageUrl}
                alt={`Hole ${currentHoleInfo.holeNumber}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Hole Description */}
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentHole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center text-gray-600 mb-8"
            >
              {currentHoleInfo.description}
            </motion.p>
          </AnimatePresence>

          {/* Progress Indicator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="w-1/3 h-1 bg-[#00A6B2] mx-auto rounded-full"
          />
        </div>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        <BottomNavigation />
      </div>
    </div>
  )
} 