import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center bg-black">
      {/* Mobile Container */}
      <main className="w-full max-w-[430px] h-screen relative flex flex-col items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/golf-background.jpg"
            alt="Golf Course Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center text-white w-full h-full">
          {/* Logo Section */}
          <div className="mt-20 self-center">
            <Image
              src="/images/bellair-logo.png"
              alt="Bellair Golf Park"
              width={140}
              height={140}
            />
          </div>

          {/* Bottom Section with Welcome Text and Buttons */}
          <div className="absolute bottom-8 w-full px-6">
            {/* Welcome Text */}
            <div className="text-left mb-8">
              <h1 className="text-3xl font-semibold mb-3">Welcome to Bellair</h1>
              <p className="text-sm opacity-90 leading-relaxed">
                Sign up is easy and you can even use your existing Google account, or we can set you up with an account on our system in seconds
              </p>
            </div>

            {/* Buttons Container */}
            <div className="flex gap-4 w-full">
              <Link href="/courses/bellair/signup" className="flex-1">
                <button className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm">
                  Sign Up
                </button>
              </Link>
              <Link href="/courses/bellair/signin" className="flex-1">
                <button className="w-full py-3.5 rounded-full bg-[#00A6B2] text-white font-semibold text-sm">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
