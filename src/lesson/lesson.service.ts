/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getLessonCompleteByUserId(userId: number) {
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
        skill: true,
        Lesson: {
          include: {
            quizzes: {
              include: {
                quizQuestion: {
                  include: {
                    quizChoice: true,
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

    return {
      topicId: topic.id,
      topicName: topic.topic,
      skillId: topic.skillId,
      skillName: topic.skill.skill_name,
      lessons: topic.Lesson.map((lesson) => ({
        lessonId: lesson.id,
        lessonName: lesson.name,
        quizzes: lesson.quizzes.map((quiz) => ({
          quizId: quiz.id,
          quizName: quiz.name,
          questions: quiz.quizQuestion.map((question) => ({
            questionId: question.id,
            questionText: question.question,
            correctAnswer: question.answer,
            choices: question.quizChoice.map((choice) => ({
              choiceId: choice.id,
              choiceText: choice.choice,
            })),
          })),
        })),
      })),
    };
  }

  async getLessonProgress(userId: number, lessonId: number) {
    const lessonProgress = await this.prisma.lessonProgress.findMany({
      where: { userId, lessonId },
      select: {
        completeAt: true,
      },
    });
    return lessonProgress;
  }

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
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const { exp, coin, ticket } = lesson;

    const lessonProgress = await this.prisma.lessonProgress.create({
      data: {
        userId,
        lessonId,
      },
    });

    const updatedCharacter = await this.prisma.character.update({
      where: { userId },
      data: {
        exp: { increment: exp },
        coin: { increment: coin },
        ticket: { increment: ticket },
      },
    });

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
  async getQuizzesByLessonId(lessonId: number) {
    const quizzes = await this.prisma.quiz.findMany({
      where: { lessonId },
      include: {
        quizQuestion: {
          include: {
            quizChoice: true,
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

      const quiz = await this.prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
          quizQuestion: {
            include: {
              quizChoice: true,
            },
          },
        },
      });

      if (!quiz) {
        throw new Error('Quiz not found');
      }

      let totalScore = 0;

      for (const [questionId, userAnswer] of Object.entries(questions)) {
        const question = quiz.quizQuestion.find(
          (q) => q.id === parseInt(questionId),
        );

        if (question && userAnswer === question.answer) {
          totalScore += 1;
        }
      }

      const quizProgress = await this.prisma.quizProgress.upsert({
        where: {
          userId_quizId: { userId, quizId },
        },
        update: {
          score: totalScore,
        },
        create: {
          userId,
          quizId,
          score: totalScore,
        },
      });
    }

    return true;
  }
}
