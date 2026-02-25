import express from 'express';
import cors from 'cors';
import trips from './data/trips.json' with { type: "json" }

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/trips', (req, res) => {
    res.json(trips)
})

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Server läuft auf http://localhost:3000")
})