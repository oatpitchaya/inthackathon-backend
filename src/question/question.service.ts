/* eslint-disable */
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
        choice: question.answers.map((answer) => answer.answer),
      })),
    };
  }

  async submitAnswer(listOfAnswer: string[]) {
    const skillCount = await this.prisma.introAnswer.groupBy({
      by: ['skillId'],
      where: {
        answer: { in: listOfAnswer },
      },
      _count: { skillId: true },
    });

    const skillDetails = await this.prisma.skill.findMany({
      where: {
        id: { in: skillCount.map((item) => item.skillId) },
      },
      select: {
        id: true,
        skill_name: true,
      },
    });

    const result = skillCount
      .map(({ skillId, _count }) => ({
        skillId,
        skillName:
          skillDetails.find((s) => s.id === skillId)?.skill_name || 'Unknown',
        count: _count.skillId,
      }))
      .sort((a, b) => b.count - a.count);

    return result;
  }
}
