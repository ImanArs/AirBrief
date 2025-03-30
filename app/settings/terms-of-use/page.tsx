"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfUsePage() {
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
        <h1 className="text-2xl font-bold mb-6">Terms of Use</h1>

        <div className="prose prose-invert max-w-none">
          <p>Last updated: March 30, 2024</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using AirBrief, you agree to be bound by these Terms of Use. If you do not agree to these
            terms, please do not use the application.
          </p>

          <h2>2. Use of the Application</h2>
          <p>
            AirBrief is provided for informational and entertainment purposes only. The information presented about
            aircraft and travel destinations is for general knowledge and may not be completely accurate or up-to-date.
          </p>

          <h2>3. User Content</h2>
          <p>
            AirBrief does not allow users to submit content to the application. All content is provided by the
            application developers.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content included in AirBrief, including text, graphics, logos, images, and software, is the property of
            AirBrief or its content suppliers and is protected by international copyright laws.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            AirBrief and its developers shall not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages resulting from your access to or use of, or inability to access or use,
            the application or any content provided on or through the application.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. We will notify users of any changes by
            posting the new Terms of Use on this page.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
            AirBrief operates, without regard to its conflict of law provisions.
          </p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about these Terms of Use, please contact us at support@airbrief.com.</p>
        </div>
      </motion.div>
    </div>
  )
}

