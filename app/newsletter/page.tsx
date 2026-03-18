"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Calendar, RefreshCw } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  author: string
  timestamp: number
}

export default function NewsletterPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [lastUpdate, setLastUpdate] = useState<number>(0)

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const response = await fetch("/api/newsletter")
        const data = await response.json()

        if (data.announcements && data.announcements.length > 0) {
          setAnnouncements(data.announcements)
        } else {
          // Default announcement if none exist
          const defaultAnnouncements: Announcement[] = [
            {
              id: "1",
              title: "Welcome to Royal Japan Airlines Newsletter",
              content:
                "Stay updated with the latest news, route announcements, and special offers from Royal Japan Airlines. Check back regularly for new updates!",
              date: "2025-01-15",
              author: "Royal Japan Airlines",
              timestamp: Date.now(),
            },
          ]
          setAnnouncements(defaultAnnouncements)
        }

        setLastUpdate(Date.now())
      } catch (error) {
        console.error("[v0] Error loading announcements:", error)
      }
    }

    // Initial load
    loadAnnouncements()

    const interval = setInterval(loadAnnouncements, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <Megaphone className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Newsletter & Announcements</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, route announcements, and special offers from Royal Japan Airlines.
            </p>
            {lastUpdate > 0 && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4" />
                <span>Last updated: {new Date(lastUpdate).toLocaleTimeString()}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Announcements</h2>

            {announcements.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No announcements yet. Check back soon!</p>
                </CardContent>
              </Card>
            ) : (
              announcements.map((announcement) => (
                <Card key={announcement.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-xl">{announcement.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(announcement.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{announcement.author}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
