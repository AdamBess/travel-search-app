import { prisma } from '../src/lib/prisma.js'
import trips from './trips.json' with { type: "json" };

const tripsWithoutId = trips.map(({ id, ...rest }) => rest);

async function main() {
    // Clear trips table
    const deleteAllTrips = await prisma.trip.deleteMany();

    // Add Trips data to Trip Table (without id, because its automatically added)
    const addAllTrips = await prisma.trip.createMany({ data: tripsWithoutId });
    console.log("Added trips:", addAllTrips)
}

main()
.then(async () => {
    prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})