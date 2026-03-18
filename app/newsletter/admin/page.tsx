"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar, Lock, Trash2, ImagePlus, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  author: string
  timestamp: number
  imageUrl?: string
}

export default function NewsletterAdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadAnnouncements()
    }
  }, [isAuthenticated])

  const loadAnnouncements = async () => {
    try {
      const response = await fetch("/api/newsletter")
      const data = await response.json()
      setAnnouncements(data.announcements || [])
    } catch (error) {
      console.error("[v0] Error loading announcements:", error)
    }
  }

  const handleLogin = () => {
    if (password === "Heratik154") {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5MB.')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.url)
      } else {
        const error = await response.json()
        alert(error.error || 'Upload failed')
      }
    } catch (error) {
      console.error('[v0] Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddAnnouncement = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please fill in both title and content")
      return
    }

    setIsLoading(true)

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split("T")[0],
      author: "Royal Japan Airlines",
      timestamp: Date.now(),
      imageUrl: imageUrl || undefined,
    }

    const updated = [newAnnouncement, ...announcements]

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "Heratik154", announcements: updated }),
      })

      if (response.ok) {
        setAnnouncements(updated)
        setNewTitle("")
        setNewContent("")
        alert("Announcement posted successfully! It will sync to all devices within 30 seconds.")
      } else {
        alert("Failed to post announcement")
      }
    } catch (error) {
      console.error("[v0] Error posting announcement:", error)
      alert("Error posting announcement")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return

    setIsLoading(true)
    const updated = announcements.filter((a) => a.id !== id)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "Heratik154", announcements: updated }),
      })

      if (response.ok) {
        setAnnouncements(updated)
      } else {
        alert("Failed to delete announcement")
      }
    } catch (error) {
      console.error("[v0] Error deleting announcement:", error)
      alert("Error deleting announcement")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="w-full max-w-md border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Admin Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the admin password to access the newsletter management portal.
              </p>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

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
            <h1 className="text-4xl font-bold text-foreground">Newsletter Admin Portal</h1>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="default">Admin Mode</Badge>
              <Button variant="outline" size="sm" onClick={() => router.push("/newsletter")}>
                View Public Page
              </Button>
            </div>
          </div>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Post New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input
                  placeholder="Announcement title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Content</label>
                <Textarea
                  placeholder="Announcement content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Image (Optional)</label>
                <div className="flex flex-col gap-3">
                  {imageUrl ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted/30">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setImageUrl("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                      {isUploading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload image</span>
                          <span className="text-xs text-muted-foreground mt-1">JPEG, PNG, GIF, WebP (max 5MB)</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploading || isLoading}
                      />
                    </label>
                  )}
                </div>
              </div>

              <Button onClick={handleAddAnnouncement} className="w-full" disabled={isLoading || isUploading}>
                {isLoading ? "Posting..." : "Post Announcement"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Manage Announcements</h2>

            {announcements.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No announcements yet.</p>
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
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
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
