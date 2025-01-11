'use client'

import { Search } from 'lucide-react'
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AttractionCard } from "@/components/attraction-card"
import { Montserrat } from 'next/font/google'
import { useState } from 'react'
import type { Attraction } from '@/types/attraction'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-display'
})

const initialAttractionsData: Attraction[] = [
  {
    name: "DoubleTree Resort By Hilton Hotel Penang",
    rating: 4,
    reviews: 1441,
    location: "56 Jalan Low Yat, Batu Ferringhi, Penang Island 11100 Malaysia",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DoubleTree%20Resort%20By%20Hilton%20Hotel%20Penang.jpg-pWMzpAqqLo3o2zdZbb6tnjotc6usMw.jpeg",
    category: "hotels",
    description: "DoubleTree Resort by Hilton Hotel Penang, located in Tanjung Bungah near Miami Beach, offers stunning views of the Straits of Malacca. The hotel is home to Malaysia's first teddy bear-themed museum, the TeddyVille Museum, making it a perfect destination for families. Additionally, the resort provides complimentary shuttle services, ensuring convenient access to key attractions such as George Town, a UNESCO World Heritage Site, Gurney Drive, and Batu Ferringhi for shopping, entertainment, and nightlife.",
    operatingHours: "Open 24 hours",
    website: "https://www.hilton.com/en/hotels/penmbdi-doubletree-resort-penang/"
  },
  {
    name: "Gurney Plaza",
    rating: 4,
    reviews: 5812,
    location: "170 Gurney Drive, George Town, Penang Island 10250 Malaysia",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hVDV784tqqmaApn7YizZ7YaaeWxsMi.png",  // Update this line
    category: "shopping",
    description: "Gurney Plaza, located in Gurney Drive, George Town, Penang, is a nine-story modern shopping mall that houses over 300 stores, including numerous internationally renowned brands. Since its opening in 2001, Gurney Plaza has become one of Penang's major landmarks, cherished by both locals and visitors alike. Additionally, the mall features a state-of-the-art cinema with 12 screening halls, offering a diverse range of entertainment options.",
    operatingHours: "10:00 AM - 10:00 PM daily",
    duration: "3-4 hours"
  },
  {
    name: "Jin Cofe",
    rating: 5,
    reviews: 7890,
    location: "110, Jalan Siam, George Town, 10400 George Town, Pulau Pinang",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jincoffe-uVlnXn1UAsKpTRxagbbv3nvfAZD0y9.jpeg",
    category: "food",
    description: "Jin Cafe, located at 110 Siam Road, George Town, Penang, sits at the intersection of Siam Road and Anson Road. Known for its cozy ambiance and high-quality coffee, the café is a favorite among both locals and tourists. Additionally, Jin Cafe's Char Koay Teow is highly acclaimed, with many food enthusiasts considering it a must-try delicacy in Penang.",
    operatingHours: "7:00 AM - 2:30 PM, closed on Sundays"
  },
  {
    name: "Khoon Klang Bak Kut Teh",
    rating: 5,
    reviews: 9999,
    location: "320, Jln Perak, Jelutong, 11600 George Town, Pulau Pinang",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%82%89%E9%AA%A8%E8%8C%B6.jpg-OTJz3sHSFDWDoXAO9nGmO3MdIc3FJf.jpeg",
    category: "food",
    description: "Khoon Klang Bak Kut Teh is renowned for its rich herbal broth and distinctive dry Bak Kut Teh, the soup is crafted with a variety of traditional Chinese herbs, offering a unique and flavorful experience that delights diners. In addition, the restaurant also serves Thai dishes, such as Tom Yum Soup, providing a diverse menu selection.",
    operatingHours: "11:00 AM - 9:30 PM, closed on Fridays",
    phone: "+60 16-482 1359"
  },
  {
    name: "OO White Coffee",
    rating: 5,
    reviews: 9999,
    location: "262-264, Lebuh Carnarvon, Georgetown, 10100 George Town, Penang",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oo.jpg-qxBIZwznUd3GgcFYmKVS3JmUSzisN0.jpeg",
    category: "food",
    description: "OO White Coffee is a highly popular café in Penang, renowned for its aromatic white coffee and diverse selection of local delicacies. One of its signature dishes is Nasi Lemak, a favorite among diners. This classic Malaysian dish is meticulously prepared, featuring fragrant coconut milk rice paired with a variety of flavorful sides, such as fried chicken or curry chicken, delivering a unique taste that leaves a lasting impression.",
    operatingHours: "6:30 AM - 4:30 PM, closed on Wednesdays",
    phone: "+60 17-477 3521"
  },
  {
    name: "PARKROYAL Penang Resort",
    rating: 5,
    reviews: 4809,
    location: "Batu Ferringhi Beach, Batu Ferringhi, Penang Island 11100 Malaysia",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PARKROYAL%20Penang%20Resort.jpg-3elslfNdQx01aODPZMCD2tXWl2qt0I.jpeg",
    category: "hotels",
    description: "PARKROYAL Penang Resort, located on Batu Ferringhi Beach, is renowned for its lush tropical garden setting and convenient beachfront access. The resort features multiple pools, including a children's water park, offering entertainment options for guests of all ages. In addition, PARKROYAL provides a variety of dining options to cater to diverse tastes, ensuring a delightful culinary experience.",
    operatingHours: "Open 24 hours",
    website: "https://www.panpacific.com/en/hotels-and-resorts/pr-penang/offers.html"
  },
  {
    name: "Penang Hill",
    rating: 4,
    reviews: 3451,
    location: "11500 Bukit Bendera, Pulau Pinang",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/penanghill.jpg-ZPJ0dQDhR8yhQLFUVCYAOjetD7s9ki.jpeg",
    category: "scenery",
    description: "Penang Hill, also known as Bukit Bendera, is the highest peak in Penang, standing approximately 833 meters above sea level. Renowned for its cool climate and breathtaking panoramic views, it offers the best vantage point for overlooking the entirety of Penang. Visitors can either take a funicular train or hike to the summit, enjoying the diverse flora and fauna along the way. At the top, you'll find restaurants, cafés, and historic buildings, such as colonial-era bungalows.",
    operatingHours: "Open all day",
    duration: "4-5 hours"
  },
  {
    name: "Penang Street Art",
    rating: 4,
    reviews: 5888,
    location: "316, Beach St, Georgetown, 10300 George Town, Penang",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artstreet.jpg-U3ah2uygHW9ikC3t4CfPMDikWWDPgy.jpeg",
    category: "scenery",
    description: "George Town in Penang is renowned for its vibrant street art, attracting numerous visitors eager to explore its charm. These murals and wrought-iron sculptures are scattered across the city's streets and alleys, vividly depicting local history, culture, and daily life. Among the most famous works is Kids on Bicycle by Lithuanian artist Ernest Zacharevic. Additionally, local artist Louis Gan's Brother and Sister on Swing is another highly popular piece.",
    operatingHours: "Open 24 hours",
    duration: "4-5 hours"
  },
  {
    name: "Queensbay Mall",
    rating: 5,
    reviews: 7980,
    location: "100, Persiaran Bayan Indah, 11900 Bayan Lepas, Pulau Pinang",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qb.jpg-zkuQvGMpYtg4zdwxifEy60d4wCIkmb.jpeg",
    category: "shopping",
    description: "Queensbay Mall, located in Bayan Lepas, Penang, is the largest shopping mall in the state. Spanning 2.5 million square feet and featuring five floors, it houses over 400 stores, including numerous internationally renowned brands. The top floor is home to GSC Cinemas, offering a comprehensive shopping and entertainment experience. Additionally, the mall boasts a variety of restaurants and cafés to cater to diverse tastes.",
    operatingHours: "10:30 AM - 10:30 PM daily",
    duration: "3-4 hours"
  }
].sort((a, b) => a.name.localeCompare(b.name))

export default function Page() {
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [attractions] = useState<Attraction[]>(initialAttractionsData)


  const filteredAttractions = attractions.filter(attraction => {
    const matchesRating = selectedRating === 0 || attraction.rating >= selectedRating
    const matchesSearch = searchQuery === "" || 
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(attraction.category)
    return matchesRating && matchesSearch && matchesCategory
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = new Set(selectedCategories)
    if (checked) {
      newCategories.add(category)
    } else {
      newCategories.delete(category)
    }
    setSelectedCategories(newCategories)
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${montserrat.variable}`}>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-[1400px]">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 font-display bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Things to Do in Penang Island
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover the best activities in Penang Island with our attractions guide.
          </p>
        </div>

        <div className="relative mb-8 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search attractions"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
              <div className="py-4">
                <Sidebar 
                  onRatingChange={setSelectedRating} 
                  selectedRating={selectedRating}
                  onCategoryChange={handleCategoryChange}
                  selectedCategories={selectedCategories}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar 
              onRatingChange={setSelectedRating} 
              selectedRating={selectedRating}
              onCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {filteredAttractions.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                No attractions found matching your criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAttractions.map((attraction, i) => {
                  return (
                    <AttractionCard 
                      key={i} 
                      {...attraction} 
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}









