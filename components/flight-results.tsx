"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, ArrowLeft, Wifi, Coffee, Tv } from "lucide-react"
import { format } from "date-fns"
import { routes } from "@/lib/routes-data"
import { assignAircraft } from "@/lib/aircraft-assignment"
import { SeatSelection } from "@/components/seat-selection"
import { isChristmasSaleActive } from "@/lib/christmas-sale"

interface FlightResultsProps {
  from: string
  to: string
  departDate?: Date
  returnDate?: Date
  passengers: string
  cabinClass: string
  tripType: string
  onBack: () => void
}

const cabinMultipliers = {
  economy: 1,
  business: 2.5,
  first: 4,
}

export function FlightResults({
  from,
  to,
  departDate,
  returnDate,
  passengers,
  cabinClass,
  tripType,
  onBack,
}: FlightResultsProps) {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [selectingReturn, setSelectingReturn] = useState(false)
  const [outboundFlight, setOutboundFlight] = useState<any | null>(null)

  const saleActive = isChristmasSaleActive()
  const discountMultiplier = saleActive ? 0.8 : 1 // 20% off = 0.8x price

  const matchingRoutes =
    !from || !to
      ? routes.filter((route) => route.type === "passenger")
      : routes.filter(
          (route) =>
            ((route.fromCode === from && route.toCode === to) || (route.fromCode === to && route.toCode === from)) &&
            route.type === "passenger",
        )

  const generateFlights = (isReturn = false) => {
    if (matchingRoutes.length === 0) return []

    const baseRoute =
      matchingRoutes.find((route) =>
        isReturn ? route.fromCode === to && route.toCode === from : route.fromCode === from && route.toCode === to,
      ) || matchingRoutes[0]

    const multiplier = cabinMultipliers[cabinClass as keyof typeof cabinMultipliers]

    const isSupersonic = baseRoute.type === "supersonic"

    if (isSupersonic) {
      return [
        {
          id: `${baseRoute.flightNumber}-morning${isReturn ? "-return" : ""}`,
          flightNumber: baseRoute.flightNumber,
          departure: "08:00",
          arrival: calculateArrival("08:00", baseRoute.duration),
          duration: baseRoute.duration,
          stops: "Non-stop",
          basePrice: baseRoute.fromPrice,
          price: Math.round(baseRoute.fromPrice * multiplier * discountMultiplier),
          originalPrice: Math.round(baseRoute.fromPrice * multiplier),
          amenities: ["wifi", "meals", "entertainment"],
          aircraft: "Concorde",
          from: isReturn ? to : from,
          to: isReturn ? from : to,
          fromName: isReturn ? baseRoute.to : baseRoute.from,
          toName: isReturn ? baseRoute.from : baseRoute.to,
        },
        {
          id: `${baseRoute.flightNumber}-afternoon${isReturn ? "-return" : ""}`,
          flightNumber: baseRoute.flightNumber,
          departure: "14:30",
          arrival: calculateArrival("14:30", baseRoute.duration),
          duration: baseRoute.duration,
          stops: "Non-stop",
          basePrice: baseRoute.fromPrice,
          price: Math.round(baseRoute.fromPrice * multiplier * discountMultiplier),
          originalPrice: Math.round(baseRoute.fromPrice * multiplier),
          amenities: ["wifi", "meals", "entertainment"],
          aircraft: "Concorde",
          from: isReturn ? to : from,
          to: isReturn ? from : to,
          fromName: isReturn ? baseRoute.to : baseRoute.from,
          toName: isReturn ? baseRoute.from : baseRoute.to,
        },
        {
          id: `${baseRoute.flightNumber}-evening${isReturn ? "-return" : ""}`,
          flightNumber: baseRoute.flightNumber,
          departure: "19:45",
          arrival: calculateArrival("19:45", baseRoute.duration),
          duration: baseRoute.duration,
          stops: "Non-stop",
          basePrice: baseRoute.fromPrice,
          price: Math.round(baseRoute.fromPrice * multiplier * 0.9 * discountMultiplier),
          originalPrice: Math.round(baseRoute.fromPrice * multiplier * 0.9),
          amenities: ["wifi", "meals", "entertainment"],
          aircraft: "Concorde",
          from: isReturn ? to : from,
          to: isReturn ? from : to,
          fromName: isReturn ? baseRoute.to : baseRoute.from,
          toName: isReturn ? baseRoute.from : baseRoute.to,
        },
      ]
    }

    const morningAircraft = assignAircraft(baseRoute)
    const afternoonAircraft = assignAircraft(baseRoute)
    const eveningAircraft = assignAircraft(baseRoute)

    return [
      {
        id: `${baseRoute.flightNumber}-morning${isReturn ? "-return" : ""}`,
        flightNumber: baseRoute.flightNumber,
        departure: "08:00",
        arrival: calculateArrival("08:00", baseRoute.duration),
        duration: baseRoute.duration,
        stops: "Non-stop",
        basePrice: baseRoute.fromPrice,
        price: Math.round(baseRoute.fromPrice * multiplier * discountMultiplier),
        originalPrice: Math.round(baseRoute.fromPrice * multiplier),
        amenities: ["wifi", "meals", "entertainment"],
        aircraft: morningAircraft,
        from: isReturn ? to : from,
        to: isReturn ? from : to,
        fromName: isReturn ? baseRoute.to : baseRoute.from,
        toName: isReturn ? baseRoute.from : baseRoute.to,
      },
      {
        id: `${baseRoute.flightNumber}-afternoon${isReturn ? "-return" : ""}`,
        flightNumber: baseRoute.flightNumber,
        departure: "14:30",
        arrival: calculateArrival("14:30", baseRoute.duration),
        duration: baseRoute.duration,
        stops: "Non-stop",
        basePrice: baseRoute.fromPrice,
        price: Math.round(baseRoute.fromPrice * multiplier * discountMultiplier),
        originalPrice: Math.round(baseRoute.fromPrice * multiplier),
        amenities: ["wifi", "meals", "entertainment"],
        aircraft: afternoonAircraft,
        from: isReturn ? to : from,
        to: isReturn ? from : to,
        fromName: isReturn ? baseRoute.to : baseRoute.from,
        toName: isReturn ? baseRoute.from : baseRoute.to,
      },
      {
        id: `${baseRoute.flightNumber}-evening${isReturn ? "-return" : ""}`,
        flightNumber: baseRoute.flightNumber,
        departure: "19:45",
        arrival: calculateArrival("19:45", baseRoute.duration),
        duration: baseRoute.duration,
        stops: "Non-stop",
        basePrice: baseRoute.fromPrice,
        price: Math.round(baseRoute.fromPrice * multiplier * 0.9 * discountMultiplier),
        originalPrice: Math.round(baseRoute.fromPrice * multiplier * 0.9),
        amenities: ["wifi", "meals", "entertainment"],
        aircraft: eveningAircraft,
        from: isReturn ? to : from,
        to: isReturn ? from : to,
        fromName: isReturn ? baseRoute.to : baseRoute.from,
        toName: isReturn ? baseRoute.from : baseRoute.to,
      },
    ]
  }

  const flights = generateFlights(selectingReturn)
  const fromAirport = from
    ? routes.find((r) => r.fromCode === (selectingReturn ? to : from))?.from || (selectingReturn ? to : from)
    : "All Airports"
  const toAirport = to
    ? routes.find((r) => r.toCode === (selectingReturn ? from : to))?.to || (selectingReturn ? from : to)
    : "All Destinations"

  if (selectedFlight) {
    const flight = flights.find((f) => f.id === selectedFlight)
    if (!flight) return null

    return (
      <SeatSelection
        flight={flight}
        from={flight.fromName || fromAirport}
        to={flight.toName || toAirport}
        departDate={selectingReturn ? returnDate : departDate}
        passengers={Number.parseInt(passengers)}
        cabinClass={cabinClass}
        isReturnFlight={selectingReturn}
        outboundFlight={outboundFlight}
        onBack={() => setSelectedFlight(null)}
      />
    )
  }

  if (!from || !to) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">All Available Routes</h2>
            <p className="text-muted-foreground">
              Select a route to view available flight times • {passengers}{" "}
              {Number.parseInt(passengers) === 1 ? "passenger" : "passengers"} • {cabinClass}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchingRoutes.map((route) => {
            const aircraft = assignAircraft(route)
            const multiplier = cabinMultipliers[cabinClass as keyof typeof cabinMultipliers]
            const price = Math.round(route.fromPrice * multiplier * discountMultiplier)
            const originalPrice = Math.round(route.fromPrice * multiplier)

            return (
              <Card
                key={route.id}
                className="border-border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  window.location.href = `/book?from=${route.fromCode}&to=${route.toCode}`
                }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Plane className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">{route.flightNumber}</span>
                      </div>
                      {route.popular && (
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          Popular
                        </Badge>
                      )}
                      {route.terminated && <Badge variant="destructive">Terminated</Badge>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{route.from}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft className="rotate-180 w-4 h-4" />
                        <span className="text-xs">{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{route.to}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">From</p>
                      {saleActive && (
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-red-600 text-white hover:bg-red-700">20% OFF CHRISTMAS SALE</Badge>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-primary">¥{price.toLocaleString()}</p>
                        {saleActive && (
                          <p className="text-sm text-muted-foreground line-through">
                            ¥{originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {route.frequency} • {aircraft}
                      </p>
                    </div>

                    {route.codeshare && (
                      <Badge variant="outline" className="text-xs">
                        Codeshare: {route.codeshare}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">No Flights Found</h2>
            <p className="text-muted-foreground">
              No flights available for this route. Please try a different destination.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (selectingReturn) {
              setSelectingReturn(false)
              setOutboundFlight(null)
            } else {
              onBack()
            }
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {selectingReturn ? "Select Return Flight" : "Available Flights"}
          </h2>
          <p className="text-muted-foreground">
            {fromAirport} → {toAirport} •{" "}
            {(selectingReturn ? returnDate : departDate) &&
              format((selectingReturn ? returnDate : departDate)!, "MMM dd, yyyy")}{" "}
            • {passengers} {Number.parseInt(passengers) === 1 ? "passenger" : "passengers"} • {cabinClass}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Plane className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Royal Japan Airlines</p>
                      <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                      <p className="text-xs text-muted-foreground">{flight.aircraft}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                      <p className="text-sm text-muted-foreground">{flight.from}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-sm text-muted-foreground mb-1">{flight.duration}</p>
                      <div className="w-full h-px bg-border relative">
                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{flight.stops}</p>
                    </div>

                    <div>
                      <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                      <p className="text-sm text-muted-foreground">{flight.to}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {flight.amenities.includes("wifi") && (
                      <Badge variant="secondary" className="gap-1">
                        <Wifi className="w-3 h-3" />
                        WiFi
                      </Badge>
                    )}
                    {flight.amenities.includes("meals") && (
                      <Badge variant="secondary" className="gap-1">
                        <Coffee className="w-3 h-3" />
                        Meals
                      </Badge>
                    )}
                    {flight.amenities.includes("entertainment") && (
                      <Badge variant="secondary" className="gap-1">
                        <Tv className="w-3 h-3" />
                        Entertainment
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 md:min-w-[180px]">
                  <div className="text-right">
                    {saleActive && (
                      <Badge className="bg-red-600 text-white hover:bg-red-700 mb-2">20% OFF CHRISTMAS SALE</Badge>
                    )}
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="text-3xl font-bold text-primary">¥{flight.price.toLocaleString()}</p>
                    {saleActive && (
                      <p className="text-sm text-muted-foreground line-through">
                        ¥{flight.originalPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => {
                      if (tripType === "round-trip" && !selectingReturn && returnDate) {
                        setOutboundFlight(flight)
                        setSelectingReturn(true)
                      } else {
                        setSelectedFlight(flight.id)
                      }
                    }}
                  >
                    Select Flight
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tripType === "round-trip" && returnDate && !selectingReturn && (
        <div className="pt-8 border-t border-border">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-foreground flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-600" />
              Round Trip Booking
            </h3>
            <p className="text-sm text-muted-foreground">
              After selecting your outbound flight, you'll choose your return flight for{" "}
              {format(returnDate, "MMM dd, yyyy")}.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function calculateArrival(departure: string, duration: string): string {
  const [depHours, depMinutes] = departure.split(":").map(Number)
  const durationMatch = duration.match(/(\d+)h\s*(\d+)?m?/)
  if (!durationMatch) return "00:00"

  const durationHours = Number.parseInt(durationMatch[1])
  const durationMinutes = durationMatch[2] ? Number.parseInt(durationMatch[2]) : 0

  const totalMinutes = depHours * 60 + depMinutes + durationHours * 60 + durationMinutes
  const arrHours = Math.floor(totalMinutes / 60) % 24
  const arrMinutes = totalMinutes % 60

  return `${arrHours.toString().padStart(2, "0")}:${arrMinutes.toString().padStart(2, "0")}`
}
