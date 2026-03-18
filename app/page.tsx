import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, MapPin, Clock, Shield, Award, Users } from "lucide-react"
import Link from "next/link"
import { HeroCarousel } from "@/components/hero-carousel"
import { A318Countdown } from "@/components/a318-countdown"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <HeroCarousel />
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                Experience Japan's Premier Airline
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                From Tokyo Haneda to the world. Discover exceptional service, comfort, and connectivity across 6
                continents with Royal Japan Airlines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="/book">Book Your Flight</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  <Link href="/routes">Explore Routes</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Royal Japan Airlines?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                We are committed to making your journey comfortable, safe, and memorable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Safety First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our fleet meets the highest safety standards with regular maintenance and certified crew.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">On-Time Performance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    98% on-time departure rate. We value your time as much as you do.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Award-Winning Service</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Recognized globally for exceptional customer service and in-flight experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* A318 Farewell Flight Announcement Section */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full mb-4">
                <Plane className="w-5 h-5 text-primary-foreground" />
                <span className="text-sm font-semibold uppercase tracking-wide text-primary-foreground">
                  Historic Flight
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-primary-foreground">
                Final A318 Has Landed - We Thank You For Being Part of Our Journey
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-2">
                Flight RJA402 from Seoul (RKSI) to Tokyo Haneda (RJTT)
              </p>
              <p className="text-primary-foreground/80 mb-6">
                December 6, 2025 - Thank you to everyone who joined us for this historic final flight of our iconic A318
                fleet
              </p>
              <Button
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8"
              >
                <Link href="/book-a318-farewell">View Flight Details</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <A318Countdown />
          </div>
        </section>

        {/* Popular Routes Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Popular Routes</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Discover our most traveled destinations from Tokyo Haneda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  from: "Tokyo (HND)",
                  to: "London (LHR)",
                  price: "¥85,000",
                  duration: "12h 30m",
                  flight: "RJA101",
                  image: "/cities/london.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "New York (JFK)",
                  price: "¥95,000",
                  duration: "13h 15m",
                  flight: "RJA151",
                  image: "/cities/new-york.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Singapore (SIN)",
                  price: "¥45,000",
                  duration: "7h 20m",
                  flight: "RJA231",
                  image: "/cities/singapore.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Sydney (SYD)",
                  price: "¥68,000",
                  duration: "9h 45m",
                  flight: "RJA301",
                  image: "/cities/sydney.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Paris (CDG)",
                  price: "¥88,000",
                  duration: "13h 10m",
                  flight: "RJA103",
                  image: "/cities/paris.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Dubai (DXB)",
                  price: "¥72,000",
                  duration: "10h 30m",
                  flight: "RJA201",
                  image: "/cities/dubai.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "San Francisco (SFO)",
                  price: "¥92,000",
                  duration: "10h 45m",
                  flight: "RJA161",
                  image: "/cities/san-francisco.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Las Vegas (LAS)",
                  price: "¥89,000",
                  duration: "11h 30m",
                  flight: "RJA162",
                  image: "/cities/las-vegas.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Boston (BOS)",
                  price: "¥96,000",
                  duration: "13h 45m",
                  flight: "RJA163",
                  image: "/cities/boston.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Prague (PRG)",
                  price: "¥82,000",
                  duration: "12h 15m",
                  flight: "RJA105",
                  image: "/cities/prague.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Vienna (VIE)",
                  price: "¥84,000",
                  duration: "12h 20m",
                  flight: "RJA106",
                  image: "/cities/vienna.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Washington DC (IAD)",
                  price: "¥94,000",
                  duration: "13h 30m",
                  flight: "RJA164",
                  image: "/cities/washington-dc.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Atlanta (ATL)",
                  price: "¥93,000",
                  duration: "13h 20m",
                  flight: "RJA165",
                  image: "/cities/atlanta.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Honolulu (HNL)",
                  price: "¥58,000",
                  duration: "7h 30m",
                  flight: "RJA351",
                  image: "/cities/honolulu.jpg",
                },
                {
                  from: "Tokyo (HND)",
                  to: "Miami (MIA)",
                  price: "¥97,000",
                  duration: "14h 15m",
                  flight: "RJA166",
                  image: "/cities/miami.jpg",
                },
              ].map((route, index) => (
                <Card key={index} className="overflow-hidden border-border hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url('${route.image}')` }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">{route.from}</span>
                      <Plane className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{route.to}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">From</p>
                        <p className="text-2xl font-bold text-primary">{route.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="text-sm font-medium text-foreground">{route.duration}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">Flight {route.flight}</p>
                    <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/book">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
                <div className="text-primary-foreground/80">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">900+</div>
                <div className="text-primary-foreground/80">Daily Flights</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">15M+</div>
                <div className="text-primary-foreground/80">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
                <div className="text-primary-foreground/80">On-Time Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Card className="border-border bg-muted/30">
              <CardContent className="p-8 md:p-12 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to Take Off?</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join millions of satisfied travelers and experience the Royal Japan Airlines difference today.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/book">Start Your Journey</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
