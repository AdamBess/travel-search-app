# Travel Search App

Fullstack travel search application built with React, Express, and PostgreSQL.

<img width="3840" height="2160" alt="travel-search-page" src="https://github.com/user-attachments/assets/e9ec7aab-0dd1-4854-8a33-b4eea7789476" />

## Tech Stack

| | Technology | Version |
|---|---|---|
| **Frontend** | React + TypeScript | 19.2 |
| **Build Tool** | Vite | 7.3 |
| **Styling** | Tailwind CSS | 4.2 |
| **Backend** | Express.js | 5.2 |
| **Database** | PostgreSQL | 16 |
| **ORM** | Prisma | 7 |
| **Runtime** | Node.js + tsx | |

## Features

- Responsive hotel cards (grid: 1/2/3 columns based on screen size)
- Real-time search with server-side filtering via query parameters
- Sorting by price, rating, and name (ascending/descending)
- Debounced search input (400ms) to reduce API calls
- Error handling and loading state
- PostgreSQL database with Prisma ORM
- Environment variables for API URL, port, and database
- REST API with Express 5
- TypeScript across the entire stack (shared types)

## Project Structure

```
travel-search-app/
├── types/
│   └── Trip.ts                # Shared TypeScript interface
├── frontend/                  # React Frontend
│   └── src/
│       ├── components/
│       │   ├── TripCard/      # Hotel card component
│       │   └── TripList/      # List view + search + sorting
│       └── App.tsx
│
└── backend/                   # Express Backend
    ├── prisma/
    │   ├── schema.prisma      # Database schema
    │   ├── seed.ts            # Seed script for test data
    │   └── migrations/        # SQL migrations
    ├── prisma.config.ts       # Prisma configuration
    └── src/
        ├── index.ts           # Express server + API
        ├── lib/
        │   └── prisma.ts      # Prisma client setup
        └── data/
            └── trips.json     # Seed data (30 hotels)
```

## Setup

### Prerequisites

- Node.js
- PostgreSQL 16

### Create Database

```bash
psql -U postgres
CREATE DATABASE reisesuche;
\q
```

### Start Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
# Server running on http://localhost:3000
```

### Start Frontend

```bash
cd frontend
npm install
npm run dev
# App running on http://localhost:5173
```

## API

| Method | Endpoint | Parameter | Description |
|--------|----------|-----------|-------------|
| GET | `/api/trips` | `?search=<string>` | Filter trips by name |
| | | `?sort=<field>` | Sort field (`price`, `rating`, `name`) |
| | | `?order=asc\|desc` | Sort order (default: `asc`) |

**Examples:**
```
GET http://localhost:3000/api/trips?search=resort
GET http://localhost:3000/api/trips?sort=price&order=desc
GET http://localhost:3000/api/trips?search=beach&sort=rating&order=desc
```

## Data Model

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

## Architecture

```
┌──────────────────┐  GET /api/trips?search=...&sort=...  ┌──────────────────┐  SQL Queries  ┌──────────────────┐
│                  │ ────────────────────────────────────►│                  │ ─────────────►│                  │
│  React Frontend  │                                      │  Express Backend │               │   PostgreSQL     │
│  localhost:5173  │ ◄────────────────────────────────────│  localhost:3000  │ ◄─────────────│   localhost:5432 │
│                  │          JSON Response               │  + Prisma ORM    │  Query Result │                  │
└──────────────────┘                                      └──────────────────┘               └──────────────────┘
```
