"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, MapPin, Calendar, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { destinationsData } from "@/data/destinations-data"

export default function DestinationPage() {
  const params = useParams()
  const router = useRouter()
  const destinationId = params.id as string

  const [destination, setDestination] = useState<(typeof destinationsData)[0] | undefined>(undefined)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Find the destination data
    const foundDestination = destinationsData.find((d) => d.id === destinationId)
    if (foundDestination) {
      setDestination(foundDestination)
    } else {
      router.push("/travel")
    }

    // Check if this destination is marked as favorite
    const storedFavorites = localStorage.getItem("favoriteDestinations")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.includes(destinationId))
    }
  }, [destinationId, router])

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favoriteDestinations")
    let favorites: string[] = []

    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites)
    }

    if (isFavorite) {
      favorites = favorites.filter((id) => id !== destinationId)
    } else {
      favorites.push(destinationId)
    }

    localStorage.setItem("favoriteDestinations", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  if (!destination) {
    return (
      <div className="container px-4 py-6 flex justify-center items-center h-[80vh]">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Button variant="ghost" className="flex items-center text-gray-400" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="relative h-56 rounded-lg overflow-hidden mb-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${destination.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-2xl font-bold">{destination.title}</h1>
          </div>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={toggleFavorite}>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{destination.location}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Best time: {destination.bestTimeToVisit}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Globe className="h-4 w-4 mr-1" />
            <span>{destination.continent}</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">{destination.description}</p>
          <h2 className="text-xl font-semibold mt-6 mb-3">What to See</h2>
          <ul className="space-y-2 text-gray-300">
            {destination.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-3">Travel Tips</h2>
          <ul className="space-y-2 text-gray-300">
            {destination.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-3">Local Cuisine</h2>
          <p className="text-gray-300 mb-4">{destination.cuisine}</p>
        </div>
      </motion.div>
    </div>
  )
}

