import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET() {
  try {
    const announcements = (await redis.get("newsletter:announcements")) || []
    return NextResponse.json({ announcements })
  } catch (error) {
    console.error("[v0] Error fetching announcements:", error)
    return NextResponse.json({ announcements: [] })
  }
}

export async function POST(request: Request) {
  try {
    const { password, announcements } = await request.json()

    // Verify admin password
    if (password !== "Heratik154") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Store announcements in Redis
    await redis.set("newsletter:announcements", announcements)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving announcements:", error)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}
