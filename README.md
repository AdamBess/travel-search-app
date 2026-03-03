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
- REST API mit Express 5
- TypeScript im gesamten Stack

## Projektstruktur

```
Reisesuche-WebApp/
├── frontend/                  # React Frontend
│   └── src/
│       ├── components/
│       │   ├── TripCard/      # Hotel-Karte
│       │   └── TripList/      # Listenansicht + Suche
│       ├── types/
│       │   └── Trip.ts        # TypeScript Interface
│       ├── data/
│       │   └── trips.json
│       └── App.tsx
│
└── backend/                   # Express Backend
    └── src/
        ├── index.ts           # Express Server
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
| GET | `/api/trips` | `?search=<string>` | Alle Reisen (optional gefiltert nach Name) |

**Beispiel:**
```
GET http://localhost:3000/api/trips?search=rixos
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

## Architektur

```
┌──────────────────┐     GET /api/trips?search=...      ┌──────────────────┐
│                  │ ──────────────────────────────────►│                  │
│  React Frontend  │                                    │  Express Backend │
│  localhost:5173  │ ◄──────────────────────────────────│  localhost:3000  │
│                  │         JSON Response              │                  │
└──────────────────┘                                    └──────────────────┘
```
