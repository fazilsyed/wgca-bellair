'use client'
import { useState } from 'react'
import { Menu, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'
import NavigationGrid from '@/components/NavigationGrid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

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
      transition: { duration: 0.5 }
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
        <main className="pb-20">
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-between items-center p-6"
          >
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Image
                  src="/images/isabel-round-avatar.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
              <span className="text-lg">Hello Isabel 👋</span>
            </div>
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </motion.div>

          {/* Welcome Card */}
          <motion.div 
            variants={itemVariants}
            className="mx-6 p-6 bg-[#00A6B2] rounded-xl text-white"
          >
            <Image
              src="/images/bellair-logo.png"
              alt="Bellair Golf Park"
              width={100}
              height={100}
              className="mb-4 brightness-0 invert"
            />
            <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
            <p className="opacity-90">
              Enjoy your visit with us and most of our services are available below.
            </p>
          </motion.div>

          {/* Navigation Grid */}
          <motion.div variants={itemVariants}>
            <NavigationGrid />
          </motion.div>

          {/* Food and Drinks Section */}
          <motion.div 
            variants={itemVariants}
            className="px-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Food and Drinks</h2>
              <Link 
                href="/menu" 
                className="text-[#00A6B2] flex items-center"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FoodItem
                image="/images/food-burger.png"
                title="Hamburger"
                subtitle="(with Fries)"
                price="3.95"
              />
              <FoodItem
                image="/images/drink-soda.png"
                title="Coca Cola"
                subtitle="(can)"
                price="3.95"
              />
            </div>
          </motion.div>

          {/* Pro Shop Items Section */}
          <motion.div 
            variants={itemVariants}
            className="px-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pro Shop Items</h2>
              <Link 
                href="/pro-shop" 
                className="text-[#00A6B2] flex items-center"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ShopItem
                image="/images/pro-golf-balls.png"
                title="Bellair Golf Balls"
                subtitle="(12 pack)"
                price="35.95"
              />
              <ShopItem
                image="/images/pro-golf-tees.png"
                title="Natural Wood Golf Tees"
                subtitle="(25 pack)"
                price="12.95"
              />
            </div>
          </motion.div>
        </main>

        <BottomNavigation />
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>
    </motion.div>
  )
}

// Component for Food Items
function FoodItem({ image, title, subtitle, price }: { 
  image: string; title: string; subtitle: string; price: string 
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg overflow-hidden bg-gray-50"
    >
      <Image src={image} alt={title} width={200} height={200} className="w-full object-cover" />
      <div className="p-3">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="mt-2">${price}</p>
      </div>
    </motion.div>
  )
}

// Component for Shop Items
function ShopItem({ image, title, subtitle, price }: {
  image: string; title: string; subtitle: string; price: string
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg overflow-hidden bg-gray-50"
    >
      <Image src={image} alt={title} width={200} height={200} className="w-full object-cover" />
      <div className="p-3">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="mt-2">${price}</p>
      </div>
    </motion.div>
  )
} 