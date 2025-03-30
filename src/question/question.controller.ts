/* eslint-disable */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestionsWithAnswers() {
    return this.questionService.getQuestionsWithAnswers();
  }

  @Post('submit') 
  async submitAnswer(@Body() SubmitAnswerDto: { answers: string[] }) {
    return this.questionService.submitAnswer(SubmitAnswerDto.answers);
  }
}
