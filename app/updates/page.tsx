import { updates } from "@/lib/updates-data"
import { Calendar, Plus, Wrench, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Website Updates</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stay informed about the latest improvements, features, and fixes to the Royal Japan Airlines website. This
            changelog documents all changes made to enhance your experience.
          </p>
        </div>

        {/* Updates Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {updates.map((update, index) => (
            <div
              key={update.id}
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Update Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-sm font-semibold">
                    {update.version}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{update.date}</span>
                  </div>
                </div>
                {index === 0 && (
                  <Badge className="bg-primary text-primary-foreground w-fit">Latest</Badge>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-6">{update.title}</h2>

              {/* Changes */}
              <div className="space-y-6">
                {update.changes.added && update.changes.added.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10">
                        <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">Added</h3>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {update.changes.added.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {update.changes.fixed && update.changes.fixed.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10">
                        <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">Fixed</h3>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {update.changes.fixed.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {update.changes.removed && update.changes.removed.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10">
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">Removed</h3>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {update.changes.removed.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-muted/30 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            This changelog is regularly updated to reflect all changes made to the Royal Japan Airlines website. Check
            back frequently for the latest improvements and features.
          </p>
        </div>
      </div>
    </div>
  )
}
