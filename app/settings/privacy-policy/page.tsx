"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className="container px-4 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Button variant="ghost" className="flex items-center text-gray-400" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <p>Last updated: March 30, 2024</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to AirBrief. We respect your privacy and are committed to protecting your personal data. This
            Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            AirBrief is designed to function without collecting personal information. We use local storage on your
            device to save your preferences, such as which aircraft you've marked as "known" and which destinations
            you've saved as favorites. This data is stored only on your device and is not transmitted to our servers.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            The information stored locally on your device is used solely to enhance your experience with the app by
            remembering your preferences and interactions. We do not use this information for any other purpose.
          </p>

          <h2>4. Data Security</h2>
          <p>
            Since all user data is stored locally on your device, the security of this information is maintained by your
            device's security features. We do not have access to this data.
          </p>

          <h2>5. Your Data Rights</h2>
          <p>
            You have complete control over the data stored by AirBrief. You can reset all stored data at any time
            through the Settings page.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@airbrief.com.</p>
        </div>
      </motion.div>
    </div>
  )
}

