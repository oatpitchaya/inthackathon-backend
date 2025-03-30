/*
  Warnings:

  - You are about to drop the column `coin` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `ticket` on the `Topic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "coin" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ticket" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "coin",
DROP COLUMN "exp",
DROP COLUMN "ticket";
