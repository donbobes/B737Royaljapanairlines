"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Plane, Clock, X } from "lucide-react"
import Link from "next/link"
import { routes } from "@/lib/routes-data"

const getUniqueAirports = () => {
  const airportMap = new Map()

  routes.forEach((route) => {
    if (!airportMap.has(route.fromCode)) {
      airportMap.set(route.fromCode, {
        code: route.fromCode,
        city: route.from,
        region: route.region,
      })
    }
    if (!airportMap.has(route.toCode)) {
      airportMap.set(route.toCode, {
        code: route.toCode,
        city: route.to,
        region: route.region,
      })
    }
  })

  return Array.from(airportMap.values())
}

const getAirportPosition = (code: string): { x: number; y: number } => {
  // Approximate positions based on longitude/latitude converted to SVG coordinates
  const positions: Record<string, { x: number; y: number }> = {
    // Asia-Pacific (Tokyo hub)
    RJTT: { x: 85, y: 38 }, // Tokyo Haneda
    RJAA: { x: 86, y: 38 }, // Tokyo Narita
    RKSI: { x: 82, y: 39 }, // Seoul Incheon
    RKSS: { x: 82, y: 39 }, // Seoul Gimpo
    VHHH: { x: 78, y: 45 }, // Hong Kong
    RCTP: { x: 80, y: 46 }, // Taipei
    ZBAA: { x: 77, y: 35 }, // Beijing
    ZSPD: { x: 80, y: 40 }, // Shanghai
    WSSS: { x: 75, y: 55 }, // Singapore
    VTBS: { x: 72, y: 50 }, // Bangkok
    VVNB: { x: 74, y: 48 }, // Hanoi
    WIII: { x: 74, y: 58 }, // Jakarta
    RPLL: { x: 80, y: 51 }, // Manila

    // Oceania
    YSSY: { x: 88, y: 72 }, // Sydney
    YMML: { x: 86, y: 74 }, // Melbourne
    YBBN: { x: 88, y: 68 }, // Brisbane
    NZAA: { x: 92, y: 76 }, // Auckland
    YPPH: { x: 78, y: 70 }, // Perth

    // Europe
    EGLL: { x: 50, y: 28 }, // London Heathrow
    LFPG: { x: 52, y: 30 }, // Paris CDG
    EDDF: { x: 53, y: 29 }, // Frankfurt
    EHAM: { x: 52, y: 28 }, // Amsterdam
    LEMD: { x: 48, y: 35 }, // Madrid
    LIRF: { x: 54, y: 36 }, // Rome
    LOWW: { x: 55, y: 30 }, // Vienna
    LSZH: { x: 53, y: 31 }, // Zurich

    // North America
    KJFK: { x: 25, y: 35 }, // New York JFK
    KLAX: { x: 15, y: 40 }, // Los Angeles
    KSFO: { x: 14, y: 39 }, // San Francisco
    KORD: { x: 22, y: 36 }, // Chicago
    KATL: { x: 24, y: 40 }, // Atlanta
    CYYZ: { x: 23, y: 32 }, // Toronto
    CYVR: { x: 13, y: 30 }, // Vancouver

    // Middle East
    OMDB: { x: 62, y: 46 }, // Dubai
    OTHH: { x: 61, y: 46 }, // Doha
    OERK: { x: 60, y: 45 }, // Riyadh
    LTFM: { x: 57, y: 36 }, // Istanbul
    LLBG: { x: 58, y: 40 }, // Tel Aviv

    // South Asia
    VIDP: { x: 68, y: 47 }, // Delhi
    VABB: { x: 67, y: 50 }, // Mumbai
    VOBL: { x: 69, y: 52 }, // Bengaluru
    VNKT: { x: 70, y: 48 }, // Kathmandu
    VCCJ: { x: 71, y: 56 }, // Colombo
  }

  // Default position if not found (center of map)
  return positions[code] || { x: 50, y: 50 }
}

