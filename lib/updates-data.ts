export interface Update {
  id: string
  date: string
  version: string
  title: string
  changes: {
    added?: string[]
    fixed?: string[]
    removed?: string[]
  }
}

export const updates: Update[] = [
  {
    id: "2025-11-14-3",
    date: "November 14, 2025",
    version: "v1.4.0",
    title: "Real Cityscape Images for Routes",
    changes: {
      added: [
        "High-quality cityscape photographs for 8 major European destinations",
        "Real images for London Heathrow (Big Ben), Zurich (Old Town), Amsterdam (Canals), Manchester (MediaCityUK), Paris CDG (Eiffel Tower), Madrid (Cibeles Fountain), Frankfurt (Skyline), and Milan (Duomo)",
        "Cityscape image mapping system with automatic fallback for other destinations"
      ]
    }
  },
  {
    id: "2025-11-14",
    date: "November 14, 2025",
    version: "v1.3.0",
    title: "Updates Page & Documentation",
    changes: {
      added: [
        "Updates page to showcase website changes and version history",
        "Changelog system with categorized changes (Added/Fixed/Removed)",
        "Updates link in footer navigation under Company section"
      ]
    }
  },
  {
    id: "2025-11-14-2",
    date: "November 14, 2025",
    version: "v1.2.0",
    title: "Booking System Improvements & Fleet Addition",
    changes: {
      added: [
        "All routes now visible when accessing booking page directly",
        "Auto-fill support when clicking 'Book Flight' from route cards",
        "Return flight support with dual boarding passes",
        "Boeing 767-400ER added to active fleet"
      ],
      fixed: [
        "Fixed departure airport restriction - can now depart from any airport",
        "Resolved issue where only Tokyo Haneda departures worked",
        "Improved route search to check both directions"
      ]
    }
  },
  {
    id: "2025-11-14-1",
    date: "November 14, 2025",
    version: "v1.1.0",
    title: "Retro Fleet & Historical Aircraft",
    changes: {
      added: [
        "Retro Fleet section showcasing retired aircraft",
        "L-1011-1 TriStar with detailed historical information",
        "Douglas DC-3 with Mount Fuji historical photograph",
        "Boeing 747-100 classic livery",
        "Concorde (reactivated status)",
        "Airbus A340-600 with fleet status notes",
        "Saab 340 regional turboprop to active fleet"
      ]
    }
  },
  {
    id: "2025-11-14-0",
    date: "November 14, 2025",
    version: "v1.0.0",
    title: "Singapore Airlines Codeshare & Route Updates",
    changes: {
      added: [
        "RJA codeshare routes on Singapore Airlines flights (SIN to BWN, LGK, CGK, HND, NRT, KUL, HKT)",
        "SIA codeshare routes on RJA flights (HND to ITM, TSA, SHA)",
        "Russian route termination indicators with red 'TERMINATED' badges",
        "News ticker at top of all pages for important announcements"
      ]
    }
  }
]
