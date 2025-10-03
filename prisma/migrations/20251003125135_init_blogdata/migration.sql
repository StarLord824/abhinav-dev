/*
  Warnings:

  - The `status` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `tableOfContent` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `content` on the `Blog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "comments" JSONB,
ADD COLUMN     "likes" INTEGER,
ADD COLUMN     "relatedBlogs" JSONB,
ADD COLUMN     "tableOfContent" JSONB NOT NULL,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'DRAFT';
