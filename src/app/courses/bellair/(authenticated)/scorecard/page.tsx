'use client'
import { useState } from 'react'
import { Menu, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'

export default function ScorecardPage() {
  const [strokes, setStrokes] = useState(3)
  const [currentHole, setCurrentHole] = useState(3)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const totalHoles = 18
  const par = 4
  const totalScore = 24

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
        </motion.div>

        {/* Hole Navigation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center px-6 py-4"
        >
          <button className="text-[#00A6B2]">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Hole {currentHole} - Par {par}</h1>
            <p className="text-gray-600">Scorecard Total: {totalScore}</p>
          </div>
          <button className="text-[#00A6B2]">
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Stroke Counter */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center justify-center p-6"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-full aspect-square flex flex-col items-center justify-center mb-6">
            <div className="flex items-center justify-between w-48 mb-8">
              <button 
                onClick={() => setStrokes(Math.max(0, strokes - 1))}
                className="text-[#00A6B2] text-4xl font-bold"
              >
                -
              </button>
              <span className="text-7xl font-bold">{strokes}</span>
              <button 
                onClick={() => setStrokes(strokes + 1)}
                className="text-[#00A6B2] text-4xl font-bold"
              >
                +
              </button>
            </div>
            <span className="text-xl text-gray-600">Strokes</span>
          </div>

          {/* Hole Progress Indicators */}
          <div className="flex gap-2 mb-6">
            {Array.from({ length: totalHoles }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentHole ? 'bg-gray-300' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Date and Save Button */}
          <div className="flex justify-between items-center w-full">
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => date && setSelectedDate(date)}
                customInput={
                  <button className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    {selectedDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </button>
                }
                calendarClassName="bg-white shadow-lg rounded-lg border border-gray-200"
                wrapperClassName="cursor-pointer"
                popperClassName="z-50"
                popperPlacement="top-start"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#00A6B2] text-white px-8 py-2 rounded-full"
            >
              Save
            </motion.button>
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