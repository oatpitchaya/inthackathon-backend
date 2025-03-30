-- CreateTable
CREATE TABLE "Topic" (
    "skillId" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("skillId","lessonId")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
