import { Search, User } from 'lucide-react'
import Link from "next/link"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-display'
})

export function Header() {
  return (
    <header className={`border-b ${montserrat.variable}`}>
      <div className="container mx-auto px-8 h-16 flex items-center justify-between max-w-[1400px]">
        <Link 
          href="/" 
          className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent font-display tracking-tight hover:scale-105 transition-transform duration-300 ease-in-out"
          style={{
            textShadow: '0 0 1px rgba(0,0,0,0.1)',
            WebkitTextStroke: '0.2px rgba(0,0,0,0.1)'
          }}
        >
          TravellerWeb
        </Link>
        <div className="flex items-center space-x-6 sm:space-x-8"> {/* Increased spacing */}
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}