export function InteractiveRouteMap() {
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null)
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)

  const airports = useMemo(() => {
    return getUniqueAirports().map((airport) => ({
      ...airport,
      ...getAirportPosition(airport.code),
    }))
  }, [])

  const selectedAirportData = airports.find((a) => a.code === selectedAirport)

  const connectedRoutes = routes.filter((r) => r.fromCode === selectedAirport || r.toCode === selectedAirport)

  const getAirportByCode = (code: string) => {
    return airports.find((a) => a.code === code)
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="relative w-full aspect-[16/9] bg-muted/30 overflow-hidden rounded-lg">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Simplified world map outline */}
              <path
                d="M 10 30 Q 15 25 20 28 L 30 32 L 35 28 L 40 30 L 45 25 L 50 28 L 55 30 L 60 35 L 65 40 L 70 45 L 75 50 L 80 55 L 85 60 L 90 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-border opacity-30"
              />
              <path
                d="M 10 50 Q 20 45 30 48 L 40 52 L 50 50 L 60 55 L 70 58 L 80 60 L 90 62"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-border opacity-30"
              />

              {routes.slice(0, 100).map((route, index) => {
                const fromAirport = getAirportByCode(route.fromCode)
                const toAirport = getAirportByCode(route.toCode)
                if (!fromAirport || !toAirport) return null

                const isHighlighted =
                  selectedAirport && (route.fromCode === selectedAirport || route.toCode === selectedAirport)
                const isHovered = hoveredRoute === `${route.fromCode}-${route.toCode}`

                return (
                  <g key={index}>
                    <line
                      x1={fromAirport.x}
                      y1={fromAirport.y}
                      x2={toAirport.x}
                      y2={toAirport.y}
                      stroke="currentColor"
                      strokeWidth={isHovered ? "0.4" : isHighlighted ? "0.3" : "0.15"}
                      className={
                        isHovered
                          ? "text-secondary"
                          : isHighlighted
                            ? "text-primary"
                            : selectedAirport
                              ? "text-border opacity-20"
                              : "text-primary opacity-40"
                      }
                      strokeDasharray={isHighlighted || isHovered ? "0" : "1,1"}
                      onMouseEnter={() => setHoveredRoute(`${route.fromCode}-${route.toCode}`)}
                      onMouseLeave={() => setHoveredRoute(null)}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                    />
                    {isHighlighted && (
                      <circle r="0.5" fill="currentColor" className="text-secondary">
                        <animateMotion
                          dur="3s"
                          repeatCount="indefinite"
                          path={`M ${fromAirport.x} ${fromAirport.y} L ${toAirport.x} ${toAirport.y}`}
                        />
                      </circle>
                    )}
                  </g>
                )
              })}

              {/* Airport markers */}
              {airports.map((airport) => {
                const isSelected = selectedAirport === airport.code
                const isConnected = connectedRoutes.some(
                  (r) => r.fromCode === airport.code || r.toCode === airport.code,
                )

                return (
                  <g key={airport.code}>
                    <circle
                      cx={airport.x}
                      cy={airport.y}
                      r={isSelected ? "1.5" : "1"}
                      fill="currentColor"
                      className={
                        isSelected
                          ? "text-secondary cursor-pointer"
                          : isConnected && selectedAirport
                            ? "text-primary cursor-pointer"
                            : "text-primary cursor-pointer"
                      }
                      onClick={() => setSelectedAirport(isSelected ? null : airport.code)}
                      style={{ transition: "all 0.2s" }}
                    />
                    <text
                      x={airport.x}
                      y={airport.y - 2}
                      textAnchor="middle"
                      fontSize="2.5"
                      fontWeight="600"
                      fill="currentColor"
                      className={isSelected ? "text-foreground" : "text-foreground"}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {airport.code}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Airport</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-muted-foreground">Flight Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Selected/Active</span>
            </div>
            <p className="text-muted-foreground italic">Click on any airport to view connected routes</p>
          </div>
        </CardContent>
      </Card>

      {/* Selected Airport Info */}
      {selectedAirportData && (
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedAirportData.city} ({selectedAirportData.code})
                  </h3>
                </div>
                <Badge variant="secondary">{selectedAirportData.region}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedAirport(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Connected Routes ({connectedRoutes.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {connectedRoutes.slice(0, 20).map((route, index) => {
                    const otherAirport =
                      route.fromCode === selectedAirport
                        ? airports.find((a) => a.code === route.toCode)
                        : airports.find((a) => a.code === route.fromCode)

                    if (!otherAirport) return null

                    const bookingUrl = `/book?from=${encodeURIComponent(route.fromCode)}&to=${encodeURIComponent(route.toCode)}&flightNumber=${encodeURIComponent(route.flightNumber)}`

                    return (
                      <Card key={index} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-semibold text-foreground">{selectedAirportData.code}</span>
                            <Plane className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold text-foreground">{otherAirport.code}</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{route.duration}</span>
                              </div>
                              <span className="text-muted-foreground">{route.frequency}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <span className="text-lg font-bold text-primary">
                                  ¥{route.fromPrice.toLocaleString()}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                                asChild
                              >
                                <Link href={bookingUrl}>Book</Link>
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{route.flightNumber}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                {connectedRoutes.length > 20 && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Showing 20 of {connectedRoutes.length} routes
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Airports List */}
      {!selectedAirport && (
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">All Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {airports.slice(0, 50).map((airport) => (
                <button
                  key={airport.code}
                  onClick={() => setSelectedAirport(airport.code)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{airport.code}</p>
                    <p className="text-sm text-muted-foreground">{airport.city}</p>
                  </div>
                </button>
              ))}
            </div>
            {airports.length > 50 && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Showing 50 of {airports.length} destinations
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
