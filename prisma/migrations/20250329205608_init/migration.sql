/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `QuizChoice` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `QuizChoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuizChoice" DROP CONSTRAINT "QuizChoice_quizId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "correctAnswer";

-- AlterTable
ALTER TABLE "QuizChoice" DROP COLUMN "quizId",
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizChoice" ADD CONSTRAINT "QuizChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
