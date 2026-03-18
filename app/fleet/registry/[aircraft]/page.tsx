import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"

const aircraftRegistrations: Record<
  string,
  {
    name: string
    category: string
    registrations: string[]
    statuses?: string[]
    specs?: {
      capacity?: string
      range?: string
      engines?: string
    }
  }
> = {
  "saab-340": {
    name: "Saab 340",
    category: "Regional Turboprop",
    registrations: ["JA001RJ", "JA002RJ", "JA003RJ", "JA004RJ"],
    specs: {
      capacity: "34 passengers",
      range: "1,735 km (935 nmi)",
      engines: "2× General Electric CT7-9B",
    },
  },
  "atr-72": {
    name: "ATR 72",
    category: "Regional Turboprop",
    registrations: ["JA010RJ", "JA011RJ", "JA012RJ", "JA013RJ", "JA014RJ", "JA015RJ"],
    specs: {
      capacity: "68-78 passengers",
      range: "1,528 km (825 nmi)",
      engines: "2× Pratt & Whitney PW127",
    },
  },
  a321lr: {
    name: "Airbus A321LR",
    category: "Long-Range Narrow-Body",
    registrations: ["JA510KR", "JA511KR", "JA512KR", "JA513KR", "JA514KR", "JA515KR", "JA516KR", "JA517KR"],
    specs: {
      capacity: "206 passengers (2-class)",
      range: "8,700 km (4,700 nmi)",
      engines: "2× CFM LEAP-1A",
    },
  },
  a320ceo: {
    name: "Airbus A320ceo",
    category: "Short to Medium-Haul",
    registrations: [
      "JA320KR",
      "JA321KR",
      "JA322KR",
      "JA323KR",
      "JA324KR",
      "JA325KR",
      "JA326KR",
      "JA327KR",
      "JA328KR",
      "JA329KR",
    ],
    specs: {
      capacity: "180 passengers (2-class)",
      range: "6,150 km (3,320 nmi)",
      engines: "2× CFM56-5B",
    },
  },
  a320neo: {
    name: "Airbus A320neo",
    category: "Short to Medium-Haul",
    registrations: ["JA340KR", "JA341KR", "JA342KR", "JA343KR", "JA344KR", "JA345KR", "JA346KR", "JA347KR"],
    specs: {
      capacity: "180 passengers (2-class)",
      range: "6,300 km (3,400 nmi)",
      engines: "2× CFM LEAP-1A",
    },
  },
  a318: {
    name: "Airbus A318",
    category: "Short-Haul Regional",
    registrations: ["JA301KR", "JA302KR", "JA303KR", "JA304KR", "JA305KR"],
    specs: {
      capacity: "132 passengers (2-class)",
      range: "5,750 km (3,100 nmi)",
      engines: "2× CFM56-5B",
    },
  },
  "a350-900": {
    name: "Airbus A350-900",
    category: "Long-Haul Wide-Body",
    registrations: [
      "JA121KR",
      "JA482KR",
      "JA350KR",
      "JA351KR",
      "JA352KR",
      "JA353KR",
      "JA354KR",
      "JA355KR",
      "JA356KR",
      "JA357KR",
      "JA358KR",
      "JA359KR",
      "JA360KR",
      "JA361KR",
      "JA362KR",
      "JA363KR",
      "JA364KR",
      "JA365KR",
      "JA366KR",
      "JA367KR",
      "JA368KR",
      "JA369KR",
      "JA370KR",
      "JA371KR",
      "JA372KR",
      "JA373KR",
      "JA374KR",
      "JA375KR",
      "JA376KR",
      "JA377KR",
      "JA378KR",
      "JA379KR",
      "JA380KR",
      "JA381KR",
    ],
    specs: {
      capacity: "325 passengers (3-class)",
      range: "15,000 km (8,100 nmi)",
      engines: "2× Rolls-Royce Trent XWB-84",
    },
  },
  "a350-1000": {
    name: "Airbus A350-1000",
    category: "Ultra Long-Haul Wide-Body",
    registrations: [
      "JA600KR",
      "JA601KR",
      "JA602KR",
      "JA603KR",
      "JA604KR",
      "JA605KR",
      "JA606KR",
      "JA607KR",
      "JA608KR",
      "JA609KR",
      "JA610KR",
      "JA611KR",
      "JA612KR",
      "JA613KR",
      "JA614KR",
      "JA615KR",
      "JA616KR",
      "JA617KR",
      "JA618KR",
      "JA619KR",
      "JA620KR",
      "JA621KR",
      "JA622KR",
      "JA623KR",
      "JA624KR",
      "JA625KR",
      "JA626KR",
    ],
    specs: {
      capacity: "366 passengers (3-class)",
      range: "16,100 km (8,700 nmi)",
      engines: "2× Rolls-Royce Trent XWB-97",
    },
  },
  "a380-800": {
    name: "Airbus A380-800",
    category: "Ultra Long-Haul Flagship",
    registrations: ["JA21KR", "JA22KR", "JA23KR", "JA24KR", "JA25KR", "JA26KR", "JA27KR", "JA28KR"],
    specs: {
      capacity: "525 passengers (3-class)",
      range: "15,200 km (8,200 nmi)",
      engines: "4× Rolls-Royce Trent 970",
    },
  },
  "a340-300": {
    name: "Airbus A340-300",
    category: "Long-Haul Wide-Body",
    registrations: ["JA440KR", "JA441KR", "JA442KR", "JA443KR"],
    specs: {
      capacity: "320 passengers (3-class)",
      range: "14,600 km (7,900 nmi)",
      engines: "4× Rolls-Royce Trent 556",
    },
  },
  "777-300er": {
    name: "Boeing 777-300ER",
    category: "Long-Haul Wide-Body",
    registrations: [
      "JA859J",
      "JA78KR",
      "JA900J",
      "JA901J",
      "JA902J",
      "JA903J",
      "JA904J",
      "JA905J",
      "JA906J",
      "JA907J",
      "JA908J",
      "JA909J",
      "JA910J",
      "JA911J",
      "JA912J",
      "JA913J",
      "JA914J",
      "JA915J",
      "JA916J",
      "JA917J",
      "JA918J",
      "JA919J",
      "JA920J",
      "JA921J",
      "JA922J",
      "JA923J",
      "JA924J",
      "JA925J",
      "JA926J",
      "JA927J",
      "JA928J",
      "JA929J",
      "JA930J",
      "JA931J",
      "JA932J",
      "JA933J",
      "JA934J",
      "JA935J",
      "JA936J",
      "JA937J",
      "JA938J",
      "JA939J",
      "JA940J",
      "JA941J",
      "JA942J",
      "JA943J",
      "JA944J",
      "JA945J",
      "JA946J",
      "JA947J",
    ],
    specs: {
      capacity: "350 passengers (3-class)",
      range: "14,594 km (7,880 nmi)",
      engines: "2× GE90-115B",
    },
  },
  "737-700": {
    name: "Boeing 737-700",
    category: "Short to Medium-Haul",
    registrations: [
      "JA701J",
      "JA702J",
      "JA703J",
      "JA704J",
      "JA705J",
      "JA706J",
      "JA707J",
      "JA708J",
      "JA709J",
      "JA710J",
      "JA711J",
      "JA712J",
      "JA713J",
      "JA714J",
      "JA715J",
      "JA716J",
      "JA717J",
      "JA718J",
      "JA719J",
      "JA720J",
      "JA721J",
      "JA722J",
      "JA723J",
      "JA724J",
      "JA725J",
      "JA726J",
      "JA727J",
      "JA728J",
      "JA729J",
      "JA730J",
      "JA731J",
      "JA732J",
      "JA733J",
      "JA734J",
      "JA735J",
      "JA736J",
      "JA737J",
      "JA738J",
      "JA739J",
      "JA740J",
      "JA741J",
      "JA742J",
      "JA743J",
      "JA744J",
      "JA745J",
      "JA746J",
      "JA747J",
      "JA748J",
      "JA749J",
      "JA750J",
      "JA751J",
      "JA752J",
      "JA753J",
      "JA754J",
      "JA755J",
      "JA756J",
      "JA757J",
      "JA758J",
      "JA759J",
      "JA760J",
    ],
    specs: {
      capacity: "149 passengers (2-class)",
      range: "6,230 km (3,365 nmi)",
      engines: "2× CFM56-7B24",
    },
  },
  "747-8": {
    name: "Boeing 747-8",
    category: "Long-Haul Wide-Body",
    registrations: ["JA480J", "JA481J", "JA482J", "JA483J", "JA484J"],
    specs: {
      capacity: "410 passengers (3-class)",
      range: "14,815 km (8,000 nmi)",
      engines: "4× GEnx-2B67",
    },
  },
  "787-9": {
    name: "Boeing 787-9 Dreamliner",
    category: "Medium to Long-Haul",
    registrations: [
      "JA893J",
      "JA890J",
      "JA891J",
      "JA892J",
      "JA894J",
      "JA895J",
      "JA896J",
      "JA897J",
      "JA898J",
      "JA899J",
      "JA960J",
      "JA961J",
    ],
    specs: {
      capacity: "290 passengers (3-class)",
      range: "14,140 km (7,635 nmi)",
      engines: "2× Rolls-Royce Trent 1000",
    },
  },
  "a330-900neo": {
    name: "Airbus A330-900neo",
    category: "Long-Haul Wide-Body",
    registrations: [
      "JA331KR",
      "JA332KR",
      "JA333KR",
      "JA334KR",
      "JA335KR",
      "JA336KR",
      "JA337KR",
      "JA338KR",
      "JA339KR",
      "JA341KR",
      "JA342KR",
      "JA343KR",
      "JA344KR",
      "JA345KR",
    ],
    statuses: [
      "Operational",
      "Operational",
      "Operational",
      "Maintenance",
      "Maintenance",
      "Operational",
      "Operational",
      "Maintenance",
      "Operational",
      "Operational",
      "Operational",
      "Operational",
      "Operational",
      "Operational",
    ],
    specs: {
      capacity: "287 passengers (3-class)",
      range: "13,334 km (7,200 nmi)",
      engines: "2× Rolls-Royce Trent 7000",
    },
  },
}

