-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "hotelTier" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "ratingAmount" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);
