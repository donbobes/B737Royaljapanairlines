import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

// Fleet manufacturer distribution based on registry data
const partners = [
  {
    name: "Boeing",
    percentage: "50.4%",
    aircraft: "127 aircraft",
    logo: "/images/image.png",
  },
  {
    name: "Airbus",
    percentage: "47.2%",
    aircraft: "119 aircraft",
    logo: "/images/image.png",
  },
  {
    name: "ATR",
    percentage: "2.4%",
    aircraft: "6 aircraft",
    logo: "/images/image.png",
  },
  {
    name: "SAAB",
    percentage: "1.6%",
    aircraft: "4 aircraft",
    logo: "/images/image.png",
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Headline Section */}
          <div className="text-center mb-16">
            <div className="inline-block border-4 border-[oklch(0.25_0.08_250)] px-8 py-6 mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.15_0.01_250)] leading-tight">
                Proudly Partnering with the World's
                <br />
                Leading Aviation Innovators
              </h1>
            </div>
            <p className="text-lg md:text-xl text-[oklch(0.5_0.01_250)] max-w-3xl mx-auto leading-relaxed">
              Royal Japan Airlines collaborates with global aircraft manufacturers and trusted airline partners to
              deliver safety, innovation, and seamless connectivity across our network.
            </p>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-white p-6 rounded-lg">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    width={200}
                    height={100}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-[oklch(0.25_0.08_250)]">{partner.percentage}</p>
                  <p className="text-sm text-[oklch(0.5_0.01_250)]">{partner.aircraft}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
