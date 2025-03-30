"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { planesData } from "@/data/planes-data";
import { destinationsData } from "@/data/destinations-data";

export default function Home() {
  const [planeSlidesIndex, setPlaneSlidesIndex] = useState(0);
  const [destinationSlidesIndex, setDestinationSlidesIndex] = useState(0);

  // Get 3 random planes for the carousel
  const [randomPlanes, setRandomPlanes] = useState<typeof planesData>([]);
  const [randomDestinations, setRandomDestinations] = useState<
    typeof destinationsData
  >([]);

  useEffect(() => {
    // Get random planes and destinations on initial load
    const getRandomItems = (array: any[], count: number) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setRandomPlanes(getRandomItems(planesData, 3));
    setRandomDestinations(getRandomItems(destinationsData, 3));
  }, []);

  const nextPlaneSlide = () => {
    setPlaneSlidesIndex((prev) =>
      prev === randomPlanes.length ? 0 : prev + 1
    );
  };

  const prevPlaneSlide = () => {
    setPlaneSlidesIndex((prev) =>
      prev === 0 ? randomPlanes.length : prev - 1
    );
  };

  const nextDestinationSlide = () => {
    setDestinationSlidesIndex((prev) =>
      prev === randomDestinations.length ? 0 : prev + 1
    );
  };

  const prevDestinationSlide = () => {
    setDestinationSlidesIndex((prev) =>
      prev === 0 ? randomDestinations.length : prev - 1
    );
  };

  return (
    <div className="container px-4 py-6 space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">AirBrief</h1>
          <p className="text-gray-400">Your aviation and travel companion</p>
        </div>
        <motion.div
          initial={{ rotate: 0, scale: 1, x: 0, y: 0 }}
          animate={{ rotate: -45, scale: 0, x: 120, y: -120 }}
          transition={{ duration: 10.5 }}
          className=""
        >
          <Plane className="rotate-[45deg]" />
        </motion.div>
      </motion.div>

      {/* Planes Section */}
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Did you know?</h2>
        <p className="text-gray-400">
          Fascinating facts about famous airplanes
        </p>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${planeSlidesIndex * 90}%)` }}
            >
              {randomPlanes.map((plane, index) => (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={plane.id}
                  className="min-w-[90%] pr-4"
                >
                  <Card className="overflow-hidden bg-gray-800 border-gray-700">
                    <div className="relative h-48">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${plane.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            plane.known ? "bg-green-900/70" : "bg-red-900/70"
                          }`}
                        >
                          {plane.known ? "I know this" : "Did not know"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{plane.title}</h3>
                      <p className="text-gray-400 line-clamp-3">
                        {plane.description}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-red-900 text-red-500 hover:bg-red-900/20"
                      >
                        <Link href={`/planes/${plane.id}`}>Read</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* View more card */}
              <div className="min-w-[90%] pr-4">
                <Card className="overflow-hidden h-full bg-gray-800 border-gray-700 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <h3 className="font-bold mb-4 text-xl">
                      Discover more aircraft
                    </h3>
                    <Button
                      variant="default"
                      className="bg-red-900 hover:bg-red-800"
                    >
                      <Link href="/planes" className="flex items-center">
                        View all <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full z-10 bg-gray-800/80 border-gray-700"
            onClick={prevPlaneSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full z-10 bg-gray-800/80 border-gray-700"
            onClick={nextPlaneSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.section>

      {/* Destinations Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Paradise Destinations</h2>
        <p className="text-gray-400">
          Discover breathtaking places around the world
        </p>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${destinationSlidesIndex * 90}%)`,
              }}
            >
              {randomDestinations.map((destination, index) => (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={destination.id}
                  className="min-w-[90%] pr-4"
                >
                  <Card className="overflow-hidden bg-gray-800 border-gray-700">
                    <div className="relative h-48">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${destination.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{destination.title}</h3>
                      <p className="text-gray-400 line-clamp-3">
                        {destination.description}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-red-900 text-red-500 hover:bg-red-900/20"
                      >
                        <Link href={`/travel/destinations/${destination.id}`}>
                          Read
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* View more card */}
              <div className="min-w-[90%] pr-4">
                <Card className="overflow-hidden h-full bg-gray-800 border-gray-700 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <h3 className="font-bold mb-4 text-xl">
                      Explore more destinations
                    </h3>
                    <Button
                      variant="default"
                      className="bg-red-900 hover:bg-red-800"
                    >
                      <Link href="/travel" className="flex items-center">
                        View all <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-gray-800/80 border-gray-700"
            onClick={prevDestinationSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-gray-800/80 border-gray-700"
            onClick={nextDestinationSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
