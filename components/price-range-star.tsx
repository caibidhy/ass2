import { Star } from 'lucide-react'

interface PriceRangeStarProps {
  selected: boolean
  onClick: () => void
}

export function PriceRangeStar({ selected, onClick }: PriceRangeStarProps) {
  return (
    <button 
      onClick={onClick}
      className="focus:outline-none"
    >
      <Star 
        className={`w-5 h-5 ${
          selected ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    </button>
  )
}

