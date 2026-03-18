"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeftRight, CalendarIcon, Search, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { FlightResults } from "@/components/flight-results"

const airports = [
  { code: "RJTT", city: "Tokyo Haneda", name: "Tokyo Haneda Airport" },
  { code: "EGLL", city: "London", name: "Heathrow" },
  { code: "LFPG", city: "Paris", name: "Charles de Gaulle" },
  { code: "LEMD", city: "Madrid", name: "Madrid-Barajas" },
  { code: "EHAM", city: "Amsterdam", name: "Schiphol" },
  { code: "LIMC", city: "Milan", name: "Malpensa" },
  { code: "EDDF", city: "Frankfurt", name: "Frankfurt Airport" },
  { code: "LSZH", city: "Zurich", name: "Zurich Airport" },
  { code: "EGCC", city: "Manchester", name: "Manchester Airport" },
  { code: "LPPT", city: "Lisbon", name: "Lisbon Airport" },
  { code: "EBBR", city: "Brussels", name: "Brussels Airport" },
  { code: "LEBL", city: "Barcelona", name: "Barcelona-El Prat" },
  { code: "LEIB", city: "Ibiza", name: "Ibiza Airport" },
  { code: "ESSA", city: "Stockholm", name: "Arlanda" },
  { code: "EKCH", city: "Copenhagen", name: "Copenhagen Airport" },
  { code: "ENGM", city: "Oslo", name: "Oslo Airport" },
  { code: "EFHK", city: "Helsinki", name: "Helsinki-Vantaa" },
  { code: "EDDM", city: "Munich", name: "Munich Airport" },
  { code: "EPWA", city: "Warsaw", name: "Warsaw Chopin" },
  { code: "LHBP", city: "Budapest", name: "Budapest Airport" },
  { code: "LOWW", city: "Vienna", name: "Vienna Airport" },
  { code: "LKPR", city: "Prague", name: "Prague Airport" },
  { code: "KJFK", city: "New York", name: "JFK International" },
  { code: "KBOS", city: "Boston", name: "Logan International" },
  { code: "KIAD", city: "Washington D.C.", name: "Dulles International" },
  { code: "KLAS", city: "Las Vegas", name: "McCarran International" },
  { code: "KHNL", city: "Honolulu", name: "Honolulu International" },
  { code: "KMIA", city: "Miami", name: "Miami International" },
  { code: "KSFO", city: "San Francisco", name: "San Francisco International" },
  { code: "KATL", city: "Atlanta", name: "Hartsfield-Jackson" },
  { code: "KLAX", city: "Los Angeles", name: "Los Angeles International" },
  { code: "CYYZ", city: "Toronto", name: "Toronto Pearson" },
  { code: "CYUL", city: "Montreal", name: "Montreal-Trudeau" },
  { code: "CYHZ", city: "Halifax", name: "Halifax Stanfield" },
  { code: "MMMX", city: "Mexico City", name: "Mexico City International" },
  { code: "SBGR", city: "São Paulo", name: "Guarulhos International" },
  { code: "SKBO", city: "Bogotá", name: "El Dorado International" },
  { code: "SCEL", city: "Santiago", name: "Santiago International" },
  { code: "ULLI", city: "St. Petersburg", name: "Pulkovo Airport" },
  { code: "UHWW", city: "Vladivostok", name: "Vladivostok International" },
  { code: "OMDB", city: "Dubai", name: "Dubai International" },
  { code: "LTFM", city: "Istanbul", name: "Istanbul Airport" },
  { code: "OMAA", city: "Abu Dhabi", name: "Abu Dhabi International" },
  { code: "OTHH", city: "Doha", name: "Hamad International" },
  { code: "OERK", city: "Riyadh", name: "King Khalid International" },
  { code: "OEJN", city: "Jeddah", name: "King Abdulaziz International" },
  { code: "OKBK", city: "Kuwait City", name: "Kuwait International" },
  { code: "OOMS", city: "Muscat", name: "Muscat International" },
  { code: "OBBI", city: "Manama", name: "Bahrain International" },
  { code: "OEDF", city: "Dammam", name: "King Fahd International" },
  { code: "OJAI", city: "Amman", name: "Queen Alia International" },
  { code: "WSSS", city: "Singapore", name: "Changi Airport" },
  { code: "VVTS", city: "Ho Chi Minh City", name: "Tan Son Nhat" },
  { code: "RPLL", city: "Manila", name: "Ninoy Aquino International" },
  { code: "WMKK", city: "Kuala Lumpur", name: "Kuala Lumpur International" },
  { code: "VTBS", city: "Bangkok", name: "Suvarnabhumi" },
  { code: "VTCC", city: "Chiang Mai", name: "Chiang Mai International" },
  { code: "WBKK", city: "Kota Kinabalu", name: "Kota Kinabalu International" },
  { code: "WMKP", city: "Penang", name: "Penang International" },
  { code: "WIII", city: "Jakarta", name: "Soekarno-Hatta" },
  { code: "WAAA", city: "Makassar", name: "Sultan Hasanuddin" },
  { code: "VVNB", city: "Hanoi", name: "Noi Bai International" },
  { code: "VVDN", city: "Da Nang", name: "Da Nang International" },
  { code: "VABB", city: "Mumbai", name: "Chhatrapati Shivaji" },
  { code: "VNKT", city: "Kathmandu", name: "Tribhuvan International" },
  { code: "YSSY", city: "Sydney", name: "Kingsford Smith" },
  { code: "YPPH", city: "Perth", name: "Perth Airport" },
  { code: "YMML", city: "Melbourne", name: "Melbourne Airport" },
  { code: "YBBN", city: "Brisbane", name: "Brisbane Airport" },
  { code: "NZAA", city: "Auckland", name: "Auckland Airport" },
  { code: "RKSI", city: "Seoul", name: "Incheon International" },
  { code: "RKPK", city: "Busan", name: "Gimhae International" },
  { code: "RKPC", city: "Jeju", name: "Jeju International" },
  { code: "VHHH", city: "Hong Kong", name: "Hong Kong International" },
  { code: "VMMC", city: "Macau", name: "Macau International" },
  { code: "RCSS", city: "Taipei", name: "Taipei Songshan" },
  { code: "ZGSZ", city: "Shenzhen", name: "Shenzhen Bao'an" },
  { code: "ZBAA", city: "Beijing", name: "Beijing Capital" },
  { code: "ZSHC", city: "Hangzhou", name: "Hangzhou Xiaoshan" },
  { code: "ZSPD", city: "Shanghai", name: "Shanghai Pudong" },
  { code: "ZSSS", city: "Shanghai", name: "Shanghai Hongqiao" },
  { code: "ZGGG", city: "Guangzhou", name: "Guangzhou Baiyun" },
  { code: "RJFF", city: "Fukuoka", name: "Fukuoka Airport" },
  { code: "ROAH", city: "Naha", name: "Naha Airport" },
  { code: "RJBB", city: "Osaka", name: "Kansai International" },
  { code: "RJOO", city: "Osaka", name: "Osaka Itami" },
  { code: "RJOA", city: "Hiroshima", name: "Hiroshima Airport" },
  { code: "RJEC", city: "Asahikawa", name: "Asahikawa Airport" },
  { code: "RJCH", city: "Hakodate", name: "Hakodate Airport" },
]

