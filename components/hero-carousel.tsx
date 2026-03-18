"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const heroImages = [
  "/royal-japan-airlines-aircraft.png",
  "/hero-landing.png",
  "/hero-gate.png",
  "/hero-fuselage.png",
  "/hero-tail.png",
  "/hero-a350-gate.jpg",
  "/hero-aircraft-taxiway.jpg",
  "/hero-atr-ocean.jpg",
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-30" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt="Royal Japan Airlines aircraft"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
