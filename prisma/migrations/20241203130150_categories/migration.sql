/*
  Warnings:

  - You are about to drop the `BlogPostCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogPostCategory" DROP CONSTRAINT "BlogPostCategory_blogPostId_fkey";

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "categories" "Categories"[];

-- DropTable
DROP TABLE "BlogPostCategory";
