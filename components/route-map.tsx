"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { routes } from "@/lib/routes-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Plane, Clock, MapPin } from "lucide-react"
import Link from "next/link"

// Airport coordinates database
const airportCoordinates: Record<string, { lat: number; lon: number; city: string }> = {
  // Tokyo
  RJTT: { lat: 35.5494, lon: 139.7798, city: "Tokyo Haneda" },
  RJAA: { lat: 35.7647, lon: 140.3864, city: "Tokyo Narita" },

  // Europe
  EGLL: { lat: 51.47, lon: -0.4543, city: "London" },
  LFPG: { lat: 49.0097, lon: 2.5479, city: "Paris" },
  LEMD: { lat: 40.4983, lon: -3.5676, city: "Madrid" },
  EHAM: { lat: 52.3086, lon: 4.7639, city: "Amsterdam" },
  LIMC: { lat: 45.6306, lon: 8.7281, city: "Milan" },
  EDDF: { lat: 50.0379, lon: 8.5622, city: "Frankfurt" },
  LSZH: { lat: 47.4647, lon: 8.5492, city: "Zurich" },
  EGCC: { lat: 53.3537, lon: -2.275, city: "Manchester" },
  LPPT: { lat: 38.7742, lon: -9.1342, city: "Lisbon" },
  EBBR: { lat: 50.901, lon: 4.4856, city: "Brussels" },
  LEBL: { lat: 41.2974, lon: 2.0833, city: "Barcelona" },
  LEIB: { lat: 38.8729, lon: 1.3731, city: "Ibiza" },
  ESSA: { lat: 59.6519, lon: 17.9186, city: "Stockholm" },
  EKCH: { lat: 55.618, lon: 12.656, city: "Copenhagen" },
  ENGM: { lat: 60.1939, lon: 11.1004, city: "Oslo" },
  EFHK: { lat: 60.3172, lon: 24.9633, city: "Helsinki" },
  EDDM: { lat: 48.3538, lon: 11.7861, city: "Munich" },
  EPWA: { lat: 52.1657, lon: 20.9671, city: "Warsaw" },
  LHBP: { lat: 47.4298, lon: 19.2611, city: "Budapest" },
  LOWW: { lat: 48.1103, lon: 16.5697, city: "Vienna" },
  LKPR: { lat: 50.1008, lon: 14.26, city: "Prague" },
  EGKK: { lat: 51.1481, lon: -0.1903, city: "London Gatwick" },
  LGAV: { lat: 37.9364, lon: 23.9445, city: "Athens" },
  LDDU: { lat: 42.5614, lon: 18.2682, city: "Dubrovnik" },
  LGSR: { lat: 36.3992, lon: 25.4793, city: "Santorini" },
  LIRF: { lat: 41.8003, lon: 12.2389, city: "Rome" },

  // North America
  KJFK: { lat: 40.6413, lon: -73.7781, city: "New York" },
  KBOS: { lat: 42.3656, lon: -71.0096, city: "Boston" },
  KIAD: { lat: 38.9531, lon: -77.4565, city: "Washington DC" },
  KLAS: { lat: 36.084, lon: -115.1537, city: "Las Vegas" },
  KHNL: { lat: 21.3187, lon: -157.9225, city: "Honolulu" },
  KMIA: { lat: 25.7959, lon: -80.287, city: "Miami" },
  KSFO: { lat: 37.6213, lon: -122.379, city: "San Francisco" },
  KATL: { lat: 33.6407, lon: -84.4277, city: "Atlanta" },
  KLAX: { lat: 33.9416, lon: -118.4085, city: "Los Angeles" },
  CYYZ: { lat: 43.6777, lon: -79.6248, city: "Toronto" },
  CYHZ: { lat: 44.8808, lon: -63.5086, city: "Halifax" },
  MMMX: { lat: 19.4363, lon: -99.0721, city: "Mexico City" },
  CYUL: { lat: 45.4657, lon: -73.7455, city: "Montreal" },
  CYVR: { lat: 49.1947, lon: -123.184, city: "Vancouver" },
  CYOW: { lat: 45.3192, lon: -75.6692, city: "Ottawa" },
  KPDX: { lat: 45.5887, lon: -122.5975, city: "Portland" },
  KSEA: { lat: 47.4502, lon: -122.3088, city: "Seattle" },
  KPHL: { lat: 39.8744, lon: -75.2424, city: "Philadelphia" },
  KDEN: { lat: 39.8561, lon: -104.6737, city: "Denver" },
  KORD: { lat: 41.9742, lon: -87.9073, city: "Chicago" },
  KDFW: { lat: 32.8998, lon: -97.0403, city: "Dallas" },
  PANC: { lat: 61.1744, lon: -149.9962, city: "Anchorage" },

  // South America
  SBGR: { lat: -23.4356, lon: -46.4731, city: "São Paulo" },
  SKBO: { lat: 4.7016, lon: -74.1469, city: "Bogotá" },
  SCEL: { lat: -33.393, lon: -70.7858, city: "Santiago" },
  MPTO: { lat: 9.0714, lon: -79.3834, city: "Panama City" },

  // Middle East
  OMDB: { lat: 25.2532, lon: 55.3657, city: "Dubai" },
  LTFM: { lat: 41.2753, lon: 28.7519, city: "Istanbul" },
  OMAA: { lat: 24.433, lon: 54.6511, city: "Abu Dhabi" },
  OTHH: { lat: 25.2731, lon: 51.608, city: "Doha" },
  OERK: { lat: 24.9574, lon: 46.6987, city: "Riyadh" },
  OEJN: { lat: 21.6796, lon: 39.1565, city: "Jeddah" },
  OKBK: { lat: 29.2267, lon: 47.9689, city: "Kuwait" },
  OOMS: { lat: 23.5933, lon: 58.2844, city: "Muscat" },
  OBBI: { lat: 26.2708, lon: 50.6336, city: "Manama" },
  OEDF: { lat: 26.4712, lon: 49.7979, city: "Dammam" },
  OJAI: { lat: 31.7226, lon: 35.9932, city: "Amman" },
  LTAC: { lat: 40.1281, lon: 32.9951, city: "Ankara" },
  LTBJ: { lat: 38.2924, lon: 27.157, city: "Izmir" },
  LTAI: { lat: 36.8987, lon: 30.8005, city: "Antalya" },
  LTCG: { lat: 40.9951, lon: 39.7897, city: "Trabzon" },
  LLBG: { lat: 32.0114, lon: 34.8867, city: "Tel Aviv" },

  // Southeast Asia
  WSSS: { lat: 1.3644, lon: 103.9915, city: "Singapore" },
  VVTS: { lat: 10.8188, lon: 106.6519, city: "Ho Chi Minh" },
  RPLL: { lat: 14.5086, lon: 121.0198, city: "Manila" },
  WMKK: { lat: 2.7456, lon: 101.7099, city: "Kuala Lumpur" },
  VTBS: { lat: 13.69, lon: 100.7501, city: "Bangkok" },
  VTCC: { lat: 18.7668, lon: 98.9626, city: "Chiang Mai" },
  WBKK: { lat: 5.9372, lon: 116.0517, city: "Kota Kinabalu" },
  WMKP: { lat: 5.2971, lon: 100.277, city: "Penang" },
  WIII: { lat: -6.1256, lon: 106.6559, city: "Jakarta" },
  WAAA: { lat: -5.0616, lon: 119.554, city: "Makassar" },
  VVCT: { lat: 10.0851, lon: 105.7119, city: "Can Tho" },
  VVNB: { lat: 21.2212, lon: 105.8072, city: "Hanoi" },
  VVDN: { lat: 16.0439, lon: 108.1994, city: "Da Nang" },
  VVPQ: { lat: 10.1698, lon: 103.9931, city: "Phu Quoc" },
  RPVK: { lat: 11.6794, lon: 122.3763, city: "Kalibo" },
  RPVI: { lat: 10.833, lon: 122.4933, city: "Iloilo" },
  RPMR: { lat: 6.058, lon: 125.0961, city: "General Santos" },
  WAHI: { lat: -7.788, lon: 110.4318, city: "Yogyakarta" },
  WIIS: { lat: -6.9714, lon: 110.3747, city: "Semarang" },
  WALL: { lat: -1.2683, lon: 116.8945, city: "Balikpapan" },
  WAMM: { lat: 1.5493, lon: 124.9261, city: "Manado" },
  WITT: { lat: 5.5237, lon: 95.4206, city: "Banda Aceh" },
  WBGG: { lat: 1.4847, lon: 110.3469, city: "Kuching" },
  WMKL: { lat: 6.3297, lon: 99.7287, city: "Langkawi" },
  VTSG: { lat: 8.0991, lon: 98.9862, city: "Krabi" },
  VTSS: { lat: 6.9332, lon: 100.3927, city: "Hat Yai" },
  VTUD: { lat: 17.3864, lon: 102.7883, city: "Udon Thani" },
  VLLB: { lat: 19.8973, lon: 102.1614, city: "Luang Prabang" },
  VYMD: { lat: 21.7022, lon: 95.9779, city: "Mandalay" },
  VDSV: { lat: 10.5797, lon: 103.6369, city: "Sihanoukville" },
  WBSB: { lat: 4.9442, lon: 114.9285, city: "Bandar Seri Begawan" },
  WPDL: { lat: -8.5465, lon: 125.5246, city: "Dili" },

  // South Asia
  VABB: { lat: 19.0896, lon: 72.8656, city: "Mumbai" },
  VASD: { lat: 19.6883, lon: 75.0681, city: "Shirdi" },
  VIDP: { lat: 28.5562, lon: 77.1, city: "New Delhi" },
  VERP: { lat: 21.1804, lon: 81.7388, city: "Raipur" },
  VANP: { lat: 21.0922, lon: 79.0472, city: "Nagpur" },
  VAAH: { lat: 23.0772, lon: 72.6347, city: "Ahmedabad" },
  VOPB: { lat: 11.6412, lon: 92.7296, city: "Port Blair" },
  VOMM: { lat: 12.9941, lon: 80.1709, city: "Chennai" },
  VEGT: { lat: 26.1061, lon: 91.5859, city: "Guwahati" },
  VOBL: { lat: 13.1979, lon: 77.7063, city: "Bengaluru" },
  VOHS: { lat: 17.2403, lon: 78.4294, city: "Hyderabad" },
  VGHS: { lat: 23.8433, lon: 90.3978, city: "Dhaka" },
  VGSY: { lat: 24.9633, lon: 91.8667, city: "Sylhet" },
  VGEG: { lat: 22.2496, lon: 91.8133, city: "Chittagong" },
  VNKT: { lat: 27.6966, lon: 85.3591, city: "Kathmandu" },
  VQPR: { lat: 27.4032, lon: 89.4246, city: "Paro" },
  VCRI: { lat: 6.2845, lon: 81.1241, city: "Mattala" },
  VRMG: { lat: -0.6933, lon: 73.1556, city: "Gan Island" },

  // Central Asia
  UACC: { lat: 51.0222, lon: 71.4669, city: "Astana" },
  UAAA: { lat: 43.3521, lon: 77.0405, city: "Almaty" },
  UATE: { lat: 43.8601, lon: 51.0921, city: "Aktau" },
  UATG: { lat: 47.1219, lon: 51.8214, city: "Atyrau" },
  UAII: { lat: 42.3641, lon: 69.4789, city: "Shymkent" },
  UAKK: { lat: 49.6708, lon: 73.3344, city: "Karaganda" },
  ZMCK: { lat: 47.8431, lon: 106.7664, city: "Ulaanbaatar" },
  UTTT: { lat: 41.2579, lon: 69.2811, city: "Tashkent" },
  UCFM: { lat: 43.0613, lon: 74.4776, city: "Bishkek" },
  UTDD: { lat: 38.5433, lon: 68.8249, city: "Dushanbe" },
  UGTB: { lat: 41.6692, lon: 44.9547, city: "Tbilisi" },
  UDYZ: { lat: 40.1473, lon: 44.3959, city: "Yerevan" },
  UBBB: { lat: 40.4675, lon: 50.0467, city: "Baku" },

  // Russia
  UUEE: { lat: 55.9726, lon: 37.4146, city: "Moscow" },
  ULLI: { lat: 59.8003, lon: 30.2625, city: "St. Petersburg" },
  UHWW: { lat: 43.399, lon: 132.1483, city: "Vladivostok" },

  // Oceania
  YSSY: { lat: -33.9461, lon: 151.1772, city: "Sydney" },
  YPPH: { lat: -31.9403, lon: 115.9672, city: "Perth" },
  YMML: { lat: -37.669, lon: 144.841, city: "Melbourne" },
  YBBN: { lat: -27.3842, lon: 153.1175, city: "Brisbane" },
  NZAA: { lat: -37.0082, lon: 174.785, city: "Auckland" },
  YBCS: { lat: -16.8858, lon: 145.755, city: "Cairns" },

  // East Asia
  RKSI: { lat: 37.4602, lon: 126.4407, city: "Seoul" },
  RKPK: { lat: 35.1795, lon: 128.9382, city: "Busan" },
  RKPC: { lat: 33.5113, lon: 126.493, city: "Jeju" },
  VHHH: { lat: 22.308, lon: 113.9185, city: "Hong Kong" },
  VMMC: { lat: 22.1496, lon: 113.5916, city: "Macau" },
  RCSS: { lat: 25.0694, lon: 121.5525, city: "Taipei" },
  ZGSZ: { lat: 22.6393, lon: 113.8108, city: "Shenzhen" },
  ZBAA: { lat: 40.0801, lon: 116.5846, city: "Beijing" },
  ZSHC: { lat: 30.2295, lon: 120.4344, city: "Hangzhou" },
  ZSPD: { lat: 31.1434, lon: 121.8052, city: "Shanghai Pudong" },
  ZSSS: { lat: 31.1979, lon: 121.3364, city: "Shanghai Hongqiao" },
  ZGGG: { lat: 23.3924, lon: 113.2988, city: "Guangzhou" },
  ZUTF: { lat: 30.3085, lon: 103.947, city: "Chengdu" },
  ZLXY: { lat: 34.4471, lon: 108.7519, city: "Xi'an" },
  ZHHH: { lat: 30.7838, lon: 114.2081, city: "Wuhan" },
  ZYHB: { lat: 45.6234, lon: 126.25, city: "Harbin" },
  ZGHA: { lat: 28.1892, lon: 113.22, city: "Changsha" },
  ZSNJ: { lat: 31.742, lon: 118.862, city: "Nanjing" },
  ZSFZ: { lat: 25.9351, lon: 119.6633, city: "Fuzhou" },
  ZSQD: { lat: 36.2661, lon: 120.3744, city: "Qingdao" },
  ZYTL: { lat: 38.9657, lon: 121.5386, city: "Dalian" },

  // Domestic Japan
  RJSA: { lat: 40.7347, lon: 140.6908, city: "Aomori" },
  RJEC: { lat: 43.6708, lon: 142.4475, city: "Asahikawa" },
  RJFF: { lat: 33.5859, lon: 130.4511, city: "Fukuoka" },
  RJCH: { lat: 41.77, lon: 140.8219, city: "Hakodate" },
  RJFO: { lat: 33.4794, lon: 131.7369, city: "Oita" },
  ROAH: { lat: 26.1958, lon: 127.6458, city: "Naha" },
  RJFS: { lat: 33.1497, lon: 130.3019, city: "Saga" },
  RJOK: { lat: 33.5461, lon: 133.6694, city: "Kochi" },
  RJBB: { lat: 34.4273, lon: 135.244, city: "Osaka Kansai" },
  RJFM: { lat: 31.8772, lon: 131.4486, city: "Miyazaki" },
  RJOO: { lat: 34.7855, lon: 135.4381, city: "Osaka Itami" },
  RJOA: { lat: 34.4361, lon: 132.9194, city: "Hiroshima" },
  RJCW: { lat: 45.4042, lon: 141.8008, city: "Wakkanai" },
  ROIG: { lat: 24.3964, lon: 124.245, city: "Ishigaki" },
  RJNS: { lat: 34.7961, lon: 138.1894, city: "Shizuoka" },
  RJNT: { lat: 36.6483, lon: 137.1875, city: "Toyama" },
  RJSK: { lat: 39.6156, lon: 140.2186, city: "Akita" },
  RJOM: { lat: 33.8272, lon: 132.6997, city: "Matsuyama" },
  RJKA: { lat: 28.4306, lon: 129.7125, city: "Amami" },
  BIRK: { lat: 64.13, lon: -21.9406, city: "Reykjavik" },
  EGSS: { lat: 51.885, lon: 0.235, city: "London Stansted" },
}

