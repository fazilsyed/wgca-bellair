'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

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
      description: "A long par 4 with a dog leg to the right. You can tee straight for a lay up, or over the trees to gain some yards. The fairway has 3 bunkers on the left, and a water hazard on the right. The putting green slopes north and is considered faster than average.",
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
      description: "Straight par 4 with bunkers guarding both sides of the fairway. The green is elevated and protected by deep bunkers in front.",
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
      description: "Long par 5 with a slight dogleg left. Water hazard runs along the left side. The green is well-protected by bunkers on both sides.",
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
      description: "Short par 3 over water. The green is surrounded by bunkers, making accuracy crucial.",
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
      description: "Dogleg right par 4. Strategic bunker placement requires careful tee shot placement.",
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
      description: "Straight par 4 with a narrow fairway. The green is protected by bunkers on both sides.",
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
      description: "Challenging par 3 with water on the right. The green slopes from back to front.",
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
      description: "Long par 5 with water hazard crossing the fairway. The green is large but well-guarded.",
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
      description: "Finishing hole for the front nine. Slight dogleg left with bunkers protecting the green.",
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
      description: "Starting the back nine with a straightaway par 4. Bunkers guard both sides of the fairway.",
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
      description: "Beautiful par 3 with water in front of the green. Multiple tee boxes offer different angles.",
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
      description: "Long par 5 with a risk-reward second shot. The green is protected by water on the right.",
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
      description: "Dogleg right par 4. Accurate tee shot placement is crucial for approach to the green.",
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
      description: "Straight par 4 with well-placed bunkers along the fairway. The green slopes from back to front.",
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
      description: "Challenging par 3 with a large green protected by deep bunkers.",
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
      description: "Strategic par 5 with water hazard in play for the second shot. The green is well-protected by bunkers.",
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
      description: "Dogleg left par 4. Careful tee shot placement needed to avoid fairway bunkers.",
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
      description: "Finishing hole with water along the right side. The green is protected by bunkers and slopes from back to front.",
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

        <div className="px-6">
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
                <span className="text-red-500"> {currentHoleInfo.tees.red}y</span> | 
                <span className="text-gray-600"> {currentHoleInfo.tees.white}y</span> | 
                <span className="text-blue-500"> {currentHoleInfo.tees.blue}y</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Hole Image */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentHole}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-white"
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

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-8"
          >
            <button
              onClick={handlePreviousHole}
              className="flex-1 py-3 rounded-lg bg-[#E8F7F7] text-[#00A6B2] transition-colors hover:bg-[#d0f1f1]"
            >
              Previous Hole
            </button>
            <button
              onClick={handleNextHole}
              className="flex-1 py-3 rounded-lg bg-[#00A6B2] text-white transition-colors hover:bg-[#008c96]"
            >
              Next Hole
            </button>
          </motion.div>

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
      </div>
    </div>
  )
} 