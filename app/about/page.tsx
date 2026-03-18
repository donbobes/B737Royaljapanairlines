import Link from "next/link"
import { ArrowRight, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  // Simple randomized suggested pages
  const allSuggestions = [
    { title: "Check Out Our Routes", description: "Explore our extensive network of destinations", href: "/routes" },
    { title: "Our Diverse Fleet", description: "Discover our modern aircraft collection", href: "/fleet" },
    { title: "Inflight Menu", description: "View our premium dining options", href: "/inflight-menu" },
    { title: "Entertainment", description: "Experience world-class entertainment", href: "/entertainment" },
    { title: "Book a Flight", description: "Start your journey with us today", href: "/book" },
    { title: "Flight Updates", description: "Stay informed with the latest news", href: "/updates" },
  ]

  const suggestedPages = allSuggestions.sort(() => Math.random() - 0.5).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
            <Plane className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Royal Japan Airlines</h1>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6 mb-16">
          <p>
            Royal Japan Airlines is a premier international airline headquartered in Tokyo, operating out of both Tokyo
            Haneda (HND) and Tokyo Narita (NRT). Known for its commitment to excellence, the airline serves a diverse
            network ranging from short regional island services to ultra-long-haul intercontinental routes. With flights
            as short as 20 minutes and journeys exceeding 20 hours to destinations in South America, Royal Japan
            Airlines connects Japan to the world with consistency and reliability.
          </p>
          <p>
            The airline operates a modern and diverse{" "}
            <Link href="/fleet" className="text-primary underline hover:text-primary/80 transition-colors font-medium">
              fleet
            </Link>{" "}
            designed to handle a wide range of missions, from high-frequency domestic shuttle services to long-range
            widebody operations.
          </p>
        </div>

        {/* Suggested Pages */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Suggested Pages to Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedPages.map((page) => (
              <Card key={page.href} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{page.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{page.description}</p>
                  <Link href={page.href}>
                    <Button variant="ghost" size="sm" className="group">
                      Visit
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
