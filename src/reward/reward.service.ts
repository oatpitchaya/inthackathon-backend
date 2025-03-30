/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async getAllRewards() {
    return this.prisma.reward.findMany();
  }
}
