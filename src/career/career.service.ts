/* eslint-disable */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  async getCareerById(careerId: number) {
    const career = await this.prisma.career.findUnique({
      where: { id: careerId },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!career) {
      throw new NotFoundException('Career not found');
    }

    return {
      careerId: career.id,
      careerName: career.name,
      role: career.role,
      lifestyle: career.lifestyle,
      imageUrl: career.imageUrl,
      skills: career.skills.map((skillCareer) => ({
        skillId: skillCareer.skill.id,
        skillName: skillCareer.skill.skill_name,
        skillType: skillCareer.skill.skill_type,
        imageUrl: skillCareer.skill.image_url,
      })),
    };
  }
}
