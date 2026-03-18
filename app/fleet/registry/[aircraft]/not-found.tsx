import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Aircraft Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The aircraft type you're looking for doesn't exist in our registry.
          </p>
          <Link href="/fleet/registry" className="text-primary hover:text-primary/80 font-semibold">
            Return to Fleet Registry
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
