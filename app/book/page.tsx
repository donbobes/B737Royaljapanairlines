"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FlightSearchForm } from "@/components/flight-search-form"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, Calendar, Users, CreditCard } from "lucide-react"
import { Suspense } from "react"

function BookPageContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Book Your Flight</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl leading-relaxed">
              Search and book flights to over 150 destinations worldwide with ease.
            </p>
          </div>
        </section>

        {/* Search Form Section */}
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card className="border-border shadow-lg">
              <CardContent className="p-6 md:p-8">
                <Suspense fallback={<div>Loading...</div>}>
                  <FlightSearchForm />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">1. Search Flights</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enter your travel details and search available flights
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">2. Select Date</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Choose your preferred departure and return dates
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">3. Add Passengers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enter passenger information and select seats
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">4. Complete Payment</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Secure payment and receive instant confirmation
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookPageContent />
    </Suspense>
  )
}
