"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RouteMap } from "@/components/route-map"

export default function RouteMapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-[#0a0e27]">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-b from-primary/20 to-transparent">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-balance">Global Route Network</h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Explore our extensive network connecting Tokyo Haneda to over 200 destinations worldwide. Click on any
              route to view flight details.
            </p>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="py-8">
          <RouteMap />
        </section>
      </main>

      <Footer />
    </div>
  )
}
