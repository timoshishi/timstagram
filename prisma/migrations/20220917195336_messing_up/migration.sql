/*
  Warnings:

  - You are about to drop the column `url` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `is_bot_post` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `is_shared` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `media_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `media_url` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_avatar_url` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_deleted` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `posts` table. All the data in the column will be lost.
  - Added the required column `domain` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `post_body` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar_url` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropIndex
DROP INDEX "media_url_key";

-- DropIndex
DROP INDEX "posts_media_url_key";

-- DropIndex
DROP INDEX "posts_user_avatar_url_key";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "url",
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "postFlagFlaggedByUserId" UUID,
ADD COLUMN     "postFlagPostId" UUID;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "is_bot_post",
DROP COLUMN "is_shared",
DROP COLUMN "likes",
DROP COLUMN "media_id",
DROP COLUMN "media_type",
DROP COLUMN "media_url",
DROP COLUMN "user_avatar_url",
DROP COLUMN "user_deleted",
DROP COLUMN "user_id",
DROP COLUMN "username",
ADD COLUMN     "author_id" UUID NOT NULL,
ALTER COLUMN "post_body" SET NOT NULL,
ALTER COLUMN "view_count" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatar_bucket" TEXT DEFAULT '',
ADD COLUMN     "avatar_domain" TEXT DEFAULT '',
ADD COLUMN     "avatar_id" UUID,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "avatar_url" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL;

-- CreateIndex
CREATE INDEX "flagged_media_mediaHash_idx" ON "flagged_media"("mediaHash");

-- CreateIndex
CREATE INDEX "posts_postHash_idx" ON "posts"("postHash");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_postFlagPostId_postFlagFlaggedByUserId_fkey" FOREIGN KEY ("postFlagPostId", "postFlagFlaggedByUserId") REFERENCES "post_flags"("post_id", "user_id") ON DELETE SET NULL ON UPDATE CASCADE;
