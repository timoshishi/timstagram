/*
  Warnings:

  - Made the column `bucket` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "media" ALTER COLUMN "bucket" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "width" SET NOT NULL;