export function FlightSearchForm() {
  const searchParams = useSearchParams()
  const [tripType, setTripType] = useState("round-trip")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departDate, setDepartDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const fromParam = searchParams.get("from")
    const toParam = searchParams.get("to")

    if (fromParam) setFrom(fromParam)
    if (toParam) setTo(toParam)
  }, [searchParams])

  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }

  if (showResults) {
    return (
      <FlightResults
        from={from}
        to={to}
        departDate={departDate}
        returnDate={returnDate}
        passengers={passengers}
        cabinClass={cabinClass}
        tripType={tripType}
        onBack={() => setShowResults(false)}
      />
    )
  }

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div>
        <RadioGroup value={tripType} onValueChange={setTripType} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip" className="cursor-pointer">
              Round Trip
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way" className="cursor-pointer">
              One Way
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Select value={from} onValueChange={setFrom} required>
              <SelectTrigger id="from" className="pl-10">
                <SelectValue placeholder="Select departure city" />
              </SelectTrigger>
              <SelectContent>
                {airports.map((airport) => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.city} ({airport.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="to">To</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Select value={to} onValueChange={setTo} required>
              <SelectTrigger id="to" className="pl-10">
                <SelectValue placeholder="Select destination city" />
              </SelectTrigger>
              <SelectContent>
                {airports.map((airport) => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.city} ({airport.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute -left-3 top-8 md:left-1/2 md:-translate-x-1/2 md:top-8 z-10 bg-background border border-border hover:bg-muted"
            onClick={handleSwap}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !departDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departDate}
                onSelect={setDepartDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {tripType === "round-trip" && (
          <div className="space-y-2">
            <Label>Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  disabled={(date) => date < (departDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger id="passengers">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Passenger" : "Passengers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cabin-class">Cabin Class</Label>
          <Select value={cabinClass} onValueChange={setCabinClass}>
            <SelectTrigger id="cabin-class">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </Button>
    </form>
  )
}
