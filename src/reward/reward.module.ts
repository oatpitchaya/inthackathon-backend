import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService, PrismaService],
})
export class RewardModule {}
