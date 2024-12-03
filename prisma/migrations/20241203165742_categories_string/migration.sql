/*
  Warnings:

  - The `categories` column on the `blog_posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[];

-- DropEnum
DROP TYPE "Categories";
