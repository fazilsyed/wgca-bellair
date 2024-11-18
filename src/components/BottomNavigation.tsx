'use client'
import { Home, Utensils, Store, Bot, ClipboardList, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 w-full max-w-[430px] bg-[#00A6B2] px-6 py-4">
      <div className="flex justify-between items-center">
        <NavItem 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          href="/home"
          isActive={pathname === '/home'}
        />
        <NavItem 
          icon={<Utensils className="w-6 h-6" />} 
          label="Menu" 
          href="/menu"
          isActive={pathname === '/menu'}
        />
        <NavItem 
          icon={<Store className="w-6 h-6" />} 
          label="Pro Shop" 
          href="/pro-shop"
          isActive={pathname === '/pro-shop'}
        />
        <NavItem 
          icon={<Bot className="w-6 h-6" />} 
          label="AI Buddy" 
          href="/ai-buddy"
          isActive={pathname === '/ai-buddy'}
        />
        <NavItem 
          icon={<ClipboardList className="w-6 h-6" />} 
          label="Scorecard" 
          href="/scorecard"
          isActive={pathname === '/scorecard'}
        />
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive?: boolean
}

function NavItem({ icon, label, href, isActive }: NavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center">
      <div className={`mb-1 ${isActive ? 'text-white' : 'text-white/80'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'text-white' : 'text-white/80'}`}>
        {label}
      </span>
    </Link>
  )
} 