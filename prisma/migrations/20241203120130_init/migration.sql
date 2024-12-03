-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('ESTUDOS_DE_CASO', 'NA_MIDIA', 'LANCAMENTOS', 'RECURSOS', 'GESTAO_DIGITAL');

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "category" "Categories"[],
    "active" BOOLEAN NOT NULL,
    "featured" BOOLEAN,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);
