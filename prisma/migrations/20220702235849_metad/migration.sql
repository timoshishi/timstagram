-- AlterTable
ALTER TABLE "media" ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "bucket" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "mediaId" TEXT;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
