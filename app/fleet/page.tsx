import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fleetData = [
  {
    name: "Airbus A380-800",
    category: "Ultra Long-Haul Flagship",
    image: "/fleet/a380-800-corrected.png",
    specs: {
      capacity: "525 passengers (3-class)",
      range: "15,200 km (8,200 nmi)",
      cruiseSpeed: "Mach 0.85 (903 km/h)",
      engines: "4× Rolls-Royce Trent 970",
    },
    description: "The world's largest passenger airliner, offering unmatched comfort and space on our longest routes.",
    routes: "Tokyo - London, New York, Los Angeles, Sydney",
  },
  {
    name: "Boeing 777-300ER",
    category: "Long-Haul Workhorse",
    image: "/fleet/777-300er-corrected.png",
    specs: {
      capacity: "350 passengers (3-class)",
      range: "14,594 km (7,880 nmi)",
      cruiseSpeed: "Mach 0.84 (905 km/h)",
      engines: "2× GE90-115B",
    },
    description:
      "Our flagship long-haul aircraft, combining exceptional range with fuel efficiency for intercontinental routes.",
    routes: "Tokyo - Europe, North America, Middle East",
  },
  {
    name: "Boeing 747-8",
    category: "Iconic Long-Haul",
    image: "/fleet/747-8-corrected.png",
    specs: {
      capacity: "410 passengers (3-class)",
      range: "14,815 km (8,000 nmi)",
      cruiseSpeed: "Mach 0.855 (920 km/h)",
      engines: "4× GEnx-2B67",
    },
    description: "The Queen of the Skies continues to serve our premium long-haul routes with legendary comfort.",
    routes: "Tokyo - New York, London, Frankfurt",
  },
  {
    name: "Boeing 787-9 Dreamliner",
    category: "Medium to Long-Haul",
    image: "/fleet/boeing-787-9.png",
    specs: {
      capacity: "290 passengers (3-class)",
      range: "14,140 km (7,635 nmi)",
      cruiseSpeed: "Mach 0.85 (913 km/h)",
      engines: "2× Rolls-Royce Trent 1000",
    },
    description:
      "Advanced composite aircraft offering superior passenger comfort with larger windows and better cabin pressure.",
    routes: "Tokyo - Southeast Asia, Australia, West Coast USA",
  },
  {
    name: "Airbus A350-1000",
    category: "Ultra Long-Haul",
    image: "/fleet/a350-1000-corrected.png",
    specs: {
      capacity: "366 passengers (3-class)",
      range: "16,100 km (8,700 nmi)",
      cruiseSpeed: "Mach 0.85 (910 km/h)",
      engines: "2× Rolls-Royce Trent XWB-97",
    },
    description:
      "Our newest flagship featuring cutting-edge technology, exceptional fuel efficiency, and the quietest cabin in the sky.",
    routes: "Tokyo - New York, London, Singapore, Sydney",
  },
  {
    name: "Airbus A350-900",
    category: "Long-Haul",
    image: "/fleet/a350-1000.png",
    specs: {
      capacity: "325 passengers (3-class)",
      range: "15,000 km (8,100 nmi)",
      cruiseSpeed: "Mach 0.85 (910 km/h)",
      engines: "2× Rolls-Royce Trent XWB-84",
    },
    description:
      "Advanced wide-body aircraft with carbon fiber fuselage, offering exceptional range and passenger comfort.",
    routes: "Tokyo - Europe, North America, Southeast Asia",
  },
  {
    name: "Airbus A340-600",
    category: "Long-Haul",
    image: "/fleet/a340.png",
    specs: {
      capacity: "320 passengers (3-class)",
      range: "14,600 km (7,900 nmi)",
      cruiseSpeed: "Mach 0.83 (890 km/h)",
      engines: "4× Rolls-Royce Trent 556",
    },
    description: "Four-engine reliability for long-haul routes, offering spacious cabins and smooth, quiet flight.",
    routes: "Tokyo - Europe, Middle East, South America",
  },
  {
    name: "Airbus A330-900neo",
    category: "Medium to Long-Haul",
    image: "/fleet/a330-900.png",
    specs: {
      capacity: "287 passengers (3-class)",
      range: "13,334 km (7,200 nmi)",
      cruiseSpeed: "Mach 0.82 (880 km/h)",
      engines: "2× Rolls-Royce Trent 7000",
    },
    description: "Modern, fuel-efficient wide-body perfect for medium to long-haul routes with excellent economics.",
    routes: "Tokyo - Southeast Asia, India, Middle East, Australia",
  },
  {
    name: "Boeing 737-700",
    category: "Short to Medium-Haul",
    image: "/fleet/airbus-a318.png",
    specs: {
      capacity: "149 passengers (2-class)",
      range: "6,230 km (3,365 nmi)",
      cruiseSpeed: "Mach 0.785 (842 km/h)",
      engines: "2× CFM56-7B24",
    },
    description: "Reliable narrow-body aircraft serving our regional and domestic routes with proven performance.",
    routes: "Domestic Japan, East Asia regional",
  },
  {
    name: "Airbus A321 XLR",
    category: "Long-Range Narrow-Body",
    image: "/fleet/airbus-a321-xlr.png",
    specs: {
      capacity: "206 passengers (2-class)",
      range: "8,700 km (4,700 nmi)",
      cruiseSpeed: "Mach 0.78 (840 km/h)",
      engines: "2× CFM LEAP-1A",
    },
    description: "Extra long-range narrow-body enabling non-stop service to previously unreachable destinations.",
    routes: "Tokyo - Secondary European cities, Middle East",
  },
  {
    name: "Airbus A321neo",
    category: "Medium-Haul",
    image: "/fleet/a321neo-royal-japan-airlines-livery.jpg",
    specs: {
      capacity: "206 passengers (2-class)",
      range: "7,400 km (4,000 nmi)",
      cruiseSpeed: "Mach 0.78 (840 km/h)",
      engines: "2× CFM LEAP-1A",
    },
    description: "Fuel-efficient narrow-body with new engine technology, perfect for regional and medium-haul routes.",
    routes: "Tokyo - East Asia, Southeast Asia",
  },
  {
    name: "Airbus A320neo",
    category: "Short to Medium-Haul",
    image: "/fleet/a320neo-royal-japan-airlines-livery.jpg",
    specs: {
      capacity: "180 passengers (2-class)",
      range: "6,300 km (3,400 nmi)",
      cruiseSpeed: "Mach 0.78 (840 km/h)",
      engines: "2× CFM LEAP-1A",
    },
    description:
      "Modern, efficient narrow-body serving our regional network with reduced fuel consumption and emissions.",
    routes: "Domestic Japan, East Asia, Southeast Asia",
  },
  {
    name: "Boeing 767-400ER",
    category: "Medium to Long-Haul",
    image: "/fleet/767-400.png",
    specs: {
      capacity: "245 passengers (3-class)",
      range: "10,415 km (5,625 nmi)",
      cruiseSpeed: "Mach 0.80 (851 km/h)",
      engines: "2× Pratt & Whitney PW4062",
    },
    description:
      "Versatile wide-body aircraft perfect for medium to long-haul routes, offering a spacious cabin and reliable performance.",
    routes: "Tokyo - North America, Europe, Southeast Asia",
  },
]

