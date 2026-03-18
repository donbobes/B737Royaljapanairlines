import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film } from "lucide-react"

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <Film className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Inflight Entertainment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Royal Japan Airlines has a wide variety of genres on our IFE (Inflight Entertainment screens), with every
              genre surely to capture the minds of travellers from around the world.
            </p>
          </div>

          {/* Featured Movies */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Film className="w-6 h-6 text-primary" />
                Featured Movies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-muted-foreground">• The Boy and the Heron (君たちはどう生きるか)</div>
                <div className="text-muted-foreground">• Oppenheimer</div>
                <div className="text-muted-foreground">• The Beekeeper</div>
                <div className="text-muted-foreground">• Barbie</div>
                <div className="text-muted-foreground">• Godzilla Minus One</div>
                <div className="text-muted-foreground">• Dune: Part Two</div>
                <div className="text-muted-foreground">• Perfect Days</div>
                <div className="text-muted-foreground">• Top Gun: Maverick</div>
                <div className="text-muted-foreground">• The Marvels</div>
                <div className="text-muted-foreground">• Suzume (すずめの戸締まり)</div>
              </div>
            </CardContent>
          </Card>

          {/* Comedy */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Film className="w-6 h-6 text-primary" />
                Comedy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-muted-foreground">• The Dictator</div>
                <div className="text-muted-foreground">• Borat</div>
                <div className="text-muted-foreground">• Brüno</div>
                <div className="text-muted-foreground">• Tropic Thunder</div>
                <div className="text-muted-foreground">• The Interview</div>
                <div className="text-muted-foreground">• Jojo Rabbit</div>
                <div className="text-muted-foreground">• Deadpool</div>
                <div className="text-muted-foreground">• Superbad</div>
                <div className="text-muted-foreground">• The Hangover (1, 2 & 3)</div>
                <div className="text-muted-foreground">• 21 Jump Street</div>
                <div className="text-muted-foreground">• American Made</div>
                <div className="text-muted-foreground">• This Is the End</div>
                <div className="text-muted-foreground">• Ted</div>
                <div className="text-muted-foreground">• The Nice Guys</div>
                <div className="text-muted-foreground">• We're the Millers</div>
                <div className="text-muted-foreground">• Yes Man</div>
                <div className="text-muted-foreground">• Get Smart</div>
                <div className="text-muted-foreground">• Airplane!</div>
                <div className="text-muted-foreground">• Hot Fuzz</div>
                <div className="text-muted-foreground">• The Grand Budapest Hotel</div>
              </div>
            </CardContent>
          </Card>

          {/* Drama */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Film className="w-6 h-6 text-primary" />
                Drama – Stories that Stay With You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-muted-foreground">• Shoplifters (万引き家族)</div>
                <div className="text-muted-foreground">• Drive My Car</div>
                <div className="text-muted-foreground">• The Last Samurai</div>
                <div className="text-muted-foreground">• A Man Called Otto</div>
                <div className="text-muted-foreground">• The Whale</div>
                <div className="text-muted-foreground">• Lost in Translation</div>
                <div className="text-muted-foreground">• A Star Is Born</div>
                <div className="text-muted-foreground">• The Pursuit of Happyness</div>
                <div className="text-muted-foreground">• Call Me by Your Name</div>
                <div className="text-muted-foreground">• Past Lives</div>
                <div className="text-muted-foreground">• The Post</div>
                <div className="text-muted-foreground">• Manchester by the Sea</div>
                <div className="text-muted-foreground">• Still Walking (歩いても 歩いても)</div>
              </div>
            </CardContent>
          </Card>

          {/* Action & Adventure */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Film className="w-6 h-6 text-primary" />
                Action & Adventure – Adrenaline Above the Clouds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-muted-foreground">• John Wick: Chapter 4</div>
                <div className="text-muted-foreground">• Mission: Impossible – Dead Reckoning</div>
                <div className="text-muted-foreground">• Fast X</div>
                <div className="text-muted-foreground">• Godzilla x Kong: The New Empire</div>
                <div className="text-muted-foreground">• No Time to Die</div>
                <div className="text-muted-foreground">• Tenet</div>
                <div className="text-muted-foreground">• One Piece Film: Red</div>
                <div className="text-muted-foreground">• The Batman</div>
                <div className="text-muted-foreground">• Edge of Tomorrow</div>
                <div className="text-muted-foreground">• Spider-Man: Across the Spider-Verse</div>
                <div className="text-muted-foreground">• Ready Player One</div>
                <div className="text-muted-foreground">• Pacific Rim</div>
                <div className="text-muted-foreground">• The Wandering Earth II (流浪地球2)</div>
              </div>
            </CardContent>
          </Card>

          {/* Family & Animation */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Film className="w-6 h-6 text-primary" />
                Family & Animation – Fun for All Ages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-muted-foreground">• My Neighbor Totoro (となりのトトロ)</div>
                <div className="text-muted-foreground">• Frozen II</div>
                <div className="text-muted-foreground">• Encanto</div>
                <div className="text-muted-foreground">• The Super Mario Bros. Movie</div>
                <div className="text-muted-foreground">• Ponyo (崖の上のポニョ)</div>
                <div className="text-muted-foreground">• How to Train Your Dragon 3</div>
                <div className="text-muted-foreground">• Inside Out 2</div>
                <div className="text-muted-foreground">• Toy Story 4</div>
                <div className="text-muted-foreground">• Minions: The Rise of Gru</div>
                <div className="text-muted-foreground">• Turning Red</div>
                <div className="text-muted-foreground">• Luca</div>
                <div className="text-muted-foreground">• The Lego Movie</div>
                <div className="text-muted-foreground">• Spirited Away (千と千尋の神隠し)</div>
                <div className="text-muted-foreground">• Despicable Me 3</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary bg-primary/5">
            <CardContent className="py-6">
              <p className="text-center text-sm text-muted-foreground">
                Entertainment selection may vary by aircraft and route. Content is regularly updated to provide the
                latest releases and timeless classics.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
