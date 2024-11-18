'use client'
import Link from 'next/link'
import { Clock, Target, Map, BookOpen, Calendar, HelpCircle, Store, UserCircle } from 'lucide-react'

export default function NavigationGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      <Link 
        href="/tee-times"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <Clock className="w-6 h-6" />
        </div>
        <span className="text-sm">Tee Times</span>
      </Link>
      
      <Link 
        href="/range"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <Target className="w-6 h-6" />
        </div>
        <span className="text-sm">Range</span>
      </Link>
      
      <Link 
        href="/course-map"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <Map className="w-6 h-6" />
        </div>
        <span className="text-sm">Course Map</span>
      </Link>
      
      <Link 
        href="/lessons"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <span className="text-sm">Lessons</span>
      </Link>

      <Link 
        href="/events"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <Calendar className="w-6 h-6" />
        </div>
        <span className="text-sm">Events</span>
      </Link>
      
      <Link 
        href="/help"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <HelpCircle className="w-6 h-6" />
        </div>
        <span className="text-sm">Help</span>
      </Link>
      
      <Link 
        href="/help?tab=contact"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <Store className="w-6 h-6" />
        </div>
        <span className="text-sm">Contact</span>
      </Link>
      
      <Link 
        href="/profile"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-2">
          <UserCircle className="w-6 h-6" />
        </div>
        <span className="text-sm">My Profile</span>
      </Link>
    </div>
  )
} 