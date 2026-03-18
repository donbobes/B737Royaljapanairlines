"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SeatConfig {
  firstClass: { rows: number; layout: string; letters: string[] } | null
  businessClass: { rows: number; layout: string; letters: string[] } | null
  economyClass: { rows: number; layout: string; letters: string[] }
  totalSeats: number
}

interface AircraftSeatMap {
  id: string
  name: string
  category: string
  image: string
  config: SeatConfig
}

const aircraftSeatMaps: AircraftSeatMap[] = [
  {
    id: "a380",
    name: "Airbus A380-800",
    category: "Ultra Long-Haul Flagship",
    image: "/fleet/airbus-a380-800.png",
    config: {
      firstClass: { rows: 4, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      businessClass: { rows: 10, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 40, layout: "3-4-3", letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"] },
      totalSeats: 516,
    },
  },
  {
    id: "777",
    name: "Boeing 777-300ER",
    category: "Long-Haul Workhorse",
    image: "/fleet/boeing-777-300er.png",
    config: {
      firstClass: { rows: 4, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      businessClass: { rows: 8, layout: "2-3-2", letters: ["A", "B", "D", "E", "F", "H", "K"] },
      economyClass: { rows: 30, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 396,
    },
  },
  {
    id: "747",
    name: "Boeing 747-8",
    category: "Iconic Long-Haul",
    image: "/fleet/boeing-747-8.png",
    config: {
      firstClass: { rows: 3, layout: "1-1", letters: ["A", "K"] },
      businessClass: { rows: 8, layout: "2-2-2", letters: ["A", "B", "D", "E", "H", "K"] },
      economyClass: { rows: 34, layout: "3-4-3", letters: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"] },
      totalSeats: 410,
    },
  },
  {
    id: "787",
    name: "Boeing 787-9 Dreamliner",
    category: "Medium to Long-Haul",
    image: "/fleet/boeing-787-9.png",
    config: {
      firstClass: null,
      businessClass: { rows: 7, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 26, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 262,
    },
  },
  {
    id: "a350-1000",
    name: "Airbus A350-1000",
    category: "Ultra Long-Haul",
    image: "/fleet/airbus-a350-1000.png",
    config: {
      firstClass: { rows: 4, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      businessClass: { rows: 8, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 32, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 350,
    },
  },
  {
    id: "a350-900",
    name: "Airbus A350-900",
    category: "Long-Haul",
    image: "/fleet/a350-1000.png",
    config: {
      firstClass: null,
      businessClass: { rows: 8, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 28, layout: "3-3-3", letters: ["A", "B", "C", "D", "E", "F", "H", "J", "K"] },
      totalSeats: 300,
    },
  },
  {
    id: "a340",
    name: "Airbus A340-600",
    category: "Long-Haul",
    image: "/fleet/a340.png",
    config: {
      firstClass: null,
      businessClass: { rows: 6, layout: "2-2-2", letters: ["A", "B", "D", "E", "H", "K"] },
      economyClass: { rows: 30, layout: "2-4-2", letters: ["A", "B", "D", "E", "F", "G", "H", "K"] },
      totalSeats: 276,
    },
  },
  {
    id: "a330",
    name: "Airbus A330-900neo",
    category: "Medium to Long-Haul",
    image: "/fleet/a330-900.png",
    config: {
      firstClass: null,
      businessClass: { rows: 7, layout: "1-2-1", letters: ["A", "D", "E", "K"] },
      economyClass: { rows: 30, layout: "2-4-2", letters: ["A", "B", "D", "E", "F", "G", "H", "K"] },
      totalSeats: 290,
    },
  },
  {
    id: "a321xlr",
    name: "Airbus A321 XLR",
    category: "Long-Range Narrow-Body",
    image: "/fleet/airbus-a321-xlr.png",
    config: {
      firstClass: null,
      businessClass: { rows: 5, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 28, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 188,
    },
  },
  {
    id: "a318",
    name: "Airbus A318",
    category: "Short-Haul Regional",
    image: "/fleet/airbus-a318.png",
    config: {
      firstClass: null,
      businessClass: { rows: 3, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 20, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 132,
    },
  },
  {
    id: "737",
    name: "Boeing 737-700",
    category: "Short to Medium-Haul",
    image: "/fleet/boeing-737-700.png",
    config: {
      firstClass: null,
      businessClass: { rows: 3, layout: "2-2", letters: ["A", "B", "E", "F"] },
      economyClass: { rows: 22, layout: "3-3", letters: ["A", "B", "C", "D", "E", "F"] },
      totalSeats: 144,
    },
  },
  {
    id: "atr",
    name: "ATR 72-600",
    category: "Regional Turboprop",
    image: "/fleet/atr-72-600.png",
    config: {
      firstClass: null,
      businessClass: null,
      economyClass: { rows: 18, layout: "2-2", letters: ["A", "B", "C", "D"] },
      totalSeats: 72,
    },
  },
  {
    id: "saab",
    name: "Saab 340",
    category: "Regional Turboprop",
    image: "/fleet/saab-340.png",
    config: {
      firstClass: null,
      businessClass: null,
      economyClass: { rows: 11, layout: "1-2", letters: ["A", "C", "D"] },
      totalSeats: 33,
    },
  },
  {
    id: "concorde",
    name: "Concorde",
    category: "Supersonic",
    image: "/fleet/concorde-supersonic.png",
    config: {
      firstClass: { rows: 10, layout: "2-2", letters: ["A", "B", "C", "D"] },
      businessClass: null,
      economyClass: { rows: 15, layout: "2-2", letters: ["A", "B", "C", "D"] },
      totalSeats: 100,
    },
  },
]

function parseLayout(layout: string): number[] {
  return layout.split("-").map(Number)
}

// Cabin seat map component - matches booking seat selection style
function CabinSeatMap({ 
  cabinConfig, 
  cabinName, 
  startRow, 
  seatSize 
}: { 
  cabinConfig: { rows: number; layout: string; letters: string[] }
  cabinName: string
  startRow: number
  seatSize: string
}) {
  const layoutGroups = parseLayout(cabinConfig.layout)
  const rows = Array.from({ length: cabinConfig.rows }, (_, i) => startRow + i)

  return (
    <div className="space-y-2">
      <div className="text-center py-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary/70 bg-primary/5 px-4 py-1 rounded-full">
          {cabinName} -- {cabinConfig.layout}
        </span>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        {/* Column letters header */}
        <div className="flex items-center gap-0">
          <span className="w-6" />
          {(() => {
            const elements: React.ReactNode[] = []
            let letterIdx = 0
            for (let gi = 0; gi < layoutGroups.length; gi++) {
              for (let si = 0; si < layoutGroups[gi]; si++) {
                const letter = cabinConfig.letters[letterIdx]
                elements.push(
                  <div key={`h-${letter}`} className={cn(seatSize, "flex items-center justify-center")}>
                    <span className="text-[9px] font-bold text-muted-foreground">{letter}</span>
                  </div>
                )
                letterIdx++
              }
              if (gi < layoutGroups.length - 1) {
                elements.push(<div key={`aisle-h-${gi}`} className="w-6 flex items-center justify-center"><div className="w-px h-4 bg-border/50" /></div>)
              }
            }
            return elements
          })()}
        </div>

        {/* Seat rows */}
        {rows.map((row) => {
          let letterIdx = 0
          return (
            <div key={row} className="flex items-center gap-0">
              <span className="w-6 text-[9px] text-muted-foreground text-center font-mono">{row}</span>
              {layoutGroups.map((groupSize, gi) => {
                const groupSeats: React.ReactNode[] = []
                for (let si = 0; si < groupSize; si++) {
                  const letter = cabinConfig.letters[letterIdx]
                  letterIdx++
                  groupSeats.push(
                    <div
                      key={`${row}${letter}`}
                      className={cn(
                        seatSize,
                        "rounded border-2 border-border bg-background flex items-center justify-center"
                      )}
                    >
                      <span className="text-[7px] font-medium text-muted-foreground">{row}{letter}</span>
                    </div>
                  )
                }
                return (
                  <div key={`group-${gi}`} className="flex items-center gap-0.5">
                    {groupSeats}
                    {gi < layoutGroups.length - 1 && (
                      <div className="w-6 flex items-center justify-center">
                        <div className="w-px h-full bg-border/30" />
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
  )
}

function AircraftSeatMapCard({ aircraft, isSelected, onSelect }: { aircraft: AircraftSeatMap; isSelected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-all",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50 hover:bg-muted/30"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-16 h-10 bg-muted/30 rounded overflow-hidden flex items-center justify-center">
          <Image
            src={aircraft.image}
            alt={aircraft.name}
            width={64}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("font-semibold truncate", isSelected ? "text-primary" : "text-foreground")}>
            {aircraft.name}
          </p>
          <p className="text-xs text-muted-foreground">{aircraft.config.totalSeats} seats</p>
        </div>
      </div>
    </button>
  )
}

export default function SeatMapsPage() {
  const [selectedAircraft, setSelectedAircraft] = useState<string>("a380")
  const aircraft = aircraftSeatMaps.find(a => a.id === selectedAircraft) || aircraftSeatMaps[0]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Aircraft Seat Maps</h1>
            <p className="text-muted-foreground">
              View cabin configurations for every aircraft in our fleet
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Aircraft selector sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Select Aircraft</h3>
                  <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                    {aircraftSeatMaps.map((a) => (
                      <AircraftSeatMapCard
                        key={a.id}
                        aircraft={a}
                        isSelected={selectedAircraft === a.id}
                        onSelect={() => setSelectedAircraft(a.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Seat map display */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  {/* Aircraft header */}
                  <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
                    <div className="w-24 h-16 bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={aircraft.image}
                        alt={aircraft.name}
                        width={96}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground">{aircraft.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{aircraft.category}</Badge>
                        <span className="text-sm text-muted-foreground">{aircraft.config.totalSeats} total seats</span>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-3">
                        {aircraft.config.firstClass && (
                          <span className="text-sm"><span className="font-medium">First:</span> {aircraft.config.firstClass.rows * aircraft.config.firstClass.letters.length} seats</span>
                        )}
                        {aircraft.config.businessClass && (
                          <span className="text-sm"><span className="font-medium">Business:</span> {aircraft.config.businessClass.rows * aircraft.config.businessClass.letters.length} seats</span>
                        )}
                        <span className="text-sm"><span className="font-medium">Economy:</span> {aircraft.config.economyClass.rows * aircraft.config.economyClass.letters.length} seats</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-border bg-background" />
                      <span className="text-xs text-muted-foreground">Seat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-px h-6 bg-border/50" />
                      <span className="text-xs text-muted-foreground">Aisle</span>
                    </div>
                  </div>

                  {/* Seat map fuselage */}
                  <div className="relative bg-muted/20 rounded-2xl border border-border overflow-hidden">
                    {/* Cockpit nose */}
                    <div className="flex justify-center pt-6 pb-2">
                      <div className="w-20 h-8 bg-muted/40 rounded-t-full border border-b-0 border-border flex items-center justify-center">
                        <Plane className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Cabin sections */}
                    <div className="px-4 py-4 space-y-4 overflow-x-auto">
                      {(() => {
                        const sections: React.ReactNode[] = []
                        let currentRow = 1

                        if (aircraft.config.firstClass) {
                          sections.push(
                            <CabinSeatMap
                              key="first"
                              cabinConfig={aircraft.config.firstClass}
                              cabinName="First Class"
                              startRow={currentRow}
                              seatSize="w-10 h-10"
                            />
                          )
                          currentRow += aircraft.config.firstClass.rows
                          sections.push(
                            <div key="div-first" className="flex justify-center py-2">
                              <div className="w-3/4 border-t border-dashed border-border" />
                            </div>
                          )
                        }

                        if (aircraft.config.businessClass) {
                          sections.push(
                            <CabinSeatMap
                              key="business"
                              cabinConfig={aircraft.config.businessClass}
                              cabinName="Business Class"
                              startRow={currentRow}
                              seatSize="w-8 h-8"
                            />
                          )
                          currentRow += aircraft.config.businessClass.rows
                          sections.push(
                            <div key="div-business" className="flex justify-center py-2">
                              <div className="w-3/4 border-t border-dashed border-border" />
                            </div>
                          )
                        }

                        sections.push(
                          <CabinSeatMap
                            key="economy"
                            cabinConfig={aircraft.config.economyClass}
                            cabinName="Economy Class"
                            startRow={currentRow}
                            seatSize="w-7 h-7"
                          />
                        )

                        return sections
                      })()}
                    </div>

                    {/* Tail */}
                    <div className="flex justify-center pb-6 pt-2">
                      <div className="w-14 h-5 bg-muted/40 rounded-b-lg border border-t-0 border-border" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
