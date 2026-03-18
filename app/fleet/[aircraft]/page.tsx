import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const aircraftGalleries: Record<
  string,
  {
    name: string
    category: string
    heroImage: string
    specs: {
      capacity: string
      range: string
      cruiseSpeed: string
      engines: string
    }
    description: string
    routes: string
    gallery: Array<{
      image: string
      caption: string
    }>
  }
> = {
  "airbus-a380-800": {
    name: "Airbus A380-800",
    category: "Ultra Long-Haul Flagship",
    heroImage: "/fleet/a380-800-corrected.png",
    specs: {
      capacity: "525 passengers (3-class)",
      range: "15,200 km (8,200 nmi)",
      cruiseSpeed: "Mach 0.85 (903 km/h)",
      engines: "4× Rolls-Royce Trent 970",
    },
    description: "The world's largest passenger airliner, offering unmatched comfort and space on our longest routes.",
    routes: "Tokyo - London, New York, Los Angeles, Sydney",
    gallery: [
      {
        image: "/fleet/gallery/a380-birmingham.png",
        caption: "A380 at Birmingham ready for departure",
      },
      {
        image: "/fleet/gallery/a380-tokyo.png",
        caption: "A380 at Tokyo",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines A380",
      },
    ],
  },
  "boeing-777-300er": {
    name: "Boeing 777-300ER",
    category: "Long-Haul Workhorse",
    heroImage: "/fleet/777-300er-corrected.png",
    specs: {
      capacity: "350 passengers (3-class)",
      range: "14,594 km (7,880 nmi)",
      cruiseSpeed: "Mach 0.84 (905 km/h)",
      engines: "2× GE90-115B",
    },
    description:
      "Our flagship long-haul aircraft, combining exceptional range with fuel efficiency for intercontinental routes.",
    routes: "Tokyo - Europe, North America, Middle East",
    gallery: [
      {
        image: "/fleet/gallery/777-mt-fuji.png",
        caption: "777 taking off in golden hour over Mt. Fuji",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines 777-300ER",
      },
    ],
  },
  "boeing-747-8": {
    name: "Boeing 747-8",
    category: "Iconic Long-Haul",
    heroImage: "/fleet/747-8-corrected.png",
    specs: {
      capacity: "410 passengers (3-class)",
      range: "14,815 km (8,000 nmi)",
      cruiseSpeed: "Mach 0.855 (920 km/h)",
      engines: "4× GEnx-2B67",
    },
    description: "The Queen of the Skies continues to serve our premium long-haul routes with legendary comfort.",
    routes: "Tokyo - New York, London, Frankfurt",
    gallery: [
      {
        image: "/fleet/gallery/747-cherry-blossom.png",
        caption: "747 in special cherry blossom livery on way to Hawaii",
      },
      {
        image: "/fleet/gallery/747-descending-tokyo.png",
        caption: "747 descending into Tokyo after long flight from Moscow",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines 747-8",
      },
    ],
  },
  "airbus-a350-1000": {
    name: "Airbus A350-1000",
    category: "Ultra Long-Haul",
    heroImage: "/fleet/a350-1000-corrected.png",
    specs: {
      capacity: "366 passengers (3-class)",
      range: "16,100 km (8,700 nmi)",
      cruiseSpeed: "Mach 0.85 (910 km/h)",
      engines: "2× Rolls-Royce Trent XWB-97",
    },
    description:
      "Our newest flagship featuring cutting-edge technology, exceptional fuel efficiency, and the quietest cabin in the sky.",
    routes: "Tokyo - New York, London, Singapore, Sydney",
    gallery: [
      {
        image: "/fleet/gallery/a350-1000-takeoff.png",
        caption: "A350-1000 taking off from Tel Aviv",
      },
      {
        image: "/fleet/gallery/a350-1000-tokyo.png",
        caption: "A350-1000 at Tokyo",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines A350-1000",
      },
    ],
  },
  "airbus-a350-900": {
    name: "Airbus A350-900",
    category: "Long-Haul",
    heroImage: "/fleet/a350-1000.png",
    specs: {
      capacity: "325 passengers (3-class)",
      range: "15,000 km (8,100 nmi)",
      cruiseSpeed: "Mach 0.85 (910 km/h)",
      engines: "2× Rolls-Royce Trent XWB-84",
    },
    description:
      "Advanced wide-body aircraft with carbon fiber fuselage, offering exceptional range and passenger comfort.",
    routes: "Tokyo - Europe, North America, Southeast Asia",
    gallery: [
      {
        image: "/fleet/gallery/a350-900-ja482kr.png",
        caption: "JA482KR on its way from LAX to Tokyo",
      },
      {
        image: "/fleet/gallery/a350-900-amsterdam.png",
        caption: "A350-900 taking off from Amsterdam",
      },
      {
        image: "/fleet/gallery/a350-900-alternate-livery.png",
        caption: "A350-900 in alternate livery",
      },
    ],
  },
  "airbus-a340-600": {
    name: "Airbus A340-600",
    category: "Long-Haul",
    heroImage: "/fleet/a340.png",
    specs: {
      capacity: "320 passengers (3-class)",
      range: "14,600 km (7,900 nmi)",
      cruiseSpeed: "Mach 0.83 (890 km/h)",
      engines: "4× Rolls-Royce Trent 556",
    },
    description: "Four-engine reliability for long-haul routes, offering spacious cabins and smooth, quiet flight.",
    routes: "Tokyo - Europe, Middle East, South America",
    gallery: [
      {
        image: "/fleet/gallery/a340-cape-town.png",
        caption: "A340 on its way from Cape Town to Tokyo",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines A340-600",
      },
    ],
  },
  "boeing-737-700": {
    name: "Boeing 737-700",
    category: "Short to Medium-Haul",
    heroImage: "/fleet/airbus-a318.png",
    specs: {
      capacity: "149 passengers (2-class)",
      range: "6,230 km (3,365 nmi)",
      cruiseSpeed: "Mach 0.785 (842 km/h)",
      engines: "2× CFM56-7B24",
    },
    description: "Reliable narrow-body aircraft serving our regional and domestic routes with proven performance.",
    routes: "Domestic Japan, East Asia regional",
    gallery: [
      {
        image: "/fleet/gallery/737-sunset.png",
        caption: "737 flying at sunset above the clouds",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines 737-700",
      },
    ],
  },
  "boeing-787-9-dreamliner": {
    name: "Boeing 787-9 Dreamliner",
    category: "Medium to Long-Haul",
    heroImage: "/fleet/boeing-787-9.png",
    specs: {
      capacity: "290 passengers (3-class)",
      range: "14,140 km (7,635 nmi)",
      cruiseSpeed: "Mach 0.85 (913 km/h)",
      engines: "2× Rolls-Royce Trent 1000",
    },
    description:
      "Advanced composite aircraft offering superior passenger comfort with larger windows and better cabin pressure.",
    routes: "Tokyo - Southeast Asia, Australia, West Coast USA",
    gallery: [
      {
        image: "/fleet/gallery/787-9-imperial-horizon.png",
        caption: "787-9 in Imperial Horizon special livery being prepared for departure to Delhi",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines 787-9 Dreamliner",
      },
    ],
  },
  "airbus-a321-xlr": {
    name: "Airbus A321 XLR",
    category: "Long-Range Narrow-Body",
    heroImage: "/fleet/airbus-a321-xlr.png",
    specs: {
      capacity: "206 passengers (2-class)",
      range: "8,700 km (4,700 nmi)",
      cruiseSpeed: "Mach 0.78 (840 km/h)",
      engines: "2× CFM LEAP-1A",
    },
    description: "Extra long-range narrow-body enabling non-stop service to previously unreachable destinations.",
    routes: "Tokyo - Secondary European cities, Middle East",
    gallery: [
      {
        image: "/fleet/gallery/a321xlr-sunset.png",
        caption: "A321XLR flying at sunset",
      },
      {
        image: "/placeholder.svg?height=600&width=800",
        caption: "Royal Japan Airlines A321 XLR",
      },
    ],
  },
}

export default function AircraftDetailPage({ params }: { params: { aircraft: string } }) {
  const aircraft = aircraftGalleries[params.aircraft]

  if (!aircraft) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/fleet"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Fleet
          </Link>

          <div className="mb-12">
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
              <Image
                src={aircraft.heroImage || "/placeholder.svg"}
                alt={aircraft.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">
                {aircraft.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{aircraft.name}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{aircraft.description}</p>
            </div>
          </div>

          <Card className="mb-12">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                  <p className="text-lg font-semibold text-foreground">{aircraft.specs.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Range</p>
                  <p className="text-lg font-semibold text-foreground">{aircraft.specs.range}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cruise Speed</p>
                  <p className="text-lg font-semibold text-foreground">{aircraft.specs.cruiseSpeed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Engines</p>
                  <p className="text-lg font-semibold text-foreground">{aircraft.specs.engines}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-1">Typical Routes</p>
                <p className="text-foreground">{aircraft.routes}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Photo Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {aircraft.gallery.map((photo, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-[400px]">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.caption}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground">{photo.caption}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
