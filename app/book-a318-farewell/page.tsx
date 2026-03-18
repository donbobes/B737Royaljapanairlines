"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plane, Calendar, Users, CreditCard, Clock, MapPin, Info } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BookA318FarewellPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [passengerName, setPassengerName] = useState("")
  const [passengerCount, setPassengerCount] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")
  const [selectedSeat, setSelectedSeat] = useState("")

  const flightDetails = {
    flightNumber: "RJA402",
    from: "Seoul Incheon (RKSI)",
    to: "Tokyo Haneda (RJTT)",
    departure: "15:30",
    arrival: "17:45",
    date: "2025-12-06",
    aircraft: "Airbus A318",
    duration: "2h 15m",
    price: "¥45,000",
  }

  const handleSubmitPassengerInfo = (e: React.FormEvent) => {
    e.preventDefault()
    if (passengerName) {
      setStep(2)
    }
  }

  const handleSeatSelection = (seat: string) => {
    setSelectedSeat(seat)
  }

  const handleCompleteBooking = () => {
    const params = new URLSearchParams({
      flightNumber: flightDetails.flightNumber,
      from: flightDetails.from,
      to: flightDetails.to,
      departure: flightDetails.departure,
      arrival: flightDetails.arrival,
      date: flightDetails.date,
      seats: selectedSeat,
      cabinClass: cabinClass,
      passengerName: passengerName.toUpperCase(),
      aircraft: flightDetails.aircraft,
      price: flightDetails.price,
      isFarewellFlight: "true",
    })

    router.push(`/boarding-pass?${params.toString()}`)
  }

  // Simple seat map for A318 (reduced capacity configuration)
  const generateSeats = () => {
    const rows = cabinClass === "business" ? 4 : 16
    const cols = cabinClass === "business" ? ["A", "C", "D", "F"] : ["A", "B", "C", "D", "E", "F"]
    const seats = []

    for (let row = 1; row <= rows; row++) {
      for (const col of cols) {
        seats.push(`${row}${col}`)
      }
    }

    return seats
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-8 h-8" />
              <span className="text-sm font-semibold uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full">
                Historic Farewell Flight
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Book the Last A318 Flight</h1>
            <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
              Join us for a historic moment as we bid farewell to our beloved Airbus A318 fleet with one final flight
              from Seoul to Tokyo Haneda.
            </p>
          </div>
        </section>

        {/* Flight Details Card */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <Card className="border-2 border-primary shadow-xl mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Flight Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Plane className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Flight Number</p>
                        <p className="font-bold text-foreground">{flightDetails.flightNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-bold text-foreground">
                          {flightDetails.from} → {flightDetails.to}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-bold text-foreground">{flightDetails.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-bold text-foreground">December 6, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-bold text-foreground">{flightDetails.departure}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Plane className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Aircraft</p>
                        <p className="font-bold text-foreground">{flightDetails.aircraft}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-medium">
                    ✈️ This is a commemorative flight marking the retirement of our A318 fleet. Each passenger will
                    receive a special certificate and commemorative gift.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="border-border shadow-lg">
              <CardContent className="p-6 md:p-8">
                {step === 1 && (
                  <form onSubmit={handleSubmitPassengerInfo} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-foreground">Passenger Information</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="passengerName">Full Name (as on passport)</Label>
                          <Input
                            id="passengerName"
                            value={passengerName}
                            onChange={(e) => setPassengerName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="passengers">Number of Passengers</Label>
                          <RadioGroup value={passengerCount} onValueChange={setPassengerCount} className="mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="passenger-1" />
                              <Label htmlFor="passenger-1">1 Passenger</Label>
                            </div>
                          </RadioGroup>
                          <p className="text-sm text-muted-foreground mt-2">
                            Note: This commemorative flight booking is limited to one passenger per reservation
                          </p>
                        </div>

                        <div>
                          <Label>Cabin Class</Label>
                          <RadioGroup value={cabinClass} onValueChange={setCabinClass} className="mt-2 space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="economy" id="economy" />
                              <Label htmlFor="economy">Economy - {flightDetails.price}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="business" id="business" />
                              <Label htmlFor="business">Business - ¥85,000</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary text-primary-foreground" size="lg">
                      Continue to Seat Selection
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-foreground">Select Your Seat</h2>
                      <p className="text-muted-foreground mb-6">Choose your preferred seat for this historic flight</p>

                      <div className="bg-muted/30 p-6 rounded-lg mb-6">
                        <div className="text-center mb-4">
                          <Plane className="w-8 h-8 mx-auto text-primary mb-2" />
                          <p className="text-sm font-semibold text-foreground">
                            {cabinClass === "business" ? "Business Class" : "Economy Class"}
                          </p>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-w-md mx-auto">
                          {generateSeats().map((seat) => (
                            <button
                              key={seat}
                              type="button"
                              onClick={() => handleSeatSelection(seat)}
                              className={`p-3 rounded-lg border-2 text-sm font-bold transition-all ${
                                selectedSeat === seat
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background border-border hover:border-primary text-foreground"
                              }`}
                            >
                              {seat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" size="lg">
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={handleCompleteBooking}
                          disabled={!selectedSeat}
                          className="flex-1 bg-primary text-primary-foreground"
                          size="lg"
                        >
                          Complete Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Plane className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2 text-foreground">Historic Aircraft</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The A318 has served Royal Japan Airlines faithfully since 2010, completing over 50,000 flights.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2 text-foreground">Commemorative Certificate</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All passengers receive a signed certificate and limited edition memorabilia.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2 text-foreground">Exclusive Experience</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Special in-flight service with vintage menu items and crew in heritage uniforms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
