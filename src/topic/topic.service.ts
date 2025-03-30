import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  async getTopicById(id: number) {
    const topic = await this.prisma.topic.findMany({
      where: { id },
      include: {
        skill: true,
        Lesson: true,
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

    return topic;
  }
}
