import express from "express";
import cors from "cors";
import trips from "./data/trips.json" with { type: "json" };
import type { Trip } from "../../types/Trip.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/trips", (req, res) => {
  let result = [...trips];
  const searchTerm = req.query.search;
  const sort = req.query.sort;
  const order = req.query.order || "asc";

  if (searchTerm) {
    result = result.filter((trip) =>
      trip.name.toLowerCase().includes(searchTerm.toString().toLowerCase()),
    );
  }

  if (sort) {
    const sortField = sort.toString() as keyof Trip;
    const multiplier = order === "desc" ? -1 : 1;

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === "string" && typeof valB === "string") {
        return multiplier * valA.localeCompare(valB)
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return multiplier * (valA - valB);
      }

      return 0;
    });
  }

  res.json(result);
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Server läuft auf http://localhost:3000");
});
