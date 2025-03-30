import { Controller, Get, Query } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get()
  async getCareerById(@Query('careerId') careerId: number) {
    return this.careerService.getCareerById(Number(careerId));
  }
}
