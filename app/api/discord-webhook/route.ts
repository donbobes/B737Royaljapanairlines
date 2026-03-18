import { fleetRegistryData } from "@/lib/fleet-registry-data"

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1459877426703237120/4tdK7SI2q9gzDZuZG8vH1mk9Y703dLZdAp-zUttzK-Wxc2AJX4gl5zEof_C-OfQmWBRh"

function getRegistrationForAircraft(aircraftType: string): string {
  for (const category of Object.values(fleetRegistryData)) {
    for (const [type, data] of Object.entries(category)) {
      if (
        type === aircraftType ||
        type.replace(/\s+/g, "").toLowerCase() === aircraftType.replace(/\s+/g, "").toLowerCase()
      ) {
        const randomIndex = Math.floor(Math.random() * data.registrations.length)
        return data.registrations[randomIndex]
      }
    }
  }
  return "JA000RJ"
}

export async function POST(request: Request) {
  try {
    const booking = await request.json()
    const registration = booking.registration || getRegistrationForAircraft(booking.aircraft)

    const embed = {
      title: "New Flight Booking Confirmed",
      description: `Flight ${booking.flightNumber} has been booked`,
      color: 0x1a2c5b,
      fields: [
        { name: "Passenger Name", value: booking.passengerName, inline: true },
        { name: "Passengers", value: booking.passengers.toString(), inline: true },
        {
          name: "Cabin Class",
          value: booking.cabinClass.charAt(0).toUpperCase() + booking.cabinClass.slice(1),
          inline: true,
        },
        { name: "Departure Airport", value: booking.from, inline: true },
        { name: "Arrival Airport", value: booking.to, inline: true },
        {
          name: "Flight Date",
          value: new Date(booking.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          inline: false,
        },
        { name: "Departure Time", value: booking.departure, inline: true },
        { name: "Arrival Time", value: booking.arrival, inline: true },
        { name: "Aircraft", value: booking.aircraft, inline: true },
        { name: "Registration", value: registration, inline: true },
        { name: "Seat(s)", value: booking.seats.join(", "), inline: true },
        {
          name: "Total Price",
          value: `¥${(booking.price * booking.passengers).toLocaleString()}`,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "Royal Japan Airlines Booking System" },
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `<@&1329149584479490159> A new flight has been booked and is due to be flown!`,
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      return Response.json({ error: "Webhook failed" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("[v0] Discord webhook error:", error)
    return Response.json({ error: "Internal error" }, { status: 500 })
  }
}
