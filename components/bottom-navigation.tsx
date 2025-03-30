"use client"

import { Home, Plane, MapPin, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Plane, label: "Planes", href: "/planes" },
    { icon: MapPin, label: "Travel", href: "/travel" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full relative"
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="navigation-pill"
                    className="absolute inset-0 bg-red-900 rounded-full -m-1"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? "text-white" : "text-gray-400"}`} />
              </div>
              <span className={`text-xs mt-1 ${isActive ? "text-white" : "text-gray-400"}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