export function RouteMap() {
  const [selectedRoute, setSelectedRoute] = useState<(typeof routes)[0] | null>(null)
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 })

  // Filter to only passenger routes from Tokyo
  const passengerRoutes = routes.filter(
    (route) =>
      route.type === "passenger" &&
      (route.fromCode === "RJTT" || route.fromCode === "RJAA") &&
      airportCoordinates[route.toCode],
  )

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 32, 1400)
      const height = Math.min(width * 0.5, 700)
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Clear canvas
    ctx.fillStyle = "#0a0e27"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw world map (simplified continents)
    ctx.fillStyle = "#c0c0c0"
    ctx.strokeStyle = "#1a1e37"
    ctx.lineWidth = 1

    // Convert lat/lon to canvas coordinates
    const project = (lat: number, lon: number) => {
      const x = ((lon + 180) / 360) * canvas.width
      const y = ((90 - lat) / 180) * canvas.height
      return { x, y }
    }

    // Draw simplified world map outline
    drawWorldMap(ctx, canvas.width, canvas.height)

    // Draw all routes
    passengerRoutes.forEach((route) => {
      const from = airportCoordinates[route.fromCode]
      const to = airportCoordinates[route.toCode]

      if (!from || !to) return

      const fromPos = project(from.lat, from.lon)
      const toPos = project(to.lat, to.lon)

      const isHovered = hoveredRoute === route.id
      const isSelected = selectedRoute?.id === route.id

      // Draw curved arc
      ctx.beginPath()
      ctx.strokeStyle = isSelected ? "#60a5fa" : isHovered ? "#fbbf24" : route.popular ? "#f97316" : "#4b5563"
      ctx.lineWidth = isSelected ? 2 : isHovered ? 1.5 : route.popular ? 1 : 0.5
      ctx.globalAlpha = isSelected ? 1 : isHovered ? 0.8 : route.popular ? 0.6 : 0.3

      // Calculate control point for curve
      const midX = (fromPos.x + toPos.x) / 2
      const midY = (fromPos.y + toPos.y) / 2
      const distance = Math.sqrt(Math.pow(toPos.x - fromPos.x, 2) + Math.pow(toPos.y - fromPos.y, 2))
      const curveHeight = distance * 0.2
      const controlY = midY - curveHeight

      ctx.moveTo(fromPos.x, fromPos.y)
      ctx.quadraticCurveTo(midX, controlY, toPos.x, toPos.y)
      ctx.stroke()
    })

    ctx.globalAlpha = 1

    // Draw airport dots
    const drawnAirports = new Set<string>()
    passengerRoutes.forEach((route) => {
      ;[route.fromCode, route.toCode].forEach((code) => {
        if (drawnAirports.has(code)) return
        drawnAirports.add(code)

        const airport = airportCoordinates[code]
        if (!airport) return

        const pos = project(airport.lat, airport.lon)

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, code === "RJTT" || code === "RJAA" ? 5 : 3, 0, Math.PI * 2)
        ctx.fillStyle = code === "RJTT" || code === "RJAA" ? "#f97316" : "#60a5fa"
        ctx.fill()
      })
    })
  }, [dimensions, hoveredRoute, selectedRoute, passengerRoutes])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * dimensions.width
    const y = ((e.clientY - rect.top) / rect.height) * dimensions.height

    // Find clicked route
    const project = (lat: number, lon: number) => {
      const px = ((lon + 180) / 360) * dimensions.width
      const py = ((90 - lat) / 180) * dimensions.height
      return { x: px, y: py }
    }

    let closestRoute: (typeof routes)[0] | null = null
    let closestDistance = Number.POSITIVE_INFINITY

    passengerRoutes.forEach((route) => {
      const from = airportCoordinates[route.fromCode]
      const to = airportCoordinates[route.toCode]

      if (!from || !to) return

      const fromPos = project(from.lat, from.lon)
      const toPos = project(to.lat, to.lon)

      // Check distance to route line
      const distance = distanceToLine(x, y, fromPos.x, fromPos.y, toPos.x, toPos.y)

      if (distance < 20 && distance < closestDistance) {
        closestDistance = distance
        closestRoute = route
      }
    })

    setSelectedRoute(closestRoute)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * dimensions.width
    const y = ((e.clientY - rect.top) / rect.height) * dimensions.height

    const project = (lat: number, lon: number) => {
      const px = ((lon + 180) / 360) * dimensions.width
      const py = ((90 - lat) / 180) * dimensions.height
      return { x: px, y: py }
    }

    let closestRoute: (typeof routes)[0] | null = null
    let closestDistance = Number.POSITIVE_INFINITY

    passengerRoutes.forEach((route) => {
      const from = airportCoordinates[route.fromCode]
      const to = airportCoordinates[route.toCode]

      if (!from || !to) return

      const fromPos = project(from.lat, from.lon)
      const toPos = project(to.lat, to.lon)

      const distance = distanceToLine(x, y, fromPos.x, fromPos.y, toPos.x, toPos.y)

      if (distance < 20 && distance < closestDistance) {
        closestDistance = distance
        closestRoute = route
      }
    })

    setHoveredRoute(closestRoute?.id || null)
    canvas.style.cursor = closestRoute ? "pointer" : "default"
  }

  return (
    <div className="container mx-auto px-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredRoute(null)}
          className="w-full rounded-lg shadow-2xl"
          style={{ maxWidth: "100%", height: "auto" }}
        />

        {selectedRoute && (
          <Card className="absolute top-4 right-4 w-80 bg-background/95 backdrop-blur border-border shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedRoute.to}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRoute.toCode}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedRoute(null)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {selectedRoute.popular && (
                  <Badge className="bg-secondary text-secondary-foreground">Popular Route</Badge>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{selectedRoute.from}</span>
                </div>

                <div className="flex items-center justify-center">
                  <Plane className="w-4 h-4 text-muted-foreground rotate-90" />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="text-foreground">{selectedRoute.to}</span>
                </div>

                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{selectedRoute.duration}</span>
                    </div>
                    <span className="text-muted-foreground">{selectedRoute.frequency}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">¥{selectedRoute.fromPrice.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">from</span>
                  </div>

                  <p className="text-xs text-muted-foreground">Flight {selectedRoute.flightNumber}</p>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link
                    href={`/book?from=${encodeURIComponent(selectedRoute.fromCode)}&to=${encodeURIComponent(selectedRoute.toCode)}&flightNumber=${encodeURIComponent(selectedRoute.flightNumber)}`}
                  >
                    Book Flight
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#f97316]"></div>
          <span className="text-white/80">Popular Routes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#4b5563]"></div>
          <span className="text-white/80">Regular Routes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
          <span className="text-white/80">Tokyo Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#60a5fa]"></div>
          <span className="text-white/80">Destinations</span>
        </div>
      </div>
    </div>
  )
}

// Helper function to calculate distance from point to line
function distanceToLine(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
  const A = px - x1
  const B = py - y1
  const C = x2 - x1
  const D = y2 - y1

  const dot = A * C + B * D
  const lenSq = C * C + D * D
  let param = -1

  if (lenSq !== 0) param = dot / lenSq

  let xx, yy

  if (param < 0) {
    xx = x1
    yy = y1
  } else if (param > 1) {
    xx = x2
    yy = y2
  } else {
    xx = x1 + param * C
    yy = y1 + param * D
  }

  const dx = px - xx
  const dy = py - yy

  return Math.sqrt(dx * dx + dy * dy)
}

// Helper function to draw simplified world map
function drawWorldMap(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = "#c0c0c0"
  ctx.globalAlpha = 1

  // Simplified continent shapes
  const continents = [
    // North America
    { x: 0.15, y: 0.25, w: 0.2, h: 0.3 },
    // South America
    { x: 0.22, y: 0.55, w: 0.1, h: 0.25 },
    // Europe
    { x: 0.45, y: 0.2, w: 0.1, h: 0.15 },
    // Africa
    { x: 0.45, y: 0.35, w: 0.15, h: 0.3 },
    // Asia
    { x: 0.6, y: 0.15, w: 0.25, h: 0.35 },
    // Australia
    { x: 0.75, y: 0.6, w: 0.12, h: 0.15 },
  ]

  continents.forEach((continent) => {
    ctx.fillRect(continent.x * width, continent.y * height, continent.w * width, continent.h * height)
  })

  ctx.globalAlpha = 1
}
