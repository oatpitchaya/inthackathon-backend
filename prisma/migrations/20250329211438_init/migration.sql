/*
  Warnings:

  - The primary key for the `Topic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lessonId` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `topicId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_lessonId_fkey";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "topicId" INTEGER NOT NULL,
ALTER COLUMN "skillId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_pkey",
DROP COLUMN "lessonId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Topic_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
