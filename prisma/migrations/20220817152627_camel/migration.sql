/*
  Warnings:

  - You are about to drop the column `doesLike` on the `post_likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post_likes" DROP COLUMN "doesLike",
ADD COLUMN     "does_like" BOOLEAN NOT NULL DEFAULT true;
