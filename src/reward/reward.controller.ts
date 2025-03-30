/* eslint-disable */
import { Controller, Get } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  async getAllRewards() {
    return this.rewardService.getAllRewards();
  }
}
