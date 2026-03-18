"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Users, MapPin, Calendar } from "lucide-react"
import { format, differenceInMilliseconds, isPast, isToday } from "date-fns"

interface Booking {
  id: string
  flightNumber: string
  from: string
  to: string
  departure: string
  arrival: string
  date: string
  seats: string[]
  cabinClass: string
  passengers: number
  aircraft: string
  price: number
  bookedAt: string
}

export default function StaffFlightsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update current time every second for live countdown
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings()
    }
  }, [isAuthenticated])

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem("rja_bookings") || "[]")
    // Sort by flight date/time
    const sorted = storedBookings.sort((a: Booking, b: Booking) => {
      const dateA = new Date(`${a.date.split("T")[0]}T${a.departure}:00`)
      const dateB = new Date(`${b.date.split("T")[0]}T${b.departure}:00`)
      return dateA.getTime() - dateB.getTime()
    })
    setBookings(sorted)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "Heratik154") {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  const getFlightDateTime = (booking: Booking) => {
    const dateStr = booking.date.split("T")[0]
    return new Date(`${dateStr}T${booking.departure}:00`)
  }

  const getCountdown = (booking: Booking) => {
    const flightTime = getFlightDateTime(booking)
    const diff = differenceInMilliseconds(flightTime, currentTime)

    if (diff < 0) {
      return "Departed"
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    }
    return `${minutes}m ${seconds}s`
  }

  const isFlightLive = (booking: Booking) => {
    const flightTime = getFlightDateTime(booking)
    return isToday(flightTime) && !isPast(flightTime)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">Staff Portal Access</CardTitle>
            <p className="text-center text-muted-foreground">Enter admin password to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border"
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Access Portal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Flight Management Portal</h1>
            <p className="text-muted-foreground">Monitor and manage all booked flights</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        <div className="grid gap-4">
          {bookings.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <Plane className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground">Booked flights will appear here</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => {
              const flightTime = getFlightDateTime(booking)
              const isLive = isFlightLive(booking)
              const hasDeparted = isPast(flightTime)

              return (
                <Card key={booking.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                              <Plane className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-lg text-foreground">{booking.flightNumber}</p>
                              <p className="text-sm text-muted-foreground">{booking.aircraft}</p>
                              <p className="text-xs text-muted-foreground">Booking: {booking.id}</p>
                            </div>
                          </div>
                          {isLive && (
                            <Badge className="bg-green-500 text-white hover:bg-green-600">Flight is Live</Badge>
                          )}
                          {hasDeparted && (
                            <Badge variant="secondary" className="bg-gray-500 text-white">
                              Departed
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Route</p>
                              <p className="font-semibold text-foreground">
                                {booking.from} → {booking.to}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Date & Time</p>
                              <p className="font-semibold text-foreground">
                                {format(flightTime, "MMM dd, yyyy • HH:mm")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Passengers</p>
                              <p className="font-semibold text-foreground">
                                {booking.passengers} • {booking.cabinClass}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">{hasDeparted ? "Status" : "Countdown"}</p>
                              <p
                                className={`font-semibold ${
                                  isLive ? "text-green-500" : hasDeparted ? "text-gray-500" : "text-foreground"
                                }`}
                              >
                                {getCountdown(booking)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Seats</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.seats.map((seat) => (
                              <Badge key={seat} variant="outline" className="border-primary text-primary">
                                {seat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:border-l lg:border-border lg:pl-6 flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                          <p className="text-2xl font-bold text-primary">
                            ¥{(booking.price * booking.passengers).toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-4">
                          <p className="text-xs text-muted-foreground">
                            Booked: {format(new Date(booking.bookedAt), "MMM dd, HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
