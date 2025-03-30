"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { planesData } from "@/data/planes-data";

export default function PlanesPage() {
  const [knownPlanes, setKnownPlanes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load known planes from localStorage
    const storedKnownPlanes = localStorage.getItem("knownPlanes");
    if (storedKnownPlanes) {
      setKnownPlanes(JSON.parse(storedKnownPlanes));
    }
  }, []);

  return (
    <div className="container px-4 py-6 space-y-6">
      <motion.div
        initial={{ x: 1020 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <h1 className="text-2xl font-bold mb-2">Aircraft Collection</h1>
        <p className="text-gray-400">
          Discover fascinating facts about famous airplanes
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {planesData.map((plane, index) => (
          <motion.div
            key={plane.id}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            transition={{ duration: 0.3, delay: index * 0.1 }}
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
                      knownPlanes[plane.id]
                        ? "bg-green-900/70"
                        : "bg-red-900/70"
                    }`}
                  >
                    {knownPlanes[plane.id] ? "I know this" : "Did not know"}
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
      </div>
    </div>
  );
}
