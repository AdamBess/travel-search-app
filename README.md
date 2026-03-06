# Reisesuche WebApp

Fullstack Travel Search Application mit React Frontend, Express Backend und PostgreSQL Datenbank.

## Tech Stack

| | Technologie | Version |
|---|---|---|
| **Frontend** | React + TypeScript | 19.2 |
| **Build Tool** | Vite | 7.3 |
| **Styling** | Tailwind CSS | 4.2 |
| **Backend** | Express.js | 5.2 |
| **Datenbank** | PostgreSQL | 16 |
| **ORM** | Prisma | 7 |
| **Runtime** | Node.js + tsx | |

## Features

- Responsive Hotel-Karten (Grid: 1/2/3 Spalten je nach Bildschirmgröße)
- Echtzeit-Suche mit Server-side Filterung via Query Parameters
- Sortierung nach Preis, Bewertung und Name (auf-/absteigend)
- Debounced Search Input (400ms) zur Reduzierung von API-Calls
- Error Handling und Loading State
- PostgreSQL Datenbank mit Prisma ORM
- Environment Variables für API-URL, Port und Datenbank
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
    ├── prisma/
    │   ├── schema.prisma      # Datenbank-Schema
    │   ├── seed.ts            # Seed-Script für Testdaten
    │   └── migrations/        # SQL Migrations
    ├── prisma.config.ts       # Prisma Konfiguration
    └── src/
        ├── index.ts           # Express Server + API
        ├── lib/
        │   └── prisma.ts      # Prisma Client Setup
        └── data/
            └── trips.json     # Seed-Daten (30 Hotels)
```

## Setup

### Voraussetzungen

- Node.js
- PostgreSQL 16

### Datenbank erstellen

```bash
psql -U postgres
CREATE DATABASE reisesuche;
\q
```

### Backend starten

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx tsx prisma/seed.ts
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
GET http://localhost:3000/api/trips?search=resort
GET http://localhost:3000/api/trips?sort=price&order=desc
GET http://localhost:3000/api/trips?search=beach&sort=rating&order=desc
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
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/reisesuche"
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:3000/api
```

## Architektur

```
┌──────────────────┐  GET /api/trips?search=...&sort=...  ┌──────────────────┐  SQL Queries   ┌──────────────────┐
│                  │ ────────────────────────────────────►│                  │ ─────────────► │                  │
│  React Frontend  │                                      │ Express Backend  │                │   PostgreSQL     │
│  localhost:5173  │ ◄────────────────────────────────────│ localhost:3000   │ ◄───────────── │   localhost:5432 │
│                  │          JSON Response               │ + Prisma ORM     │   Query Result │                  │
└──────────────────┘                                      └──────────────────┘                └──────────────────┘
```
