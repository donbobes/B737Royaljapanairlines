"use client"

import { useEffect, useState } from "react"

export function A318Countdown() {
  const [timeSince, setTimeSince] = useState<string>("")
  const [isBlinking, setIsBlinking] = useState(true)
  const [hasLanded, setHasLanded] = useState(false)

  useEffect(() => {
    const calculateTimeSince = () => {
      // Landing: December 6, 2025 at 15:00 UK time (GMT)
      const landingDate = new Date("2025-12-06T15:00:00Z")
      const now = new Date()
      const difference = now.getTime() - landingDate.getTime()

      if (difference > 0) {
        setHasLanded(true)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        return `${days}d ${hours}h ${minutes}m ${seconds}s`
      }

      setHasLanded(false)
      const absDifference = Math.abs(difference)
      const days = Math.floor(absDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((absDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((absDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((absDifference % (1000 * 60)) / 1000)

      return `${days}d ${hours}h ${minutes}m ${seconds}s`
    }

    // Update counter every second
    const timer = setInterval(() => {
      setTimeSince(calculateTimeSince())
    }, 1000)

    // Initial calculation
    setTimeSince(calculateTimeSince())

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Blinking animation every 1 second
    const blinkTimer = setInterval(() => {
      setIsBlinking((prev) => !prev)
    }, 1000)

    return () => clearInterval(blinkTimer)
  }, [])

  return (
    <div className="inline-flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        <div
          className={`px-4 py-2 font-bold text-white transition-colors duration-300 ${
            isBlinking ? "bg-red-600" : "bg-white text-red-600"
          }`}
        >
          LIVE
        </div>
        <div className="text-primary-foreground font-semibold text-lg">
          {hasLanded ? "Time Since Landing: " : "Countdown: "}
          <span className="font-mono">{timeSince || "Calculating..."}</span>
        </div>
      </div>

      {hasLanded && <div className="bg-green-500 text-white px-4 py-2 font-bold text-sm">✈️ A318 HAS LANDED</div>}
    </div>
  )
}
