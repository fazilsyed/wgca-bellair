'use client'
import { X, Home, Map, Utensils, Store, 
         HelpCircle, User, MessageSquare, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter()

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/courses/bellair')
  }

  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center">
          <div className="relative w-full max-w-[430px]">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="absolute top-0 right-0 h-full w-[300px] bg-[#1C1C1E] z-50"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6">
                <Image
                  src="/images/bellair-logo.png"
                  alt="Bellair Golf Park"
                  width={100}
                  height={100}
                  className="brightness-0 invert"
                />
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="px-6 py-4">
                <ul className="space-y-4">
                  <NavItem 
                    icon={<Home className="w-5 h-5" />} 
                    label="Home" 
                    href="/courses/bellair/home" 
                  />
                  <NavItem 
                    icon={<Map className="w-5 h-5" />} 
                    label="Course Map" 
                    href="/courses/bellair/course-map" 
                  />
                  <NavItem 
                    icon={<Utensils className="w-5 h-5" />} 
                    label="Menu" 
                    href="/courses/bellair/menu" 
                  />
                  <NavItem 
                    icon={<Store className="w-5 h-5" />} 
                    label="Pro Shop" 
                    href="/courses/bellair/pro-shop" 
                  />
                  <NavItem 
                    icon={<HelpCircle className="w-5 h-5" />} 
                    label="Help" 
                    href="/courses/bellair/help" 
                  />
                  <NavItem 
                    icon={<User className="w-5 h-5" />} 
                    label="My Profile" 
                    href="/courses/bellair/profile" 
                  />
                  <NavItem 
                    icon={<MessageSquare className="w-5 h-5" />} 
                    label="Feedback" 
                    href="/courses/bellair/feedback" 
                  />
                  <li>
                    <motion.button 
                      onClick={handleSignOut}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 text-white/90 hover:text-white transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </motion.button>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Navigation Item Component
function NavItem({ 
  icon, 
  label, 
  href
}: { 
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <li>
      <motion.div whileHover={{ x: 5 }}>
        <Link 
          href={href}
          className="flex items-center gap-4 text-white/90 hover:text-white transition-colors"
        >
          {icon}
          <span>{label}</span>
        </Link>
      </motion.div>
    </li>
  )
} 