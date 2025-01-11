'use client'

import { X, Share2, Clock, MapPin, Globe, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AttractionDetailModalProps {
  name: string
  rating: number
  reviews: number
  location: string
  imageUrl: string
  category: string
  description?: string
  operatingHours?: string
  duration?: string
  website?: string
  phone?: string
  isOpen: boolean
  onClose: () => void
}

const categoryLabels: Record<string, { label: string, className: string }> = {
  food: { label: "Food", className: "bg-orange-100 text-orange-800" },
  scenery: { label: "Scenery", className: "bg-green-100 text-green-800" },
  hotels: { label: "Hotels", className: "bg-blue-100 text-blue-800" },
  shopping: { label: "Shopping", className: "bg-purple-100 text-purple-800" }
}

export function AttractionDetailModal({
  name,
  rating,
  reviews,
  location,
  imageUrl,
  category,
  description,
  operatingHours,
  duration,
  website,
  phone,
  isOpen,
  onClose
}: AttractionDetailModalProps) {
  if (!isOpen) return null

  const categoryInfo = categoryLabels[category]

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex"
        onClick={e => e.stopPropagation()}
      >
        {/* Left Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{reviews} views</span>
                <Badge variant="secondary" className={categoryInfo.className}>
                  {categoryInfo.label}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{operatingHours || "Hours not available"}</span>
            </div>
            
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-1" />
              <span>{location}</span>
            </div>


            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-gray-600">
                {description || `${name} is a popular destination in Penang, offering visitors
                a unique experience. Visit us to discover more about what makes this place special.`}
              </p>
            </div>

            {category === 'food' && phone && (
  <div>
    <h3 className="font-semibold text-lg mb-2">Contact</h3>
    <div className="flex items-center gap-2 text-gray-600">
      <Phone className="w-4 h-4" />
      <span>{phone}</span>
    </div>
  </div>
)}

            {category === 'hotels' && website && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Website</h3>
                <a 
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  Official Website
                </a>
              </div>
            )}

            {duration && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-gray-600">Suggested duration: {duration}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-[45%] relative bg-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}



