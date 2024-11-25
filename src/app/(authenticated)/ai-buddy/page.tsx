'use client'
import { useState } from 'react'
import { ArrowLeft, Menu, Send } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'

interface Message {
  content: string
  isUser: boolean
}

const PRESET_PROMPTS = [
  "How do I order food and pro shop items to be delivered on the golf course?",
  "What beginner advice can you give me playing this course the first time?",
  "How do Tee Times work at Bellair and how do I book one?"
]

const STATIC_RESPONSES: { [key: string]: string } = {
  "How do I order food and pro shop items to be delivered on the golf course?": 
    "For food drinks, or pro shop orders, you can place orders in this app, or you can call directly at the numbers below:\n\nFood and Drinks: (602) 555-1234\nPro shop: (602) 555-5678\n\nIs there anything else I can help you with?",
  "What beginner advice can you give me playing this course the first time?":
    "For your first time at Bellair, I recommend arriving at least 30 minutes early to warm up. Start at the practice putting green to get a feel for the speed. The front nine is slightly more forgiving than the back nine. Don't forget to check in at the pro shop before your tee time!",
  "How do Tee Times work at Bellair and how do I book one?":
    "You can book tee times up to 7 days in advance through our app or by calling the pro shop. Morning tee times are typically busier, especially on weekends. We recommend booking at least 2-3 days in advance for peak times."
}

// Add this new component for the typing indicator
function GeneratingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-3 p-3 bg-gray-700 text-white rounded-lg max-w-fit"
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-1.5 h-1.5 bg-white/60 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-white/60 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-white/60 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <span className="text-sm text-white/80">Generating response...</span>
    </motion.div>
  )
}

export default function AIBuddyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    content: "Welcome! I'm here for your questions about the course, services, and even personalized advice for each hole. I am still learning, so forgive me if I make any mistakes. You can select a sample request or enter your own below.",
    isUser: false
  }])
  const [inputValue, setInputValue] = useState('')
  const [isAiAnswering, setIsAiAnswering] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentTypingText, setCurrentTypingText] = useState('')

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

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.2 } 
    }
  }

  const promptVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    hover: { 
      scale: 1.02,
      backgroundColor: "#f8f8f8",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  }

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages(prev => [...prev, { content, isUser: true }])
    setIsAiAnswering(true)
    setIsGenerating(true)

    // Get response
    const response = STATIC_RESPONSES[content] || 
      "Cannot connect to assistant right now, please try again later."

    // Reset typing text
    setCurrentTypingText('')

    // Show generating indicator for a brief moment
    setTimeout(() => {
      setIsGenerating(false)
      
      // Start typing effect
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < response.length) {
          setCurrentTypingText(prev => prev + response[currentIndex])
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setMessages(prev => [...prev, { content: response, isUser: false }])
          setCurrentTypingText('')
          setIsAiAnswering(false)
        }
      }, 15)
    }, 1000) // Show generating indicator for 1 second

    setInputValue('')
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center w-full bg-white min-h-screen"
    >
      <div className="w-full max-w-[430px] relative flex flex-col h-screen">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between p-6 border-b"
        >
          <Link href="/home">
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <span className="text-lg font-semibold">Bellair AI Golf Buddy</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Messages with improved animations */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 overflow-y-auto p-4 pb-48 space-y-4 scrollbar-hide"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-white border' 
                      : 'bg-[#4A5568] text-white'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message.content}
                </motion.div>
              </motion.div>
            ))}

            {/* Generating Indicator */}
            {isGenerating && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-[#4A5568] p-3 rounded-lg text-white">
                  <GeneratingIndicator />
                </div>
              </motion.div>
            )}

            {/* Typing Effect */}
            {isAiAnswering && !isGenerating && currentTypingText && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] p-3 rounded-lg bg-[#4A5568] text-white">
                  {currentTypingText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="inline-block ml-1"
                  >
                    ▋
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preset Prompts */}
          <AnimatePresence>
            {!isAiAnswering && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="space-y-2 mt-4 mb-4"
              >
                {PRESET_PROMPTS.map((prompt, index) => (
                  <motion.button
                    key={index}
                    variants={promptVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full p-3 bg-white border rounded-lg text-left"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Input Area */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-[72px] left-0 right-0 p-4 border-t bg-white max-w-[430px] mx-auto"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleSendMessage(inputValue.trim())
                }
              }}
              placeholder="Enter question here"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={() => inputValue.trim() && handleSendMessage(inputValue.trim())}
              className="p-2"
            >
              <Send className="w-6 h-6 text-[#00A6B2]" />
            </button>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Results not always 100% correct.</span>
            <span>Powered by <span className="text-[#FF6B00]">whispering.ai</span></span>
          </div>
        </motion.div>

        <BottomNavigation />
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
} 