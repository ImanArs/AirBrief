"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { destinationsData } from "@/data/destinations-data";

export default function TravelPage() {
  const [activeTab, setActiveTab] = useState("destinations");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favoriteDestinations");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    let newFavorites: string[];

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }

    setFavorites(newFavorites);
    localStorage.setItem("favoriteDestinations", JSON.stringify(newFavorites));
  };

  const favoriteDestinations = destinationsData.filter((dest) =>
    favorites.includes(dest.id)
  );

  return (
    <div className="container px-4 py-6 space-y-6">
      <motion.div
        initial={{ x: 1020 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <h1 className="text-2xl font-bold mb-2">Travel Destinations</h1>
        <p className="text-gray-400">
          Discover paradise locations around the world
        </p>
      </motion.div>

      <Tabs
        defaultValue="destinations"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <motion.div
          initial={{ x: -1020 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="destinations"
              className="data-[state=active]:bg-red-900"
            >
              Destinations
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-red-900"
            >
              Favorites
            </TabsTrigger>
          </TabsList>
        </motion.div>
        <TabsContent value="destinations" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            {destinationsData.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-gray-800 border-gray-700">
                  <div className="relative h-48">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${destination.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => toggleFavorite(destination.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(destination.id)
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                    </Button>
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
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {favoriteDestinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                You haven't added any favorites yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {favoriteDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.5 }}
                >
                  <Card className="overflow-hidden bg-gray-800 border-gray-700">
                    <div className="relative h-48">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${destination.image})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => toggleFavorite(destination.id)}
                      >
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      </Button>
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
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
