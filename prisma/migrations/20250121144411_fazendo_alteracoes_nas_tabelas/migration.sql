/*
  Warnings:

  - You are about to drop the column `director` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `synopse` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `occupierCPF` on the `seats` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `neighboorhood` on the `sessions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "ageRating" INTEGER NOT NULL
);
INSERT INTO "new_movies" ("ageRating", "genre", "id", "title") SELECT "ageRating", "genre", "id", "title" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE TABLE "new_seats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "row" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "occupierName" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "seats_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_seats" ("id", "number", "occupierName", "price", "row", "sessionId") SELECT "id", "number", "occupierName", "price", "row", "sessionId" FROM "seats";
DROP TABLE "seats";
ALTER TABLE "new_seats" RENAME TO "seats";
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL,
    "type" INTEGER NOT NULL,
    "movieId" TEXT NOT NULL,
    CONSTRAINT "sessions_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("id", "movieId", "startTime", "type") SELECT "id", "movieId", "startTime", "type" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
