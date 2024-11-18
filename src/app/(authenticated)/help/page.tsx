'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Menu, ChevronRight, CheckCircle, CreditCard, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/Sidebar'

type TabType = 'info' | 'faqs' | 'contact'

export default function HelpPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') as TabType || 'info'
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    const tab = searchParams.get('tab') as TabType
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const faqs = [
    { 
      question: 'What are the hours of operation?',
      answer: 'Course Opens Daily at 6am. Range Hours 6am-10pm. On Tuesdays The Range opens at 9am to allow time for morning maintenance.'
    },
    { 
      question: 'How do I make a tee time?',
      answer: 'You can book a tee time through our app by visiting the Tee Times section, or call us at (602) 555-1234.'
    },
    { 
      question: 'How does the driving range work?',
      answer: 'Our driving range is open from 6am-10pm daily (9am opening on Tuesdays). You can purchase range balls at the pro shop or through the app.'
    },
    { 
      question: 'What kind of food and beverages?',
      answer: 'We offer a full menu of food and beverages at our restaurant and bar. You can view our menu in the app under the Menu section.'
    },
    { 
      question: 'When is the Pro Shop open?',
      answer: 'The Pro Shop is open during regular business hours, from 6am until closing.'
    },
    { 
      question: 'Do you offer lessons?',
      answer: 'Yes, we offer private and group lessons. You can book lessons through the app or contact our pro shop for more information.'
    },
    { 
      question: 'What is the pricing?',
      answer: 'Pricing varies by service. Please check specific sections (Tee Times, Range, Pro Shop) for current pricing.'
    },
    { 
      question: 'What else can I do at Bellair?',
      answer: 'Bellair offers a full range of golf services including a driving range, pro shop, restaurant and bar, lessons, and special events.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
          <Link href="/home">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <span className="text-lg font-semibold">Help</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2 ${
              activeTab === 'info' 
                ? 'bg-[#00A6B2] text-white rounded-full mx-2' 
                : 'text-gray-500'
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex-1 py-2 ${
              activeTab === 'faqs' 
                ? 'bg-[#00A6B2] text-white rounded-full mx-2' 
                : 'text-gray-500'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-2 ${
              activeTab === 'contact' 
                ? 'bg-[#00A6B2] text-white rounded-full mx-2' 
                : 'text-gray-500'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 space-y-6"
            >
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <h3 className="font-medium mb-2">Hours</h3>
                  <p className="text-gray-600">Course Opens Daily at 6am</p>
                  <p className="text-gray-600">Range Hours 6am-10pm</p>
                  <p className="text-gray-600 mt-2">*On Tuesdays The Range opens at 9am to allow time for morning maintenance*</p>
                  <p className="text-gray-600 mt-2">No rainchecks issued, except for unforeseen weather conditions.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CreditCard className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <h3 className="font-medium mb-2">Address</h3>
                  <p className="text-gray-600">17233 N 45th Ave</p>
                  <p className="text-gray-600">Glendale, AZ 85308</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'faqs' && (
            <motion.div
              key="faqs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="flex justify-between items-center w-full text-left py-4"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: "auto", 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3 },
                            opacity: { duration: 0.2, delay: 0.1 }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3 },
                            opacity: { duration: 0.2 }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-gray-600 pr-8">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 space-y-6"
            >
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <h3 className="font-medium mb-2">Phone</h3>
                  <p className="text-gray-600">Tee Time: (602) 555-1234</p>
                  <p className="text-gray-600">Driving Range: (602) 555-1234</p>
                  <p className="text-gray-600">Pro Shop: (602) 555-1234</p>
                  <p className="text-gray-600">Restaurant and Bar: (602) 555-1234</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <a 
                    href="mailto:play@bellairgolfpark.com" 
                    className="text-[#00A6B2]"
                  >
                    play@bellairgolfpark.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
} 