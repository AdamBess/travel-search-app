# Reisesuche WebApp

Fullstack Travel Search Application mit React Frontend und Express Backend.

## Tech Stack

| | Technologie | Version |
|---|---|---|
| **Frontend** | React + TypeScript | 19.2 |
| **Build Tool** | Vite | 7.3 |
| **Styling** | Tailwind CSS | 4.2 |
| **Backend** | Express.js | 5.2 |
| **Runtime** | Node.js + tsx | |

## Features

- Responsive Hotel-Karten (Grid: 1/2/3 Spalten je nach Bildschirmgröße)
- Echtzeit-Suche mit Server-side Filterung via Query Parameters
- Sortierung nach Preis, Bewertung und Name (auf-/absteigend)
- Debounced Search Input (400ms) zur Reduzierung von API-Calls
- Error Handling und Loading State
- Environment Variables für API-URL und Port
- REST API mit Express 5
- TypeScript im gesamten Stack (Shared Types)

## Projektstruktur

```
Reisesuche-WebApp/
├── types/
│   └── Trip.ts                # Shared TypeScript Interface
├── frontend/                  # React Frontend
│   └── src/
│       ├── components/
│       │   ├── TripCard/      # Hotel-Karte
│       │   └── TripList/      # Listenansicht + Suche + Sortierung
│       └── App.tsx
│
└── backend/                   # Express Backend
    └── src/
        ├── index.ts           # Express Server + API
        └── data/
            └── trips.json
```

## Setup

### Backend starten

```bash
cd backend
npm install
npm run dev
# Server läuft auf http://localhost:3000
```

### Frontend starten

```bash
cd frontend
npm install
npm run dev
# App läuft auf http://localhost:5173
```

## API

| Methode | Endpoint | Parameter | Beschreibung |
|---------|----------|-----------|--------------|
| GET | `/api/trips` | `?search=<string>` | Filtert Reisen nach Name |
| | | `?sort=<field>` | Sortierfeld (`price`, `rating`, `name`) |
| | | `?order=asc\|desc` | Sortierreihenfolge (Standard: `asc`) |

**Beispiele:**
```
GET http://localhost:3000/api/trips?search=rixos
GET http://localhost:3000/api/trips?sort=price&order=desc
GET http://localhost:3000/api/trips?search=resort&sort=rating&order=desc
```

## Datenmodell

```typescript
interface Trip {
  id: number;
  imageUrl: string;
  name: string;
  destination: string;
  hotelTier: number;
  rating: number;
  ratingAmount: number;
  duration: number;
  guests: number;
  price: number;
}
```

## Environment Variables

**Backend** (`backend/.env`):
```
PORT=3000
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:3000/api
```

## Architektur

```
┌──────────────────┐  GET /api/trips?search=...&sort=...  ┌──────────────────┐
│                  │ ────────────────────────────────────►│                  │
│  React Frontend  │                                      │  Express Backend │
│  localhost:5173  │ ◄────────────────────────────────────│  localhost:3000  │
│                  │          JSON Response                │                  │
└──────────────────┘                                      └──────────────────┘
```
