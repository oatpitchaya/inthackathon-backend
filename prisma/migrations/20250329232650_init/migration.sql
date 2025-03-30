/*
  Warnings:

  - You are about to drop the column `coin` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `ticket` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `LessonProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LessonProgress" DROP COLUMN "coin",
DROP COLUMN "ticket",
DROP COLUMN "xp";

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "coin" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ticket" INTEGER NOT NULL DEFAULT 0;
