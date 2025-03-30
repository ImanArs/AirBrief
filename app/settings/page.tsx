"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Trash2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const router = useRouter()
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

  const resetAllData = () => {
    // Clear all localStorage data
    localStorage.removeItem("knownPlanes")
    localStorage.removeItem("favoriteDestinations")

    setIsResetDialogOpen(false)
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your app preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <Card className="bg-gray-800 border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto"
            onClick={() => router.push("/settings/privacy-policy")}
          >
            <span className="font-medium">Privacy Policy</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto"
            onClick={() => router.push("/settings/terms-of-use")}
          >
            <span className="font-medium">Terms of Use</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
        </Card>

        <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full mt-8 bg-red-900 hover:bg-red-800">
              <Trash2 className="mr-2 h-4 w-4" />
              Reset All Data
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle>Reset All Data</DialogTitle>
              <DialogDescription className="text-gray-400">
                This will delete all your saved data including known planes and favorite destinations. This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={resetAllData} className="bg-red-900 hover:bg-red-800">
                Reset Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}

