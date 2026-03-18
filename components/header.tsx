"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/rja-logo.png"
                alt="Royal Japan Airlines Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-foreground">Royal Japan Airlines</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/book" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Book Flight
            </Link>
            <Link href="/routes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Our Routes
            </Link>
            <Link href="/fleet" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Fleet
            </Link>
            <Link href="/join-us" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Join Us
            </Link>
            <Link
              href="/newsletter"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Newsletter
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/account" className="flex items-center gap-2">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-border"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
                <span className="text-sm font-medium text-foreground">
                  {user.user_metadata?.full_name || user.user_metadata?.name || "Account"}
                </span>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/book" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Book Flight
              </Link>
              <Link href="/routes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Our Routes
              </Link>
              <Link href="/fleet" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Fleet
              </Link>
              <Link
                href="/join-us"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Join Us
              </Link>
              <Link
                href="/newsletter"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Newsletter
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/account">My Account</Link>
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                )}
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/book">Book Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
