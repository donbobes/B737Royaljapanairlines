"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Plane, Calendar, MapPin, LogOut, User } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface BookedFlight {
  id: string
  flight_number: string
  from_airport: string
  to_airport: string
  departure_time: string
  arrival_time: string
  flight_date: string
  seats: string
  cabin_class: string
  passengers: number
  aircraft: string
  registration: string
  price: number
  passenger_name: string
  created_at: string
}

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [flights, setFlights] = useState<BookedFlight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: flightsData } = await supabase
          .from("booked_flights")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (flightsData) {
          setFlights(flightsData)
        }
      }

      setLoading(false)
    }
    loadData()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url || "/placeholder.svg"}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-primary"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {user?.user_metadata?.full_name || user?.user_metadata?.name || "My Account"}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Flights Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">My Flights</h2>

          {flights.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-16 text-center">
                <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No flights booked yet</h3>
                <p className="text-muted-foreground mb-6">
                  Your booked flights will appear here once you make a booking while signed in.
                </p>
                <Button
                  onClick={() => router.push("/book")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Book a Flight
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Plane className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-foreground text-lg">{flight.flight_number}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {flight.cabin_class.charAt(0).toUpperCase() + flight.cabin_class.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-sm">
                              {flight.from_airport} → {flight.to_airport}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-sm">
                          <div className="text-muted-foreground">Date</div>
                          <div className="font-medium text-foreground flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(flight.flight_date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-muted-foreground">Times</div>
                          <div className="font-medium text-foreground">
                            {flight.departure_time} - {flight.arrival_time}
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-muted-foreground">Aircraft</div>
                          <div className="font-medium text-foreground">{flight.aircraft}</div>
                        </div>
                        <div className="text-sm">
                          <div className="text-muted-foreground">Seat(s)</div>
                          <div className="font-medium text-foreground">{flight.seats}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-muted-foreground text-sm">Price</div>
                          <div className="font-bold text-primary text-lg">
                            ¥{flight.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
