// Mapping of city names to their cityscape images
export const cityscapeImages: Record<string, string> = {
  "London Heathrow": "/cities/london-heathrow.png",
  Zurich: "/cities/zurich.png",
  Amsterdam: "/cities/amsterdam.png",
  Manchester: "/cities/manchester.png",
  "Paris CDG": "/cities/paris-cdg.png",
  Madrid: "/cities/madrid.png",
  Frankfurt: "/cities/frankfurt.png",
  Milan: "/cities/milan.png",
  Lisbon: "/cities/lisbon.png",
  Brussels: "/cities/brussels.png",
  Copenhagen: "/cities/copenhagen.png",
  Oslo: "/cities/oslo.png",
  Helsinki: "/cities/helsinki.png",
  Stockholm: "/cities/stockholm.png",
  Ibiza: "/cities/ibiza.png",
  Munich: "/cities/munich.png",
  Warsaw: "/cities/warsaw.png",
  Budapest: "/cities/budapest.png",
  Barcelona: "/cities/barcelona.png",
  "New York JFK": "/cities/new-york.jpg",
  "San Francisco": "/cities/san-francisco.jpg",
  "Las Vegas": "/cities/las-vegas.jpg",
  Boston: "/cities/boston.jpg",
  Prague: "/cities/prague.jpg",
  Vienna: "/cities/vienna.jpg",
  "Washington D.C.": "/cities/washington-dc.jpg",
  Atlanta: "/cities/atlanta.jpg",
  Honolulu: "/cities/honolulu.jpg",
  Miami: "/cities/miami.jpg",
  Santiago: "/cities/santiago.jpg",
  Bogotá: "/cities/bogota.jpg",
  "St. Petersburg": "/cities/st-petersburg.jpg",
  "Mexico City": "/cities/mexico-city.jpg",
  "Moscow Sheremetyevo": "/cities/moscow.jpg",
  Vladivostok: "/cities/vladivostok.jpg",
  "São Paulo": "/cities/sao-paulo.jpg",
  "Los Angeles": "/cities/los-angeles.jpg",
  Toronto: "/cities/toronto.jpg",
  Halifax: "/cities/halifax.jpg",
  Dubai: "/images/dubai.png",
  Riyadh: "/images/riyadh.png",
  Muscat: "/images/muscat.png",
  Jeddah: "/images/jeddah.png",
  Manama: "/images/manama.png",
  "Kuwait City": "/images/kuwait.png",
  Istanbul: "/images/istanbul.png",
  "Abu Dhabi": "/images/abu-dhabi.png",
  Doha: "/images/doha.png",
}

// Helper function to get cityscape image or fallback to placeholder
export function getCityscapeImage(cityName: string): string {
  return (
    cityscapeImages[cityName] ||
    `/.jpg?key=nhnhv&height=400&width=600&query=${encodeURIComponent(cityName + " city skyline aerial view")}`
  )
}
