'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { PriceRangeStars } from './price-range-stars'

interface SidebarProps {
  onRatingChange: (rating: number) => void
  selectedRating: number
  onCategoryChange: (category: string, checked: boolean) => void
  selectedCategories: Set<string>
}

export function Sidebar({ 
  onRatingChange, 
  selectedRating, 
  onCategoryChange,
  selectedCategories 
}: SidebarProps) {
  return (
    <div className="w-full lg:w-72 p-4 lg:p-8">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Attraction Type</h3>
          <div className="space-y-2">
            <div className="flex items-center group hover:bg-gray-100 rounded-md p-1 transition-colors">
              <Checkbox 
                id="food" 
                checked={selectedCategories.has('food')}
                onCheckedChange={(checked) => onCategoryChange('food', checked === true)}
                className="group-hover:border-gray-400"
              />
              <label htmlFor="food" className="ml-2 text-sm group-hover:text-gray-900">Food</label>
            </div>
            <div className="flex items-center group hover:bg-gray-100 rounded-md p-1 transition-colors">
              <Checkbox 
                id="scenery" 
                checked={selectedCategories.has('scenery')}
                onCheckedChange={(checked) => onCategoryChange('scenery', checked === true)}
                className="group-hover:border-gray-400"
              />
              <label htmlFor="scenery" className="ml-2 text-sm group-hover:text-gray-900">Scenery</label>
            </div>
            <div className="flex items-center group hover:bg-gray-100 rounded-md p-1 transition-colors">
              <Checkbox 
                id="hotels" 
                checked={selectedCategories.has('hotels')}
                onCheckedChange={(checked) => onCategoryChange('hotels', checked === true)}
                className="group-hover:border-gray-400"
              />
              <label htmlFor="hotels" className="ml-2 text-sm group-hover:text-gray-900">Hotels</label>
            </div>
            <div className="flex items-center group hover:bg-gray-100 rounded-md p-1 transition-colors">
              <Checkbox 
                id="shopping" 
                checked={selectedCategories.has('shopping')}
                onCheckedChange={(checked) => onCategoryChange('shopping', checked === true)}
                className="group-hover:border-gray-400"
              />
              <label htmlFor="shopping" className="ml-2 text-sm group-hover:text-gray-900">Shopping</label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Rating</h3>
          <PriceRangeStars 
            onChange={onRatingChange}
            value={selectedRating}
          />
          <div className="mt-2 text-sm text-gray-600">
            {selectedRating > 0 && `${selectedRating} star${selectedRating > 1 ? 's' : ''} and above`}
          </div>
        </div>
      </div>
    </div>
  )
}



