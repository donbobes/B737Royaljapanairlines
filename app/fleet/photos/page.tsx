import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fleetPhotos = [
  {
    registration: "JA858J",
    aircraft: "Airbus A350-1000",
    title: "After 14 Hours from New York",
    description:
      "JA858J being unloaded after completing a 14-hour ultra long-haul flight from New York JFK to Tokyo Haneda. Ground crew efficiently handle baggage operations as the aircraft prepares for its next departure.",
    image: "/images/image.png",
    location: "Tokyo Haneda International Airport",
  },
  {
    registration: "JA121KR",
    aircraft: "Airbus A350-900",
    title: "Visit Japan Special Livery",
    description:
      "JA121KR adorned in our exclusive Visit Japan special livery on final approach to Tokyo Haneda. This stunning livery promotes Japanese tourism and showcases our commitment to sharing Japanese culture with the world.",
    image: "/images/image.jpeg",
    location: "Tokyo Haneda RWY 34R Final Approach",
    specialLivery: true,
  },
  {
    registration: "JA###KR",
    aircraft: "Airbus A321 XLR",
    title: "Departure from Shanghai",
    description:
      "One of our state-of-the-art A321 XLRs lifting off from Shanghai Pudong International Airport. The extra long-range variant enables us to connect secondary cities across Asia and Europe with unmatched efficiency.",
    image: "/images/image.png",
    location: "Shanghai Pudong International Airport",
  },
  {
    registration: "JA725RJ",
    aircraft: "Boeing 777-300ER",
    title: "World Athletics Championship",
    description:
      "JA725RJ showcasing our eye-catching World Athletics Championship special livery during takeoff. This commemorative design celebrates our partnership with World Athletics and promotes sporting excellence worldwide.",
    image: "/images/image.png",
    location: "Takeoff",
    specialLivery: true,
  },
]

export default function FleetPhotosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Fleet Photography</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore stunning photographs of Royal Japan Airlines aircraft in operation around the world. From ultra
              long-haul flagships to our special livery aircraft, witness the beauty of our fleet in action.
            </p>
          </div>

          <div className="grid gap-8">
            {fleetPhotos.map((photo, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-full min-h-[400px]">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={`${photo.aircraft} ${photo.registration}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="mb-4">
                        <div className="flex gap-2 mb-3">
                          <Badge variant="default">{photo.aircraft}</Badge>
                          {photo.specialLivery && (
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              Special Livery
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-1">{photo.title}</h2>
                        <p className="text-sm text-muted-foreground font-mono">{photo.registration}</p>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{photo.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 bg-muted rounded-lg text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Want to Share Your Photos?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have you captured our aircraft during your travels? We'd love to see your Royal Japan Airlines
              photography! Share your photos with us on social media using #RoyalJapanAirlines.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
