"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Clock, Download } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"

function BoardingPassContent() {
  const searchParams = useSearchParams()

  const flightNumber = searchParams.get("flightNumber") || ""
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const departure = searchParams.get("departure") || ""
  const arrival = searchParams.get("arrival") || ""
  const date = searchParams.get("date") || ""
  const seats = searchParams.get("seats") || ""
  const cabinClass = searchParams.get("cabinClass") || ""
  const passengers = searchParams.get("passengers") || "1"
  const aircraft = searchParams.get("aircraft") || ""
  const price = searchParams.get("price") || "0"
  const passengerName = searchParams.get("passengerName") || "PASSENGER"
  const isFarewellFlight = searchParams.get("isFarewellFlight") === "true"

  const hasReturnFlight = searchParams.has("returnFlightNumber")
  const returnFlightNumber = searchParams.get("returnFlightNumber") || ""
  const returnFrom = searchParams.get("returnFrom") || ""
  const returnTo = searchParams.get("returnTo") || ""
  const returnDeparture = searchParams.get("returnDeparture") || ""
  const returnArrival = searchParams.get("returnArrival") || ""
  const returnSeats = searchParams.get("returnSeats") || ""
  const returnAircraft = searchParams.get("returnAircraft") || ""

  const outboundFlightNumber = searchParams.get("outboundFlightNumber") || ""
  const outboundFrom = searchParams.get("outboundFrom") || ""
  const outboundTo = searchParams.get("outboundTo") || ""
  const outboundDeparture = searchParams.get("outboundDeparture") || ""
  const outboundArrival = searchParams.get("outboundArrival") || ""

  const seatList = seats.split(",")
  const returnSeatList = returnSeats.split(",")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Plane className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              {hasReturnFlight ? "Your boarding passes are ready" : "Your boarding pass is ready"}
            </p>
            {isFarewellFlight && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg max-w-2xl mx-auto">
                <p className="font-bold text-lg mb-1">🎉 Historic Farewell Flight</p>
                <p className="text-sm text-white/90">
                  Thank you for being part of aviation history. This commemorative boarding pass marks the final flight
                  of our beloved A318 fleet.
                </p>
              </div>
            )}
          </div>

          {hasReturnFlight && (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-4">Outbound Flight</h2>
              <BoardingPassCard
                flightNumber={outboundFlightNumber}
                from={outboundFrom}
                to={outboundTo}
                departure={outboundDeparture}
                arrival={outboundArrival}
                date={date}
                seats={seats}
                cabinClass={cabinClass}
                passengerName={passengerName}
                aircraft={aircraft}
                isFarewellFlight={false}
              />

              <div className="my-8 border-t-2 border-dashed border-border" />

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Return Flight</h2>
              <BoardingPassCard
                flightNumber={returnFlightNumber}
                from={returnFrom}
                to={returnTo}
                departure={returnDeparture}
                arrival={returnArrival}
                date={date}
                seats={returnSeats}
                cabinClass={cabinClass}
                passengerName={passengerName}
                aircraft={returnAircraft}
                isFarewellFlight={false}
              />
            </>
          )}

          {!hasReturnFlight && (
            <BoardingPassCard
              flightNumber={flightNumber}
              from={from}
              to={to}
              departure={departure}
              arrival={arrival}
              date={date}
              seats={seats}
              cabinClass={cabinClass}
              passengerName={passengerName}
              aircraft={aircraft}
              isFarewellFlight={isFarewellFlight}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function BoardingPassCard({
  flightNumber,
  from,
  to,
  departure,
  arrival,
  date,
  seats,
  cabinClass,
  passengerName,
  aircraft,
  isFarewellFlight = false,
}: {
  flightNumber: string
  from: string
  to: string
  departure: string
  arrival: string
  date: string
  seats: string
  cabinClass: string
  passengerName: string
  aircraft: string
  isFarewellFlight?: boolean
}) {
  const seatList = seats.split(",")
  const bookingRef = `RJA${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const gate = `${Math.floor(Math.random() * 50) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`
  const boardingTime = new Date(date)
  boardingTime.setHours(Number.parseInt(departure.split(":")[0]) - 1)
  boardingTime.setMinutes(Number.parseInt(departure.split(":")[1]))

  return (
    <Card className="border-border shadow-xl overflow-hidden bg-white mb-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">ROYAL JAPAN AIRLINES</h2>
            <p className="text-blue-100 text-sm mt-1">BOARDING PASS</p>
            {isFarewellFlight && (
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mt-2">
                <span className="text-xs font-bold uppercase tracking-wide">Historic Final A318 Flight</span>
              </div>
            )}
          </div>
          <Plane className="w-12 h-12 opacity-80" />
        </div>
      </div>

      <CardContent className="p-0">
        {/* Main Boarding Pass Content */}
        <div className="grid md:grid-cols-[1fr_auto] divide-y md:divide-y-0 md:divide-x divide-dashed divide-gray-300">
          {/* Left Section - Main Info */}
          <div className="p-6 space-y-6">
            {/* Passenger Name */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Passenger Name</p>
              <p className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{passengerName}</p>
            </div>

            {/* Flight Route */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">From</p>
                <p className="text-4xl font-bold text-gray-900">
                  {departure.split(" ")[0] || from.substring(0, 3).toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 mt-1">{from}</p>
              </div>
              <div className="flex justify-center">
                <Plane className="w-6 h-6 text-gray-400 rotate-90" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">To</p>
                <p className="text-4xl font-bold text-gray-900">
                  {arrival.split(" ")[0] || to.substring(0, 3).toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 mt-1">{to}</p>
              </div>
            </div>

            {/* Flight Details Grid */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Flight</p>
                <p className="text-lg font-bold text-gray-900">{flightNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
                <p className="text-lg font-bold text-gray-900">{format(new Date(date), "dd MMM")}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Boarding</p>
                <p className="text-lg font-bold text-gray-900">{format(boardingTime, "HH:mm")}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Gate</p>
                <p className="text-lg font-bold text-blue-700">{gate}</p>
              </div>
            </div>

            {/* Seat and Class */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Seat</p>
                <p className="text-2xl font-bold text-gray-900">{seatList[0]}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Class</p>
                <p className="text-lg font-bold text-gray-900 uppercase">{cabinClass}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Booking Ref</p>
                <p className="text-lg font-bold text-gray-900">{bookingRef}</p>
              </div>
            </div>

            {/* Farewell Note Section */}
            {isFarewellFlight && (
              <div className="pt-4 border-t-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2 text-lg">✈️ A Farewell Message</h4>
                <p className="text-sm text-blue-800 leading-relaxed mb-3">Dear {passengerName},</p>
                <p className="text-sm text-blue-800 leading-relaxed mb-3">
                  Thank you for joining us on this historic final flight of our Airbus A318 fleet. Since 2010, these
                  remarkable aircraft have connected millions of passengers across Asia and beyond, creating countless
                  memories along the way.
                </p>
                <p className="text-sm text-blue-800 leading-relaxed mb-3">
                  As we bid farewell to the A318, we honor its legacy of reliability, comfort, and excellence. Your
                  presence on this commemorative flight makes you part of Royal Japan Airlines' aviation history.
                </p>
                <p className="text-sm text-blue-800 leading-relaxed font-semibold">
                  Thank you for flying with us. Here's to new horizons! 🌏
                </p>
                <p className="text-xs text-blue-700 mt-3 italic">- The Royal Japan Airlines Family</p>
              </div>
            )}

            {/* Barcode */}
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <Image
                  src="/barcode.png"
                  alt="Boarding pass barcode"
                  width={400}
                  height={80}
                  className="w-full h-auto"
                />
                <p className="text-center text-xs text-gray-500 mt-2 font-mono tracking-widest">
                  {bookingRef}
                  {flightNumber.replace(/\s/g, "")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Stub with QR Code */}
          <div className="p-6 bg-gray-50 md:w-64 flex flex-col items-center justify-between">
            <div className="text-center space-y-4 w-full">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Flight</p>
                <p className="text-xl font-bold text-gray-900">{flightNumber}</p>
              </div>

              <div className="flex justify-between text-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase">From</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {departure.split(" ")[0] || from.substring(0, 3).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">To</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {arrival.split(" ")[0] || to.substring(0, 3).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Seat</p>
                <p className="text-3xl font-bold text-gray-900">{seatList[0]}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Gate</p>
                <p className="text-2xl font-bold text-blue-700">{gate}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Boarding</p>
                <p className="text-lg font-bold text-gray-900">{format(boardingTime, "HH:mm")}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-6">
              <div className="bg-white p-3 rounded-lg border-2 border-gray-300">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    `RJA-${bookingRef}-${flightNumber}-${seatList[0]}-${format(new Date(date), "yyyyMMdd")}`,
                  )}`}
                  alt="QR Code"
                  width={150}
                  height={150}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Scan at gate</p>
            </div>
          </div>
        </div>

        {/* Important Information Section */}
        <div className="p-6 bg-yellow-50 border-t-2 border-yellow-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Boarding gate closes 20 minutes before departure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Valid passport and visa (if required) must be presented at check-in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Please arrive at the airport at least 3 hours before international flights</span>
            </li>
            {isFarewellFlight && (
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✈️</span>
                <span className="font-semibold text-blue-800">
                  Commemorative certificate and gift will be distributed during the flight
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-blue-700 text-white hover:bg-blue-800">
              <Download className="mr-2 h-4 w-4" />
              Download Boarding Pass
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BoardingPassPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardingPassContent />
    </Suspense>
  )
}
