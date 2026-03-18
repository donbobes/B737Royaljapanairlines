"use client"

import React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Loader2, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { createClient } from "@/lib/supabase/client"

interface SeatSelectionProps {
  flight: {
    id: string
    flightNumber: string
    departure: string
    arrival: string
    duration: string
    price: number
    aircraft: string
    from?: string
    to?: string
    fromName?: string
    toName?: string
  }
  from: string
  to: string
  departDate?: Date
  passengers: number
  cabinClass: string
  isReturnFlight?: boolean
  outboundFlight?: any
  onBack: () => void
}

// Aircraft seat configurations
interface SeatConfig {
  firstClass: { rows: number; layout: string; letters: string[] } | null
  businessClass: { rows: number; layout: string; letters: string[] } | null
  economyClass: { rows: number; layout: string; letters: string[] }
  totalSeats: number
}

function getAircraftConfig(aircraft: string): SeatConfig {
  const name = aircraft.toLowerCase()

  // Wide-body: A380
  if (name.includes("a380") || name.includes("380")) {
    return {
      firstClass: { rows: 4, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      businessClass: { rows: 10, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 40, layout: "3-4-3", letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"] },
      totalSeats: 516,
    }
  }

  // Wide-body: 747
  if (name.includes("747") || name.includes("747-8")) {
    return {
      firstClass: { rows: 3, layout: "1-1", letters: ["A", "K"] },
      businessClass: { rows: 8, layout: "2-2-2", letters: ["A", "B", "D", "E", "H", "K"] },
      economyClass: { rows: 34, layout: "3-4-3", letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"] },
      totalSeats: 410,
    }
  }

  // Wide-body: 777
  if (name.includes("777")) {
    return {
      firstClass: { rows: 4, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      businessClass: { rows: 8, layout: "2-3-2", letters: ["A", "B", "D", "E", "F", "H", "K"] },
      economyClass: { rows: 30, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 396,
    }
  }

  // Wide-body: A350-1000
  if (name.includes("a350-1000") || name.includes("a35k") || (name.includes("a350") && name.includes("1000"))) {
    return {
      firstClass: { rows: 4, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      businessClass: { rows: 8, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 32, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 350,
    }
  }

  // Wide-body: A350-900
  if (name.includes("a350") || name.includes("350")) {
    return {
      firstClass: null,
      businessClass: { rows: 8, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 28, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 300,
    }
  }

  // Wide-body: A330
  if (name.includes("a330") || name.includes("330")) {
    return {
      firstClass: null,
      businessClass: { rows: 7, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 30, layout: "2-4-2", letters: ["A", "B", "D", "E", "F", "G", "H", "K"] },
      totalSeats: 290,
    }
  }

  // Wide-body: A340
  if (name.includes("a340") || name.includes("340")) {
    return {
      firstClass: null,
      businessClass: { rows: 6, layout: "2-2-2", letters: ["A", "B", "D", "E", "H", "K"] },
      economyClass: { rows: 30, layout: "2-4-2", letters: ["A", "B", "D", "E", "F", "G", "H", "K"] },
      totalSeats: 276,
    }
  }

  // Wide-body: 787
  if (name.includes("787") || name.includes("dreamliner")) {
    return {
      firstClass: null,
      businessClass: { rows: 7, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 26, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 262,
    }
  }

  // Narrow-body: A321 XLR / A321neo
  if (name.includes("a321") || name.includes("321")) {
    return {
      firstClass: null,
      businessClass: { rows: 5, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 28, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 188,
    }
  }

  // Narrow-body: A320
  if (name.includes("a320") || name.includes("320")) {
    return {
      firstClass: null,
      businessClass: { rows: 4, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 24, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 160,
    }
  }

  // Narrow-body: A318
  if (name.includes("a318") || name.includes("318")) {
    return {
      firstClass: null,
      businessClass: { rows: 3, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 20, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 132,
    }
  }

  // Narrow-body: 737
  if (name.includes("737")) {
    return {
      firstClass: null,
      businessClass: { rows: 3, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 22, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 144,
    }
  }

  // Regional: ATR 72
  if (name.includes("atr")) {
    return {
      firstClass: null,
      businessClass: null,
      economyClass: { rows: 18, layout: "2-2", letters: ["A", "B", "C", "D"] },
      totalSeats: 72,
    }
  }

  // Regional: Saab 340
  if (name.includes("saab")) {
    return {
      firstClass: null,
      businessClass: null,
      economyClass: { rows: 11, layout: "1-2", letters: ["A", "C", "D"] },
      totalSeats: 33,
    }
  }

  // Concorde
  if (name.includes("concorde")) {
    return {
      firstClass: { rows: 10, layout: "2-2", letters: ["A", "B", "C", "D"] },
      businessClass: null,
      economyClass: { rows: 15, layout: "2-2", letters: ["A", "B", "C", "D"] },
      totalSeats: 100,
    }
  }

  // Default narrow-body
  return {
    firstClass: null,
    businessClass: { rows: 4, layout: "2-2", letters: ["A", "B", "E", "F"] },
    economyClass: { rows: 24, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
    totalSeats: 160,
  }
}

function parseLayout(layout: string): number[] {
  return layout.split("-").map(Number)
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

interface Seat {
  id: string
  row: number
  letter: string
  occupied: boolean
  cabin: "first" | "business" | "economy"
}

function generateSeatsForCabin(
  cabinConfig: { rows: number; layout: string; letters: string[] },
  cabin: "first" | "business" | "economy",
  startRow: number,
  occupancyRate: number,
  rng: () => number,
): Seat[] {
  const seats: Seat[] = []
  for (let r = 0; r < cabinConfig.rows; r++) {
    const row = startRow + r
    for (const letter of cabinConfig.letters) {
      seats.push({
        id: `${row}${letter}`,
        row,
        letter,
        occupied: rng() < occupancyRate,
        cabin,
      })
    }
  }
  return seats
}

export function SeatSelection({
  flight,
  from,
  to,
  departDate,
  passengers,
  cabinClass,
  isReturnFlight = false,
  outboundFlight = null,
  onBack,
}: SeatSelectionProps) {
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [passengerName, setPassengerName] = useState("")

  const config = useMemo(() => getAircraftConfig(flight.aircraft), [flight.aircraft])

  const { allSeats, cabinSeats, availableCount, totalCabinSeats } = useMemo(() => {
    const seed = flight.flightNumber.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + (departDate?.getTime() || 0)
    const rng = seededRandom(seed)

    let currentRow = 1
    const all: Seat[] = []

    if (config.firstClass) {
      all.push(...generateSeatsForCabin(config.firstClass, "first", currentRow, 0.85, rng))
      currentRow += config.firstClass.rows
    }
    if (config.businessClass) {
      all.push(...generateSeatsForCabin(config.businessClass, "business", currentRow, 0.75, rng))
      currentRow += config.businessClass.rows
    }
    all.push(...generateSeatsForCabin(config.economyClass, "economy", currentRow, 0.65, rng))

    const targetCabin = cabinClass === "first" ? "first" : cabinClass === "business" ? "business" : "economy"

    // If selected cabin doesn't exist on this aircraft, fall back
    let filtered = all.filter((s) => s.cabin === targetCabin)
    if (filtered.length === 0) {
      filtered = all.filter((s) => s.cabin === "economy")
    }

    const available = filtered.filter((s) => !s.occupied).length

    return { allSeats: all, cabinSeats: filtered, availableCount: available, totalCabinSeats: filtered.length }
  }, [config, flight.flightNumber, departDate, cabinClass])

  const cabinConfig = cabinClass === "first" && config.firstClass
    ? config.firstClass
    : cabinClass === "business" && config.businessClass
      ? config.businessClass
      : config.economyClass

  const layoutGroups = parseLayout(cabinConfig.layout)

  const handleSeatClick = (seatId: string, occupied: boolean) => {
    if (occupied) return
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId))
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleConfirm = async () => {
    if (selectedSeats.length !== passengers) return
    if (!passengerName.trim()) {
      alert("Please enter passenger name")
      return
    }

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase.from("booked_flights").insert({
        user_id: user.id,
        flight_number: flight.flightNumber,
        from_airport: flight.fromName || from,
        to_airport: flight.toName || to,
        departure_time: flight.departure,
        arrival_time: flight.arrival,
        flight_date: departDate?.toISOString() || new Date().toISOString(),
        seats: selectedSeats.join(", "),
        cabin_class: cabinClass,
        passengers,
        aircraft: flight.aircraft,
        registration: "",
        price: flight.price * passengers,
        passenger_name: passengerName,
      })
    }

    try {
      await fetch("/api/discord-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightNumber: flight.flightNumber,
          from: flight.fromName || from,
          to: flight.toName || to,
          departure: flight.departure,
          arrival: flight.arrival,
          date: departDate?.toISOString() || new Date().toISOString(),
          seats: selectedSeats,
          cabinClass,
          passengers,
          aircraft: flight.aircraft,
          price: flight.price,
          passengerName,
          isReturnFlight,
        }),
      })
    } catch (e) {
      console.error("[v0] Discord notification error:", e)
    }

    const params = new URLSearchParams({
      flightNumber: flight.flightNumber,
      from,
      to,
      departure: flight.departure,
      arrival: flight.arrival,
      date: departDate ? format(departDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      seats: selectedSeats.join(","),
      cabinClass,
      passengers: passengers.toString(),
      aircraft: flight.aircraft,
      price: flight.price.toString(),
      passengerName,
    })

    if (isReturnFlight && outboundFlight) {
      params.append("returnFlightNumber", flight.flightNumber)
      params.append("returnFrom", from)
      params.append("returnTo", to)
      params.append("returnDeparture", flight.departure)
      params.append("returnArrival", flight.arrival)
      params.append("returnSeats", selectedSeats.join(","))
      params.append("returnAircraft", flight.aircraft)
      params.append("outboundFlightNumber", outboundFlight.flightNumber)
      params.append("outboundFrom", outboundFlight.fromName || outboundFlight.from)
      params.append("outboundTo", outboundFlight.toName || outboundFlight.to)
      params.append("outboundDeparture", outboundFlight.departure)
      params.append("outboundArrival", outboundFlight.arrival)
    }

    router.push(`/boarding-pass?${params.toString()}`)
  }

  const rows = Array.from(new Set(cabinSeats.map((s) => s.row))).sort((a, b) => a - b)

  // Determine seat size based on cabin
  const seatSize = cabinClass === "first" ? "w-14 h-14" : cabinClass === "business" ? "w-12 h-12" : "w-9 h-9"
  const seatTextSize = cabinClass === "first" ? "text-sm" : cabinClass === "business" ? "text-xs" : "text-[10px]"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} disabled={isProcessing}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isReturnFlight ? "Select Return Flight Seats" : "Select Your Seats"}
          </h2>
          <p className="text-muted-foreground">
            {from} to {to} -- Flight {flight.flightNumber} -- {flight.aircraft}
          </p>
        </div>
      </div>

      {/* Seats remaining banner */}
      <div className={cn(
        "rounded-lg px-4 py-3 flex items-center justify-between",
        availableCount <= 10
          ? "bg-destructive/10 border border-destructive/20"
          : availableCount <= 30
            ? "bg-amber-500/10 border border-amber-500/20"
            : "bg-primary/5 border border-primary/10"
      )}>
        <div className="flex items-center gap-2">
          <Plane className={cn(
            "w-4 h-4",
            availableCount <= 10 ? "text-destructive" : availableCount <= 30 ? "text-amber-600" : "text-primary"
          )} />
          <span className={cn(
            "text-sm font-semibold",
            availableCount <= 10 ? "text-destructive" : availableCount <= 30 ? "text-amber-600" : "text-primary"
          )}>
            {availableCount} {cabinClass} class seats remaining out of {totalCabinSeats}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.round(((totalCabinSeats - availableCount) / totalCabinSeats) * 100)}% booked
        </span>
      </div>

      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Passenger name */}
            <div className="space-y-2">
              <label htmlFor="passengerName" className="text-sm font-medium text-foreground">
                Passenger Name
              </label>
              <input
                id="passengerName"
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Enter full name as on passport"
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isProcessing}
              />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md border-2 border-primary bg-primary/20" />
                  <span className="text-xs text-muted-foreground">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md border-2 border-border bg-background" />
                  <span className="text-xs text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-muted border border-muted-foreground/10" />
                  <span className="text-xs text-muted-foreground">Occupied</span>
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">
                {selectedSeats.length} / {passengers} selected
              </div>
            </div>

            {/* Aircraft fuselage seat map */}
            <div className="relative bg-muted/20 rounded-2xl border border-border overflow-hidden">
              {/* Cockpit nose */}
              <div className="flex justify-center pt-6 pb-2">
                <div className="w-24 h-10 bg-muted/40 rounded-t-full border border-b-0 border-border flex items-center justify-center">
                  <Plane className="w-5 h-5 text-muted-foreground rotate-0" />
                </div>
              </div>

              {/* Cabin class label */}
              <div className="text-center py-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary/70 bg-primary/5 px-4 py-1 rounded-full">
                  {cabinClass} Class -- {cabinConfig.layout}
                </span>
              </div>

              {/* Seat grid */}
              <div className="px-4 py-4 overflow-x-auto">
                <div className="flex flex-col items-center gap-1 min-w-fit mx-auto">
                  {/* Column letters header */}
                  <div className="flex items-center gap-0">
                    <span className="w-8" />
                    {(() => {
                      const elements: React.ReactNode[] = []
                      let letterIdx = 0
                      for (let gi = 0; gi < layoutGroups.length; gi++) {
                        for (let si = 0; si < layoutGroups[gi]; si++) {
                          const letter = cabinConfig.letters[letterIdx]
                          elements.push(
                            <div key={`h-${letter}`} className={cn(seatSize, "flex items-center justify-center")}>
                              <span className="text-[10px] font-bold text-muted-foreground">{letter}</span>
                            </div>
                          )
                          letterIdx++
                        }
                        if (gi < layoutGroups.length - 1) {
                          elements.push(
                            <div key={`aisle-h-${gi}`} className="w-8" />
                          )
                        }
                      }
                      return elements
                    })()}
                  </div>

                  {/* Seat rows */}
                  {rows.map((row) => {
                    const rowSeats = cabinSeats.filter((s) => s.row === row)
                    let letterIdx = 0

                    return (
                      <div key={row} className="flex items-center gap-0">
                        {/* Row number */}
                        <span className="w-8 text-xs text-muted-foreground text-center font-mono">{row}</span>

                        {/* Seats grouped by layout with aisles */}
                        {layoutGroups.map((groupSize, gi) => {
                          const groupSeats: React.ReactNode[] = []
                          for (let si = 0; si < groupSize; si++) {
                            const seat = rowSeats[letterIdx]
                            letterIdx++
                            if (!seat) {
                              groupSeats.push(<div key={`empty-${gi}-${si}`} className={seatSize} />)
                              continue
                            }
                            const isSelected = selectedSeats.includes(seat.id)
                            groupSeats.push(
                              <button
                                key={seat.id}
                                type="button"
                                onClick={() => handleSeatClick(seat.id, seat.occupied)}
                                disabled={seat.occupied || isProcessing}
                                title={seat.occupied ? "Occupied" : `Seat ${seat.id}`}
                                className={cn(
                                  seatSize,
                                  "rounded-md border-2 font-medium transition-all duration-150 flex items-center justify-center",
                                  seatTextSize,
                                  seat.occupied && "bg-muted border-muted-foreground/10 text-muted-foreground/30 cursor-not-allowed",
                                  !seat.occupied && !isSelected && "bg-background border-border hover:border-primary hover:bg-primary/5 text-foreground cursor-pointer",
                                  isSelected && "bg-primary/20 border-primary text-primary font-bold shadow-sm shadow-primary/20",
                                )}
                              >
                                {seat.occupied ? "" : seat.letter}
                              </button>
                            )
                          }

                          return (
                            <div key={`group-${row}-${gi}`} className="flex items-center">
                              <div className="flex gap-0.5">
                                {groupSeats}
                              </div>
                              {gi < layoutGroups.length - 1 && (
                                <div className="w-8 flex items-center justify-center">
                                  <div className="w-px h-6 bg-border/50" />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Tail */}
              <div className="flex justify-center pb-6 pt-2">
                <div className="w-16 h-6 bg-muted/40 rounded-b-lg border border-t-0 border-border" />
              </div>
            </div>

            {/* Selected seats display */}
            {selectedSeats.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Your seats:</span>
                {selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-md border border-primary/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Price and confirm */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-3xl font-bold text-primary">
                  {"\u00A5"}{(flight.price * passengers).toLocaleString()}
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleConfirm}
                disabled={selectedSeats.length !== passengers || !passengerName.trim() || isProcessing}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
