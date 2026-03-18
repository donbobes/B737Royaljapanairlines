"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Plane, Clock, Search } from "lucide-react"
import Link from "next/link"
import { routes, regions } from "@/lib/routes-data"
import { getCityscapeImage } from "@/lib/cityscape-images"
import { useState } from "react"
import Image from "next/image"
import { ChristmasCountdown } from "@/components/christmas-countdown"
import { isChristmasSaleActive } from "@/lib/christmas-sale"

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const saleActive = isChristmasSaleActive()

  const filteredRoutes = routes.filter((route) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      route.from.toLowerCase().includes(query) ||
      route.to.toLowerCase().includes(query) ||
      route.fromCode.toLowerCase().includes(query) ||
      route.toCode.toLowerCase().includes(query) ||
      route.flightNumber.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {saleActive ? (
          <section className="relative">
            <div className="relative w-full aspect-[1280/570] max-h-[570px] overflow-hidden">
              <Image
                src="/christmas-sale-banner.png"
                alt="Christmas Savings - 20% Off All Flights Until January 12th"
                fill
                className="object-cover"
                priority
              />
              {/* Countdown overlay in top-right */}
              <div className="absolute top-4 right-4">
                <ChristmasCountdown />
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-primary text-primary-foreground py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Our Global Network</h1>
                  <p className="text-lg text-primary-foreground/90 max-w-2xl leading-relaxed">
                    Explore our extensive network connecting Tokyo Haneda to over 200 destinations across 6 continents.
                  </p>
                </div>
                <div className="md:ml-auto">
                  <ChristmasCountdown />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search routes by city, airport code, or flight number..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Routes Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" className="w-full">
              <div className="overflow-x-auto pb-4">
                <TabsList className="inline-flex w-auto min-w-full md:min-w-0">
                  {regions.map((region) => (
                    <TabsTrigger key={region.value} value={region.value} className="whitespace-nowrap">
                      {region.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {regions.map((region) => (
                <TabsContent key={region.value} value={region.value} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoutes
                      .filter((route) => region.value === "all" || route.region === region.value)
                      .map((route) => (
                        <RouteCard key={route.id} route={route} />
                      ))}
                  </div>
                  {filteredRoutes.filter((route) => region.value === "all" || route.region === region.value).length ===
                    0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No routes found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">70+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">6</div>
                <div className="text-muted-foreground">Continents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">900+</div>
                <div className="text-muted-foreground">Daily Flights</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function RouteCard({ route }: { route: (typeof routes)[0] }) {
  const bookingUrl = `/book?from=${encodeURIComponent(route.fromCode)}&to=${encodeURIComponent(route.toCode)}&flightNumber=${encodeURIComponent(route.flightNumber)}`

  return (
    <Card className="border-border hover:shadow-lg transition-shadow group overflow-hidden">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={getCityscapeImage(route.to) || "/placeholder.svg"}
          alt={`${route.to} cityscape`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {route.terminated && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-600 text-white hover:bg-red-700">TERMINATED</Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-foreground">{route.to}</h3>
          <p className="text-sm text-muted-foreground">{route.toCode}</p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {route.popular && <Badge className="bg-secondary text-secondary-foreground">Popular Route</Badge>}
          {route.terminated && <Badge className="bg-red-600 text-white hover:bg-red-700">Route Terminated</Badge>}
          {route.codeshare && (
            <Badge variant="outline" className="ml-2">
              Codeshare
            </Badge>
          )}
          {route.seasonal && (
            <Badge variant="outline" className="ml-2">
              {route.seasonal}
            </Badge>
          )}

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{route.from}</p>
                <p className="text-xs text-muted-foreground">{route.fromCode}</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Plane className="w-5 h-5 text-muted-foreground rotate-90" />
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{route.to}</p>
                <p className="text-xs text-muted-foreground">{route.toCode}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{route.duration}</span>
              </div>
              <span className="text-muted-foreground">{route.frequency}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">¥{route.fromPrice.toLocaleString()}</span>
              </div>
              <span className="text-xs text-muted-foreground">from</span>
            </div>
            <p className="text-xs text-muted-foreground">Flight {route.flightNumber}</p>
            {route.codeshare && <p className="text-xs text-muted-foreground italic">Operated with {route.codeshare}</p>}
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href={bookingUrl}>Book Flight</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
