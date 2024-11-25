'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ArrowLeft, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'

export default function FeedbackPage() {
  const router = useRouter()
  const [rating, setRating] = useState<number>(0)
  const [message, setMessage] = useState<string>('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex justify-center w-full bg-white min-h-screen">
      <div className="w-full max-w-[430px] relative">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold">Feedback</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-lg overflow-hidden w-32 h-32">
              <Image
                src="/images/bellair-logo-cutout.png"
                alt="Bellair Golf"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>

            <h1 className="text-2xl font-semibold">How was your experience?</h1>
            
            <p className="text-gray-600 text-center">
              Let us know what you thought, so we can constantly improve the experience for you and future guests!
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-2xl"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating >= star ? 'fill-orange-400 text-orange-400' : 'text-orange-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="w-full">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                placeholder="Ex: Good services"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              onClick={() => {}} // Implement handleSubmit
              className="w-full bg-[#00A6B2] text-white py-3 rounded-lg hover:bg-[#008891] transition"
            >
              Send Feedback
            </button>
          </div>
        </div>

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
    </div>
  )
}
