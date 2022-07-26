/*
  Warnings:

  - You are about to drop the column `createdAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followerId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingAvatarUrl` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `folowerAvatarUrl` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `post_flags` table. All the data in the column will be lost.
  - The primary key for the `post_likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `post_likes` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `post_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post_likes` table. All the data in the column will be lost.
  - The primary key for the `post_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `post_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `post_tags` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `flagCount` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `isBotPost` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `isShared` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatarUrl` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userDeleted` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isBot` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[media_url]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_id` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `post_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_avatar_url` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_userId_fkey";

-- DropForeignKey
ALTER TABLE "post_likes" DROP CONSTRAINT "post_likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "post_likes" DROP CONSTRAINT "post_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_postId_fkey";

-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_mediaId_fkey";

-- DropIndex
DROP INDEX "posts_mediaUrl_key";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "follows" DROP CONSTRAINT "follows_pkey",
DROP COLUMN "followerId",
DROP COLUMN "followingAvatarUrl",
DROP COLUMN "followingId",
DROP COLUMN "folowerAvatarUrl",
ADD COLUMN     "follower_avatar_url" TEXT,
ADD COLUMN     "follower_id" TEXT NOT NULL,
ADD COLUMN     "following_avatar_url" TEXT,
ADD COLUMN     "following_id" TEXT NOT NULL,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("follower_id", "following_id");

-- AlterTable
ALTER TABLE "media" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post_flags" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "post_likes" DROP CONSTRAINT "post_likes_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "post_likes_pkey" PRIMARY KEY ("post_id", "user_id");

-- AlterTable
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_pkey",
DROP COLUMN "postId",
DROP COLUMN "tagId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "tag_id" TEXT NOT NULL,
ADD CONSTRAINT "post_tags_pkey" PRIMARY KEY ("post_id", "tag_id");

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "createdAt",
DROP COLUMN "flagCount",
DROP COLUMN "isBotPost",
DROP COLUMN "isShared",
DROP COLUMN "mediaId",
DROP COLUMN "mediaType",
DROP COLUMN "mediaUrl",
DROP COLUMN "userAvatarUrl",
DROP COLUMN "userDeleted",
DROP COLUMN "userId",
DROP COLUMN "viewCount",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "flag_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_bot_post" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_shared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "media_id" TEXT NOT NULL,
ADD COLUMN     "media_type" TEXT,
ADD COLUMN     "media_url" TEXT,
ADD COLUMN     "user_avatar_url" TEXT NOT NULL,
ADD COLUMN     "user_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "view_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "mediaId",
ADD COLUMN     "media_id" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatarUrl",
DROP COLUMN "isBot",
DROP COLUMN "isVerified",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "is_bot" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "posts_media_url_key" ON "posts"("media_url");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
