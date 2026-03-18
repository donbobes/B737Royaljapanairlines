import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Authentication Error</h1>
        <p className="text-muted-foreground">Something went wrong during sign in. Please try again.</p>
        <Button asChild>
          <Link href="/auth/login">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}
