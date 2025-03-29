/*
  Warnings:

  - You are about to drop the `IntroAnswerWeight` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `skillId` to the `IntroAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IntroAnswerWeight" DROP CONSTRAINT "IntroAnswerWeight_answerId_fkey";

-- DropForeignKey
ALTER TABLE "IntroAnswerWeight" DROP CONSTRAINT "IntroAnswerWeight_skillId_fkey";

-- AlterTable
ALTER TABLE "IntroAnswer" ADD COLUMN     "skillId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "IntroAnswerWeight";

-- AddForeignKey
ALTER TABLE "IntroAnswer" ADD CONSTRAINT "IntroAnswer_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
