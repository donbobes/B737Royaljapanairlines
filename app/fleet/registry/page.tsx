"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const fleetDistribution = [
  { name: "Saab 340", value: 4, color: "#FF6B6B", category: "regional" },
  { name: "ATR 72", value: 6, color: "#4ECDC4", category: "regional" },
  { name: "A321LR", value: 8, color: "#45B7D1", category: "airbus" },
  { name: "A320ceo", value: 10, color: "#96CEB4", category: "airbus" },
  { name: "A320neo", value: 8, color: "#FFEAA7", category: "airbus" },
  { name: "A318", value: 5, color: "#DFE6E9", category: "airbus" },
  { name: "A330-900neo", value: 15, color: "#A7C7E7", category: "airbus" },
  { name: "A350-900", value: 34, color: "#74B9FF", category: "airbus" },
  { name: "A350-1000", value: 27, color: "#A29BFE", category: "airbus" },
  { name: "A380-800", value: 8, color: "#FD79A8", category: "airbus" },
  { name: "A340-300", value: 4, color: "#FDCB6E", category: "airbus" },
  { name: "777-300ER", value: 50, color: "#6C5CE7", category: "boeing" },
  { name: "737-700", value: 60, color: "#00B894", category: "boeing" },
  { name: "747-8", value: 5, color: "#E17055", category: "boeing" },
  { name: "787-9", value: 12, color: "#00CEC9", category: "boeing" },
]

const totalAircraft = fleetDistribution.reduce((sum, item) => sum + item.value, 0)

export default function FleetRegistryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Aircraft Registry</h1>
            <p className="text-lg text-muted-foreground">
              Complete fleet breakdown with {totalAircraft} total aircraft across 15 types
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Fleet Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={200}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fleetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fleetDistribution.map((aircraft) => (
              <Link key={aircraft.name} href={`/fleet/registry/${aircraft.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                      <span>{aircraft.name}</span>
                      <span
                        className="text-2xl font-bold px-3 py-1 rounded"
                        style={{ backgroundColor: aircraft.color, color: "#fff" }}
                      >
                        {aircraft.value}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground capitalize">Category: {aircraft.category}</p>
                    <p className="text-sm text-primary mt-2 font-semibold">Click to view registrations →</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
