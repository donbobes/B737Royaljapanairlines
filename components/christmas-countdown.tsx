"use client"

import { useEffect, useState } from "react"
import { Gift } from "lucide-react"

export function ChristmasCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const endDate = new Date("2026-01-12T23:59:59") // January 12, 2026

      const difference = endDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsActive(false)
        return null
      }

      setIsActive(true)

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    setTimeRemaining(calculateTimeRemaining())

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isActive || !timeRemaining) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <Gift className="w-5 h-5 flex-shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm font-semibold whitespace-nowrap">Christmas Sale 20% OFF</span>
          <div className="flex items-center gap-2 text-sm font-mono">
            <div className="bg-white/20 px-2 py-1 rounded">
              <span className="font-bold">{timeRemaining.days}d</span>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded">
              <span className="font-bold">{String(timeRemaining.hours).padStart(2, "0")}h</span>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded">
              <span className="font-bold">{String(timeRemaining.minutes).padStart(2, "0")}m</span>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded">
              <span className="font-bold">{String(timeRemaining.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
