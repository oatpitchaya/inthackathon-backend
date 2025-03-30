/* eslint-disable */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('quiz/complete')
  async completeQuiz(
    @Body()
    body: {
      userId: number;
      quizAnswers: { quizId: number; [questionId: number]: string }[];
    },
  ): Promise<any> {
    const { quizAnswers, userId } = body;
    return this.lessonService.completeQuiz(quizAnswers, userId);
  }

  // 1. Retrieve topics by skillId
  @Get()
  async get(@Query('userId') id: string): Promise<any> {
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    return this.lessonService.getLessonCompleteByUserId(userId);
  }

  // 2. Retrieve lessons by skillId with quizzes and quiz choices
  @Get()
  async getLessonsByTopicId(@Query('topicId') topicId: string) {
    const TopicId = parseInt(topicId, 10);
    if (isNaN(TopicId)) {
      throw new Error('Invalid topic ID');
    }
    return this.lessonService.getLessonsByTopicId(TopicId);
  }

  // 3. Retrieve lesson progress
  @Get('progress/lesson/:userId/:lessonId')
  async getLessonProgress(
    @Param('userId') userId: string,
    @Param('lessonId') lessonId: string,
  ) {
    const UserId = parseInt(userId, 10);
    if (isNaN(UserId)) {
      throw new Error('Invalid user ID');
    }
    const LessonId = parseInt(lessonId, 10);
    if (isNaN(LessonId)) {
      throw new Error('Invalid user ID');
    }
    return this.lessonService.getLessonProgress(UserId, LessonId);
  }

  // 4. Retrieve quiz progress
  @Get('progress/quiz/:userId/:quizId')
  async getQuizProgress(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
  ) {
    const UserId = parseInt(userId, 10);
    if (isNaN(UserId)) {
      throw new Error('Invalid user ID');
    }
    const QuizId = parseInt(quizId, 10);
    if (isNaN(QuizId)) {
      throw new Error('Invalid user ID');
    }
    return this.lessonService.getQuizProgress(UserId, QuizId);
  }

  @Post('complete')
  async completeLesson(@Body() data: { userId: number; lessonId: number }) {
    return this.lessonService.completeLesson(data.userId, data.lessonId);
  }

  @Get('quiz')
  async getQuizzesByLessonId(
    @Query('lessonId') lessonId: string,
  ): Promise<any> {
    const lessonIdParsed = parseInt(lessonId, 10);
    if (isNaN(lessonIdParsed)) {
      throw new Error('Invalid lesson ID');
    }
    return this.lessonService.getQuizzesByLessonId(lessonIdParsed);
  }
}
