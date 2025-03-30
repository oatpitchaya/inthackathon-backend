/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  // 1. Retrieve topics by skillId
  async getLessonCompleteByUserId(userId: number) {
    // Find the completed lessons by the user from the lesson_progress table
    const lessonProgresses = await this.prisma.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            topic: true,
          },
        },
      },
    });

    return lessonProgresses.map((lessonProgress) => ({
      lessonId: lessonProgress.lessonId,
      lessonName: lessonProgress.lesson.name,
      topicId: lessonProgress.lesson.topic.id,
      topicName: lessonProgress.lesson.topic.topic,
    }));
  }

  async getLessonsByTopicId(topicId: number) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
      include: {
        skill: true, // Include skill details
        Lesson: {
          include: {
            quizzes: {
              include: {
                quizQuestion: {
                  include: {
                    quizChoice: true, // Include quiz choices
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

    // Returning a structured and readable response
    return {
      topicId: topic.id,
      topicName: topic.topic,
      skillId: topic.skillId,
      skillName: topic.skill.skill_name, // Include skill name
      lessons: topic.Lesson.map((lesson) => ({
        lessonId: lesson.id,
        lessonName: lesson.name,
        quizzes: lesson.quizzes.map((quiz) => ({
          quizId: quiz.id,
          quizName: quiz.name,
          questions: quiz.quizQuestion.map((question) => ({
            questionId: question.id,
            questionText: question.question,
            correctAnswer: question.answer, // ✅ Correct answer from `quiz_question.answer`
            choices: question.quizChoice.map((choice) => ({
              choiceId: choice.id,
              choiceText: choice.choice,
            })),
          })),
        })),
      })),
    };
  }

  // 3. Retrieve lesson progress by userId and lessonId
  async getLessonProgress(userId: number, lessonId: number) {
    const lessonProgress = await this.prisma.lessonProgress.findMany({
      where: { userId, lessonId },
      select: {
        completeAt: true,
        // coin: true,
        // xp: true,
        // ticket: true,
      },
    });
    return lessonProgress;
  }

  // 4. Retrieve quiz progress by userId and quizId
  async getQuizProgress(userId: number, quizId: number) {
    const quizProgress = await this.prisma.quizProgress.findMany({
      where: { userId, quizId },
      select: {
        score: true,
        completeAt: true,
      },
    });
    return quizProgress;
  }

  async completeLesson(userId: number, lessonId: number) {
    // Check if lesson exists and get rewards from the Lesson table
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Extract reward values from the Lesson table
    const { exp, coin, ticket } = lesson;

    // 1️⃣ Mark lesson as completed
    const lessonProgress = await this.prisma.lessonProgress.create({
      data: {
        userId,
        lessonId,
      },
    });

    // 2️⃣ Update user rewards in Character table
    const updatedCharacter = await this.prisma.character.update({
      where: { userId },
      data: {
        exp: { increment: exp },
        coin: { increment: coin },
        ticket: { increment: ticket },
      },
    });

    // 3️⃣ Return structured response
    return {
      message: 'Lesson completed successfully!',
      completedLesson: {
        lessonId: lesson.id,
        lessonName: lesson.name,
        completedAt: lessonProgress.completeAt,
      },
      updatedUser: {
        userId,
        level: updatedCharacter.level,
        exp: updatedCharacter.exp,
        coin: updatedCharacter.coin,
        ticket: updatedCharacter.ticket,
      },
    };
  }
  //retrieve quiz with lessonId
  async getQuizzesByLessonId(lessonId: number) {
    const quizzes = await this.prisma.quiz.findMany({
      where: { lessonId }, // Filter quizzes by lessonId
      include: {
        quizQuestion: {
          include: {
            quizChoice: true, // Include quiz choices for each question
          },
        },
      },
    });

    return quizzes.map((quiz) => ({
      quizId: quiz.id,
      quizName: quiz.name,
      passScore: quiz.passScore,
      questions: quiz.quizQuestion.map((question) => ({
        questionId: question.id,
        questionText: question.question,
        correctAnswer: question.answer,
        choices: question.quizChoice.map((choice) => choice.choice),
      })),
    }));
  }

  async completeQuiz(
    quizAnswers: { quizId: number; [questionId: number]: string }[],
    userId: number,
  ) {
    for (const answer of quizAnswers) {
      const { quizId, ...questions } = answer;

      // Fetch quiz data and quiz questions
      const quiz = await this.prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
          quizQuestion: {
            include: {
              quizChoice: true, // Include quiz choices
            },
          },
        },
      });

      if (!quiz) {
        throw new Error('Quiz not found');
      }

      let totalScore = 0;

      // Calculate score for each question
      for (const [questionId, userAnswer] of Object.entries(questions)) {
        const question = quiz.quizQuestion.find(
          (q) => q.id === parseInt(questionId),
        );

        if (question && userAnswer === question.answer) {
          totalScore += 1; // Increment score if the answer is correct
        }
      }

      // Upsert QuizProgress (Update if exists, create if not)
      const quizProgress = await this.prisma.quizProgress.upsert({
        where: {
          userId_quizId: { userId, quizId }, // Ensure quizId and userId are correctly scoped
        },
        update: {
          score: totalScore, // Update the score
        },
        create: {
          userId,
          quizId,
          score: totalScore,
        },
      });

      console.log(
        `User ${userId} completed quiz ${quizId} with score ${totalScore}`,
      );
    }

    return { message: 'Quiz progress updated successfully' };
  }
}