export default function AircraftDetailPage({ params }: { params: { aircraft: string } }) {
  const aircraft = aircraftRegistrations[params.aircraft]

  if (!aircraft) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/fleet/registry"
            className="text-primary hover:text-primary/80 mb-6 inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Fleet Registry
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{aircraft.name}</h1>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {aircraft.category}
            </Badge>
          </div>

          {aircraft.specs && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Aircraft Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aircraft.specs.capacity && (
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="text-lg font-semibold">{aircraft.specs.capacity}</p>
                    </div>
                  )}
                  {aircraft.specs.range && (
                    <div>
                      <p className="text-sm text-muted-foreground">Range</p>
                      <p className="text-lg font-semibold">{aircraft.specs.range}</p>
                    </div>
                  )}
                  {aircraft.specs.engines && (
                    <div>
                      <p className="text-sm text-muted-foreground">Engines</p>
                      <p className="text-lg font-semibold">{aircraft.specs.engines}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Aircraft Registrations</span>
                <Badge variant="outline" className="text-xl px-4 py-2">
                  {aircraft.registrations.length} Total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">#</th>
                      <th className="text-left py-3 px-4 font-semibold">Registration</th>
                      <th className="text-left py-3 px-4 font-semibold">Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aircraft.registrations.map((reg, index) => (
                      <tr key={reg} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                        <td className="py-3 px-4 font-mono font-semibold text-primary">{reg}</td>
                        <td className="py-3 px-4">{aircraft.name}</td>
                        <td className="py-3 px-4">Japan</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
