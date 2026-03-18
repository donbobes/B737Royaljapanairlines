import type { Route } from "./routes-data"

// Fleet assignment logic based on route characteristics
export function assignAircraft(route: Route): string {
  // If aircraft is already assigned (cargo, supersonic), use it
  if (route.aircraft) {
    return route.aircraft
  }

  // Parse duration to get hours
  const durationMatch = route.duration.match(/(\d+)h/)
  const hours = durationMatch ? Number.parseInt(durationMatch[1]) : 0

  // Supersonic routes
  if (route.type === "supersonic") {
    return "Concorde"
  }

  // Cargo routes
  if (route.type === "cargo") {
    return route.aircraft || "Boeing 747-8F"
  }

  // Domestic Japan routes (short duration, regional)
  if (route.region === "domestic") {
    if (hours < 1) {
      // Very short routes - regional aircraft
      return Math.random() > 0.5 ? "ATR 72" : "Saab 340"
    } else if (hours < 2) {
      // Short domestic - narrow body
      const aircraft = ["A320neo", "A318", "737-700"]
      return aircraft[Math.floor(Math.random() * aircraft.length)]
    } else {
      // Longer domestic - larger narrow body
      return Math.random() > 0.5 ? "A321neo" : "A320neo"
    }
  }

  // East Asia short-haul (Korea, China, Taiwan, Hong Kong)
  if (route.region === "east-asia" && hours < 6) {
    const aircraft = ["A321 XLR", "A321neo", "A320neo", "737-700"]
    return aircraft[Math.floor(Math.random() * aircraft.length)]
  }

  // Medium-haul routes (6-10 hours) - Southeast Asia, Middle East, Russia
  if (hours >= 6 && hours < 10) {
    const aircraft = ["A330-900", "Boeing 787-9", "A340"]
    return aircraft[Math.floor(Math.random() * aircraft.length)]
  }

  // Long-haul routes (10+ hours) - Europe, Americas, Oceania
  if (hours >= 10) {
    // Ultra long-haul (14+ hours) - flagship aircraft
    if (hours >= 14) {
      const aircraft = ["Airbus A380", "Boeing 777-300ER", "Airbus A350-1000"]
      return aircraft[Math.floor(Math.random() * aircraft.length)]
    }
    // Long-haul (10-14 hours)
    const aircraft = ["Boeing 777-300ER", "Airbus A350-900", "Airbus A350-1000", "Boeing 747"]
    return aircraft[Math.floor(Math.random() * aircraft.length)]
  }

  // Default for any other routes
  return "Boeing 787-9"
}
