/*
  Warnings:

  - A unique constraint covering the columns `[userId,quizId]` on the table `QuizProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuizProgress_userId_quizId_key" ON "QuizProgress"("userId", "quizId");
