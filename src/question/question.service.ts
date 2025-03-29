import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestionsWithAnswers(): Promise<any> {
    const questions = await this.prisma.introQuestion.findMany({
      include: {
        answers: {
          where: {
            questionId: {},
          },
          select: {
            answer: true,
          },
        },
      },
    });

    const count = questions.length;

    return {
      count,
      questions: questions.map((question) => ({
        id: question.id,
        question: question.question,
        answers: question.answers.map((answer) => answer.answer),
      })),
    };
  }
}
