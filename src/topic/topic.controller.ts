import { Controller, Get, Query } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  getTopicById(@Query('id') id: string) {
    const topicId = parseInt(id, 10);
    if (isNaN(topicId)) {
      throw new Error('Invalid topic ID');
    }
    return this.topicService.getTopicById(topicId);
  }
}