const retroFleetData = [
  {
    name: "Airbus A318",
    category: "Short-Haul Regional",
    image: "/fleet/boeing-737-700-updated.png",
    specs: {
      capacity: "132 passengers (2-class)",
      range: "5,750 km (3,100 nmi)",
      cruiseSpeed: "Mach 0.78 (840 km/h)",
      engines: "2× CFM56-5B",
    },
    description:
      "Compact narrow-body that served domestic and short regional routes with excellent airport performance. Faithfully operated from 2010 until retirement in December 2025, completing over 50,000 flights.",
    status: "Retired December 2025",
  },
  {
    name: "Saab 340",
    category: "Regional Turboprop",
    image: "/fleet/saab-340.png",
    specs: {
      capacity: "34 passengers",
      range: "1,735 km (935 nmi)",
      cruiseSpeed: "467 km/h (290 mph)",
      engines: "2× General Electric CT7-9B",
    },
    description:
      "Efficient regional turboprop that connected smaller airports and island destinations with excellent economics. Retired as part of fleet modernization in December 2025.",
    status: "Retired December 2025",
  },
  {
    name: "Lockheed L-1011-1 TriStar",
    category: "Retired Wide-Body",
    image: "/fleet/l-1011-tristar.png",
    specs: {
      capacity: "345 passengers (3-class)",
      range: "7,870 km (4,250 nmi)",
      cruiseSpeed: "Mach 0.84 (890 km/h)",
      engines: "3× Rolls-Royce RB211-22B",
    },
    description:
      "The Lockheed L-1011-1 TriStar was a cornerstone of Royal Japan Airlines' fleet from 1981 to the late 1990s, ushering in a new era of long-haul and regional travel. Renowned for its smooth ride, advanced autoland system, and quiet performance, the TriStar connected Japan to key international destinations with its 4,250-nautical-mile range and Mach 0.84 cruising speed. Serving routes such as Tokyo–Hong Kong, Osaka–Bangkok, and Nagoya–Manila, the L-1011-1 played a vital role in expanding the airline's global reach. Though retired in the late 1990s, its legacy remains a symbol of innovation, efficiency, and the golden age of widebody travel at Royal Japan Airlines.",
    status: "Museum",
  },
  {
    name: "Douglas DC-3",
    category: "Historic Propeller",
    image: "/fleet/dc-3-mount-fuji.png",
    specs: {
      capacity: "32 passengers",
      range: "2,778 km (1,500 nmi)",
      cruiseSpeed: "333 km/h (207 mph)",
      engines: "2× Pratt & Whitney R-1830 Twin Wasp",
    },
    description:
      "The Douglas DC-3 was a foundational aircraft in Royal Japan Airlines' early fleet, playing a crucial role in establishing domestic and regional air travel from the 1940s to the 1960s. Renowned for its rugged reliability, efficiency, and versatility, the DC-3 revolutionized commercial aviation, making air travel more accessible and widespread. With a 1,500-nautical-mile range and a cruising speed of 207 mph (333 km/h), it was instrumental in connecting Japan's major cities and surrounding regions. Serving routes such as Tokyo–Osaka, Fukuoka–Sapporo, and Nagoya–Seoul, the DC-3 helped lay the foundation for Royal Japan Airlines' expansion into international markets. Though retired in the 1960s, its legacy remains a symbol of pioneering aviation, reliability, and the golden age of propeller-driven air travel at Royal Japan Airlines.",
    status: "Museum/Scrapped",
  },
  {
    name: "Concorde",
    category: "Supersonic",
    image: "/fleet/concorde-supersonic.png",
    specs: {
      capacity: "100 passengers (single-class)",
      range: "7,250 km (3,900 nmi)",
      cruiseSpeed: "Mach 2.04 (2,179 km/h)",
      engines: "4× Rolls-Royce/Snecma Olympus 593",
    },
    description: "Supersonic marvel reactivated for premium service, representing the pinnacle of aviation technology.",
    status: "Reactivated",
  },
  {
    name: "Boeing 747-100",
    category: "Retired Wide-Body",
    image: "/fleet/747-100.png",
    specs: {
      capacity: "366 passengers (3-class)",
      range: "9,800 km (5,300 nmi)",
      cruiseSpeed: "Mach 0.85 (895 km/h)",
      engines: "4× Pratt & Whitney JT9D-7A",
    },
    description:
      "The original Queen of the Skies that revolutionized long-haul travel. Retired in 1999 after decades of faithful service.",
    status: "Retired 1999",
  },
  {
    name: "Airbus A340-600",
    category: "Long-Haul",
    image: "/fleet/a340.png",
    specs: {
      capacity: "320 passengers (3-class)",
      range: "14,600 km (7,900 nmi)",
      cruiseSpeed: "Mach 0.83 (890 km/h)",
      engines: "4× Rolls-Royce Trent 556",
    },
    description:
      "Four-engine reliability for long-haul routes. 10 airframes have left the fleet, with 4 still operating on select routes.",
    status: "Partially Retired (4 remain)",
  },
]

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Fleet</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Royal Japan Airlines operates one of the most modern and diverse fleets in the world, featuring 17
              aircraft types ranging from regional turboprops to supersonic jets, ensuring the perfect aircraft for
              every route.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/fleet/registry"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg"
              >
                Click here to view each aircraft in our fleet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/fleet/seat-maps"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg"
              >
                Click here to view seat maps for every aircraft in our fleet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid gap-8">
            {fleetData.map((aircraft, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-full min-h-[300px]">
                      <Image
                        src={aircraft.image || "/placeholder.svg"}
                        alt={aircraft.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="mb-3">
                        <Badge variant="secondary" className="mb-2">
                          {aircraft.category}
                        </Badge>
                        <Link href={`/fleet/${aircraft.name.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}>
                          <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                            {aircraft.name}
                          </h2>
                        </Link>
                      </div>
                      <p className="text-muted-foreground mb-4">{aircraft.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Capacity</p>
                          <p className="text-sm font-semibold text-foreground">{aircraft.specs.capacity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Range</p>
                          <p className="text-sm font-semibold text-foreground">{aircraft.specs.range}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Cruise Speed</p>
                          <p className="text-sm font-semibold text-foreground">{aircraft.specs.cruiseSpeed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Engines</p>
                          <p className="text-sm font-semibold text-foreground">{aircraft.specs.engines}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Typical Routes</p>
                        <p className="text-sm text-foreground">{aircraft.routes}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Retro Fleet</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Aircraft that have left our fleet or are now stored either in museums or scrapped entirely. These
                legendary aircraft represent our proud aviation heritage and the evolution of air travel.
              </p>
            </div>

            <div className="grid gap-8">
              {retroFleetData.map((aircraft, index) => (
                <Card key={index} className="overflow-hidden opacity-90">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-full min-h-[300px]">
                        <Image
                          src={aircraft.image || "/placeholder.svg"}
                          alt={aircraft.name}
                          fill
                          className="object-cover grayscale-[30%]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <div className="mb-3">
                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary">{aircraft.category}</Badge>
                            <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                              {aircraft.status}
                            </Badge>
                          </div>
                          <h2 className="text-2xl font-bold text-foreground">{aircraft.name}</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">{aircraft.description}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Capacity</p>
                            <p className="text-sm font-semibold text-foreground">{aircraft.specs.capacity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Range</p>
                            <p className="text-sm font-semibold text-foreground">{aircraft.specs.range}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Cruise Speed</p>
                            <p className="text-sm font-semibold text-foreground">{aircraft.specs.cruiseSpeed}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Engines</p>
                            <p className="text-sm font-semibold text-foreground">{aircraft.specs.engines}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-bold text-foreground mb-3">Fleet Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">18</p>
                <p className="text-sm text-muted-foreground">Aircraft Types</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">150+</p>
                <p className="text-sm text-muted-foreground">Total Aircraft</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">5.2</p>
                <p className="text-sm text-muted-foreground">Average Fleet Age (years)</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">300+</p>
                <p className="text-sm text-muted-foreground">Destinations Served</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
