"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { planesData } from "@/data/planes-data";

export default function PlanePage() {
  const params = useParams();
  const router = useRouter();
  const planeId = params.id as string;

  const [plane, setPlane] = useState<(typeof planesData)[0] | undefined>(
    undefined
  );
  const [isKnown, setIsKnown] = useState(false);

  useEffect(() => {
    // Find the plane data
    const foundPlane = planesData.find((p) => p.id === planeId);
    if (foundPlane) {
      setPlane(foundPlane);
    } else {
      router.push("/planes");
    }

    // Check if this plane is marked as known
    const storedKnownPlanes = localStorage.getItem("knownPlanes");
    if (storedKnownPlanes) {
      const knownPlanes = JSON.parse(storedKnownPlanes);
      setIsKnown(!!knownPlanes[planeId]);
    }
  }, [planeId, router]);

  const markAsKnown = () => {
    const storedKnownPlanes = localStorage.getItem("knownPlanes");
    let knownPlanes: Record<string, boolean> = {};

    if (storedKnownPlanes) {
      knownPlanes = JSON.parse(storedKnownPlanes);
    }

    knownPlanes[planeId] = true;
    localStorage.setItem("knownPlanes", JSON.stringify(knownPlanes));
    setIsKnown(true);
  };

  if (!plane) {
    return (
      <div className="container px-4 py-6 flex justify-center items-center h-[80vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <motion.div
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          className="flex items-center text-gray-400"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>

      <motion.div
        initial={{ y: 220 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-56 rounded-lg overflow-hidden mb-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${plane.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-2xl font-bold">{plane.title}</h1>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">{plane.description}</p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            Technical Specifications
          </h2>
          <ul className="space-y-2 text-gray-300">
            {plane.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            Historical Significance
          </h2>
          <p className="text-gray-300 mb-4">{plane.history}</p>
          <h2 className="text-xl font-semibold mt-6 mb-3">Fun Facts</h2>
          <ul className="space-y-2 text-gray-300">
            {plane.funFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="default"
            className={`${
              isKnown
                ? "bg-green-800 hover:bg-green-700"
                : "bg-red-900 hover:bg-red-800"
            }`}
            onClick={markAsKnown}
            disabled={isKnown}
          >
            {isKnown ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Learned
              </>
            ) : (
              "Mark as Learned"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
