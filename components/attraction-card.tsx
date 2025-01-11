'use client'

import { Star } from 'lucide-react'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'
import { AttractionDetailModal } from './attraction-detail-modal'

interface AttractionCardProps {
  name: string
  rating: number
  reviews: number
  location: string
  imageUrl: string
  category: string
  description?: string
  operatingHours?: string
  onImageClick: () => void
  duration?: string;
  website?: string;
  phone?: string;
}

const categoryLabels: Record<string, { label: string, className: string }> = {
  food: { label: "Food", className: "bg-orange-100 text-orange-800" },
  scenery: { label: "Scenery", className: "bg-green-100 text-green-800" },
  hotels: { label: "Hotels", className: "bg-blue-100 text-blue-800" },
  shopping: { label: "Shopping", className: "bg-purple-100 text-purple-800" }
}

export function AttractionCard({ 
  name, 
  rating, 
  reviews, 
  location, 
  imageUrl, 
  category,
  description,
  operatingHours,
  onImageClick,
  duration,
  website,
  phone
}: AttractionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const categoryInfo = categoryLabels[category]
  const formattedReviews = reviews >= 9999 ? '9,999+' : reviews.toLocaleString()

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsImageModalOpen(true)
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <button 
            onClick={handleImageClick}
            className="relative w-full h-48 bg-gray-100 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-inset"
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </button>
        </div>
        <button 
          onClick={handleContentClick}
          className="p-5 w-full text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{name}</h3>
            <Badge variant="secondary" className={categoryInfo.className}>
              {categoryInfo.label}
            </Badge>
          </div>
          
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{formattedReviews} reviews</span>
          </div>
          <div className="text-sm text-gray-600">{location}</div>
        </button>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center cursor-pointer transition-opacity duration-300"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative w-[90vw] h-[80vh] max-w-5xl">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <AttractionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        rating={rating}
        reviews={reviews}
        location={location}
        imageUrl={imageUrl}
        category={category}
        description={description}
        operatingHours={operatingHours}
        duration={duration}
        website={website}
        phone={phone}
      />
    </>
  )
}

