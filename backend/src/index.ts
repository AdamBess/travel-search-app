import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js"

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/trips", async (req, res) => {
  const { search, sort, order } = req.query
  const trips = await prisma.trip.findMany({
    where: search ? { name: { contains: search.toString(), mode: "insensitive"}} : {},
    orderBy: sort ? {[ sort.toString()] : order } : {},
  })
  res.json(trips)
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});