/*
  Warnings:

  - The primary key for the `post_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `post_tags` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatar` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `posts` table. All the data in the column will be lost.
  - Added the required column `userId` to the `media` table without a default value. This is not possible if the table is not empty.
  - Made the column `postId` on table `post_tags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagId` on table `post_tags` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userAvatarUrl` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_pkey",
DROP COLUMN "id",
ALTER COLUMN "postId" SET NOT NULL,
ALTER COLUMN "tagId" SET NOT NULL,
ADD CONSTRAINT "post_tags_pkey" PRIMARY KEY ("postId", "tagId");

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "userAvatar",
DROP COLUMN "userName",
ADD COLUMN     "isShared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userAvatarUrl" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "published" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
