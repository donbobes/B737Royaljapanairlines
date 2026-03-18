import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import Image from "next/image"

export default function SeatingClassesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold mb-6 text-balance">Experience Comfort in Every Class</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Royal Japan Airlines offers exceptional service across all cabin classes, blending Japanese hospitality
              with modern comfort and convenience.
            </p>
          </div>
        </section>

        {/* Economy Class Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-[400px] md:h-auto">
                  <Image src="/economy-class.png" alt="Economy Class Cabin" fill className="object-cover" priority />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-4xl font-bold mb-3">Economy Class</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Royal Japan Airlines' most cost-efficient class, perfect for travelers seeking value without
                      compromising on comfort or service. Designed with modern elegance and functionality in mind,
                      Economy offers a serene and enjoyable experience at an affordable price point.
                    </p>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Whether you're traveling for business or leisure, this class ensures a smooth journey with all the
                    essentials and thoughtful touches inspired by Japanese hospitality.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Economy Includes:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Affordable fares without sacrificing quality or comfort</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Comfortable seating with adjustable headrests and extra legroom</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Personal HD touchscreen loaded with a wide range of entertainment (films, music, games)
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          USB and universal power outlets at every seat for device charging
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Complimentary meal service with Japanese and Western options</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Beverage selection including green tea, soft drinks, and sake</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Noise-reducing headphones provided for an immersive experience</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Individual cup holders and tray tables for convenience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Business Class Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content - Left side for Business */}
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <div className="mb-6">
                    <h2 className="text-4xl font-bold mb-3">Business Class</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Royal Japan Airlines Business Class, designed for travelers who desire elevated comfort, privacy,
                      and premium service. This class creates a relaxing and productive environment ideal for long-haul
                      journeys.
                    </p>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Whether you're flying for business or pleasure, Business Class ensures an exceptional experience
                    with exclusive amenities and personalized attention.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Business Includes:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Seats with direct aisle access and privacy partitions</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Spacious seating with ample legroom and storage</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Large HD entertainment screen with noise-canceling headphones</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          High-speed, secure onboard Wi-Fi for streaming, work, and communication (connection may vary
                          depending on altitude or weather)
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Personal reading light, USB ports, and universal power outlets</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Adjustable dining/work table and dedicated storage compartments</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Access to the exclusive Lounge before departure</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Priority check-in, security, boarding, and baggage handling</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image - Right side for Business */}
                <div className="relative h-[400px] md:h-auto order-1 md:order-2">
                  <Image src="/business-class.png" alt="Business Class Cabin" fill className="object-cover" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* First Class Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image - Left side for First Class */}
                <div className="relative h-[400px] md:h-auto">
                  <Image src="/first-class.png" alt="First Class Suite" fill className="object-cover" />
                </div>

                {/* Content - Right side for First Class */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-4xl font-bold mb-3">First Class</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      First Class is the highest form of luxury aboard Royal Japan Airlines — this class offers
                      exceptional space, service, and serenity. On our flagship Airbus A380, this experience is taken
                      even further with fully enclosed suites.
                    </p>
                  </div>

                  <p className="text-muted-foreground mb-6 italic text-sm">
                    Note: Features may differ depending on the aircraft you fly on.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg mb-4">First Class Includes:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Privacy barriers at the aisle-end of each seat for undisturbed comfort
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          On the Airbus A380 only: fully enclosed private suite with sliding doors and ambient lighting
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">4K entertainment screen with immersive surround sound</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">High-speed, secure onboard Wi-Fi with unlimited access</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Access to the Royal First Lounge, featuring private dining rooms and spa treatments
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Chauffeur or limousine service available at select airports</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          VIP check-in, fast-track immigration, and priority boarding/baggage handling
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Royal Lounge Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content - Left side for Lounge */}
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <div className="mb-6">
                    <h2 className="text-4xl font-bold mb-3">Royal Lounge Tokyo Haneda</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Begin your journey in tranquility at our flagship Royal Lounge at Tokyo Haneda International
                      Airport. This sanctuary of sophistication blends contemporary design with traditional Japanese
                      hospitality, offering premium travelers an oasis of calm before departure.
                    </p>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Experience unparalleled comfort with floor-to-ceiling windows overlooking the tarmac, curated
                    seating areas for privacy or collaboration, and an artisan bar featuring Japanese whisky, sake, and
                    international spirits alongside fresh cuisine prepared by expert chefs.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Lounge Features:</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Exclusive access for First and Business Class passengers on Royal Japan Airlines flights
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Modern Japanese-inspired design with panoramic runway views and natural light
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Premium bar offering craft cocktails, Japanese whisky, sake, champagne, and fine wines
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          All-day dining with rotating seasonal menus featuring Japanese and international cuisine
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Private quiet zones with ergonomic seating, adjustable lighting, and power outlets
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">High-speed Wi-Fi and dedicated business workstations</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Shower suites and spa amenities for freshening up before flights
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Live flight information displays and personalized boarding announcements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image - Right side for Lounge */}
                <div className="relative h-[400px] md:h-auto order-1 md:order-2">
                  <Image src="/lounge-tokyo-haneda.jpg" alt="Royal Lounge Tokyo Haneda" fill className="object-cover" />
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
