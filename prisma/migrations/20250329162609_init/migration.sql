-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "coin" INTEGER NOT NULL DEFAULT 0,
    "ticket" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "skill_name" TEXT NOT NULL,
    "skill_type" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCareer" (
    "skillId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,

    CONSTRAINT "SkillCareer_pkey" PRIMARY KEY ("skillId","careerId")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "completeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coin" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,
    "ticket" INTEGER NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "passScore" INTEGER NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizChoice" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "choice" TEXT NOT NULL,

    CONSTRAINT "QuizChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "completeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntroQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "IntroQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntroAnswer" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "IntroAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntroAnswerWeight" (
    "skillId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "IntroAnswerWeight_pkey" PRIMARY KEY ("skillId","answerId")
);

-- CreateTable
CREATE TABLE "Appearance" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Appearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppearanceOwn" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "appearanceId" INTEGER NOT NULL,

    CONSTRAINT "AppearanceOwn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppearanceWear" (
    "userId" INTEGER NOT NULL,
    "appearanceId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Gachapong" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "appearanceId" INTEGER,

    CONSTRAINT "Gachapong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardRedeemed" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,

    CONSTRAINT "RewardRedeemed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AppearanceOwn_userId_appearanceId_key" ON "AppearanceOwn"("userId", "appearanceId");

-- CreateIndex
CREATE UNIQUE INDEX "AppearanceWear_userId_appearanceId_key" ON "AppearanceWear"("userId", "appearanceId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillCareer" ADD CONSTRAINT "SkillCareer_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillCareer" ADD CONSTRAINT "SkillCareer_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizChoice" ADD CONSTRAINT "QuizChoice_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizProgress" ADD CONSTRAINT "QuizProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizProgress" ADD CONSTRAINT "QuizProgress_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntroAnswer" ADD CONSTRAINT "IntroAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "IntroQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntroAnswerWeight" ADD CONSTRAINT "IntroAnswerWeight_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntroAnswerWeight" ADD CONSTRAINT "IntroAnswerWeight_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "IntroAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppearanceOwn" ADD CONSTRAINT "AppearanceOwn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppearanceOwn" ADD CONSTRAINT "AppearanceOwn_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppearanceWear" ADD CONSTRAINT "AppearanceWear_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppearanceWear" ADD CONSTRAINT "AppearanceWear_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gachapong" ADD CONSTRAINT "Gachapong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gachapong" ADD CONSTRAINT "Gachapong_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedeemed" ADD CONSTRAINT "RewardRedeemed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedeemed" ADD CONSTRAINT "RewardRedeemed_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
