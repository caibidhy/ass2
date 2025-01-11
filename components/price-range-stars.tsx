'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

interface PriceRangeStarsProps {
  onChange?: (value: number) => void
  value: number
}

export function PriceRangeStars({ onChange, value }: PriceRangeStarsProps) {
  const [hoverStars, setHoverStars] = useState<number>(0)

  const handleClick = (newValue: number) => {
    const finalValue = newValue === value ? 0 : newValue
    onChange?.(finalValue)
  }

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button 
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoverStars(star)}
          onMouseLeave={() => setHoverStars(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star 
            className={`w-5 h-5 ${
              (hoverStars ? star <= hoverStars : star <= value)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

