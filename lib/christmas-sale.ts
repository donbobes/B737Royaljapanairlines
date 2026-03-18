// Check if Christmas sale is active (until January 12, 2026)
export function isChristmasSaleActive(): boolean {
  const now = new Date()
  const endDate = new Date("2026-01-12T23:59:59")
  return now <= endDate
}

// Apply Christmas discount to price
export function applyChristmasDiscount(price: number): number {
  if (!isChristmasSaleActive()) {
    return price
  }
  return Math.round(price * 0.8) // 20% off
}

// Get discount percentage display
export function getDiscountDisplay(): string | null {
  if (!isChristmasSaleActive()) {
    return null
  }
  return "20% OFF"
}
