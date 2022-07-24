/*
  Warnings:

  - Added the required column `hash` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "scraped" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "width" INTEGER;
