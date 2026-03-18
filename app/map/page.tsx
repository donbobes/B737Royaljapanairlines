import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InteractiveRouteMap } from "@/components/interactive-route-map"

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Interactive Route Map</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl leading-relaxed">
              Explore our global network and discover connections between destinations worldwide.
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <InteractiveRouteMap />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
